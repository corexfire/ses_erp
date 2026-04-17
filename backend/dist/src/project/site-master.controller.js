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
exports.ProjectSiteController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class CreateProjectSiteDto {
    projectId;
    siteCode;
    name;
    address;
    city;
    province;
    gpsCoords;
    contactName;
    contactPhone;
    status;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "siteCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "province", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "gpsCoords", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "contactName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectSiteDto.prototype, "status", void 0);
let ProjectSiteController = class ProjectSiteController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listSites(req, projectId) {
        return this.prisma.projectSite.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(projectId ? { projectId } : {})
            },
            include: {
                project: { select: { name: true, code: true } },
                _count: { select: { dailyReports: true } }
            },
            orderBy: { siteCode: 'asc' }
        });
    }
    async getSite(id, req) {
        return this.prisma.projectSite.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                project: true,
                dailyReports: {
                    orderBy: { reportDate: 'desc' },
                    take: 10
                }
            }
        });
    }
    async createSite(req, body) {
        return this.prisma.projectSite.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                siteCode: body.siteCode,
                name: body.name,
                address: body.address,
                city: body.city,
                province: body.province,
                gpsCoords: body.gpsCoords,
                contactName: body.contactName,
                contactPhone: body.contactPhone,
                status: body.status || 'ACTIVE',
            }
        });
    }
    async updateSite(id, req, body) {
        return this.prisma.projectSite.update({
            where: { id, tenantId: req.user.tenantId },
            data: body
        });
    }
    async deleteSite(id, req) {
        return this.prisma.projectSite.delete({
            where: { id, tenantId: req.user.tenantId }
        });
    }
};
exports.ProjectSiteController = ProjectSiteController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectSiteController.prototype, "listSites", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectSiteController.prototype, "getSite", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateProjectSiteDto]),
    __metadata("design:returntype", Promise)
], ProjectSiteController.prototype, "createSite", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectSiteController.prototype, "updateSite", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectSiteController.prototype, "deleteSite", null);
exports.ProjectSiteController = ProjectSiteController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project/site-master'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectSiteController);
//# sourceMappingURL=site-master.controller.js.map