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
exports.WorkflowsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const add_workflow_step_dto_1 = require("./dto/add-workflow-step.dto");
const create_workflow_definition_dto_1 = require("./dto/create-workflow-definition.dto");
let WorkflowsController = class WorkflowsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req) {
        const workflows = await this.prisma.workflowDefinition.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ createdAt: 'desc' }],
            include: {
                steps: { include: { role: true }, orderBy: [{ stepNo: 'asc' }] },
            },
        });
        return { workflows };
    }
    async create(req, body) {
        const workflow = await this.prisma.workflowDefinition.create({
            data: {
                tenantId: req.user.tenantId,
                name: body.name,
                moduleKey: body.moduleKey,
                docType: body.docType,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'WorkflowDefinition',
            entityId: workflow.id,
        });
        return { workflow };
    }
    async addStep(req, workflowId, body) {
        const workflow = await this.prisma.workflowDefinition.findFirst({
            where: { id: workflowId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!workflow)
            return { ok: false };
        const maxStep = await this.prisma.workflowStep.aggregate({
            where: { tenantId: req.user.tenantId, definitionId: workflowId },
            _max: { stepNo: true },
        });
        const stepNo = (maxStep._max.stepNo ?? 0) + 1;
        const step = await this.prisma.workflowStep.create({
            data: {
                tenantId: req.user.tenantId,
                definitionId: workflowId,
                stepNo,
                roleId: body.roleId,
                name: body.name,
            },
            include: { role: true },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'add_step',
            entity: 'WorkflowStep',
            entityId: step.id,
            metadata: { workflowId, stepNo },
        });
        return { step };
    }
    async deactivate(req, id) {
        const workflow = await this.prisma.workflowDefinition.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'WorkflowDefinition',
            entityId: workflow.id,
        });
        return { workflow };
    }
};
exports.WorkflowsController = WorkflowsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.workflow.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('core.workflow.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_workflow_definition_dto_1.CreateWorkflowDefinitionDto]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/steps'),
    (0, permissions_decorator_1.RequirePermissions)('core.workflow.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, add_workflow_step_dto_1.AddWorkflowStepDto]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "addStep", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('core.workflow.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkflowsController.prototype, "deactivate", null);
exports.WorkflowsController = WorkflowsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/workflows'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], WorkflowsController);
//# sourceMappingURL=workflows.controller.js.map