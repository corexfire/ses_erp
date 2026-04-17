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
exports.CostingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const costing_dto_1 = require("./dto/costing.dto");
let CostingController = class CostingController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async listSummaries(req) {
        const costs = await this.prisma.productionCost.findMany({
            where: { tenantId: req.user.tenantId },
            include: {
                workOrder: {
                    include: { finishedGood: true }
                },
                details: true
            },
            orderBy: [{ calculatedAt: 'desc' }],
        });
        return { costs };
    }
    async calculateCost(req, body) {
        const wo = await this.prisma.workOrder.findFirst({
            where: { id: body.workOrderId, tenantId: req.user.tenantId },
            include: {
                bom: {
                    include: { items: { include: { item: true } } }
                },
                productionIssues: {
                    include: { items: true }
                },
                shopFloorLogs: true
            }
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        let actualMaterialCost = 0;
        for (const issue of wo.productionIssues) {
            for (const item of issue.items) {
                actualMaterialCost += Number(item.qtyIssued) * (Number(item.unitCost) || 1000);
            }
        }
        let totalLaborHours = 0;
        wo.shopFloorLogs.forEach(log => {
            totalLaborHours += Number(log.actualLaborHours || 0);
        });
        const laborRate = 75000;
        const actualLaborCost = totalLaborHours * laborRate;
        const fixedOverhead = body.fixedOverheadAmount || 500000;
        const variableOverhead = (body.variableOverheadRate || 25000) * totalLaborHours;
        const actualOverheadCost = fixedOverhead + variableOverhead;
        const actualTotalCost = actualMaterialCost + actualLaborCost + actualOverheadCost;
        let standardMaterialCost = 0;
        if (wo.bom) {
            wo.bom.items.forEach(bi => {
                standardMaterialCost += Number(bi.qty) * 1000;
            });
        }
        const standardTotalCost = standardMaterialCost * 1.2;
        const costRecord = await this.prisma.productionCost.upsert({
            where: {
                tenantId_workOrderId_period: {
                    tenantId: req.user.tenantId,
                    workOrderId: wo.id,
                    period: body.period
                }
            },
            update: {
                materialCost: actualMaterialCost,
                laborCost: actualLaborCost,
                overheadCost: actualOverheadCost,
                totalCost: actualTotalCost,
                standardCost: standardTotalCost,
                actualCost: actualTotalCost,
                materialVariance: actualMaterialCost - standardMaterialCost,
                calculatedAt: new Date()
            },
            create: {
                tenantId: req.user.tenantId,
                workOrderId: wo.id,
                period: body.period,
                materialCost: actualMaterialCost,
                laborCost: actualLaborCost,
                overheadCost: actualOverheadCost,
                totalCost: actualTotalCost,
                standardCost: standardTotalCost,
                actualCost: actualTotalCost,
                materialVariance: actualMaterialCost - standardMaterialCost,
            }
        });
        await this.prisma.productionCostDetail.deleteMany({ where: { productionCostId: costRecord.id } });
        await this.prisma.productionCostDetail.createMany({
            data: [
                { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'MATERIAL', name: 'Raw Material Consumption', actualAmount: actualMaterialCost, standardAmount: standardMaterialCost, variance: actualMaterialCost - standardMaterialCost },
                { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'LABOR', name: 'Shop Floor Direct Labor', actualAmount: actualLaborCost, standardAmount: standardTotalCost * 0.1, variance: 0 },
                { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'OVERHEAD_FIXED', name: 'Factory Rent & Utilities', actualAmount: fixedOverhead, standardAmount: fixedOverhead, variance: 0 },
                { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'OVERHEAD_VARIABLE', name: 'Machine Maintenance & Power', actualAmount: variableOverhead, standardAmount: variableOverhead, variance: 0 },
            ]
        });
        return { cost: costRecord };
    }
    async finalizeCost(req, body) {
        const cost = await this.prisma.productionCost.findFirst({
            where: { id: body.costId, tenantId: req.user.tenantId },
            include: { workOrder: true }
        });
        if (!cost)
            throw new common_1.NotFoundException('Cost record not found');
        return await this.prisma.$transaction(async (tx) => {
            const entryNo = `JV-COST-${Date.now()}`;
            const journal = await tx.journalEntry.create({
                data: {
                    tenantId: req.user.tenantId,
                    entryNo,
                    entryDate: new Date(),
                    description: `Manufacturing Cost Settlement for WO ${cost.workOrder.code}`,
                    status: 'POSTED',
                    totalDebit: cost.totalCost,
                    totalCredit: cost.totalCost,
                    lines: {
                        create: [
                            {
                                tenantId: req.user.tenantId,
                                lineNo: 1,
                                accountCode: '14010',
                                debit: cost.totalCost,
                                credit: 0,
                                description: 'Finished Goods Valuation'
                            },
                            {
                                tenantId: req.user.tenantId,
                                lineNo: 2,
                                accountCode: '14090',
                                debit: 0,
                                credit: cost.totalCost,
                                description: 'WIP Clear out'
                            }
                        ]
                    }
                }
            });
            const updated = await tx.productionCost.update({
                where: { id: cost.id },
                data: {
                    isFinalized: true,
                    journalEntryId: journal.id
                }
            });
            return { cost: updated, journal };
        });
    }
};
exports.CostingController = CostingController;
__decorate([
    (0, common_1.Get)('summaries'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.costing.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "listSummaries", null);
__decorate([
    (0, common_1.Post)('calculate'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.costing.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, costing_dto_1.CalculateCostDto]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "calculateCost", null);
__decorate([
    (0, common_1.Post)('finalize'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.costing.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, costing_dto_1.FinalizeCostDto]),
    __metadata("design:returntype", Promise)
], CostingController.prototype, "finalizeCost", null);
exports.CostingController = CostingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/costing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CostingController);
//# sourceMappingURL=costing.controller.js.map