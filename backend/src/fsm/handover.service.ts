import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHandoverDto, UpdateHandoverDto } from './dto/handover.dto';

@Injectable()
export class HandoverService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateHandoverDto) {
    const { handoverDate, serviceOrderId, technicianId, equipmentId, customerId, ...rest } = dto;
    
    const data: any = {
      ...rest,
      tenantId,
      handoverDate: new Date(handoverDate),
      ...(customerId ? { customer: { connect: { id: customerId } } } : {}),
      ...(serviceOrderId ? { serviceOrder: { connect: { id: serviceOrderId } } } : {}),
      ...(technicianId ? { technician: { connect: { id: technicianId } } } : {}),
      ...(equipmentId ? { equipment: { connect: { id: equipmentId } } } : {}),
    };

    return this.prisma.fsmHandover.create({
      data,
      include: {
        customer: true,
        serviceOrder: true,
        technician: true,
        equipment: true,
      },
    });
  }

  async findAll(tenantId: string, filters: any = {}) {
    return this.prisma.fsmHandover.findMany({
      where: {
        tenantId,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.q ? {
          OR: [
            { code: { contains: filters.q, mode: 'insensitive' } },
            { recipientName: { contains: filters.q, mode: 'insensitive' } },
          ]
        } : {}),
      },
      include: {
        customer: true,
        serviceOrder: true,
        technician: true,
        equipment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const handover = await this.prisma.fsmHandover.findFirst({
      where: { id, tenantId },
      include: {
        customer: true,
        serviceOrder: true,
        technician: true,
        equipment: true,
      },
    });
    if (!handover) throw new NotFoundException('Handover (BAST) tidak ditemukan');
    return handover;
  }

  async update(tenantId: string, id: string, dto: UpdateHandoverDto) {
    await this.findOne(tenantId, id);
    const { handoverDate, ...rest } = dto;
    
    return this.prisma.fsmHandover.update({
      where: { id },
      data: {
        ...rest,
        handoverDate: handoverDate ? new Date(handoverDate) : undefined,
      },
      include: {
        customer: true,
        serviceOrder: true,
        technician: true,
        equipment: true,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findOne(tenantId, id);
    return this.prisma.fsmHandover.delete({
      where: { id },
    });
  }

  async getStats(tenantId: string) {
    const handovers = await this.prisma.fsmHandover.findMany({
      where: { tenantId },
    });

    const total = handovers.length;
    const pending = handovers.filter(h => h.status !== 'FINALIZED').length;
    const finalized = handovers.filter(h => h.status === 'FINALIZED').length;

    return {
      total,
      pending,
      finalized,
    };
  }
}
