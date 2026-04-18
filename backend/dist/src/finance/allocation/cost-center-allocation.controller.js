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
exports.CostCenterAllocationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let CostCenterAllocationController = class CostCenterAllocationController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, periodId) {
        const user = req.user;
        const where = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
        if (periodId)
            where.periodId = periodId;
        const allocations = await this.prisma.costCenterAllocation.findMany({
            where,
            include: { costCenter: true },
            orderBy: { createdAt: 'desc' },
        });
        return { allocations };
    }
    async get(req, id) {
        const user = req.user;
        const where = user.isSuperAdmin ? { id } : { id, tenantId: user.tenantId };
        const allocation = await this.prisma.costCenterAllocation.findFirst({
            where,
            include: { costCenter: true },
        });
        return { allocation };
    }
    async create(req, body) {
        const user = req.user;
        const cc = await this.prisma.costCenter.findUnique({ where: { id: body.costCenterId } });
        const allocation = await this.prisma.costCenterAllocation.create({
            data: {
                tenantId: user.tenantId,
                periodId: body.periodId,
                costCenterId: body.costCenterId,
                accountCode: body.accountCode,
                allocatedAmount: body.allocatedAmount,
                referenceNo: body.referenceNo,
                description: body.description,
            },
            include: { costCenter: true },
        });
        const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId } });
        const entryNo = `JE-CCA-${String(journalCount + 1).padStart(6, '0')}`;
        const expenseCode = body.accountCode || '5-3100-00';
        const allocCode = await this.prisma.coaAccount.findFirst({
            where: { tenantId: user.tenantId, code: '2-1210-00' }
        });
        const allocAccountCode = allocCode?.code || '2-1210-00';
        await this.prisma.journalEntry.create({
            data: {
                tenantId: user.tenantId,
                entryNo,
                entryDate: new Date(),
                description: `Cost Center Allocation - ${cc?.code || 'CC'} (${body.description || 'Alokasi Biaya'})`,
                referenceNo: body.referenceNo,
                journalType: 'COST_CENTER_ALLOCATION',
                totalDebit: body.allocatedAmount,
                totalCredit: body.allocatedAmount,
                status: 'POSTED',
                lines: {
                    create: [
                        {
                            tenantId: user.tenantId,
                            lineNo: 1,
                            accountCode: expenseCode,
                            description: `Beban ${cc?.code || ''}`,
                            debit: body.allocatedAmount,
                            credit: 0,
                            costCenterId: body.costCenterId,
                            referenceId: allocation.id
                        },
                        {
                            tenantId: user.tenantId,
                            lineNo: 2,
                            accountCode: allocAccountCode,
                            description: `Alokasi ${cc?.code || ''}`,
                            debit: 0,
                            credit: body.allocatedAmount,
                            costCenterId: body.costCenterId,
                            referenceId: allocation.id
                        }
                    ]
                }
            }
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'CREATE', entity: 'CostCenterAllocation', entityId: allocation.id, metadata: { allocation } });
        return { allocation };
    }
    async update(req, id, body) {
        const allocation = await this.prisma.costCenterAllocation.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!allocation)
            throw new Error('Allocation not found');
        const updated = await this.prisma.costCenterAllocation.update({
            where: { id },
            data: {
                ...(body.allocatedAmount !== undefined && { allocatedAmount: body.allocatedAmount }),
                ...(body.accountCode && { accountCode: body.accountCode }),
                ...(body.referenceNo !== undefined && { referenceNo: body.referenceNo }),
                ...(body.description !== undefined && { description: body.description }),
            },
            include: { costCenter: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'CostCenterAllocation', entityId: id, metadata: { allocation: updated } });
        return { allocation: updated };
    }
    async delete(req, id) {
        await this.prisma.costCenterAllocation.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'CostCenterAllocation', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.CostCenterAllocationController = CostCenterAllocationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.costCenterAllocation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('periodId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostCenterAllocationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.costCenterAllocation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostCenterAllocationController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.costCenterAllocation.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CostCenterAllocationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.costCenterAllocation.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CostCenterAllocationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.costCenterAllocation.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CostCenterAllocationController.prototype, "delete", null);
exports.CostCenterAllocationController = CostCenterAllocationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/cost-center-allocation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CostCenterAllocationController);
//# sourceMappingURL=cost-center-allocation.controller.js.map