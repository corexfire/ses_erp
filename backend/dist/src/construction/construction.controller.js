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
exports.ConstructionController = exports.CreateConstructionReportDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateConstructionReportDto {
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
    safetySummary;
    incidentSummary;
    visitorSummary;
    ownerInstructions;
    status;
    wbsTaskId;
    siteManagerId;
    hseOfficerId;
    resources;
    photos;
    subcontractors;
}
exports.CreateConstructionReportDto = CreateConstructionReportDto;
let ConstructionController = class ConstructionController {
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
                { workSummary: { contains: q, mode: 'insensitive' } },
                { project: { name: { contains: q, mode: 'insensitive' } } },
            ];
        }
        const reports = await this.prisma.dailyReport.findMany({
            where,
            include: {
                project: true,
                wbsTask: true,
                siteManager: true,
                hseOfficer: true,
                resources: true,
                photos: true,
                subcontractors: true
            },
            orderBy: { reportDate: 'desc' },
            take: 100,
        });
        return { data: reports };
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const [total, pending, approved] = await Promise.all([
            this.prisma.dailyReport.count({ where: { tenantId } }),
            this.prisma.dailyReport.count({ where: { tenantId, status: 'SUBMITTED' } }),
            this.prisma.dailyReport.count({ where: { tenantId, status: 'APPROVED' } }),
        ]);
        return { total, pending, approved };
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
                safetySummary: body.safetySummary,
                incidentSummary: body.incidentSummary,
                visitorSummary: body.visitorSummary,
                ownerInstructions: body.ownerInstructions,
                status: body.status || 'DRAFT',
                wbsTaskId: body.wbsTaskId,
                siteManagerId: body.siteManagerId,
                hseOfficerId: body.hseOfficerId,
                submittedBy: req.user.id,
                resources: {
                    create: body.resources?.map(r => ({
                        tenantId: req.user.tenantId,
                        resourceType: r.resourceType,
                        quantity: r.quantity,
                        unit: r.unit,
                        notes: r.notes,
                    })) || [],
                },
                photos: {
                    create: body.photos?.map(p => ({
                        tenantId: req.user.tenantId,
                        fileId: p.fileId,
                        caption: p.caption,
                        category: p.category,
                    })) || [],
                },
                subcontractors: {
                    create: body.subcontractors?.map(s => ({
                        tenantId: req.user.tenantId,
                        subcontractorName: s.subcontractorName,
                        workerCount: s.workerCount,
                        workDescription: s.workDescription,
                    })) || [],
                },
            },
            include: { resources: true, photos: true, subcontractors: true },
        });
        return report;
    }
    async update(id, body, req) {
        return this.prisma.$transaction(async (tx) => {
            if (body.resources) {
                await tx.resourceUsage.deleteMany({ where: { dailyReportId: id } });
            }
            if (body.photos) {
                await tx.sitePhoto.deleteMany({ where: { dailyReportId: id } });
            }
            if (body.subcontractors) {
                await tx.subcontractorLog.deleteMany({ where: { dailyReportId: id } });
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
                    safetySummary: body.safetySummary,
                    incidentSummary: body.incidentSummary,
                    visitorSummary: body.visitorSummary,
                    ownerInstructions: body.ownerInstructions,
                    status: body.status,
                    wbsTaskId: body.wbsTaskId,
                    siteManagerId: body.siteManagerId,
                    hseOfficerId: body.hseOfficerId,
                    resources: body.resources ? {
                        create: body.resources.map(r => ({
                            tenantId: req.user.tenantId,
                            resourceType: r.resourceType,
                            quantity: r.quantity,
                            unit: r.unit,
                            notes: r.notes,
                        })),
                    } : undefined,
                    photos: body.photos ? {
                        create: body.photos.map(p => ({
                            tenantId: req.user.tenantId,
                            fileId: p.fileId,
                            caption: p.caption,
                            category: p.category,
                        })),
                    } : undefined,
                    subcontractors: body.subcontractors ? {
                        create: body.subcontractors.map(s => ({
                            tenantId: req.user.tenantId,
                            subcontractorName: s.subcontractorName,
                            workerCount: s.workerCount,
                            workDescription: s.workDescription,
                        })),
                    } : undefined,
                },
                include: { resources: true, photos: true, subcontractors: true },
            });
        });
    }
    async remove(id) {
        await this.prisma.dailyReport.delete({ where: { id } });
        return { success: true };
    }
};
exports.ConstructionController = ConstructionController;
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
], ConstructionController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConstructionController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateConstructionReportDto]),
    __metadata("design:returntype", Promise)
], ConstructionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ConstructionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConstructionController.prototype, "remove", null);
exports.ConstructionController = ConstructionController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('construction/sites'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConstructionController);
//# sourceMappingURL=construction.controller.js.map