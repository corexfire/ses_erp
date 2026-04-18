"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcommerceModule = void 0;
const common_1 = require("@nestjs/common");
const marketplace_controller_1 = require("./marketplace/marketplace.controller");
const marketplace_channel_controller_1 = require("./marketplace/marketplace-channel.controller");
const marketplace_sync_controller_1 = require("./marketplace/marketplace-sync.controller");
const audit_service_1 = require("../audit/audit.service");
let EcommerceModule = class EcommerceModule {
};
exports.EcommerceModule = EcommerceModule;
exports.EcommerceModule = EcommerceModule = __decorate([
    (0, common_1.Module)({
        providers: [audit_service_1.AuditService],
        controllers: [
            marketplace_controller_1.MarketplaceController,
            marketplace_channel_controller_1.MarketplaceChannelController,
            marketplace_sync_controller_1.MarketplaceSyncController,
        ],
        exports: [],
    })
], EcommerceModule);
//# sourceMappingURL=ecommerce.module.js.map