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
exports.ExpenseController = exports.KpiController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let KpiController = class KpiController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period) {
        const where = { tenantId: req.user.tenantId };
        if (period)
            where.period = period;
        const evaluations = await this.prisma.kpiEvaluation.findMany({
            where,
            include: { employee: true },
            orderBy: [{ period: 'desc' }],
        });
        return { evaluations };
    }
    async create(req, body) {
        const evaluation = await this.prisma.kpiEvaluation.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                period: body.period,
                score: body.score,
                grade: body.grade,
                comments: body.comments,
                status: 'DRAFT',
            },
            include: { employee: true },
        });
        return { evaluation };
    }
    async approve(req, id) {
        const evaluation = await this.prisma.kpiEvaluation.update({
            where: { id },
            data: { status: 'APPROVED' },
            include: { employee: true },
        });
        return { evaluation };
    }
};
exports.KpiController = KpiController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.kpi.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.kpi.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('hris.kpi.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KpiController.prototype, "approve", null);
exports.KpiController = KpiController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/kpi'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KpiController);
let ExpenseController = class ExpenseController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const claims = await this.prisma.expenseClaim.findMany({
            where,
            include: { employee: true },
            orderBy: [{ claimDate: 'desc' }],
        });
        return { claims };
    }
    async get(req, id) {
        const claim = await this.prisma.expenseClaim.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { employee: true },
        });
        return { claim };
    }
    async create(req, body) {
        const claim = await this.prisma.expenseClaim.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                claimNo: body.claimNo,
                claimDate: new Date(body.claimDate),
                amount: body.amount,
                description: body.description,
                category: body.category,
                status: 'PENDING',
            },
            include: { employee: true },
        });
        return { claim };
    }
    async approve(req, id) {
        const claim = await this.prisma.expenseClaim.update({
            where: { id },
            data: { status: 'APPROVED', approvedBy: req.user.id, approvedAt: new Date() },
            include: { employee: true },
        });
        return { claim };
    }
    async reject(req, id) {
        const claim = await this.prisma.expenseClaim.update({
            where: { id },
            data: { status: 'REJECTED', approvedBy: req.user.id, approvedAt: new Date() },
            include: { employee: true },
        });
        return { claim };
    }
};
exports.ExpenseController = ExpenseController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.expense.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.expense.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.expense.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('hris.expense.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('hris.expense.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "reject", null);
exports.ExpenseController = ExpenseController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/expense'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseController);
//# sourceMappingURL=kpi-expense.controller.js.map