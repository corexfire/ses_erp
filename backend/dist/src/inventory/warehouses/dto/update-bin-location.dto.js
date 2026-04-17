"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBinLocationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bin_location_dto_1 = require("./create-bin-location.dto");
class UpdateBinLocationDto extends (0, mapped_types_1.PartialType)(create_bin_location_dto_1.CreateBinLocationDto) {
}
exports.UpdateBinLocationDto = UpdateBinLocationDto;
//# sourceMappingURL=update-bin-location.dto.js.map