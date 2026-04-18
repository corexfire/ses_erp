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
exports.SupportSustainabilityController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class CreateSustRecordDto {
    code;
    type;
    indicator;
    period;
    value;
    target;
    unit;
    description;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSustRecordDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSustRecordDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSustRecordDto.prototype, "indicator", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSustRecordDto.prototype, "period", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSustRecordDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSustRecordDto.prototype, "target", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSustRecordDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSustRecordDto.prototype, "description", void 0);
let SupportSustainabilityController = class SupportSustainabilityController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listRecords(req, type, period) {
        return this.prisma.supportSustainability.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(type ? { type } : {}),
                ...(period ? { period } : {}),
            },
            include: {
                recordedBy: { select: { firstName: true, lastName: true, employeeNo: true } },
                verifiedBy: { select: { firstName: true, lastName: true, employeeNo: true } }
            },
            orderBy: { period: 'desc' }
        });
    }
    async getStats(req) {
        const tenantId = req.user.tenantId;
        const records = await this.prisma.supportSustainability.findMany({
            where: { tenantId }
        });
        const carbonRecords = records.filter(r => r.type === 'EMISSION');
        const energyRecords = records.filter(r => r.type === 'ENERGY');
        return {
            carbonPulse: {
                totalEmissions: carbonRecords.reduce((sum, r) => sum + Number(r.value), 0),
                targetEmissions: carbonRecords.reduce((sum, r) => sum + Number(r.target), 0),
                trend: carbonRecords.length > 1 ? 'DECREASING' : 'STABLE'
            },
            energyMix: {
                renewableKwh: energyRecords.reduce((sum, r) => sum + Number(r.value), 0),
                targetKwh: energyRecords.reduce((sum, r) => sum + Number(r.target), 0),
            },
            verificationStatus: {
                verified: records.filter(r => r.status === 'VERIFIED').length,
                submitted: records.filter(r => r.status === 'SUBMITTED').length,
                draft: records.filter(r => r.status === 'DRAFT').length,
            }
        };
    }
    async createRecord(req, body) {
        return this.prisma.supportSustainability.create({
            data: {
                tenantId: req.user.tenantId,
                ...body,
                status: 'SUBMITTED'
            }
        });
    }
    async verifyRecord(id, req) {
        return this.prisma.supportSustainability.update({
            where: { id, tenantId: req.user.tenantId },
            data: {
                status: 'VERIFIED',
            }
        });
    }
    async updateRecord(id, req, body) {
        return this.prisma.supportSustainability.update({
            where: { id, tenantId: req.user.tenantId },
            data: body
        });
    }
    async deleteRecord(id, req) {
        return this.prisma.supportSustainability.delete({
            where: { id, tenantId: req.user.tenantId }
        });
    }
};
exports.SupportSustainabilityController = SupportSustainabilityController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SupportSustainabilityController.prototype, "listRecords", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupportSustainabilityController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateSustRecordDto]),
    __metadata("design:returntype", Promise)
], SupportSustainabilityController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Patch)(':id/verify'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupportSustainabilityController.prototype, "verifyRecord", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SupportSustainabilityController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupportSustainabilityController.prototype, "deleteRecord", null);
exports.SupportSustainabilityController = SupportSustainabilityController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('support/sustainability'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportSustainabilityController);
//# sourceMappingURL=sustainability.controller.js.map