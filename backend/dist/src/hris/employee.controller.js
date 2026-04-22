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
exports.RecruitmentController = exports.OrgStructureController = exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let EmployeeController = class EmployeeController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, department) {
        const where = { tenantId: req.user.tenantId };
        if (department)
            where.department = department;
        const employees = await this.prisma.employee.findMany({
            where,
            include: { manager: true, reports: true },
            orderBy: [{ firstName: 'asc' }],
        });
        return { employees };
    }
    async get(req, id) {
        const employee = await this.prisma.employee.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { manager: true, reports: true, attendances: { orderBy: [{ date: 'desc' }], take: 10 } },
        });
        return { employee };
    }
    async create(req, body) {
        const employee = await this.prisma.employee.create({
            data: {
                tenantId: req.user.tenantId,
                employeeNo: body.employeeNo,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                department: body.department,
                position: body.position,
                hireDate: body.hireDate ? new Date(body.hireDate) : null,
                salary: body.salary,
                managerId: body.managerId,
                status: 'ACTIVE',
            },
        });
        return { employee };
    }
    async update(req, id, body) {
        const employee = await this.prisma.employee.update({
            where: { id },
            data: {
                ...(body.firstName && { firstName: body.firstName }),
                ...(body.lastName && { lastName: body.lastName }),
                ...(body.email && { email: body.email }),
                ...(body.phone && { phone: body.phone }),
                ...(body.department && { department: body.department }),
                ...(body.position && { position: body.position }),
                ...(body.status && { status: body.status }),
                ...(body.salary && { salary: body.salary }),
            },
        });
        return { employee };
    }
    async listMovements(req, id) {
        const movements = await this.prisma.employeeMovement.findMany({
            where: { employeeId: id, tenantId: req.user.tenantId },
            orderBy: { effectiveDate: 'desc' },
        });
        return { movements };
    }
    async createMovement(req, id, body) {
        return await this.prisma.$transaction(async (tx) => {
            const movement = await tx.employeeMovement.create({
                data: {
                    tenantId: req.user.tenantId,
                    employeeId: id,
                    type: body.type,
                    fromDept: body.fromDept,
                    toDept: body.toDept,
                    fromPos: body.fromPos,
                    toPos: body.toPos,
                    effectiveDate: new Date(body.effectiveDate),
                    reason: body.reason,
                },
            });
            await tx.employee.update({
                where: { id },
                data: {
                    ...(body.toDept && { department: body.toDept }),
                    ...(body.toPos && { position: body.toPos }),
                },
            });
            return { movement };
        });
    }
    async listDisciplinary(req, id) {
        const actions = await this.prisma.disciplinaryAction.findMany({
            where: { employeeId: id, tenantId: req.user.tenantId },
            orderBy: { issueDate: 'desc' },
        });
        return { actions };
    }
    async createDisciplinary(req, id, body) {
        const action = await this.prisma.disciplinaryAction.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: id,
                type: body.type,
                issueDate: new Date(body.issueDate),
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
                reason: body.reason,
                status: 'ACTIVE',
            },
        });
        return { action };
    }
    async calcTermination(req, id) {
        const emp = await this.prisma.employee.findFirst({
            where: { id, tenantId: req.user.tenantId }
        });
        if (!emp)
            throw new NotFoundException('Employee not found');
        const hireDate = emp.hireDate || new Date();
        const now = new Date();
        const serviceYears = (now.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        const salary = Number(emp.salary || 0);
        let sevMultiplier = 1;
        if (serviceYears >= 8)
            sevMultiplier = 9;
        else if (serviceYears >= 7)
            sevMultiplier = 8;
        else if (serviceYears >= 6)
            sevMultiplier = 7;
        else if (serviceYears >= 5)
            sevMultiplier = 6;
        else if (serviceYears >= 4)
            sevMultiplier = 5;
        else if (serviceYears >= 3)
            sevMultiplier = 4;
        else if (serviceYears >= 2)
            sevMultiplier = 3;
        else if (serviceYears >= 1)
            sevMultiplier = 2;
        const severance = salary * sevMultiplier;
        let upmkMultiplier = 0;
        if (serviceYears >= 24)
            upmkMultiplier = 10;
        else if (serviceYears >= 21)
            upmkMultiplier = 8;
        else if (serviceYears >= 18)
            upmkMultiplier = 7;
        else if (serviceYears >= 15)
            upmkMultiplier = 6;
        else if (serviceYears >= 12)
            upmkMultiplier = 5;
        else if (serviceYears >= 9)
            upmkMultiplier = 4;
        else if (serviceYears >= 6)
            upmkMultiplier = 3;
        else if (serviceYears >= 3)
            upmkMultiplier = 2;
        const servicePay = salary * upmkMultiplier;
        const compensation = (severance + servicePay) * 0.15;
        return {
            serviceYears: serviceYears.toFixed(2),
            salary,
            severance,
            servicePay,
            compensation,
            total: severance + servicePay + compensation
        };
    }
    async terminate(req, id, body) {
        return await this.prisma.$transaction(async (tx) => {
            const termination = await tx.employeeTermination.create({
                data: {
                    tenantId: req.user.tenantId,
                    employeeId: id,
                    terminationDate: new Date(body.terminationDate),
                    reason: body.reason,
                    type: body.type,
                    severanceAmount: body.severanceAmount,
                    servicePayAmount: body.servicePayAmount,
                    compensationPayAmount: body.compensationPayAmount,
                    totalAmount: body.totalAmount,
                    status: 'PENDING',
                    notes: body.notes,
                },
            });
            await tx.employee.update({
                where: { id },
                data: { status: 'INACTIVE' },
            });
            return { termination };
        });
    }
    async listTerminations(req) {
        const terminations = await this.prisma.employeeTermination.findMany({
            where: { tenantId: req.user.tenantId },
            include: { employee: true },
            orderBy: { terminationDate: 'desc' },
        });
        return { terminations };
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('department')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id/movements'),
    (0, permissions_decorator_1.RequirePermissions)('hris.orgStructure.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "listMovements", null);
__decorate([
    (0, common_1.Post)(':id/movements'),
    (0, permissions_decorator_1.RequirePermissions)('hris.orgStructure.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createMovement", null);
__decorate([
    (0, common_1.Get)(':id/disciplinary'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "listDisciplinary", null);
__decorate([
    (0, common_1.Post)(':id/disciplinary'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createDisciplinary", null);
__decorate([
    (0, common_1.Get)(':id/termination-calc'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "calcTermination", null);
__decorate([
    (0, common_1.Post)(':id/terminate'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "terminate", null);
__decorate([
    (0, common_1.Get)('terminations'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "listTerminations", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/employees'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeeController);
let OrgStructureController = class OrgStructureController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const units = await this.prisma.organizationUnit.findMany({
            where: { tenantId: req.user.tenantId },
            include: { parent: true, children: true },
            orderBy: [{ name: 'asc' }],
        });
        return { units };
    }
    async create(req, body) {
        const unit = await this.prisma.organizationUnit.create({
            data: {
                tenantId: req.user.tenantId,
                name: body.name,
                code: body.code,
                parentId: body.parentId,
                managerId: body.managerId,
                type: body.type || 'DEPARTMENT',
            },
        });
        return { unit };
    }
    async get(req, id) {
        const unit = await this.prisma.organizationUnit.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { parent: true, children: true, manager: true },
        });
        return { unit };
    }
    async update(req, id, body) {
        const unit = await this.prisma.organizationUnit.update({
            where: { id, tenantId: req.user.tenantId },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.code && { code: body.code }),
                ...(body.parentId !== undefined && { parentId: body.parentId }),
                ...(body.managerId !== undefined && { managerId: body.managerId }),
                ...(body.type && { type: body.type }),
            },
        });
        return { unit };
    }
    async delete(req, id) {
        await this.prisma.organizationUnit.delete({
            where: { id, tenantId: req.user.tenantId },
        });
        return { success: true };
    }
};
exports.OrgStructureController = OrgStructureController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.orgStructure.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrgStructureController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.orgStructure.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrgStructureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.orgStructure.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrgStructureController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.orgStructure.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrgStructureController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.orgStructure.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrgStructureController.prototype, "delete", null);
exports.OrgStructureController = OrgStructureController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/org-structure'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrgStructureController);
let RecruitmentController = class RecruitmentController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const candidates = await this.prisma.recruitmentCandidate.findMany({
            where,
            orderBy: [{ appliedAt: 'desc' }],
        });
        return { candidates };
    }
    async create(req, body) {
        const candidate = await this.prisma.recruitmentCandidate.create({
            data: {
                tenantId: req.user.tenantId,
                candidateNo: body.candidateNo,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                position: body.position,
                status: 'APPLIED',
            },
        });
        return { candidate };
    }
    async advance(req, id, body) {
        const candidate = await this.prisma.recruitmentCandidate.update({
            where: { id },
            data: { status: body.status },
        });
        return { candidate };
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.recruitment.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.recruitment.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/advance'),
    (0, permissions_decorator_1.RequirePermissions)('hris.recruitment.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "advance", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/recruitment'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecruitmentController);
//# sourceMappingURL=employee.controller.js.map