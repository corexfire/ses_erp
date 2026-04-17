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
exports.TenderController = exports.CreateTenderDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
class CreateTenderDto {
    title;
    projectId;
    description;
    submissionDeadline;
}
exports.CreateTenderDto = CreateTenderDto;
let TenderController = class TenderController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(req, status) {
        const where = { tenantId: req.user.tenantId };
        if (status)
            where.status = status;
        const tenders = await this.prisma.tender.findMany({
            where,
            include: { project: true },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        return { data: tenders };
    }
    async create(req, body) {
        const tender = await this.prisma.tender.create({
            data: {
                tenantId: req.user.tenantId,
                title: body.title,
                projectId: body.projectId,
                description: body.description,
                submissionDeadline: body.submissionDeadline ? new Date(body.submissionDeadline) : undefined,
                status: 'DRAFT',
            },
        });
        return tender;
    }
    async get(id, req) {
        const tender = await this.prisma.tender.findFirst({
            where: { id, tenantId: req.user.tenantId },
        });
        return tender;
    }
    async submitBid(id, body, req) {
        const bid = await this.prisma.tenderBid.create({
            data: {
                tenderId: id,
                supplierId: body.supplierId,
                price: body.price,
                notes: body.notes,
                status: 'SUBMITTED',
            },
        });
        return bid;
    }
    async update(id, body, req) {
        const tender = await this.prisma.tender.update({
            where: { id },
            data: {
                title: body.title,
                projectId: body.projectId,
                description: body.description,
                submissionDeadline: body.submissionDeadline ? new Date(body.submissionDeadline) : undefined,
                status: 'OPEN',
            },
        });
        return tender;
    }
    async award(id, body, req) {
        const tender = await this.prisma.tender.update({
            where: { id },
            data: { status: 'AWARDED', awardDate: new Date() },
        });
        return tender;
    }
};
exports.TenderController = TenderController;
__decorate([
    (0, common_1.Get)('tenders'),
    (0, permissions_decorator_1.RequirePermissions)('project.tender.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TenderController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('tenders'),
    (0, permissions_decorator_1.RequirePermissions)('project.tender.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateTenderDto]),
    __metadata("design:returntype", Promise)
], TenderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('tenders/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.tender.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TenderController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('tenders/:id/bids'),
    (0, permissions_decorator_1.RequirePermissions)('project.tender.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TenderController.prototype, "submitBid", null);
__decorate([
    (0, common_1.Patch)('tenders/:id'),
    (0, permissions_decorator_1.RequirePermissions)('project.tender.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TenderController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('tenders/:id/award'),
    (0, permissions_decorator_1.RequirePermissions)('project.tender.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TenderController.prototype, "award", null);
exports.TenderController = TenderController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenderController);
//# sourceMappingURL=tender.controller.js.map