"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionModule = void 0;
const common_1 = require("@nestjs/common");
const construction_controller_1 = require("./construction.controller");
const material_request_controller_1 = require("./material-request.controller");
const subcontractor_controller_1 = require("./subcontractor.controller");
const daily_progress_controller_1 = require("./daily-progress.controller");
const drawing_controller_1 = require("./drawing.controller");
const hse_controller_1 = require("./hse.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_module_1 = require("../notification/notification.module");
const expansion_controller_1 = require("./expansion.controller");
let ConstructionModule = class ConstructionModule {
};
exports.ConstructionModule = ConstructionModule;
exports.ConstructionModule = ConstructionModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        controllers: [
            construction_controller_1.ConstructionController,
            material_request_controller_1.MaterialRequestController,
            subcontractor_controller_1.SubcontractorController,
            daily_progress_controller_1.DailyProgressController,
            drawing_controller_1.DrawingController,
            hse_controller_1.HseController,
            expansion_controller_1.ConstructionExpansionController
        ],
        providers: [prisma_service_1.PrismaService],
    })
], ConstructionModule);
//# sourceMappingURL=construction.module.js.map