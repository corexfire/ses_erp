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
exports.VendorPaymentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let VendorPaymentController = class VendorPaymentController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const payments = await this.prisma.vendorPayment.findMany({
            where,
            include: {
                supplier: true,
                invoice: true
            },
            orderBy: { paymentDate: 'desc' },
        });
        return { payments };
    }
    async get(req, id) {
        const payment = await this.prisma.vendorPayment.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { payment };
    }
    async create(req, body) {
        const supplier = await this.prisma.supplier.findFirst({ where: { id: body.supplierId, tenantId: req.user.tenantId } });
        const supplierCode = supplier?.code || 'N/A';
        const payment = await this.prisma.vendorPayment.create({
            data: {
                tenantId: req.user.tenantId,
                paymentNo: body.paymentNo,
                paymentDate: new Date(body.paymentDate),
                supplierId: body.supplierId,
                invoiceId: body.invoiceId,
                amount: body.amount,
                paymentMethod: body.paymentMethod,
                reference: body.reference,
                notes: body.notes,
                status: 'POSTED',
            },
        });
        if (body.paymentMethod === 'CASH') {
            const cashAccounts = await this.prisma.cashAccount.findMany({ where: { tenantId: req.user.tenantId, isActive: true }, take: 1 });
            if (cashAccounts.length > 0) {
                await this.prisma.cashTransaction.create({
                    data: {
                        tenantId: req.user.tenantId,
                        cashAccountId: cashAccounts[0].id,
                        transDate: new Date(body.paymentDate),
                        transType: 'DEBIT',
                        description: `Payment to ${supplierCode}`,
                        amount: body.amount,
                        reference: body.paymentNo,
                        status: 'POSTED',
                    },
                });
                await this.prisma.cashAccount.update({
                    where: { id: cashAccounts[0].id },
                    data: { balance: { decrement: body.amount } },
                });
            }
        }
        else if (body.paymentMethod === 'BANK_TRANSFER') {
            const bankAccounts = await this.prisma.bankAccount.findMany({ where: { tenantId: req.user.tenantId, isActive: true }, take: 1 });
            if (bankAccounts.length > 0) {
                await this.prisma.bankTransaction.create({
                    data: {
                        tenantId: req.user.tenantId,
                        bankAccountId: bankAccounts[0].id,
                        transDate: new Date(body.paymentDate),
                        transType: 'DEBIT',
                        description: `Payment to ${supplierCode}`,
                        amount: body.amount,
                        reference: body.paymentNo,
                        status: 'POSTED',
                    },
                });
                await this.prisma.bankAccount.update({
                    where: { id: bankAccounts[0].id },
                    data: { balance: { decrement: body.amount } },
                });
            }
        }
        if (body.reference) {
            const matchingInvoices = await this.prisma.purchaseInvoice.findMany({
                where: {
                    tenantId: req.user.tenantId,
                    code: { contains: body.reference }
                }
            });
            let targetInv = matchingInvoices.find(x => body.reference.includes(x.code) || x.code.includes(body.reference));
            if (!targetInv && matchingInvoices.length > 0) {
                targetInv = matchingInvoices[0];
            }
            if (targetInv) {
                const newBalance = Number(targetInv.balanceDue) - Number(body.amount);
                const newStatus = newBalance <= 0 ? 'CLOSED' : targetInv.status;
                await this.prisma.purchaseInvoice.update({
                    where: { id: targetInv.id },
                    data: {
                        balanceDue: Math.max(0, newBalance),
                        status: newStatus
                    }
                });
            }
        }
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'VendorPayment', entityId: payment.id, metadata: { payment } });
        const user = req.user;
        const amount = body.amount;
        let assetCode = '111-002';
        if (body.paymentMethod === 'BANK_TRANSFER') {
            const bankAcct = await this.prisma.bankAccount.findFirst({ where: { tenantId: user.tenantId, isActive: true }, include: { coaAccount: true } });
            assetCode = bankAcct?.coaAccount?.code || '111-101';
        }
        const apCode = await this.prisma.coaAccount.findFirst({ where: { tenantId: user.tenantId, code: { startsWith: '210' } } });
        const apAccountCode = apCode?.code || '210-000';
        const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId } });
        const entryNo = `JE-VP-${String(journalCount + 1).padStart(6, '0')}`;
        await this.prisma.journalEntry.create({
            data: {
                tenantId: user.tenantId,
                entryNo,
                entryDate: new Date(body.paymentDate),
                description: `Vendor Payment - ${supplierCode}`,
                referenceNo: body.paymentNo,
                journalType: 'VENDOR_PAYMENT',
                totalDebit: amount,
                totalCredit: amount,
                status: 'POSTED',
                lines: {
                    create: [
                        {
                            tenantId: user.tenantId,
                            lineNo: 1,
                            accountCode: apAccountCode,
                            description: `Hutang ${supplierCode}`,
                            debit: amount,
                            credit: 0,
                            referenceId: payment.id
                        },
                        {
                            tenantId: user.tenantId,
                            lineNo: 2,
                            accountCode: assetCode,
                            description: body.paymentMethod === 'CASH' ? 'Kas' : 'Bank',
                            debit: 0,
                            credit: amount,
                            referenceId: payment.id
                        }
                    ]
                }
            }
        });
        return { payment };
    }
    async delete(req, id) {
        await this.prisma.vendorPayment.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'VendorPayment', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.VendorPaymentController = VendorPaymentController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.vendorPayment.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.vendorPayment.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.vendorPayment.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.vendorPayment.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VendorPaymentController.prototype, "delete", null);
exports.VendorPaymentController = VendorPaymentController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/vendor-payment'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], VendorPaymentController);
//# sourceMappingURL=vendor-payment.controller.js.map