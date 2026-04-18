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
exports.SupplierRatingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const supplier_rating_service_1 = require("./supplier-rating.service");
let SupplierRatingController = class SupplierRatingController {
    ratingService;
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async list(req, period) {
        const list = await this.ratingService.findAll(req.user.tenantId, period || '2024-Q2');
        return { list };
    }
    async calculate(req, period) {
        return this.ratingService.calculateRatings(req.user.tenantId, period || '2024-Q2');
    }
};
exports.SupplierRatingController = SupplierRatingController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('qms.supplier_rating.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SupplierRatingController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('calculate'),
    (0, permissions_decorator_1.RequirePermissions)('qms.supplier_rating.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SupplierRatingController.prototype, "calculate", null);
exports.SupplierRatingController = SupplierRatingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('qms/supplier-rating'),
    __metadata("design:paramtypes", [supplier_rating_service_1.SupplierRatingService])
], SupplierRatingController);
//# sourceMappingURL=supplier-rating.controller.js.map