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
exports.PaymentRequestController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let PaymentRequestController = class PaymentRequestController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const requests = await this.prisma.paymentRequest.findMany({
            where,
            include: {
                requester: { select: { id: true, name: true, email: true } },
                supplier: { select: { id: true, name: true, code: true } },
                project: { select: { id: true, name: true, code: true } },
                invoice: { select: { id: true, code: true, balanceDue: true } },
            },
            orderBy: { requestDate: 'desc' },
        });
        return { requests };
    }
    async get(req, id) {
        const request = await this.prisma.paymentRequest.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                requester: { select: { id: true, name: true, email: true } },
                supplier: { select: { id: true, name: true, code: true } },
                project: { select: { id: true, name: true, code: true } },
                invoice: { select: { id: true, code: true, balanceDue: true } },
            },
        });
        return { request };
    }
    async create(req, body) {
        const request = await this.prisma.paymentRequest.create({
            data: {
                tenantId: req.user.tenantId,
                requestNo: body.requestNo,
                requestDate: new Date(body.requestDate),
                requesterId: body.requesterId || req.user.id,
                supplierId: body.supplierId,
                projectId: body.projectId,
                invoiceId: body.invoiceId,
                description: body.description,
                amount: body.amount,
                status: 'PENDING',
                approvalStatus: 'PENDING',
            },
            include: {
                requester: { select: { name: true } },
                supplier: { select: { name: true } },
                project: { select: { name: true } },
            },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'PaymentRequest', entityId: request.id, metadata: { request } });
        return { request };
    }
    async approve(req, id) {
        const request = await this.prisma.paymentRequest.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!request)
            throw new Error('Payment request not found');
        const updated = await this.prisma.paymentRequest.update({
            where: { id },
            data: { approvalStatus: 'APPROVED', status: 'APPROVED' },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'APPROVE', entity: 'PaymentRequest', entityId: id, metadata: { request: updated } });
        return { request: updated };
    }
    async reject(req, id, body) {
        const updated = await this.prisma.paymentRequest.update({
            where: { id },
            data: { approvalStatus: 'REJECTED', status: 'REJECTED' },
        });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'REJECT', entity: 'PaymentRequest', entityId: id, metadata: { request: updated, reason: body.reason } });
        return { request: updated };
    }
    async delete(req, id) {
        await this.prisma.paymentRequest.deleteMany({ where: { id, tenantId: req.user.tenantId } });
        await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'PaymentRequest', entityId: id, metadata: { id } });
        return { success: true };
    }
};
exports.PaymentRequestController = PaymentRequestController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.paymentRequest.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentRequestController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.paymentRequest.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentRequestController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.paymentRequest.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('finance.paymentRequest.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentRequestController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)('finance.paymentRequest.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentRequestController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, permissions_decorator_1.RequirePermissions)('finance.paymentRequest.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentRequestController.prototype, "delete", null);
exports.PaymentRequestController = PaymentRequestController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/payment-request'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PaymentRequestController);
//# sourceMappingURL=payment-request.controller.js.map