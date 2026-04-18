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
exports.IssuesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_issue_dto_1 = require("./dto/create-issue.dto");
const inventoryStatusSet = new Set([
    'DRAFT',
    'SUBMITTED',
    'POSTED',
    'VOID',
]);
const isInventoryDocStatus = (value) => Boolean(value) && inventoryStatusSet.has(value);
let IssuesController = class IssuesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const issues = await this.prisma.goodsIssueNote.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isInventoryDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { warehouse: true },
            take: 200,
        });
        return { issues };
    }
    async get(req, id) {
        const issue = await this.prisma.goodsIssueNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                warehouse: true,
                items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, binLocation: true } },
            },
        });
        if (!issue)
            throw new common_1.NotFoundException('Goods Issue not found');
        return { issue };
    }
    async create(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({
            where: { id: body.warehouseId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const count = await this.prisma.goodsIssueNote.count({ where: { tenantId: req.user.tenantId } });
        const code = `GI-${String(count + 1).padStart(6, '0')}`;
        const issue = await this.prisma.goodsIssueNote.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                issueDate: new Date(body.issueDate),
                warehouseId: body.warehouseId,
                referenceId: body.referenceId,
                notes: body.notes,
                status: 'DRAFT',
                items: {
                    create: body.items.map((item, index) => ({
                        tenantId: req.user.tenantId,
                        lineNo: index + 1,
                        itemId: item.itemId,
                        description: item.description,
                        qty: item.qty,
                        uomCode: item.uomCode,
                        warehouseId: item.warehouseId,
                        binLocationId: item.binLocationId,
                        batchCode: item.batchCode,
                        serialNo: item.serialNo,
                    })),
                },
            },
            include: { warehouse: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code } });
        return { issue };
    }
    async update(req, id, body) {
        const existing = await this.prisma.goodsIssueNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Goods Issue not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only update draft documents');
        await this.prisma.goodsIssueItem.deleteMany({ where: { issueId: id } });
        const issue = await this.prisma.goodsIssueNote.update({
            where: { id },
            data: {
                ...(body.issueDate && { issueDate: new Date(body.issueDate) }),
                ...(body.warehouseId && { warehouseId: body.warehouseId }),
                ...(body.referenceId !== undefined && { referenceId: body.referenceId }),
                ...(body.notes !== undefined && { notes: body.notes }),
                ...(body.items && {
                    items: {
                        create: body.items.map((item, index) => ({
                            tenantId: req.user.tenantId,
                            lineNo: index + 1,
                            itemId: item.itemId,
                            description: item.description,
                            qty: item.qty,
                            uomCode: item.uomCode,
                            warehouseId: item.warehouseId,
                            binLocationId: item.binLocationId,
                            batchCode: item.batchCode,
                            serialNo: item.serialNo,
                        })),
                    },
                }),
            },
            include: { warehouse: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code: issue.code } });
        return { issue };
    }
    async delete(req, id) {
        const existing = await this.prisma.goodsIssueNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Goods Issue not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only delete draft documents');
        await this.prisma.goodsIssueNote.delete({ where: { id } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'GoodsIssueNote', entityId: id, metadata: { code: existing.code } });
        return { success: true };
    }
    async submit(req, id) {
        const issue = await this.prisma.goodsIssueNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: true, warehouse: true },
        });
        if (!issue)
            throw new common_1.NotFoundException('Goods Issue not found');
        if (issue.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only submit draft documents');
        if (issue.items.length === 0)
            throw new common_1.ForbiddenException('Cannot submit empty document');
        const postingDate = new Date();
        for (const item of issue.items) {
            await this.prisma.stockLedger.create({
                data: {
                    tenantId: req.user.tenantId,
                    moveType: 'GOODS_ISSUE',
                    refType: 'GoodsIssueNote',
                    refId: issue.id,
                    postingDate,
                    itemId: item.itemId,
                    description: `Goods Issue: ${issue.code}`,
                    qtyIn: 0,
                    qtyOut: item.qty,
                    uomCode: item.uomCode,
                    warehouseId: issue.warehouseId,
                    binLocationId: item.binLocationId,
                },
            });
        }
        const updated = await this.prisma.goodsIssueNote.update({
            where: { id },
            data: { status: 'SUBMITTED' },
            include: { warehouse: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'SUBMIT', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code: issue.code } });
        return { issue: updated };
    }
    async void(req, id) {
        const issue = await this.prisma.goodsIssueNote.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: true, warehouse: true },
        });
        if (!issue)
            throw new common_1.NotFoundException('Goods Issue not found');
        if (issue.status !== 'SUBMITTED')
            throw new common_1.ForbiddenException('Can only void submitted documents');
        const postingDate = new Date();
        for (const item of issue.items) {
            await this.prisma.stockLedger.create({
                data: {
                    tenantId: req.user.tenantId,
                    moveType: 'MANUAL_ADJUST',
                    refType: 'GoodsIssueNote',
                    refId: issue.id,
                    postingDate,
                    itemId: item.itemId,
                    description: `Void GI: ${issue.code}`,
                    qtyIn: item.qty,
                    qtyOut: 0,
                    uomCode: item.uomCode,
                    warehouseId: issue.warehouseId,
                    binLocationId: item.binLocationId,
                },
            });
        }
        const updated = await this.prisma.goodsIssueNote.update({
            where: { id },
            data: { status: 'VOID' },
            include: { warehouse: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'VOID', entity: 'GoodsIssueNote', entityId: issue.id, metadata: { code: issue.code } });
        return { issue: updated };
    }
};
exports.IssuesController = IssuesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.issue.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], IssuesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.issue.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IssuesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.issue.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_issue_dto_1.CreateGoodsIssueDto]),
    __metadata("design:returntype", Promise)
], IssuesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.issue.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_issue_dto_1.UpdateGoodsIssueDto]),
    __metadata("design:returntype", Promise)
], IssuesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.issue.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IssuesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.issue.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IssuesController.prototype, "submit", null);
__decorate([
    (0, common_1.Post)(':id/void'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.issue.void'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IssuesController.prototype, "void", null);
exports.IssuesController = IssuesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/issues'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], IssuesController);
//# sourceMappingURL=issues.controller.js.map