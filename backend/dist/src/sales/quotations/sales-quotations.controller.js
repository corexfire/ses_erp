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
exports.SalesQuotationsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_sales_quotation_dto_1 = require("./dto/create-sales-quotation.dto");
const update_sales_quotation_dto_1 = require("./dto/update-sales-quotation.dto");
let SalesQuotationsController = class SalesQuotationsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const quotations = await this.prisma.salesQuotation.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [{ code: { contains: q, mode: 'insensitive' } }],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { customer: true },
            take: 200,
        });
        return { quotations };
    }
    async get(req, id) {
        const quotation = await this.prisma.salesQuotation.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                customer: true,
                items: { orderBy: [{ lineNo: 'asc' }] },
                orders: true,
            },
        });
        if (!quotation)
            throw new common_1.NotFoundException('Quotation not found');
        return { quotation };
    }
    async create(req, body) {
        const customer = await this.prisma.customer.findFirst({
            where: { id: body.customerId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const quotation = await this.prisma.$transaction(async (tx) => {
            const q = await tx.salesQuotation.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    customerId: body.customerId,
                    issueDate: new Date(body.issueDate),
                    expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.salesQuotationItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        quotationId: q.id,
                        lineNo: idx + 1,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        unitPrice: it.unitPrice,
                        discount: it.discount,
                        taxCodeId: it.taxCodeId,
                    })),
                });
            }
            return q;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'SalesQuotation',
            entityId: quotation.id,
        });
        return { quotation };
    }
    async update(req, id, body) {
        const exists = await this.prisma.salesQuotation.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Quotation not found');
        const quotation = await this.prisma.$transaction(async (tx) => {
            const q = await tx.salesQuotation.update({
                where: { id },
                data: {
                    issueDate: body.issueDate ? new Date(body.issueDate) : undefined,
                    expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.salesQuotationItem.deleteMany({
                    where: { tenantId: req.user.tenantId, quotationId: id },
                });
                if (body.items.length > 0) {
                    await tx.salesQuotationItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            quotationId: id,
                            lineNo: idx + 1,
                            description: it.description,
                            qty: it.qty,
                            uomCode: it.uomCode,
                            unitPrice: it.unitPrice,
                            discount: it.discount,
                            taxCodeId: it.taxCodeId,
                        })),
                    });
                }
            }
            return q;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'SalesQuotation',
            entityId: quotation.id,
        });
        return { quotation };
    }
    async submit(req, id) {
        const quotation = await this.prisma.salesQuotation.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!quotation)
            throw new common_1.NotFoundException('Quotation not found');
        const updated = await this.prisma.salesQuotation.update({
            where: { id },
            data: { status: 'SUBMITTED' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'submit',
            entity: 'SalesQuotation',
            entityId: updated.id,
        });
        return { quotation: updated };
    }
};
exports.SalesQuotationsController = SalesQuotationsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.quotation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesQuotationsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.quotation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesQuotationsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.quotation.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sales_quotation_dto_1.CreateSalesQuotationDto]),
    __metadata("design:returntype", Promise)
], SalesQuotationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.quotation.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_sales_quotation_dto_1.UpdateSalesQuotationDto]),
    __metadata("design:returntype", Promise)
], SalesQuotationsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('sales.quotation.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesQuotationsController.prototype, "submit", null);
exports.SalesQuotationsController = SalesQuotationsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/quotations'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], SalesQuotationsController);
//# sourceMappingURL=sales-quotations.controller.js.map