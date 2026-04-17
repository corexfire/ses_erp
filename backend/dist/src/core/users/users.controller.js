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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const assign_role_dto_1 = require("./dto/assign-role.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
let UsersController = class UsersController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req) {
        const users = await this.prisma.user.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ createdAt: 'desc' }],
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                createdAt: true,
                roles: { include: { role: true } },
            },
        });
        return { users };
    }
    async create(req, body) {
        const passwordHash = await bcryptjs_1.default.hash(body.password, 12);
        const user = await this.prisma.user.create({
            data: {
                tenantId: req.user.tenantId,
                email: body.email,
                name: body.name,
                passwordHash,
                isActive: true,
            },
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                createdAt: true,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'User',
            entityId: user.id,
        });
        return { user };
    }
    async deactivate(req, id) {
        const user = await this.prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                createdAt: true,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'User',
            entityId: user.id,
        });
        return { user };
    }
    async update(req, id, body) {
        const user = await this.prisma.user.update({
            where: { id },
            data: { name: body.name, email: body.email },
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                createdAt: true,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'User',
            entityId: user.id,
        });
        return { user };
    }
    async assignRole(req, userId, body) {
        const userRole = await this.prisma.userRole.upsert({
            where: { userId_roleId: { userId, roleId: body.roleId } },
            update: {},
            create: { userId, roleId: body.roleId },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'assign_role',
            entity: 'UserRole',
            entityId: `${userRole.userId}:${userRole.roleId}`,
        });
        return { userRole };
    }
    async removeRole(req, userId, roleId) {
        await this.prisma.userRole.delete({
            where: { userId_roleId: { userId, roleId } },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'remove_role',
            entity: 'UserRole',
            entityId: `${userId}:${roleId}`,
        });
        return { ok: true };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.user.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('core.user.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('core.user.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('core.user.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/roles'),
    (0, permissions_decorator_1.RequirePermissions)('core.user.assign_role'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, assign_role_dto_1.AssignRoleDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "assignRole", null);
__decorate([
    (0, common_1.Delete)(':id/roles/:roleId'),
    (0, permissions_decorator_1.RequirePermissions)('core.user.assign_role'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeRole", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/users'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], UsersController);
//# sourceMappingURL=users.controller.js.map