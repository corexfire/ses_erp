import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkflowInstanceStatus } from '../../prisma/generated/client';

@Injectable()
export class WorkflowService {
  constructor(private prisma: PrismaService) {}

  async getDefinitions(tenantId: string, moduleKey?: string, docType?: string) {
    const where: any = { tenantId };
    if (moduleKey) where.moduleKey = moduleKey;
    if (docType) where.docType = docType;
    
    return this.prisma.workflowDefinition.findMany({
      where,
      include: { steps: { orderBy: { stepNo: 'asc' } } },
      orderBy: { name: 'asc' },
    });
  }

  async getDefinitionById(tenantId: string, id: string) {
    return this.prisma.workflowDefinition.findFirst({
      where: { id, tenantId },
      include: { steps: { orderBy: { stepNo: 'asc' }, include: { rules: true } } },
    });
  }

  async createDefinition(tenantId: string, data: {
    name: string;
    moduleKey: string;
    docType: string;
    steps: { roleId: string; name?: string; slaHours?: number; conditions?: { ruleType: string; ruleKey: string; ruleOperator: string; ruleValue: string }[] }[];
  }) {
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

  async updateDefinition(tenantId: string, id: string, data: {
    name?: string;
    isActive?: boolean;
    steps?: { roleId: string; name?: string; slaHours?: number; conditions?: { ruleType: string; ruleKey: string; ruleOperator: string; ruleValue: string }[] }[];
  }) {
    const def = await this.prisma.workflowDefinition.findFirst({ where: { id, tenantId } });
    if (!def) throw new NotFoundException('Workflow definition not found');

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
    } else {
      await this.prisma.workflowDefinition.update({ where: { id }, data: { name: data.name, isActive: data.isActive } });
    }
    return this.getDefinitionById(tenantId, id);
  }

  async deleteDefinition(tenantId: string, id: string) {
    const def = await this.prisma.workflowDefinition.findFirst({ where: { id, tenantId } });
    if (!def) throw new NotFoundException('Workflow definition not found');
    await this.prisma.workflowDefinition.delete({ where: { id } });
  }

  async triggerWorkflow(tenantId: string, docType: string, docId: string, definitionId?: string) {
    let workflowDef;
    if (definitionId) {
      workflowDef = await this.prisma.workflowDefinition.findFirst({ where: { id: definitionId, tenantId, isActive: true }, include: { steps: { orderBy: { stepNo: 'asc' } } } });
    } else {
      workflowDef = await this.prisma.workflowDefinition.findFirst({ where: { tenantId, docType, isActive: true }, include: { steps: { orderBy: { stepNo: 'asc' } } } });
    }

    if (!workflowDef || workflowDef.steps.length === 0) throw new NotFoundException('No active workflow definition found');

    const firstStep = workflowDef.steps[0];
    const slaDueAt = new Date();
    slaDueAt.setHours(slaDueAt.getHours() + firstStep.slaHours);

    const instance = await this.prisma.workflowInstance.create({
      data: { tenantId, definitionId: workflowDef.id, stepId: firstStep.id, docType, docId, currentStepNo: 1, status: WorkflowInstanceStatus.PENDING, slaDueAt },
    });

    const approver = await this.prisma.userRole.findFirst({ where: { roleId: firstStep.roleId }, include: { user: true } });
    if (approver) {
      await this.prisma.workflowInstance.update({ where: { id: instance.id }, data: { assignedToUserId: approver.userId } });
    }
    return this.getInstanceById(tenantId, instance.id);
  }

  async getInstances(tenantId: string, filters: { docType?: string; docId?: string; status?: string; assignedToUserId?: string }) {
    const where: any = { tenantId };
    if (filters.docType) where.docType = filters.docType;
    if (filters.docId) where.docId = filters.docId;
    if (filters.status) where.status = filters.status;
    if (filters.assignedToUserId) where.assignedToUserId = filters.assignedToUserId;
    return this.prisma.workflowInstance.findMany({ where, include: { definition: true, step: { include: { role: true } } }, orderBy: { createdAt: 'desc' } });
  }

  async getMyInbox(tenantId: string, userId: string) {
    const now = new Date();
    const delegations = await this.prisma.delegation.findMany({ where: { tenantId, fromUserId: userId, isActive: true, startDate: { lte: now }, endDate: { gte: now } } });
    const delegatedToIds = delegations.map(d => d.toUserId);
    const includeUserIds = [userId, ...delegatedToIds];
    return this.prisma.workflowInstance.findMany({ where: { tenantId, assignedToUserId: { in: includeUserIds }, status: WorkflowInstanceStatus.PENDING }, include: { definition: true, step: { include: { role: true } } }, orderBy: { slaDueAt: 'asc' } });
  }

  async getInstanceById(tenantId: string, id: string) {
    return this.prisma.workflowInstance.findFirst({
      where: { id, tenantId },
      include: { definition: { include: { steps: true } }, step: { include: { role: true, rules: true } }, history: { include: { user: true }, orderBy: { createdAt: 'desc' } } },
    });
  }

  async approve(tenantId: string, userId: string, instanceId: string, comment?: string) {
    const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId }, include: { definition: { include: { steps: true } }, step: true } });
    if (!instance) throw new NotFoundException('Workflow instance not found');
    if (instance.status !== WorkflowInstanceStatus.PENDING) throw new BadRequestException('Workflow is not pending');

    await this.prisma.approvalHistory.create({ data: { tenantId, instanceId, userId, action: 'APPROVE', comment } });

    const nextStepNo = instance.currentStepNo + 1;
    const nextStep = instance.definition.steps.find(s => s.stepNo === nextStepNo);

    if (nextStep) {
      const slaDueAt = new Date();
      slaDueAt.setHours(slaDueAt.getHours() + nextStep.slaHours);
      const approver = await this.prisma.userRole.findFirst({ where: { roleId: nextStep.roleId }, include: { user: true } });
      await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { stepId: nextStep.id, currentStepNo: nextStepNo, slaDueAt, assignedToUserId: approver?.userId } });
    } else {
      await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { status: WorkflowInstanceStatus.APPROVED } });
      await this.updateDocumentStatus(tenantId, instance.docType, instance.docId, 'APPROVED');
    }
    return this.getInstanceById(tenantId, instanceId);
  }

  async reject(tenantId: string, userId: string, instanceId: string, comment?: string) {
    const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId } });
    if (!instance) throw new NotFoundException('Workflow instance not found');
    if (instance.status !== WorkflowInstanceStatus.PENDING) throw new BadRequestException('Workflow is not pending');

    await this.prisma.approvalHistory.create({ data: { tenantId, instanceId, userId, action: 'REJECT', comment } });
    await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { status: WorkflowInstanceStatus.REJECTED } });
    await this.updateDocumentStatus(tenantId, instance.docType, instance.docId, 'REJECTED');
    return this.getInstanceById(tenantId, instanceId);
  }

  async delegate(tenantId: string, userId: string, instanceId: string, toUserId: string, comment?: string) {
    const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId } });
    if (!instance) throw new NotFoundException('Workflow instance not found');
    if (instance.status !== WorkflowInstanceStatus.PENDING) throw new BadRequestException('Workflow is not pending');

    await this.prisma.approvalHistory.create({ data: { tenantId, instanceId, userId, action: 'DELEGATE', comment, fromUserId: userId, toUserId } });
    await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { assignedToUserId: toUserId } });
    return this.getInstanceById(tenantId, instanceId);
  }

  async escalate(tenantId: string, instanceId: string) {
    const instance = await this.prisma.workflowInstance.findFirst({ where: { id: instanceId, tenantId }, include: { step: true } });
    if (!instance) throw new NotFoundException('Workflow instance not found');
    if (instance.status !== WorkflowInstanceStatus.PENDING) throw new BadRequestException('Workflow is not pending');

    const nextStepNo = instance.currentStepNo + 1;
    const steps = await this.prisma.workflowStep.findMany({ where: { definitionId: instance.definitionId }, orderBy: { stepNo: 'asc' } });
    const nextStep = steps.find(s => s.stepNo === nextStepNo);

    if (nextStep) {
      const slaDueAt = new Date();
      slaDueAt.setHours(slaDueAt.getHours() + nextStep.slaHours);
      const approver = await this.prisma.userRole.findFirst({ where: { roleId: nextStep.roleId }, include: { user: true } });
      await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { stepId: nextStep.id, currentStepNo: nextStepNo, status: WorkflowInstanceStatus.ESCALATED, escalatedAt: new Date(), slaDueAt, assignedToUserId: approver?.userId } });
    } else {
      await this.prisma.workflowInstance.update({ where: { id: instanceId }, data: { status: 'APPROVED' } });
      await this.updateDocumentStatus(tenantId, instance.docType, instance.docId, 'APPROVED');
    }
    return this.getInstanceById(tenantId, instanceId);
  }

  async getDelegations(tenantId: string, userId: string) {
    return this.prisma.delegation.findMany({ where: { tenantId, fromUserId: userId }, include: { toUser: true }, orderBy: { startDate: 'desc' } });
  }

  async createDelegation(tenantId: string, fromUserId: string, data: { toUserId: string; startDate: Date; endDate: Date; notes?: string }) {
    return this.prisma.delegation.create({ data: { tenantId, fromUserId, ...data }, include: { toUser: true } });
  }

  async updateDelegation(tenantId: string, id: string, fromUserId: string, data: { toUserId?: string; startDate?: Date; endDate?: Date; isActive?: boolean; notes?: string }) {
    const delegation = await this.prisma.delegation.findFirst({ where: { id, fromUserId, tenantId } });
    if (!delegation) throw new NotFoundException('Delegation not found');
    return this.prisma.delegation.update({ where: { id }, data, include: { toUser: true } });
  }

  async deleteDelegation(tenantId: string, id: string, fromUserId: string) {
    const delegation = await this.prisma.delegation.findFirst({ where: { id, fromUserId, tenantId } });
    if (!delegation) throw new NotFoundException('Delegation not found');
    await this.prisma.delegation.delete({ where: { id } });
  }

  async getApprovalHistory(tenantId: string, docType: string, docId: string) {
    const instance = await this.prisma.workflowInstance.findFirst({ where: { tenantId, docType, docId } });
    if (!instance) return [];
    return this.prisma.approvalHistory.findMany({ where: { instanceId: instance.id }, include: { user: true }, orderBy: { createdAt: 'desc' } });
  }

  async getOverdueInstances(tenantId: string) {
    const now = new Date();
    return this.prisma.workflowInstance.findMany({ where: { tenantId, status: WorkflowInstanceStatus.PENDING, slaDueAt: { lt: now } }, include: { definition: true, step: { include: { role: true } } }, orderBy: { slaDueAt: 'asc' } });
  }

  private async updateDocumentStatus(tenantId: string, docType: string, docId: string, status: string) {
    const statusMap: Record<string, string> = { APPROVED: 'APPROVED', REJECTED: 'REJECTED' };
    const newStatus = statusMap[status];
    if (!newStatus) return;

    switch (docType) {
      case 'SALES_ORDER':
        await this.prisma.salesOrder.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus as any } });
        break;
      case 'PURCHASE_ORDER':
        await this.prisma.purchaseOrder.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus as any } });
        break;
      case 'PURCHASE_REQUISITION':
        await this.prisma.purchaseRequisition.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus as any } });
        break;
      case 'STOCK_COUNT':
        await this.prisma.stockCount.updateMany({ where: { id: docId, tenantId }, data: { status: newStatus as any } });
        break;
      case 'QUALITY_DOC':
        const docStatus = status === 'APPROVED' ? 'PUBLISHED' : 'DRAFT';
        await this.prisma.qualityDocument.updateMany({ where: { id: docId, tenantId }, data: { status: docStatus as any } });
        break;
    }
  }
}
