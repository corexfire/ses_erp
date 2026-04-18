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
exports.SupportDocumentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class CreateDocumentDto {
    code;
    title;
    description;
    category;
    version;
    status;
    authorId;
    departmentId;
    effectiveDate;
    expiryDate;
    fileUrl;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "version", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "authorId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "departmentId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "effectiveDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "expiryDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "fileUrl", void 0);
let SupportDocumentController = class SupportDocumentController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listDocuments(req, category, status) {
        return this.prisma.supportDocument.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(category ? { category } : {}),
                ...(status ? { status } : {}),
            },
            include: {
                author: { select: { firstName: true, lastName: true, employeeNo: true } },
                department: { select: { name: true, code: true } }
            },
            orderBy: { code: 'asc' }
        });
    }
    async getStats(req) {
        const docs = await this.prisma.supportDocument.findMany({
            where: { tenantId: req.user.tenantId }
        });
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        return {
            total: docs.length,
            published: docs.filter(d => d.status === 'PUBLISHED').length,
            underReview: docs.filter(d => d.status === 'UNDER_REVIEW').length,
            expiringSoon: docs.filter(d => d.expiryDate && d.expiryDate > now && d.expiryDate <= thirtyDaysFromNow).length,
            expired: docs.filter(d => d.expiryDate && d.expiryDate <= now).length,
        };
    }
    async getDocument(id, req) {
        return this.prisma.supportDocument.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                author: true,
                department: true,
            }
        });
    }
    async createDocument(req, body) {
        return this.prisma.supportDocument.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                title: body.title,
                description: body.description,
                category: body.category,
                version: body.version,
                status: body.status || 'DRAFT',
                authorId: body.authorId,
                departmentId: body.departmentId,
                effectiveDate: body.effectiveDate ? new Date(body.effectiveDate) : undefined,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
                fileUrl: body.fileUrl,
            }
        });
    }
    async updateDocument(id, req, body) {
        const data = { ...body };
        if (body.effectiveDate)
            data.effectiveDate = new Date(body.effectiveDate);
        if (body.expiryDate)
            data.expiryDate = new Date(body.expiryDate);
        return this.prisma.supportDocument.update({
            where: { id, tenantId: req.user.tenantId },
            data
        });
    }
    async deleteDocument(id, req) {
        return this.prisma.supportDocument.delete({
            where: { id, tenantId: req.user.tenantId }
        });
    }
};
exports.SupportDocumentController = SupportDocumentController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SupportDocumentController.prototype, "listDocuments", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupportDocumentController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupportDocumentController.prototype, "getDocument", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], SupportDocumentController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SupportDocumentController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupportDocumentController.prototype, "deleteDocument", null);
exports.SupportDocumentController = SupportDocumentController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('support/documents'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportDocumentController);
//# sourceMappingURL=document.controller.js.map