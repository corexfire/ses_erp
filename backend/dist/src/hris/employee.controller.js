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