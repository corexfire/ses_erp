import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SupplierRatingService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string, period: string) {
    return this.prisma.supplierRating.findMany({
      where: { tenantId, period },
      include: { supplier: true },
      orderBy: { totalScore: 'desc' },
    });
  }

  async calculateRatings(tenantId: string, period: string) {
    const suppliers = await this.prisma.supplier.findMany({
      where: { tenantId, isActive: true },
    });

    for (const supplier of suppliers) {
      // 1. Quality Score: % of items passed in QC inspections
      const qcStats = await this.prisma.qcInspectionItem.aggregate({
         where: {
           tenantId,
           qcInspection: { grn: { supplierId: supplier.id } }, // GRN linked supplier
         },
        _sum: { sampleQty: true, passedQty: true },
      });

       const sampleQty = Number(qcStats._sum?.sampleQty || 0);
       const passedQty = Number(qcStats._sum?.passedQty || 0);
      const qualityScore = sampleQty > 0 ? (passedQty / sampleQty) * 100 : 100;

       // 2. NCR Score: Deduct points for NCRs (Max 100)
       const ncrCount = await this.prisma.nonConformanceReport.count({
         where: { tenantId, qc: { grn: { supplierId: supplier.id } } },
       });
      const ncrScore = Math.max(0, 100 - ncrCount * 10);

      // 3. Delivery Score (Simulated/Placeholer for now)
      const deliveryScore = 95;

      // Total Score Calculation (Weighted)
      const totalScore = qualityScore * 0.5 + deliveryScore * 0.3 + ncrScore * 0.2;
      
      let grade = 'A';
      if (totalScore < 60) grade = 'D';
      else if (totalScore < 75) grade = 'C';
      else if (totalScore < 90) grade = 'B';

      await this.prisma.supplierRating.upsert({
        where: {
          tenantId_supplierId_period: {
            tenantId,
            supplierId: supplier.id,
            period,
          },
        },
        update: {
          qualityScore,
          deliveryScore,
          ncrScore,
          totalScore,
          grade,
        },
        create: {
          tenantId,
          supplierId: supplier.id,
          period,
          qualityScore,
          deliveryScore,
          ncrScore,
          totalScore,
          grade,
        },
      });
    }

    return { message: 'Ratings calculated successfully' };
  }
}
