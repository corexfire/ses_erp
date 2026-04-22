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
exports.HrisWorkflowController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let HrisWorkflowController = class HrisWorkflowController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listLeaves(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const leaves = await this.prisma.leaveRequest.findMany({
            where,
            include: { employee: true },
            orderBy: { startDate: 'desc' },
        });
        return { leaves };
    }
    async createLeave(req, body) {
        const leave = await this.prisma.leaveRequest.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                leaveType: body.leaveType,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                reason: body.reason,
                status: 'PENDING',
            },
        });
        return { leave };
    }
    async updateLeaveStatus(req, id, body) {
        const leave = await this.prisma.leaveRequest.update({
            where: { id, tenantId: req.user.tenantId },
            data: {
                status: body.status,
                approvedById: body.status === 'APPROVED' ? req.user.id : undefined
            },
            include: { employee: true },
        });
        if (body.status === 'APPROVED') {
            const days = Math.ceil((leave.endDate.getTime() - leave.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            await this.prisma.leaveBalance.updateMany({
                where: {
                    employeeId: leave.employeeId,
                    leaveType: leave.leaveType,
                    period: String(leave.startDate.getFullYear())
                },
                data: { used: { increment: days } }
            });
        }
        return { leave };
    }
    async listBalances(req, period) {
        const balances = await this.prisma.leaveBalance.findMany({
            where: {
                tenantId: req.user.tenantId,
                period: period || String(new Date().getFullYear())
            },
            include: { employee: true }
        });
        return { balances };
    }
    async initBalances(req) {
        const employees = await this.prisma.employee.findMany({
            where: { tenantId: req.user.tenantId, status: 'ACTIVE' }
        });
        const period = String(new Date().getFullYear());
        const data = employees.map(emp => ({
            tenantId: req.user.tenantId,
            employeeId: emp.id,
            leaveType: 'ANNUAL',
            allowance: 12,
            period,
        }));
        await this.prisma.leaveBalance.createMany({ data, skipDuplicates: true });
        return { success: true, count: data.length };
    }
    async listOvertime(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const overtimes = await this.prisma.overtimeRequest.findMany({
            where,
            include: { employee: true },
            orderBy: { date: 'desc' },
        });
        return { overtimes };
    }
    async createOvertime(req, body) {
        const overtime = await this.prisma.overtimeRequest.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                date: new Date(body.date),
                hours: body.hours,
                reason: body.reason,
                status: 'PENDING',
            },
        });
        return { overtime };
    }
    async updateOvertimeStatus(req, id, body) {
        const overtime = await this.prisma.overtimeRequest.update({
            where: { id, tenantId: req.user.tenantId },
            data: {
                status: body.status,
                approvedById: body.status === 'APPROVED' ? req.user.id : undefined
            },
        });
        return { overtime };
    }
};
exports.HrisWorkflowController = HrisWorkflowController;
__decorate([
    (0, common_1.Get)('leave'),
    (0, permissions_decorator_1.RequirePermissions)('hris.leave.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "listLeaves", null);
__decorate([
    (0, common_1.Post)('leave'),
    (0, permissions_decorator_1.RequirePermissions)('hris.leave.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "createLeave", null);
__decorate([
    (0, common_1.Patch)('leave/:id/status'),
    (0, permissions_decorator_1.RequirePermissions)('hris.leave.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "updateLeaveStatus", null);
__decorate([
    (0, common_1.Get)('leave/balances'),
    (0, permissions_decorator_1.RequirePermissions)('hris.leave.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "listBalances", null);
__decorate([
    (0, common_1.Post)('leave/init-balances'),
    (0, permissions_decorator_1.RequirePermissions)('hris.leave.update'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "initBalances", null);
__decorate([
    (0, common_1.Get)('overtime'),
    (0, permissions_decorator_1.RequirePermissions)('hris.overtime.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "listOvertime", null);
__decorate([
    (0, common_1.Post)('overtime'),
    (0, permissions_decorator_1.RequirePermissions)('hris.overtime.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "createOvertime", null);
__decorate([
    (0, common_1.Patch)('overtime/:id/status'),
    (0, permissions_decorator_1.RequirePermissions)('hris.overtime.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], HrisWorkflowController.prototype, "updateOvertimeStatus", null);
exports.HrisWorkflowController = HrisWorkflowController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/workflow'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HrisWorkflowController);
//# sourceMappingURL=workflow.controller.js.map