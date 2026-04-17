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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFsmServiceOrderDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("../../../prisma/generated/client");
class UpdateFsmServiceOrderDto {
    customerId;
    contactName;
    contactPhone;
    serviceType;
    priority;
    status;
    subject;
    description;
    locationAddress;
    coordinateLat;
    coordinateLng;
    slaDate;
    preferredDate;
    totalEstimatedDuration;
    notes;
}
exports.UpdateFsmServiceOrderDto = UpdateFsmServiceOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "contactName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.FsmServiceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "serviceType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.TicketPriority),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.FsmServiceOrderStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "locationAddress", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFsmServiceOrderDto.prototype, "coordinateLat", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFsmServiceOrderDto.prototype, "coordinateLng", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "slaDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "preferredDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFsmServiceOrderDto.prototype, "totalEstimatedDuration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFsmServiceOrderDto.prototype, "notes", void 0);
//# sourceMappingURL=update-fsm-service-order.dto.js.map