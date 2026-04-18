"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QmsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const workflow_module_1 = require("../workflow/workflow.module");
const ncr_controller_1 = require("./ncr/ncr.controller");
const ncr_service_1 = require("./ncr/ncr.service");
const capa_controller_1 = require("./capa/capa.controller");
const capa_service_1 = require("./capa/capa.service");
const supplier_rating_controller_1 = require("./supplier-rating/supplier-rating.controller");
const supplier_rating_service_1 = require("./supplier-rating/supplier-rating.service");
const quality_document_controller_1 = require("./documents/quality-document.controller");
const quality_document_service_1 = require("./documents/quality-document.service");
const calibration_controller_1 = require("./calibration/calibration.controller");
const calibration_service_1 = require("./calibration/calibration.service");
let QmsModule = class QmsModule {
};
exports.QmsModule = QmsModule;
exports.QmsModule = QmsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, workflow_module_1.WorkflowModule],
        controllers: [ncr_controller_1.NcrController, capa_controller_1.CapaController, supplier_rating_controller_1.SupplierRatingController, quality_document_controller_1.QualityDocumentController, calibration_controller_1.CalibrationController],
        providers: [ncr_service_1.NcrService, capa_service_1.CapaService, supplier_rating_service_1.SupplierRatingService, quality_document_service_1.QualityDocumentService, calibration_service_1.CalibrationService],
        exports: [ncr_service_1.NcrService, capa_service_1.CapaService, supplier_rating_service_1.SupplierRatingService, quality_document_service_1.QualityDocumentService, calibration_service_1.CalibrationService],
    })
], QmsModule);
//# sourceMappingURL=qms.module.js.map