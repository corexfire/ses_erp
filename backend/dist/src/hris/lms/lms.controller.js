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
exports.HrisLmsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let HrisLmsController = class HrisLmsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async getCourses(req, search) {
        const user = req.user;
        const where = { tenantId: user.tenantId };
        if (search) {
            where.OR = [
                { code: { contains: search, mode: 'insensitive' } },
                { title: { contains: search, mode: 'insensitive' } },
            ];
        }
        const courses = await this.prisma.course.findMany({
            where,
            include: {
                _count: { select: { enrollments: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        const enrollmentsAgg = await this.prisma.courseEnrollment.groupBy({
            by: ['status'],
            _count: { status: true },
            where: { tenantId: user.tenantId }
        });
        const countEnrolled = enrollmentsAgg.reduce((sum, item) => sum + (item._count?.status || 0), 0);
        const countCompleted = enrollmentsAgg.find(e => e.status === 'COMPLETED')?._count?.status || 0;
        const countFailed = enrollmentsAgg.find(e => e.status === 'FAILED')?._count?.status || 0;
        const summary = {
            totalCourses: courses.length,
            totalEnrollments: countEnrolled,
            completionRate: countEnrolled ? (countCompleted / countEnrolled) * 100 : 0,
            failedCount: countFailed
        };
        return { data: courses, summary };
    }
    async getEnrollments(req, courseId) {
        const user = req.user;
        const where = { tenantId: user.tenantId };
        if (courseId) {
            where.courseId = courseId;
        }
        const payload = await this.prisma.courseEnrollment.findMany({
            where,
            include: {
                employee: { select: { firstName: true, lastName: true, employeeNo: true, department: true } },
                course: { select: { title: true, code: true } }
            },
            orderBy: { enrolledAt: 'desc' }
        });
        return { data: payload };
    }
    async createCourse(req, body) {
        const user = req.user;
        const code = body.code || `CRS-${Date.now().toString().slice(-6)}`;
        const created = await this.prisma.course.create({
            data: {
                tenantId: user.tenantId,
                code,
                title: body.title,
                description: body.description || '',
                durationHours: Number(body.durationHours) || 1,
                mandatory: Boolean(body.mandatory),
                category: body.category || 'TECHNICAL',
                status: body.status || 'ACTIVE'
            }
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'CREATE', entity: 'Course', entityId: created.id, });
        return { message: 'Training Course registered successfully', data: created };
    }
    async enrollEmployee(req, body) {
        const user = req.user;
        let score = null;
        let completedAt = null;
        let status = body.status || 'ENROLLED';
        if (body.score !== undefined && body.score !== '') {
            score = Number(body.score);
            if (score >= 70) {
                status = 'COMPLETED';
                completedAt = new Date();
            }
            else if (score < 70 && status !== 'IN_PROGRESS') {
                status = 'FAILED';
                completedAt = new Date();
            }
        }
        let record;
        if (body.id) {
            record = await this.prisma.courseEnrollment.update({
                where: { id: body.id },
                data: {
                    status, score, completedAt, notes: body.notes
                }
            });
        }
        else {
            record = await this.prisma.courseEnrollment.create({
                data: {
                    tenantId: user.tenantId,
                    courseId: body.courseId,
                    employeeId: body.employeeId,
                    status,
                    score,
                    completedAt,
                    notes: body.notes
                },
            });
        }
        return { message: 'Enrollment process success.', data: record };
    }
    async getLookups(req) {
        const user = req.user;
        const employees = await this.prisma.employee.findMany({
            where: { tenantId: user.tenantId, status: 'ACTIVE' },
            select: { id: true, firstName: true, lastName: true, employeeNo: true }
        });
        return { data: { employees } };
    }
};
exports.HrisLmsController = HrisLmsController;
__decorate([
    (0, common_1.Get)('courses'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HrisLmsController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)('enrollments'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HrisLmsController.prototype, "getEnrollments", null);
__decorate([
    (0, common_1.Post)('course'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrisLmsController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Post)('enroll'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrisLmsController.prototype, "enrollEmployee", null);
__decorate([
    (0, common_1.Get)('lookups'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HrisLmsController.prototype, "getLookups", null);
exports.HrisLmsController = HrisLmsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/lms'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], HrisLmsController);
//# sourceMappingURL=lms.controller.js.map