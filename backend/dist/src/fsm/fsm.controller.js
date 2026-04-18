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
exports.FsmController = void 0;
const common_1 = require("@nestjs/common");
const fsm_service_1 = require("./fsm.service");
const create_fsm_service_order_dto_1 = require("./dto/create-fsm-service-order.dto");
const update_fsm_service_order_dto_1 = require("./dto/update-fsm-service-order.dto");
const create_fsm_appointment_dto_1 = require("./dto/create-fsm-appointment.dto");
const update_fsm_appointment_dto_1 = require("./dto/update-fsm-appointment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FsmController = class FsmController {
    fsmService;
    constructor(fsmService) {
        this.fsmService = fsmService;
    }
    getDashboardStats(req) {
        return this.fsmService.getDashboardStats(req.user.tenantId);
    }
    createServiceOrder(req, dto) {
        return this.fsmService.createServiceOrder(req.user.tenantId, dto);
    }
    findAllServiceOrders(req, status) {
        return this.fsmService.findAllServiceOrders(req.user.tenantId, status);
    }
    findOneServiceOrder(req, id) {
        return this.fsmService.findOneServiceOrder(req.user.tenantId, id);
    }
    updateServiceOrder(req, id, dto) {
        return this.fsmService.updateServiceOrder(req.user.tenantId, id, dto);
    }
    removeServiceOrder(req, id) {
        return this.fsmService.deleteServiceOrder(req.user.tenantId, id);
    }
    getActiveWorkOrders(req) {
        return this.fsmService.findActiveAppointments(req.user.tenantId);
    }
    createAppointment(req, dto) {
        return this.fsmService.createAppointment(req.user.tenantId, dto);
    }
    findAllAppointments(req) {
        return this.fsmService.findAllAppointments(req.user.tenantId);
    }
    updateAppointment(req, id, dto) {
        return this.fsmService.updateAppointment(req.user.tenantId, id, dto);
    }
    updateStatus(req, id, status) {
        return this.fsmService.updateAppointmentStatus(req.user.tenantId, id, status);
    }
    createReport(req, id, body) {
        return this.fsmService.createReport(req.user.tenantId, id, body.summary, body.resolution);
    }
    findTechnicians(req) {
        return this.fsmService.findTechnicians(req.user.tenantId);
    }
};
exports.FsmController = FsmController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Post)('service-orders'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_fsm_service_order_dto_1.CreateFsmServiceOrderDto]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "createServiceOrder", null);
__decorate([
    (0, common_1.Get)('service-orders'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "findAllServiceOrders", null);
__decorate([
    (0, common_1.Get)('service-orders/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "findOneServiceOrder", null);
__decorate([
    (0, common_1.Patch)('service-orders/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_fsm_service_order_dto_1.UpdateFsmServiceOrderDto]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "updateServiceOrder", null);
__decorate([
    (0, common_1.Delete)('service-orders/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "removeServiceOrder", null);
__decorate([
    (0, common_1.Get)('work-orders/active'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "getActiveWorkOrders", null);
__decorate([
    (0, common_1.Post)('appointments'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_fsm_appointment_dto_1.CreateFsmAppointmentDto]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Get)('appointments'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "findAllAppointments", null);
__decorate([
    (0, common_1.Patch)('appointments/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_fsm_appointment_dto_1.UpdateFsmAppointmentDto]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.Patch)('appointments/:id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('appointments/:id/report'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "createReport", null);
__decorate([
    (0, common_1.Get)('technicians'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FsmController.prototype, "findTechnicians", null);
exports.FsmController = FsmController = __decorate([
    (0, common_1.Controller)('fsm'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [fsm_service_1.FsmService])
], FsmController);
//# sourceMappingURL=fsm.controller.js.map