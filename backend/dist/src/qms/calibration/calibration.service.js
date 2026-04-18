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
exports.CalibrationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CalibrationService = class CalibrationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(tenantId, filters) {
        return this.prisma.calibrationLog.findMany({
            where: {
                tenantId,
                ...(filters.status ? { status: filters.status } : {}),
            },
            include: { equipment: true },
            orderBy: { calibrationDate: 'desc' },
        });
    }
    async findOne(tenantId, id) {
        const log = await this.prisma.calibrationLog.findFirst({
            where: { id, tenantId },
            include: { equipment: true },
        });
        if (!log)
            throw new common_1.NotFoundException('Calibration log not found');
        return log;
    }
    async searchEquipment(tenantId, q) {
        return this.prisma.equipment.findMany({
            where: {
                tenantId,
                ...(q ? {
                    OR: [
                        { code: { contains: q, mode: 'insensitive' } },
                        { name: { contains: q, mode: 'insensitive' } },
                    ]
                } : {}),
            },
            select: { id: true, code: true, name: true, serialNumber: true },
            take: 20,
        });
    }
    async create(tenantId, data) {
        return this.prisma.calibrationLog.create({
            data: {
                tenantId,
                ...data,
            },
        });
    }
    async update(tenantId, id, data) {
        await this.findOne(tenantId, id);
        return this.prisma.calibrationLog.update({
            where: { id },
            data,
        });
    }
};
exports.CalibrationService = CalibrationService;
exports.CalibrationService = CalibrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CalibrationService);
//# sourceMappingURL=calibration.service.js.map