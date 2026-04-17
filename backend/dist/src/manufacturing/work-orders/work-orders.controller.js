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
exports.WorkOrdersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const work_order_dto_1 = require("./dto/work-order.dto");
let WorkOrdersController = class WorkOrdersController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const workOrders = await this.prisma.workOrder.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status ? { status: status } : {}),
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { bom: true, finishedGood: true, components: { include: { item: true } } },
            take: 200,
        });
        return { workOrders };
    }
    async get(req, id) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                bom: { include: { items: { include: { componentItem: true } } } },
                finishedGood: true,
                components: { include: { item: true } },
                operations: { orderBy: { lineNo: 'asc' } },
            },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        return { workOrder: wo };
    }
    async create(req, body) {
        const item = await this.prisma.item.findFirst({
            where: { id: body.finishedGoodItemId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Finished good item not found');
        let bomId;
        if (body.bomId) {
            const bom = await this.prisma.billOfMaterials.findFirst({
                where: { id: body.bomId, tenantId: req.user.tenantId, isActive: true },
                select: { id: true },
            });
            if (bom)
                bomId = bom.id;
        }
        const wo = await this.prisma.$transaction(async (tx) => {
            const created = await tx.workOrder.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    bomId,
                    finishedGoodItemId: body.finishedGoodItemId,
                    warehouseId: body.warehouseId,
                    qtyPlanned: body.qtyPlanned,
                    uomCode: body.uomCode,
                    priority: body.priority ?? 50,
                    workCenter: body.workCenter,
                    scheduleType: body.scheduleType ?? 'PLANNED',
                    productionOrder: body.productionOrder,
                    plannedStartDate: body.plannedStartDate ? new Date(body.plannedStartDate) : undefined,
                    plannedEndDate: body.plannedEndDate ? new Date(body.plannedEndDate) : undefined,
                    notes: body.notes,
                },
            });
            if (body.components && body.components.length > 0) {
                await tx.workOrderComponent.createMany({
                    data: body.components.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        workOrderId: created.id,
                        lineNo: it.lineNo ?? idx + 1,
                        itemId: it.itemId,
                        qtyRequired: it.qtyRequired,
                        uomCode: it.uomCode,
                        issueMethod: it.issueMethod ?? 'BACKFLUSH',
                        operationNo: it.operationNo,
                    })),
                });
            }
            if (body.operations && body.operations.length > 0) {
                await tx.workOrderOperation.createMany({
                    data: body.operations.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        workOrderId: created.id,
                        lineNo: it.lineNo ?? idx + 1,
                        operationNo: it.operationNo,
                        description: it.description,
                        workstation: it.workstation,
                        laborHours: it.laborHours,
                        setupTime: it.setupTime,
                        machineHours: it.machineHours,
                        notes: it.notes,
                    })),
                });
            }
            return created;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'WorkOrder',
            entityId: wo.id,
        });
        return { workOrder: wo };
    }
    async update(req, id, body) {
        const existing = await this.prisma.workOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Work Order not found');
        const wo = await this.prisma.workOrder.update({
            where: { id },
            data: {
                qtyPlanned: body.qtyPlanned ?? undefined,
                plannedStartDate: body.plannedStartDate ? new Date(body.plannedStartDate) : undefined,
                plannedEndDate: body.plannedEndDate ? new Date(body.plannedEndDate) : undefined,
                notes: body.notes ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'WorkOrder',
            entityId: wo.id,
        });
        return { workOrder: wo };
    }
    async release(req, id) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        if (wo.status !== 'DRAFT')
            throw new common_1.NotFoundException('Can only release DRAFT work orders');
        const updated = await this.prisma.workOrder.update({
            where: { id },
            data: { status: 'RELEASED', actualStartDate: new Date() },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'release',
            entity: 'WorkOrder',
            entityId: id,
        });
        return { workOrder: updated };
    }
    async complete(req, id, body) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        if (wo.status === 'COMPLETED')
            throw new common_1.NotFoundException('Work Order already completed');
        const updated = await this.prisma.workOrder.update({
            where: { id },
            data: {
                status: 'COMPLETED',
                qtyProduced: body.qtyProduced,
                actualEndDate: new Date(),
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'complete',
            entity: 'WorkOrder',
            entityId: id,
        });
        return { workOrder: updated };
    }
};
exports.WorkOrdersController = WorkOrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.work_order.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.work_order.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.work_order.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, work_order_dto_1.CreateWorkOrderDto]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.work_order.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, work_order_dto_1.UpdateWorkOrderDto]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/release'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.work_order.release'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "release", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.work_order.complete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "complete", null);
exports.WorkOrdersController = WorkOrdersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/work-orders'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], WorkOrdersController);
//# sourceMappingURL=work-orders.controller.js.map