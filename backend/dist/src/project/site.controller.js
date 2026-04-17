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
exports.SiteController = exports.CreateDailyReportDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateDailyReportDto {
    projectId;
    reportDate;
    morningWeather;
    afternoonWeather;
    eveningWeather;
    manpowerSummary;
    equipmentSummary;
    materialSummary;
    workSummary;
    progressPercent;
    issues;
    status;
    wbsTaskId;
}
exports.CreateDailyReportDto = CreateDailyReportDto;
let SiteController = class SiteController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listSites(req, search, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        if (search)
            where.project = { name: { contains: search, mode: 'insensitive' } };
        const reports = await this.prisma.dailyReport.findMany({
            where,
            include: { project: true },
            orderBy: { reportDate: 'desc' },
            take: 200,
        });
        return { data: reports };
    }
    async createSite(req, body) {
        const report = await this.prisma.dailyReport.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                reportDate: new Date(body.reportDate),
                morningWeather: body.morningWeather,
                afternoonWeather: body.afternoonWeather,
                eveningWeather: body.eveningWeather,
                manpowerSummary: body.manpowerSummary,
                equipmentSummary: body.equipmentSummary,
                materialSummary: body.materialSummary,
                workSummary: body.workSummary,
                progressPercent: body.progressPercent || 0,
                issues: body.issues,
                status: body.status || 'DRAFT',
                wbsTaskId: body.wbsTaskId,
                submittedBy: req.user.id,
                resources: {
                    create: body.resources?.map((r) => ({
                        tenantId: req.user.tenantId,
                        resourceType: r.resourceType,
                        quantity: r.quantity,
                        unit: r.unit,
                        notes: r.notes,
                    })) || [],
                },
            },
            include: { resources: true },
        });
        return report;
    }
    async updateSite(id, body, req) {
        const report = await this.prisma.$transaction(async (tx) => {
            if (body.resources) {
                await tx.resourceUsage.deleteMany({
                    where: { dailyReportId: id },
                });
            }
            return tx.dailyReport.update({
                where: { id },
                data: {
                    morningWeather: body.morningWeather,
                    afternoonWeather: body.afternoonWeather,
                    eveningWeather: body.eveningWeather,
                    manpowerSummary: body.manpowerSummary,
                    equipmentSummary: body.equipmentSummary,
                    materialSummary: body.materialSummary,
                    workSummary: body.workSummary,
                    progressPercent: body.progressPercent,
                    issues: body.issues,
                    status: body.status || 'SUBMITTED',
                    wbsTaskId: body.wbsTaskId,
                    resources: body.resources
                        ? {
                            create: body.resources.map((r) => ({
                                tenantId: req.user.tenantId,
                                resourceType: r.resourceType,
                                quantity: r.quantity,
                                unit: r.unit,
                                notes: r.notes,
                            })),
                        }
                        : undefined,
                },
                include: { resources: true },
            });
        });
        return report;
    }
    async list(req, projectId) {
        const where = { tenantId: req.user.tenantId };
        if (projectId)
            where.projectId = projectId;
        const reports = await this.prisma.dailyReport.findMany({
            where,
            include: {
                project: true,
                wbsTask: true,
                resources: true
            },
            orderBy: { reportDate: 'desc' },
            take: 200,
        });
        return { data: reports };
    }
    async create(req, body) {
        const report = await this.prisma.dailyReport.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                reportDate: new Date(body.reportDate),
                morningWeather: body.morningWeather,
                afternoonWeather: body.afternoonWeather,
                eveningWeather: body.eveningWeather,
                manpowerSummary: body.manpowerSummary,
                equipmentSummary: body.equipmentSummary,
                materialSummary: body.materialSummary,
                workSummary: body.workSummary,
                progressPercent: body.progressPercent || 0,
                issues: body.issues,
                status: body.status || 'DRAFT',
                wbsTaskId: body.wbsTaskId,
                siteId: body.siteId,
                submittedBy: req.user.id,
                resources: {
                    create: body.resources?.map((r) => ({
                        tenantId: req.user.tenantId,
                        resourceType: r.resourceType,
                        quantity: r.quantity,
                        unit: r.unit,
                        notes: r.notes,
                    })) || [],
                },
            },
            include: { resources: true },
        });
        return report;
    }
    async get(id, req) {
        const report = await this.prisma.dailyReport.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { resources: true, wbsTask: true },
        });
        return report;
    }
    async update(id, body, req) {
        const report = await this.prisma.$transaction(async (tx) => {
            if (body.resources) {
                await tx.resourceUsage.deleteMany({
                    where: { dailyReportId: id },
                });
            }
            return tx.dailyReport.update({
                where: { id },
                data: {
                    morningWeather: body.morningWeather,
                    afternoonWeather: body.afternoonWeather,
                    eveningWeather: body.eveningWeather,
                    manpowerSummary: body.manpowerSummary,
                    equipmentSummary: body.equipmentSummary,
                    materialSummary: body.materialSummary,
                    workSummary: body.workSummary,
                    progressPercent: body.progressPercent,
                    issues: body.issues,
                    status: body.status || 'SUBMITTED',
                    wbsTaskId: body.wbsTaskId,
                    resources: body.resources
                        ? {
                            create: body.resources.map((r) => ({
                                tenantId: req.user.tenantId,
                                resourceType: r.resourceType,
                                quantity: r.quantity,
                                unit: r.unit,
                                notes: r.notes,
                            })),
                        }
                        : undefined,
                },
                include: { resources: true },
            });
        });
        return report;
    }
    async addResource(id, body, req) {
        const resource = await this.prisma.resourceUsage.create({
            data: {
                tenantId: req.user.tenantId,
                dailyReportId: id,
                resourceType: body.resourceType,
                quantity: body.quantity,
                unit: body.unit,
                notes: body.notes,
            },
        });
        return resource;
    }
    async removeResource(id, resourceId, req) {
        await this.prisma.resourceUsage.delete({
            where: { id: resourceId },
        });
        return { success: true };
    }
    async addPhoto(id, body, req) {
        return { success: true, message: 'Photo upload endpoint - implement with file service' };
    }
    async getProgress(id, req) {
        const reports = await this.prisma.dailyReport.findMany({
            where: { projectId: id, tenantId: req.user.tenantId },
            select: { reportDate: true, workSummary: true },
            orderBy: { reportDate: 'desc' },
            take: 30,
        });
        return { data: reports };
    }
};
exports.SiteController = SiteController;
__decorate([
    (0, common_1.Get)('sites'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "listSites", null);
__decorate([
    (0, common_1.Post)('sites'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateDailyReportDto]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "createSite", null);
__decorate([
    (0, common_1.Patch)('sites/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "updateSite", null);
__decorate([
    (0, common_1.Get)('daily-reports'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('daily-reports'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateDailyReportDto]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('daily-reports/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('daily-reports/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('daily-reports/:id/resources'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "addResource", null);
__decorate([
    (0, common_1.Delete)('daily-reports/:id/resources/:resourceId'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('resourceId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "removeResource", null);
__decorate([
    (0, common_1.Post)('daily-reports/:id/photos'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "addPhoto", null);
__decorate([
    (0, common_1.Get)('sites/:id/progress'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "getProgress", null);
exports.SiteController = SiteController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SiteController);
//# sourceMappingURL=site.controller.js.map