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
exports.SalesReturnsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_sales_return_dto_1 = require("./dto/create-sales-return.dto");
const update_sales_return_dto_1 = require("./dto/update-sales-return.dto");
let SalesReturnsController = class SalesReturnsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const returns = await this.prisma.salesReturn.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { customer: true, order: true },
            take: 200,
        });
        return { returns };
    }
    async get(req, id) {
        const salesReturn = await this.prisma.salesReturn.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                customer: true,
                order: true,
                items: { orderBy: [{ lineNo: 'asc' }] },
            },
        });
        if (!salesReturn)
            throw new common_1.NotFoundException('Return not found');
        return { salesReturn };
    }
    async create(req, body) {
        const customer = await this.prisma.customer.findFirst({
            where: { id: body.customerId, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        if (body.orderId) {
            const order = await this.prisma.salesOrder.findFirst({
                where: { id: body.orderId, tenantId: req.user.tenantId },
                select: { id: true },
            });
            if (!order)
                throw new common_1.NotFoundException('Sales order not found');
        }
        const salesReturn = await this.prisma.$transaction(async (tx) => {
            const r = await tx.salesReturn.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    customerId: body.customerId,
                    orderId: body.orderId,
                    returnDate: new Date(body.returnDate),
                    notes: body.notes,
                },
            });
            if (body.items.length > 0) {
                await tx.salesReturnItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        returnId: r.id,
                        lineNo: idx + 1,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                        unitPrice: it.unitPrice,
                        taxCodeId: it.taxCodeId,
                    })),
                });
            }
            return r;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'SalesReturn',
            entityId: salesReturn.id,
        });
        return { salesReturn };
    }
    async update(req, id, body) {
        const exists = await this.prisma.salesReturn.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Return not found');
        const salesReturn = await this.prisma.$transaction(async (tx) => {
            const r = await tx.salesReturn.update({
                where: { id },
                data: {
                    returnDate: body.returnDate ? new Date(body.returnDate) : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (body.items) {
                await tx.salesReturnItem.deleteMany({
                    where: { tenantId: req.user.tenantId, returnId: id },
                });
                if (body.items.length > 0) {
                    await tx.salesReturnItem.createMany({
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
            return r;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'SalesReturn',
            entityId: salesReturn.id,
        });
        return { salesReturn };
    }
};
exports.SalesReturnsController = SalesReturnsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.return.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesReturnsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.return.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SalesReturnsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('sales.return.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sales_return_dto_1.CreateSalesReturnDto]),
    __metadata("design:returntype", Promise)
], SalesReturnsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('sales.return.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_sales_return_dto_1.UpdateSalesReturnDto]),
    __metadata("design:returntype", Promise)
], SalesReturnsController.prototype, "update", null);
exports.SalesReturnsController = SalesReturnsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/returns'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], SalesReturnsController);
//# sourceMappingURL=sales-returns.controller.js.map