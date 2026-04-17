import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFsmServiceOrderDto } from './dto/create-fsm-service-order.dto';
import { UpdateFsmServiceOrderDto } from './dto/update-fsm-service-order.dto';
import { CreateFsmAppointmentDto } from './dto/create-fsm-appointment.dto';
import { UpdateFsmAppointmentDto } from './dto/update-fsm-appointment.dto';
import { FsmServiceOrderStatus, FsmAppointmentStatus } from '../../prisma/generated/client';

@Injectable()
export class FsmService {
  constructor(private prisma: PrismaService) {}

  // ─── Service Order CRUD ────────────────────────────────────────────

  async createServiceOrder(tenantId: string, dto: CreateFsmServiceOrderDto) {
    return this.prisma.fsmServiceOrder.create({
      data: { ...dto, tenantId, status: FsmServiceOrderStatus.DRAFT },
      include: { customer: true, appointments: true },
    });
  }

  async findAllServiceOrders(tenantId: string, status?: string) {
    return this.prisma.fsmServiceOrder.findMany({
      where: {
        tenantId,
        ...(status && status !== 'ALL' ? { status: status as any } : {}),
      },
      include: {
        customer: true,
        appointments: { include: { technician: true, report: true } },
        _count: { select: { items: true, appointments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneServiceOrder(tenantId: string, id: string) {
    const order = await this.prisma.fsmServiceOrder.findFirst({
      where: { id, tenantId },
      include: {
        customer: true,
        items: true,
        appointments: { include: { technician: true, report: true } },
      },
    });
    if (!order) throw new NotFoundException('Service Order tidak ditemukan');
    return order;
  }

  async updateServiceOrder(tenantId: string, id: string, dto: UpdateFsmServiceOrderDto) {
    const existing = await this.prisma.fsmServiceOrder.findFirst({ where: { id, tenantId } });
    if (!existing) throw new NotFoundException('Service Order tidak ditemukan');
    return this.prisma.fsmServiceOrder.update({
      where: { id },
      data: dto as any,
      include: { customer: true },
    });
  }

  async deleteServiceOrder(tenantId: string, id: string) {
    const existing = await this.prisma.fsmServiceOrder.findFirst({ where: { id, tenantId } });
    if (!existing) throw new NotFoundException('Service Order tidak ditemukan');
    return this.prisma.fsmServiceOrder.delete({ where: { id } });
  }

  // ─── Appointment CRUD ──────────────────────────────────────────────

  async createAppointment(tenantId: string, dto: CreateFsmAppointmentDto) {
    const order = await this.prisma.fsmServiceOrder.findFirst({
      where: { id: dto.serviceOrderId, tenantId },
    });
    if (!order) throw new NotFoundException('Service Order tidak ditemukan');

    const appointment = await this.prisma.fsmServiceAppointment.create({
      data: { ...dto, tenantId, status: FsmAppointmentStatus.ASSIGNED },
      include: { technician: true, serviceOrder: { include: { customer: true } } },
    });

    // Auto-update order status
    if (
      order.status === FsmServiceOrderStatus.DRAFT ||
      order.status === FsmServiceOrderStatus.SUBMITTED ||
      order.status === FsmServiceOrderStatus.PENDING_SCHEDULE
    ) {
      await this.prisma.fsmServiceOrder.update({
        where: { id: order.id },
        data: { status: FsmServiceOrderStatus.SCHEDULED },
      });
    }
    return appointment;
  }

  async findAllAppointments(tenantId: string) {
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

  async updateAppointment(tenantId: string, id: string, dto: UpdateFsmAppointmentDto) {
    const existing = await this.prisma.fsmServiceAppointment.findFirst({ where: { id, tenantId } });
    if (!existing) throw new NotFoundException('Penugasan tidak ditemukan');

    const updated = await this.prisma.fsmServiceAppointment.update({
      where: { id },
      data: dto as any,
      include: { serviceOrder: true },
    });

    // Sync order status when appointment status changes
    const orderStatusMap: Record<string, FsmServiceOrderStatus> = {
      'EN_ROUTE': FsmServiceOrderStatus.IN_PROGRESS,
      'ON_SITE': FsmServiceOrderStatus.IN_PROGRESS,
      'IN_PROGRESS': FsmServiceOrderStatus.IN_PROGRESS,
      'COMPLETED': FsmServiceOrderStatus.COMPLETED,
      'FAILED': FsmServiceOrderStatus.COMPLETED,
    };

    if (orderStatusMap[dto.status as string]) {
      await this.prisma.fsmServiceOrder.update({
        where: { id: updated.serviceOrderId },
        data: { status: orderStatusMap[dto.status as string] },
      });
    }
    return updated;
  }

  async findActiveAppointments(tenantId: string, technicianId?: string) {
    return this.prisma.fsmServiceAppointment.findMany({
      where: {
        tenantId,
        ...(technicianId ? { technicianId } : {}),
        status: { in: ['ASSIGNED', 'EN_ROUTE', 'ON_SITE', 'IN_PROGRESS'] as any },
      },
      include: {
        serviceOrder: { include: { customer: true } },
        technician: true,
        report: true,
      },
      orderBy: { scheduledStart: 'asc' },
    });
  }

  async updateAppointmentStatus(tenantId: string, id: string, status: FsmAppointmentStatus) {
    const data: any = { status };
    if (status === FsmAppointmentStatus.IN_PROGRESS) {
      data.actualStart = new Date();
    } else if (status === FsmAppointmentStatus.COMPLETED) {
      data.actualEnd = new Date();
    }
    return this.updateAppointment(tenantId, id, data);
  }

  // ─── Service Report ──────────────────────────────────────────────

  async createReport(tenantId: string, appointmentId: string, summary: string, resolution: string) {
    const appt = await this.prisma.fsmServiceAppointment.findFirst({
      where: { id: appointmentId, tenantId },
    });
    if (!appt) throw new NotFoundException('Penugasan tidak ditemukan');

    return this.prisma.fsmServiceReport.create({
      data: { tenantId, appointmentId, summary, resolution },
    });
  }

  // ─── Master Data Helpers ──────────────────────────────────────────

  async findTechnicians(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId, isActive: true },
      select: { id: true, name: true, email: true },
    });
  }

  async getDashboardStats(tenantId: string) {
    const [total, unscheduled, inProgress, completed, appointments] = await Promise.all([
      this.prisma.fsmServiceOrder.count({ where: { tenantId } }),
      this.prisma.fsmServiceOrder.count({
        where: { tenantId, status: { in: ['DRAFT', 'SUBMITTED', 'PENDING_SCHEDULE'] as any } },
      }),
      this.prisma.fsmServiceOrder.count({ where: { tenantId, status: FsmServiceOrderStatus.IN_PROGRESS } }),
      this.prisma.fsmServiceOrder.count({ where: { tenantId, status: FsmServiceOrderStatus.COMPLETED } }),
      this.prisma.fsmServiceAppointment.count({ where: { tenantId, status: FsmAppointmentStatus.IN_PROGRESS } }),
    ]);
    return { total, unscheduled, inProgress, completed, liveAppointments: appointments };
  }
}
