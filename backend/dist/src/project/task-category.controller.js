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
exports.TaskCategoryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let TaskCategoryController = class TaskCategoryController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const categories = await this.prisma.wbsTaskCategory.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ code: 'asc' }],
            include: {
                _count: {
                    select: { tasks: true }
                }
            }
        });
        return { data: categories };
    }
    async create(req, body) {
        const category = await this.prisma.wbsTaskCategory.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                description: body.description,
                color: body.color,
                icon: body.icon,
            },
        });
        return { data: category };
    }
    async update(req, id, body) {
        const category = await this.prisma.wbsTaskCategory.update({
            where: { id, tenantId: req.user.tenantId },
            data: body,
        });
        return { data: category };
    }
    async delete(req, id) {
        const taskCount = await this.prisma.wbsTask.count({
            where: { categoryId: id, tenantId: req.user.tenantId }
        });
        if (taskCount > 0) {
            throw new Error('Tidak dapat menghapus kategori yang masih digunakan oleh task');
        }
        await this.prisma.wbsTaskCategory.delete({
            where: { id, tenantId: req.user.tenantId },
        });
        return { success: true };
    }
};
exports.TaskCategoryController = TaskCategoryController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('project.task_category.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('project.task_category.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.task_category.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.task_category.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TaskCategoryController.prototype, "delete", null);
exports.TaskCategoryController = TaskCategoryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tasks/categories'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskCategoryController);
//# sourceMappingURL=task-category.controller.js.map