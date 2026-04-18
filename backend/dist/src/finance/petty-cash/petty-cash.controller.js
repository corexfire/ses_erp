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
exports.PettyCashController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let PettyCashController = class PettyCashController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const user = req.user;
        const where = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
        if (status)
            where.status = status;
        const replenishment = await this.prisma.pettyCashReplenishment.findMany({
            where,
            include: { cashAccount: true },
            orderBy: { requestDate: 'desc' },
        });
        return { replenishment };
    }
    async get(req, id) {
        const user = req.user;
        const where = user.isSuperAdmin ? { id } : { id, tenantId: user.tenantId };
        const replenishment = await this.prisma.pettyCashReplenishment.findFirst({
            where,
            include: { cashAccount: true },
        });
        return { replenishment };
    }
    async create(req, body) {
        const replenishment = await this.prisma.pettyCashReplenishment.create({
            data: {
                tenantId: req.user.tenantId,
                cashAccountId: body.cashAccountId,
                requestNo: body.requestNo,
                requestDate: new Date(body.requestDate),
                amount: body.amount,
                notes: body.notes,
                referenceNo: body.referenceNo,
                status: 'PENDING',
            },
            include: { cashAccount: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'PettyCashReplenishment', entityId: replenishment.id, metadata: { replenishment } });
        return { replenishment };
    }
    async approve(req, id) {
        const user = req.user;
        const replenishment = await this.prisma.pettyCashReplenishment.findFirst({ where: { id, tenantId: user.tenantId } });
        if (!replenishment)
            throw new Error('Replenishment not found');
        const cashAccount = await this.prisma.cashAccount.findUnique({
            where: { id: replenishment.cashAccountId },
            include: { coaAccount: true }
        });
        const coaCode = cashAccount?.coaAccount?.code || '111-002';
        await this.prisma.cashTransaction.create({
            data: {
                tenantId: user.tenantId,
                cashAccountId: replenishment.cashAccountId,
                transDate: new Date(),
                transType: 'DEBIT',
                description: `Petty Cash Replenishment - ${replenishment.requestNo}`,
                amount: replenishment.amount,
                reference: replenishment.requestNo,
                status: 'POSTED',
            },
        });
        await this.prisma.cashAccount.update({
            where: { id: replenishment.cashAccountId },
            data: { balance: { increment: replenishment.amount } },
        });
        const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId } });
        const entryNo = `JE-PC-${String(journalCount + 1).padStart(6, '0')}`;
        const creditCoa = await this.prisma.coaAccount.findFirst({
            where: { tenantId: user.tenantId, code: { startsWith: '4-' } }
        });
        const creditCode = creditCoa?.code || '4-1100-00';
        const journalEntry = await this.prisma.journalEntry.create({
            data: {
                tenantId: user.tenantId,
                entryNo,
                entryDate: new Date(),
                description: `PC Replenishment - ${replenishment.requestNo} (${replenishment.notes || 'Kas Kecil'})`,
                referenceNo: replenishment.requestNo,
                journalType: 'PETTY_CASH',
                totalDebit: replenishment.amount,
                totalCredit: replenishment.amount,
                status: 'POSTED',
                lines: {
                    create: [
                        {
                            tenantId: user.tenantId,
                            lineNo: 1,
                            accountCode: coaCode,
                            description: `${cashAccount?.name || 'Kas'} - ${replenishment.requestNo}`,
                            debit: replenishment.amount,
                            credit: 0,
                            referenceId: replenishment.id
                        },
                        {
                            tenantId: user.tenantId,
                            lineNo: 2,
                            accountCode: creditCode,
                            description: replenishment.notes || 'Pendapatan Jasa',
                            debit: 0,
                            credit: replenishment.amount,
                            referenceId: replenishment.id
                        }
                    ]
                }
            }
        });
        const updated = await this.prisma.pettyCashReplenishment.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'APPROVE', entity: 'PettyCashReplenishment', entityId: id, metadata: { replenishment: updated, journalEntryId: journalEntry.id } });
        return { replenishment: updated, journalEntry };
    }
    async reject(req, id) {
        const updated = await this.prisma.pettyCashReplenishment.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'REJECT', entity: 'PettyCashReplenishment', entityId: id, metadata: { replenishment: updated } });
        return { replenishment: updated };
    }
    async delete(req, id) {
        await this.prisma.pettyCashReplenishment.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'PettyCashReplenishment', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.PettyCashController = PettyCashController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.pettyCash.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PettyCashController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.pettyCash.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PettyCashController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.pettyCash.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PettyCashController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('finance.pettyCash.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PettyCashController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('finance.pettyCash.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PettyCashController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.pettyCash.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PettyCashController.prototype, "delete", null);
exports.PettyCashController = PettyCashController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/petty-cash'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PettyCashController);
//# sourceMappingURL=petty-cash.controller.js.map