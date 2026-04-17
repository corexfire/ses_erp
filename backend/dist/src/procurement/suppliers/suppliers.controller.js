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
exports.SuppliersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_supplier_dto_1 = require("./dto/create-supplier.dto");
const update_supplier_dto_1 = require("./dto/update-supplier.dto");
let SuppliersController = class SuppliersController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const suppliers = await this.prisma.supplier.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                            { email: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
            take: 200,
        });
        return { suppliers };
    }
    async get(req, id) {
        const supplier = await this.prisma.supplier.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!supplier)
            throw new common_1.NotFoundException('Supplier not found');
        return { supplier };
    }
    async create(req, body) {
        const supplier = await this.prisma.supplier.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                email: body.email,
                phone: body.phone,
                address1: body.address1,
                address2: body.address2,
                city: body.city,
                province: body.province,
                postalCode: body.postalCode,
                countryCode: body.countryCode,
                npwp: body.npwp,
                vendorGroup: body.vendorGroup,
                bankName: body.bankName,
                bankAccount: body.bankAccount,
                paymentTerms: body.paymentTerms,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Supplier',
            entityId: supplier.id,
        });
        return { supplier };
    }
    async update(req, id, body) {
        const exists = await this.prisma.supplier.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Supplier not found');
        const supplier = await this.prisma.supplier.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                email: body.email ?? undefined,
                phone: body.phone ?? undefined,
                address1: body.address1 ?? undefined,
                address2: body.address2 ?? undefined,
                city: body.city ?? undefined,
                province: body.province ?? undefined,
                postalCode: body.postalCode ?? undefined,
                countryCode: body.countryCode ?? undefined,
                npwp: body.npwp ?? undefined,
                vendorGroup: body.vendorGroup ?? undefined,
                bankName: body.bankName ?? undefined,
                bankAccount: body.bankAccount ?? undefined,
                paymentTerms: body.paymentTerms ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'Supplier',
            entityId: supplier.id,
        });
        return { supplier };
    }
    async deactivate(req, id) {
        const exists = await this.prisma.supplier.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Supplier not found');
        const supplier = await this.prisma.supplier.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'Supplier',
            entityId: supplier.id,
        });
        return { supplier };
    }
};
exports.SuppliersController = SuppliersController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.supplier.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.supplier.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.supplier.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_supplier_dto_1.CreateSupplierDto]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.supplier.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_supplier_dto_1.UpdateSupplierDto]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.supplier.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "deactivate", null);
exports.SuppliersController = SuppliersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/suppliers'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], SuppliersController);
//# sourceMappingURL=suppliers.controller.js.map