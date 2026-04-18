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
exports.SupportComplianceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
class CreateComplianceDto {
    code;
    title;
    type;
    category;
    issuingBody;
    status;
    effectiveDate;
    expiryDate;
    lastAuditDate;
    nextAuditDate;
    riskLevel;
    ownerId;
    departmentId;
    documentId;
    description;
    notes;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "issuingBody", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "effectiveDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "expiryDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "lastAuditDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "nextAuditDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "riskLevel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "departmentId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "documentId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateComplianceDto.prototype, "notes", void 0);
let SupportComplianceController = class SupportComplianceController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listCompliance(req, type, status, riskLevel) {
        return this.prisma.supportCompliance.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(type ? { type } : {}),
                ...(status ? { status } : {}),
                ...(riskLevel ? { riskLevel } : {}),
            },
            include: {
                owner: { select: { firstName: true, lastName: true, employeeNo: true } },
                department: { select: { name: true, code: true } }
            },
            orderBy: { code: 'asc' }
        });
    }
    async getStats(req) {
        const records = await this.prisma.supportCompliance.findMany({
            where: { tenantId: req.user.tenantId }
        });
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        return {
            total: records.length,
            active: records.filter(r => r.status === 'ACTIVE').length,
            expiringSoon: records.filter(r => r.expiryDate && r.expiryDate > now && r.expiryDate <= thirtyDaysFromNow).length,
            expired: records.filter(r => r.expiryDate && r.expiryDate <= now).length,
            highRisk: records.filter(r => r.riskLevel === 'HIGH' || r.riskLevel === 'CRITICAL').length,
        };
    }
    async getRecord(id, req) {
        return this.prisma.supportCompliance.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                owner: true,
                department: true,
            }
        });
    }
    async createRecord(req, body) {
        return this.prisma.supportCompliance.create({
            data: {
                tenantId: req.user.tenantId,
                ...body,
                effectiveDate: body.effectiveDate ? new Date(body.effectiveDate) : undefined,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
                lastAuditDate: body.lastAuditDate ? new Date(body.lastAuditDate) : undefined,
                nextAuditDate: body.nextAuditDate ? new Date(body.nextAuditDate) : undefined,
            }
        });
    }
    async updateRecord(id, req, body) {
        const data = { ...body };
        if (body.effectiveDate)
            data.effectiveDate = new Date(body.effectiveDate);
        if (body.expiryDate)
            data.expiryDate = new Date(body.expiryDate);
        if (body.lastAuditDate)
            data.lastAuditDate = new Date(body.lastAuditDate);
        if (body.nextAuditDate)
            data.nextAuditDate = new Date(body.nextAuditDate);
        return this.prisma.supportCompliance.update({
            where: { id, tenantId: req.user.tenantId },
            data
        });
    }
    async deleteRecord(id, req) {
        return this.prisma.supportCompliance.delete({
            where: { id, tenantId: req.user.tenantId }
        });
    }
};
exports.SupportComplianceController = SupportComplianceController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('riskLevel')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], SupportComplianceController.prototype, "listCompliance", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupportComplianceController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupportComplianceController.prototype, "getRecord", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateComplianceDto]),
    __metadata("design:returntype", Promise)
], SupportComplianceController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SupportComplianceController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('quality.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SupportComplianceController.prototype, "deleteRecord", null);
exports.SupportComplianceController = SupportComplianceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('support/compliance'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportComplianceController);
//# sourceMappingURL=compliance.controller.js.map