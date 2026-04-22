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
exports.SuccessionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
let SuccessionController = class SuccessionController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const tenantId = req.user.tenantId;
        const plans = await this.prisma.successionPlan.findMany({
            where: { tenantId },
            include: {
                incumbent: true,
                candidates: {
                    include: { employee: true }
                }
            },
            orderBy: { priority: 'desc' }
        });
        return { plans };
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const [totalPlans, readyNowCount, vacantRoles] = await Promise.all([
            this.prisma.successionPlan.count({ where: { tenantId } }),
            this.prisma.successionCandidate.count({ where: { tenantId, readiness: 'READY_NOW' } }),
            this.prisma.successionPlan.count({ where: { tenantId, incumbentId: null } })
        ]);
        return {
            totalPlans,
            readyNowCount,
            vacantRoles,
            averageReadiness: 68
        };
    }
    async create(req, body) {
        const plan = await this.prisma.successionPlan.create({
            data: {
                tenantId: req.user.tenantId,
                positionName: body.positionName,
                department: body.department,
                incumbentId: body.incumbentId,
                priority: body.priority || 'MEDIUM',
                status: 'ACTIVE'
            }
        });
        return { plan };
    }
    async addCandidate(req, id, body) {
        const candidate = await this.prisma.successionCandidate.create({
            data: {
                tenantId: req.user.tenantId,
                planId: id,
                employeeId: body.employeeId,
                readiness: body.readiness,
                potentialScore: body.potentialScore || 3,
                performanceScore: body.performanceScore || 3,
                gapAnalysis: body.gapAnalysis
            }
        });
        return { candidate };
    }
    async updateCandidate(req, id, body) {
        const candidate = await this.prisma.successionCandidate.update({
            where: { id },
            data: {
                readiness: body.readiness,
                potentialScore: body.potentialScore,
                performanceScore: body.performanceScore,
                gapAnalysis: body.gapAnalysis
            }
        });
        return { candidate };
    }
};
exports.SuccessionController = SuccessionController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuccessionController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuccessionController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuccessionController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/candidates'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuccessionController.prototype, "addCandidate", null);
__decorate([
    (0, common_1.Patch)('candidates/:id'),
    (0, permissions_decorator_1.RequirePermissions)('hris.employee.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuccessionController.prototype, "updateCandidate", null);
exports.SuccessionController = SuccessionController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('hris/succession'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuccessionController);
//# sourceMappingURL=succession.controller.js.map