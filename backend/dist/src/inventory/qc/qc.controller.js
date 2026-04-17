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
exports.QcController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const ncr_service_1 = require("../../qms/ncr/ncr.service");
const update_qc_dto_1 = require("./dto/update-qc.dto");
let QcController = class QcController {
    prisma;
    audit;
    ncrService;
    constructor(prisma, audit, ncrService) {
        this.prisma = prisma;
        this.audit = audit;
        this.ncrService = ncrService;
    }
    async list(req, status) {
        const inspections = await this.prisma.qcInspection.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(status && ['DRAFT', 'SUBMITTED', 'POSTED', 'VOID'].includes(status)
                    ? { status: status }
                    : {}),
            },
            orderBy: [{ createdAt: 'desc' }],
            include: { grn: { include: { supplier: true, warehouse: true } } },
            take: 200,
        });
        return { inspections };
    }
    async get(req, id) {
        const inspection = await this.prisma.qcInspection.findUnique({
            where: { id, tenantId: req.user.tenantId },
            include: { grn: { include: { supplier: true, warehouse: true } }, items: true },
        });
        if (!inspection)
            throw new common_1.NotFoundException('QC inspection not found');
        return { inspection };
    }
    async update(req, id, body) {
        const exists = await this.prisma.qcInspection.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('QC inspection not found');
        const inspection = await this.prisma.qcInspection.update({
            where: { id },
            data: { status: body.status ?? undefined, notes: body.notes ?? undefined },
        });
        if (body.status === 'POSTED') {
            await this.ncrService.generateFromQc(req.user.tenantId, req.user.id, id);
        }
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'QcInspection',
            entityId: inspection.id,
        });
        return { inspection };
    }
};
exports.QcController = QcController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('inventory.qc.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QcController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.qc.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], QcController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('inventory.qc.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_qc_dto_1.UpdateQcDto]),
    __metadata("design:returntype", Promise)
], QcController.prototype, "update", null);
exports.QcController = QcController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('inventory/qc'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService,
        ncr_service_1.NcrService])
], QcController);
//# sourceMappingURL=qc.controller.js.map