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
exports.DriverController = exports.UpdateDriverDto = exports.CreateDriverDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const driverStatusSet = new Set(['ACTIVE', 'ON_LEAVE', 'INACTIVE']);
const isDriverStatus = (value) => Boolean(value) && driverStatusSet.has(value);
const driverLicenseTypeSet = new Set(['A', 'B1', 'B2', 'C', 'D']);
const isDriverLicenseType = (value) => Boolean(value) && driverLicenseTypeSet.has(value);
class CreateDriverDto {
    code;
    name;
    employeeId;
    licenseType;
    licenseNo;
    licenseExpiry;
    phone;
    email;
    address;
    status;
    transporterId;
    notes;
}
exports.CreateDriverDto = CreateDriverDto;
class UpdateDriverDto {
    name;
    employeeId;
    licenseType;
    licenseNo;
    licenseExpiry;
    phone;
    email;
    address;
    status;
    transporterId;
    notes;
}
exports.UpdateDriverDto = UpdateDriverDto;
let DriverController = class DriverController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const drivers = await this.prisma.logisticsDriver.findMany({
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
                ...(isDriverStatus(status) ? { status } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { transporter: true },
            take: 200,
        });
        return { drivers };
    }
    async get(req, id) {
        const driver = await this.prisma.logisticsDriver.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { transporter: true, tripPlans: { take: 10, orderBy: { routeDate: 'desc' } } },
        });
        if (!driver)
            throw new common_1.NotFoundException('Driver not found');
        return { driver };
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
        const count = await this.prisma.logisticsDriver.count({ where: { tenantId: req.user.tenantId } });
        const code = `DRV-${String(count + 1).padStart(6, '0')}`;
        const driver = await this.prisma.logisticsDriver.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code || code,
                name: body.name,
                employeeId: body.employeeId,
                licenseType: body.licenseType,
                licenseNo: body.licenseNo,
                licenseExpiry: body.licenseExpiry ? new Date(body.licenseExpiry) : undefined,
                phone: body.phone,
                email: body.email,
                address: body.address,
                status: body.status || 'ACTIVE',
                transporterId: body.transporterId,
                notes: body.notes,
            },
            include: { transporter: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'LogisticsDriver',
            entityId: driver.id,
            metadata: { code: driver.code, name: driver.name, status: driver.status },
        });
        return { driver };
    }
    async update(req, id, body) {
        const exists = await this.prisma.logisticsDriver.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Driver not found');
        if (body.transporterId) {
            const transporter = await this.prisma.transporter.findFirst({
                where: { id: body.transporterId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!transporter)
                throw new common_1.NotFoundException('Transporter not found');
        }
        const driver = await this.prisma.logisticsDriver.update({
            where: { id },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.employeeId !== undefined && { employeeId: body.employeeId }),
                ...(body.licenseType && { licenseType: body.licenseType }),
                ...(body.licenseNo !== undefined && { licenseNo: body.licenseNo }),
                ...(body.licenseExpiry && { licenseExpiry: new Date(body.licenseExpiry) }),
                ...(body.phone !== undefined && { phone: body.phone }),
                ...(body.email !== undefined && { email: body.email }),
                ...(body.address !== undefined && { address: body.address }),
                ...(body.status && { status: body.status }),
                ...(body.transporterId !== undefined && { transporterId: body.transporterId }),
                ...(body.notes !== undefined && { notes: body.notes }),
            },
            include: { transporter: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'LogisticsDriver',
            entityId: driver.id,
            metadata: { code: driver.code, name: driver.name },
        });
        return { driver };
    }
};
exports.DriverController = DriverController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.driver.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.driver.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.driver.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateDriverDto]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.driver.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateDriverDto]),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "update", null);
exports.DriverController = DriverController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/drivers'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], DriverController);
//# sourceMappingURL=driver.controller.js.map