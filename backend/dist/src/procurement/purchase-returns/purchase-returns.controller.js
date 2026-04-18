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
exports.PurchaseReturnsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_purchase_return_dto_1 = require("./dto/create-purchase-return.dto");
const update_purchase_return_dto_1 = require("./dto/update-purchase-return.dto");
const procurementStatusSet = new Set([
    'DRAFT',
    'SUBMITTED',
    'PENDING_APPROVAL',
    'APPROVED',
    'REJECTED',
    'CLOSED',
    'VOID',
]);
const isProcurementDocStatus = (value) => Boolean(value) && procurementStatusSet.has(value);
let PurchaseReturnsController = class PurchaseReturnsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async validateTaxCodes(input) {
        const ids = input.taxCodeIds.map((x) => x.trim()).filter(Boolean);
        if (ids.length === 0)
            return;
        const uniqueCount = new Set(ids).size;
        const count = await this.prisma.taxCode.count({
            where: { tenantId: input.tenantId, id: { in: ids } },
        });
        if (count !== uniqueCount)
            throw new common_1.NotFoundException('Tax code not found');
    }
    async list(req, q, status) {
        const purchaseReturns = await this.prisma.purchaseReturn.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isProcurementDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { supplier: true, order: true, invoice: true },
            take: 200,
        });
        return { purchaseReturns };
    }
    async get(req, id) {
        const purchaseReturn = await this.prisma.purchaseReturn.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                supplier: true,
                order: true,
                invoice: true,
                items: { orderBy: [{ lineNo: 'asc' }], include: { taxCode: true } },
            },
        });
        if (!purchaseReturn)
            throw new common_1.NotFoundException('Purchase return not found');
        return { purchaseReturn };
    }
    async create(req, body) {
        const supplier = await this.prisma.supplier.findFirst({
            where: { id: body.supplierId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!supplier)
            throw new common_1.NotFoundException('Supplier not found');
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
        await this.validateTaxCodes({
            tenantId: req.user.tenantId,
            taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
        });
        const purchaseReturn = await this.prisma.$transaction(async (tx) => {
            const pr = await tx.purchaseReturn.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    supplierId: body.supplierId,
                    orderId: body.orderId,
                    invoiceId: body.invoiceId,
                    returnDate: new Date(body.returnDate),
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.purchaseReturnItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        returnId: pr.id,
                        lineNo: idx + 1,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        unitPrice: it.unitPrice,
                        taxCodeId: it.taxCodeId,
                    })),
                });
            }
            return pr;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'PurchaseReturn',
            entityId: purchaseReturn.id,
        });
        return { purchaseReturn };
    }
    async update(req, id, body) {
        const exists = await this.prisma.purchaseReturn.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Purchase return not found');
        if (body.items) {
            await this.validateTaxCodes({
                tenantId: req.user.tenantId,
                taxCodeIds: body.items.map((x) => x.taxCodeId ?? '').filter(Boolean),
            });
        }
        const purchaseReturn = await this.prisma.$transaction(async (tx) => {
            const pr = await tx.purchaseReturn.update({
                where: { id },
                data: {
                    returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.purchaseReturnItem.deleteMany({
                    where: { tenantId: req.user.tenantId, returnId: id },
                });
                if (body.items.length > 0) {
                    await tx.purchaseReturnItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            returnId: id,
                            lineNo: idx + 1,
                            description: it.description,
                            qty: it.qty,
                            uomCode: it.uomCode,
                            unitPrice: it.unitPrice,
                            taxCodeId: it.taxCodeId,
                        })),
                    });
                }
            }
            return pr;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'PurchaseReturn',
            entityId: purchaseReturn.id,
        });
        return { purchaseReturn };
    }
};
exports.PurchaseReturnsController = PurchaseReturnsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.return.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PurchaseReturnsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.return.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PurchaseReturnsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.return.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_purchase_return_dto_1.CreatePurchaseReturnDto]),
    __metadata("design:returntype", Promise)
], PurchaseReturnsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.return.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_purchase_return_dto_1.UpdatePurchaseReturnDto]),
    __metadata("design:returntype", Promise)
], PurchaseReturnsController.prototype, "update", null);
exports.PurchaseReturnsController = PurchaseReturnsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/returns'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PurchaseReturnsController);
//# sourceMappingURL=purchase-returns.controller.js.map