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
exports.PrintFormatsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const upsert_print_format_dto_1 = require("./dto/upsert-print-format.dto");
const audit_service_1 = require("../../audit/audit.service");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
let PrintFormatsController = class PrintFormatsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req) {
        const formats = await this.prisma.printFormat.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ module: 'asc' }, { name: 'asc' }],
        });
        return { formats };
    }
    async get(req, id) {
        const format = await this.prisma.printFormat.findUnique({
            where: { id, tenantId: req.user.tenantId },
        });
        return { format };
    }
    async upsert(req, body) {
        if (body.isDefault) {
            await this.prisma.printFormat.updateMany({
                where: {
                    tenantId: req.user.tenantId,
                    docType: body.docType,
                    isDefault: true,
                },
                data: { isDefault: false },
            });
        }
        const format = await this.prisma.printFormat.upsert({
            where: {
                tenantId_name: {
                    tenantId: req.user.tenantId,
                    name: body.name,
                },
            },
            update: {
                ...body,
            },
            create: {
                tenantId: req.user.tenantId,
                ...body,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'upsert',
            entity: 'PrintFormat',
            entityId: format.id,
        });
        return { format };
    }
    async remove(req, id) {
        const format = await this.prisma.printFormat.delete({
            where: { id, tenantId: req.user.tenantId },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'delete',
            entity: 'PrintFormat',
            entityId: format.id,
        });
        return { success: true };
    }
};
exports.PrintFormatsController = PrintFormatsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.printFormat.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PrintFormatsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('core.printFormat.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PrintFormatsController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    (0, permissions_decorator_1.RequirePermissions)('core.printFormat.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_print_format_dto_1.UpsertPrintFormatDto]),
    __metadata("design:returntype", Promise)
], PrintFormatsController.prototype, "upsert", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('core.printFormat.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PrintFormatsController.prototype, "remove", null);
exports.PrintFormatsController = PrintFormatsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/print-formats'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], PrintFormatsController);
//# sourceMappingURL=print-formats.controller.js.map