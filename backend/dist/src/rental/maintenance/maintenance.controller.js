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
exports.RentalMaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let RentalMaintenanceController = class RentalMaintenanceController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async findAll(req, search, status) {
        const user = req.user;
        const where = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
        if (search) {
            where.OR = [
                { ticketNo: { contains: search, mode: 'insensitive' } },
                { issueDescription: { contains: search, mode: 'insensitive' } },
                { contract: { contractNo: { contains: search, mode: 'insensitive' } } },
                { asset: { assetNo: { contains: search, mode: 'insensitive' } } },
            ];
        }
        if (status) {
            where.status = status;
        }
        const maintenances = await this.prisma.rentalMaintenance.findMany({
            where,
            include: {
                asset: { select: { assetNo: true } },
                contract: { select: { contractNo: true } }
            },
            orderBy: { createdAt: 'desc' },
        });
        const summaryWhere = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
        const summaryAggr = await this.prisma.rentalMaintenance.groupBy({
            by: ['status'],
            where: summaryWhere,
            _sum: { costAmount: true }
        });
        const summary = {
            scheduled: await this.prisma.rentalMaintenance.count({ where: { ...summaryWhere, status: 'SCHEDULED' } }),
            inProgress: await this.prisma.rentalMaintenance.count({ where: { ...summaryWhere, status: 'IN_PROGRESS' } }),
            completed: await this.prisma.rentalMaintenance.count({ where: { ...summaryWhere, status: 'COMPLETED' } }),
            totalCost: summaryAggr.reduce((sum, item) => sum + (Number(item._sum.costAmount) || 0), 0)
        };
        return { data: maintenances, summary };
    }
    async create(req, body) {
        const user = req.user;
        const ticketNo = body.ticketNo || `RWO-${new Date().getFullYear()}-${Math.floor(Math.random() * 89999 + 10000)}`;
        const record = await this.prisma.rentalMaintenance.create({
            data: {
                tenantId: user.tenantId,
                ticketNo,
                contractId: body.contractId || null,
                assetId: body.assetId || null,
                type: body.type || 'REPAIR',
                priority: body.priority || 'LOW',
                status: body.status || 'SCHEDULED',
                scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : new Date(),
                costAmount: body.costAmount || 0,
                mechanicName: body.mechanicName || null,
                issueDescription: body.issueDescription || '',
                resolutionNotes: body.resolutionNotes || null
            },
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'CREATE', entity: 'RentalMaintenance', entityId: record.id, });
        return { message: 'Maintenance Work Order created', data: record };
    }
    async update(req, id, body) {
        const user = req.user;
        const existing = await this.prisma.rentalMaintenance.findUnique({
            where: { id },
        });
        if (!existing || existing.tenantId !== user.tenantId) {
            throw new common_1.NotFoundException('Work Order not found');
        }
        const data = {};
        if (body.status !== undefined) {
            data.status = body.status;
            if (data.status === 'COMPLETED' && existing.status !== 'COMPLETED') {
                data.completionDate = new Date();
            }
        }
        if (body.type !== undefined)
            data.type = body.type;
        if (body.priority !== undefined)
            data.priority = body.priority;
        if (body.costAmount !== undefined)
            data.costAmount = body.costAmount;
        if (body.mechanicName !== undefined)
            data.mechanicName = body.mechanicName;
        if (body.issueDescription !== undefined)
            data.issueDescription = body.issueDescription;
        if (body.resolutionNotes !== undefined)
            data.resolutionNotes = body.resolutionNotes;
        if (body.scheduledDate)
            data.scheduledDate = new Date(body.scheduledDate);
        const updated = await this.prisma.rentalMaintenance.update({
            where: { id },
            data,
        });
        await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'UPDATE', entity: 'RentalMaintenance', entityId: id, metadata: existing });
        return { message: 'Maintenance Work Order updated', data: updated };
    }
    async getLookups(req) {
        const user = req.user;
        const contractWhere = user.isSuperAdmin ? { status: 'ACTIVE' } : { tenantId: user.tenantId, status: 'ACTIVE' };
        const assetWhere = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
        const contracts = await this.prisma.rentalContract.findMany({
            where: contractWhere,
            select: { id: true, contractNo: true }
        });
        const assets = await this.prisma.fixedAsset.findMany({
            where: assetWhere,
            select: { id: true, assetNo: true }
        });
        return { data: { contracts, assets } };
    }
};
exports.RentalMaintenanceController = RentalMaintenanceController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RentalMaintenanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RentalMaintenanceController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RentalMaintenanceController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('lookups'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentalMaintenanceController.prototype, "getLookups", null);
exports.RentalMaintenanceController = RentalMaintenanceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('rental/maintenance'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], RentalMaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map