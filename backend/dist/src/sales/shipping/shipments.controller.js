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
exports.ShipmentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_shipment_dto_1 = require("./dto/create-shipment.dto");
const update_shipment_dto_1 = require("./dto/update-shipment.dto");
const shipmentStatusSet = new Set([
    'CREATED',
    'SHIPPED',
    'DELIVERED',
    'CANCELED',
]);
const isShipmentStatus = (value) => Boolean(value) && shipmentStatusSet.has(value);
let ShipmentsController = class ShipmentsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const shipments = await this.prisma.shipment.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { trackingNo: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
                ...(isShipmentStatus(status) ? { status } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { carrier: true, order: { include: { customer: true } } },
            take: 200,
        });
        return { shipments };
    }
    async get(req, id) {
        const shipment = await this.prisma.shipment.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                carrier: true,
                order: {
                    include: { customer: true, items: { orderBy: [{ lineNo: 'asc' }] } },
                },
            },
        });
        if (!shipment)
            throw new common_1.NotFoundException('Shipment not found');
        return { shipment };
    }
    async create(req, body) {
        if (body.orderId) {
            const order = await this.prisma.salesOrder.findFirst({
                where: { id: body.orderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!order)
                throw new common_1.NotFoundException('Sales order not found');
        }
        if (body.carrierId) {
            const carrier = await this.prisma.carrier.findFirst({
                where: { id: body.carrierId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!carrier)
                throw new common_1.NotFoundException('Carrier not found');
        }
        const shipment = await this.prisma.shipment.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                orderId: body.orderId,
                carrierId: body.carrierId,
                trackingNo: body.trackingNo,
                shipDate: body.shipDate ? new Date(body.shipDate) : undefined,
                deliveryDate: body.deliveryDate
                    ? new Date(body.deliveryDate)
                    : undefined,
                status: body.status ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Shipment',
            entityId: shipment.id,
        });
        return { shipment };
    }
    async update(req, id, body) {
        const exists = await this.prisma.shipment.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Shipment not found');
        if (body.orderId) {
            const order = await this.prisma.salesOrder.findFirst({
                where: { id: body.orderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!order)
                throw new common_1.NotFoundException('Sales order not found');
        }
        if (body.carrierId) {
            const carrier = await this.prisma.carrier.findFirst({
                where: { id: body.carrierId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!carrier)
                throw new common_1.NotFoundException('Carrier not found');
        }
        const shipment = await this.prisma.shipment.update({
            where: { id },
            data: {
                orderId: body.orderId ?? undefined,
                carrierId: body.carrierId ?? undefined,
                trackingNo: body.trackingNo ?? undefined,
                shipDate: body.shipDate ? new Date(body.shipDate) : undefined,
                deliveryDate: body.deliveryDate
                    ? new Date(body.deliveryDate)
                    : undefined,
                status: body.status ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'Shipment',
            entityId: shipment.id,
        });
        return { shipment };
    }
};
exports.ShipmentsController = ShipmentsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.shipping.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ShipmentsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.shipping.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ShipmentsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.shipping.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_shipment_dto_1.CreateShipmentDto]),
    __metadata("design:returntype", Promise)
], ShipmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.shipping.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_shipment_dto_1.UpdateShipmentDto]),
    __metadata("design:returntype", Promise)
], ShipmentsController.prototype, "update", null);
exports.ShipmentsController = ShipmentsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/shipping/shipments'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ShipmentsController);
//# sourceMappingURL=shipments.controller.js.map