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
exports.ProductionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const production_dto_1 = require("./dto/production.dto");
let ProductionController = class ProductionController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listIssues(req, q) {
        const issues = await this.prisma.productionIssue.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q ? { code: { contains: q, mode: 'insensitive' } } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { workOrder: true, items: { include: { item: true } } },
            take: 200,
        });
        return { issues };
    }
    async getIssue(req, id) {
        const issue = await this.prisma.productionIssue.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { workOrder: true, items: { include: { item: true } } },
        });
        if (!issue)
            throw new common_1.NotFoundException('Production issue not found');
        return { issue };
    }
    async createIssue(req, body) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id: body.workOrderId, tenantId: req.user.tenantId },
            select: { id: true, warehouseId: true, status: true },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        if (wo.status === 'COMPLETED' || wo.status === 'CANCELED') {
            throw new common_1.NotFoundException('Cannot issue to completed/canceled Work Order');
        }
        const issue = await this.prisma.$transaction(async (tx) => {
            const created = await tx.productionIssue.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    workOrderId: body.workOrderId,
                    issueDate: new Date(body.issueDate),
                    notes: body.notes,
                },
            });
            for (let i = 0; i < body.items.length; i++) {
                const it = body.items[i];
                await tx.productionIssueItem.create({
                    data: {
                        tenantId: req.user.tenantId,
                        issueId: created.id,
                        lineNo: i + 1,
                        itemId: it.itemId,
                        qty: it.qty,
                        uomCode: it.uomCode,
                    },
                });
                if (wo.warehouseId) {
                    await tx.stockLedger.create({
                        data: {
                            tenantId: req.user.tenantId,
                            moveType: 'PRODUCTION_ISSUE',
                            refType: 'PRODUCTION_ISSUE',
                            refId: created.id,
                            postingDate: new Date(),
                            itemId: it.itemId,
                            description: `Issue for WO ${body.code}`,
                            qtyIn: '0',
                            qtyOut: it.qty.toString(),
                            uomCode: it.uomCode,
                            warehouseId: wo.warehouseId,
                        },
                    });
                }
            }
            return created;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ProductionIssue',
            entityId: issue.id,
        });
        return { issue };
    }
    async listReceipts(req, q) {
        const receipts = await this.prisma.productionReceipt.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q ? { code: { contains: q, mode: 'insensitive' } } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { workOrder: true },
            take: 200,
        });
        return { receipts };
    }
    async getReceipt(req, id) {
        const receipt = await this.prisma.productionReceipt.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { workOrder: true },
        });
        if (!receipt)
            throw new common_1.NotFoundException('Production receipt not found');
        return { receipt };
    }
    async createReceipt(req, body) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id: body.workOrderId, tenantId: req.user.tenantId },
            select: { id: true, finishedGoodItemId: true, warehouseId: true, qtyProduced: true, status: true },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        const receipt = await this.prisma.$transaction(async (tx) => {
            const created = await tx.productionReceipt.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    workOrderId: body.workOrderId,
                    receiptDate: new Date(body.receiptDate),
                    qtyProduced: body.qtyProduced,
                    qtyRejected: body.qtyRejected ?? 0,
                    uomCode: body.uomCode,
                    notes: body.notes,
                    batchNo: body.batchNo,
                    shiftNo: body.shiftNo,
                },
            });
            if (wo.warehouseId) {
                await tx.stockLedger.create({
                    data: {
                        tenantId: req.user.tenantId,
                        moveType: 'PRODUCTION_RECEIPT',
                        refType: 'PRODUCTION_RECEIPT',
                        refId: created.id,
                        postingDate: new Date(),
                        itemId: wo.finishedGoodItemId,
                        description: `Production receipt for WO ${body.code}`,
                        qtyIn: body.qtyProduced.toString(),
                        qtyOut: '0',
                        uomCode: body.uomCode,
                        warehouseId: wo.warehouseId,
                    },
                });
            }
            await tx.workOrder.update({
                where: { id: body.workOrderId },
                data: {
                    qtyProduced: { increment: body.qtyProduced },
                    status: wo.status === 'DRAFT' ? 'IN_PROGRESS' : wo.status,
                },
            });
            return created;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ProductionReceipt',
            entityId: receipt.id,
        });
        return { receipt };
    }
    async listQc(req) {
        const qcs = await this.prisma.inProcessQc.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ createdAt: 'desc' }],
            include: { workOrder: { include: { finishedGood: true } } },
            take: 200,
        });
        return { qcs };
    }
    async createQc(req, body) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id: body.workOrderId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        const qc = await this.prisma.inProcessQc.create({
            data: {
                tenantId: req.user.tenantId,
                workOrderId: body.workOrderId,
                qtyInspected: body.qtyInspected,
                qtyPassed: body.qtyPassed,
                qtyFailed: body.qtyFailed,
                notes: body.notes,
                disposition: body.disposition ?? 'PENDING',
                inspectedBy: body.inspectedBy,
                qcDate: body.qcDate ? new Date(body.qcDate) : new Date(),
                status: 'IN_PROGRESS',
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'InProcessQc',
            entityId: qc.id,
        });
        return { qc };
    }
    async updateQc(req, id, body) {
        const qc = await this.prisma.inProcessQc.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!qc)
            throw new common_1.NotFoundException('QC record not found');
        const updated = await this.prisma.inProcessQc.update({
            where: { id },
            data: { status: body.status ?? undefined, disposition: body.disposition ?? undefined, notes: body.notes ?? undefined },
        });
        return { qc: updated };
    }
};
exports.ProductionController = ProductionController;
__decorate([
    (0, common_1.Get)('issues'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.production_issue.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "listIssues", null);
__decorate([
    (0, common_1.Get)('issues/:id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.production_issue.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "getIssue", null);
__decorate([
    (0, common_1.Post)('issues'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.production_issue.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, production_dto_1.CreateProductionIssueDto]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "createIssue", null);
__decorate([
    (0, common_1.Get)('receipts'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.production_receipt.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "listReceipts", null);
__decorate([
    (0, common_1.Get)('receipts/:id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.production_receipt.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "getReceipt", null);
__decorate([
    (0, common_1.Post)('receipts'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.production_receipt.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, production_dto_1.CreateProductionReceiptDto]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "createReceipt", null);
__decorate([
    (0, common_1.Get)('qc'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.qc.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "listQc", null);
__decorate([
    (0, common_1.Post)('qc'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.qc.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "createQc", null);
__decorate([
    (0, common_1.Patch)('qc/:id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.qc.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductionController.prototype, "updateQc", null);
exports.ProductionController = ProductionController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/production'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ProductionController);
//# sourceMappingURL=production.controller.js.map