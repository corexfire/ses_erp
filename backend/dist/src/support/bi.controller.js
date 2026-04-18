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
exports.SupportBiController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class UpsertKpiDto {
    code;
    name;
    category;
    period;
    targetValue;
    actualValue;
    unit;
    notes;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpsertKpiDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpsertKpiDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpsertKpiDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpsertKpiDto.prototype, "period", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpsertKpiDto.prototype, "targetValue", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpsertKpiDto.prototype, "actualValue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpsertKpiDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpsertKpiDto.prototype, "notes", void 0);
let SupportBiController = class SupportBiController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(req) {
        const tenantId = req.user.tenantId;
        const [assets, docs, compliance, kpis] = await Promise.all([
            this.prisma.fixedAsset.count({ where: { tenantId } }),
            this.prisma.supportDocument.count({ where: { tenantId } }),
            this.prisma.supportCompliance.count({ where: { tenantId } }),
            this.prisma.supportKpi.findMany({
                where: { tenantId },
                orderBy: { period: 'desc' }
            })
        ]);
        const activeKpis = kpis.filter(k => k.period === '2024-Q4' || k.period === '2024-M4');
        return {
            summary: {
                totalAssets: assets,
                totalDocuments: docs,
                totalComplianceRecords: compliance,
                averageHealthScore: activeKpis.length > 0
                    ? activeKpis.reduce((acc, k) => acc + Number(k.actualValue), 0) / activeKpis.length
                    : 0
            },
            kpis: activeKpis,
            statusDistribution: {
                onTrack: kpis.filter(k => k.status === 'ON_TRACK').length,
                atRisk: kpis.filter(k => k.status === 'AT_RISK').length,
                behind: kpis.filter(k => k.status === 'BEHIND').length,
            }
        };
    }
    async getMetrics(req, category) {
        return this.prisma.supportKpi.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(category ? { category } : {})
            },
            orderBy: [
                { code: 'asc' },
                { period: 'asc' }
            ]
        });
    }
    async upsertKpi(req, body) {
        const status = (body.actualValue ?? 0) >= body.targetValue ? 'ON_TRACK' :
            (body.actualValue ?? 0) >= body.targetValue * 0.9 ? 'AT_RISK' : 'BEHIND';
        return this.prisma.supportKpi.upsert({
            where: {
                tenantId_code_period: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    period: body.period
                }
            },
            update: {
                ...body,
                status
            },
            create: {
                tenantId: req.user.tenantId,
                ...body,
                status
            }
        });
    }
    async deleteKpi(id, req) {
        return this.prisma.supportKpi.delete({
            where: { id, tenantId: req.user.tenantId }
        });
    }
};
exports.SupportBiController = SupportBiController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupportBiController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SupportBiController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpsertKpiDto]),
    __metadata("design:returntype", Promise)
], SupportBiController.prototype, "upsertKpi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupportBiController.prototype, "deleteKpi", null);
exports.SupportBiController = SupportBiController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('support/bi'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportBiController);
//# sourceMappingURL=bi.controller.js.map