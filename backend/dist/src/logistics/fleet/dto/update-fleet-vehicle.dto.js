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
exports.UpdateFleetVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("../../../../prisma/generated/client");
class UpdateFleetVehicleDto {
    code;
    plateNo;
    vehicleType;
    brand;
    model;
    year;
    ownershipType;
    capacityWeight;
    capacityVolume;
    status;
    transporterId;
    stnkNo;
    stnkExpiry;
    kirNo;
    kirExpiry;
    notes;
}
exports.UpdateFleetVehicleDto = UpdateFleetVehicleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "plateNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "vehicleType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFleetVehicleDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.VehicleOwnershipType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "ownershipType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFleetVehicleDto.prototype, "capacityWeight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateFleetVehicleDto.prototype, "capacityVolume", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.VehicleStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "transporterId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "stnkNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "stnkExpiry", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "kirNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "kirExpiry", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFleetVehicleDto.prototype, "notes", void 0);
//# sourceMappingURL=update-fleet-vehicle.dto.js.map