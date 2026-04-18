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
exports.PurchaseInvoicesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_purchase_invoice_dto_1 = require("./dto/create-purchase-invoice.dto");
const update_purchase_invoice_dto_1 = require("./dto/update-purchase-invoice.dto");
const procurementStatusSet = new Set([
    'DRAFT',
    'SUBMITTED',
    'PENDING_APPROVAL',
    'APPROVED',
    'REJECTED',
    'CLOSED',
    'VOID',
]);
const isProcurementDocStatus = (value) => Boolean(value) && procurementStatusSet.has(value);
let PurchaseInvoicesController = class PurchaseInvoicesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async validateTaxCodes(input) {
        const ids = input.taxCodeIds.map((x) => x.trim()).filter(Boolean);
        if (ids.length === 0)
            return;
        const uniqueCount = new Set(ids).size;
        const count = await this.prisma.taxCode.count({
            where: { tenantId: input.tenantId, id: { in: ids } },
        });
        if (count !== uniqueCount)
            throw new common_1.NotFoundException('Tax code not found');
    }
    async list(req, q, status) {
        const purchaseInvoices = await this.prisma.purchaseInvoice.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isProcurementDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { supplier: true, order: true },
            take: 200,
        });
        return { purchaseInvoices };
    }
    async get(req, id) {
        const purchaseInvoice = await this.prisma.purchaseInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                supplier: true,
                order: true,
                items: { orderBy: [{ lineNo: 'asc' }], include: { taxCode: true } },
                landedCosts: true,
                returns: true,
            },
        });
        if (!purchaseInvoice)
            throw new common_1.NotFoundException('Purchase invoice not found');
        return { purchaseInvoice };
    }
    async create(req, body) {
        const supplier = await this.prisma.supplier.findFirst({
            where: { id: body.supplierId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!supplier)
            throw new common_1.NotFoundException('Supplier not found');
        if (body.orderId) {
            const po = await this.prisma.purchaseOrder.findFirst({
                where: { id: body.orderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!po)
                throw new common_1.NotFoundException('Purchase order not found');
        }
        await this.validateTaxCodes({
            tenantId: req.user.tenantId,
            taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
        });
        const purchaseInvoice = await this.prisma.$transaction(async (tx) => {
            const inv = await tx.purchaseInvoice.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    supplierId: body.supplierId,
                    orderId: body.orderId,
                    invoiceDate: new Date(body.invoiceDate),
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.purchaseInvoiceItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        invoiceId: inv.id,
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
            return inv;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'PurchaseInvoice',
            entityId: purchaseInvoice.id,
        });
        return { purchaseInvoice };
    }
    async update(req, id, body) {
        const exists = await this.prisma.purchaseInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Purchase invoice not found');
        if (body.items) {
            await this.validateTaxCodes({
                tenantId: req.user.tenantId,
                taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
            });
        }
        const purchaseInvoice = await this.prisma.$transaction(async (tx) => {
            const inv = await tx.purchaseInvoice.update({
                where: { id },
                data: {
                    invoiceDate: body.invoiceDate
                        ? new Date(body.invoiceDate)
                        : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.purchaseInvoiceItem.deleteMany({
                    where: { tenantId: req.user.tenantId, invoiceId: id },
                });
                if (body.items.length > 0) {
                    await tx.purchaseInvoiceItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            invoiceId: id,
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
            return inv;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'PurchaseInvoice',
            entityId: purchaseInvoice.id,
        });
        return { purchaseInvoice };
    }
    async submit(req, id) {
        const purchaseInvoice = await this.prisma.purchaseInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                items: { include: { taxCode: true } },
                supplier: true,
            },
        });
        if (!purchaseInvoice)
            throw new common_1.NotFoundException('Purchase invoice not found');
        let subTotal = 0;
        let totalTax = 0;
        const lineBreakdown = [];
        for (const it of purchaseInvoice.items) {
            const qty = Number(it.qty) || 0;
            const price = Number(it.unitPrice) || 0;
            const disc = Number(it.discount) || 0;
            const baseAmount = (qty * price) * (1 - disc / 100);
            let taxAmount = 0;
            if (it.taxCodeId && it.taxCode) {
                const rate = Number(it.taxCode.rate) || 0;
                taxAmount = baseAmount * (rate > 1 ? rate / 100 : rate);
            }
            subTotal += baseAmount;
            totalTax += taxAmount;
            lineBreakdown.push({
                description: it.description,
                baseAmount,
                taxAmount,
                taxCodeId: it.taxCodeId,
            });
        }
        const cTot = subTotal + totalTax;
        const updatedInvoice = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.purchaseInvoice.update({
                where: { id },
                data: { status: 'SUBMITTED' },
            });
            const rnd = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
            const jeNo = `JE-PI-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${rnd}`;
            const journal = await tx.journalEntry.create({
                data: {
                    tenantId: req.user.tenantId,
                    entryNo: jeNo,
                    entryDate: new Date(),
                    description: `Purchase Invoice Posting for ${purchaseInvoice.code} - ${purchaseInvoice.supplier?.name || 'Supplier'}`,
                    referenceNo: purchaseInvoice.code,
                    journalType: 'PURCHASE',
                    status: 'POSTED',
                    totalDebit: cTot,
                    totalCredit: cTot,
                }
            });
            const journalLines = [];
            let lineNo = 1;
            journalLines.push({
                tenantId: req.user.tenantId,
                journalEntryId: journal.id,
                lineNo: lineNo++,
                accountCode: '1-1310-00',
                description: `Pembelian - ${purchaseInvoice.code}`,
                debit: subTotal,
                credit: 0,
                referenceId: purchaseInvoice.id,
            });
            if (totalTax > 0) {
                journalLines.push({
                    tenantId: req.user.tenantId,
                    journalEntryId: journal.id,
                    lineNo: lineNo++,
                    accountCode: '1-1510-00',
                    description: `PPN Masukan 11% - ${purchaseInvoice.code}`,
                    debit: totalTax,
                    credit: 0,
                    referenceId: purchaseInvoice.id,
                });
            }
            journalLines.push({
                tenantId: req.user.tenantId,
                journalEntryId: journal.id,
                lineNo: lineNo++,
                accountCode: '2-1100-00',
                description: `Hutang Usaha - ${purchaseInvoice.supplier?.name || 'Supplier'}`,
                debit: 0,
                credit: cTot,
                referenceId: purchaseInvoice.id,
            });
            await tx.journalEntryLine.createMany({ data: journalLines });
            return updated;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'submit',
            entity: 'PurchaseInvoice',
            entityId: purchaseInvoice.id,
        });
        return {
            purchaseInvoice: updatedInvoice,
            journal: {
                subTotal,
                totalTax,
                grandTotal: cTot,
                lines: lineBreakdown,
            }
        };
    }
};
exports.PurchaseInvoicesController = PurchaseInvoicesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.invoice.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PurchaseInvoicesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.invoice.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseInvoicesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.invoice.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_purchase_invoice_dto_1.CreatePurchaseInvoiceDto]),
    __metadata("design:returntype", Promise)
], PurchaseInvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.invoice.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_purchase_invoice_dto_1.UpdatePurchaseInvoiceDto]),
    __metadata("design:returntype", Promise)
], PurchaseInvoicesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.invoice.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseInvoicesController.prototype, "submit", null);
exports.PurchaseInvoicesController = PurchaseInvoicesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/invoices'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PurchaseInvoicesController);
//# sourceMappingURL=purchase-invoices.controller.js.map