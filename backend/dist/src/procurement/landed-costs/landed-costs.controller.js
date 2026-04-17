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
exports.LandedCostsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_landed_cost_dto_1 = require("./dto/create-landed-cost.dto");
const update_landed_cost_dto_1 = require("./dto/update-landed-cost.dto");
let LandedCostsController = class LandedCostsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const landedCosts = await this.prisma.landedCostVoucher.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { supplier: true, order: true, invoice: true },
            take: 200,
        });
        return { landedCosts };
    }
    async get(req, id) {
        const landedCost = await this.prisma.landedCostVoucher.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                supplier: true,
                order: true,
                invoice: true,
                allocations: { orderBy: [{ lineNo: 'asc' }] },
            },
        });
        if (!landedCost)
            throw new common_1.NotFoundException('Landed cost voucher not found');
        return { landedCost };
    }
    async create(req, body) {
        if (body.supplierId) {
            const supplier = await this.prisma.supplier.findFirst({
                where: { id: body.supplierId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!supplier)
                throw new common_1.NotFoundException('Supplier not found');
        }
        if (body.orderId) {
            const po = await this.prisma.purchaseOrder.findFirst({
                where: { id: body.orderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!po)
                throw new common_1.NotFoundException('Purchase order not found');
        }
        if (body.invoiceId) {
            const inv = await this.prisma.purchaseInvoice.findFirst({
                where: { id: body.invoiceId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!inv)
                throw new common_1.NotFoundException('Purchase invoice not found');
        }
        const landedCost = await this.prisma.$transaction(async (tx) => {
            const lc = await tx.landedCostVoucher.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    supplierId: body.supplierId,
                    orderId: body.orderId,
                    invoiceId: body.invoiceId,
                    costDate: new Date(body.costDate),
                    totalAmount: body.totalAmount,
                    notes: body.notes,
                },
            });
            if (body.allocations && body.allocations.length > 0) {
                await tx.landedCostAllocation.createMany({
                    data: body.allocations.map((a, idx) => ({
                        tenantId: req.user.tenantId,
                        landedCostId: lc.id,
                        lineNo: idx + 1,
                        costComponent: a.costComponent,
                        amount: a.amount,
                    })),
                });
            }
            return lc;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'LandedCostVoucher',
            entityId: landedCost.id,
        });
        return { landedCost };
    }
    async update(req, id, body) {
        const exists = await this.prisma.landedCostVoucher.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Landed cost voucher not found');
        if (body.supplierId) {
            const supplier = await this.prisma.supplier.findFirst({
                where: { id: body.supplierId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!supplier)
                throw new common_1.NotFoundException('Supplier not found');
        }
        if (body.orderId) {
            const po = await this.prisma.purchaseOrder.findFirst({
                where: { id: body.orderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!po)
                throw new common_1.NotFoundException('Purchase order not found');
        }
        if (body.invoiceId) {
            const inv = await this.prisma.purchaseInvoice.findFirst({
                where: { id: body.invoiceId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!inv)
                throw new common_1.NotFoundException('Purchase invoice not found');
        }
        const landedCost = await this.prisma.$transaction(async (tx) => {
            const lc = await tx.landedCostVoucher.update({
                where: { id },
                data: {
                    supplierId: body.supplierId ?? undefined,
                    orderId: body.orderId ?? undefined,
                    invoiceId: body.invoiceId ?? undefined,
                    costDate: body.costDate ? new Date(body.costDate) : undefined,
                    totalAmount: body.totalAmount ?? undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.allocations) {
                await tx.landedCostAllocation.deleteMany({
                    where: { tenantId: req.user.tenantId, landedCostId: id },
                });
                if (body.allocations.length > 0) {
                    await tx.landedCostAllocation.createMany({
                        data: body.allocations.map((a, idx) => ({
                            tenantId: req.user.tenantId,
                            landedCostId: id,
                            lineNo: idx + 1,
                            costComponent: a.costComponent,
                            amount: a.amount,
                        })),
                    });
                }
            }
            return lc;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'LandedCostVoucher',
            entityId: landedCost.id,
        });
        return { landedCost };
    }
};
exports.LandedCostsController = LandedCostsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.landed_cost.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LandedCostsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.landed_cost.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LandedCostsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.landed_cost.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_landed_cost_dto_1.CreateLandedCostDto]),
    __metadata("design:returntype", Promise)
], LandedCostsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.landed_cost.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_landed_cost_dto_1.UpdateLandedCostDto]),
    __metadata("design:returntype", Promise)
], LandedCostsController.prototype, "update", null);
exports.LandedCostsController = LandedCostsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/landed-costs'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], LandedCostsController);
//# sourceMappingURL=landed-costs.controller.js.map