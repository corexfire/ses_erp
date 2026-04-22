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
exports.DeliveryController = exports.UpdateDeliveryOrderDto = exports.CreateDeliveryOrderDto = exports.CreateDeliveryOrderItemDto = exports.GenerateDeliveryOrderDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const crypto_1 = require("crypto");
const deliveryOrderStatusSet = new Set([
    'DRAFT', 'PLANNED', 'RELEASED', 'PICKING', 'STAGED', 'LOADED', 'IN_TRANSIT', 'DELIVERED', 'FAILED', 'RTO', 'CANCELED',
]);
const isDeliveryOrderStatus = (value) => Boolean(value) && deliveryOrderStatusSet.has(value);
class GenerateDeliveryOrderDto {
    shipmentIds;
    plannedShipDate;
    warehouseId;
    priority;
}
exports.GenerateDeliveryOrderDto = GenerateDeliveryOrderDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], GenerateDeliveryOrderDto.prototype, "shipmentIds", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateDeliveryOrderDto.prototype, "plannedShipDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateDeliveryOrderDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['URGENT', 'HIGH', 'NORMAL', 'LOW']),
    __metadata("design:type", String)
], GenerateDeliveryOrderDto.prototype, "priority", void 0);
class CreateDeliveryOrderItemDto {
    itemId;
    description;
    orderedQty;
    uomCode;
    unitPrice;
    batchNo;
    serialNo;
}
exports.CreateDeliveryOrderItemDto = CreateDeliveryOrderItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderItemDto.prototype, "itemId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeliveryOrderItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDeliveryOrderItemDto.prototype, "orderedQty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderItemDto.prototype, "uomCode", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDeliveryOrderItemDto.prototype, "unitPrice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderItemDto.prototype, "batchNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderItemDto.prototype, "serialNo", void 0);
class CreateDeliveryOrderDto {
    code;
    shipmentId;
    salesOrderId;
    customerId;
    warehouseId;
    plannedShipDate;
    priority;
    deliveryAddress1;
    deliveryAddress2;
    deliveryCity;
    deliveryProvince;
    deliveryPostalCode;
    deliveryNotes;
    items;
}
exports.CreateDeliveryOrderDto = CreateDeliveryOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "shipmentId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "salesOrderId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "warehouseId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "plannedShipDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['URGENT', 'HIGH', 'NORMAL', 'LOW']),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "deliveryAddress1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "deliveryAddress2", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "deliveryCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "deliveryProvince", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "deliveryPostalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeliveryOrderDto.prototype, "deliveryNotes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateDeliveryOrderItemDto),
    __metadata("design:type", Array)
], CreateDeliveryOrderDto.prototype, "items", void 0);
class UpdateDeliveryOrderDto {
    plannedShipDate;
    priority;
    deliveryAddress1;
    deliveryAddress2;
    deliveryCity;
    deliveryProvince;
    deliveryPostalCode;
    deliveryNotes;
}
exports.UpdateDeliveryOrderDto = UpdateDeliveryOrderDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "plannedShipDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['URGENT', 'HIGH', 'NORMAL', 'LOW']),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "deliveryAddress1", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "deliveryAddress2", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "deliveryCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "deliveryProvince", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "deliveryPostalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDeliveryOrderDto.prototype, "deliveryNotes", void 0);
let DeliveryController = class DeliveryController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status, warehouseId, plannedShipDate, q) {
        const where = { tenantId: req.user.tenantId };
        if (isDeliveryOrderStatus(status))
            where.status = status;
        if (warehouseId)
            where.warehouseId = warehouseId;
        if (plannedShipDate)
            where.plannedShipDate = { gte: new Date(plannedShipDate + 'T00:00:00Z'), lt: new Date(plannedShipDate + 'T23:59:59Z') };
        if (q) {
            where.OR = [
                { code: { contains: q, mode: 'insensitive' } },
                { shipmentId: { contains: q, mode: 'insensitive' } },
            ];
        }
        const deliveryOrders = await this.prisma.deliveryOrder.findMany({
            where,
            orderBy: [{ createdAt: 'desc' }],
            include: { customer: true, warehouse: true, tripPlan: true, proofOfDelivery: true, _count: { select: { items: true } } },
            take: 200,
        });
        return { deliveryOrders };
    }
    async get(req, id) {
        const do_ = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                customer: true,
                warehouse: true,
                tripPlan: true,
                proofOfDelivery: true,
                items: { orderBy: { lineNo: 'asc' }, include: { item: true } },
                exceptions: true,
            },
        });
        if (!do_)
            throw new common_1.NotFoundException('Delivery order not found');
        return { deliveryOrder: do_ };
    }
    async generate(req, body) {
        const shipments = await this.prisma.shipment.findMany({
            where: {
                OR: [
                    { id: { in: body.shipmentIds } },
                    { code: { in: body.shipmentIds } },
                ],
                tenantId: req.user.tenantId,
                status: 'CREATED',
            },
            include: { order: { include: { customer: true, items: true } }, carrier: true },
        });
        if (shipments.length !== body.shipmentIds.length) {
            throw new Error('Some shipments not found or not eligible for delivery order generation');
        }
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id: body.warehouseId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const deliveryOrders = [];
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        for (let i = 0; i < shipments.length; i++) {
            const shipment = shipments[i];
            const order = shipment.order;
            const existingDo = await this.prisma.deliveryOrder.findFirst({
                where: { shipmentId: shipment.id, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (existingDo)
                continue;
            const count = await this.prisma.deliveryOrder.count({ where: { tenantId: req.user.tenantId } });
            const code = `DO-${today}-${String(count + 1 + i).padStart(4, '0')}`;
            const podToken = (0, crypto_1.randomBytes)(32).toString('hex');
            const podTokenExpiry = new Date();
            podTokenExpiry.setDate(podTokenExpiry.getDate() + 7);
            const deliveryOrder = await this.prisma.deliveryOrder.create({
                data: {
                    tenantId: req.user.tenantId,
                    code,
                    shipmentId: shipment.id,
                    salesOrderId: order?.id,
                    customerId: order?.customerId || shipment.orderId || '',
                    warehouseId: body.warehouseId,
                    priority: body.priority || 'NORMAL',
                    plannedShipDate: new Date(body.plannedShipDate),
                    deliveryAddress1: order?.customer?.address1,
                    deliveryAddress2: order?.customer?.address2,
                    deliveryCity: order?.customer?.city,
                    deliveryProvince: order?.customer?.province,
                    deliveryPostalCode: order?.customer?.postalCode,
                    status: 'PLANNED',
                    podToken,
                    podTokenExpiry,
                    items: order?.items ? {
                        create: order.items.map((item, idx) => ({
                            tenantId: req.user.tenantId,
                            lineNo: idx + 1,
                            description: item.description,
                            orderedQty: item.qty,
                            uomCode: item.uomCode,
                            unitPrice: item.unitPrice,
                        })),
                    } : undefined,
                },
                include: { customer: true, items: true },
            });
            deliveryOrders.push(deliveryOrder);
            await this.audit.log({
                tenantId: req.user.tenantId,
                actorUserId: req.user.id,
                action: 'GENERATE',
                entity: 'DeliveryOrder',
                entityId: deliveryOrder.id,
                metadata: { code, shipmentId: shipment.id, warehouseId: body.warehouseId },
            });
        }
        return { deliveryOrders, generated: deliveryOrders.length, skipped: body.shipmentIds.length - deliveryOrders.length };
    }
    async create(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id: body.warehouseId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const customer = await this.prisma.customer.findFirst({
            where: { id: body.customerId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const count = await this.prisma.deliveryOrder.count({ where: { tenantId: req.user.tenantId } });
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const code = body.code || `DO-${today}-${String(count + 1).padStart(4, '0')}`;
        const podToken = (0, crypto_1.randomBytes)(32).toString('hex');
        const podTokenExpiry = new Date();
        podTokenExpiry.setDate(podTokenExpiry.getDate() + 7);
        const deliveryOrder = await this.prisma.deliveryOrder.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                shipmentId: body.shipmentId,
                salesOrderId: body.salesOrderId,
                customerId: body.customerId,
                warehouseId: body.warehouseId,
                priority: body.priority || 'NORMAL',
                plannedShipDate: body.plannedShipDate ? new Date(body.plannedShipDate) : undefined,
                deliveryAddress1: body.deliveryAddress1,
                deliveryAddress2: body.deliveryAddress2,
                deliveryCity: body.deliveryCity,
                deliveryProvince: body.deliveryProvince,
                deliveryPostalCode: body.deliveryPostalCode,
                deliveryNotes: body.deliveryNotes,
                status: 'DRAFT',
                podToken,
                podTokenExpiry,
                items: body.items ? {
                    create: body.items.map((item, idx) => ({
                        tenantId: req.user.tenantId,
                        lineNo: idx + 1,
                        itemId: item.itemId,
                        description: item.description,
                        orderedQty: item.orderedQty,
                        uomCode: item.uomCode,
                        unitPrice: item.unitPrice || 0,
                        batchNo: item.batchNo,
                        serialNo: item.serialNo,
                    })),
                } : undefined,
            },
            include: { customer: true, items: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'DeliveryOrder',
            entityId: deliveryOrder.id,
            metadata: { code },
        });
        return { deliveryOrder };
    }
    async update(req, id, body) {
        const existing = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Delivery order not found');
        if (existing.status !== 'DRAFT' && existing.status !== 'PLANNED') {
            throw new Error('Can only update draft or planned delivery orders');
        }
        const updated = await this.prisma.deliveryOrder.update({
            where: { id },
            data: {
                ...(body.plannedShipDate && { plannedShipDate: new Date(body.plannedShipDate) }),
                ...(body.priority && { priority: body.priority }),
                ...(body.deliveryAddress1 !== undefined && { deliveryAddress1: body.deliveryAddress1 }),
                ...(body.deliveryAddress2 !== undefined && { deliveryAddress2: body.deliveryAddress2 }),
                ...(body.deliveryCity !== undefined && { deliveryCity: body.deliveryCity }),
                ...(body.deliveryProvince !== undefined && { deliveryProvince: body.deliveryProvince }),
                ...(body.deliveryPostalCode !== undefined && { deliveryPostalCode: body.deliveryPostalCode }),
                ...(body.deliveryNotes !== undefined && { deliveryNotes: body.deliveryNotes }),
            },
            include: { customer: true, items: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'DeliveryOrder',
            entityId: id,
            metadata: { code: updated.code },
        });
        return { deliveryOrder: updated };
    }
    async release(req, id) {
        const existing = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true, items: { select: { id: true } } },
        });
        if (!existing)
            throw new common_1.NotFoundException('Delivery order not found');
        if (existing.status !== 'DRAFT' && existing.status !== 'PLANNED') {
            throw new Error('Can only release draft or planned delivery orders');
        }
        if (existing.items.length === 0) {
            throw new Error('Cannot release delivery order without items');
        }
        const updated = await this.prisma.deliveryOrder.update({
            where: { id },
            data: { status: 'RELEASED' },
            include: { customer: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'RELEASE',
            entity: 'DeliveryOrder',
            entityId: id,
            metadata: { code: existing.code },
        });
        return { deliveryOrder: updated };
    }
    async cancel(req, id) {
        const existing = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true, tripPlanId: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Delivery order not found');
        if (['IN_TRANSIT', 'DELIVERED', 'RTO'].includes(existing.status)) {
            throw new Error('Cannot cancel delivery order that is in transit or already delivered');
        }
        if (existing.tripPlanId) {
            await this.prisma.deliveryOrder.update({
                where: { id },
                data: { tripPlanId: null },
            });
        }
        const updated = await this.prisma.deliveryOrder.update({
            where: { id },
            data: { status: 'CANCELED', tripPlanId: null },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CANCEL',
            entity: 'DeliveryOrder',
            entityId: id,
            metadata: { code: existing.code },
        });
        return { deliveryOrder: updated };
    }
    async markDelivered(req, id) {
        const existing = await this.prisma.deliveryOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('Delivery order not found');
        if (existing.status !== 'IN_TRANSIT' && existing.status !== 'RELEASED') {
            throw new Error('Can only mark as delivered if in transit or released');
        }
        const updated = await this.prisma.deliveryOrder.update({
            where: { id },
            data: { status: 'DELIVERED', actualDeliveredAt: new Date() },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'DELIVER',
            entity: 'DeliveryOrder',
            entityId: id,
            metadata: { code: existing.code },
        });
        return { deliveryOrder: updated };
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('warehouseId')),
    __param(3, (0, common_1.Query)('plannedShipDate')),
    __param(4, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GenerateDeliveryOrderDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateDeliveryOrderDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateDeliveryOrderDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/release'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "release", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(':id/delivered'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.delivery.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "markDelivered", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/delivery-orders'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], DeliveryController);
//# sourceMappingURL=delivery.controller.js.map