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
exports.ProjectController = exports.CreateWbsTaskDto = exports.UpdateProjectBillingSetupDto = exports.UpdateProjectDto = exports.CreateProjectDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const audit_service_1 = require("../audit/audit.service");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateProjectDto {
    code;
    name;
    customerId;
    description;
    startDate;
    endDate;
    totalBudget;
}
exports.CreateProjectDto = CreateProjectDto;
class UpdateProjectDto {
    name;
    customerId;
    description;
    startDate;
    endDate;
    totalBudget;
    status;
}
exports.UpdateProjectDto = UpdateProjectDto;
class UpdateProjectBillingSetupDto {
    retentionRate;
    downPaymentTotal;
    dpRecoveryRate;
    billingType;
}
exports.UpdateProjectBillingSetupDto = UpdateProjectBillingSetupDto;
class CreateWbsTaskDto {
    projectId;
    taskCode;
    taskName;
    description;
    priority;
    parentTaskId;
    assigneeId;
    level;
    plannedWeight;
    plannedCost;
    startDate;
    endDate;
    taskType;
    tags;
    status;
}
exports.CreateWbsTaskDto = CreateWbsTaskDto;
let ProjectController = class ProjectController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listProjects(req, search, status) {
        const where = { tenantId: req.user.tenantId };
        if (search) {
            where.OR = [
                { code: { contains: search, mode: 'insensitive' } },
                { name: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status)
            where.status = status;
        const projects = await this.prisma.project.findMany({
            where,
            include: { customer: true },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { data: projects };
    }
    async getProject(req, id) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                customer: true,
                wbsTasks: {
                    include: { assignee: true },
                    orderBy: { level: 'asc' }
                },
                budgets: true,
            },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async create(req, body) {
        const project = await this.prisma.project.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                customerId: body.customerId,
                description: body.description,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                totalBudget: body.totalBudget,
                status: 'DRAFT',
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'Project',
            entityId: project.id,
            metadata: { code: project.code },
        });
        return project;
    }
    async update(id, body, req) {
        const existing = await this.prisma.project.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Project not found');
        const project = await this.prisma.project.update({
            where: { id },
            data: {
                name: body.name ?? existing.name,
                customerId: body.customerId ?? existing.customerId,
                description: body.description ?? existing.description,
                startDate: body.startDate ? new Date(body.startDate) : existing.startDate,
                endDate: body.endDate ? new Date(body.endDate) : existing.endDate,
                totalBudget: body.totalBudget ?? existing.totalBudget,
                status: body.status ?? existing.status,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'Project',
            entityId: project.id,
            metadata: { code: project.code },
        });
        return project;
    }
    async close(id, req) {
        const project = await this.prisma.project.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const updated = await this.prisma.project.update({
            where: { id },
            data: { status: 'CLOSED' },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CLOSE',
            entity: 'Project',
            entityId: id,
            metadata: { code: project.code },
        });
        return updated;
    }
    async updateBillingSetup(id, body, req) {
        const project = await this.prisma.project.update({
            where: { id, tenantId: req.user.tenantId },
            data: {
                retentionRate: body.retentionRate ?? undefined,
                downPaymentTotal: body.downPaymentTotal ?? undefined,
                dpRecoveryRate: body.dpRecoveryRate ?? undefined,
                billingType: body.billingType ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE_BILLING_SETUP',
            entity: 'Project',
            entityId: id,
        });
        return project;
    }
    async getProjectWbs(id, req) {
        const tasks = await this.prisma.wbsTask.findMany({
            where: { projectId: id, tenantId: req.user.tenantId },
            orderBy: [{ level: 'asc' }, { taskCode: 'asc' }],
            take: 500,
        });
        return { wbsTasks: tasks };
    }
    async listWbs(req, projectId, assigneeId, teamId) {
        const where = { tenantId: req.user.tenantId };
        if (projectId)
            where.projectId = projectId;
        if (assigneeId)
            where.assigneeId = assigneeId;
        if (teamId)
            where.teamId = teamId;
        const tasks = await this.prisma.wbsTask.findMany({
            where,
            include: { assignee: true },
            orderBy: [{ level: 'asc' }, { taskCode: 'asc' }],
            take: 500,
        });
        return { data: tasks };
    }
    async createWbs(req, body) {
        const task = await this.prisma.wbsTask.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                taskCode: body.taskCode,
                taskName: body.taskName,
                description: body.description,
                priority: body.priority || 'MEDIUM',
                parentTaskId: body.parentTaskId,
                assigneeId: body.assigneeId,
                level: body.level,
                plannedWeight: body.plannedWeight || 0,
                plannedCost: body.plannedCost,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                taskType: body.taskType || 'TASK',
                tags: body.tags,
                status: body.status || 'PENDING',
            },
        });
        return task;
    }
    async updateWbs(id, body, req) {
        const task = await this.prisma.wbsTask.update({
            where: { id },
            data: {
                taskName: body.taskName,
                description: body.description,
                priority: body.priority,
                parentTaskId: body.parentTaskId,
                assigneeId: body.assigneeId,
                plannedWeight: body.plannedWeight,
                plannedCost: body.plannedCost,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                taskType: body.taskType,
                tags: body.tags,
                status: body.status,
            },
        });
        return task;
    }
    async updateWbsStatus(id, status, req) {
        const task = await this.prisma.wbsTask.update({
            where: { id, tenantId: req.user.tenantId },
            data: { status },
        });
        return task;
    }
    async listDeadlines(req) {
        const tasks = await this.prisma.wbsTask.findMany({
            where: {
                tenantId: req.user.tenantId,
                endDate: { not: null }
            },
            include: {
                project: true,
                assignee: true,
                team: true
            },
            orderBy: { endDate: 'asc' }
        });
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);
        const buckets = {
            OVERDUE: tasks.filter(t => t.endDate && t.endDate < now && t.status !== 'COMPLETED'),
            TODAY: tasks.filter(t => t.endDate && t.endDate >= now && t.endDate < tomorrow),
            THIS_WEEK: tasks.filter(t => t.endDate && t.endDate >= tomorrow && t.endDate < nextWeek),
            FUTURE: tasks.filter(t => t.endDate && t.endDate >= nextWeek)
        };
        return { data: buckets, all: tasks };
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Get)('projects'),
    (0, permissions_decorator_1.RequirePermissions)('project.setup.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "listProjects", null);
__decorate([
    (0, common_1.Get)('projects/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.setup.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProject", null);
__decorate([
    (0, common_1.Post)('projects'),
    (0, permissions_decorator_1.RequirePermissions)('project.setup.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('projects/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.setup.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('projects/:id/close'),
    (0, permissions_decorator_1.RequirePermissions)('project.setup.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "close", null);
__decorate([
    (0, common_1.Patch)('projects/:id/billing-setup'),
    (0, permissions_decorator_1.RequirePermissions)('project.setup.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProjectBillingSetupDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateBillingSetup", null);
__decorate([
    (0, common_1.Get)('projects/:id/wbs'),
    (0, permissions_decorator_1.RequirePermissions)('project.setup.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectWbs", null);
__decorate([
    (0, common_1.Get)('wbs'),
    (0, permissions_decorator_1.RequirePermissions)('project.wbs.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __param(2, (0, common_1.Query)('assigneeId')),
    __param(3, (0, common_1.Query)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "listWbs", null);
__decorate([
    (0, common_1.Post)('wbs'),
    (0, permissions_decorator_1.RequirePermissions)('project.wbs.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateWbsTaskDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createWbs", null);
__decorate([
    (0, common_1.Patch)('wbs/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.wbs.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateWbs", null);
__decorate([
    (0, common_1.Patch)('wbs/:id/status'),
    (0, permissions_decorator_1.RequirePermissions)('project.wbs.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateWbsStatus", null);
__decorate([
    (0, common_1.Get)('tasks/deadlines'),
    (0, permissions_decorator_1.RequirePermissions)('project.wbs.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "listDeadlines", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map