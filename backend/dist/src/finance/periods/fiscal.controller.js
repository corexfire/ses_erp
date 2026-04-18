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
exports.PeriodController = exports.FiscalController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let FiscalController = class FiscalController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const years = await this.prisma.fiscalYear.findMany({
            where: { tenantId: req.user.tenantId },
            include: { periods: { orderBy: [{ periodNo: 'asc' }] } },
        });
        return { fiscalYears: years };
    }
    async create(req, body) {
        const year = await this.prisma.fiscalYear.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                isActive: true,
                periods: {
                    create: Array.from({ length: 12 }, (_, i) => {
                        const start = new Date(body.startDate);
                        start.setMonth(start.getMonth() + i);
                        const end = new Date(start);
                        end.setMonth(end.getMonth() + 1);
                        end.setDate(end.getDate() - 1);
                        return {
                            tenantId: req.user.tenantId,
                            fiscalYearId: '',
                            periodNo: i + 1,
                            startDate: start,
                            endDate: end,
                            isOpen: true,
                        };
                    }),
                },
            },
            include: { periods: true },
        });
        return { fiscalYear: year };
    }
    async close(id) {
        const year = await this.prisma.fiscalYear.update({
            where: { id },
            data: { isClosed: true },
        });
        await this.prisma.accountingPeriod.updateMany({
            where: { fiscalYearId: id },
            data: { isOpen: false },
        });
        return { fiscalYear: year };
    }
};
exports.FiscalController = FiscalController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.fiscal.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FiscalController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.fiscal.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FiscalController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/close'),
    (0, permissions_decorator_1.RequirePermissions)('finance.fiscal.close'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FiscalController.prototype, "close", null);
exports.FiscalController = FiscalController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/fiscal'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FiscalController);
let PeriodController = class PeriodController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const periods = await this.prisma.accountingPeriod.findMany({
            where: { tenantId: req.user.tenantId },
            include: { fiscalYear: true },
            orderBy: [{ startDate: 'desc' }],
        });
        return { periods };
    }
    async close(id) {
        const period = await this.prisma.accountingPeriod.update({
            where: { id },
            data: { isOpen: false },
        });
        return { period };
    }
    async open(id) {
        const period = await this.prisma.accountingPeriod.update({
            where: { id },
            data: { isOpen: true },
        });
        return { period };
    }
};
exports.PeriodController = PeriodController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.period.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PeriodController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':id/close'),
    (0, permissions_decorator_1.RequirePermissions)('finance.period.close'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeriodController.prototype, "close", null);
__decorate([
    (0, common_1.Post)(':id/open'),
    (0, permissions_decorator_1.RequirePermissions)('finance.period.open'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeriodController.prototype, "open", null);
exports.PeriodController = PeriodController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/periods'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeriodController);
//# sourceMappingURL=fiscal.controller.js.map