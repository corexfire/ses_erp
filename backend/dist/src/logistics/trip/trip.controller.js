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
exports.TripController = exports.RouteController = exports.AddCheckpointDto = exports.DispatchTripDto = exports.AssignDeliveriesDto = exports.CreateTripDto = exports.CreateRouteTemplateDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const tripStatusSet = new Set(['PLANNED', 'READY', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']);
const isTripStatus = (value) => Boolean(value) && tripStatusSet.has(value);
class CreateRouteTemplateDto {
    code;
    name;
    warehouseId;
    description;
}
exports.CreateRouteTemplateDto = CreateRouteTemplateDto;
class CreateTripDto {
    routeDate;
    vehicleId;
    driverId;
    routeTemplateId;
    notes;
}
exports.CreateTripDto = CreateTripDto;
class AssignDeliveriesDto {
    deliveryOrderIds;
}
exports.AssignDeliveriesDto = AssignDeliveriesDto;
class DispatchTripDto {
    vehicleId;
    driverId;
    loaderUserIds;
    departureAt;
}
exports.DispatchTripDto = DispatchTripDto;
class AddCheckpointDto {
    checkpointType;
    locationName;
    latitude;
    longitude;
    deliveryOrderId;
    notes;
}
exports.AddCheckpointDto = AddCheckpointDto;
let RouteController = class RouteController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listRoutes(req, q) {
        const routes = await this.prisma.routeTemplate.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { warehouse: true },
            take: 200,
        });
        return { routes };
    }
    async getRoute(req, id) {
        const route = await this.prisma.routeTemplate.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { warehouse: true, tripPlans: { take: 20, orderBy: { routeDate: 'desc' } } },
        });
        if (!route)
            throw new common_1.NotFoundException('Route template not found');
        return { route };
    }
    async createRoute(req, body) {
        const count = await this.prisma.routeTemplate.count({ where: { tenantId: req.user.tenantId } });
        const code = `RTE-${String(count + 1).padStart(6, '0')}`;
        const route = await this.prisma.routeTemplate.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code || code,
                name: body.name,
                warehouseId: body.warehouseId,
                description: body.description,
            },
            include: { warehouse: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'RouteTemplate',
            entityId: route.id,
            metadata: { code: route.code, name: route.name },
        });
        return { route };
    }
};
exports.RouteController = RouteController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.route.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "listRoutes", null);
__decorate([
    (0, common_1.Get)('route/:id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.route.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getRoute", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.route.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateRouteTemplateDto]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "createRoute", null);
exports.RouteController = RouteController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/routes'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RouteController);
let TripController = class TripController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status, routeDate, vehicleId, driverId) {
        const where = { tenantId: req.user.tenantId };
        if (isTripStatus(status))
            where.status = status;
        if (routeDate)
            where.routeDate = { gte: new Date(routeDate + 'T00:00:00Z'), lt: new Date(routeDate + 'T23:59:59Z') };
        if (vehicleId)
            where.vehicleId = vehicleId;
        if (driverId)
            where.driverId = driverId;
        const trips = await this.prisma.tripPlan.findMany({
            where,
            orderBy: [{ routeDate: 'desc' }],
            include: { vehicle: true, driver: true, routeTemplate: true, _count: { select: { deliveryOrders: true } } },
            take: 200,
        });
        return { trips };
    }
    async get(req, id) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                vehicle: true,
                driver: true,
                routeTemplate: true,
                checkpoints: { orderBy: { timestamp: 'asc' } },
                deliveryOrders: { include: { customer: true, proofOfDelivery: true } },
                costs: true,
            },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        return { trip };
    }
    async create(req, body) {
        if (body.vehicleId) {
            const vehicle = await this.prisma.fleetVehicle.findFirst({
                where: { id: body.vehicleId, tenantId: req.user.tenantId, status: 'ACTIVE' },
                select: { id: true },
            });
            if (!vehicle)
                throw new common_1.NotFoundException('Vehicle not found or inactive');
        }
        if (body.driverId) {
            const driver = await this.prisma.logisticsDriver.findFirst({
                where: { id: body.driverId, tenantId: req.user.tenantId, status: 'ACTIVE' },
                select: { id: true },
            });
            if (!driver)
                throw new common_1.NotFoundException('Driver not found or inactive');
        }
        const count = await this.prisma.tripPlan.count({ where: { tenantId: req.user.tenantId } });
        const code = `TRP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(count + 1).padStart(4, '0')}`;
        const trip = await this.prisma.tripPlan.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                routeDate: new Date(body.routeDate),
                vehicleId: body.vehicleId,
                driverId: body.driverId,
                routeTemplateId: body.routeTemplateId,
                notes: body.notes,
                status: 'PLANNED',
            },
            include: { vehicle: true, driver: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'TripPlan',
            entityId: trip.id,
            metadata: { code: trip.code, routeDate: body.routeDate },
        });
        return { trip };
    }
    async assignDeliveries(req, id, body) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        if (trip.status !== 'PLANNED') {
            throw new Error('Can only assign deliveries to planned trips');
        }
        const deliveryOrders = await this.prisma.deliveryOrder.findMany({
            where: {
                id: { in: body.deliveryOrderIds },
                tenantId: req.user.tenantId,
                status: { in: ['PLANNED', 'RELEASED'] },
            },
            select: { id: true },
        });
        if (deliveryOrders.length !== body.deliveryOrderIds.length) {
            throw new Error('Some delivery orders not found or not eligible');
        }
        await this.prisma.deliveryOrder.updateMany({
            where: { id: { in: body.deliveryOrderIds } },
            data: { tripPlanId: id },
        });
        await this.prisma.tripPlan.update({
            where: { id },
            data: { status: 'READY' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'ASSIGN_DELIVERIES',
            entity: 'TripPlan',
            entityId: id,
            metadata: { tripCode: trip.code, deliveryOrderCount: body.deliveryOrderIds.length },
        });
        return { success: true, assignedCount: deliveryOrders.length };
    }
    async dispatch(req, id, body) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        if (!['PLANNED', 'READY'].includes(trip.status)) {
            throw new Error('Can only dispatch planned or ready trips');
        }
        if (!body.vehicleId || !body.driverId) {
            throw new Error('Vehicle and Driver are required for dispatch');
        }
        const updated = await this.prisma.tripPlan.update({
            where: { id },
            data: {
                vehicleId: body.vehicleId,
                driverId: body.driverId,
                status: 'DISPATCHED',
                departureAt: new Date(body.departureAt),
                actualDepartureAt: new Date(body.departureAt),
            },
            include: { vehicle: true, driver: true },
        });
        await this.prisma.deliveryOrder.updateMany({
            where: { tripPlanId: id, status: { in: ['RELEASED', 'LOADED'] } },
            data: { status: 'IN_TRANSIT', actualShipDate: new Date() },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'DISPATCH',
            entity: 'TripPlan',
            entityId: id,
            metadata: { tripCode: trip.code, vehicleId: body.vehicleId, driverId: body.driverId, departureAt: body.departureAt },
        });
        return { trip: updated };
    }
    async addCheckpoint(req, id, body) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        const checkpoint = await this.prisma.tripCheckpoint.create({
            data: {
                tenantId: req.user.tenantId,
                tripPlanId: id,
                checkpointType: body.checkpointType,
                locationName: body.locationName,
                latitude: body.latitude,
                longitude: body.longitude,
                timestamp: new Date(),
                notes: body.notes,
                deliveryOrderId: body.deliveryOrderId,
            },
        });
        if (body.checkpointType === 'DEPARTED') {
            await this.prisma.tripPlan.update({
                where: { id },
                data: { status: 'IN_PROGRESS' },
            });
        }
        else if (body.checkpointType === 'RETURNED' || body.checkpointType === 'DELIVERED') {
            await this.prisma.tripPlan.update({
                where: { id },
                data: { status: 'COMPLETED', actualReturnAt: new Date() },
            });
        }
        if (body.deliveryOrderId) {
            if (body.checkpointType === 'DELIVERED') {
                await this.prisma.deliveryOrder.update({
                    where: { id: body.deliveryOrderId },
                    data: { status: 'DELIVERED', actualDeliveredAt: new Date() },
                });
            }
            else if (body.checkpointType === 'FAILED') {
                await this.prisma.deliveryOrder.update({
                    where: { id: body.deliveryOrderId },
                    data: { status: 'FAILED' },
                });
            }
        }
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'ADD_CHECKPOINT',
            entity: 'TripCheckpoint',
            entityId: checkpoint.id,
            metadata: { tripId: id, checkpointType: body.checkpointType },
        });
        return { checkpoint };
    }
    async complete(req, id) {
        const trip = await this.prisma.tripPlan.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true, status: true },
        });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        if (!['DISPATCHED', 'IN_PROGRESS'].includes(trip.status)) {
            throw new Error('Can only complete dispatched or in-progress trips');
        }
        const updated = await this.prisma.tripPlan.update({
            where: { id },
            data: { status: 'COMPLETED', actualReturnAt: new Date() },
            include: { vehicle: true, driver: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'COMPLETE',
            entity: 'TripPlan',
            entityId: id,
            metadata: { tripCode: trip.code },
        });
        return { trip: updated };
    }
};
exports.TripController = TripController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.trip.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('routeDate')),
    __param(3, (0, common_1.Query)('vehicleId')),
    __param(4, (0, common_1.Query)('driverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.trip.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.trip.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateTripDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/assign-deliveries'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.trip.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, AssignDeliveriesDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "assignDeliveries", null);
__decorate([
    (0, common_1.Post)(':id/dispatch'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.dispatch.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, DispatchTripDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "dispatch", null);
__decorate([
    (0, common_1.Post)(':id/checkpoints'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.dispatch.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, AddCheckpointDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "addCheckpoint", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.dispatch.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "complete", null);
exports.TripController = TripController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/trips'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], TripController);
//# sourceMappingURL=trip.controller.js.map