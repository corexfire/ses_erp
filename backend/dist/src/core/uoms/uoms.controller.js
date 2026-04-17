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
exports.UomsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_uom_dto_1 = require("./dto/create-uom.dto");
const create_uom_conversion_dto_1 = require("./dto/create-uom-conversion.dto");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
let UomsController = class UomsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req) {
        const uoms = await this.prisma.uom.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ isActive: 'desc' }, { code: 'asc' }],
        });
        return { uoms };
    }
    async listConversions(req) {
        const conversions = await this.prisma.uomConversion.findMany({
            where: { tenantId: req.user.tenantId },
            include: { fromUom: true, toUom: true },
            orderBy: [{ createdAt: 'desc' }],
            take: 500,
        });
        return { conversions };
    }
    async createConversion(req, body) {
        const conversion = await this.prisma.uomConversion.create({
            data: {
                tenantId: req.user.tenantId,
                fromUomId: body.fromUomId,
                toUomId: body.toUomId,
                factor: body.factor,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'UomConversion',
            entityId: conversion.id,
        });
        return { conversion };
    }
    async deleteConversion(req, id) {
        const conversion = await this.prisma.uomConversion.delete({
            where: { id },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'delete',
            entity: 'UomConversion',
            entityId: conversion.id,
        });
        return { ok: true };
    }
    async create(req, body) {
        const uom = await this.prisma.uom.create({
            data: { tenantId: req.user.tenantId, code: body.code, name: body.name },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Uom',
            entityId: uom.id,
        });
        return { uom };
    }
    async deactivate(req, id) {
        const uom = await this.prisma.uom.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'Uom',
            entityId: uom.id,
        });
        return { uom };
    }
};
exports.UomsController = UomsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.uom.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('conversions'),
    (0, permissions_decorator_1.RequirePermissions)('core.uom_conversion.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "listConversions", null);
__decorate([
    (0, common_1.Post)('conversions'),
    (0, permissions_decorator_1.RequirePermissions)('core.uom_conversion.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_uom_conversion_dto_1.CreateUomConversionDto]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "createConversion", null);
__decorate([
    (0, common_1.Patch)('conversions/:id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('core.uom_conversion.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "deleteConversion", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('core.uom.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_uom_dto_1.CreateUomDto]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('core.uom.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UomsController.prototype, "deactivate", null);
exports.UomsController = UomsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/uoms'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], UomsController);
//# sourceMappingURL=uoms.controller.js.map