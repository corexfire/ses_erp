import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';

@Injectable()
export class SparePartsService {
  constructor(private prisma: PrismaService) {}

   async findAll(tenantId: string | null, query?: string, isSuperAdmin?: boolean) {
     return this.prisma.item.findMany({
       where: {
         ...(isSuperAdmin ? {} : { tenantId: tenantId! }),
         isSparePart: true,
         ...(query ? {
           OR: [
             { name: { contains: query, mode: 'insensitive' } },
             { code: { contains: query, mode: 'insensitive' } },
             { oemPartNumber: { contains: query, mode: 'insensitive' } },
           ],
         } : {}),
       },
      include: {
        itemGroup: true,
        stockBalances: {
          include: { warehouse: true },
        },
        fsmCompatibilities: {
          include: { equipment: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

   async findOne(tenantId: string | null, id: string, isSuperAdmin?: boolean) {
     const part = await this.prisma.item.findFirst({
       where: {
         id,
         ...(isSuperAdmin ? {} : { tenantId: tenantId! }),
         isSparePart: true
       },
      include: {
        itemGroup: true,
        uoms: true,
        stockBalances: {
          include: { warehouse: true },
        },
        fsmCompatibilities: {
          include: { equipment: true },
        },
      },
    });
    if (!part) throw new NotFoundException('Spare Part tidak ditemukan');
    return part;
  }

  async create(tenantId: string, dto: CreateSparePartDto) {
    const { compatibleEquipmentIds, ...itemData } = dto;

    return this.prisma.$transaction(async (tx) => {
       const part = await tx.item.create({
         data: {
           ...(itemData as any),
           tenantId,
           isSparePart: true,
         },
       });

      if (compatibleEquipmentIds && compatibleEquipmentIds.length > 0) {
        await tx.fsmSparePartCompatibility.createMany({
          data: compatibleEquipmentIds.map((equipmentId) => ({
            tenantId,
            itemId: part.id,
            equipmentId,
          })),
        });
      }

      return tx.item.findUnique({
        where: { id: part.id },
        include: { fsmCompatibilities: { include: { equipment: true } } },
      });
    });
  }

  async update(tenantId: string, id: string, dto: UpdateSparePartDto) {
    const { compatibleEquipmentIds, ...itemData } = dto;

    const existing = await this.prisma.item.findFirst({
      where: { id, tenantId, isSparePart: true },
    });
    if (!existing) throw new NotFoundException('Spare Part tidak ditemukan');

    return this.prisma.$transaction(async (tx) => {
      await tx.item.update({
        where: { id },
        data: itemData as any,
      });

      if (compatibleEquipmentIds) {
        // Reset and re-add compatibilities
        await tx.fsmSparePartCompatibility.deleteMany({
          where: { itemId: id, tenantId },
        });

        if (compatibleEquipmentIds.length > 0) {
          await tx.fsmSparePartCompatibility.createMany({
            data: compatibleEquipmentIds.map((eqId) => ({
              tenantId,
              itemId: id,
              equipmentId: eqId,
            })),
          });
        }
      }

      return tx.item.findUnique({
        where: { id },
        include: { fsmCompatibilities: { include: { equipment: true } } },
      });
    });
  }

  async remove(tenantId: string, id: string) {
    const existing = await this.prisma.item.findFirst({
      where: { id, tenantId, isSparePart: true },
    });
    if (!existing) throw new NotFoundException('Spare Part tidak ditemukan');

    return this.prisma.item.delete({ where: { id } });
  }

   async getStats(tenantId: string | null, isSuperAdmin?: boolean) {
     const items = await this.prisma.item.findMany({
       where: {
         ...(isSuperAdmin ? {} : { tenantId: tenantId! }),
         isSparePart: true
       },
      include: { stockBalances: true }
    });
    
    const total = items.length;
    let lowStockCount = 0;
    let totalValue = 0;

     items.forEach(item => {
       const stock = item.stockBalances.reduce((sum: number, b: any) => sum + Number(b.qtyOnHand), 0);
      if (stock < Number(item.reorderPoint || 0)) {
        lowStockCount++;
      }
      
      // Placeholder value logic: stock * approx unit cost
      totalValue += stock * 100000;
    });

    return { total, lowStock: lowStockCount, totalValue };
  }
}
