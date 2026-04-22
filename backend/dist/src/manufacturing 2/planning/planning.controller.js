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
exports.PlanningController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let PlanningController = class PlanningController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listSuggestions(req, status, runId) {
        const suggestions = await this.prisma.mrpSuggestion.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status ? { status } : {}),
                ...(runId ? { mrpRunId: runId } : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { item: true, mrpRun: true },
            take: 200,
        });
        return { suggestions };
    }
    async listRuns(req) {
        const runs = await this.prisma.mrpRun.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ runDate: 'desc' }],
            include: { suggestions: { take: 5 } },
            take: 50,
        });
        return { runs };
    }
    async runMrp(req, body) {
        const items = await this.prisma.item.findMany({
            where: { tenantId: req.user.tenantId, isActive: true },
            include: {
                billOfMaterials: {
                    where: { isActive: true },
                    include: { items: { include: { componentItem: true } } },
                },
            },
        });
        const horizonDays = body.planningHorizonDays ?? 90;
        const periodStart = body.periodStart ? new Date(body.periodStart) : new Date();
        const periodEnd = new Date(periodStart.getTime() + horizonDays * 24 * 60 * 60 * 1000);
        const run = await this.prisma.$transaction(async (tx) => {
            const mrpRun = await tx.mrpRun.create({
                data: {
                    tenantId: req.user.tenantId,
                    runDate: new Date(),
                    demandSource: body.demandSource ?? 'MANUAL',
                    notes: body.notes,
                    planType: body.planType ?? 'STANDARD',
                    planningHorizonDays: horizonDays,
                    periodStart,
                    periodEnd,
                    includeSalesOrder: body.includeSalesOrder ?? true,
                    includeForecast: body.includeForecast ?? false,
                    includeMinStock: body.includeMinStock ?? true,
                },
            });
            for (const item of items) {
                const boms = item.billOfMaterials;
                if (boms.length === 0)
                    continue;
                const mainBom = boms.find((b) => b.isMain) ?? boms[0];
                if (!mainBom.items)
                    continue;
                for (const bomItem of mainBom.items) {
                    const componentRequired = Number(bomItem.qty);
                    const componentStock = await tx.stockLedger.aggregate({
                        where: { tenantId: req.user.tenantId, itemId: bomItem.componentItemId },
                        _sum: { qtyIn: true, qtyOut: true },
                    });
                    const componentOnHand = (Number(componentStock._sum.qtyIn ?? 0) || 0) -
                        (Number(componentStock._sum.qtyOut ?? 0) || 0);
                    if (componentOnHand < componentRequired) {
                        const qtySuggested = componentRequired - componentOnHand;
                        await tx.mrpSuggestion.create({
                            data: {
                                tenantId: req.user.tenantId,
                                mrpRunId: mrpRun.id,
                                itemId: bomItem.componentItemId,
                                suggestionType: 'PURCHASE',
                                qtyRequired: componentRequired,
                                qtyOnHand: componentOnHand,
                                qtyOnOrder: 0,
                                qtySuggested: qtySuggested,
                                dueDate: periodEnd,
                                suggestedDate: new Date(periodStart.getTime() + 7 * 24 * 60 * 60 * 1000),
                                priority: componentOnHand <= 0 ? 90 : componentOnHand < componentRequired / 2 ? 70 : 50,
                                uomCode: bomItem.uomCode ?? undefined,
                                workCenter: 'Gudang Bahan Baku',
                                leadTimeDays: 7,
                            },
                        });
                    }
                }
            }
            return mrpRun;
        });
        return { run };
    }
    async getRun(req, id) {
        const run = await this.prisma.mrpRun.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: { suggestions: { include: { item: true } } },
        });
        if (!run)
            throw new common_1.NotFoundException('MRP run not found');
        return { run };
    }
};
exports.PlanningController = PlanningController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.planning.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('runId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "listSuggestions", null);
__decorate([
    (0, common_1.Get)('runs'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.planning.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "listRuns", null);
__decorate([
    (0, common_1.Post)('run'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.planning.run'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "runMrp", null);
__decorate([
    (0, common_1.Get)('runs/:id'),
    (0, permissions_decorator_1.RequirePermissions)('manufacturing.planning.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PlanningController.prototype, "getRun", null);
exports.PlanningController = PlanningController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('manufacturing/planning'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlanningController);
//# sourceMappingURL=planning.controller.js.map