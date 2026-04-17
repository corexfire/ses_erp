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
exports.RfqsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_rfq_dto_1 = require("./dto/create-rfq.dto");
const update_rfq_dto_1 = require("./dto/update-rfq.dto");
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
let RfqsController = class RfqsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q, status) {
        const rfqs = await this.prisma.rfq.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(isProcurementDocStatus(status) ? { status } : {}),
                ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }] } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: {
                vendors: { include: { supplier: true } },
                items: { orderBy: [{ lineNo: 'asc' }] },
            },
            take: 200,
        });
        return { rfqs };
    }
    async get(req, id) {
        const rfq = await this.prisma.rfq.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                vendors: { include: { supplier: true } },
                items: { orderBy: [{ lineNo: 'asc' }] },
                purchaseOrders: true,
            },
        });
        if (!rfq)
            throw new common_1.NotFoundException('RFQ not found');
        return { rfq };
    }
    async create(req, body) {
        const supplierIds = (body.supplierIds ?? [])
            .map((x) => x.trim())
            .filter(Boolean);
        if (supplierIds.length > 0) {
            const count = await this.prisma.supplier.count({
                where: { tenantId: req.user.tenantId, id: { in: supplierIds } },
            });
            if (count !== supplierIds.length)
                throw new common_1.NotFoundException('Supplier not found');
        }
        const rfq = await this.prisma.$transaction(async (tx) => {
            const r = await tx.rfq.create({
                data: {
                    tenantId: req.user.tenantId,
                    code: body.code,
                    issueDate: new Date(body.issueDate),
                    notes: body.notes,
                },
            });
            if (supplierIds.length > 0) {
                await tx.rfqVendor.createMany({
                    data: supplierIds.map((supplierId) => ({
                        tenantId: req.user.tenantId,
                        rfqId: r.id,
                        supplierId,
                    })),
                });
            }
            if (body.items.length > 0) {
                await tx.rfqItem.createMany({
                    data: body.items.map((it, idx) => ({
                        tenantId: req.user.tenantId,
                        rfqId: r.id,
                        lineNo: idx + 1,
                        description: it.description,
                        qty: it.qty,
                        uomCode: it.uomCode,
                    })),
                });
            }
            return r;
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Rfq',
            entityId: rfq.id,
        });
        return { rfq };
    }
    async update(req, id, body) {
        const exists = await this.prisma.rfq.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('RFQ not found');
        const supplierIds = body.supplierIds
            ? body.supplierIds.map((x) => x.trim()).filter(Boolean)
            : null;
        if (supplierIds && supplierIds.length > 0) {
            const count = await this.prisma.supplier.count({
                where: { tenantId: req.user.tenantId, id: { in: supplierIds } },
            });
            if (count !== supplierIds.length)
                throw new common_1.NotFoundException('Supplier not found');
        }
        const rfq = await this.prisma.$transaction(async (tx) => {
            const r = await tx.rfq.update({
                where: { id },
                data: {
                    issueDate: body.issueDate ? new Date(body.issueDate) : undefined,
                    notes: body.notes ?? undefined,
                },
            });
            if (supplierIds) {
                await tx.rfqVendor.deleteMany({
                    where: { tenantId: req.user.tenantId, rfqId: id },
                });
                if (supplierIds.length > 0) {
                    await tx.rfqVendor.createMany({
                        data: supplierIds.map((supplierId) => ({
                            tenantId: req.user.tenantId,
                            rfqId: id,
                            supplierId,
                        })),
                    });
                }
            }
            if (body.items) {
                await tx.rfqItem.deleteMany({
                    where: { tenantId: req.user.tenantId, rfqId: id },
                });
                if (body.items.length > 0) {
                    await tx.rfqItem.createMany({
                        data: body.items.map((it, idx) => ({
                            tenantId: req.user.tenantId,
                            rfqId: id,
                            lineNo: idx + 1,
                            description: it.description,
                            qty: it.qty,
                            uomCode: it.uomCode,
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
            entity: 'Rfq',
            entityId: rfq.id,
        });
        return { rfq };
    }
};
exports.RfqsController = RfqsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.rfq.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RfqsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.rfq.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RfqsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('procurement.rfq.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rfq_dto_1.CreateRfqDto]),
    __metadata("design:returntype", Promise)
], RfqsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('procurement.rfq.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_rfq_dto_1.UpdateRfqDto]),
    __metadata("design:returntype", Promise)
], RfqsController.prototype, "update", null);
exports.RfqsController = RfqsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('procurement/rfqs'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RfqsController);
//# sourceMappingURL=rfqs.controller.js.map