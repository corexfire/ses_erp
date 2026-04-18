"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsmModule = void 0;
const common_1 = require("@nestjs/common");
const fsm_service_1 = require("./fsm.service");
const fsm_controller_1 = require("./fsm.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const spare_parts_service_1 = require("./spare-parts.service");
const spare_parts_controller_1 = require("./spare-parts.controller");
const handover_service_1 = require("./handover.service");
const handover_controller_1 = require("./handover.controller");
let FsmModule = class FsmModule {
};
exports.FsmModule = FsmModule;
exports.FsmModule = FsmModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [fsm_controller_1.FsmController, spare_parts_controller_1.SparePartsController, handover_controller_1.HandoverController],
        providers: [fsm_service_1.FsmService, spare_parts_service_1.SparePartsService, handover_service_1.HandoverService],
        exports: [fsm_service_1.FsmService, spare_parts_service_1.SparePartsService, handover_service_1.HandoverService],
    })
], FsmModule);
//# sourceMappingURL=fsm.module.js.map