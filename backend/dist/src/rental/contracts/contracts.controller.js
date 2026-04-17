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
exports.RentalContractsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let RentalContractsController = class RentalContractsController {
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
                { contractNo: { contains: search, mode: 'insensitive' } },
                { customer: { name: { contains: search, mode: 'insensitive' } } },
                { assetDescription: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.status = status;
        }
        const contracts = await this.prisma.rentalContract.findMany({
            where,
            include: {
                customer: { select: { name: true, code: true } },
                asset: { select: { assetNo: true } }
            },
            orderBy: { createdAt: 'desc' },
        });
        const summary = {
            active: await this.prisma.rentalContract.count({ where: { tenantId: user.tenantId, status: 'ACTIVE' } }),
            completed: await this.prisma.rentalContract.count({ where: { tenantId: user.tenantId, status: 'COMPLETED' } }),
            terminated: await this.prisma.rentalContract.count({ where: { tenantId: user.tenantId, status: 'TERMINATED' } })
        };
        return { data: contracts, summary };
    }
    async create(req, body) {
        const user = req.user;
        const contractNo = body.contractNo || `RNT-${new Date().getFullYear()}-${Math.floor(Math.random() * 8999 + 1000)}`;
        const contract = await this.prisma.rentalContract.create({
            data: {
                tenantId: user.tenantId,
                contractNo,
                customerId: body.customerId,
                assetId: body.assetId || null,
                assetDescription: body.assetDescription || null,
                billingCycle: body.billingCycle,
                status: body.status || 'DRAFT',
                startDate: body.startDate ? new Date(body.startDate) : new Date(),
                endDate: body.endDate ? new Date(body.endDate) : null,
                rentalRate: body.rentalRate || 0,
                depositAmount: body.depositAmount || 0,
                notes: body.notes
            },
        });
        await this.audit.log(user.tenantId, user.id, 'CREATE', 'RentalContract', contract.id, null, contract);
        return { message: 'Rental Contract created successfully', data: contract };
    }
    async update(req, id, body) {
        const user = req.user;
        const existing = await this.prisma.rentalContract.findUnique({
            where: { id },
        });
        if (!existing || existing.tenantId !== user.tenantId) {
            throw new common_1.NotFoundException('Contract not found');
        }
        const data = {};
        if (body.assetId !== undefined)
            data.assetId = body.assetId;
        if (body.assetDescription !== undefined)
            data.assetDescription = body.assetDescription;
        if (body.billingCycle !== undefined)
            data.billingCycle = body.billingCycle;
        if (body.status !== undefined)
            data.status = body.status;
        if (body.rentalRate !== undefined)
            data.rentalRate = body.rentalRate;
        if (body.depositAmount !== undefined)
            data.depositAmount = body.depositAmount;
        if (body.notes !== undefined)
            data.notes = body.notes;
        if (body.startDate)
            data.startDate = new Date(body.startDate);
        if (body.endDate)
            data.endDate = new Date(body.endDate);
        if (body.customerId)
            data.customerId = body.customerId;
        const updated = await this.prisma.rentalContract.update({
            where: { id },
            data,
        });
        await this.audit.log(user.tenantId, user.id, 'UPDATE', 'RentalContract', id, existing, updated);
        return { message: 'Rental Contract updated successfully', data: updated };
    }
    async getAssets(req) {
        const user = req.user;
        const assets = await this.prisma.fixedAsset.findMany({
            where: { tenantId: user.tenantId },
            select: { id: true, assetNo: true }
        });
        return { data: assets };
    }
};
exports.RentalContractsController = RentalContractsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RentalContractsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RentalContractsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RentalContractsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('assets'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentalContractsController.prototype, "getAssets", null);
exports.RentalContractsController = RentalContractsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('rental/contracts'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RentalContractsController);
//# sourceMappingURL=contracts.controller.js.map