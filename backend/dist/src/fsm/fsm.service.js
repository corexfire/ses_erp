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
exports.FsmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../../prisma/generated/client");
let FsmService = class FsmService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createServiceOrder(tenantId, dto) {
        return this.prisma.fsmServiceOrder.create({
            data: { ...dto, tenantId, status: client_1.FsmServiceOrderStatus.DRAFT },
            include: { customer: true, appointments: true },
        });
    }
    async findAllServiceOrders(tenantId, status) {
        return this.prisma.fsmServiceOrder.findMany({
            where: {
                tenantId,
                ...(status && status !== 'ALL' ? { status: status } : {}),
            },
            include: {
                customer: true,
                appointments: { include: { technician: true, report: true } },
                _count: { select: { items: true, appointments: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOneServiceOrder(tenantId, id) {
        const order = await this.prisma.fsmServiceOrder.findFirst({
            where: { id, tenantId },
            include: {
                customer: true,
                items: true,
                appointments: { include: { technician: true, report: true } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Service Order tidak ditemukan');
        return order;
    }
    async updateServiceOrder(tenantId, id, dto) {
        const existing = await this.prisma.fsmServiceOrder.findFirst({ where: { id, tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Service Order tidak ditemukan');
        return this.prisma.fsmServiceOrder.update({
            where: { id },
            data: dto,
            include: { customer: true },
        });
    }
    async deleteServiceOrder(tenantId, id) {
        const existing = await this.prisma.fsmServiceOrder.findFirst({ where: { id, tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Service Order tidak ditemukan');
        return this.prisma.fsmServiceOrder.delete({ where: { id } });
    }
    async createAppointment(tenantId, dto) {
        const order = await this.prisma.fsmServiceOrder.findFirst({
            where: { id: dto.serviceOrderId, tenantId },
        });
        if (!order)
            throw new common_1.NotFoundException('Service Order tidak ditemukan');
        const appointment = await this.prisma.fsmServiceAppointment.create({
            data: { ...dto, tenantId, status: client_1.FsmAppointmentStatus.ASSIGNED },
            include: { technician: true, serviceOrder: { include: { customer: true } } },
        });
        if (order.status === client_1.FsmServiceOrderStatus.DRAFT ||
            order.status === client_1.FsmServiceOrderStatus.SUBMITTED ||
            order.status === client_1.FsmServiceOrderStatus.PENDING_SCHEDULE) {
            await this.prisma.fsmServiceOrder.update({
                where: { id: order.id },
                data: { status: client_1.FsmServiceOrderStatus.SCHEDULED },
            });
        }
        return appointment;
    }
    async findAllAppointments(tenantId) {
        return this.prisma.fsmServiceAppointment.findMany({
            where: { tenantId },
            include: {
                serviceOrder: { include: { customer: true } },
                technician: true,
                report: true,
            },
            orderBy: { scheduledStart: 'asc' },
        });
    }
    async updateAppointment(tenantId, id, dto) {
        const existing = await this.prisma.fsmServiceAppointment.findFirst({ where: { id, tenantId } });
        if (!existing)
            throw new common_1.NotFoundException('Penugasan tidak ditemukan');
        const updated = await this.prisma.fsmServiceAppointment.update({
            where: { id },
            data: dto,
            include: { serviceOrder: true },
        });
        const orderStatusMap = {
            'EN_ROUTE': client_1.FsmServiceOrderStatus.IN_PROGRESS,
            'ON_SITE': client_1.FsmServiceOrderStatus.IN_PROGRESS,
            'IN_PROGRESS': client_1.FsmServiceOrderStatus.IN_PROGRESS,
            'COMPLETED': client_1.FsmServiceOrderStatus.COMPLETED,
            'FAILED': client_1.FsmServiceOrderStatus.COMPLETED,
        };
        if (orderStatusMap[dto.status]) {
            await this.prisma.fsmServiceOrder.update({
                where: { id: updated.serviceOrderId },
                data: { status: orderStatusMap[dto.status] },
            });
        }
        return updated;
    }
    async findActiveAppointments(tenantId, technicianId) {
        return this.prisma.fsmServiceAppointment.findMany({
            where: {
                tenantId,
                ...(technicianId ? { technicianId } : {}),
                status: { in: ['ASSIGNED', 'EN_ROUTE', 'ON_SITE', 'IN_PROGRESS'] },
            },
            include: {
                serviceOrder: { include: { customer: true } },
                technician: true,
                report: true,
            },
            orderBy: { scheduledStart: 'asc' },
        });
    }
    async updateAppointmentStatus(tenantId, id, status) {
        const data = { status };
        if (status === client_1.FsmAppointmentStatus.IN_PROGRESS) {
            data.actualStart = new Date();
        }
        else if (status === client_1.FsmAppointmentStatus.COMPLETED) {
            data.actualEnd = new Date();
        }
        return this.updateAppointment(tenantId, id, data);
    }
    async createReport(tenantId, appointmentId, summary, resolution) {
        const appt = await this.prisma.fsmServiceAppointment.findFirst({
            where: { id: appointmentId, tenantId },
        });
        if (!appt)
            throw new common_1.NotFoundException('Penugasan tidak ditemukan');
        return this.prisma.fsmServiceReport.create({
            data: { tenantId, appointmentId, summary, resolution },
        });
    }
    async findTechnicians(tenantId) {
        return this.prisma.user.findMany({
            where: { tenantId, isActive: true },
            select: { id: true, name: true, email: true },
        });
    }
    async getDashboardStats(tenantId) {
        const [total, unscheduled, inProgress, completed, appointments] = await Promise.all([
            this.prisma.fsmServiceOrder.count({ where: { tenantId } }),
            this.prisma.fsmServiceOrder.count({
                where: { tenantId, status: { in: ['DRAFT', 'SUBMITTED', 'PENDING_SCHEDULE'] } },
            }),
            this.prisma.fsmServiceOrder.count({ where: { tenantId, status: client_1.FsmServiceOrderStatus.IN_PROGRESS } }),
            this.prisma.fsmServiceOrder.count({ where: { tenantId, status: client_1.FsmServiceOrderStatus.COMPLETED } }),
            this.prisma.fsmServiceAppointment.count({ where: { tenantId, status: client_1.FsmAppointmentStatus.IN_PROGRESS } }),
        ]);
        return { total, unscheduled, inProgress, completed, liveAppointments: appointments };
    }
};
exports.FsmService = FsmService;
exports.FsmService = FsmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FsmService);
//# sourceMappingURL=fsm.service.js.map