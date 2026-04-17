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
exports.PurchaseRequisitionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_purchase_requisition_dto_1 = require("./dto/create-purchase-requisition.dto");
const update_purchase_requisition_dto_1 = require("./dto/update-purchase-requisition.dto");
const procurementStatusSet = new Set([
    'DRAFT',
    'SUBMITTED',
    'PENDING_APPROVAL',
    'APPROVED',
    'REJECTED',
    'CLOSED',
    'VOID',
]);
const isProcurementDocStatus = (value) => Boolean(value) && procurementStatusSet.has(value);
let PurchaseRequisitionsController = class PurchaseRequisitionsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const requisitions = await this.prisma.purchaseRequisition.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isProcurementDocStatus(status) ? { status } : {}),
                ...(q
                    ? {
                        OR: [{ code: { contains: q, mode: 'insensitive' } }],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { items: { orderBy: [{ lineNo: 'asc' }] } },
            take: 200,
        });
        return { requisitions };
    }
    async get(req, id) {
        const requisition = await this.prisma.purchaseRequisition.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                items: { orderBy: [{ lineNo: 'asc' }] },
                workflowDef: { include: { steps: { orderBy: [{ stepNo: 'asc' }] } } },
            },
        });
        if (!requisition)
            throw new common_1.NotFoundException('Purchase requisition not found');
        return { requisition };
    }
    async create(req, body) {
        const requisition = await this.prisma.$transaction(async (tx) => {
            const pr = await tx.purchaseRequisition.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    requestDate: new Date(body.requestDate),
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.purchaseRequisitionItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        requisitionId: pr.id,
                        lineNo: idx + 1,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        requiredDate: it.requiredDate
                            ? new Date(it.requiredDate)
                            : undefined,
                    })),
                });
            }
            return pr;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'PurchaseRequisition',
            entityId: requisition.id,
        });
        return { requisition };
    }
    async update(req, id, body) {
        const exists = await this.prisma.purchaseRequisition.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Purchase requisition not found');
        const requisition = await this.prisma.$transaction(async (tx) => {
            const pr = await tx.purchaseRequisition.update({
                where: { id },
                data: {
                    requestDate: body.requestDate
                        ? new Date(body.requestDate)
                        : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.purchaseRequisitionItem.deleteMany({
                    where: { tenantId: req.user.tenantId, requisitionId: id },
                });
                if (body.items.length > 0) {
                    await tx.purchaseRequisitionItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            requisitionId: id,
                            lineNo: idx + 1,
                            description: it.description,
                            qty: it.qty,
                            uomCode: it.uomCode,
                            requiredDate: it.requiredDate
                                ? new Date(it.requiredDate)
                                : undefined,
                        })),
                    });
                }
            }
            return pr;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'PurchaseRequisition',
            entityId: requisition.id,
        });
        return { requisition };
    }
    async submit(req, id) {
        const pr = await this.prisma.purchaseRequisition.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!pr)
            throw new common_1.NotFoundException('Purchase requisition not found');
        const workflow = await this.prisma.workflowDefinition.findFirst({
            where: {
                tenantId: req.user.tenantId,
                moduleKey: 'procurement',
                docType: 'PURCHASE_REQUISITION',
                isActive: true,
            },
            select: { id: true },
        });
        const hasSteps = workflow
            ? (await this.prisma.workflowStep.count({
                where: { tenantId: req.user.tenantId, definitionId: workflow.id },
            })) > 0
            : false;
        const requisition = await this.prisma.purchaseRequisition.update({
            where: { id },
            data: {
                status: hasSteps ? 'PENDING_APPROVAL' : 'SUBMITTED',
                workflowDefinitionId: hasSteps ? workflow?.id : null,
                currentStepNo: hasSteps ? 1 : null,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'submit',
            entity: 'PurchaseRequisition',
            entityId: requisition.id,
            metadata: {
                workflowDefinitionId: requisition.workflowDefinitionId,
                currentStepNo: requisition.currentStepNo,
            },
        });
        return { requisition };
    }
    async approve(req, id) {
        const pr = await this.prisma.purchaseRequisition.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: {
                id: true,
                status: true,
                workflowDefinitionId: true,
                currentStepNo: true,
            },
        });
        if (!pr)
            throw new common_1.NotFoundException('Purchase requisition not found');
        if (pr.status !== 'PENDING_APPROVAL')
            throw new common_1.ForbiddenException('Requisition is not pending approval');
        if (pr.workflowDefinitionId && pr.currentStepNo) {
            const step = await this.prisma.workflowStep.findFirst({
                where: {
                    tenantId: req.user.tenantId,
                    definitionId: pr.workflowDefinitionId,
                    stepNo: pr.currentStepNo,
                },
                select: { roleId: true, stepNo: true },
            });
            if (!step)
                throw new common_1.NotFoundException('Workflow step not found');
            const roles = await this.prisma.userRole.findMany({
                where: { userId: req.user.id },
                select: { roleId: true },
            });
            const roleIds = new Set(roles.map((r) => r.roleId));
            if (!roleIds.has(step.roleId))
                throw new common_1.ForbiddenException('Not allowed for this approval step');
            const maxStep = await this.prisma.workflowStep.aggregate({
                where: {
                    tenantId: req.user.tenantId,
                    definitionId: pr.workflowDefinitionId,
                },
                _max: { stepNo: true },
            });
            const nextStepNo = (step.stepNo ?? 0) + 1;
            const isFinal = nextStepNo > (maxStep._max.stepNo ?? 0);
            const requisition = await this.prisma.purchaseRequisition.update({
                where: { id },
                data: {
                    status: isFinal ? 'APPROVED' : 'PENDING_APPROVAL',
                    currentStepNo: isFinal ? null : nextStepNo,
                },
            });
            await this.audit.log({
                tenantId: req.user.tenantId,
                actorUserId: req.user.id,
                action: 'approve',
                entity: 'PurchaseRequisition',
                entityId: requisition.id,
                metadata: {
                    approvedStepNo: step.stepNo,
                    nextStepNo: requisition.currentStepNo,
                },
            });
            return { requisition };
        }
        const requisition = await this.prisma.purchaseRequisition.update({
            where: { id },
            data: {
                status: 'APPROVED',
                currentStepNo: null,
                workflowDefinitionId: null,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'approve',
            entity: 'PurchaseRequisition',
            entityId: requisition.id,
        });
        return { requisition };
    }
    async reject(req, id) {
        const pr = await this.prisma.purchaseRequisition.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!pr)
            throw new common_1.NotFoundException('Purchase requisition not found');
        if (pr.status !== 'PENDING_APPROVAL')
            throw new common_1.ForbiddenException('Requisition is not pending approval');
        const requisition = await this.prisma.purchaseRequisition.update({
            where: { id },
            data: { status: 'REJECTED', currentStepNo: null },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'reject',
            entity: 'PurchaseRequisition',
            entityId: requisition.id,
        });
        return { requisition };
    }
};
exports.PurchaseRequisitionsController = PurchaseRequisitionsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.requisition.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PurchaseRequisitionsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.requisition.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseRequisitionsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.requisition.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_purchase_requisition_dto_1.CreatePurchaseRequisitionDto]),
    __metadata("design:returntype", Promise)
], PurchaseRequisitionsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.requisition.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_purchase_requisition_dto_1.UpdatePurchaseRequisitionDto]),
    __metadata("design:returntype", Promise)
], PurchaseRequisitionsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.requisition.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseRequisitionsController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.requisition.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseRequisitionsController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.requisition.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseRequisitionsController.prototype, "reject", null);
exports.PurchaseRequisitionsController = PurchaseRequisitionsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/requisitions'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PurchaseRequisitionsController);
//# sourceMappingURL=purchase-requisitions.controller.js.map