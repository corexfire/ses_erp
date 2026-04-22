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
exports.ProjectExpansionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectExpansionController = class ProjectExpansionController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGanttData(req, projectId) {
        const tenantId = req.user.tenantId;
        const tasks = await this.prisma.wbsTask.findMany({
            where: { tenantId, projectId },
            include: {
                successorTasks: true,
                predecessorTasks: true,
                assignee: { select: { name: true, email: true } }
            },
            orderBy: { startDate: 'asc' }
        });
        const enrichedTasks = this.calculateCriticalPath(tasks);
        return { tasks: enrichedTasks };
    }
    calculateCriticalPath(tasks) {
        if (!tasks.length)
            return [];
        const taskMap = new Map();
        tasks.forEach(t => {
            const duration = Math.max(1, Math.ceil((new Date(t.endDate).getTime() - new Date(t.startDate).getTime()) / (1000 * 60 * 60 * 24)));
            taskMap.set(t.id, {
                ...t,
                duration,
                es: 0, ef: 0, ls: 0, lf: 0, slack: 0,
                predecessors: t.predecessorTasks.map(p => p.predecessorId),
                successors: t.successorTasks.map(s => s.successorId)
            });
        });
        const enriched = Array.from(taskMap.values());
        let maxEF = 0;
        enriched.forEach(t => {
            if (t.predecessors.length === 0) {
                t.es = 0;
            }
            else {
                t.es = Math.max(...t.predecessors.map(pId => taskMap.get(pId)?.ef || 0));
            }
            t.ef = t.es + t.duration;
            if (t.ef > maxEF)
                maxEF = t.ef;
        });
        for (let i = enriched.length - 1; i >= 0; i--) {
            const t = enriched[i];
            if (t.successors.length === 0) {
                t.lf = maxEF;
            }
            else {
                t.lf = Math.min(...t.successors.map(sId => taskMap.get(sId)?.ls ?? maxEF));
            }
            t.ls = t.lf - t.duration;
            t.slack = t.lf - t.ef;
            t.isCritical = t.slack <= 0;
        }
        return enriched;
    }
    async createDependency(req, body) {
        const dep = await this.prisma.taskDependency.create({
            data: {
                tenantId: req.user.tenantId,
                predecessorId: body.predecessorId,
                successorId: body.successorId,
                dependencyType: body.dependencyType || 'FS',
                lag: body.lag || 0
            }
        });
        return { dependency: dep };
    }
    async getIssues(req, projectId) {
        const tenantId = req.user.tenantId;
        const issues = await this.prisma.projectIssue.findMany({
            where: { tenantId, projectId },
            include: { assignee: { select: { name: true } } },
            orderBy: { createdAt: 'desc' }
        });
        return { issues };
    }
    async createIssue(req, projectId, body) {
        const issue = await this.prisma.projectIssue.create({
            data: {
                tenantId: req.user.tenantId,
                projectId,
                title: body.title,
                description: body.description,
                type: body.type || 'ISSUE',
                severity: body.severity || 'MEDIUM',
                status: 'OPEN',
                assignedToId: body.assignedToId
            }
        });
        return { issue };
    }
    async getChangeOrders(req, projectId) {
        const tenantId = req.user.tenantId;
        const cos = await this.prisma.projectChangeOrder.findMany({
            where: { tenantId, projectId },
            orderBy: { createdAt: 'desc' }
        });
        return { changeOrders: cos };
    }
    async createCO(req, projectId, body) {
        const co = await this.prisma.projectChangeOrder.create({
            data: {
                tenantId: req.user.tenantId,
                projectId,
                orderNo: `CO-${Date.now()}`,
                title: body.title,
                description: body.description,
                amountChange: body.amountChange || 0,
                scheduleImpact: body.scheduleImpact || 0,
                status: 'DRAFT'
            }
        });
        return { changeOrder: co };
    }
    async getHealthStats(req, projectId) {
        const tenantId = req.user.tenantId;
        const [project, issuesCount, coStats] = await Promise.all([
            this.prisma.project.findUnique({
                where: { id: projectId },
                include: { wbsTasks: true }
            }),
            this.prisma.projectIssue.groupBy({
                by: ['severity'],
                where: { tenantId, projectId, status: { not: 'CLOSED' } },
                _count: true
            }),
            this.prisma.projectChangeOrder.aggregate({
                where: { tenantId, projectId, status: 'APPROVED' },
                _sum: { amountChange: true }
            })
        ]);
        if (!project)
            return { error: 'Project not found' };
        const totalWeight = project.wbsTasks.reduce((acc, t) => acc + (t.plannedWeight || 0), 0);
        const actualProgress = project.wbsTasks.reduce((acc, t) => acc + ((t.actualProgress || 0) * (t.plannedWeight || 0) / (totalWeight || 1)), 0);
        return {
            financials: {
                originalBudget: Number(project.totalBudget || 0),
                coApproved: Number(coStats._sum.amountChange || 0),
                currentBudget: Number(project.totalBudget || 0) + Number(coStats._sum.amountChange || 0)
            },
            progress: {
                planned: 75,
                actual: actualProgress
            },
            risks: issuesCount.map(i => ({ severity: i.severity, count: i._count }))
        };
    }
};
exports.ProjectExpansionController = ProjectExpansionController;
__decorate([
    (0, common_1.Get)(':id/gantt'),
    (0, permissions_decorator_1.RequirePermissions)('project.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectExpansionController.prototype, "getGanttData", null);
__decorate([
    (0, common_1.Post)(':id/dependencies'),
    (0, permissions_decorator_1.RequirePermissions)('project.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectExpansionController.prototype, "createDependency", null);
__decorate([
    (0, common_1.Get)(':id/issues'),
    (0, permissions_decorator_1.RequirePermissions)('project.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectExpansionController.prototype, "getIssues", null);
__decorate([
    (0, common_1.Post)(':id/issues'),
    (0, permissions_decorator_1.RequirePermissions)('project.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectExpansionController.prototype, "createIssue", null);
__decorate([
    (0, common_1.Get)(':id/change-orders'),
    (0, permissions_decorator_1.RequirePermissions)('project.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectExpansionController.prototype, "getChangeOrders", null);
__decorate([
    (0, common_1.Post)(':id/change-orders'),
    (0, permissions_decorator_1.RequirePermissions)('project.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectExpansionController.prototype, "createCO", null);
__decorate([
    (0, common_1.Get)(':id/health-stats'),
    (0, permissions_decorator_1.RequirePermissions)('project.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectExpansionController.prototype, "getHealthStats", null);
exports.ProjectExpansionController = ProjectExpansionController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project/expansion'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectExpansionController);
//# sourceMappingURL=expansion.controller.js.map