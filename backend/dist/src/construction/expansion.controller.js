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
exports.ConstructionExpansionController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ConstructionExpansionController = class ConstructionExpansionController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDefects(req) {
        return this.prisma.projectDefect.findMany({
            where: { tenantId: req.user.tenantId },
            include: { wbsTask: { select: { taskName: true } } },
            orderBy: { createdAt: 'desc' }
        });
    }
    async createDefect(req, data) {
        return this.prisma.projectDefect.create({
            data: {
                ...data,
                tenantId: req.user.tenantId
            }
        });
    }
    async updateDefect(req, id, data) {
        if (data.status === 'CLOSED' || data.status === 'RESOLVED') {
            data.resolvedAt = new Date();
        }
        return this.prisma.projectDefect.update({
            where: { id, tenantId: req.user.tenantId },
            data
        });
    }
    async getRFIs(req) {
        return this.prisma.projectRFI.findMany({
            where: { tenantId: req.user.tenantId },
            include: { wbsTask: { select: { taskName: true } } },
            orderBy: { requestedDate: 'desc' }
        });
    }
    async createRFI(req, data) {
        const count = await this.prisma.projectRFI.count({ where: { tenantId: req.user.tenantId } });
        const rfiNo = `RFI-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
        return this.prisma.projectRFI.create({
            data: {
                ...data,
                rfiNo,
                tenantId: req.user.tenantId,
                requestedDate: data.requestedDate ? new Date(data.requestedDate) : new Date(),
                neededByDate: data.neededByDate ? new Date(data.neededByDate) : null
            }
        });
    }
    async updateRFI(req, id, data) {
        return this.prisma.projectRFI.update({
            where: { id, tenantId: req.user.tenantId },
            data
        });
    }
    async getEquipmentLogs(req) {
        return this.prisma.projectEquipmentLog.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { logDate: 'desc' }
        });
    }
    async createEquipmentLog(req, data) {
        return this.prisma.projectEquipmentLog.create({
            data: {
                ...data,
                tenantId: req.user.tenantId,
                logDate: new Date(data.logDate)
            }
        });
    }
    async getWeatherLogs(req) {
        return this.prisma.projectWeatherLog.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { logDate: 'desc' }
        });
    }
    async createWeatherLog(req, data) {
        return this.prisma.projectWeatherLog.create({
            data: {
                ...data,
                tenantId: req.user.tenantId,
                logDate: new Date(data.logDate)
            }
        });
    }
    async getSiteInventory(req) {
        return this.prisma.projectSiteInventory.findMany({
            where: { tenantId: req.user.tenantId },
            orderBy: { transactionDate: 'desc' }
        });
    }
    async createSiteInventory(req, data) {
        const qtyIn = data.quantityIn || 0;
        const qtyOut = data.quantityOut || 0;
        const previous = await this.prisma.projectSiteInventory.findFirst({
            where: { tenantId: req.user.tenantId, projectId: data.projectId, materialName: data.materialName },
            orderBy: { transactionDate: 'desc' }
        });
        const prevBalance = previous ? Number(previous.balance) : 0;
        const newBalance = prevBalance + Number(qtyIn) - Number(qtyOut);
        return this.prisma.projectSiteInventory.create({
            data: {
                ...data,
                tenantId: req.user.tenantId,
                balance: newBalance,
                transactionDate: new Date(data.transactionDate)
            }
        });
    }
};
exports.ConstructionExpansionController = ConstructionExpansionController;
__decorate([
    (0, common_1.Get)('defects'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "getDefects", null);
__decorate([
    (0, common_1.Post)('defects'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "createDefect", null);
__decorate([
    (0, common_1.Patch)('defects/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "updateDefect", null);
__decorate([
    (0, common_1.Get)('rfis'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "getRFIs", null);
__decorate([
    (0, common_1.Post)('rfis'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "createRFI", null);
__decorate([
    (0, common_1.Patch)('rfis/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "updateRFI", null);
__decorate([
    (0, common_1.Get)('equipment-logs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "getEquipmentLogs", null);
__decorate([
    (0, common_1.Post)('equipment-logs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "createEquipmentLog", null);
__decorate([
    (0, common_1.Get)('weather-logs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "getWeatherLogs", null);
__decorate([
    (0, common_1.Post)('weather-logs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "createWeatherLog", null);
__decorate([
    (0, common_1.Get)('site-inventory'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "getSiteInventory", null);
__decorate([
    (0, common_1.Post)('site-inventory'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConstructionExpansionController.prototype, "createSiteInventory", null);
exports.ConstructionExpansionController = ConstructionExpansionController = __decorate([
    (0, common_1.Controller)('construction'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConstructionExpansionController);
//# sourceMappingURL=expansion.controller.js.map