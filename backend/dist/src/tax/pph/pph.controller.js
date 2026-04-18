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
exports.IdBillingController = exports.BuktiPotongController = exports.Pph21Controller = exports.EBupotController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let EBupotController = class EBupotController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period) {
        const where = { tenantId: req.user.tenantId };
        if (period) {
            const [year, month] = period.split('-').map(Number);
            where.transDate = {
                gte: new Date(year, month - 1, 1),
                lt: new Date(year, month, 1),
            };
        }
        const withholdings = await this.prisma.pphWithholding.findMany({
            where,
            orderBy: { transDate: 'desc' },
        });
        return { withholdings };
    }
    async get(req, id) {
        const withholding = await this.prisma.pphWithholding.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { withholding };
    }
    async create(req, body) {
        const taxAmount = body.grossAmount * (body.rate / 100);
        const withholding = await this.prisma.pphWithholding.create({
            data: {
                tenantId: req.user.tenantId,
                transNo: body.transNo,
                transDate: new Date(body.transDate),
                incomeType: body.incomeType,
                taxpayerName: body.taxpayerName,
                npwp: body.npwp,
                nik: body.nik,
                grossAmount: body.grossAmount,
                rate: body.rate,
                taxAmount,
                status: 'DRAFT',
            },
        });
        return { withholding };
    }
    async issueBupot(req, id, body) {
        const withholding = await this.prisma.pphWithholding.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!withholding)
            throw new Error('Withholding not found');
        const updated = await this.prisma.pphWithholding.update({
            where: { id },
            data: { bupotNo: body.bupotNo, bupotDate: new Date(body.bupotDate), status: 'POSTED' },
        });
        return { withholding: updated };
    }
};
exports.EBupotController = EBupotController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.eBupot.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('tax.eBupot.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.eBupot.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/issue-bupot'),
    (0, permissions_decorator_1.RequirePermissions)('tax.eBupot.issue'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "issueBupot", null);
exports.EBupotController = EBupotController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/e-bupot'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EBupotController);
let Pph21Controller = class Pph21Controller {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period) {
        const where = { tenantId: req.user.tenantId, incomeType: '21' };
        if (period) {
            const [year, month] = period.split('-').map(Number);
            where.transDate = {
                gte: new Date(year, month - 1, 1),
                lt: new Date(year, month, 1),
            };
        }
        const withholdings = await this.prisma.pphWithholding.findMany({
            where,
            orderBy: { transDate: 'desc' },
        });
        return { withholdings };
    }
    async create(req, body) {
        const taxAmount = body.grossAmount * (body.rate / 100);
        const withholding = await this.prisma.pphWithholding.create({
            data: {
                tenantId: req.user.tenantId,
                transNo: body.transNo,
                transDate: new Date(body.transDate),
                incomeType: '21',
                taxpayerName: body.taxpayerName,
                npwp: body.npwp,
                nik: body.nik,
                grossAmount: body.grossAmount,
                rate: body.rate,
                taxAmount,
                status: 'DRAFT',
            },
        });
        return { withholding };
    }
};
exports.Pph21Controller = Pph21Controller;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.pph21.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], Pph21Controller.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.pph21.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Pph21Controller.prototype, "create", null);
exports.Pph21Controller = Pph21Controller = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/pph21'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], Pph21Controller);
let BuktiPotongController = class BuktiPotongController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, year) {
        const where = {
            tenantId: req.user.tenantId,
            status: 'POSTED',
            incomeType: '21-A1'
        };
        if (year) {
            where.transDate = {
                gte: new Date(parseInt(year), 0, 1),
                lt: new Date(parseInt(year) + 1, 0, 1),
            };
        }
        const withholdings = await this.prisma.pphWithholding.findMany({
            where,
            orderBy: { transDate: 'desc' },
        });
        return { withholdings };
    }
    async print(req, id) {
        const withholding = await this.prisma.pphWithholding.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { withholding };
    }
};
exports.BuktiPotongController = BuktiPotongController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.buktiPotong.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuktiPotongController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/print'),
    (0, permissions_decorator_1.RequirePermissions)('tax.buktiPotong.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuktiPotongController.prototype, "print", null);
exports.BuktiPotongController = BuktiPotongController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/bukti-potong'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BuktiPotongController);
let IdBillingController = class IdBillingController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const billings = await this.prisma.idBilling.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { createdAt: 'desc' },
        });
        return { billings };
    }
    async create(req, body) {
        const billing = await this.prisma.idBilling.create({
            data: {
                tenantId: req.user.tenantId,
                billingNo: body.billingNo,
                taxType: body.taxType,
                period: body.period,
                amount: body.amount,
                dueDate: new Date(body.dueDate),
                status: 'PENDING',
            },
        });
        return { billing };
    }
    async markPaid(req, id) {
        const billing = await this.prisma.idBilling.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!billing)
            throw new Error('Billing not found');
        const updated = await this.prisma.idBilling.update({
            where: { id },
            data: { status: 'PAID', paidDate: new Date() },
        });
        return { billing: updated };
    }
};
exports.IdBillingController = IdBillingController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.idBilling.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdBillingController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.idBilling.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdBillingController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/paid'),
    (0, permissions_decorator_1.RequirePermissions)('tax.idBilling.paid'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IdBillingController.prototype, "markPaid", null);
exports.IdBillingController = IdBillingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/id-billing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdBillingController);
//# sourceMappingURL=pph.controller.js.map