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
exports.CapaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const capa_service_1 = require("./capa.service");
const create_capa_dto_1 = require("./dto/create-capa.dto");
const update_capa_dto_1 = require("./dto/update-capa.dto");
const prisma_service_1 = require("../../prisma/prisma.service");
let CapaController = class CapaController {
    capaService;
    prisma;
    constructor(capaService, prisma) {
        this.capaService = capaService;
        this.prisma = prisma;
    }
    async list(req, query) {
        const list = await this.capaService.findAll(req.user.tenantId, query);
        return { list };
    }
    async getAuditFindings(req) {
        const findings = await this.capaService.getAuditFindings(req.user.tenantId);
        return { findings };
    }
    async getUsers(req) {
        const users = await this.prisma.user.findMany({
            where: { tenantId: req.user.tenantId, isActive: true },
            select: { id: true, name: true, email: true },
        });
        return { users };
    }
    async get(req, id) {
        const capa = await this.capaService.findOne(req.user.tenantId, id);
        return { capa };
    }
    async create(req, body) {
        const capa = await this.capaService.create(req.user.tenantId, body);
        return { capa };
    }
    async update(req, id, body) {
        const capa = await this.capaService.update(req.user.tenantId, id, body);
        return { capa };
    }
};
exports.CapaController = CapaController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('qms.capa.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CapaController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('references/audits'),
    (0, permissions_decorator_1.RequirePermissions)('qms.capa.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CapaController.prototype, "getAuditFindings", null);
__decorate([
    (0, common_1.Get)('references/users'),
    (0, permissions_decorator_1.RequirePermissions)('qms.capa.read'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CapaController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('qms.capa.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CapaController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('qms.capa.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_capa_dto_1.CreateCapaDto]),
    __metadata("design:returntype", Promise)
], CapaController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('qms.capa.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_capa_dto_1.UpdateCapaDto]),
    __metadata("design:returntype", Promise)
], CapaController.prototype, "update", null);
exports.CapaController = CapaController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('qms/capa'),
    __metadata("design:paramtypes", [capa_service_1.CapaService,
        prisma_service_1.PrismaService])
], CapaController);
//# sourceMappingURL=capa.controller.js.map