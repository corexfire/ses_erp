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
exports.FiscalReconciliationController = exports.EqualizationController = exports.IdBillingController = exports.BuktiPotongController = exports.Pph21Controller = exports.EBupotController = exports.PpnMasaController = exports.NsfpController = exports.FakturMasukanController = exports.FakturKeluaranController = void 0;
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
            include: { customer: true, items: { include: { taxCode: true } } }
        });
        if (!salesInvoice)
            throw new Error('Sales Invoice not found');
        let baseAmount = 0;
        let taxAmount = 0;
        for (const item of salesInvoice.items) {
            const qty = Number(item.qty) || 0;
            const price = Number(item.unitPrice) || 0;
            const disc = Number(item.discount) || 0;
            const lineBase = (qty * price) * (1 - disc / 100);
            baseAmount += lineBase;
            if (item.taxCode) {
                const rate = Number(item.taxCode.rate) || 0;
                taxAmount += lineBase * (rate > 1 ? rate / 100 : rate);
            }
        }
        const invoice = await this.prisma.taxInvoice.create({
            data: {
                tenantId: req.user.tenantId,
                invoiceNo: `FK-${salesInvoice.code}`,
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
            data: { fpNumber, fpDate: new Date(), status: 'POSTED' },
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
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fakturKeluaran.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fakturKeluaran.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fakturKeluaran.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('auto-generate-from-sales/:invoiceId'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fakturKeluaran.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('invoiceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "autoGenerate", null);
__decorate([
    (0, common_1.Post)(':id/issue-fp'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fakturKeluaran.issue'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturKeluaranController.prototype, "issueFp", null);
exports.FakturKeluaranController = FakturKeluaranController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/faktur-keluaran'),
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
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fakturMasukan.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FakturMasukanController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fakturMasukan.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FakturMasukanController.prototype, "create", null);
exports.FakturMasukanController = FakturMasukanController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/faktur-masukan'),
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
};
exports.NsfpController = NsfpController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.nsfp.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NsfpController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.nsfp.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NsfpController.prototype, "create", null);
exports.NsfpController = NsfpController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/nsfp'),
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
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.ppnMasa.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PpnMasaController.prototype, "summary", null);
exports.PpnMasaController = PpnMasaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/ppn-masa'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PpnMasaController);
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
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.eBupot.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.eBupot.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.eBupot.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/issue-bupot'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.eBupot.issue'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], EBupotController.prototype, "issueBupot", null);
exports.EBupotController = EBupotController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/e-bupot'),
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
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.pph21.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], Pph21Controller.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.pph21.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Pph21Controller.prototype, "create", null);
exports.Pph21Controller = Pph21Controller = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/pph21'),
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
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.buktiPotong.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuktiPotongController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/print'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.buktiPotong.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuktiPotongController.prototype, "print", null);
exports.BuktiPotongController = BuktiPotongController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/bukti-potong'),
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
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.idBilling.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdBillingController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.idBilling.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdBillingController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/paid'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.idBilling.paid'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IdBillingController.prototype, "markPaid", null);
exports.IdBillingController = IdBillingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/id-billing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IdBillingController);
let EqualizationController = class EqualizationController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req) {
        const equalizations = await this.prisma.taxEqualization.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { period: 'desc' },
        });
        return { equalizations };
    }
    async get(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { equalization };
    }
    async create(req, body) {
        const difference = body.fiscalIncome - body.bookIncome;
        const equalization = await this.prisma.taxEqualization.create({
            data: {
                tenantId: req.user.tenantId,
                period: body.period,
                bookIncome: body.bookIncome,
                fiscalIncome: body.fiscalIncome,
                difference,
                description: body.description,
                status: 'DRAFT',
            },
        });
        return { equalization };
    }
    async approve(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!equalization)
            throw new Error('Equalization not found');
        const updated = await this.prisma.taxEqualization.update({
            where: { id },
            data: { status: 'APPROVED' },
        });
        return { equalization: updated };
    }
};
exports.EqualizationController = EqualizationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.equalization.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.equalization.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.equalization.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.equalization.approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EqualizationController.prototype, "approve", null);
exports.EqualizationController = EqualizationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/equalization'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EqualizationController);
let FiscalReconciliationController = class FiscalReconciliationController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, period) {
        const where = { tenantId: req.user.tenantId };
        if (period)
            where.period = period;
        const equalizations = await this.prisma.taxEqualization.findMany({
            where,
            orderBy: { period: 'desc' },
        });
        return { equalizations };
    }
    async get(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return { equalization };
    }
    async generateReport(req, id) {
        const equalization = await this.prisma.taxEqualization.findFirst({ where: { id, tenantId: req.user.tenantId } });
        if (!equalization)
            throw new Error('Equalization not found');
        const journalLines = await this.prisma.journalEntryLine.findMany({
            where: {
                tenantId: req.user.tenantId,
                journalEntry: { status: 'POSTED' },
            },
            include: { journalEntry: true },
        });
        const report = {
            equalizationId: id,
            period: equalization.period,
            bookIncome: Number(equalization.bookIncome),
            fiscalIncome: Number(equalization.fiscalIncome),
            difference: Number(equalization.difference),
            adjustments: [
                { item: 'Non-deductible Entertainment', amount: 45000000, type: 'POSITIVE' },
                { item: 'Tax Penalty & Interest', amount: 12500000, type: 'POSITIVE' },
                { item: 'Member Benefit Expenses', amount: 25000000, type: 'POSITIVE' },
                { item: 'Depreciation Difference', amount: -15000000, type: 'NEGATIVE' },
            ],
            journalSummary: journalLines.length,
        };
        return { report };
    }
};
exports.FiscalReconciliationController = FiscalReconciliationController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fiscalReconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FiscalReconciliationController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fiscalReconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FiscalReconciliationController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(':id/generate-report'),
    (0, permissions_decorator_1.RequirePermissions)('finance.tax.fiscalReconciliation.generate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FiscalReconciliationController.prototype, "generateReport", null);
exports.FiscalReconciliationController = FiscalReconciliationController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/tax/fiscal-reconciliation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FiscalReconciliationController);
//# sourceMappingURL=tax-compliance.controller.js.map