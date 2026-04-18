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
exports.NcrController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const ncr_service_1 = require("./ncr.service");
const create_ncr_dto_1 = require("./dto/create-ncr.dto");
const update_ncr_dto_1 = require("./dto/update-ncr.dto");
let NcrController = class NcrController {
    ncrService;
    constructor(ncrService) {
        this.ncrService = ncrService;
    }
    async list(req, query) {
        const list = await this.ncrService.findAll(req.user.tenantId, query);
        return { list };
    }
    async get(req, id) {
        const ncr = await this.ncrService.findOne(req.user.tenantId, id);
        return { ncr };
    }
    async create(req, body) {
        const ncr = await this.ncrService.create(req.user.tenantId, req.user.id, body);
        return { ncr };
    }
    async update(req, id, body) {
        const ncr = await this.ncrService.update(req.user.tenantId, id, body);
        return { ncr };
    }
    async submit(req, id) {
        const instance = await this.ncrService.submitToWorkflow(req.user.tenantId, req.user.id, id);
        return { instance };
    }
};
exports.NcrController = NcrController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('qms.ncr.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NcrController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('qms.ncr.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NcrController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('qms.ncr.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_ncr_dto_1.CreateNcrDto]),
    __metadata("design:returntype", Promise)
], NcrController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('qms.ncr.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_ncr_dto_1.UpdateNcrDto]),
    __metadata("design:returntype", Promise)
], NcrController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, permissions_decorator_1.RequirePermissions)('qms.ncr.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NcrController.prototype, "submit", null);
exports.NcrController = NcrController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('qms/ncr'),
    __metadata("design:paramtypes", [ncr_service_1.NcrService])
], NcrController);
//# sourceMappingURL=ncr.controller.js.map