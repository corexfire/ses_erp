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
exports.CompanyProfileController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const upsert_company_profile_dto_1 = require("./dto/upsert-company-profile.dto");
const audit_service_1 = require("../../audit/audit.service");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
let CompanyProfileController = class CompanyProfileController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async get(req) {
        const companyProfile = await this.prisma.companyProfile.findUnique({
            where: { tenantId: req.user.tenantId },
        });
        return { companyProfile };
    }
    async upsert(req, body) {
        const companyProfile = await this.prisma.companyProfile.upsert({
            where: { tenantId: req.user.tenantId },
            update: {
                legalName: body.legalName,
                tradeName: body.tradeName,
                npwp: body.npwp,
                email: body.email,
                phone: body.phone,
                address1: body.address1,
                address2: body.address2,
                city: body.city,
                province: body.province,
                postalCode: body.postalCode,
                countryCode: body.countryCode ?? 'ID',
            },
            create: {
                tenantId: req.user.tenantId,
                legalName: body.legalName,
                tradeName: body.tradeName,
                npwp: body.npwp,
                email: body.email,
                phone: body.phone,
                address1: body.address1,
                address2: body.address2,
                city: body.city,
                province: body.province,
                postalCode: body.postalCode,
                countryCode: body.countryCode ?? 'ID',
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'upsert',
            entity: 'CompanyProfile',
            entityId: companyProfile.id,
        });
        return { companyProfile };
    }
};
exports.CompanyProfileController = CompanyProfileController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.company.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyProfileController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    (0, permissions_decorator_1.RequirePermissions)('core.company.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_company_profile_dto_1.UpsertCompanyProfileDto]),
    __metadata("design:returntype", Promise)
], CompanyProfileController.prototype, "upsert", null);
exports.CompanyProfileController = CompanyProfileController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/company-profile'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CompanyProfileController);
//# sourceMappingURL=company-profile.controller.js.map