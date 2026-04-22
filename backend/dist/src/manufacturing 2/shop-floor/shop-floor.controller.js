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
exports.ShopFloorController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let ShopFloorController = class ShopFloorController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listActiveWorkOrders(req) {
        const workOrders = await this.prisma.workOrder.findMany({
            where: {
                tenantId: req.user.tenantId,
                status: { in: ['RELEASED', 'IN_PROGRESS'] },
            },
            orderBy: [{ plannedStartDate: 'asc' }],
            include: {
                finishedGood: true,
                operations: { orderBy: { lineNo: 'asc' } },
                components: { include: { item: true } },
            },
            take: 100,
        });
        return { workOrders };
    }
    async getWorkOrderDetails(req, id) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                finishedGood: true,
                operations: { orderBy: { lineNo: 'asc' } },
                components: { include: { item: true } },
                shopFloorLogs: { orderBy: { loggedAt: 'desc' }, take: 20 },
                shopFloorTimers: { where: { status: 'RUNNING' } },
            },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        return { workOrder: wo };
    }
    async startOperation(req, body) {
        const op = await this.prisma.workOrderOperation.findFirst({
            where: { id: body.operationId, workOrderId: body.workOrderId, tenantId: req.user.tenantId },
        });
        if (!op)
            throw new common_1.NotFoundException('Operation not found');
        const result = await this.prisma.$transaction(async (tx) => {
            const timer = await tx.shopFloorTimer.create({
                data: {
                    tenantId: req.user.tenantId,
                    workOrderId: body.workOrderId,
                    operationId: body.operationId,
                    operatorName: body.operatorName || req.user.email,
                    status: 'RUNNING',
                    startTime: new Date(),
                },
            });
            await tx.workOrderOperation.update({
                where: { id: body.operationId },
                data: {
                    status: 'IN_PROGRESS',
                    operatorName: body.operatorName || req.user.email,
                    claimedAt: op.claimedAt || new Date(),
                },
            });
            await tx.shopFloorLog.create({
                data: {
                    tenantId: req.user.tenantId,
                    workOrderId: body.workOrderId,
                    operationId: body.operationId,
                    operatorName: body.operatorName || req.user.email,
                    action: 'CLOCK_IN',
                    prevStatus: op.status,
                    newStatus: 'IN_PROGRESS',
                },
            });
            return timer;
        });
        return { timer: result };
    }
    async stopOperation(req, body) {
        const timer = await this.prisma.shopFloorTimer.findFirst({
            where: { id: body.timerId, tenantId: req.user.tenantId },
        });
        if (!timer)
            throw new common_1.NotFoundException('Active timer not found');
        const op = await this.prisma.workOrderOperation.findFirst({
            where: { id: body.operationId },
        });
        if (!op)
            throw new common_1.NotFoundException('Operation not found');
        const endTime = new Date();
        const diffMs = endTime.getTime() - timer.startTime.getTime();
        const durationMin = Math.round(diffMs / 60000);
        const laborHours = durationMin / 60;
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.shopFloorTimer.update({
                where: { id: body.timerId },
                data: {
                    status: 'COMPLETED',
                    endTime,
                    durationMin,
                },
            });
            const isLastOp = await tx.workOrderOperation.count({
                where: { workOrderId: body.workOrderId, lineNo: { gt: op.lineNo } }
            }) === 0;
            const newStatus = (Number(op.qtyCompleted) + body.qtyCompleted >= Number(op.machineHours || 999999)) ? 'COMPLETED' : 'IN_PROGRESS';
            await tx.workOrderOperation.update({
                where: { id: body.operationId },
                data: {
                    qtyCompleted: { increment: body.qtyCompleted },
                    rejectedQty: { increment: body.rejectedQty || 0 },
                    scrapQty: { increment: body.scrapQty || 0 },
                    actualLaborHours: { increment: laborHours },
                    status: newStatus,
                    completedAt: newStatus === 'COMPLETED' ? new Date() : null,
                    notes: body.notes,
                },
            });
            if (isLastOp && body.qtyCompleted > 0) {
                await tx.workOrder.update({
                    where: { id: body.workOrderId },
                    data: {
                        qtyProduced: { increment: body.qtyCompleted },
                        status: 'IN_PROGRESS',
                    },
                });
            }
            await tx.shopFloorLog.create({
                data: {
                    tenantId: req.user.tenantId,
                    workOrderId: body.workOrderId,
                    operationId: body.operationId,
                    operatorName: timer.operatorName,
                    action: 'CLOCK_OUT',
                    qtyReported: body.qtyCompleted,
                    laborHours,
                    notes: body.notes,
                    newStatus,
                },
            });
            return { durationMin, laborHours };
        });
        return result;
    }
    async reportQty(req, body) {
        const updateData = {};
        if (body.type === 'GOOD')
            updateData.qtyCompleted = { increment: body.qty };
        else if (body.type === 'REJECT')
            updateData.rejectedQty = { increment: body.qty };
        else
            updateData.scrapQty = { increment: body.qty };
        const op = await this.prisma.workOrderOperation.update({
            where: { id: body.operationId },
            data: updateData,
        });
        await this.prisma.shopFloorLog.create({
            data: {
                tenantId: req.user.tenantId,
                workOrderId: body.workOrderId,
                operationId: body.operationId,
                operatorName: req.user.email,
                action: `REPORT_${body.type}`,
                qtyReported: body.qty,
                notes: body.notes,
            },
        });
        return { operation: op };
    }
};
exports.ShopFloorController = ShopFloorController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.shop_floor.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopFloorController.prototype, "listActiveWorkOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.shop_floor.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ShopFloorController.prototype, "getWorkOrderDetails", null);
__decorate([
    (0, common_1.Post)('start-operation'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.shop_floor.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopFloorController.prototype, "startOperation", null);
__decorate([
    (0, common_1.Post)('stop-operation'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.shop_floor.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopFloorController.prototype, "stopOperation", null);
__decorate([
    (0, common_1.Post)('report-qty'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.shop_floor.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopFloorController.prototype, "reportQty", null);
exports.ShopFloorController = ShopFloorController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/shop-floor'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopFloorController);
//# sourceMappingURL=shop-floor.controller.js.map