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
exports.ESSController = exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let PayrollController = class PayrollController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period) {
        const where = { tenantId: req.user.tenantId };
        if (period)
            where.period = period;
        const runs = await this.prisma.payrollRun.findMany({
            where,
            include: { employee: true },
            orderBy: [{ period: 'desc' }],
        });
        return { runs };
    }
    async get(req, id) {
        const run = await this.prisma.payrollRun.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { employee: true },
        });
        return { run };
    }
    async create(req, body) {
        const grossPay = body.basicSalary + (body.allowances || 0);
        const netPay = grossPay - (body.deductions || 0) - (body.taxAmount || 0);
        const existing = await this.prisma.payrollRun.findFirst({
            where: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                period: body.period,
            }
        });
        if (existing) {
            const run = await this.prisma.payrollRun.update({
                where: { id: existing.id },
                data: {
                    basicSalary: body.basicSalary,
                    allowances: body.allowances || 0,
                    deductions: body.deductions || 0,
                    grossPay,
                    netPay,
                    taxAmount: body.taxAmount || 0,
                    status: existing.status === 'APPROVED' ? 'APPROVED' : 'DRAFT',
                },
                include: { employee: true },
            });
            return { run };
        }
        const run = await this.prisma.payrollRun.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                period: body.period,
                basicSalary: body.basicSalary,
                allowances: body.allowances || 0,
                deductions: body.deductions || 0,
                grossPay,
                netPay,
                taxAmount: body.taxAmount || 0,
                status: 'DRAFT',
            },
            include: { employee: true },
        });
        return { run };
    }
    async approve(req, id, body) {
        const run = await this.prisma.payrollRun.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { employee: true },
        });
        if (!run)
            throw new common_1.NotFoundException('Payroll run not found');
        const grossPay = Number(run.grossPay) || 0;
        const taxAmount = Number(run.taxAmount) || 0;
        const netPay = Number(run.netPay) || 0;
        const updatedRun = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.payrollRun.update({
                where: { id },
                data: { status: 'APPROVED', payDate: new Date(body.payDate) },
                include: { employee: true },
            });
            if (grossPay > 0) {
                const jeCount = await tx.journalEntry.count({ where: { tenantId: req.user.tenantId } });
                const jeNo = `JE-PY-${String(jeCount + 1).padStart(6, '0')}`;
                const journal = await tx.journalEntry.create({
                    data: {
                        tenantId: req.user.tenantId,
                        entryNo: jeNo,
                        entryDate: new Date(),
                        description: `Payroll Period ${run.period} - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
                        referenceNo: run.period,
                        journalType: 'PAYROLL',
                        totalDebit: grossPay,
                        totalCredit: grossPay,
                        status: 'POSTED',
                    }
                });
                const journalLines = [];
                let lineNo = 1;
                journalLines.push({
                    tenantId: req.user.tenantId,
                    journalEntryId: journal.id,
                    lineNo: lineNo++,
                    accountCode: '5-1000-00',
                    description: `Beban Gaji & Tunjangan - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
                    debit: grossPay,
                    credit: 0,
                    referenceId: run.id,
                });
                journalLines.push({
                    tenantId: req.user.tenantId,
                    journalEntryId: journal.id,
                    lineNo: lineNo++,
                    accountCode: '2-1200-00',
                    description: `Hutang Gaji - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
                    debit: 0,
                    credit: netPay,
                    referenceId: run.id,
                });
                if (taxAmount > 0) {
                    journalLines.push({
                        tenantId: req.user.tenantId,
                        journalEntryId: journal.id,
                        lineNo: lineNo++,
                        accountCode: '2-1300-00',
                        description: `PPh Pasal 21 Terutang - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
                        debit: 0,
                        credit: taxAmount,
                        referenceId: run.id,
                    });
                }
                await tx.journalEntryLine.createMany({ data: journalLines });
            }
            return updated;
        });
        return { run: updatedRun };
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.payroll.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.payroll.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.payroll.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('hris.payroll.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "approve", null);
exports.PayrollController = PayrollController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/payroll'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayrollController);
let ESSController = class ESSController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async profile(req) {
        const employees = await this.prisma.employee.findMany({
            where: { tenantId: req.user.tenantId },
            include: { attendances: { orderBy: [{ date: 'desc' }], take: 5 } },
        });
        return { employees };
    }
    async myAttendance(req) {
        const attendances = await this.prisma.attendance.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ date: 'desc' }],
            take: 30,
        });
        return { attendances };
    }
    async myPayroll(req) {
        const runs = await this.prisma.payrollRun.findMany({
            where: { tenantId: req.user.tenantId, status: 'APPROVED' },
            orderBy: [{ period: 'desc' }],
        });
        return { runs };
    }
};
exports.ESSController = ESSController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.ess.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ESSController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)('my-attendance'),
    (0, permissions_decorator_1.RequirePermissions)('hris.ess.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ESSController.prototype, "myAttendance", null);
__decorate([
    (0, common_1.Get)('my-payroll'),
    (0, permissions_decorator_1.RequirePermissions)('hris.ess.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ESSController.prototype, "myPayroll", null);
exports.ESSController = ESSController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/ess'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ESSController);
//# sourceMappingURL=payroll.controller.js.map