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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const maintenance_dto_1 = require("./dto/maintenance.dto");
let MaintenanceController = class MaintenanceController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listEquipment(req, q) {
        const equipment = await this.prisma.equipment.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }, { name: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            include: {
                maintenancePlans: { take: 5 },
                maintenanceRequests: { where: { status: 'OPEN' } },
            },
            orderBy: [{ createdAt: 'desc' }],
        });
        return { equipment };
    }
    async createEquipment(req, body) {
        const equipment = await this.prisma.equipment.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                type: body.type,
                location: body.location,
                serialNumber: body.serialNumber,
                manufacturer: body.manufacturer,
                model: body.model,
                criticality: body.criticality || 'MEDIUM',
                purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
                warrantyExpiryDate: body.warrantyExpiryDate ? new Date(body.warrantyExpiryDate) : undefined,
                workCenterId: body.workCenterId,
                installedDate: body.installedDate ? new Date(body.installedDate) : undefined,
                notes: body.notes,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Equipment',
            entityId: equipment.id,
        });
        return { equipment };
    }
    async updateEquipment(req, id, body) {
        const existing = await this.prisma.equipment.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Equipment not found');
        const equipment = await this.prisma.equipment.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                type: body.type ?? undefined,
                location: body.location ?? undefined,
                serialNumber: body.serialNumber ?? undefined,
                manufacturer: body.manufacturer ?? undefined,
                model: body.model ?? undefined,
                criticality: body.criticality ?? undefined,
                purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
                warrantyExpiryDate: body.warrantyExpiryDate ? new Date(body.warrantyExpiryDate) : undefined,
                workCenterId: body.workCenterId ?? undefined,
                notes: body.notes ?? undefined,
            },
        });
        return { equipment };
    }
    async listSchedules(req) {
        const schedules = await this.prisma.maintenanceSchedule.findMany({
            where: { tenantId: req.user.tenantId },
            include: { equipment: true, maintenanceTasks: true },
            orderBy: [{ nextDate: 'asc' }],
        });
        return { schedules };
    }
    async createSchedule(req, body) {
        const schedule = await this.prisma.maintenanceSchedule.create({
            data: {
                tenantId: req.user.tenantId,
                equipmentId: body.equipmentId,
                name: body.name,
                frequency: body.frequency,
                intervalDays: body.intervalDays,
                nextDate: new Date(body.nextDate),
                maintenanceTasks: body.tasks ? {
                    create: body.tasks.map(t => ({ tenantId: req.user.tenantId, description: t }))
                } : undefined,
            },
            include: { maintenanceTasks: true }
        });
        return { schedule };
    }
    async listRequests(req, status) {
        const requests = await this.prisma.maintenanceRequest.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status ? { status } : {}),
            },
            include: { equipment: true },
            orderBy: [{ requestDate: 'desc' }],
        });
        return { requests };
    }
    async createRequest(req, body) {
        const request = await this.prisma.maintenanceRequest.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                equipmentId: body.equipmentId,
                requestDate: new Date(body.requestDate),
                problem: body.problem,
                priority: body.priority || 'MEDIUM',
                assignedTo: body.assignedTo,
                notes: body.notes,
            },
        });
        return { request };
    }
    async updateRequest(req, id, body) {
        const request = await this.prisma.maintenanceRequest.update({
            where: { id },
            data: {
                status: body.status ?? undefined,
                priority: body.priority ?? undefined,
                assignedTo: body.assignedTo ?? undefined,
                notes: body.notes ?? undefined,
                resolvedDate: body.status === 'COMPLETED' ? new Date() : undefined,
            },
        });
        if (body.status === 'COMPLETED') {
            await this.prisma.equipment.update({
                where: { id: request.equipmentId },
                data: { status: 'OPERATIONAL' }
            });
        }
        return { request };
    }
    async listLogs(req) {
        const logs = await this.prisma.maintenanceLog.findMany({
            where: { tenantId: req.user.tenantId },
            include: {
                equipment: true,
                parts: { include: { item: true } }
            },
            orderBy: [{ logDate: 'desc' }],
        });
        return { logs };
    }
    async createLog(req, body) {
        return await this.prisma.$transaction(async (tx) => {
            let partsCost = 0;
            if (body.parts) {
                partsCost = body.parts.reduce((sum, p) => sum + (p.qtyUsed * p.unitCost), 0);
            }
            const laborCost = body.laborCost || 0;
            const totalCost = partsCost + laborCost;
            const log = await tx.maintenanceLog.create({
                data: {
                    tenantId: req.user.tenantId,
                    equipmentId: body.equipmentId,
                    requestId: body.requestId,
                    scheduleId: body.scheduleId,
                    technicianName: body.technicianName,
                    workType: body.workType,
                    durationMin: body.durationMin,
                    description: body.description,
                    laborCost,
                    partsCost,
                    totalCost,
                    status: 'COMPLETED',
                    parts: body.parts ? {
                        create: body.parts.map(p => ({
                            tenantId: req.user.tenantId,
                            itemId: p.itemId,
                            warehouseId: p.warehouseId,
                            qtyUsed: p.qtyUsed,
                            unitCost: p.unitCost,
                            totalCost: p.qtyUsed * p.unitCost
                        }))
                    } : undefined,
                },
            });
            if (body.workType === 'CORRECTIVE') {
                await tx.equipment.update({
                    where: { id: body.equipmentId },
                    data: { status: 'OPERATIONAL' }
                });
            }
            if (body.requestId) {
                await tx.maintenanceRequest.update({
                    where: { id: body.requestId },
                    data: { status: 'COMPLETED', resolvedDate: new Date() }
                });
            }
            if (body.parts) {
                for (const part of body.parts) {
                    await tx.stockLedger.create({
                        data: {
                            tenantId: req.user.tenantId,
                            itemId: part.itemId,
                            moveType: 'GOODS_ISSUE',
                            refType: 'MAINTENANCE_LOG',
                            refId: log.id,
                            postingDate: new Date(),
                            description: `Spare part usage for maintenance log ${log.id}`,
                            qtyIn: 0,
                            qtyOut: part.qtyUsed,
                            warehouseId: part.warehouseId,
                            unitCost: part.unitCost,
                        }
                    });
                }
            }
            return { log };
        });
    }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, common_1.Get)('equipment'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.equipment.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "listEquipment", null);
__decorate([
    (0, common_1.Post)('equipment'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.equipment.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, maintenance_dto_1.CreateEquipmentDto]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "createEquipment", null);
__decorate([
    (0, common_1.Patch)('equipment/:id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.equipment.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "updateEquipment", null);
__decorate([
    (0, common_1.Get)('schedules'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.maintenance.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "listSchedules", null);
__decorate([
    (0, common_1.Post)('schedules'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.maintenance.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, maintenance_dto_1.CreateMaintenanceScheduleDto]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.maintenance.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "listRequests", null);
__decorate([
    (0, common_1.Post)('requests'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.maintenance.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, maintenance_dto_1.CreateMaintenanceRequestDto]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Patch)('requests/:id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.maintenance.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, maintenance_dto_1.UpdateMaintenanceRequestDto]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "updateRequest", null);
__decorate([
    (0, common_1.Get)('logs'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.maintenance.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "listLogs", null);
__decorate([
    (0, common_1.Post)('logs'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.maintenance.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, maintenance_dto_1.CreateMaintenanceLogDto]),
    __metadata("design:returntype", Promise)
], MaintenanceController.prototype, "createLog", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/maintenance'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], MaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map