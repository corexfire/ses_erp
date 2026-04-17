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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const permissions_decorator_1 = require("../../auth/permissions.decorator");
const permissions_guard_1 = require("../../auth/permissions.guard");
const audit_service_1 = require("../../audit/audit.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const crm_sla_1 = require("../shared/crm-sla");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
let CustomersController = class CustomersController {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(req, q) {
        const customers = await this.prisma.customer.findMany({
            where: {
                tenantId: req.user.tenantId,
                ...(q
                    ? {
                        OR: [
                            { code: { contains: q, mode: 'insensitive' } },
                            { name: { contains: q, mode: 'insensitive' } },
                            { email: { contains: q, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
            },
            orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
            take: 200,
        });
        return { customers };
    }
    async get(req, id) {
        const customer = await this.prisma.customer.findFirst({
            where: { id, tenantId: req.user.tenantId },
            include: {
                opportunities: {
                    include: { lead: true, owner: true },
                    orderBy: [{ createdAt: 'desc' }],
                },
                activities: {
                    include: { lead: true, opportunity: true, assignedTo: true },
                    orderBy: [{ createdAt: 'desc' }],
                },
                tickets: {
                    include: { assignedTo: true },
                    orderBy: [{ createdAt: 'desc' }],
                },
            },
        });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        const now = new Date();
        return {
            customer: {
                ...customer,
                tickets: customer.tickets.map((t) => {
                    const slaDueAt = (0, crm_sla_1.computeTicketSlaDueAt)(t.createdAt, t.priority);
                    return {
                        ...t,
                        slaDueAt,
                        isOverdue: (0, crm_sla_1.isTicketOverdue)({
                            now,
                            status: t.status,
                            slaDueAt,
                        }),
                    };
                }),
            },
        };
    }
    async create(req, body) {
        const customer = await this.prisma.customer.create({
            data: {
                tenantId: req.user.tenantId,
                code: body.code,
                name: body.name,
                email: body.email,
                phone: body.phone,
                address1: body.address1,
                address2: body.address2,
                city: body.city,
                province: body.province,
                postalCode: body.postalCode,
                countryCode: 'ID',
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'create',
            entity: 'Customer',
            entityId: customer.id,
        });
        return { customer };
    }
    async update(req, id, body) {
        const exists = await this.prisma.customer.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Customer not found');
        const customer = await this.prisma.customer.update({
            where: { id },
            data: {
                name: body.name ?? undefined,
                email: body.email ?? undefined,
                phone: body.phone ?? undefined,
                address1: body.address1 ?? undefined,
                address2: body.address2 ?? undefined,
                city: body.city ?? undefined,
                province: body.province ?? undefined,
                postalCode: body.postalCode ?? undefined,
            },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'update',
            entity: 'Customer',
            entityId: customer.id,
        });
        return { customer };
    }
    async deactivate(req, id) {
        const exists = await this.prisma.customer.findFirst({
            where: { id, tenantId: req.user.tenantId },
            select: { id: true },
        });
        if (!exists)
            throw new common_1.NotFoundException('Customer not found');
        const customer = await this.prisma.customer.update({
            where: { id },
            data: { isActive: false },
        });
        await this.audit.log({
            tenantId: req.user.tenantId,
            actorUserId: req.user.id,
            action: 'deactivate',
            entity: 'Customer',
            entityId: customer.id,
        });
        return { customer };
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.customer.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.customer.read'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)('crm.customer.create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.RequirePermissions)('crm.customer.update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_customer_dto_1.UpdateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, permissions_decorator_1.RequirePermissions)('crm.customer.deactivate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deactivate", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Controller)('crm/customers'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map