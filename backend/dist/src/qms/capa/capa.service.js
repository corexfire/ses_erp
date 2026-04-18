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
exports.CapaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CapaService = class CapaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        const { status, search } = filters;
        return this.prisma.capa.findMany({
            where: {
                tenantId,
                ...(status ? { status: status } : {}),
                ...(search ? {
                    OR: [
                        { code: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } },
                    ]
                } : {}),
            },
            include: {
                sourceNcr: true,
                assignedTo: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAuditFindings(tenantId) {
        return this.prisma.auditLog.findMany({
            where: {
                tenantId,
                action: { in: ['REJECT', 'DELETE', 'VOID', 'ERROR'] },
            },
            take: 50,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(tenantId, id) {
        const capa = await this.prisma.capa.findFirst({
            where: { id, tenantId },
            include: {
                sourceNcr: true,
                assignedTo: { select: { id: true, name: true, email: true } },
            },
        });
        if (!capa)
            throw new common_1.NotFoundException('CAPA not found');
        return capa;
    }
    async create(tenantId, dto) {
        return this.prisma.capa.create({
            data: {
                tenantId,
                ...dto,
            },
        });
    }
    async update(tenantId, id, dto) {
        await this.findOne(tenantId, id);
        return this.prisma.capa.update({
            where: { id },
            data: dto,
        });
    }
};
exports.CapaService = CapaService;
exports.CapaService = CapaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CapaService);
//# sourceMappingURL=capa.service.js.map