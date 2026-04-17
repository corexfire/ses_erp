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
exports.BillingController = exports.UpdateProgressInvoiceDto = exports.CreateProgressInvoiceDto = exports.CreateProgressClaimDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateProgressClaimDto {
    projectId;
    contractTermijnId;
    periodFrom;
    periodTo;
    percentage;
    amount;
    notes;
}
exports.CreateProgressClaimDto = CreateProgressClaimDto;
class CreateProgressInvoiceDto {
    projectId;
    progressClaimId;
    amount;
    invoiceNo;
    status;
}
exports.CreateProgressInvoiceDto = CreateProgressInvoiceDto;
class UpdateProgressInvoiceDto {
    invoiceNo;
    status;
    amount;
}
exports.UpdateProgressInvoiceDto = UpdateProgressInvoiceDto;
let BillingController = class BillingController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, projectId) {
        const where = { tenantId: req.user.tenantId };
        if (projectId)
            where.projectId = projectId;
        const claims = await this.prisma.progressClaim.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { data: claims };
    }
    async create(req, body) {
        const claim = await this.prisma.progressClaim.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                contractTermijnId: body.contractTermijnId,
                periodFrom: new Date(body.periodFrom),
                periodTo: new Date(body.periodTo),
                percentage: body.percentage,
                amount: body.amount,
                notes: body.notes,
                status: 'DRAFT',
            },
        });
        return claim;
    }
    async get(id, req) {
        const claim = await this.prisma.progressClaim.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return claim;
    }
    async submit(id, req) {
        const claim = await this.prisma.progressClaim.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!claim || claim.status !== 'DRAFT') {
            throw new Error('Can only submit draft claims');
        }
        const updated = await this.prisma.progressClaim.update({
            where: { id },
            data: { status: 'SUBMITTED' },
        });
        return updated;
    }
    async approve(id, req) {
        const claim = await this.prisma.progressClaim.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!claim || claim.status !== 'SUBMITTED') {
            throw new Error('Can only approve submitted claims');
        }
        const updated = await this.prisma.progressClaim.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
        return updated;
    }
    async generateInvoice(id, req) {
        const claim = await this.prisma.progressClaim.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!claim || claim.status !== 'APPROVED') {
            throw new Error('Can only generate invoice from approved claims');
        }
        const invoice = await this.prisma.progressInvoice.create({
            data: {
                tenantId: req.user.tenantId,
                progressClaimId: id,
                projectId: claim.projectId,
                amount: claim.amount,
                status: 'DRAFT',
            },
        });
        await this.prisma.progressClaim.update({
            where: { id },
            data: { status: 'INVOICED' },
        });
        return invoice;
    }
    async listInvoices(req) {
        const invoices = await this.prisma.progressInvoice.findMany({
            where: { tenantId: req.user.tenantId },
            include: { project: true },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { data: invoices };
    }
    async createInvoice(req, body) {
        const invoice = await this.prisma.progressInvoice.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                progressClaimId: body.progressClaimId,
                amount: body.amount,
                invoiceNo: body.invoiceNo,
                status: body.status ?? 'DRAFT',
            },
        });
        return invoice;
    }
    async updateInvoice(id, body, req) {
        const invoice = await this.prisma.progressInvoice.update({
            where: { id },
            data: {
                invoiceNo: body.invoiceNo,
                amount: body.amount,
                status: body.status ?? 'SUBMITTED',
            },
        });
        return invoice;
    }
    async exportToAr(id, req) {
        const invoice = await this.prisma.progressInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!invoice)
            throw new Error('Invoice not found');
        const updated = await this.prisma.progressInvoice.update({
            where: { id },
            data: { status: 'PAID' },
        });
        return { success: true, invoice: updated };
    }
};
exports.BillingController = BillingController;
__decorate([
    (0, common_1.Get)('progress-claims'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('progress-claims'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateProgressClaimDto]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('progress-claims/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('progress-claims/:id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)('progress-claims/:id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)('progress-claims/:id/invoice'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "generateInvoice", null);
__decorate([
    (0, common_1.Get)('invoices'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "listInvoices", null);
__decorate([
    (0, common_1.Post)('invoices'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateProgressInvoiceDto]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Patch)('invoices/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProgressInvoiceDto, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "updateInvoice", null);
__decorate([
    (0, common_1.Post)('invoices/:id/export-ar'),
    (0, permissions_decorator_1.RequirePermissions)('project.billing.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "exportToAr", null);
exports.BillingController = BillingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingController);
//# sourceMappingURL=billing.controller.js.map