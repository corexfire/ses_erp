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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let TeamController = class TeamController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listMyTeams(req) {
        const memberships = await this.prisma.teamMember.findMany({
            where: {
                tenantId: req.user.tenantId,
                userId: req.user.id
            },
            include: { team: true },
        });
        return { data: memberships.map(m => m.team) };
    }
    async listAll(req) {
        const teams = await this.prisma.team.findMany({
            where: { tenantId: req.user.tenantId },
            include: { members: { include: { user: true } } },
        });
        return { data: teams };
    }
    async create(req, body) {
        const team = await this.prisma.team.create({
            data: {
                tenantId: req.user.tenantId,
                name: body.name,
                description: body.description ?? null,
            },
        });
        return { data: team };
    }
    async addMember(req, id, body) {
        const member = await this.prisma.teamMember.create({
            data: {
                tenantId: req.user.tenantId,
                teamId: id,
                userId: body.userId,
                role: body.role || 'MEMBER',
            },
        });
        return { data: member };
    }
    async update(req, id, body) {
        const team = await this.prisma.team.update({
            where: { id, tenantId: req.user.tenantId },
            data: body,
        });
        return { data: team };
    }
    async delete(req, id) {
        await this.prisma.team.delete({
            where: { id, tenantId: req.user.tenantId },
        });
        return { success: true };
    }
    async removeMember(req, teamId, memberId) {
        await this.prisma.teamMember.delete({
            where: {
                id: memberId,
                teamId: teamId,
                tenantId: req.user.tenantId
            },
        });
        return { success: true };
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "listMyTeams", null);
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.team.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "listAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.team.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    (0, permissions_decorator_1.RequirePermissions)('hris.team.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "addMember", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.team.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.team.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)(':id/members/:memberId'),
    (0, permissions_decorator_1.RequirePermissions)('hris.team.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "removeMember", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/team'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamController);
//# sourceMappingURL=team.controller.js.map