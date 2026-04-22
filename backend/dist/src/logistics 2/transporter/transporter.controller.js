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
exports.TransporterController = exports.UpdateTransporterDto = exports.CreateTransporterDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
class CreateTransporterDto {
    code;
    name;
    supplierId;
    contactName;
    phone;
    email;
    address;
    notes;
}
exports.CreateTransporterDto = CreateTransporterDto;
class UpdateTransporterDto {
    name;
    supplierId;
    contactName;
    phone;
    email;
    address;
    isActive;
    notes;
}
exports.UpdateTransporterDto = UpdateTransporterDto;
let TransporterController = class TransporterController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const transporters = await this.prisma.transporter.findMany({
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
            include: { _count: { select: { vehicles: true, drivers: true } } },
            take: 200,
        });
        return { transporters };
    }
    async get(req, id) {
        const transporter = await this.prisma.transporter.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { vehicles: true, drivers: true },
        });
        if (!transporter)
            throw new common_1.NotFoundException('Transporter not found');
        return { transporter };
    }
    async create(req, body) {
        const count = await this.prisma.transporter.count({ where: { tenantId: req.user.tenantId } });
        const code = `TRN-${String(count + 1).padStart(6, '0')}`;
        const transporter = await this.prisma.transporter.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code || code,
                name: body.name,
                supplierId: body.supplierId,
                contactName: body.contactName,
                phone: body.phone,
                email: body.email,
                address: body.address,
                notes: body.notes,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'Transporter',
            entityId: transporter.id,
            metadata: { code: transporter.code, name: transporter.name },
        });
        return { transporter };
    }
    async update(req, id, body) {
        const exists = await this.prisma.transporter.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Transporter not found');
        const transporter = await this.prisma.transporter.update({
            where: { id },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.supplierId !== undefined && { supplierId: body.supplierId }),
                ...(body.contactName !== undefined && { contactName: body.contactName }),
                ...(body.phone !== undefined && { phone: body.phone }),
                ...(body.email !== undefined && { email: body.email }),
                ...(body.address !== undefined && { address: body.address }),
                ...(body.isActive !== undefined && { isActive: body.isActive }),
                ...(body.notes !== undefined && { notes: body.notes }),
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'Transporter',
            entityId: transporter.id,
            metadata: { code: transporter.code, name: transporter.name },
        });
        return { transporter };
    }
};
exports.TransporterController = TransporterController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransporterController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransporterController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateTransporterDto]),
    __metadata("design:returntype", Promise)
], TransporterController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.fleet.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateTransporterDto]),
    __metadata("design:returntype", Promise)
], TransporterController.prototype, "update", null);
exports.TransporterController = TransporterController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics/transporters'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], TransporterController);
//# sourceMappingURL=transporter.controller.js.map