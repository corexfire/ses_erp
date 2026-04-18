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
exports.CurrenciesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_currency_dto_1 = require("./dto/create-currency.dto");
const create_exchange_rate_dto_1 = require("./dto/create-exchange-rate.dto");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
let CurrenciesController = class CurrenciesController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listCurrencies(req) {
        const currencies = await this.prisma.currency.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ isBase: 'desc' }, { code: 'asc' }],
        });
        return { currencies };
    }
    async createCurrency(req, body) {
        const currency = await this.prisma.currency.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                symbol: body.symbol,
                isBase: body.isBase ?? false,
            },
        });
        if (currency.isBase) {
            await this.prisma.currency.updateMany({
                where: { tenantId: req.user.tenantId, NOT: { id: currency.id } },
                data: { isBase: false },
            });
        }
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Currency',
            entityId: currency.id,
        });
        return { currency };
    }
    async deactivateCurrency(req, id) {
        const currency = await this.prisma.currency.update({
            where: { id },
            data: { isActive: false, isBase: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'Currency',
            entityId: currency.id,
        });
        return { currency };
    }
    async listRates(req) {
        const exchangeRates = await this.prisma.exchangeRate.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ rateDate: 'desc' }],
            include: { baseCurrency: true, quoteCurrency: true },
            take: 200,
        });
        return { exchangeRates };
    }
    async createRate(req, body) {
        const exchangeRate = await this.prisma.exchangeRate.create({
            data: {
                tenantId: req.user.tenantId,
                baseCurrencyId: body.baseCurrencyId,
                quoteCurrencyId: body.quoteCurrencyId,
                rate: body.rate,
                rateDate: body.rateDate,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'ExchangeRate',
            entityId: exchangeRate.id,
        });
        return { exchangeRate };
    }
};
exports.CurrenciesController = CurrenciesController;
__decorate([
    (0, common_1.Get)('currencies'),
    (0, permissions_decorator_1.RequirePermissions)('core.currency.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CurrenciesController.prototype, "listCurrencies", null);
__decorate([
    (0, common_1.Post)('currencies'),
    (0, permissions_decorator_1.RequirePermissions)('core.currency.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_currency_dto_1.CreateCurrencyDto]),
    __metadata("design:returntype", Promise)
], CurrenciesController.prototype, "createCurrency", null);
__decorate([
    (0, common_1.Patch)('currencies/:id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('core.currency.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CurrenciesController.prototype, "deactivateCurrency", null);
__decorate([
    (0, common_1.Get)('exchange-rates'),
    (0, permissions_decorator_1.RequirePermissions)('core.exchange_rate.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CurrenciesController.prototype, "listRates", null);
__decorate([
    (0, common_1.Post)('exchange-rates'),
    (0, permissions_decorator_1.RequirePermissions)('core.exchange_rate.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_exchange_rate_dto_1.CreateExchangeRateDto]),
    __metadata("design:returntype", Promise)
], CurrenciesController.prototype, "createRate", null);
exports.CurrenciesController = CurrenciesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CurrenciesController);
//# sourceMappingURL=currencies.controller.js.map