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
exports.SubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let SubscriptionsController = class SubscriptionsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async findAll(req, search, status) {
        const user = req.user;
        const where = { tenantId: user.tenantId };
        if (search) {
            where.OR = [
                { planName: { contains: search, mode: 'insensitive' } },
                { customer: { name: { contains: search, mode: 'insensitive' } } },
            ];
        }
        if (status) {
            where.status = status;
        }
        const subscriptions = await this.prisma.salesSubscription.findMany({
            where,
            include: {
                customer: { select: { name: true, code: true } }
            },
            orderBy: { createdAt: 'desc' },
        });
        const summary = {
            active: await this.prisma.salesSubscription.count({ where: { tenantId: user.tenantId, status: 'ACTIVE' } }),
            pastDue: await this.prisma.salesSubscription.count({ where: { tenantId: user.tenantId, status: 'PAST_DUE' } }),
            cancelled: await this.prisma.salesSubscription.count({ where: { tenantId: user.tenantId, status: 'CANCELLED' } })
        };
        return { data: subscriptions, summary };
    }
    async create(req, body) {
        const user = req.user;
        const sub = await this.prisma.salesSubscription.create({
            data: {
                tenantId: user.tenantId,
                customerId: body.customerId,
                planName: body.planName,
                billingCycle: body.billingCycle,
                status: body.status || 'ACTIVE',
                startDate: body.startDate ? new Date(body.startDate) : new Date(),
                endDate: body.endDate ? new Date(body.endDate) : null,
                nextBillingDate: new Date(body.nextBillingDate),
                amount: body.amount,
                notes: body.notes
            },
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'CREATE', entity: 'SalesSubscription', entityId: sub.id, });
        return { message: 'Subscription created successfully', data: sub };
    }
    async update(req, id, body) {
        const user = req.user;
        const existing = await this.prisma.salesSubscription.findUnique({
            where: { id },
        });
        if (!existing || existing.tenantId !== user.tenantId) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        const data = {};
        if (body.planName !== undefined)
            data.planName = body.planName;
        if (body.billingCycle !== undefined)
            data.billingCycle = body.billingCycle;
        if (body.status !== undefined)
            data.status = body.status;
        if (body.amount !== undefined)
            data.amount = body.amount;
        if (body.notes !== undefined)
            data.notes = body.notes;
        if (body.startDate)
            data.startDate = new Date(body.startDate);
        if (body.endDate)
            data.endDate = new Date(body.endDate);
        if (body.nextBillingDate)
            data.nextBillingDate = new Date(body.nextBillingDate);
        if (body.customerId)
            data.customerId = body.customerId;
        const updated = await this.prisma.salesSubscription.update({
            where: { id },
            data,
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'UPDATE', entity: 'SalesSubscription', entityId: id, metadata: existing });
        return { message: 'Subscription updated successfully', data: updated };
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "update", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('sales/subscriptions'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], SubscriptionsController);
//# sourceMappingURL=subscriptions.controller.js.map