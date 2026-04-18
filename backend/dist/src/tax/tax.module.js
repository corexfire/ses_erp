"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxModule = void 0;
const common_1 = require("@nestjs/common");
const ppn_controller_1 = require("./ppn/ppn.controller");
const pph_controller_1 = require("./pph/pph.controller");
const compliance_controller_1 = require("./compliance/compliance.controller");
let TaxModule = class TaxModule {
};
exports.TaxModule = TaxModule;
exports.TaxModule = TaxModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            ppn_controller_1.FakturKeluaranController,
            ppn_controller_1.FakturMasukanController,
            ppn_controller_1.NsfpController,
            ppn_controller_1.PpnMasaController,
            pph_controller_1.EBupotController,
            pph_controller_1.Pph21Controller,
            pph_controller_1.BuktiPotongController,
            pph_controller_1.IdBillingController,
            compliance_controller_1.EqualizationController,
            compliance_controller_1.FiscalReconciliationController,
        ],
    })
], TaxModule);
//# sourceMappingURL=tax.module.js.map