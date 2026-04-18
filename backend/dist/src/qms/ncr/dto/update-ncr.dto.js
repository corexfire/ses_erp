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
exports.UpdateNcrDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateNcrDto {
    description;
    rootCause;
    disposition;
    severity;
    status;
    assignedToId;
    evidenceUrl;
    qty;
}
exports.UpdateNcrDto = UpdateNcrDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNcrDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNcrDto.prototype, "rootCause", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['PENDING', 'USE_AS_IS', 'REWORK', 'REPAIR', 'SCRAP', 'RETURN_TO_VENDOR']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNcrDto.prototype, "disposition", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNcrDto.prototype, "severity", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['DRAFT', 'OPEN', 'UNDER_INVESTIGATION', 'PENDING_APPROVAL', 'DISPOSITIONED', 'VERIFIED', 'CLOSED', 'VOID', 'REJECTED']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNcrDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNcrDto.prototype, "assignedToId", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNcrDto.prototype, "evidenceUrl", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateNcrDto.prototype, "qty", void 0);
//# sourceMappingURL=update-ncr.dto.js.map