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
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_discount_rule_dto_1 = require("./dto/create-discount-rule.dto");
const create_price_list_dto_1 = require("./dto/create-price-list.dto");
const create_price_rule_dto_1 = require("./dto/create-price-rule.dto");
const update_discount_rule_dto_1 = require("./dto/update-discount-rule.dto");
const update_price_list_dto_1 = require("./dto/update-price-list.dto");
const update_price_rule_dto_1 = require("./dto/update-price-rule.dto");
let PricingController = class PricingController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listPriceLists(req, q) {
        const priceLists = await this.prisma.priceList.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { items: { orderBy: [{ effectiveDate: 'desc' }] } },
            take: 200,
        });
        return { priceLists };
    }
    async getPriceList(req, id) {
        const priceList = await this.prisma.priceList.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { items: { orderBy: [{ effectiveDate: 'desc' }] } },
        });
        if (!priceList)
            throw new common_1.NotFoundException('Price list not found');
        return { priceList };
    }
    async createPriceList(req, body) {
        const priceList = await this.prisma.$transaction(async (tx) => {
            const pl = await tx.priceList.create({
                data: { tenantId: req.user.tenantId, code: body.code, name: body.name },
            });
            if (body.items && body.items.length > 0) {
                await tx.priceListItem.createMany({
                    data: body.items.map((it) => ({
                        tenantId: req.user.tenantId,
                        priceListId: pl.id,
                        itemCode: it.itemCode,
                        uomCode: it.uomCode,
                        unitPrice: it.unitPrice,
                        effectiveDate: new Date(it.effectiveDate),
                        endDate: it.endDate ? new Date(it.endDate) : undefined,
                        customerId: it.customerId,
                    })),
                });
            }
            return pl;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'PriceList',
            entityId: priceList.id,
        });
        return { priceList };
    }
    async updatePriceList(req, id, body) {
        const exists = await this.prisma.priceList.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Price list not found');
        const priceList = await this.prisma.$transaction(async (tx) => {
            const pl = await tx.priceList.update({
                where: { id },
                data: { name: body.name ?? undefined },
            });
            if (body.items) {
                await tx.priceListItem.deleteMany({
                    where: { tenantId: req.user.tenantId, priceListId: id },
                });
                if (body.items.length > 0) {
                    await tx.priceListItem.createMany({
                        data: body.items.map((it) => ({
                            tenantId: req.user.tenantId,
                            priceListId: id,
                            itemCode: it.itemCode,
                            uomCode: it.uomCode,
                            unitPrice: it.unitPrice,
                            effectiveDate: new Date(it.effectiveDate),
                            endDate: it.endDate ? new Date(it.endDate) : undefined,
                            customerId: it.customerId,
                        })),
                    });
                }
            }
            return pl;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'PriceList',
            entityId: priceList.id,
        });
        return { priceList };
    }
    async listPriceRules(req, q, isActive) {
        const priceRules = await this.prisma.priceRule.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(typeof isActive === 'string'
                    ? { isActive: isActive === 'true' }
                    : {}),
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                            { itemCode: { contains: q, mode: 'insensitive' } },
                            { customerGroup: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [
                { isActive: 'desc' },
                { priority: 'asc' },
                { createdAt: 'desc' },
            ],
            include: { customer: true },
            take: 200,
        });
        return { priceRules };
    }
    async getPriceRule(req, id) {
        const priceRule = await this.prisma.priceRule.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { customer: true },
        });
        if (!priceRule)
            throw new common_1.NotFoundException('Price rule not found');
        return { priceRule };
    }
    async createPriceRule(req, body) {
        if (body.customerId) {
            const customer = await this.prisma.customer.findFirst({
                where: { id: body.customerId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
        }
        const priceRule = await this.prisma.priceRule.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                priority: body.priority ? parseInt(body.priority, 10) : undefined,
                itemCode: body.itemCode,
                uomCode: body.uomCode,
                unitPrice: body.unitPrice,
                effectiveDate: new Date(body.effectiveDate),
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                customerId: body.customerId,
                customerGroup: body.customerGroup,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'PriceRule',
            entityId: priceRule.id,
        });
        return { priceRule };
    }
    async updatePriceRule(req, id, body) {
        const exists = await this.prisma.priceRule.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Price rule not found');
        if (body.customerId) {
            const customer = await this.prisma.customer.findFirst({
                where: { id: body.customerId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
        }
        const priceRule = await this.prisma.priceRule.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                priority: body.priority ? parseInt(body.priority, 10) : undefined,
                itemCode: body.itemCode ?? undefined,
                uomCode: body.uomCode ?? undefined,
                unitPrice: body.unitPrice ?? undefined,
                effectiveDate: body.effectiveDate
                    ? new Date(body.effectiveDate)
                    : undefined,
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                customerId: body.customerId ?? undefined,
                customerGroup: body.customerGroup ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'PriceRule',
            entityId: priceRule.id,
        });
        return { priceRule };
    }
    async deactivatePriceRule(req, id) {
        const exists = await this.prisma.priceRule.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, isActive: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Price rule not found');
        const priceRule = await this.prisma.priceRule.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'PriceRule',
            entityId: priceRule.id,
        });
        return { priceRule };
    }
    async listDiscountRules(req, q, isActive) {
        const discountRules = await this.prisma.discountRule.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(typeof isActive === 'string'
                    ? { isActive: isActive === 'true' }
                    : {}),
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                            { itemCode: { contains: q, mode: 'insensitive' } },
                            { customerGroup: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [
                { isActive: 'desc' },
                { priority: 'asc' },
                { createdAt: 'desc' },
            ],
            include: { customer: true },
            take: 200,
        });
        return { discountRules };
    }
    async getDiscountRule(req, id) {
        const discountRule = await this.prisma.discountRule.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { customer: true },
        });
        if (!discountRule)
            throw new common_1.NotFoundException('Discount rule not found');
        return { discountRule };
    }
    async createDiscountRule(req, body) {
        if (body.customerId) {
            const customer = await this.prisma.customer.findFirst({
                where: { id: body.customerId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
        }
        const discountRule = await this.prisma.discountRule.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                priority: body.priority ? parseInt(body.priority, 10) : undefined,
                itemCode: body.itemCode,
                uomCode: body.uomCode,
                discountPercent: body.discountPercent,
                effectiveDate: new Date(body.effectiveDate),
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                customerId: body.customerId,
                customerGroup: body.customerGroup,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'DiscountRule',
            entityId: discountRule.id,
        });
        return { discountRule };
    }
    async updateDiscountRule(req, id, body) {
        const exists = await this.prisma.discountRule.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Discount rule not found');
        if (body.customerId) {
            const customer = await this.prisma.customer.findFirst({
                where: { id: body.customerId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!customer)
                throw new common_1.NotFoundException('Customer not found');
        }
        const discountRule = await this.prisma.discountRule.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                priority: body.priority ? parseInt(body.priority, 10) : undefined,
                itemCode: body.itemCode ?? undefined,
                uomCode: body.uomCode ?? undefined,
                discountPercent: body.discountPercent ?? undefined,
                effectiveDate: body.effectiveDate
                    ? new Date(body.effectiveDate)
                    : undefined,
                endDate: body.endDate ? new Date(body.endDate) : undefined,
                customerId: body.customerId ?? undefined,
                customerGroup: body.customerGroup ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'DiscountRule',
            entityId: discountRule.id,
        });
        return { discountRule };
    }
    async deactivateDiscountRule(req, id) {
        const exists = await this.prisma.discountRule.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true, isActive: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Discount rule not found');
        const discountRule = await this.prisma.discountRule.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'DiscountRule',
            entityId: discountRule.id,
        });
        return { discountRule };
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, common_1.Get)('price-lists'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "listPriceLists", null);
__decorate([
    (0, common_1.Get)('price-lists/:id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getPriceList", null);
__decorate([
    (0, common_1.Post)('price-lists'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_price_list_dto_1.CreatePriceListDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "createPriceList", null);
__decorate([
    (0, common_1.Patch)('price-lists/:id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_price_list_dto_1.UpdatePriceListDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "updatePriceList", null);
__decorate([
    (0, common_1.Get)('price-rules'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "listPriceRules", null);
__decorate([
    (0, common_1.Get)('price-rules/:id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getPriceRule", null);
__decorate([
    (0, common_1.Post)('price-rules'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_price_rule_dto_1.CreatePriceRuleDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "createPriceRule", null);
__decorate([
    (0, common_1.Patch)('price-rules/:id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_price_rule_dto_1.UpdatePriceRuleDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "updatePriceRule", null);
__decorate([
    (0, common_1.Patch)('price-rules/:id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "deactivatePriceRule", null);
__decorate([
    (0, common_1.Get)('discount-rules'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "listDiscountRules", null);
__decorate([
    (0, common_1.Get)('discount-rules/:id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getDiscountRule", null);
__decorate([
    (0, common_1.Post)('discount-rules'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_discount_rule_dto_1.CreateDiscountRuleDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "createDiscountRule", null);
__decorate([
    (0, common_1.Patch)('discount-rules/:id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_discount_rule_dto_1.UpdateDiscountRuleDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "updateDiscountRule", null);
__decorate([
    (0, common_1.Patch)('discount-rules/:id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('sales.pricing.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "deactivateDiscountRule", null);
exports.PricingController = PricingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/pricing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map