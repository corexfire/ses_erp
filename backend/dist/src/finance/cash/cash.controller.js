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
exports.CashController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let CashController = class CashController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const accounts = await this.prisma.cashAccount.findMany({
            where: { tenantId: req.user.tenantId },
            include: { transactions: { orderBy: [{ transDate: 'desc' }], take: 50 } },
        });
        return { accounts };
    }
    async get(req, id) {
        const account = await this.prisma.cashAccount.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { transactions: { orderBy: [{ transDate: 'desc' }] } },
        });
        return { account };
    }
    async create(req, body) {
        const account = await this.prisma.cashAccount.create({
            data: {
                tenantId: req.user.tenantId,
                accountNo: body.accountNo,
                name: body.name,
                accountType: body.accountType || 'CASH',
                balance: 0,
                isActive: true,
            },
        });
        return { account };
    }
    async addTransaction(req, id, body) {
        const account = await this.prisma.cashAccount.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!account)
            throw new Error('Cash account not found');
        const trans = await this.prisma.cashTransaction.create({
            data: {
                tenantId: req.user.tenantId,
                cashAccountId: id,
                transDate: new Date(body.transDate),
                transType: body.transType,
                description: body.description,
                amount: body.amount,
                reference: body.reference,
                status: 'POSTED',
            },
        });
        const newBalance = Number(account.balance) + body.amount;
        await this.prisma.cashAccount.update({ where: { id }, data: { balance: newBalance } });
        return { transaction: trans };
    }
};
exports.CashController = CashController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.cash.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CashController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.cash.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CashController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.cash.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CashController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/transactions'),
    (0, permissions_decorator_1.RequirePermissions)('finance.cash.transaction'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CashController.prototype, "addTransaction", null);
exports.CashController = CashController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/cash'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CashController);
//# sourceMappingURL=cash.controller.js.map