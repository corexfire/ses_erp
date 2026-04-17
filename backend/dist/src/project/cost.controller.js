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
exports.CostController = exports.CreateCommitmentDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateCommitmentDto {
    projectId;
    wbsTaskId;
    commitmentType;
    referenceId;
    description;
    amount;
}
exports.CreateCommitmentDto = CreateCommitmentDto;
let CostController = class CostController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listCosts(req, projectId) {
        const where = { tenantId: req.user.tenantId };
        if (projectId)
            where.projectId = projectId;
        const tasks = await this.prisma.wbsTask.findMany({
            where,
            include: {
                project: true,
                commitments: { where: { status: 'ACTIVE' } }
            },
            orderBy: [{ project: { name: 'asc' } }, { taskCode: 'asc' }],
        });
        return {
            data: tasks.map((task) => {
                const budget = Number(task.plannedCost || 0);
                const actual = Number(task.actualCost || 0);
                const commitment = task.commitments.reduce((sum, c) => sum + Number(c.amount), 0);
                const totalCost = actual + commitment;
                let status = 'ON_BUDGET';
                if (budget > 0) {
                    if (totalCost > budget)
                        status = 'OVER_BUDGET';
                    else if (totalCost > budget * 0.9)
                        status = 'AT_RISK';
                }
                return {
                    id: task.id,
                    project: task.project,
                    wbsTask: { id: task.id, taskName: task.taskName, taskCode: task.taskCode },
                    budget,
                    actual,
                    commitment,
                    status,
                    variance: budget - totalCost,
                    percentUsed: budget > 0 ? (totalCost / budget) * 100 : 0
                };
            }),
        };
    }
    async getCostSummary(projectId, req) {
        const project = await this.prisma.project.findFirst({
            where: { id: projectId, tenantId: req.user.tenantId },
            include: {
                wbsTasks: {
                    include: { commitments: { where: { status: 'ACTIVE' } } }
                }
            },
        });
        if (!project)
            throw new Error('Project not found');
        let totalBudget = 0;
        let totalActual = 0;
        let totalCommitted = 0;
        const byType = {};
        project.wbsTasks.forEach(task => {
            totalBudget += Number(task.plannedCost || 0);
            totalActual += Number(task.actualCost || 0);
            task.commitments.forEach(c => {
                const amt = Number(c.amount);
                totalCommitted += amt;
                byType[c.commitmentType] = (byType[c.commitmentType] || 0) + amt;
            });
        });
        const totalCost = totalActual + totalCommitted;
        return {
            project,
            summary: {
                totalBudget,
                totalCommitted,
                totalActual,
                totalCost,
                variance: totalBudget - totalCost,
                percentUsed: totalBudget > 0 ? (totalCost / totalBudget) * 100 : 0,
                byType,
            },
        };
    }
    async getCostDetail(projectId, req) {
        const commitments = await this.prisma.projectCommitment.findMany({
            where: { projectId, tenantId: req.user.tenantId },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { data: commitments };
    }
    async listCommitments(req, projectId) {
        const where = { tenantId: req.user.tenantId };
        if (projectId)
            where.projectId = projectId;
        const commitments = await this.prisma.projectCommitment.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { data: commitments };
    }
    async createCommitment(req, body) {
        const commitment = await this.prisma.projectCommitment.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                wbsTaskId: body.wbsTaskId,
                commitmentType: body.commitmentType,
                referenceId: body.referenceId,
                description: body.description,
                amount: body.amount,
                status: 'ACTIVE',
            },
        });
        return commitment;
    }
    async getVariance(projectId, req) {
        const project = await this.prisma.project.findFirst({
            where: { id: projectId, tenantId: req.user.tenantId },
            include: { budgets: { include: { wbsTask: true } } },
        });
        const commitments = await this.prisma.projectCommitment.findMany({
            where: { projectId },
            select: { amount: true, commitmentType: true },
        });
        const totalBudget = Number(project?.totalBudget || 0);
        const totalCommitted = commitments.reduce((sum, c) => sum + Number(c.amount), 0);
        const budgetByTask = project?.budgets.map(b => ({
            taskCode: b.wbsTask?.taskCode,
            allocated: Number(b.allocatedBudget),
            committed: b.committedAmount ? Number(b.committedAmount) : 0,
        })) || [];
        return {
            projectId,
            totalBudget,
            totalCommitted,
            available: totalBudget - totalCommitted,
            percentUsed: totalBudget > 0 ? (totalCommitted / totalBudget) * 100 : 0,
            budgetByTask,
        };
    }
};
exports.CostController = CostController;
__decorate([
    (0, common_1.Get)('costs'),
    (0, permissions_decorator_1.RequirePermissions)('project.cost.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostController.prototype, "listCosts", null);
__decorate([
    (0, common_1.Get)('cost/:projectId'),
    (0, permissions_decorator_1.RequirePermissions)('project.cost.read'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CostController.prototype, "getCostSummary", null);
__decorate([
    (0, common_1.Get)('cost/:projectId/detail'),
    (0, permissions_decorator_1.RequirePermissions)('project.cost.read'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CostController.prototype, "getCostDetail", null);
__decorate([
    (0, common_1.Get)('commitments'),
    (0, permissions_decorator_1.RequirePermissions)('project.cost.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostController.prototype, "listCommitments", null);
__decorate([
    (0, common_1.Post)('commitments'),
    (0, permissions_decorator_1.RequirePermissions)('project.cost.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateCommitmentDto]),
    __metadata("design:returntype", Promise)
], CostController.prototype, "createCommitment", null);
__decorate([
    (0, common_1.Get)('variance/:projectId'),
    (0, permissions_decorator_1.RequirePermissions)('project.cost.read'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CostController.prototype, "getVariance", null);
exports.CostController = CostController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CostController);
//# sourceMappingURL=cost.controller.js.map