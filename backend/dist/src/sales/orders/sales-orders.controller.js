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
exports.SalesOrdersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_sales_order_dto_1 = require("./dto/create-sales-order.dto");
const update_sales_order_dto_1 = require("./dto/update-sales-order.dto");
let SalesOrdersController = class SalesOrdersController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const orders = await this.prisma.salesOrder.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [{ code: { contains: q, mode: 'insensitive' } }],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { customer: true, quotation: true },
            take: 200,
        });
        return { orders };
    }
    async get(req, id) {
        const order = await this.prisma.salesOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                customer: true,
                quotation: true,
                workflowDef: { include: { steps: { orderBy: [{ stepNo: 'asc' }] } } },
                items: { orderBy: [{ lineNo: 'asc' }] },
                shipments: true,
                invoices: true,
                returns: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Sales order not found');
        return { order };
    }
    async create(req, body) {
        const customer = await this.prisma.customer.findFirst({
            where: { id: body.customerId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        if (body.quotationId) {
            const quotation = await this.prisma.salesQuotation.findFirst({
                where: { id: body.quotationId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!quotation)
                throw new common_1.NotFoundException('Quotation not found');
        }
        const order = await this.prisma.$transaction(async (tx) => {
            const o = await tx.salesOrder.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    customerId: body.customerId,
                    quotationId: body.quotationId,
                    orderDate: new Date(body.orderDate),
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.salesOrderItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        orderId: o.id,
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
            return o;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'SalesOrder',
            entityId: order.id,
        });
        return { order };
    }
    async update(req, id, body) {
        const exists = await this.prisma.salesOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Sales order not found');
        const order = await this.prisma.$transaction(async (tx) => {
            const o = await tx.salesOrder.update({
                where: { id },
                data: {
                    orderDate: body.orderDate ? new Date(body.orderDate) : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.salesOrderItem.deleteMany({
                    where: { tenantId: req.user.tenantId, orderId: id },
                });
                if (body.items.length > 0) {
                    await tx.salesOrderItem.createMany({
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
            return o;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'SalesOrder',
            entityId: order.id,
        });
        return { order };
    }
    async submit(req, id) {
        const order = await this.prisma.salesOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Sales order not found');
        const workflow = await this.prisma.workflowDefinition.findFirst({
            where: {
                tenantId: req.user.tenantId,
                moduleKey: 'sales',
                docType: 'SALES_ORDER',
                isActive: true,
            },
            select: { id: true },
        });
        const hasSteps = workflow
            ? (await this.prisma.workflowStep.count({
                where: { tenantId: req.user.tenantId, definitionId: workflow.id },
            })) > 0
            : false;
        const updated = await this.prisma.salesOrder.update({
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
            entity: 'SalesOrder',
            entityId: updated.id,
            metadata: {
                workflowDefinitionId: updated.workflowDefinitionId,
                currentStepNo: updated.currentStepNo,
            },
        });
        return { order: updated };
    }
    async approve(req, id) {
        const order = await this.prisma.salesOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: {
                id: true,
                status: true,
                workflowDefinitionId: true,
                currentStepNo: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Sales order not found');
        if (order.status !== 'PENDING_APPROVAL')
            throw new common_1.ForbiddenException('Order is not pending approval');
        if (order.workflowDefinitionId && order.currentStepNo) {
            const step = await this.prisma.workflowStep.findFirst({
                where: {
                    tenantId: req.user.tenantId,
                    definitionId: order.workflowDefinitionId,
                    stepNo: order.currentStepNo,
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
                    definitionId: order.workflowDefinitionId,
                },
                _max: { stepNo: true },
            });
            const nextStepNo = (step.stepNo ?? 0) + 1;
            const isFinal = nextStepNo > (maxStep._max.stepNo ?? 0);
            const updated = await this.prisma.salesOrder.update({
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
                entity: 'SalesOrder',
                entityId: updated.id,
                metadata: {
                    approvedStepNo: step.stepNo,
                    nextStepNo: updated.currentStepNo,
                },
            });
            return { order: updated };
        }
        const updated = await this.prisma.salesOrder.update({
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
            entity: 'SalesOrder',
            entityId: updated.id,
        });
        return { order: updated };
    }
    async reject(req, id) {
        const order = await this.prisma.salesOrder.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, status: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Sales order not found');
        if (order.status !== 'PENDING_APPROVAL')
            throw new common_1.ForbiddenException('Order is not pending approval');
        const updated = await this.prisma.salesOrder.update({
            where: { id },
            data: { status: 'REJECTED', currentStepNo: null },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'reject',
            entity: 'SalesOrder',
            entityId: updated.id,
        });
        return { order: updated };
    }
};
exports.SalesOrdersController = SalesOrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.order.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesOrdersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.order.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesOrdersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.order.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sales_order_dto_1.CreateSalesOrderDto]),
    __metadata("design:returntype", Promise)
], SalesOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.order.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_sales_order_dto_1.UpdateSalesOrderDto]),
    __metadata("design:returntype", Promise)
], SalesOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('sales.order.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesOrdersController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('sales.order.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesOrdersController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('sales.order.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesOrdersController.prototype, "reject", null);
exports.SalesOrdersController = SalesOrdersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/orders'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], SalesOrdersController);
//# sourceMappingURL=sales-orders.controller.js.map