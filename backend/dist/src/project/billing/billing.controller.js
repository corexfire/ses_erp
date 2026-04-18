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
exports.BillingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const billing_dto_1 = require("./dto/billing.dto");
let BillingController = class BillingController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listClaims(req, projectId) {
        const claims = await this.prisma.progressClaim.findMany({
            where: { projectId, tenantId: req.user.tenantId },
            orderBy: { claimDate: 'desc' },
        });
        return { claims };
    }
    async createClaim(req, body) {
        const project = await this.prisma.project.findFirst({
            where: { id: body.projectId, tenantId: req.user.tenantId }
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const claim = await this.prisma.progressClaim.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                claimNo: body.claimNo,
                progressPercent: body.progressPercent,
                description: body.description,
                status: 'DRAFT'
            }
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ProgressClaim',
            entityId: claim.id,
        });
        return { claim };
    }
    async createInvoice(req, body) {
        const claim = await this.prisma.progressClaim.findFirst({
            where: { id: body.progressClaimId, tenantId: req.user.tenantId },
            include: { project: true }
        });
        if (!claim)
            throw new common_1.NotFoundException('Progress Claim not found');
        const project = claim.project;
        const contractValue = Number(project.totalBudget || 0);
        const previousClaims = await this.prisma.progressClaim.findMany({
            where: { projectId: claim.projectId, tenantId: req.user.tenantId, status: 'VERIFIED', createdAt: { lt: claim.createdAt } },
            orderBy: { progressPercent: 'desc' },
            take: 1
        });
        const lastProgress = previousClaims.length > 0 ? Number(previousClaims[0].progressPercent) : 0;
        const progressDelta = Number(claim.progressPercent) - lastProgress;
        if (progressDelta <= 0)
            throw new Error('New progress and last progress mismatch');
        const grossAmount = (progressDelta / 100) * contractValue;
        const retentionPercent = body.retentionPercent || 5;
        const retentionAmount = (retentionPercent / 100) * grossAmount;
        const dpDeduction = body.dpDeductionAmount || 0;
        const vatPercent = 11;
        const netBeforeTax = grossAmount - retentionAmount - dpDeduction;
        const vatAmount = (vatPercent / 100) * netBeforeTax;
        const netAmount = netBeforeTax + vatAmount;
        return await this.prisma.$transaction(async (tx) => {
            const invoice = await tx.progressInvoice.create({
                data: {
                    tenantId: req.user.tenantId,
                    projectId: claim.projectId,
                    progressClaimId: claim.id,
                    progressPercent: claim.progressPercent,
                    retentionPercent: retentionPercent,
                    retentionAmount: retentionAmount,
                    dpDeductionAmount: dpDeduction,
                    grossAmount: grossAmount,
                    vatPercent: vatPercent,
                    vatAmount: vatAmount,
                    netAmount: netAmount,
                    status: 'DRAFT',
                    invoiceNo: `INV-PRJ-${Date.now().toString().slice(-6)}`,
                    period: new Date().toISOString().slice(0, 7)
                }
            });
            await tx.progressClaim.update({
                where: { id: claim.id },
                data: { status: 'VERIFIED' }
            });
            return { invoice };
        });
    }
    async getProjectLedger(req, projectId) {
        const project = await this.prisma.project.findFirst({
            where: { id: projectId, tenantId: req.user.tenantId },
            include: {
                progressInvoices: true,
                progressClaims: true
            }
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const totalBilled = project.progressInvoices.reduce((sum, inv) => sum + Number(inv.netAmount), 0);
        const totalRetention = project.progressInvoices
            .filter(inv => !inv.isRetentionReleased)
            .reduce((sum, inv) => sum + Number(inv.retentionAmount), 0);
        const currentProgress = project.progressClaims
            .filter(c => c.status !== 'DRAFT')
            .reduce((max, c) => Math.max(max, Number(c.progressPercent)), 0);
        return {
            summary: {
                contractValue: project.totalBudget,
                totalBilled,
                totalRetention,
                currentProgress,
                remainingBalance: Number(project.totalBudget || 0) - totalBilled,
                billingSetup: {
                    retentionRate: project.retentionRate,
                    downPaymentTotal: project.downPaymentTotal,
                    dpRecoveryRate: project.dpRecoveryRate,
                    billingType: project.billingType
                }
            },
            invoices: project.progressInvoices,
            claims: project.progressClaims
        };
    }
    async releaseRetention(req, projectId) {
        const invoices = await this.prisma.progressInvoice.findMany({
            where: { projectId, tenantId: req.user.tenantId, isRetentionReleased: false }
        });
        if (invoices.length === 0)
            throw new Error('No unreleased retention found for this project');
        return await this.prisma.$transaction(async (tx) => {
            await tx.progressInvoice.updateMany({
                where: { projectId, tenantId: req.user.tenantId, isRetentionReleased: false },
                data: {
                    isRetentionReleased: true,
                    retentionReleasedAt: new Date()
                }
            });
            await this.audit.log({
                tenantId: req.user.tenantId,
                actorUserId: req.user.id,
                action: 'RELEASE_RETENTION',
                entity: 'Project',
                entityId: projectId,
                metadata: { invoiceCount: invoices.length }
            });
            return { count: invoices.length };
        });
    }
};
exports.BillingController = BillingController;
__decorate([
    (0, common_1.Get)('claims/:projectId'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "listClaims", null);
__decorate([
    (0, common_1.Post)('claims'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, billing_dto_1.CreateProgressClaimDto]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "createClaim", null);
__decorate([
    (0, common_1.Post)('invoices'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, billing_dto_1.CreateProgressInvoiceDto]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)('ledger/:projectId'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getProjectLedger", null);
__decorate([
    (0, common_1.Post)('release-retention/:projectId'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "releaseRetention", null);
exports.BillingController = BillingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project/billing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], BillingController);
//# sourceMappingURL=billing.controller.js.map