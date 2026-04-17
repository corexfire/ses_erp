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
exports.BomController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const bom_dto_1 = require("./dto/bom.dto");
let BomController = class BomController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, isActive) {
        const boms = await this.prisma.billOfMaterials.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(typeof isActive === 'string' ? { isActive: isActive === 'true' } : {}),
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
            include: { item: true, items: { include: { componentItem: true }, orderBy: { lineNo: 'asc' } }, operations: { orderBy: { operationNo: 'asc' } } },
            take: 200,
        });
        return { boms };
    }
    async get(req, id) {
        const bom = await this.prisma.billOfMaterials.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { item: true, items: { include: { componentItem: true }, orderBy: { lineNo: 'asc' } }, operations: { orderBy: { operationNo: 'asc' } } },
        });
        if (!bom)
            throw new common_1.NotFoundException('BOM not found');
        return { bom };
    }
    async create(req, body) {
        const item = await this.prisma.item.findFirst({
            where: { id: body.itemId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found');
        const bom = await this.prisma.$transaction(async (tx) => {
            const created = await tx.billOfMaterials.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    name: body.name,
                    itemId: body.itemId,
                    bomType: body.bomType ?? 'MANUFACTURING',
                    baseQty: body.baseQty ?? 1,
                    costingMethod: body.costingMethod ?? 'STANDARD',
                    version: body.version ?? 1,
                    isActive: body.isActive ?? true,
                    isMain: body.isMain ?? false,
                    notes: body.notes,
                },
            });
            if (body.items && body.items.length > 0) {
                await tx.billOfMaterialsItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        bomId: created.id,
                        lineNo: idx + 1,
                        componentItemId: it.componentItemId,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        issueMethod: it.issueMethod ?? 'BACKFLUSH',
                        operationNo: it.operationNo,
                        scrapPercent: it.scrapPercent,
                        notes: it.notes,
                    })),
                });
            }
            if (body.operations && body.operations.length > 0) {
                await tx.bomOperation.createMany({
                    data: body.operations.map((op) => ({
                        tenantId: req.user.tenantId,
                        bomId: created.id,
                        operationNo: op.operationNo,
                        description: op.description,
                        workstation: op.workstation,
                        setupTime: op.setupTime,
                        cycleTime: op.cycleTime,
                        laborScrap: op.laborScrap,
                        notes: op.notes,
                    })),
                });
            }
            return created;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'BillOfMaterials',
            entityId: bom.id,
        });
        return { bom };
    }
    async update(req, id, body) {
        const existing = await this.prisma.billOfMaterials.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('BOM not found');
        const bom = await this.prisma.billOfMaterials.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                isActive: body.isActive ?? undefined,
                isMain: body.isMain ?? undefined,
                notes: body.notes ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'BillOfMaterials',
            entityId: bom.id,
        });
        return { bom };
    }
    async deactivate(req, id) {
        const existing = await this.prisma.billOfMaterials.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!existing)
            throw new common_1.NotFoundException('BOM not found');
        const bom = await this.prisma.billOfMaterials.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'BillOfMaterials',
            entityId: bom.id,
        });
        return { bom };
    }
};
exports.BomController = BomController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.bom.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BomController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.bom.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BomController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.bom.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bom_dto_1.CreateBomDto]),
    __metadata("design:returntype", Promise)
], BomController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.bom.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, bom_dto_1.UpdateBomDto]),
    __metadata("design:returntype", Promise)
], BomController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.bom.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BomController.prototype, "deactivate", null);
exports.BomController = BomController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/bom'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], BomController);
//# sourceMappingURL=bom.controller.js.map