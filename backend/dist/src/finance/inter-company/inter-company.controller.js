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
exports.InterCompanyController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let InterCompanyController = class InterCompanyController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const user = req.user;
        const where = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
        if (status)
            where.status = status;
        const transactions = await this.prisma.interCompanyTransaction.findMany({
            where,
            orderBy: { transDate: 'desc' },
        });
        return { transactions };
    }
    async get(req, id) {
        const user = req.user;
        const where = user.isSuperAdmin ? { id } : { id, tenantId: user.tenantId };
        const transaction = await this.prisma.interCompanyTransaction.findFirst({
            where,
        });
        return { transaction };
    }
    async create(req, body) {
        const transaction = await this.prisma.interCompanyTransaction.create({
            data: {
                tenantId: req.user.tenantId,
                transNo: body.transNo,
                transDate: new Date(body.transDate),
                fromCompanyId: body.fromCompanyId,
                toCompanyId: body.toCompanyId,
                description: body.description,
                referenceNo: body.referenceNo,
                transactionType: body.transactionType || 'FUND_TRANSFER',
                amount: body.amount,
                status: 'PENDING',
            },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'InterCompanyTransaction', entityId: transaction.id, metadata: { transaction } });
        return { transaction };
    }
    async approve(req, id) {
        const user = req.user;
        const transaction = await this.prisma.interCompanyTransaction.findFirst({ where: { id, tenantId: user.tenantId } });
        if (!transaction)
            throw new Error('Transaction not found');
        const fromBranch = await this.prisma.branch.findUnique({ where: { id: transaction.fromCompanyId } });
        const toBranch = await this.prisma.branch.findUnique({ where: { id: transaction.toCompanyId } });
        const amount = Number(transaction.amount);
        const icReceivable = await this.prisma.coaAccount.findFirst({
            where: { tenantId: user.tenantId, code: { startsWith: '190' } }
        });
        const icPayable = await this.prisma.coaAccount.findFirst({
            where: { tenantId: user.tenantId, code: { startsWith: '290' } }
        });
        const fromCoa = icReceivable?.code || '190-000';
        const toCoa = icPayable?.code || '290-000';
        const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId } });
        const entryNo = `JE-IC-${String(journalCount + 1).padStart(6, '0')}`;
        await this.prisma.journalEntry.create({
            data: {
                tenantId: user.tenantId,
                entryNo,
                entryDate: new Date(),
                description: `Inter-Company Transfer: ${fromBranch?.code || 'A'} -> ${toBranch?.code || 'B'} (${transaction.transactionType})`,
                referenceNo: transaction.transNo,
                journalType: 'INTER_COMPANY',
                totalDebit: amount,
                totalCredit: amount,
                status: 'POSTED',
                lines: {
                    create: [
                        {
                            tenantId: user.tenantId,
                            lineNo: 1,
                            accountCode: fromCoa,
                            description: `Piutang ke ${toBranch?.code || 'Branch tujuan'}`,
                            debit: amount,
                            credit: 0,
                            referenceId: transaction.id
                        },
                        {
                            tenantId: user.tenantId,
                            lineNo: 2,
                            accountCode: toCoa,
                            description: `Hutang ke ${fromBranch?.code || 'Branch asal'}`,
                            debit: 0,
                            credit: amount,
                            referenceId: transaction.id
                        }
                    ]
                }
            }
        });
        const updated = await this.prisma.interCompanyTransaction.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'APPROVE', entity: 'InterCompanyTransaction', entityId: id, metadata: { transaction: updated } });
        return { transaction: updated };
    }
    async reject(req, id) {
        const updated = await this.prisma.interCompanyTransaction.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'REJECT', entity: 'InterCompanyTransaction', entityId: id, metadata: { transaction: updated } });
        return { transaction: updated };
    }
    async delete(req, id) {
        await this.prisma.interCompanyTransaction.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'InterCompanyTransaction', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.InterCompanyController = InterCompanyController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.interCompany.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InterCompanyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.interCompany.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InterCompanyController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.interCompany.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InterCompanyController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('finance.interCompany.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InterCompanyController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('finance.interCompany.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InterCompanyController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.interCompany.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InterCompanyController.prototype, "delete", null);
exports.InterCompanyController = InterCompanyController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/inter-company'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], InterCompanyController);
//# sourceMappingURL=inter-company.controller.js.map