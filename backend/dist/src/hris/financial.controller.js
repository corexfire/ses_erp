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
exports.HrisFinancialController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let HrisFinancialController = class HrisFinancialController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listLoans(req, employeeId) {
        const where = { tenantId: req.user.tenantId };
        if (employeeId)
            where.employeeId = employeeId;
        const loans = await this.prisma.employeeLoan.findMany({
            where,
            include: { employee: true, installments: true },
            orderBy: { createdAt: 'desc' },
        });
        return { loans };
    }
    async createLoan(req, body) {
        const loan = await this.prisma.employeeLoan.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                amount: body.amount,
                reason: body.reason,
                status: 'APPROVED',
                installments: {
                    create: body.installments.map((inst) => ({
                        tenantId: req.user.tenantId,
                        amount: inst.amount,
                        dueDate: new Date(inst.dueDate),
                        status: 'UNPAID',
                    })),
                },
            },
            include: { installments: true },
        });
        return { loan };
    }
    async updateInstallment(req, id, body) {
        const installment = await this.prisma.loanInstallment.update({
            where: { id, tenantId: req.user.tenantId },
            data: {
                status: body.status,
                paidDate: body.paidDate ? new Date(body.paidDate) : undefined,
            },
        });
        return { installment };
    }
};
exports.HrisFinancialController = HrisFinancialController;
__decorate([
    (0, common_1.Get)('loans'),
    (0, permissions_decorator_1.RequirePermissions)('hris.payroll.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HrisFinancialController.prototype, "listLoans", null);
__decorate([
    (0, common_1.Post)('loans'),
    (0, permissions_decorator_1.RequirePermissions)('hris.payroll.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrisFinancialController.prototype, "createLoan", null);
__decorate([
    (0, common_1.Patch)('installments/:id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.payroll.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], HrisFinancialController.prototype, "updateInstallment", null);
exports.HrisFinancialController = HrisFinancialController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/financial'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HrisFinancialController);
//# sourceMappingURL=financial.controller.js.map