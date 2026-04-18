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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const update_role_permissions_dto_1 = require("./dto/update-role-permissions.dto");
let RolesController = class RolesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req) {
        const roles = await this.prisma.role.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ name: 'asc' }],
            include: {
                permissions: {
                    include: { permission: { select: { id: true, key: true } } }
                }
            }
        });
        return { roles };
    }
    async create(req, body) {
        const role = await this.prisma.role.create({
            data: { tenantId: req.user.tenantId, name: body.name },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Role',
            entityId: role.id,
        });
        return { role };
    }
    async getRolePermissions(req, roleId) {
        const role = await this.prisma.role.findFirst({
            where: { id: roleId, tenantId: req.user.tenantId },
            select: {
                id: true,
                permissions: {
                    select: { permission: { select: { id: true, key: true } } },
                },
            },
        });
        return { role };
    }
    async setRolePermissions(req, roleId, body) {
        const role = await this.prisma.role.findFirst({
            where: { id: roleId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!role)
            return { ok: false };
        await this.prisma.rolePermission.deleteMany({ where: { roleId } });
        if (body.permissionIds.length > 0) {
            await this.prisma.rolePermission.createMany({
                data: body.permissionIds.map((permissionId) => ({
                    roleId,
                    permissionId,
                })),
                skipDuplicates: true,
            });
        }
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'set_permissions',
            entity: 'Role',
            entityId: roleId,
            metadata: { permissionCount: body.permissionIds.length },
        });
        return { ok: true };
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.role.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('core.role.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/permissions'),
    (0, permissions_decorator_1.RequirePermissions)('core.permission.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRolePermissions", null);
__decorate([
    (0, common_1.Put)(':id/permissions'),
    (0, permissions_decorator_1.RequirePermissions)('core.role.assign_permission'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_role_permissions_dto_1.UpdateRolePermissionsDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "setRolePermissions", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/roles'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map