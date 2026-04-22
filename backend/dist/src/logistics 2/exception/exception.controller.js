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
exports.ExceptionController = exports.CreateExceptionDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
class CreateExceptionDto {
    reason;
    description;
}
exports.CreateExceptionDto = CreateExceptionDto;
let ExceptionController = class ExceptionController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async getByDeliveryOrder(req, doId) {
        const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
            where: { id: doId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!deliveryOrder)
            throw new common_1.NotFoundException('Delivery order not found');
        const exceptions = await this.prisma.deliveryException.findMany({
            where: { deliveryOrderId: doId },
            orderBy: { createdAt: 'desc' },
        });
        return { exceptions };
    }
    async getByTrip(req, tripId) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id: tripId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        const exceptions = await this.prisma.deliveryException.findMany({
            where: { tripPlanId: tripId },
            include: { deliveryOrder: { include: { customer: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return { exceptions };
    }
    async list(req) {
        const exceptions = await this.prisma.deliveryException.findMany({
            where: { tenantId: req.user.tenantId },
            include: {
                deliveryOrder: { include: { customer: true } },
                tripPlan: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { exceptions };
    }
    async get(req, id) {
        const exception = await this.prisma.deliveryException.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                deliveryOrder: { include: { customer: true } },
                tripPlan: true,
            },
        });
        if (!exception)
            throw new common_1.NotFoundException('Exception not found');
        return { exception };
    }
    async createRTO(req, doId, body) {
        const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
            where: { id: doId, tenantId: req.user.tenantId },
            include: { items: true },
        });
        if (!deliveryOrder)
            throw new common_1.NotFoundException('Delivery order not found');
        if (!['IN_TRANSIT', 'FAILED'].includes(deliveryOrder.status)) {
            throw new Error('Can only create RTO for in-transit or failed delivery orders');
        }
        await this.prisma.deliveryOrder.update({
            where: { id: doId },
            data: { status: 'RTO' },
        });
        await this.prisma.deliveryException.create({
            data: {
                tenantId: req.user.tenantId,
                deliveryOrderId: doId,
                tripPlanId: deliveryOrder.tripPlanId,
                reason: 'RETURN_TO_ORIGIN',
                description: body.notes || 'Return to origin initiated',
                reportedAt: new Date(),
                reportedBy: req.user.id,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'RTO',
            entity: 'DeliveryOrder',
            entityId: doId,
            metadata: { code: deliveryOrder.code },
        });
        return { success: true };
    }
};
exports.ExceptionController = ExceptionController;
__decorate([
    (0, common_1.Get)('delivery-order/:doId'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('doId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExceptionController.prototype, "getByDeliveryOrder", null);
__decorate([
    (0, common_1.Get)('trip/:tripId'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.trip.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExceptionController.prototype, "getByTrip", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExceptionController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExceptionController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('delivery-order/:doId/rto'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('doId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ExceptionController.prototype, "createRTO", null);
exports.ExceptionController = ExceptionController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/exceptions'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ExceptionController);
//# sourceMappingURL=exception.controller.js.map