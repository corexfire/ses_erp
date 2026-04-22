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
exports.DrawingController = exports.CreateDrawingDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateDrawingDto {
    projectId;
    wbsTaskId;
    code;
    title;
    category;
    discipline;
    revision;
    revisionDate;
    status;
    fileId;
}
exports.CreateDrawingDto = CreateDrawingDto;
let DrawingController = class DrawingController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, projectId, discipline, q) {
        const where = { tenantId: req.user.tenantId };
        if (projectId)
            where.projectId = projectId;
        if (discipline && discipline !== 'ALL')
            where.discipline = discipline;
        if (q) {
            where.OR = [
                { title: { contains: q, mode: 'insensitive' } },
                { code: { contains: q, mode: 'insensitive' } },
            ];
        }
        const drawings = await this.prisma.constructionDrawing.findMany({
            where,
            include: { project: true, wbsTask: true },
            orderBy: [{ code: 'asc' }, { revision: 'desc' }],
        });
        return { data: drawings };
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const [total, pending, structural, arch] = await Promise.all([
            this.prisma.constructionDrawing.count({ where: { tenantId } }),
            this.prisma.constructionDrawing.count({ where: { tenantId, status: 'REVISED' } }),
            this.prisma.constructionDrawing.count({ where: { tenantId, discipline: 'STRUCTURAL' } }),
            this.prisma.constructionDrawing.count({ where: { tenantId, discipline: 'ARCHITECTURAL' } }),
        ]);
        return { total, pending, structural, arch };
    }
    async create(req, body) {
        return this.prisma.constructionDrawing.create({
            data: {
                ...body,
                tenantId: req.user.tenantId,
                revisionDate: body.revisionDate ? new Date(body.revisionDate) : null,
            },
        });
    }
    async update(id, body) {
        return this.prisma.constructionDrawing.update({
            where: { id },
            data: {
                ...body,
                revisionDate: body.revisionDate ? new Date(body.revisionDate) : undefined,
            },
        });
    }
    async remove(id) {
        await this.prisma.constructionDrawing.delete({ where: { id } });
        return { success: true };
    }
};
exports.DrawingController = DrawingController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __param(2, (0, common_1.Query)('discipline')),
    __param(3, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], DrawingController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DrawingController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateDrawingDto]),
    __metadata("design:returntype", Promise)
], DrawingController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DrawingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrawingController.prototype, "remove", null);
exports.DrawingController = DrawingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('construction/drawings'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DrawingController);
//# sourceMappingURL=drawing.controller.js.map