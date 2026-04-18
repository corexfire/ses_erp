"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportModule = void 0;
const common_1 = require("@nestjs/common");
const asset_controller_1 = require("./asset.controller");
const document_controller_1 = require("./document.controller");
const compliance_controller_1 = require("./compliance.controller");
const bi_controller_1 = require("./bi.controller");
const sustainability_controller_1 = require("./sustainability.controller");
let SupportModule = class SupportModule {
};
exports.SupportModule = SupportModule;
exports.SupportModule = SupportModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            bi_controller_1.SupportBiController,
            compliance_controller_1.SupportComplianceController,
            asset_controller_1.AssetSupportController,
            document_controller_1.SupportDocumentController,
            sustainability_controller_1.SupportSustainabilityController
        ],
    })
], SupportModule);
//# sourceMappingURL=support.module.js.map