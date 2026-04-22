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
exports.SystemConfigsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const upsert_system_config_dto_1 = require("./dto/upsert-system-config.dto");
const audit_service_1 = require("../../audit/audit.service");
const permissions_guard_1 = require("../../auth/permissions.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
let SystemConfigsController = class SystemConfigsController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req) {
        const configs = await this.prisma.systemConfig.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: [{ group: 'asc' }, { key: 'asc' }],
        });
        return { configs };
    }
    async get(req, key) {
        const config = await this.prisma.systemConfig.findUnique({
            where: {
                tenantId_key: {
                    tenantId: req.user.tenantId,
                    key,
                },
            },
        });
        return { config };
    }
    async upsert(req, body) {
        const config = await this.prisma.systemConfig.upsert({
            where: {
                tenantId_key: {
                    tenantId: req.user.tenantId,
                    key: body.key,
                },
            },
            update: {
                group: body.group,
                value: body.value,
                description: body.description,
                status: body.status ?? 'ACTIVE',
            },
            create: {
                tenantId: req.user.tenantId,
                key: body.key,
                group: body.group,
                value: body.value,
                description: body.description,
                status: body.status ?? 'ACTIVE',
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'upsert',
            entity: 'SystemConfig',
            entityId: config.id,
        });
        return { config };
    }
    async remove(req, key) {
        const config = await this.prisma.systemConfig.delete({
            where: {
                tenantId_key: {
                    tenantId: req.user.tenantId,
                    key,
                },
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'delete',
            entity: 'SystemConfig',
            entityId: config.id,
        });
        return { success: true };
    }
};
exports.SystemConfigsController = SystemConfigsController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('core.systemConfig.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SystemConfigsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':key'),
    (0, permissions_decorator_1.RequirePermissions)('core.systemConfig.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SystemConfigsController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(),
    (0, permissions_decorator_1.RequirePermissions)('core.systemConfig.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_system_config_dto_1.UpsertSystemConfigDto]),
    __metadata("design:returntype", Promise)
], SystemConfigsController.prototype, "upsert", null);
__decorate([
    (0, common_1.Delete)(':key'),
    (0, permissions_decorator_1.RequirePermissions)('core.systemConfig.delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SystemConfigsController.prototype, "remove", null);
exports.SystemConfigsController = SystemConfigsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('core/system-configs'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], SystemConfigsController);
//# sourceMappingURL=system-configs.controller.js.map