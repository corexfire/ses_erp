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
exports.PurchaseOrdersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_purchase_order_dto_1 = require("./dto/create-purchase-order.dto");
const update_purchase_order_dto_1 = require("./dto/update-purchase-order.dto");
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
let PurchaseOrdersController = class PurchaseOrdersController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async validateTaxCodes(input) {
        const ids = input.taxCodeIds.map((x) => x.trim()).filter(Boolean);
        if (ids.length === 0)
            return;
        const count = await this.prisma.taxCode.count({
            where: { tenantId: input.tenantId, id: { in: ids } },
        });
        if (count !== new Set(ids).size)
            throw new common_1.NotFoundException('Tax code not found');
    }
    async list(req, q, status) {
        const purchaseOrders = await this.prisma.purchaseOrder.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isProcurementDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { supplier: true, rfq: true },
            take: 200,
        });
        return { purchaseOrders };
    }
    async get(req, id) {
        const purchaseOrder = await this.prisma.purchaseOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                supplier: true,
                rfq: true,
                workflowDef: { include: { steps: { orderBy: [{ stepNo: 'asc' }] } } },
                items: { orderBy: [{ lineNo: 'asc' }], include: { taxCode: true } },
                invoices: true,
                returns: true,
                landedCosts: true,
            },
        });
        if (!purchaseOrder)
            throw new common_1.NotFoundException('Purchase order not found');
        return { purchaseOrder };
    }
    async create(req, body) {
        const supplier = await this.prisma.supplier.findFirst({
            where: { id: body.supplierId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!supplier)
            throw new common_1.NotFoundException('Supplier not found');
        if (body.rfqId) {
            const rfq = await this.prisma.rfq.findFirst({
                where: { id: body.rfqId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!rfq)
                throw new common_1.NotFoundException('RFQ not found');
        }
        await this.validateTaxCodes({
            tenantId: req.user.tenantId,
            taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
        });
        const purchaseOrder = await this.prisma.$transaction(async (tx) => {
            const po = await tx.purchaseOrder.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    supplierId: body.supplierId,
                    rfqId: body.rfqId,
                    orderDate: new Date(body.orderDate),
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.purchaseOrderItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        orderId: po.id,
                        lineNo: idx + 1,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        unitPrice: it.unitPrice,
                        discount: it.discount,
                        taxCodeId: it.taxCodeId,
                    })),
                });
            }
            return po;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'PurchaseOrder',
            entityId: purchaseOrder.id,
        });
        return { purchaseOrder };
    }
    async update(req, id, body) {
        const exists = await this.prisma.purchaseOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Purchase order not found');
        if (body.items) {
            await this.validateTaxCodes({
                tenantId: req.user.tenantId,
                taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
            });
        }
        const purchaseOrder = await this.prisma.$transaction(async (tx) => {
            const po = await tx.purchaseOrder.update({
                where: { id },
                data: {
                    orderDate: body.orderDate ? new Date(body.orderDate) : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.purchaseOrderItem.deleteMany({
                    where: { tenantId: req.user.tenantId, orderId: id },
                });
                if (body.items.length > 0) {
                    await tx.purchaseOrderItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            orderId: id,
                            lineNo: idx + 1,
                            description: it.description,
                            qty: it.qty,
                            uomCode: it.uomCode,
                            unitPrice: it.unitPrice,
                            discount: it.discount,
                            taxCodeId: it.taxCodeId,
                        })),
                    });
                }
            }
            return po;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'PurchaseOrder',
            entityId: purchaseOrder.id,
        });
        return { purchaseOrder };
    }
    async submit(req, id) {
        const po = await this.prisma.purchaseOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase order not found');
        const workflow = await this.prisma.workflowDefinition.findFirst({
            where: {
                tenantId: req.user.tenantId,
                moduleKey: 'procurement',
                docType: 'PURCHASE_ORDER',
                isActive: true,
            },
            select: { id: true },
        });
        const hasSteps = workflow
            ? (await this.prisma.workflowStep.count({
                where: { tenantId: req.user.tenantId, definitionId: workflow.id },
            })) > 0
            : false;
        const purchaseOrder = await this.prisma.purchaseOrder.update({
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
            entity: 'PurchaseOrder',
            entityId: purchaseOrder.id,
            metadata: {
                workflowDefinitionId: purchaseOrder.workflowDefinitionId,
                currentStepNo: purchaseOrder.currentStepNo,
            },
        });
        return { purchaseOrder };
    }
    async approve(req, id) {
        const po = await this.prisma.purchaseOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: {
                id: true,
                status: true,
                workflowDefinitionId: true,
                currentStepNo: true,
            },
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase order not found');
        if (po.status !== 'PENDING_APPROVAL')
            throw new common_1.ForbiddenException('Purchase order is not pending approval');
        if (po.workflowDefinitionId && po.currentStepNo) {
            const step = await this.prisma.workflowStep.findFirst({
                where: {
                    tenantId: req.user.tenantId,
                    definitionId: po.workflowDefinitionId,
                    stepNo: po.currentStepNo,
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
                    definitionId: po.workflowDefinitionId,
                },
                _max: { stepNo: true },
            });
            const nextStepNo = (step.stepNo ?? 0) + 1;
            const isFinal = nextStepNo > (maxStep._max.stepNo ?? 0);
            const purchaseOrder = await this.prisma.purchaseOrder.update({
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
                entity: 'PurchaseOrder',
                entityId: purchaseOrder.id,
                metadata: {
                    approvedStepNo: step.stepNo,
                    nextStepNo: purchaseOrder.currentStepNo,
                },
            });
            return { purchaseOrder };
        }
        const purchaseOrder = await this.prisma.purchaseOrder.update({
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
            entity: 'PurchaseOrder',
            entityId: purchaseOrder.id,
        });
        return { purchaseOrder };
    }
    async reject(req, id) {
        const po = await this.prisma.purchaseOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase order not found');
        if (po.status !== 'PENDING_APPROVAL')
            throw new common_1.ForbiddenException('Purchase order is not pending approval');
        const purchaseOrder = await this.prisma.purchaseOrder.update({
            where: { id },
            data: { status: 'REJECTED', currentStepNo: null },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'reject',
            entity: 'PurchaseOrder',
            entityId: purchaseOrder.id,
        });
        return { purchaseOrder };
    }
};
exports.PurchaseOrdersController = PurchaseOrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.purchase_order.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.purchase_order.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.purchase_order.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_purchase_order_dto_1.CreatePurchaseOrderDto]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.purchase_order.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_purchase_order_dto_1.UpdatePurchaseOrderDto]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.purchase_order.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.purchase_order.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.purchase_order.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "reject", null);
exports.PurchaseOrdersController = PurchaseOrdersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/purchase-orders'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PurchaseOrdersController);
//# sourceMappingURL=purchase-orders.controller.js.map