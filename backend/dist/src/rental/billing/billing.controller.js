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
exports.RentalBillingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let RentalBillingController = class RentalBillingController {
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
                { billingNo: { contains: search, mode: 'insensitive' } },
                { customer: { name: { contains: search, mode: 'insensitive' } } },
                { contract: { contractNo: { contains: search, mode: 'insensitive' } } },
            ];
        }
        if (status) {
            where.status = status;
        }
        const billings = await this.prisma.rentalBilling.findMany({
            where,
            include: {
                customer: { select: { name: true, code: true } },
                contract: { select: { contractNo: true } }
            },
            orderBy: { createdAt: 'desc' },
        });
        const summaryAggr = await this.prisma.rentalBilling.groupBy({
            by: ['status'],
            where: { tenantId: user.tenantId },
            _sum: { totalAmount: true }
        });
        const summary = {
            unpaid: summaryAggr.find(s => s.status === 'UNPAID')?._sum.totalAmount || 0,
            paid: summaryAggr.find(s => s.status === 'PAID')?._sum.totalAmount || 0,
            overdue: summaryAggr.find(s => s.status === 'OVERDUE')?._sum.totalAmount || 0,
            count: billings.length
        };
        return { data: billings, summary };
    }
    async create(req, body) {
        const user = req.user;
        const billingNo = body.billingNo || `RB-${new Date().getFullYear()}-${Math.floor(Math.random() * 89999 + 10000)}`;
        const taxAmount = body.taxAmount || 0;
        const totalAmount = (body.amount || 0) + taxAmount;
        const contract = await this.prisma.rentalContract.findUnique({ where: { id: body.contractId } });
        if (!contract || contract.tenantId !== user.tenantId) {
            throw new common_1.NotFoundException('Rental Contract not found or invalid.');
        }
        const billing = await this.prisma.rentalBilling.create({
            data: {
                tenantId: user.tenantId,
                billingNo,
                contractId: body.contractId,
                customerId: contract.customerId,
                periodStart: new Date(body.periodStart),
                periodEnd: new Date(body.periodEnd),
                dueDate: new Date(body.dueDate),
                amount: body.amount || 0,
                taxAmount,
                totalAmount,
                status: body.status || 'UNPAID',
                notes: body.notes
            },
        });
        await this.audit.log(user.tenantId, user.id, 'CREATE', 'RentalBilling', billing.id, null, billing);
        return { message: 'Rental Invoice created successfully', data: billing };
    }
    async update(req, id, body) {
        const user = req.user;
        const existing = await this.prisma.rentalBilling.findUnique({
            where: { id },
        });
        if (!existing || existing.tenantId !== user.tenantId) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        const data = {};
        if (body.status !== undefined)
            data.status = body.status;
        if (body.amount !== undefined) {
            data.amount = body.amount;
            data.totalAmount = Number(data.amount) + Number(existing.taxAmount);
        }
        if (body.periodStart)
            data.periodStart = new Date(body.periodStart);
        if (body.periodEnd)
            data.periodEnd = new Date(body.periodEnd);
        if (body.dueDate)
            data.dueDate = new Date(body.dueDate);
        if (body.notes !== undefined)
            data.notes = body.notes;
        const updated = await this.prisma.rentalBilling.update({
            where: { id },
            data,
        });
        await this.audit.log(user.tenantId, user.id, 'UPDATE', 'RentalBilling', id, existing, updated);
        return { message: 'Invoice updated successfully', data: updated };
    }
    async getContracts(req) {
        const user = req.user;
        const items = await this.prisma.rentalContract.findMany({
            where: { tenantId: user.tenantId, status: 'ACTIVE' },
            select: { id: true, contractNo: true, rentalRate: true, billingCycle: true }
        });
        return { data: items };
    }
};
exports.RentalBillingController = RentalBillingController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RentalBillingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RentalBillingController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RentalBillingController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('contracts'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentalBillingController.prototype, "getContracts", null);
exports.RentalBillingController = RentalBillingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('rental/billing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RentalBillingController);
//# sourceMappingURL=billing.controller.js.map