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
exports.VendorPortalController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let VendorPortalController = class VendorPortalController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async getVendors(req, search) {
        const user = req.user;
        const where = { tenantId: user.tenantId, isActive: true };
        if (search) {
            where.OR = [
                { code: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }
        const suppliers = await this.prisma.supplier.findMany({
            where,
            include: {
                portalUsers: true,
                _count: { select: { purchaseOrders: true, purchaseInvoices: true } }
            },
            orderBy: { name: 'asc' }
        });
        const activePortalsCount = await this.prisma.vendorPortalUser.count({
            where: { tenantId: user.tenantId, portalStatus: 'ACTIVE' }
        });
        const logsCount = await this.prisma.vendorPortalActivity.count({
            where: { tenantId: user.tenantId }
        });
        const summary = {
            totalSuppliers: suppliers.length,
            portalUsers: activePortalsCount,
            engagementLogs: logsCount
        };
        return { data: suppliers, summary };
    }
    async getActivities(req, limitArg) {
        const user = req.user;
        const limit = Number(limitArg) || 50;
        const activities = await this.prisma.vendorPortalActivity.findMany({
            where: { tenantId: user.tenantId },
            include: {
                user: {
                    select: { email: true, portalStatus: true, supplier: { select: { name: true, code: true } } }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
        return { data: activities };
    }
    async inviteUser(req, body) {
        const user = req.user;
        if (!body.supplierCode || !body.email)
            throw new common_1.ForbiddenException('Supplier Code and Email required');
        const portalUser = await this.prisma.vendorPortalUser.upsert({
            where: { tenantId_email: { tenantId: user.tenantId, email: body.email } },
            update: { portalStatus: 'PENDING_INVITE', inviteSentAt: new Date() },
            create: {
                tenantId: user.tenantId,
                supplierCode: body.supplierCode,
                email: body.email,
                portalStatus: 'PENDING_INVITE',
                inviteSentAt: new Date()
            }
        });
        await this.prisma.vendorPortalActivity.create({
            data: {
                tenantId: user.tenantId,
                portalUserId: portalUser.id,
                activityType: 'ADMIN_INVITE',
                description: `Procurement Admin dispatched vendor portal setup link to ${body.email}.`
            }
        });
        return { message: 'Vendor Portal invitation link dispatched successfully.' };
    }
    async revokeUser(req, body) {
        const user = req.user;
        const portalUser = await this.prisma.vendorPortalUser.update({
            where: { id: body.portalUserId, tenantId: user.tenantId },
            data: { portalStatus: 'SUSPENDED' }
        });
        await this.prisma.vendorPortalActivity.create({
            data: {
                tenantId: user.tenantId,
                portalUserId: portalUser.id,
                activityType: 'ADMIN_REVOKE',
                description: `Procurement Admin suspended Vendor Portal permissions for this account.`
            }
        });
        return { message: 'Vendor Portal access revoked.' };
    }
};
exports.VendorPortalController = VendorPortalController;
__decorate([
    (0, common_1.Get)('vendors'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VendorPortalController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Get)('activities'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VendorPortalController.prototype, "getActivities", null);
__decorate([
    (0, common_1.Post)('invite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VendorPortalController.prototype, "inviteUser", null);
__decorate([
    (0, common_1.Post)('revoke'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VendorPortalController.prototype, "revokeUser", null);
exports.VendorPortalController = VendorPortalController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/portal'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], VendorPortalController);
//# sourceMappingURL=vendor-portal.controller.js.map