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
exports.FleetController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_fleet_vehicle_dto_1 = require("./dto/create-fleet-vehicle.dto");
const update_fleet_vehicle_dto_1 = require("./dto/update-fleet-vehicle.dto");
const maintenance_dto_1 = require("./dto/maintenance.dto");
const document_dto_1 = require("./dto/document.dto");
const vehicleOwnershipTypeSet = new Set(['OWNED', 'LEASED', 'THIRD_PARTY']);
const isVehicleOwnershipType = (value) => Boolean(value) && vehicleOwnershipTypeSet.has(value);
const vehicleStatusSet = new Set(['ACTIVE', 'MAINTENANCE', 'INACTIVE']);
const isVehicleStatus = (value) => Boolean(value) && vehicleStatusSet.has(value);
let FleetController = class FleetController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const vehicles = await this.prisma.fleetVehicle.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { plateNo: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
                ...(isVehicleStatus(status) ? { status } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { transporter: true },
            take: 200,
        });
        return { vehicles };
    }
    async get(req, id) {
        const vehicle = await this.prisma.fleetVehicle.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { transporter: true, tripPlans: { take: 10, orderBy: { routeDate: 'desc' } } },
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        return { vehicle };
    }
    async create(req, body) {
        if (body.transporterId) {
            const transporter = await this.prisma.transporter.findFirst({
                where: { id: body.transporterId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!transporter)
                throw new common_1.NotFoundException('Transporter not found');
        }
        const count = await this.prisma.fleetVehicle.count({ where: { tenantId: req.user.tenantId } });
        const code = `VEH-${String(count + 1).padStart(6, '0')}`;
        const vehicle = await this.prisma.fleetVehicle.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code || code,
                plateNo: body.plateNo,
                vehicleType: body.vehicleType,
                brand: body.brand,
                model: body.model,
                year: body.year,
                ownershipType: body.ownershipType || 'OWNED',
                capacityWeight: body.capacityWeight,
                capacityVolume: body.capacityVolume,
                status: body.status || 'ACTIVE',
                transporterId: body.transporterId,
                stnkNo: body.stnkNo,
                stnkExpiry: body.stnkExpiry ? new Date(body.stnkExpiry) : undefined,
                kirNo: body.kirNo,
                kirExpiry: body.kirExpiry ? new Date(body.kirExpiry) : undefined,
                notes: body.notes,
            },
            include: { transporter: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'FleetVehicle',
            entityId: vehicle.id,
            metadata: { code: vehicle.code, plateNo: vehicle.plateNo, status: vehicle.status },
        });
        return { vehicle };
    }
    async update(req, id, body) {
        const exists = await this.prisma.fleetVehicle.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Vehicle not found');
        if (body.transporterId) {
            const transporter = await this.prisma.transporter.findFirst({
                where: { id: body.transporterId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!transporter)
                throw new common_1.NotFoundException('Transporter not found');
        }
        const vehicle = await this.prisma.fleetVehicle.update({
            where: { id },
            data: {
                ...(body.plateNo && { plateNo: body.plateNo }),
                ...(body.vehicleType && { vehicleType: body.vehicleType }),
                ...(body.brand !== undefined && { brand: body.brand }),
                ...(body.model !== undefined && { model: body.model }),
                ...(body.year !== undefined && { year: body.year }),
                ...(body.ownershipType && { ownershipType: body.ownershipType }),
                ...(body.capacityWeight !== undefined && { capacityWeight: body.capacityWeight }),
                ...(body.capacityVolume !== undefined && { capacityVolume: body.capacityVolume }),
                ...(body.status && { status: body.status }),
                ...(body.transporterId !== undefined && { transporterId: body.transporterId }),
                ...(body.stnkNo !== undefined && { stnkNo: body.stnkNo }),
                ...(body.stnkExpiry && { stnkExpiry: new Date(body.stnkExpiry) }),
                ...(body.kirNo !== undefined && { kirNo: body.kirNo }),
                ...(body.kirExpiry && { kirExpiry: new Date(body.kirExpiry) }),
                ...(body.notes !== undefined && { notes: body.notes }),
            },
            include: { transporter: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'FleetVehicle',
            entityId: vehicle.id,
            metadata: { code: vehicle.code, plateNo: vehicle.plateNo, status: vehicle.status },
        });
        return { vehicle };
    }
    async deactivate(req, id) {
        const vehicle = await this.prisma.fleetVehicle.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, code: true },
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        const updated = await this.prisma.fleetVehicle.update({
            where: { id },
            data: { status: 'INACTIVE' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'DEACTIVATE',
            entity: 'FleetVehicle',
            entityId: id,
            metadata: { code: vehicle.code },
        });
        return { vehicle: updated };
    }
    async listMaintenance(req, id) {
        const logs = await this.prisma.vehicleMaintenance.findMany({
            where: { vehicleId: id, tenantId: req.user.tenantId },
            orderBy: { nextServiceAt: 'asc' },
        });
        return { logs };
    }
    async createMaintenance(req, id, body) {
        const log = await this.prisma.vehicleMaintenance.create({
            data: {
                tenantId: req.user.tenantId,
                vehicleId: id,
                maintenanceType: body.maintenanceType,
                description: body.description,
                kmInterval: body.kmInterval,
                dateInterval: body.dateInterval,
                lastServiceAt: body.lastServiceAt ? new Date(body.lastServiceAt) : undefined,
                nextServiceAt: body.nextServiceAt ? new Date(body.nextServiceAt) : undefined,
                cost: body.cost,
                vendorId: body.vendorId,
                status: body.status || 'SCHEDULED',
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'VehicleMaintenance',
            entityId: log.id,
            metadata: { vehicleId: id, type: body.maintenanceType },
        });
        return { log };
    }
    async updateMaintenance(req, logId, body) {
        const exists = await this.prisma.vehicleMaintenance.findFirst({
            where: { id: logId, tenantId: req.user.tenantId },
        });
        if (!exists)
            throw new common_1.NotFoundException('Maintenance log not found');
        const updated = await this.prisma.vehicleMaintenance.update({
            where: { id: logId },
            data: {
                ...(body.maintenanceType && { maintenanceType: body.maintenanceType }),
                ...(body.description !== undefined && { description: body.description }),
                ...(body.kmInterval !== undefined && { kmInterval: body.kmInterval }),
                ...(body.dateInterval !== undefined && { dateInterval: body.dateInterval }),
                ...(body.lastServiceAt && { lastServiceAt: new Date(body.lastServiceAt) }),
                ...(body.nextServiceAt && { nextServiceAt: new Date(body.nextServiceAt) }),
                ...(body.cost !== undefined && { cost: body.cost }),
                ...(body.vendorId !== undefined && { vendorId: body.vendorId }),
                ...(body.status && { status: body.status }),
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'VehicleMaintenance',
            entityId: logId,
        });
        return { log: updated };
    }
    async deleteMaintenance(req, logId) {
        const exists = await this.prisma.vehicleMaintenance.findFirst({
            where: { id: logId, tenantId: req.user.tenantId },
        });
        if (!exists)
            throw new common_1.NotFoundException('Maintenance log not found');
        await this.prisma.vehicleMaintenance.delete({ where: { id: logId } });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'DELETE',
            entity: 'VehicleMaintenance',
            entityId: logId,
        });
        return { success: true };
    }
    async listDocuments(req, id) {
        const documents = await this.prisma.vehicleDocument.findMany({
            where: { vehicleId: id, tenantId: req.user.tenantId },
            orderBy: { expiryDate: 'asc' },
        });
        return { documents };
    }
    async createDocument(req, id, body) {
        const document = await this.prisma.vehicleDocument.create({
            data: {
                tenantId: req.user.tenantId,
                vehicleId: id,
                documentType: body.documentType,
                documentNumber: body.documentNumber,
                issueDate: body.issueDate ? new Date(body.issueDate) : undefined,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
                status: body.status || 'ACTIVE',
                notes: body.notes,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'VehicleDocument',
            entityId: document.id,
            metadata: { vehicleId: id, type: body.documentType },
        });
        return { document };
    }
    async updateDocument(req, docId, body) {
        const exists = await this.prisma.vehicleDocument.findFirst({
            where: { id: docId, tenantId: req.user.tenantId },
        });
        if (!exists)
            throw new common_1.NotFoundException('Document not found');
        const updated = await this.prisma.vehicleDocument.update({
            where: { id: docId },
            data: {
                ...(body.documentType && { documentType: body.documentType }),
                ...(body.documentNumber && { documentNumber: body.documentNumber }),
                ...(body.issueDate && { issueDate: new Date(body.issueDate) }),
                ...(body.expiryDate && { expiryDate: new Date(body.expiryDate) }),
                ...(body.status && { status: body.status }),
                ...(body.notes !== undefined && { notes: body.notes }),
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'VehicleDocument',
            entityId: docId,
        });
        return { document: updated };
    }
    async deleteDocument(req, docId) {
        const exists = await this.prisma.vehicleDocument.findFirst({
            where: { id: docId, tenantId: req.user.tenantId },
        });
        if (!exists)
            throw new common_1.NotFoundException('Document not found');
        await this.prisma.vehicleDocument.delete({ where: { id: docId } });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'DELETE',
            entity: 'VehicleDocument',
            entityId: docId,
        });
        return { success: true };
    }
};
exports.FleetController = FleetController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_fleet_vehicle_dto_1.CreateFleetVehicleDto]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_fleet_vehicle_dto_1.UpdateFleetVehicleDto]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Get)(':id/maintenance'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "listMaintenance", null);
__decorate([
    (0, common_1.Post)(':id/maintenance'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, maintenance_dto_1.CreateVehicleMaintenanceDto]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "createMaintenance", null);
__decorate([
    (0, common_1.Patch)('maintenance/:logId'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('logId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, maintenance_dto_1.UpdateVehicleMaintenanceDto]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "updateMaintenance", null);
__decorate([
    (0, common_1.Delete)('maintenance/:logId'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('logId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "deleteMaintenance", null);
__decorate([
    (0, common_1.Get)(':id/documents'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "listDocuments", null);
__decorate([
    (0, common_1.Post)(':id/documents'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, document_dto_1.CreateVehicleDocumentDto]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Patch)('documents/:docId'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('docId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, document_dto_1.UpdateVehicleDocumentDto]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.Delete)('documents/:docId'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('docId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FleetController.prototype, "deleteDocument", null);
exports.FleetController = FleetController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/fleet'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], FleetController);
//# sourceMappingURL=fleet.controller.js.map