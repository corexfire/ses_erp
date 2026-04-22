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
exports.HrisProductivityController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let HrisProductivityController = class HrisProductivityController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listTimesheets(req, employeeId, date) {
        const where = { tenantId: req.user.tenantId };
        if (employeeId)
            where.employeeId = employeeId;
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            where.date = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }
        const timesheets = await this.prisma.timesheetEntry.findMany({
            where,
            include: { employee: true },
            orderBy: { date: 'desc' },
        });
        return { timesheets };
    }
    async createTimesheet(req, body) {
        const timesheet = await this.prisma.timesheetEntry.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                date: new Date(body.date),
                hours: body.hours,
                description: body.description,
                project: body.project,
            },
        });
        return { timesheet };
    }
    async listDocuments(req, employeeId) {
        const where = { tenantId: req.user.tenantId };
        if (employeeId)
            where.employeeId = employeeId;
        const documents = await this.prisma.employeeDocument.findMany({
            where,
            include: { employee: true },
            orderBy: { createdAt: 'desc' },
        });
        return { documents };
    }
    async createDocument(req, body) {
        const document = await this.prisma.employeeDocument.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                name: body.name,
                fileUrl: body.fileUrl,
                type: body.type,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
            },
        });
        return { document };
    }
};
exports.HrisProductivityController = HrisProductivityController;
__decorate([
    (0, common_1.Get)('timesheets'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('employeeId')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], HrisProductivityController.prototype, "listTimesheets", null);
__decorate([
    (0, common_1.Post)('timesheets'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrisProductivityController.prototype, "createTimesheet", null);
__decorate([
    (0, common_1.Get)('documents'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HrisProductivityController.prototype, "listDocuments", null);
__decorate([
    (0, common_1.Post)('documents'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrisProductivityController.prototype, "createDocument", null);
exports.HrisProductivityController = HrisProductivityController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/productivity'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HrisProductivityController);
//# sourceMappingURL=productivity.controller.js.map