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
exports.FiscalReconciliationController = exports.EqualizationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let EqualizationController = class EqualizationController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const equalizations = await this.prisma.taxEqualization.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { period: 'desc' },
        });
        return { equalizations };
    }
    async get(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { equalization };
    }
    async create(req, body) {
        const difference = body.fiscalIncome - body.bookIncome;
        const equalization = await this.prisma.taxEqualization.create({
            data: {
                tenantId: req.user.tenantId,
                period: body.period,
                bookIncome: body.bookIncome,
                fiscalIncome: body.fiscalIncome,
                difference,
                description: body.description,
                status: 'DRAFT',
            },
        });
        return { equalization };
    }
    async approve(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!equalization)
            throw new Error('Equalization not found');
        const updated = await this.prisma.taxEqualization.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
        return { equalization: updated };
    }
};
exports.EqualizationController = EqualizationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.equalization.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('tax.equalization.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.equalization.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('tax.equalization.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "approve", null);
exports.EqualizationController = EqualizationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/equalization'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EqualizationController);
let FiscalReconciliationController = class FiscalReconciliationController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period) {
        const where = { tenantId: req.user.tenantId };
        if (period)
            where.period = period;
        const equalizations = await this.prisma.taxEqualization.findMany({
            where,
            orderBy: { period: 'desc' },
        });
        return { equalizations };
    }
    async get(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { equalization };
    }
    async generateReport(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!equalization)
            throw new Error('Equalization not found');
        const journalLines = await this.prisma.journalEntryLine.findMany({
            where: {
                tenantId: req.user.tenantId,
                journalEntry: { status: 'POSTED' },
            },
            include: { journalEntry: true },
        });
        const report = {
            equalizationId: id,
            period: equalization.period,
            bookIncome: Number(equalization.bookIncome),
            fiscalIncome: Number(equalization.fiscalIncome),
            difference: Number(equalization.difference),
            adjustments: [
                { item: 'Non-deductible Entertainment', amount: 45000000, type: 'POSITIVE' },
                { item: 'Tax Penalty & Interest', amount: 12500000, type: 'POSITIVE' },
                { item: 'Member Benefit Expenses', amount: 25000000, type: 'POSITIVE' },
                { item: 'Depreciation Difference', amount: -15000000, type: 'NEGATIVE' },
            ],
            journalSummary: journalLines.length,
        };
        return { report };
    }
};
exports.FiscalReconciliationController = FiscalReconciliationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.fiscalReconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FiscalReconciliationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('tax.fiscalReconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FiscalReconciliationController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(':id/generate-report'),
    (0, permissions_decorator_1.RequirePermissions)('tax.fiscalReconciliation.generate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FiscalReconciliationController.prototype, "generateReport", null);
exports.FiscalReconciliationController = FiscalReconciliationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/fiscal-reconciliation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FiscalReconciliationController);
//# sourceMappingURL=compliance.controller.js.map