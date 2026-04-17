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
exports.HandoverService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HandoverService = class HandoverService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(tenantId, dto) {
        const { handoverDate, serviceOrderId, technicianId, equipmentId, customerId, ...rest } = dto;
        const data = {
            ...rest,
            tenantId,
            handoverDate: new Date(handoverDate),
            ...(customerId ? { customer: { connect: { id: customerId } } } : {}),
            ...(serviceOrderId ? { serviceOrder: { connect: { id: serviceOrderId } } } : {}),
            ...(technicianId ? { technician: { connect: { id: technicianId } } } : {}),
            ...(equipmentId ? { equipment: { connect: { id: equipmentId } } } : {}),
        };
        return this.prisma.fsmHandover.create({
            data,
            include: {
                customer: true,
                serviceOrder: true,
                technician: true,
                equipment: true,
            },
        });
    }
    async findAll(tenantId, filters = {}) {
        return this.prisma.fsmHandover.findMany({
            where: {
                tenantId,
                ...(filters.status ? { status: filters.status } : {}),
                ...(filters.q ? {
                    OR: [
                        { code: { contains: filters.q, mode: 'insensitive' } },
                        { recipientName: { contains: filters.q, mode: 'insensitive' } },
                    ]
                } : {}),
            },
            include: {
                customer: true,
                serviceOrder: true,
                technician: true,
                equipment: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(tenantId, id) {
        const handover = await this.prisma.fsmHandover.findFirst({
            where: { id, tenantId },
            include: {
                customer: true,
                serviceOrder: true,
                technician: true,
                equipment: true,
            },
        });
        if (!handover)
            throw new common_1.NotFoundException('Handover (BAST) tidak ditemukan');
        return handover;
    }
    async update(tenantId, id, dto) {
        await this.findOne(tenantId, id);
        const { handoverDate, ...rest } = dto;
        return this.prisma.fsmHandover.update({
            where: { id },
            data: {
                ...rest,
                handoverDate: handoverDate ? new Date(handoverDate) : undefined,
            },
            include: {
                customer: true,
                serviceOrder: true,
                technician: true,
                equipment: true,
            },
        });
    }
    async remove(tenantId, id) {
        await this.findOne(tenantId, id);
        return this.prisma.fsmHandover.delete({
            where: { id },
        });
    }
    async getStats(tenantId) {
        const handovers = await this.prisma.fsmHandover.findMany({
            where: { tenantId },
        });
        const total = handovers.length;
        const pending = handovers.filter(h => h.status !== 'FINALIZED').length;
        const finalized = handovers.filter(h => h.status === 'FINALIZED').length;
        return {
            total,
            pending,
            finalized,
        };
    }
};
exports.HandoverService = HandoverService;
exports.HandoverService = HandoverService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HandoverService);
//# sourceMappingURL=handover.service.js.map