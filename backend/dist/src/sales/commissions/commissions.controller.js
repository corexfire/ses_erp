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
exports.CommissionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_commission_entry_dto_1 = require("./dto/create-commission-entry.dto");
const create_commission_scheme_dto_1 = require("./dto/create-commission-scheme.dto");
let CommissionsController = class CommissionsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listSchemes(req) {
        const schemes = await this.prisma.commissionScheme.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ createdAt: 'desc' }],
            take: 200,
        });
        return { schemes };
    }
    async createScheme(req, body) {
        const scheme = await this.prisma.commissionScheme.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                rate: body.rate,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'CommissionScheme',
            entityId: scheme.id,
        });
        return { scheme };
    }
    async listEntries(req) {
        const entries = await this.prisma.commissionEntry.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ createdAt: 'desc' }],
            include: { scheme: true, invoice: true, salesUser: true },
            take: 200,
        });
        return { entries };
    }
    async createEntry(req, body) {
        const scheme = await this.prisma.commissionScheme.findFirst({
            where: { id: body.schemeId, tenantId: req.user.tenantId, isActive: true },
            select: { id: true },
        });
        if (!scheme)
            throw new common_1.NotFoundException('Scheme not found');
        if (body.invoiceId) {
            const invoice = await this.prisma.salesInvoice.findFirst({
                where: { id: body.invoiceId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!invoice)
                throw new common_1.NotFoundException('Invoice not found');
        }
        if (body.salesUserId) {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: body.salesUserId,
                    tenantId: req.user.tenantId,
                    isActive: true,
                },
                select: { id: true },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
        }
        const entry = await this.prisma.commissionEntry.create({
            data: {
                tenantId: req.user.tenantId,
                schemeId: body.schemeId,
                invoiceId: body.invoiceId,
                salesUserId: body.salesUserId,
                baseAmount: body.baseAmount,
                amount: body.amount,
            },
            include: { scheme: true, invoice: true, salesUser: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'CommissionEntry',
            entityId: entry.id,
        });
        return { entry };
    }
};
exports.CommissionsController = CommissionsController;
__decorate([
    (0, common_1.Get)('schemes'),
    (0, permissions_decorator_1.RequirePermissions)('sales.commission.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommissionsController.prototype, "listSchemes", null);
__decorate([
    (0, common_1.Post)('schemes'),
    (0, permissions_decorator_1.RequirePermissions)('sales.commission.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_commission_scheme_dto_1.CreateCommissionSchemeDto]),
    __metadata("design:returntype", Promise)
], CommissionsController.prototype, "createScheme", null);
__decorate([
    (0, common_1.Get)('entries'),
    (0, permissions_decorator_1.RequirePermissions)('sales.commission.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommissionsController.prototype, "listEntries", null);
__decorate([
    (0, common_1.Post)('entries'),
    (0, permissions_decorator_1.RequirePermissions)('sales.commission.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_commission_entry_dto_1.CreateCommissionEntryDto]),
    __metadata("design:returntype", Promise)
], CommissionsController.prototype, "createEntry", null);
exports.CommissionsController = CommissionsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/commissions'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CommissionsController);
//# sourceMappingURL=commissions.controller.js.map