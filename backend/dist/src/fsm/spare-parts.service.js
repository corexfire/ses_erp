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
exports.SparePartsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SparePartsService = class SparePartsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, query) {
        return this.prisma.item.findMany({
            where: {
                tenantId,
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
    async findOne(tenantId, id) {
        const part = await this.prisma.item.findFirst({
            where: { id, tenantId, isSparePart: true },
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
        if (!part)
            throw new common_1.NotFoundException('Spare Part tidak ditemukan');
        return part;
    }
    async create(tenantId, dto) {
        const { compatibleEquipmentIds, ...itemData } = dto;
        return this.prisma.$transaction(async (tx) => {
            const part = await tx.item.create({
                data: {
                    ...itemData,
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
    async update(tenantId, id, dto) {
        const { compatibleEquipmentIds, ...itemData } = dto;
        const existing = await this.prisma.item.findFirst({
            where: { id, tenantId, isSparePart: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Spare Part tidak ditemukan');
        return this.prisma.$transaction(async (tx) => {
            await tx.item.update({
                where: { id },
                data: itemData,
            });
            if (compatibleEquipmentIds) {
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
    async remove(tenantId, id) {
        const existing = await this.prisma.item.findFirst({
            where: { id, tenantId, isSparePart: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Spare Part tidak ditemukan');
        return this.prisma.item.delete({ where: { id } });
    }
    async getStats(tenantId) {
        const items = await this.prisma.item.findMany({
            where: { tenantId, isSparePart: true },
            include: { stockBalances: true }
        });
        const total = items.length;
        let lowStockCount = 0;
        let totalValue = 0;
        items.forEach(item => {
            const stock = item.stockBalances.reduce((sum, b) => sum + Number(b.qtyOnHand), 0);
            if (stock < Number(item.reorderPoint || 0)) {
                lowStockCount++;
            }
            totalValue += stock * 100000;
        });
        return { total, lowStock: lowStockCount, totalValue };
    }
};
exports.SparePartsService = SparePartsService;
exports.SparePartsService = SparePartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SparePartsService);
//# sourceMappingURL=spare-parts.service.js.map