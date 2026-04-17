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
exports.SparePartsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const spare_parts_service_1 = require("./spare-parts.service");
const create_spare_part_dto_1 = require("./dto/create-spare-part.dto");
const update_spare_part_dto_1 = require("./dto/update-spare-part.dto");
let SparePartsController = class SparePartsController {
    sparePartsService;
    constructor(sparePartsService) {
        this.sparePartsService = sparePartsService;
    }
    async findAll(req, query) {
        return this.sparePartsService.findAll(req.user.tenantId, query);
    }
    async getStats(req) {
        return this.sparePartsService.getStats(req.user.tenantId);
    }
    async findOne(req, id) {
        return this.sparePartsService.findOne(req.user.tenantId, id);
    }
    async create(req, dto) {
        return this.sparePartsService.create(req.user.tenantId, dto);
    }
    async update(req, id, dto) {
        return this.sparePartsService.update(req.user.tenantId, id, dto);
    }
    async remove(req, id) {
        return this.sparePartsService.remove(req.user.tenantId, id);
    }
};
exports.SparePartsController = SparePartsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_spare_part_dto_1.CreateSparePartDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_spare_part_dto_1.UpdateSparePartDto]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SparePartsController.prototype, "remove", null);
exports.SparePartsController = SparePartsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('fsm/spare-parts'),
    __metadata("design:paramtypes", [spare_parts_service_1.SparePartsService])
], SparePartsController);
//# sourceMappingURL=spare-parts.controller.js.map