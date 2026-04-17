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
exports.PutawayController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_putaway_dto_1 = require("./dto/create-putaway.dto");
const inventoryStatusSet = new Set(['DRAFT', 'SUBMITTED', 'POSTED', 'VOID']);
const isInventoryDocStatus = (value) => Boolean(value) && inventoryStatusSet.has(value);
let PutawayController = class PutawayController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const putaways = await this.prisma.putaway.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isInventoryDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { warehouse: true, grn: true },
            take: 200,
        });
        return { putaways };
    }
    async get(req, id) {
        const putaway = await this.prisma.putaway.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                warehouse: true,
                grn: true,
                items: { orderBy: [{ lineNo: 'asc' }], include: { item: true, fromBinLocation: true, toBinLocation: true } },
            },
        });
        if (!putaway)
            throw new common_1.NotFoundException('Putaway not found');
        return { putaway };
    }
    async create(req, body) {
        const warehouse = await this.prisma.warehouse.findFirst({ where: { id: body.warehouseId, tenantId: req.user.tenantId } });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        const count = await this.prisma.putaway.count({ where: { tenantId: req.user.tenantId } });
        const code = `PA-${String(count + 1).padStart(6, '0')}`;
        const putaway = await this.prisma.putaway.create({
            data: {
                tenantId: req.user.tenantId,
                code,
                putawayDate: new Date(body.putawayDate),
                warehouseId: body.warehouseId,
                grnId: body.grnId,
                notes: body.notes,
                status: 'DRAFT',
                items: {
                    create: body.items.map((item, index) => ({
                        tenantId: req.user.tenantId,
                        lineNo: index + 1,
                        grnItemId: item.grnItemId,
                        itemId: item.itemId,
                        description: item.description,
                        qty: item.qty,
                        fromBinLocationId: item.fromBinLocationId,
                        toBinLocationId: item.toBinLocationId,
                        batchCode: item.batchCode,
                        serialNo: item.serialNo,
                    })),
                },
            },
            include: { warehouse: true, grn: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'Putaway', entityId: putaway.id, metadata: { code } });
        return { putaway };
    }
    async update(req, id, body) {
        const existing = await this.prisma.putaway.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Putaway not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only update draft documents');
        await this.prisma.putawayItem.deleteMany({ where: { putawayId: id } });
        const putaway = await this.prisma.putaway.update({
            where: { id },
            data: {
                ...(body.putawayDate && { putawayDate: new Date(body.putawayDate) }),
                ...(body.warehouseId && { warehouseId: body.warehouseId }),
                ...(body.notes !== undefined && { notes: body.notes }),
                ...(body.items && {
                    items: {
                        create: body.items.map((item, index) => ({
                            tenantId: req.user.tenantId,
                            lineNo: index + 1,
                            grnItemId: item.grnItemId,
                            itemId: item.itemId,
                            description: item.description,
                            qty: item.qty,
                            fromBinLocationId: item.fromBinLocationId,
                            toBinLocationId: item.toBinLocationId,
                            batchCode: item.batchCode,
                            serialNo: item.serialNo,
                        })),
                    },
                }),
            },
            include: { warehouse: true, items: { include: { item: true } } },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'Putaway', entityId: putaway.id, metadata: { code: putaway.code } });
        return { putaway };
    }
    async delete(req, id) {
        const existing = await this.prisma.putaway.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Putaway not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only delete draft documents');
        await this.prisma.putaway.delete({ where: { id } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'Putaway', entityId: id, metadata: { code: existing.code } });
        return { success: true };
    }
    async submit(req, id) {
        const putaway = await this.prisma.putaway.findFirst({ where: { id, tenantId: req.user.tenantId }, include: { items: true, warehouse: true } });
        if (!putaway)
            throw new common_1.NotFoundException('Putaway not found');
        if (putaway.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only submit draft documents');
        const updated = await this.prisma.putaway.update({ where: { id }, data: { status: 'SUBMITTED' }, include: { warehouse: true, items: { include: { item: true } } } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'SUBMIT', entity: 'Putaway', entityId: putaway.id, metadata: { code: putaway.code } });
        return { putaway: updated };
    }
};
exports.PutawayController = PutawayController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.putaway.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PutawayController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.putaway.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PutawayController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.putaway.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_putaway_dto_1.CreatePutawayDto]),
    __metadata("design:returntype", Promise)
], PutawayController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.putaway.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_putaway_dto_1.UpdatePutawayDto]),
    __metadata("design:returntype", Promise)
], PutawayController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.putaway.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PutawayController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.putaway.submit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PutawayController.prototype, "submit", null);
exports.PutawayController = PutawayController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/putaways'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], PutawayController);
//# sourceMappingURL=putaway.controller.js.map