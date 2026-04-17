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
exports.RouteController = exports.UpdateRouteTemplateDto = exports.CreateRouteTemplateDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
class CreateRouteTemplateDto {
    code;
    name;
    warehouseId;
    description;
    origin;
    destination;
    distanceKm;
    estDurationHours;
    standardCost;
    isActive;
}
exports.CreateRouteTemplateDto = CreateRouteTemplateDto;
class UpdateRouteTemplateDto {
    name;
    warehouseId;
    description;
    origin;
    destination;
    distanceKm;
    estDurationHours;
    standardCost;
    isActive;
}
exports.UpdateRouteTemplateDto = UpdateRouteTemplateDto;
let RouteController = class RouteController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(query, req) {
        const where = {};
        where.tenantId = req.user.tenantId;
        if (query.search) {
            where.OR = [
                { code: { contains: query.search, mode: 'insensitive' } },
                { name: { contains: query.search, mode: 'insensitive' } },
                { origin: { contains: query.search, mode: 'insensitive' } },
                { destination: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.isActive !== undefined) {
            where.isActive = query.isActive === 'true';
        }
        const page = parseInt(query.page || '1');
        const limit = parseInt(query.limit || '50');
        const skip = (page - 1) * limit;
        const [routes, total] = await Promise.all([
            this.prisma.routeTemplate.findMany({
                where,
                skip,
                take: limit,
                orderBy: { code: 'asc' },
                include: { warehouse: { select: { name: true } } }
            }),
            this.prisma.routeTemplate.count({ where }),
        ]);
        return { data: routes, total, page, limit };
    }
    async get(id, req) {
        const route = await this.prisma.routeTemplate.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                warehouse: true,
                _count: { select: { tripPlans: true } }
            },
        });
        if (!route)
            throw new common_1.NotFoundException('Route template not found');
        return route;
    }
    async create(body, req) {
        const route = await this.prisma.routeTemplate.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                warehouseId: body.warehouseId,
                description: body.description,
                origin: body.origin,
                destination: body.destination,
                distanceKm: body.distanceKm,
                estDurationHours: body.estDurationHours,
                standardCost: body.standardCost,
                isActive: body.isActive ?? true,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'CREATE',
            entity: 'RouteTemplate',
            entityId: route.id,
            metadata: { code: route.code },
        });
        return route;
    }
    async update(id, body, req) {
        const existing = await this.prisma.routeTemplate.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Route template not found');
        const route = await this.prisma.routeTemplate.update({
            where: { id },
            data: {
                name: body.name ?? existing.name,
                warehouseId: body.warehouseId !== undefined ? body.warehouseId : existing.warehouseId,
                description: body.description !== undefined ? body.description : existing.description,
                origin: body.origin !== undefined ? body.origin : existing.origin,
                destination: body.destination !== undefined ? body.destination : existing.destination,
                distanceKm: body.distanceKm !== undefined ? body.distanceKm : existing.distanceKm,
                estDurationHours: body.estDurationHours !== undefined ? body.estDurationHours : existing.estDurationHours,
                standardCost: body.standardCost !== undefined ? body.standardCost : existing.standardCost,
                isActive: body.isActive ?? existing.isActive,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'UPDATE',
            entity: 'RouteTemplate',
            entityId: route.id,
            metadata: { code: route.code },
        });
        return route;
    }
};
exports.RouteController = RouteController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.route.read'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.route.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('logistics.route.manage'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRouteTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.route.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateRouteTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "update", null);
exports.RouteController = RouteController = __decorate([
    (0, common_1.Controller)('logistics/routes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RouteController);
//# sourceMappingURL=route.controller.js.map