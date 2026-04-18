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
exports.PpnMasaController = exports.NsfpController = exports.FakturMasukanController = exports.FakturKeluaranController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let FakturKeluaranController = class FakturKeluaranController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period, status) {
        const where = { tenantId: req.user.tenantId, invoiceType: 'OUTPUT' };
        if (period) {
            const [year, month] = period.split('-');
            where.taxYear = parseInt(year);
            where.taxPeriod = month;
        }
        if (status && status !== 'ALL')
            where.status = status;
        const invoices = await this.prisma.taxInvoice.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
        return { invoices };
    }
    async get(req, id) {
        const invoice = await this.prisma.taxInvoice.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { invoice };
    }
    async create(req, body) {
        const invoice = await this.prisma.taxInvoice.create({
            data: {
                tenantId: req.user.tenantId,
                invoiceNo: body.invoiceNo,
                invoiceDate: new Date(body.invoiceDate),
                customerId: body.customerId,
                customerName: body.customerName,
                customerNpwp: body.customerNpwp,
                customerAddress: body.customerAddress,
                customerNik: body.customerNik,
                baseAmount: body.baseAmount,
                taxAmount: body.taxAmount,
                discountAmount: body.discountAmount || 0,
                stampDuty: body.stampDuty || 0,
                referenceNo: body.referenceNo,
                taxPeriod: body.taxPeriod || (new Date().getMonth() + 1).toString().padStart(2, '0'),
                taxYear: body.taxYear || new Date().getFullYear(),
                invoiceType: 'OUTPUT',
                status: 'DRAFT',
            },
        });
        return { invoice };
    }
    async autoGenerate(req, invoiceId) {
        const salesInvoice = await this.prisma.salesInvoice.findFirst({
            where: { id: invoiceId, tenantId: req.user.tenantId },
            include: { customer: true, items: true }
        });
        if (!salesInvoice)
            throw new Error('Sales Invoice not found');
        const baseAmount = salesInvoice.items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.unitPrice)), 0);
        const taxAmount = baseAmount * 0.11;
        const invoice = await this.prisma.taxInvoice.create({
            data: {
                tenantId: req.user.tenantId,
                invoiceNo: `TAX-${salesInvoice.code}`,
                invoiceDate: new Date(),
                customerId: salesInvoice.customerId,
                customerName: salesInvoice.customer.name,
                customerNpwp: salesInvoice.customer.npwp,
                customerAddress: salesInvoice.customer.taxAddress || salesInvoice.customer.address1,
                baseAmount,
                taxAmount,
                referenceNo: salesInvoice.code,
                taxPeriod: (new Date().getMonth() + 1).toString().padStart(2, '0'),
                taxYear: new Date().getFullYear(),
                invoiceType: 'OUTPUT',
                status: 'DRAFT',
            },
        });
        return { invoice };
    }
    async issueFp(req, id) {
        const invoice = await this.prisma.taxInvoice.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!invoice)
            throw new Error('Invoice not found');
        const nsfpRange = await this.prisma.nsfpRange.findFirst({
            where: { tenantId: req.user.tenantId, endDate: null },
            orderBy: { startNo: 'asc' }
        });
        if (!nsfpRange)
            throw new Error('No active NSFP range found. Please upload NSFP range first.');
        let nextNo = nsfpRange.lastUsedNo ? (parseInt(nsfpRange.lastUsedNo.slice(-8)) + 1).toString() : nsfpRange.startNo.slice(-8);
        const fpNumber = nsfpRange.startNo.slice(0, 7) + '.' + nextNo.padStart(8, '0');
        const updated = await this.prisma.taxInvoice.update({
            where: { id },
            data: {
                fpNumber,
                fpDate: new Date(),
                status: 'POSTED'
            },
        });
        await this.prisma.nsfpRange.update({
            where: { id: nsfpRange.id },
            data: { lastUsedNo: fpNumber, isUsed: true }
        });
        return { invoice: updated };
    }
};
exports.FakturKeluaranController = FakturKeluaranController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.fakturKeluaran.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('tax.fakturKeluaran.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.fakturKeluaran.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('auto-generate-from-sales/:invoiceId'),
    (0, permissions_decorator_1.RequirePermissions)('tax.fakturKeluaran.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('invoiceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "autoGenerate", null);
__decorate([
    (0, common_1.Post)(':id/issue-fp'),
    (0, permissions_decorator_1.RequirePermissions)('tax.fakturKeluaran.issue'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "issueFp", null);
exports.FakturKeluaranController = FakturKeluaranController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/faktur-keluaran'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FakturKeluaranController);
let FakturMasukanController = class FakturMasukanController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period) {
        const where = { tenantId: req.user.tenantId, invoiceType: 'INPUT' };
        if (period) {
            const [year, month] = period.split('-');
            where.taxYear = parseInt(year);
            where.taxPeriod = month;
        }
        const invoices = await this.prisma.taxInvoice.findMany({
            where,
            orderBy: { invoiceDate: 'desc' },
        });
        return { invoices };
    }
    async create(req, body) {
        const invoice = await this.prisma.taxInvoice.create({
            data: {
                tenantId: req.user.tenantId,
                invoiceNo: body.invoiceNo,
                invoiceDate: new Date(body.invoiceDate),
                supplierId: body.supplierId,
                baseAmount: body.baseAmount,
                taxAmount: body.taxAmount,
                invoiceType: 'INPUT',
                fpNumber: body.fpNumber,
                fpDate: body.fpDate ? new Date(body.fpDate) : null,
                status: body.fpNumber ? 'POSTED' : 'DRAFT',
            },
        });
        return { invoice };
    }
};
exports.FakturMasukanController = FakturMasukanController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.fakturMasukan.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturMasukanController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.fakturMasukan.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FakturMasukanController.prototype, "create", null);
exports.FakturMasukanController = FakturMasukanController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/faktur-masukan'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FakturMasukanController);
let NsfpController = class NsfpController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const ranges = await this.prisma.nsfpRange.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { startNo: 'desc' },
        });
        return { ranges };
    }
    async create(req, body) {
        const range = await this.prisma.nsfpRange.create({
            data: {
                tenantId: req.user.tenantId,
                startNo: body.startNo,
                endNo: body.endNo,
                startDate: new Date(body.startDate),
                isUsed: false,
            },
        });
        return { range };
    }
    async useNsfp(req, id, body) {
        const range = await this.prisma.nsfpRange.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!range)
            throw new Error('NSFP range not found');
        const updated = await this.prisma.nsfpRange.update({
            where: { id },
            data: { lastUsedNo: body.usedNo, isUsed: true },
        });
        return { range: updated };
    }
};
exports.NsfpController = NsfpController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.nsfp.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NsfpController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.nsfp.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NsfpController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/use'),
    (0, permissions_decorator_1.RequirePermissions)('tax.nsfp.use'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], NsfpController.prototype, "useNsfp", null);
exports.NsfpController = NsfpController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/nsfp'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NsfpController);
let PpnMasaController = class PpnMasaController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async summary(req, period) {
        const [year, month] = period.split('-').map(Number);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        const outputInvoices = await this.prisma.taxInvoice.findMany({
            where: {
                tenantId: req.user.tenantId,
                invoiceType: 'OUTPUT',
                invoiceDate: { gte: startDate, lte: endDate },
                status: 'POSTED',
            },
        });
        const inputInvoices = await this.prisma.taxInvoice.findMany({
            where: {
                tenantId: req.user.tenantId,
                invoiceType: 'INPUT',
                invoiceDate: { gte: startDate, lte: endDate },
                status: 'POSTED',
            },
        });
        const summary = {
            period,
            totalOutput: outputInvoices.reduce((sum, inv) => sum + Number(inv.taxAmount), 0),
            totalInput: inputInvoices.reduce((sum, inv) => sum + Number(inv.taxAmount), 0),
            netPpn: 0,
        };
        summary.netPpn = summary.totalOutput - summary.totalInput;
        return { summary, outputInvoices, inputInvoices };
    }
};
exports.PpnMasaController = PpnMasaController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('tax.ppnMasa.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PpnMasaController.prototype, "summary", null);
exports.PpnMasaController = PpnMasaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('tax/ppn-masa'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PpnMasaController);
//# sourceMappingURL=ppn.controller.js.map