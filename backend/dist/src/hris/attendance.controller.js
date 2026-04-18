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
exports.ShiftController = exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let AttendanceController = class AttendanceController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, date) {
        const where = { tenantId: req.user.tenantId };
        if (date)
            where.date = { gte: new Date(date), lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) };
        const attendances = await this.prisma.attendance.findMany({
            where,
            include: { employee: true },
            orderBy: [{ date: 'desc' }],
        });
        return { attendances };
    }
    async summary(req, startDate, endDate) {
        const attendances = await this.prisma.attendance.findMany({
            where: {
                tenantId: req.user.tenantId,
                date: { gte: new Date(startDate), lte: new Date(endDate) },
            },
            include: { employee: true },
        });
        const summary = {
            present: attendances.filter(a => a.status === 'PRESENT').length,
            absent: attendances.filter(a => a.status === 'ABSENT').length,
            late: attendances.filter(a => a.status === 'LATE').length,
            leave: attendances.filter(a => a.status === 'LEAVE').length,
        };
        return { attendances, summary };
    }
    async create(req, body) {
        const workHours = body.checkIn && body.checkOut ? 8 : 0;
        const attendance = await this.prisma.attendance.create({
            data: {
                tenantId: req.user.tenantId,
                employeeId: body.employeeId,
                date: new Date(body.date),
                checkIn: body.checkIn ? new Date(body.checkIn) : null,
                checkOut: body.checkOut ? new Date(body.checkOut) : null,
                workHours,
                status: body.status || 'PRESENT',
                notes: body.notes,
            },
            include: { employee: true },
        });
        return { attendance };
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.attendance.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('summary'),
    (0, permissions_decorator_1.RequirePermissions)('hris.attendance.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "summary", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.attendance.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/attendance'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceController);
let ShiftController = class ShiftController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const shifts = await this.prisma.shift.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ name: 'asc' }],
        });
        return { shifts };
    }
    async create(req, body) {
        const shift = await this.prisma.shift.create({
            data: {
                tenantId: req.user.tenantId,
                name: body.name,
                code: body.code,
                startTime: body.startTime,
                endTime: body.endTime,
                isFlexi: body.isFlexi || false,
                isActive: true,
            },
        });
        return { shift };
    }
    async update(req, id, body) {
        const shift = await this.prisma.shift.update({
            where: { id },
            data: { ...(body.isActive !== undefined && { isActive: body.isActive }) },
        });
        return { shift };
    }
};
exports.ShiftController = ShiftController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.shift.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.shift.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.shift.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ShiftController.prototype, "update", null);
exports.ShiftController = ShiftController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/shift'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShiftController);
//# sourceMappingURL=attendance.controller.js.map