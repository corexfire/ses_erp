"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRatingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SupplierRatingService = class SupplierRatingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, period) {
        return this.prisma.supplierRating.findMany({
            where: { tenantId, period },
            include: { supplier: true },
            orderBy: { totalScore: 'desc' },
        });
    }
    async calculateRatings(tenantId, period) {
        const suppliers = await this.prisma.supplier.findMany({
            where: { tenantId, isActive: true },
        });
        for (const supplier of suppliers) {
            const qcStats = await this.prisma.qcInspectionItem.aggregate({
                where: {
                    tenantId,
                    qcInspection: { grn: { supplierId: supplier.id } },
                },
                _sum: { sampleQty: true, passedQty: true },
            });
            const sampleQty = Number(qcStats._sum?.sampleQty || 0);
            const passedQty = Number(qcStats._sum?.passedQty || 0);
            const qualityScore = sampleQty > 0 ? (passedQty / sampleQty) * 100 : 100;
            const ncrCount = await this.prisma.nonConformanceReport.count({
                where: { tenantId, qc: { grn: { supplierId: supplier.id } } },
            });
            const ncrScore = Math.max(0, 100 - ncrCount * 10);
            const deliveryScore = 95;
            const totalScore = qualityScore * 0.5 + deliveryScore * 0.3 + ncrScore * 0.2;
            let grade = 'A';
            if (totalScore < 60)
                grade = 'D';
            else if (totalScore < 75)
                grade = 'C';
            else if (totalScore < 90)
                grade = 'B';
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
};
exports.SupplierRatingService = SupplierRatingService;
exports.SupplierRatingService = SupplierRatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupplierRatingService);
//# sourceMappingURL=supplier-rating.service.js.map