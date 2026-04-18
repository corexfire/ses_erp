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
exports.ArController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let ArController = class ArController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, status) {
        const invoices = await this.prisma.customerInvoice.findMany({
            where: { tenantId: req.user.tenantId, ...(status ? { status } : {}) },
            include: { payments: true, lines: true },
            orderBy: [{ invoiceDate: 'desc' }],
            take: 200,
        });
        return { invoices };
    }
    async get(req, id) {
        const invoice = await this.prisma.customerInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { payments: true, lines: { orderBy: [{ lineNo: 'asc' }] } },
        });
        return { invoice };
    }
    async create(req, body) {
        const totalAmount = body.lines.reduce((sum, l) => sum + (l.amount || 0), 0);
        const invoice = await this.prisma.customerInvoice.create({
            data: {
                tenantId: req.user.tenantId,
                invoiceNo: body.invoiceNo,
                customerCode: body.customerCode,
                invoiceDate: new Date(body.invoiceDate),
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                description: body.description,
                totalAmount,
                taxAmount: 0,
                paidAmount: 0,
                status: 'OPEN',
                lines: {
                    create: body.lines.map((line, idx) => ({
                        tenantId: req.user.tenantId,
                        lineNo: idx + 1,
                        description: line.description,
                        qty: line.qty,
                        unitPrice: line.unitPrice,
                        taxCode: line.taxCode || null,
                        amount: line.amount,
                    })),
                },
            },
            include: { lines: true },
        });
        return { invoice };
    }
    async addPayment(req, id, body) {
        const invoice = await this.prisma.customerInvoice.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!invoice)
            throw new Error('Invoice not found');
        await this.prisma.customerInvoicePayment.create({
            data: {
                tenantId: req.user.tenantId,
                invoiceId: id,
                paymentDate: new Date(body.paymentDate),
                amount: body.amount,
                reference: body.reference,
                notes: body.notes,
            },
        });
        const newPaidAmount = Number(invoice.paidAmount) + body.amount;
        const newStatus = newPaidAmount >= Number(invoice.totalAmount) ? 'PAID' : 'OPEN';
        const updated = await this.prisma.customerInvoice.update({
            where: { id },
            data: { paidAmount: newPaidAmount, status: newStatus },
        });
        return { invoice: updated };
    }
    async debtCollection(req) {
        const overdueInvoices = await this.prisma.customerInvoice.findMany({
            where: { tenantId: req.user.tenantId, status: { in: ['OPEN', 'OVERDUE'] } },
            include: { payments: true },
        });
        const collectionItems = [];
        for (const inv of overdueInvoices) {
            const dueDate = inv.dueDate ? new Date(inv.dueDate) : new Date(inv.invoiceDate);
            const daysOverdue = Math.floor((new Date().getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysOverdue < 1)
                continue;
            const outstanding = Number(inv.totalAmount) - Number(inv.paidAmount);
            collectionItems.push({
                id: inv.id,
                invoiceNo: inv.invoiceNo,
                customerCode: inv.customerCode,
                invoiceDate: inv.invoiceDate,
                dueDate: inv.dueDate,
                totalAmount: inv.totalAmount,
                paidAmount: inv.paidAmount,
                outstanding,
                daysOverdue,
                priority: daysOverdue > 90 ? 'HIGH' : daysOverdue > 60 ? 'MEDIUM' : 'LOW',
            });
        }
        collectionItems.sort((a, b) => b.daysOverdue - a.daysOverdue);
        return { collection: collectionItems, total: collectionItems.length };
    }
};
exports.ArController = ArController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.ar.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ArController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.ar.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ArController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.ar.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/payment'),
    (0, permissions_decorator_1.RequirePermissions)('finance.ar.payment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ArController.prototype, "addPayment", null);
__decorate([
    (0, common_1.Get)('debt-collection'),
    (0, permissions_decorator_1.RequirePermissions)('finance.ar.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArController.prototype, "debtCollection", null);
exports.ArController = ArController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/ar'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArController);
//# sourceMappingURL=ar.controller.js.map