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
exports.HseController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let HseController = class HseController {
    prisma;
    notification;
    constructor(prisma, notification) {
        this.prisma = prisma;
        this.notification = notification;
    }
    async list(req, projectId, type, category) {
        const tenantId = req.user.tenantId;
        const where = { tenantId };
        if (projectId)
            where.projectId = projectId;
        if (category === 'INSPECTION') {
            const data = await this.prisma.hseInspection.findMany({
                where,
                include: { project: true },
                orderBy: { inspectionDate: 'desc' },
            });
            return { data };
        }
        const data = await this.prisma.hseIncident.findMany({
            where,
            include: { project: true },
            orderBy: { incidentDate: 'desc' },
        });
        return { data };
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const [totalIncidents, openIncidents, avgScore, fatalIncidents] = await Promise.all([
            this.prisma.hseIncident.count({ where: { tenantId } }),
            this.prisma.hseIncident.count({ where: { tenantId, status: 'OPEN' } }),
            this.prisma.hseInspection.aggregate({
                where: { tenantId },
                _avg: { score: true }
            }),
            this.prisma.hseIncident.findMany({
                where: { tenantId, severity: 'FATAL' },
                orderBy: { incidentDate: 'desc' },
                take: 1,
            }),
        ]);
        const lastFatalDate = fatalIncidents.length > 0 ? fatalIncidents[0].incidentDate : new Date(0);
        const [attendanceHours, subconLogs] = await Promise.all([
            this.prisma.attendance.aggregate({
                where: { tenantId, date: { gt: lastFatalDate } },
                _sum: { workHours: true },
            }),
            this.prisma.subcontractorLog.aggregate({
                where: { tenantId, dailyReport: { reportDate: { gt: lastFatalDate } } },
                _sum: { workerCount: true },
            }),
        ]);
        const totalAttendance = Number(attendanceHours._sum.workHours || 0);
        const totalSubcon = Number(subconLogs._sum.workerCount || 0) * 8;
        return {
            totalIncidents,
            openIncidents,
            avgScore: Number(avgScore._avg.score || 0),
            fatalCount: await this.prisma.hseIncident.count({ where: { tenantId, severity: 'FATAL' } }),
            safeManHours: totalAttendance + totalSubcon,
        };
    }
    async createIncident(req, body) {
        const incident = await this.prisma.hseIncident.create({
            data: {
                ...body,
                tenantId: req.user.tenantId,
                incidentDate: new Date(body.incidentDate),
            },
        });
        if (['FATAL', 'MAJOR'].includes(incident.severity)) {
            await this.notification.triggerEvent({
                tenantId: req.user.tenantId,
                actorUserId: req.user.id,
                eventKey: 'hse.incident_high_severity',
                recipients: [{
                        title: `⚠️ CRITICAL HSE INCIDENT: ${incident.type}`,
                        message: `A ${incident.severity} incident has been reported: ${incident.description}. Location: ${incident.location || 'N/A'}`
                    }],
                payload: { incidentId: incident.id, severity: incident.severity }
            });
        }
        return incident;
    }
    async createInspection(req, body) {
        return this.prisma.hseInspection.create({
            data: {
                ...body,
                tenantId: req.user.tenantId,
                inspectionDate: new Date(body.inspectionDate),
            },
        });
    }
    async updateIncident(id, body) {
        return this.prisma.hseIncident.update({
            where: { id },
            data: {
                ...body,
                incidentDate: body.incidentDate ? new Date(body.incidentDate) : undefined,
            },
        });
    }
    async updateInspection(id, body) {
        return this.prisma.hseInspection.update({
            where: { id },
            data: {
                ...body,
                inspectionDate: body.inspectionDate ? new Date(body.inspectionDate) : undefined,
            },
        });
    }
    async removeIncident(id) {
        return this.prisma.hseIncident.delete({ where: { id } });
    }
    async removeInspection(id) {
        return this.prisma.hseInspection.delete({ where: { id } });
    }
};
exports.HseController = HseController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('incident'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "createIncident", null);
__decorate([
    (0, common_1.Post)('inspection'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "createInspection", null);
__decorate([
    (0, common_1.Patch)('incident/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "updateIncident", null);
__decorate([
    (0, common_1.Patch)('inspection/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "updateInspection", null);
__decorate([
    (0, common_1.Delete)('incident/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "removeIncident", null);
__decorate([
    (0, common_1.Delete)('inspection/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.site.execute'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HseController.prototype, "removeInspection", null);
exports.HseController = HseController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('construction/hse'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], HseController);
//# sourceMappingURL=hse.controller.js.map