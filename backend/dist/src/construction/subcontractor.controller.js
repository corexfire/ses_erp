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
exports.SubcontractorController = exports.CreateSubcontractorDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateSubcontractorDto {
    code;
    name;
    category;
    contactName;
    email;
    phone;
    address;
    taxId;
    isActive;
}
exports.CreateSubcontractorDto = CreateSubcontractorDto;
let SubcontractorController = class SubcontractorController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, category, status, q) {
        const where = { tenantId: req.user.tenantId };
        if (category && category !== 'ALL')
            where.category = category;
        if (status === 'ACTIVE')
            where.isActive = true;
        if (status === 'INACTIVE')
            where.isActive = false;
        if (q) {
            where.OR = [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
                { contactName: { contains: q, mode: 'insensitive' } },
                { email: { contains: q, mode: 'insensitive' } },
            ];
        }
        const subcontractors = await this.prisma.subcontractor.findMany({
            where,
            orderBy: { name: 'asc' },
            take: 100,
        });
        return { data: subcontractors };
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const [total, active, categories] = await Promise.all([
            this.prisma.subcontractor.count({ where: { tenantId } }),
            this.prisma.subcontractor.count({ where: { tenantId, isActive: true } }),
            this.prisma.subcontractor.groupBy({
                by: ['category'],
                where: { tenantId },
                _count: { id: true }
            }),
        ]);
        return {
            total,
            active,
            categoryCount: categories.length,
            categories: categories.map(c => ({ name: c.category || 'N/A', count: c._count.id }))
        };
    }
    async create(req, body) {
        const tenantId = req.user.tenantId;
        let code = body.code;
        if (!code) {
            const count = await this.prisma.subcontractor.count({ where: { tenantId } });
            code = `SUB-${(count + 1).toString().padStart(4, '0')}`;
        }
        return this.prisma.subcontractor.create({
            data: {
                tenantId,
                code,
                name: body.name,
                category: body.category,
                contactName: body.contactName,
                email: body.email,
                phone: body.phone,
                address: body.address,
                taxId: body.taxId,
                isActive: body.isActive ?? true,
            }
        });
    }
    async update(id, body, req) {
        return this.prisma.subcontractor.update({
            where: { id },
            data: {
                code: body.code,
                name: body.name,
                category: body.category,
                contactName: body.contactName,
                email: body.email,
                phone: body.phone,
                address: body.address,
                taxId: body.taxId,
                isActive: body.isActive,
            }
        });
    }
    async remove(id) {
        await this.prisma.subcontractor.update({
            where: { id },
            data: { isActive: false }
        });
        return { success: true };
    }
};
exports.SubcontractorController = SubcontractorController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], SubcontractorController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubcontractorController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateSubcontractorDto]),
    __metadata("design:returntype", Promise)
], SubcontractorController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SubcontractorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubcontractorController.prototype, "remove", null);
exports.SubcontractorController = SubcontractorController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('construction/subcontractors'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubcontractorController);
//# sourceMappingURL=subcontractor.controller.js.map