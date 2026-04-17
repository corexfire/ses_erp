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
exports.PodController = exports.MobileSubmitPodDto = exports.SubmitPodDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
class SubmitPodDto {
    receivedBy;
    receivedAt;
    notes;
    signatureFileId;
    photoFileIds;
    geoLat;
    geoLng;
}
exports.SubmitPodDto = SubmitPodDto;
class MobileSubmitPodDto {
    receivedBy;
    receivedAt;
    notes;
    signatureFileId;
    photoFileIds;
    geoLat;
    geoLng;
}
exports.MobileSubmitPodDto = MobileSubmitPodDto;
let PodController = class PodController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async submitPod(req, id, body) {
        const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!deliveryOrder)
            throw new common_1.NotFoundException('Delivery order not found');
        if (deliveryOrder.status !== 'IN_TRANSIT') {
            throw new Error('Can only submit POD for delivery orders in transit');
        }
        const existingPod = await this.prisma.proofOfDelivery.findFirst({
            where: { deliveryOrderId: id },
            select: { id: true },
        });
        if (existingPod) {
            throw new Error('POD already exists for this delivery order');
        }
        const pod = await this.prisma.proofOfDelivery.create({
            data: {
                tenantId: req.user.tenantId,
                deliveryOrderId: id,
                receivedBy: body.receivedBy,
                receivedAt: new Date(body.receivedAt),
                notes: body.notes,
                signatureFileId: body.signatureFileId,
                photoFileIds: body.photoFileIds || [],
                geoLat: body.geoLat,
                geoLng: body.geoLng,
                status: 'CAPTURED',
            },
        });
        await this.prisma.deliveryOrder.update({
            where: { id },
            data: { status: 'DELIVERED', actualDeliveredAt: new Date(body.receivedAt) },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'SUBMIT_POD',
            entity: 'ProofOfDelivery',
            entityId: pod.id,
            metadata: { deliveryOrderCode: deliveryOrder.code, receivedBy: body.receivedBy },
        });
        return { pod };
    }
    async mobileSubmitPod(token, body) {
        const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
            where: {
                podToken: token,
                podTokenExpiry: { gte: new Date() },
            },
            select: { id: true, code: true, tenantId: true, status: true },
        });
        if (!deliveryOrder)
            throw new common_1.NotFoundException('Invalid or expired POD token');
        if (deliveryOrder.status !== 'IN_TRANSIT') {
            throw new Error('Can only submit POD for delivery orders in transit');
        }
        const existingPod = await this.prisma.proofOfDelivery.findFirst({
            where: { deliveryOrderId: deliveryOrder.id },
            select: { id: true },
        });
        if (existingPod) {
            throw new Error('POD already exists for this delivery order');
        }
        const pod = await this.prisma.proofOfDelivery.create({
            data: {
                tenantId: deliveryOrder.tenantId,
                deliveryOrderId: deliveryOrder.id,
                receivedBy: body.receivedBy,
                receivedAt: new Date(body.receivedAt),
                notes: body.notes,
                signatureFileId: body.signatureFileId,
                photoFileIds: body.photoFileIds || [],
                geoLat: body.geoLat,
                geoLng: body.geoLng,
                status: 'CAPTURED',
            },
        });
        await this.prisma.deliveryOrder.update({
            where: { id: deliveryOrder.id },
            data: { status: 'DELIVERED', actualDeliveredAt: new Date(body.receivedAt) },
        });
        await this.audit.log({
            tenantId: deliveryOrder.tenantId,
            actorUserId: 'MOBILE_DRIVER',
            action: 'SUBMIT_POD_MOBILE',
            entity: 'ProofOfDelivery',
            entityId: pod.id,
            metadata: { deliveryOrderCode: deliveryOrder.code, receivedBy: body.receivedBy },
        });
        return { success: true, podId: pod.id };
    }
    async markFailed(req, id, body) {
        const deliveryOrder = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true, tripPlanId: true },
        });
        if (!deliveryOrder)
            throw new common_1.NotFoundException('Delivery order not found');
        if (deliveryOrder.status !== 'IN_TRANSIT') {
            throw new Error('Can only mark failed for delivery orders in transit');
        }
        await this.prisma.deliveryException.create({
            data: {
                tenantId: req.user.tenantId,
                deliveryOrderId: id,
                tripPlanId: deliveryOrder.tripPlanId,
                reason: body.reason,
                description: body.description,
                reportedAt: new Date(),
                reportedBy: req.user.id,
            },
        });
        await this.prisma.deliveryOrder.update({
            where: { id },
            data: { status: 'FAILED' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'MARK_FAILED',
            entity: 'DeliveryOrder',
            entityId: id,
            metadata: { code: deliveryOrder.code, reason: body.reason },
        });
        return { success: true };
    }
    async createRedelivery(req, id) {
        const original = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: true },
        });
        if (!original)
            throw new common_1.NotFoundException('Delivery order not found');
        if (original.status !== 'FAILED') {
            throw new Error('Can only create redelivery for failed delivery orders');
        }
        const count = await this.prisma.deliveryOrder.count({ where: { tenantId: req.user.tenantId } });
        const code = `DO-RD-${String(count + 1).padStart(6, '0')}`;
        const redelivery = await this.prisma.deliveryOrder.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                shipmentId: original.shipmentId,
                salesOrderId: original.salesOrderId,
                customerId: original.customerId,
                warehouseId: original.warehouseId,
                priority: 'HIGH',
                plannedShipDate: undefined,
                deliveryAddress1: original.deliveryAddress1,
                deliveryAddress2: original.deliveryAddress2,
                deliveryCity: original.deliveryCity,
                deliveryProvince: original.deliveryProvince,
                deliveryPostalCode: original.deliveryPostalCode,
                status: 'DRAFT',
                items: {
                    create: original.items.map((item, idx) => ({
                        tenantId: req.user.tenantId,
                        lineNo: idx + 1,
                        itemId: item.itemId,
                        description: item.description,
                        orderedQty: item.orderedQty,
                        uomCode: item.uomCode,
                        unitPrice: item.unitPrice,
                    })),
                },
            },
            include: { items: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE_REDELIVERY',
            entity: 'DeliveryOrder',
            entityId: redelivery.id,
            metadata: { originalDoId: id, redeliveryCode: code },
        });
        return { deliveryOrder: redelivery };
    }
};
exports.PodController = PodController;
__decorate([
    (0, common_1.Post)('delivery-orders/:id/pod'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.pod.capture'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, SubmitPodDto]),
    __metadata("design:returntype", Promise)
], PodController.prototype, "submitPod", null);
__decorate([
    (0, common_1.Post)('pod/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, MobileSubmitPodDto]),
    __metadata("design:returntype", Promise)
], PodController.prototype, "mobileSubmitPod", null);
__decorate([
    (0, common_1.Post)('delivery-orders/:id/fail'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.pod.capture'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PodController.prototype, "markFailed", null);
__decorate([
    (0, common_1.Post)('delivery-orders/:id/redelivery'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PodController.prototype, "createRedelivery", null);
exports.PodController = PodController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PodController);
//# sourceMappingURL=pod.controller.js.map