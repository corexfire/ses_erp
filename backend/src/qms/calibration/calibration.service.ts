import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CalibrationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string, filters: any) {
    return this.prisma.calibrationLog.findMany({
      where: {
        tenantId,
        ...(filters.status ? { status: filters.status } : {}),
      },
      include: { equipment: true },
      orderBy: { calibrationDate: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const log = await this.prisma.calibrationLog.findFirst({
      where: { id, tenantId },
      include: { equipment: true },
    });
    if (!log) throw new NotFoundException('Calibration log not found');
    return log;
  }

  async searchEquipment(tenantId: string, q?: string) {
    return this.prisma.equipment.findMany({
      where: {
        tenantId,
        ...(q ? {
          OR: [
            { code: { contains: q, mode: 'insensitive' } },
            { name: { contains: q, mode: 'insensitive' } },
          ]
        } : {}),
      },
      select: { id: true, code: true, name: true, serialNumber: true },
      take: 20,
    });
  }

  async create(tenantId: string, data: any) {
    return this.prisma.calibrationLog.create({
      data: {
        tenantId,
        ...data,
      },
    });
  }

  async update(tenantId: string, id: string, data: any) {
    await this.findOne(tenantId, id);
    return this.prisma.calibrationLog.update({
      where: { id },
      data,
    });
  }
}
