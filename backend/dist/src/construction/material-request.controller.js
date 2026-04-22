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
exports.MaterialRequestController = exports.CreateMaterialRequestDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateMaterialRequestDto {
    code;
    projectId;
    wbsTaskId;
    requestDate;
    priority;
    notes;
    status;
    items;
}
exports.CreateMaterialRequestDto = CreateMaterialRequestDto;
let MaterialRequestController = class MaterialRequestController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, projectId, status, q) {
        const where = { tenantId: req.user.tenantId };
        if (projectId)
            where.projectId = projectId;
        if (status && status !== 'ALL')
            where.status = status;
        if (q) {
            where.OR = [
                { code: { contains: q, mode: 'insensitive' } },
                { project: { name: { contains: q, mode: 'insensitive' } } },
                { notes: { contains: q, mode: 'insensitive' } },
            ];
        }
        const requests = await this.prisma.constructionMaterialRequest.findMany({
            where,
            include: {
                project: true,
                wbsTask: true,
                requestedBy: {
                    select: { id: true, name: true, email: true }
                },
                items: {
                    include: { item: true }
                }
            },
            orderBy: { requestDate: 'desc' },
            take: 100,
        });
        return { data: requests };
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const [total, pending, approved] = await Promise.all([
            this.prisma.constructionMaterialRequest.count({ where: { tenantId } }),
            this.prisma.constructionMaterialRequest.count({ where: { tenantId, status: 'SUBMITTED' } }),
            this.prisma.constructionMaterialRequest.count({ where: { tenantId, status: 'APPROVED' } }),
        ]);
        const valuation = await this.prisma.constructionMaterialRequestItem.aggregate({
            where: { tenantId },
            _count: { id: true },
        });
        return {
            total,
            pending,
            approved,
            itemCount: valuation._count.id
        };
    }
    async create(req, body) {
        const tenantId = req.user.tenantId;
        let code = body.code;
        if (!code) {
            const count = await this.prisma.constructionMaterialRequest.count({ where: { tenantId } });
            code = `MR-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;
        }
        return this.prisma.constructionMaterialRequest.create({
            data: {
                tenantId,
                code,
                projectId: body.projectId,
                wbsTaskId: body.wbsTaskId,
                requestDate: new Date(body.requestDate),
                priority: body.priority || 'NORMAL',
                notes: body.notes,
                status: body.status || 'DRAFT',
                requestedById: req.user.id,
                items: {
                    create: body.items.map(item => ({
                        tenantId,
                        itemId: item.itemId,
                        description: item.description,
                        quantity: item.quantity,
                        uomCode: item.uomCode,
                        requiredDate: item.requiredDate ? new Date(item.requiredDate) : null,
                        notes: item.notes,
                    }))
                }
            },
            include: { items: true }
        });
    }
    async update(id, body, req) {
        const tenantId = req.user.tenantId;
        return this.prisma.$transaction(async (tx) => {
            if (body.items) {
                await tx.constructionMaterialRequestItem.deleteMany({
                    where: { requestId: id }
                });
            }
            return tx.constructionMaterialRequest.update({
                where: { id },
                data: {
                    projectId: body.projectId,
                    wbsTaskId: body.wbsTaskId,
                    requestDate: body.requestDate ? new Date(body.requestDate) : undefined,
                    priority: body.priority,
                    notes: body.notes,
                    status: body.status,
                    items: body.items ? {
                        create: body.items.map(item => ({
                            tenantId,
                            itemId: item.itemId,
                            description: item.description,
                            quantity: item.quantity,
                            uomCode: item.uomCode,
                            requiredDate: item.requiredDate ? new Date(item.requiredDate) : null,
                            notes: item.notes,
                        }))
                    } : undefined
                },
                include: { items: true }
            });
        });
    }
    async remove(id) {
        await this.prisma.constructionMaterialRequest.delete({ where: { id } });
        return { success: true };
    }
};
exports.MaterialRequestController = MaterialRequestController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], MaterialRequestController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialRequestController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateMaterialRequestDto]),
    __metadata("design:returntype", Promise)
], MaterialRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MaterialRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialRequestController.prototype, "remove", null);
exports.MaterialRequestController = MaterialRequestController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('construction/material-requests'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaterialRequestController);
//# sourceMappingURL=material-request.controller.js.map