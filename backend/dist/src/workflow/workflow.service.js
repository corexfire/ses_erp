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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../../prisma/generated/client");
let WorkflowService = class WorkflowService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDefinitions(tenantId, moduleKey, docType) {
        const where = { tenantId };
        if (moduleKey)
            where.moduleKey = moduleKey;
        if (docType)
            where.docType = docType;
        return this.prisma.workflowDefinition.findMany({
            where,
            include: { steps: { orderBy: { stepNo: 'asc' } } },
            orderBy: { name: 'asc' },
        });
    }
    async getDefinitionById(tenantId, id) {
        return this.prisma.workflowDefinition.findFirst({
            where: { id, tenantId },
            include: { steps: { orderBy: { stepNo: 'asc' }, include: { rules: true } } },
        });
    }
    async createDefinition(tenantId, data) {
        const { steps, ...defData } = data;
        return this.prisma.workflowDefinition.create({
            data: {
                tenantId,
                ...defData,
                steps: {
                    create: steps.map((step, idx) => ({
                        tenantId,
                        stepNo: idx + 1,
                        roleId: step.roleId,
                        name: step.name,
                        slaHours: step.slaHours ?? 24,
                        rules: step.conditions ? { create: step.conditions.map(c => ({ tenantId, ruleType: c.ruleType, ruleKey: c.ruleKey, ruleOperator: c.ruleOperator, ruleValue: c.ruleValue })) } : undefined,
                    })),
                },
            },
            include: { steps: true },
        });
    }
    async updateDefinition(tenantId, id, data) {
        const def = await this.prisma.workflowDefinition.findFirst({ where: { id, tenantId } });
        if (!def)
            throw new common_1.NotFoundException('Workflow definition not found');
        if (data.steps) {
            await this.prisma.workflowStep.deleteMany({ where: { definitionId: id } });
            await this.prisma.workflowDefinition.update({
                where: { id },
                data: {
                    name: data.name,
                    isActive: data.isActive,
                    steps: { create: data.steps.map((step, idx) => ({ tenantId, stepNo: idx + 1, roleId: step.roleId, name: step.name, slaHours: step.slaHours ?? 24, rules: step.conditions ? { create: step.conditions.map(c => ({ tenantId, ruleType: c.ruleType, ruleKey: c.ruleKey, ruleOperator: c.ruleOperator, ruleValue: c.ruleValue })) } : undefined })) },
                },
            });
        }
        else {
            await this.prisma.workflowDefinition.update({ where: { id }, data: { name: data.name, isActive: data.isActive } });
        }
        return this.getDefinitionById(tenantId, id);
    }
    async deleteDefinition(tenantId, id) {
        const def = await this.prisma.workflowDefinition.findFirst({ where: { id, tenantId } });
        if (!def)
            throw new common_1.NotFoundException('Workflow definition not found');
        await this.prisma.workflowDefinition.delete({ where: { id } });
    }
    async triggerWorkflow(tenantId, docType, docId, definitionId) {
        let workflowDef;
        if (definitionId) {
            workflowDef = await this.prisma.workflowDefinition.findFirst({ where: { id: definitionId, tenantId, isActive: true }, include: { steps: { orderBy: { stepNo: 'asc' } } } });
        }
        else {
            workflowDef = await this.prisma.workflowDefinition.findFirst({ where: { tenantId, docType, isActive: true }, include: { steps: { orderBy: { stepNo: 'asc' } } } });
        }
        if (!workflowDef || workflowDef.steps.length === 0)
            throw new common_1.NotFoundException('No active workflow definition found');
        const firstStep = workflowDef.steps[0];
        const slaDueAt = new Date();
        slaDueAt.setHours(slaDueAt.getHours() + firstStep.slaHours);
        const instance = await this.prisma.workflowInstance.create({
            data: { tenantId, definitionId: workflowDef.id, stepId: firstStep.id, docType, docId, currentStepNo: 1, status: client_1.WorkflowInstanceStatus.PENDING, slaDueAt },
        });
        const approver = await this.prisma.userRole.findFirst({ where: { roleId: firstStep.roleId }, include: { user: true } });
        if (approver) {
            await this.prisma.workflowInstance.update({ where: { id: instance.id }, data: { assignedToUserId: approver.userId } });
        }
        return this.getInstanceById(tenantId, instance.id);
    }
    async getInstances(tenantId, filters) {
        const where = { tenantId };
        if (filters.docType)
            where.docType = filters.docType;
        if (filters.docId)
            where.docId = filters.docId;
        if (filters.status)
            where.status = filters.status;
        if (filters.assignedToUserId)
            where.assignedToUserId = filters.assignedToUserId;
        return this.prisma.workflowInstance.findMany({ where, include: { definition: true, step: { include: { role: true } } }, orderBy: { createdAt: 'desc' } });
    }
    async getMyInbox(tenantId, userId) {
        const now = new Date();
        const delegations = await this.prisma.delegation.findMany({ where: { tenantId, fromUserId: userId, isActive: true, startDate: { lte: now }, endDate: { gte: now } } });
        const delegatedToIds = delegations.map(d => d.toUserId);
        const includeUserIds = [userId, ...delegatedToIds];
        return this.prisma.workflowInstance.findMany({ where: { tenantId, assignedToUserId: { in: includeUserIds }, status: client_1.WorkflowInstanceStatus.PENDING }, include: { definition: true, step: { include: { role: true } } }, orderBy: { slaDueAt: 'asc' } });
    }
    async getInstanceById(tenantId, id) {
        return this.prisma.workflowInstance.findFirst({
            where: { id, tenantId },
            include: { definition: { include: { steps: true } }, step: { include: { role: true, rules: true } }, history: { include: { user: true }, orderBy: { createdAt: 'desc' } } },
        });
    }
    async approve(tenantId, userId, instanceId, comment) {
        const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId }, include: { definition: { include: { steps: true } }, step: true } });
        if (!instance)
            throw new common_1.NotFoundException('Workflow instance not found');
        if (instance.status !== client_1.WorkflowInstanceStatus.PENDING)
            throw new common_1.BadRequestException('Workflow is not pending');
        await this.prisma.approvalHistory.create({ data: { tenantId, instanceId, userId, action: 'APPROVE', comment } });
        const nextStepNo = instance.currentStepNo + 1;
        const nextStep = instance.definition.steps.find(s => s.stepNo === nextStepNo);
        if (nextStep) {
            const slaDueAt = new Date();
            slaDueAt.setHours(slaDueAt.getHours() + nextStep.slaHours);
            const approver = await this.prisma.userRole.findFirst({ where: { roleId: nextStep.roleId }, include: { user: true } });
            await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { stepId: nextStep.id, currentStepNo: nextStepNo, slaDueAt, assignedToUserId: approver?.userId } });
        }
        else {
            await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { status: client_1.WorkflowInstanceStatus.APPROVED } });
            await this.updateDocumentStatus(tenantId, instance.docType, instance.docId, 'APPROVED');
        }
        return this.getInstanceById(tenantId, instanceId);
    }
    async reject(tenantId, userId, instanceId, comment) {
        const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId } });
        if (!instance)
            throw new common_1.NotFoundException('Workflow instance not found');
        if (instance.status !== client_1.WorkflowInstanceStatus.PENDING)
            throw new common_1.BadRequestException('Workflow is not pending');
        await this.prisma.approvalHistory.create({ data: { tenantId, instanceId, userId, action: 'REJECT', comment } });
        await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { status: client_1.WorkflowInstanceStatus.REJECTED } });
        await this.updateDocumentStatus(tenantId, instance.docType, instance.docId, 'REJECTED');
        return this.getInstanceById(tenantId, instanceId);
    }
    async delegate(tenantId, userId, instanceId, toUserId, comment) {
        const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId } });
        if (!instance)
            throw new common_1.NotFoundException('Workflow instance not found');
        if (instance.status !== client_1.WorkflowInstanceStatus.PENDING)
            throw new common_1.BadRequestException('Workflow is not pending');
        await this.prisma.approvalHistory.create({ data: { tenantId, instanceId, userId, action: 'DELEGATE', comment, fromUserId: userId, toUserId } });
        await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { assignedToUserId: toUserId } });
        return this.getInstanceById(tenantId, instanceId);
    }
    async escalate(tenantId, instanceId) {
        const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId }, include: { step: true } });
        if (!instance)
            throw new common_1.NotFoundException('Workflow instance not found');
        if (instance.status !== client_1.WorkflowInstanceStatus.PENDING)
            throw new common_1.BadRequestException('Workflow is not pending');
        const nextStepNo = instance.currentStepNo + 1;
        const steps = await this.prisma.workflowStep.findMany({ where: { definitionId: instance.definitionId }, orderBy: { stepNo: 'asc' } });
        const nextStep = steps.find(s => s.stepNo === nextStepNo);
        if (nextStep) {
            const slaDueAt = new Date();
            slaDueAt.setHours(slaDueAt.getHours() + nextStep.slaHours);
            const approver = await this.prisma.userRole.findFirst({ where: { roleId: nextStep.roleId }, include: { user: true } });
            await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { stepId: nextStep.id, currentStepNo: nextStepNo, status: client_1.WorkflowInstanceStatus.ESCALATED, escalatedAt: new Date(), slaDueAt, assignedToUserId: approver?.userId } });
        }
        else {
            await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { status: 'APPROVED' } });
            await this.updateDocumentStatus(tenantId, instance.docType, instance.docId, 'APPROVED');
        }
        return this.getInstanceById(tenantId, instanceId);
    }
    async getDelegations(tenantId, userId) {
        return this.prisma.delegation.findMany({ where: { tenantId, fromUserId: userId }, include: { toUser: true }, orderBy: { startDate: 'desc' } });
    }
    async createDelegation(tenantId, fromUserId, data) {
        return this.prisma.delegation.create({ data: { tenantId, fromUserId, ...data }, include: { toUser: true } });
    }
    async updateDelegation(tenantId, id, fromUserId, data) {
        const delegation = await this.prisma.delegation.findFirst({ where: { id, fromUserId, tenantId } });
        if (!delegation)
            throw new common_1.NotFoundException('Delegation not found');
        return this.prisma.delegation.update({ where: { id }, data, include: { toUser: true } });
    }
    async deleteDelegation(tenantId, id, fromUserId) {
        const delegation = await this.prisma.delegation.findFirst({ where: { id, fromUserId, tenantId } });
        if (!delegation)
            throw new common_1.NotFoundException('Delegation not found');
        await this.prisma.delegation.delete({ where: { id } });
    }
    async getApprovalHistory(tenantId, docType, docId) {
        const instance = await this.prisma.workflowInstance.findFirst({ where: { tenantId, docType, docId } });
        if (!instance)
            return [];
        return this.prisma.approvalHistory.findMany({ where: { instanceId: instance.id }, include: { user: true }, orderBy: { createdAt: 'desc' } });
    }
    async getOverdueInstances(tenantId) {
        const now = new Date();
        return this.prisma.workflowInstance.findMany({ where: { tenantId, status: client_1.WorkflowInstanceStatus.PENDING, slaDueAt: { lt: now } }, include: { definition: true, step: { include: { role: true } } }, orderBy: { slaDueAt: 'asc' } });
    }
    async updateDocumentStatus(tenantId, docType, docId, status) {
        const statusMap = { APPROVED: 'APPROVED', REJECTED: 'REJECTED' };
        const newStatus = statusMap[status];
        if (!newStatus)
            return;
        switch (docType) {
            case 'SALES_ORDER':
                await this.prisma.salesOrder.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus } });
                break;
            case 'PURCHASE_ORDER':
                await this.prisma.purchaseOrder.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus } });
                break;
            case 'PURCHASE_REQUISITION':
                await this.prisma.purchaseRequisition.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus } });
                break;
            case 'STOCK_COUNT':
                await this.prisma.stockCount.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus } });
                break;
            case 'QUALITY_DOC':
                const docStatus = status === 'APPROVED' ? 'PUBLISHED' : 'DRAFT';
                await this.prisma.qualityDocument.updateMany({ where: { id: docId, tenantId }, data: { status: docStatus } });
                break;
        }
    }
};
exports.WorkflowService = WorkflowService;
exports.WorkflowService = WorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowService);
//# sourceMappingURL=workflow.service.js.map