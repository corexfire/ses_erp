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
exports.SalesInvoicesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_sales_invoice_dto_1 = require("./dto/create-sales-invoice.dto");
const update_sales_invoice_dto_1 = require("./dto/update-sales-invoice.dto");
let SalesInvoicesController = class SalesInvoicesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    toNumber(value) {
        if (typeof value === 'number')
            return Number.isFinite(value) ? value : 0;
        if (typeof value === 'string') {
            const n = parseFloat(value);
            return Number.isFinite(n) ? n : 0;
        }
        if (typeof value === 'bigint')
            return Number(value);
        if (typeof value === 'object' && value !== null) {
            const maybeToString = value.toString;
            if (typeof maybeToString === 'function') {
                const n = parseFloat(maybeToString.call(value));
                return Number.isFinite(n) ? n : 0;
            }
        }
        return 0;
    }
    async list(req, q) {
        const invoices = await this.prisma.salesInvoice.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { customer: true, order: true },
            take: 200,
        });
        return { invoices };
    }
    async get(req, id) {
        const invoice = await this.prisma.salesInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                customer: true,
                order: true,
                items: {
                    orderBy: [{ lineNo: 'asc' }],
                    include: { taxCode: true },
                },
            },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        const taxBreakdownMap = new Map();
        let subTotal = 0;
        let taxTotal = 0;
        for (const it of invoice.items) {
            const qty = this.toNumber(it.qty);
            const unitPrice = this.toNumber(it.unitPrice);
            const discountPct = this.toNumber(it.discount);
            const netUnitPrice = unitPrice * (1 - discountPct / 100);
            const baseAmount = qty * netUnitPrice;
            const rawRate = this.toNumber(it.taxCode?.rate ?? 0);
            const rate = rawRate > 1 ? rawRate / 100 : rawRate;
            const taxAmount = baseAmount * rate;
            subTotal += baseAmount;
            taxTotal += taxAmount;
            const key = it.taxCodeId ?? 'NO_TAX';
            const existing = taxBreakdownMap.get(key);
            const code = it.taxCode?.code ?? 'NO_TAX';
            const rateLabel = String(rawRate);
            if (existing) {
                existing.baseAmount += baseAmount;
                existing.taxAmount += taxAmount;
            }
            else {
                taxBreakdownMap.set(key, {
                    taxCodeId: it.taxCodeId,
                    code,
                    rate: rateLabel,
                    baseAmount,
                    taxAmount,
                });
            }
        }
        const grandTotal = subTotal + taxTotal;
        const taxBreakdown = Array.from(taxBreakdownMap.values()).map((x) => ({
            ...x,
            baseAmount: x.baseAmount.toFixed(4),
            taxAmount: x.taxAmount.toFixed(4),
        }));
        return {
            invoice: {
                ...invoice,
                totals: {
                    subTotal: subTotal.toFixed(4),
                    taxTotal: taxTotal.toFixed(4),
                    grandTotal: grandTotal.toFixed(4),
                },
                taxBreakdown,
            },
        };
    }
    async create(req, body) {
        const customer = await this.prisma.customer.findFirst({
            where: { id: body.customerId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        if (body.orderId) {
            const order = await this.prisma.salesOrder.findFirst({
                where: { id: body.orderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!order)
                throw new common_1.NotFoundException('Sales order not found');
        }
        const invoice = await this.prisma.$transaction(async (tx) => {
            const inv = await tx.salesInvoice.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    customerId: body.customerId,
                    orderId: body.orderId,
                    invoiceDate: new Date(body.invoiceDate),
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.salesInvoiceItem.createMany({
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
            entity: 'SalesInvoice',
            entityId: invoice.id,
        });
        return { invoice };
    }
    async update(req, id, body) {
        const exists = await this.prisma.salesInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Invoice not found');
        const invoice = await this.prisma.$transaction(async (tx) => {
            const inv = await tx.salesInvoice.update({
                where: { id },
                data: {
                    invoiceDate: body.invoiceDate
                        ? new Date(body.invoiceDate)
                        : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.salesInvoiceItem.deleteMany({
                    where: { tenantId: req.user.tenantId, invoiceId: id },
                });
                if (body.items.length > 0) {
                    await tx.salesInvoiceItem.createMany({
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
            entity: 'SalesInvoice',
            entityId: invoice.id,
        });
        return { invoice };
    }
    async submit(req, id) {
        const invoice = await this.prisma.salesInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: true },
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        const updatedInvoice = await this.prisma.salesInvoice.update({
            where: { id },
            data: { status: 'SUBMITTED' },
        });
        const rnd = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        const jeNo = `JE-SI-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${rnd}`;
        let subTotal = 0;
        for (const it of invoice.items) {
            const qty = Number(it.qty) || 0;
            const price = Number(it.unitPrice) || 0;
            const disc = Number(it.discount) || 0;
            subTotal += (qty * price) * (1 - disc / 100);
        }
        const taxAmt = 0;
        const dTot = subTotal + taxAmt;
        const journal = await this.prisma.journalEntry.create({
            data: {
                tenantId: req.user.tenantId,
                entryNo: jeNo,
                entryDate: new Date(),
                description: `Sales Invoice Posting for ${invoice.code}`,
                referenceNo: invoice.code,
                journalType: 'SALES',
                status: 'POSTED',
                totalDebit: dTot,
                totalCredit: dTot,
            }
        });
        await this.prisma.journalEntryLine.createMany({
            data: [
                {
                    tenantId: req.user.tenantId,
                    journalEntryId: journal.id,
                    lineNo: 1,
                    accountCode: '1140-00',
                    description: 'Account Receivable (AR)',
                    debit: dTot,
                    credit: 0
                },
                {
                    tenantId: req.user.tenantId,
                    journalEntryId: journal.id,
                    lineNo: 2,
                    accountCode: '4110-00',
                    description: 'Sales Revenue',
                    debit: 0,
                    credit: subTotal
                },
                {
                    tenantId: req.user.tenantId,
                    journalEntryId: journal.id,
                    lineNo: 3,
                    accountCode: '2130-00',
                    description: 'Value Added Tax (VAT)',
                    debit: 0,
                    credit: taxAmt
                }
            ].filter(l => l.debit > 0 || l.credit > 0)
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'submit',
            entity: 'SalesInvoice',
            entityId: invoice.id,
        });
        return { invoice: updatedInvoice };
    }
};
exports.SalesInvoicesController = SalesInvoicesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.invoice.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesInvoicesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.invoice.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesInvoicesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.invoice.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sales_invoice_dto_1.CreateSalesInvoiceDto]),
    __metadata("design:returntype", Promise)
], SalesInvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.invoice.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_sales_invoice_dto_1.UpdateSalesInvoiceDto]),
    __metadata("design:returntype", Promise)
], SalesInvoicesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('sales.invoice.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesInvoicesController.prototype, "submit", null);
exports.SalesInvoicesController = SalesInvoicesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/invoices'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], SalesInvoicesController);
//# sourceMappingURL=sales-invoices.controller.js.map