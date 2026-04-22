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
exports.CrmPortalController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let CrmPortalController = class CrmPortalController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async getUsers(req, search) {
        const user = req.user;
        const where = { tenantId: user.tenantId, isActive: true };
        if (search) {
            where.OR = [
                { code: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }
        const customers = await this.prisma.customer.findMany({
            where,
            include: {
                portalUsers: true,
                _count: { select: { salesInvoices: true, salesQuotations: true } }
            },
            orderBy: { name: 'asc' }
        });
        const activePortalsCount = await this.prisma.customerPortalUser.count({
            where: { tenantId: user.tenantId, portalStatus: 'ACTIVE' }
        });
        const logsCount = await this.prisma.customerPortalActivity.count({
            where: { tenantId: user.tenantId }
        });
        const summary = {
            totalCustomers: customers.length,
            portalUsers: activePortalsCount,
            engagementLogs: logsCount
        };
        return { data: customers, summary };
    }
    async getActivities(req, limitArg) {
        const user = req.user;
        const limit = Number(limitArg) || 50;
        const activities = await this.prisma.customerPortalActivity.findMany({
            where: { tenantId: user.tenantId },
            include: {
                user: {
                    select: { email: true, portalStatus: true, customer: { select: { name: true, code: true } } }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
        return { data: activities };
    }
    async inviteUser(req, body) {
        const user = req.user;
        if (!body.customerCode || !body.email)
            throw new common_1.ForbiddenException('Customer Code and Email required');
        const portalUser = await this.prisma.customerPortalUser.upsert({
            where: { tenantId_email: { tenantId: user.tenantId, email: body.email } },
            update: { portalStatus: 'PENDING_INVITE', inviteSentAt: new Date() },
            create: {
                tenantId: user.tenantId,
                customerCode: body.customerCode,
                email: body.email,
                portalStatus: 'PENDING_INVITE',
                inviteSentAt: new Date()
            }
        });
        await this.prisma.customerPortalActivity.create({
            data: {
                tenantId: user.tenantId,
                portalUserId: portalUser.id,
                activityType: 'ADMIN_INVITE',
                description: `System Admin dispatched setup password link to ${body.email}.`
            }
        });
        return { message: 'Portal invitation link dispatched to client inbox.' };
    }
    async revokeUser(req, body) {
        const user = req.user;
        const portalUser = await this.prisma.customerPortalUser.update({
            where: { id: body.portalUserId, tenantId: user.tenantId },
            data: { portalStatus: 'SUSPENDED' }
        });
        await this.prisma.customerPortalActivity.create({
            data: {
                tenantId: user.tenantId,
                portalUserId: portalUser.id,
                activityType: 'ADMIN_REVOKE',
                description: `System Admin revoked external B2B portal permissions for this account.`
            }
        });
        return { message: 'Portal access revoked.' };
    }
};
exports.CrmPortalController = CrmPortalController;
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CrmPortalController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('activities'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CrmPortalController.prototype, "getActivities", null);
__decorate([
    (0, common_1.Post)('invite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CrmPortalController.prototype, "inviteUser", null);
__decorate([
    (0, common_1.Post)('revoke'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CrmPortalController.prototype, "revokeUser", null);
exports.CrmPortalController = CrmPortalController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/portal'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CrmPortalController);
//# sourceMappingURL=portal.controller.js.map