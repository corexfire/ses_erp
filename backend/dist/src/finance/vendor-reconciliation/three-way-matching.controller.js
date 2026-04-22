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
exports.ThreeWayMatchingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
const audit_service_1 = require("../../audit/audit.service");
let ThreeWayMatchingController = class ThreeWayMatchingController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const matches = await this.prisma.threeWayMatching.findMany({
            where,
            include: {
                order: {
                    select: {
                        code: true,
                        supplier: { select: { name: true, code: true } },
                    },
                },
                invoice: {
                    select: {
                        code: true,
                        grandTotal: true,
                    },
                },
                receipt: {
                    select: {
                        code: true,
                    },
                },
            },
            orderBy: { matchDate: 'desc' },
        });
        return { matches };
    }
    async get(req, id) {
        const match = await this.prisma.threeWayMatching.findFirst({
            where: {
                id,
                tenantId: req.user.tenantId,
            },
            include: {
                order: {
                    include: {
                        items: true,
                        supplier: true,
                    },
                },
                receipt: {
                    include: {
                        items: true,
                    },
                },
                invoice: {
                    include: {
                        items: true,
                    },
                },
            },
        });
        return { match };
    }
    async autoMatch(req) {
        return {
            message: 'Auto-match trigger executed. Processing un-reconciled documents.',
            processedCount: 0
        };
    }
};
exports.ThreeWayMatchingController = ThreeWayMatchingController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('finance.reconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ThreeWayMatchingController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('finance.reconciliation.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ThreeWayMatchingController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('auto-match'),
    (0, permissions_decorator_1.RequirePermissions)('finance.reconciliation.create'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThreeWayMatchingController.prototype, "autoMatch", null);
exports.ThreeWayMatchingController = ThreeWayMatchingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('finance/vendor-reconciliation'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], ThreeWayMatchingController);
//# sourceMappingURL=three-way-matching.controller.js.map