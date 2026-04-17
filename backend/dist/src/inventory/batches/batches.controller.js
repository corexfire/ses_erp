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
exports.SerialsController = exports.BatchesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let BatchesController = class BatchesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, itemId) {
        const where = { tenantId: req.user.tenantId };
        if (itemId)
            where.itemId = itemId;
        const batches = await this.prisma.itemBatch.findMany({
            where,
            include: { item: true },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { batches };
    }
    async get(req, id) {
        const batch = await this.prisma.itemBatch.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { item: true, stockLedgers: { include: { warehouse: true, binLocation: true } } },
        });
        return { batch };
    }
    async create(req, body) {
        const item = await this.prisma.item.findFirst({ where: { id: body.itemId, tenantId: req.user.tenantId } });
        if (!item)
            throw new Error('Item not found');
        const existing = await this.prisma.itemBatch.findFirst({
            where: { tenantId: req.user.tenantId, itemId: body.itemId, code: body.code },
        });
        if (existing)
            throw new Error('Batch code already exists');
        const batch = await this.prisma.itemBatch.create({
            data: {
                tenantId: req.user.tenantId,
                itemId: body.itemId,
                code: body.code,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
            },
            include: { item: true },
        });
        return { batch };
    }
};
exports.BatchesController = BatchesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.batch.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.batch.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.batch.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BatchesController.prototype, "create", null);
exports.BatchesController = BatchesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/batches'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BatchesController);
let SerialsController = class SerialsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, itemId, status) {
        const where = { tenantId: req.user.tenantId };
        if (itemId)
            where.itemId = itemId;
        if (status)
            where.status = status;
        const serials = await this.prisma.itemSerial.findMany({
            where,
            include: { item: true },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { serials };
    }
    async get(req, id) {
        const serial = await this.prisma.itemSerial.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { item: true, stockLedgers: { include: { warehouse: true, binLocation: true } } },
        });
        return { serial };
    }
    async create(req, body) {
        const item = await this.prisma.item.findFirst({ where: { id: body.itemId, tenantId: req.user.tenantId } });
        if (!item)
            throw new Error('Item not found');
        const existing = await this.prisma.itemSerial.findFirst({
            where: { tenantId: req.user.tenantId, serialNo: body.serialNo },
        });
        if (existing)
            throw new Error('Serial number already exists');
        const serial = await this.prisma.itemSerial.create({
            data: {
                tenantId: req.user.tenantId,
                itemId: body.itemId,
                serialNo: body.serialNo,
                status: body.status || 'AVAILABLE',
            },
            include: { item: true },
        });
        return { serial };
    }
};
exports.SerialsController = SerialsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.serial.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('itemId')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SerialsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.serial.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SerialsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.serial.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SerialsController.prototype, "create", null);
exports.SerialsController = SerialsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/serials'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SerialsController);
//# sourceMappingURL=batches.controller.js.map