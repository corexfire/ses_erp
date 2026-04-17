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
exports.JournalController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let JournalController = class JournalController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const entries = await this.prisma.journalEntry.findMany({
            where: { tenantId: req.user.tenantId, ...(status ? { status } : {}) },
            include: { lines: true },
            orderBy: [{ entryDate: 'desc' }],
            take: 200,
        });
        return { entries };
    }
    async get(req, id) {
        const entry = await this.prisma.journalEntry.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { lines: { orderBy: [{ lineNo: 'asc' }] } },
        });
        return { entry };
    }
    async create(req, body) {
        const count = await this.prisma.journalEntry.count({ where: { tenantId: req.user.tenantId } });
        const entryNo = `JE-${String(count + 1).padStart(6, '0')}`;
        const totalDebit = body.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
        const totalCredit = body.lines.reduce((sum, l) => sum + (l.credit || 0), 0);
        const entry = await this.prisma.journalEntry.create({
            data: {
                tenantId: req.user.tenantId,
                entryNo,
                entryDate: new Date(body.entryDate),
                description: body.description,
                referenceNo: body.referenceNo,
                journalType: body.journalType || 'GENERAL',
                totalDebit,
                totalCredit,
                status: 'DRAFT',
                lines: {
                    create: body.lines.map((line, idx) => ({
                        tenantId: req.user.tenantId,
                        lineNo: idx + 1,
                        accountCode: line.accountCode,
                        description: line.description,
                        costCenterId: line.costCenterId,
                        debit: line.debit || 0,
                        credit: line.credit || 0,
                    })),
                },
            },
            include: { lines: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'JournalEntry', entityId: entry.id, metadata: { entryNo } });
        return { entry };
    }
    async update(req, id, body) {
        const existing = await this.prisma.journalEntry.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Journal entry not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only update draft entries');
        if (body.lines) {
            await this.prisma.journalEntryLine.deleteMany({ where: { journalEntryId: id } });
        }
        const totalDebit = body.lines?.reduce((sum, l) => sum + (l.debit || 0), 0) ?? existing.totalDebit;
        const totalCredit = body.lines?.reduce((sum, l) => sum + (l.credit || 0), 0) ?? existing.totalCredit;
        const entry = await this.prisma.journalEntry.update({
            where: { id },
            data: {
                ...(body.entryDate && { entryDate: new Date(body.entryDate) }),
                ...(body.description !== undefined && { description: body.description }),
                ...(body.referenceNo !== undefined && { referenceNo: body.referenceNo }),
                ...(body.journalType !== undefined && { journalType: body.journalType }),
                ...(body.lines && {
                    totalDebit,
                    totalCredit,
                    lines: {
                        create: body.lines.map((line, idx) => ({
                            tenantId: req.user.tenantId,
                            lineNo: idx + 1,
                            accountCode: line.accountCode,
                            description: line.description,
                            costCenterId: line.costCenterId,
                            debit: line.debit || 0,
                            credit: line.credit || 0,
                        })),
                    },
                }),
            },
            include: { lines: true },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'JournalEntry', entityId: id });
        return { entry };
    }
    async delete(req, id) {
        const existing = await this.prisma.journalEntry.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Journal entry not found');
        if (existing.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only delete draft entries');
        await this.prisma.journalEntryLine.deleteMany({ where: { journalEntryId: id } });
        await this.prisma.journalEntry.delete({ where: { id } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'JournalEntry', entityId: id });
        return { success: true };
    }
    async post(req, id) {
        const entry = await this.prisma.journalEntry.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { lines: true },
        });
        if (!entry)
            throw new common_1.NotFoundException('Journal entry not found');
        if (entry.status !== 'DRAFT')
            throw new common_1.ForbiddenException('Can only post draft entries');
        if (entry.lines.length === 0)
            throw new common_1.ForbiddenException('Cannot post empty entry');
        if (entry.totalDebit !== entry.totalCredit)
            throw new common_1.ForbiddenException('Debit and credit must balance');
        const updated = await this.prisma.journalEntry.update({
            where: { id },
            data: { status: 'POSTED' },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'POST', entity: 'JournalEntry', entityId: id, metadata: { entryNo: entry.entryNo } });
        return { entry: updated };
    }
};
exports.JournalController = JournalController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.journal.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.journal.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.journal.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.journal.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.journal.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/post'),
    (0, permissions_decorator_1.RequirePermissions)('finance.journal.post'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "post", null);
exports.JournalController = JournalController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/journal'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], JournalController);
//# sourceMappingURL=journal.controller.js.map