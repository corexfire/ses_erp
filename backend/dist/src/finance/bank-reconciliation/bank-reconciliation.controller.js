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
exports.BankReconciliationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let BankReconciliationController = class BankReconciliationController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, bankAccountId) {
        const where = { tenantId: req.user.tenantId };
        if (bankAccountId)
            where.bankAccountId = bankAccountId;
        const reconciliations = await this.prisma.bankReconciliation.findMany({
            where,
            include: { bankAccount: true },
            orderBy: { reconcileDate: 'desc' },
        });
        return { reconciliations };
    }
    async get(req, id) {
        const reconciliation = await this.prisma.bankReconciliation.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { bankAccount: true },
        });
        return { reconciliation };
    }
    async create(req, body) {
        const difference = body.statementBalance - body.bookBalance;
        const reconciliation = await this.prisma.bankReconciliation.create({
            data: {
                tenantId: req.user.tenantId,
                bankAccountId: body.bankAccountId,
                reconcileDate: new Date(body.reconcileDate),
                statementDate: new Date(body.statementDate),
                statementBalance: body.statementBalance,
                bookBalance: body.bookBalance,
                difference,
                status: 'DRAFT',
            },
            include: { bankAccount: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'BankReconciliation', entityId: reconciliation.id, metadata: { reconciliation } });
        return { reconciliation };
    }
    async approve(req, id) {
        const reconciliation = await this.prisma.bankReconciliation.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!reconciliation)
            throw new Error('Reconciliation not found');
        const updated = await this.prisma.bankReconciliation.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'APPROVE', entity: 'BankReconciliation', entityId: id, metadata: { reconciliation: updated } });
        return { reconciliation: updated };
    }
    async delete(req, id) {
        await this.prisma.bankReconciliation.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'BankReconciliation', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.BankReconciliationController = BankReconciliationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.bankReconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('bankAccountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BankReconciliationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.bankReconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BankReconciliationController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.bankReconciliation.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BankReconciliationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('finance.bankReconciliation.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BankReconciliationController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.bankReconciliation.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BankReconciliationController.prototype, "delete", null);
exports.BankReconciliationController = BankReconciliationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/bank-reconciliation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], BankReconciliationController);
//# sourceMappingURL=bank-reconciliation.controller.js.map