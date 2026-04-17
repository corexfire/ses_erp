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
exports.FiscalYearsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_fiscal_year_dto_1 = require("./dto/create-fiscal-year.dto");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
let FiscalYearsController = class FiscalYearsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req) {
        const fiscalYears = await this.prisma.fiscalYear.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ startDate: 'desc' }],
            include: { periods: true },
        });
        return { fiscalYears };
    }
    async create(req, body) {
        const fiscalYear = await this.prisma.fiscalYear.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                startDate: body.startDate,
                endDate: body.endDate,
            },
        });
        const periods = [];
        let cursor = new Date(body.startDate);
        cursor = new Date(cursor.getFullYear(), cursor.getMonth(), 1, 0, 0, 0, 0);
        const end = new Date(body.endDate);
        let periodNo = 1;
        while (cursor <= end) {
            const pStart = new Date(cursor);
            const pEnd = endOfMonth(cursor);
            periods.push({
                tenantId: req.user.tenantId,
                fiscalYearId: fiscalYear.id,
                periodNo,
                startDate: pStart,
                endDate: pEnd > end ? end : pEnd,
            });
            periodNo += 1;
            cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1, 0, 0, 0, 0);
        }
        if (periods.length > 0) {
            await this.prisma.accountingPeriod.createMany({ data: periods });
        }
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'FiscalYear',
            entityId: fiscalYear.id,
            metadata: { periods: periods.length },
        });
        return { fiscalYear };
    }
    async close(req, id) {
        const fiscalYear = await this.prisma.fiscalYear.update({
            where: { id },
            data: { isClosed: true, isActive: false },
        });
        await this.prisma.accountingPeriod.updateMany({
            where: { tenantId: req.user.tenantId, fiscalYearId: id },
            data: { isOpen: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'close',
            entity: 'FiscalYear',
            entityId: fiscalYear.id,
        });
        return { fiscalYear };
    }
};
exports.FiscalYearsController = FiscalYearsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.fiscal_year.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FiscalYearsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('core.fiscal_year.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_fiscal_year_dto_1.CreateFiscalYearDto]),
    __metadata("design:returntype", Promise)
], FiscalYearsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/close'),
    (0, permissions_decorator_1.RequirePermissions)('core.fiscal_year.close'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FiscalYearsController.prototype, "close", null);
exports.FiscalYearsController = FiscalYearsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/fiscal-years'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], FiscalYearsController);
//# sourceMappingURL=fiscal-years.controller.js.map