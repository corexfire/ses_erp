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
exports.BudgetController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let BudgetController = class BudgetController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, fiscalYear) {
        const where = { tenantId: req.user.tenantId };
        if (fiscalYear)
            where.fiscalYear = fiscalYear;
        const budgets = await this.prisma.budget.findMany({
            where,
            include: { costCenter: true },
            orderBy: { fiscalYear: 'desc' },
        });
        return { budgets };
    }
    async get(req, id) {
        const budget = await this.prisma.budget.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { costCenter: true },
        });
        return { budget };
    }
    async create(req, body) {
        const budget = await this.prisma.budget.create({
            data: {
                tenantId: req.user.tenantId,
                budgetNo: body.budgetNo,
                fiscalYear: body.fiscalYear,
                periodNo: body.periodNo,
                accountCode: body.accountCode,
                costCenterId: body.costCenterId,
                amount: body.amount,
                spentAmount: 0,
                status: 'DRAFT',
            },
            include: { costCenter: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'Budget', entityId: budget.id, metadata: { budget } });
        return { budget };
    }
    async approve(req, id) {
        const budget = await this.prisma.budget.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!budget)
            throw new Error('Budget not found');
        const updated = await this.prisma.budget.update({
            where: { id },
            data: { status: 'APPROVED' },
            include: { costCenter: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'APPROVE', entity: 'Budget', entityId: id, metadata: { budget: updated } });
        return { budget: updated };
    }
    async update(req, id, body) {
        const budget = await this.prisma.budget.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!budget)
            throw new Error('Budget not found');
        const updated = await this.prisma.budget.update({
            where: { id },
            data: {
                ...(body.amount !== undefined && { amount: body.amount }),
                ...(body.accountCode && { accountCode: body.accountCode }),
            },
            include: { costCenter: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'Budget', entityId: id, metadata: { budget: updated } });
        return { budget: updated };
    }
    async delete(req, id) {
        await this.prisma.budget.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'Budget', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.BudgetController = BudgetController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.budget.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('fiscalYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.budget.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.budget.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('finance.budget.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.budget.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.budget.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BudgetController.prototype, "delete", null);
exports.BudgetController = BudgetController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/budget'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], BudgetController);
//# sourceMappingURL=budget.controller.js.map