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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardController = class DashboardController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(req, date) {
        const targetDate = date ? new Date(date) : new Date();
        const startOfDay = new Date(targetDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDate);
        endOfDay.setHours(23, 59, 59, 999);
        const tenantId = req.user.tenantId;
        const [doStatusCounts, tripStatusCounts, todayDeliveries, activeTrips, pendingPods] = await Promise.all([
            this.prisma.deliveryOrder.groupBy({
                by: ['status'],
                where: { tenantId },
                _count: { id: true },
            }),
            this.prisma.tripPlan.groupBy({
                by: ['status'],
                where: { tenantId },
                _count: { id: true },
            }),
            this.prisma.deliveryOrder.findMany({
                where: {
                    tenantId,
                    plannedShipDate: { gte: startOfDay, lte: endOfDay },
                },
                include: { customer: true, warehouse: true },
                orderBy: { plannedShipDate: 'asc' },
                take: 50,
            }),
            this.prisma.tripPlan.findMany({
                where: {
                    tenantId,
                    status: { in: ['DISPATCHED', 'IN_PROGRESS'] },
                },
                include: { vehicle: true, driver: true },
                take: 20,
            }),
            this.prisma.deliveryOrder.count({
                where: {
                    tenantId,
                    status: 'IN_TRANSIT',
                    proofOfDelivery: null,
                },
            }),
        ]);
        const doStatusMap = {};
        for (const item of doStatusCounts) {
            doStatusMap[item.status] = item._count.id;
        }
        const tripStatusMap = {};
        for (const item of tripStatusCounts) {
            tripStatusMap[item.status] = item._count.id;
        }
        const totalDelivered = doStatusMap['DELIVERED'] || 0;
        const deliveredOnTime = await this.prisma.deliveryOrder.count({
            where: {
                tenantId,
                status: 'DELIVERED',
                actualDeliveredAt: { not: null },
            },
        });
        const otifRate = deliveredOnTime > 0 ? (totalDelivered / deliveredOnTime * 100).toFixed(1) : '0.0';
        const totalTrips = Object.values(tripStatusMap).reduce((a, b) => a + b, 0);
        const completedTrips = tripStatusMap['COMPLETED'] || 0;
        return {
            deliveryOrderStatusCount: doStatusMap,
            tripStatusCount: tripStatusMap,
            otifRate: parseFloat(otifRate),
            todayDeliveries: {
                count: todayDeliveries.length,
                items: todayDeliveries,
            },
            activeTrips: {
                count: activeTrips.length,
                items: activeTrips,
            },
            pendingPodCount: pendingPods,
            summary: {
                totalDo: Object.values(doStatusMap).reduce((a, b) => a + b, 0),
                pendingDo: (doStatusMap['DRAFT'] || 0) + (doStatusMap['PLANNED'] || 0) + (doStatusMap['RELEASED'] || 0),
                inTransitDo: doStatusMap['IN_TRANSIT'] || 0,
                deliveredDo: totalDelivered,
                failedDo: doStatusMap['FAILED'] || 0,
                totalTrips,
                completedTrips,
                activeTripsCount: activeTrips.length,
            },
        };
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, permissions_decorator_1.RequirePermissions)('logistics.dashboard.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboard", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('logistics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map