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
exports.CustomerReceiptController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let CustomerReceiptController = class CustomerReceiptController {
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
        const receipts = await this.prisma.customerReceipt.findMany({
            where,
            orderBy: { receiptDate: 'desc' },
        });
        return { receipts };
    }
    async get(req, id) {
        const receipt = await this.prisma.customerReceipt.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { receipt };
    }
    async create(req, body) {
        const receipt = await this.prisma.customerReceipt.create({
            data: {
                tenantId: req.user.tenantId,
                receiptNo: body.receiptNo,
                receiptDate: new Date(body.receiptDate),
                customerCode: body.customerCode,
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
                        transDate: new Date(body.receiptDate),
                        transType: 'CREDIT',
                        description: `Receipt from ${body.customerCode}`,
                        amount: body.amount,
                        reference: body.receiptNo,
                        status: 'POSTED',
                    },
                });
                await this.prisma.cashAccount.update({
                    where: { id: cashAccounts[0].id },
                    data: { balance: { increment: body.amount } },
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
                        transDate: new Date(body.receiptDate),
                        transType: 'CREDIT',
                        description: `Receipt from ${body.customerCode}`,
                        amount: body.amount,
                        reference: body.receiptNo,
                        status: 'POSTED',
                    },
                });
                await this.prisma.bankAccount.update({
                    where: { id: bankAccounts[0].id },
                    data: { balance: { increment: body.amount } },
                });
            }
        }
        if (body.reference) {
            const matchingInvoices = await this.prisma.customerInvoice.findMany({
                where: {
                    tenantId: req.user.tenantId,
                    invoiceNo: { contains: body.reference }
                }
            });
            let targetInv = matchingInvoices.find(x => body.reference.includes(x.invoiceNo) || x.invoiceNo.includes(body.reference));
            if (!targetInv && matchingInvoices.length > 0) {
                targetInv = matchingInvoices[0];
            }
            if (targetInv) {
                const newPaid = Number(targetInv.paidAmount) + Number(body.amount);
                const total = Number(targetInv.totalAmount);
                const newStatus = newPaid >= total ? 'PAID' : (newPaid > 0 ? 'PARTIAL' : targetInv.status);
                await this.prisma.customerInvoice.update({
                    where: { id: targetInv.id },
                    data: {
                        paidAmount: newPaid,
                        status: newStatus
                    }
                });
                await this.prisma.customerInvoicePayment.create({
                    data: {
                        tenantId: req.user.tenantId,
                        invoiceId: targetInv.id,
                        paymentDate: new Date(body.receiptDate),
                        amount: body.amount,
                        reference: body.receiptNo,
                        notes: body.notes
                    }
                });
            }
        }
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'CustomerReceipt', entityId: receipt.id, metadata: { receipt } });
        return { receipt };
    }
    async delete(req, id) {
        await this.prisma.customerReceipt.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'CustomerReceipt', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.CustomerReceiptController = CustomerReceiptController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.customerReceipt.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomerReceiptController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.customerReceipt.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomerReceiptController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.customerReceipt.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerReceiptController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.customerReceipt.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomerReceiptController.prototype, "delete", null);
exports.CustomerReceiptController = CustomerReceiptController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/customer-receipt'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CustomerReceiptController);
//# sourceMappingURL=customer-receipt.controller.js.map