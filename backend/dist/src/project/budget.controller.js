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
exports.ProjectBudgetController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
const permissions_guard_1 = require("../auth/permissions.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BudgetLineDto {
    id;
    wbsTaskId;
    costCategory;
    description;
    unitPrice;
    qty;
    uom;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BudgetLineDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BudgetLineDto.prototype, "wbsTaskId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BudgetLineDto.prototype, "costCategory", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BudgetLineDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BudgetLineDto.prototype, "unitPrice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BudgetLineDto.prototype, "qty", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BudgetLineDto.prototype, "uom", void 0);
class CreateProjectBudgetDto {
    projectId;
    budgetNo;
    description;
    lines;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectBudgetDto.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectBudgetDto.prototype, "budgetNo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectBudgetDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BudgetLineDto),
    __metadata("design:type", Array)
], CreateProjectBudgetDto.prototype, "lines", void 0);
let ProjectBudgetController = class ProjectBudgetController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listBudgets(req, projectId) {
        return this.prisma.projectBudget.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(projectId ? { projectId } : {})
            },
            include: {
                project: { select: { name: true, code: true } },
                _count: { select: { lines: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getBudget(id, req) {
        return this.prisma.projectBudget.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                project: true,
                lines: { include: { wbsTask: true } }
            }
        });
    }
    async createBudget(req, body) {
        const totalAmount = body.lines.reduce((sum, line) => sum + (line.unitPrice * line.qty), 0);
        return this.prisma.projectBudget.create({
            data: {
                tenantId: req.user.tenantId,
                projectId: body.projectId,
                budgetNo: body.budgetNo,
                description: body.description,
                status: 'DRAFT',
                totalAmount,
                allocatedBudget: totalAmount,
                lines: {
                    create: body.lines.map(line => ({
                        tenantId: req.user.tenantId,
                        wbsTaskId: line.wbsTaskId,
                        costCategory: line.costCategory,
                        description: line.description,
                        unitPrice: line.unitPrice,
                        qty: line.qty,
                        totalAmount: line.unitPrice * line.qty,
                        uom: line.uom,
                    }))
                }
            },
            include: { lines: true }
        });
    }
    async updateBudget(id, req, body) {
        if (body.lines) {
            const totalAmount = body.lines.reduce((sum, line) => sum + (line.unitPrice * line.qty), 0);
            await this.prisma.projectBudgetLine.deleteMany({
                where: { budgetId: id, tenantId: req.user.tenantId }
            });
            return this.prisma.projectBudget.update({
                where: { id },
                data: {
                    description: body.description,
                    totalAmount,
                    allocatedBudget: totalAmount,
                    lines: {
                        create: body.lines.map(line => ({
                            tenantId: req.user.tenantId,
                            wbsTaskId: line.wbsTaskId,
                            costCategory: line.costCategory,
                            description: line.description,
                            unitPrice: line.unitPrice,
                            qty: line.qty,
                            totalAmount: line.unitPrice * line.qty,
                            uom: line.uom,
                        }))
                    }
                },
                include: { lines: true }
            });
        }
        return this.prisma.projectBudget.update({
            where: { id },
            data: { description: body.description }
        });
    }
    async updateStatus(id, status, req) {
        return this.prisma.projectBudget.update({
            where: { id, tenantId: req.user.tenantId },
            data: { status }
        });
    }
    async deleteBudget(id, req) {
        return this.prisma.projectBudget.delete({
            where: { id, tenantId: req.user.tenantId }
        });
    }
};
exports.ProjectBudgetController = ProjectBudgetController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('project.budget.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProjectBudgetController.prototype, "listBudgets", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.budget.read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectBudgetController.prototype, "getBudget", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('project.budget.manage'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateProjectBudgetDto]),
    __metadata("design:returntype", Promise)
], ProjectBudgetController.prototype, "createBudget", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.budget.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectBudgetController.prototype, "updateBudget", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, permissions_decorator_1.RequirePermissions)('project.budget.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectBudgetController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('project.budget.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectBudgetController.prototype, "deleteBudget", null);
exports.ProjectBudgetController = ProjectBudgetController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('project/budgets'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectBudgetController);
//# sourceMappingURL=budget.controller.js.map