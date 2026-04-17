import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCapaDto } from './dto/create-capa.dto';
import { UpdateCapaDto } from './dto/update-capa.dto';

@Injectable()
export class CapaService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string, filters: any) {
    const { status, search } = filters;
    return this.prisma.capa.findMany({
      where: {
        tenantId,
        ...(status ? { status: status as any } : {}),
        ...(search ? {
          OR: [
            { code: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        } : {}),
      },
      include: {
        sourceNcr: true,
        assignedTo: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAuditFindings(tenantId: string) {
    // Fetch audit logs that might need CAPA (e.g., deletions, rejected transactions)
    return this.prisma.auditLog.findMany({
      where: {
        tenantId,
        action: { in: ['REJECT', 'DELETE', 'VOID', 'ERROR'] },
      },
      take: 50,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(tenantId: string, id: string) {
    const capa = await this.prisma.capa.findFirst({
      where: { id, tenantId },
      include: {
        sourceNcr: true,
        assignedTo: { select: { id: true, name: true, email: true } },
      },
    });
    if (!capa) throw new NotFoundException('CAPA not found');
    return capa;
  }

  async create(tenantId: string, dto: CreateCapaDto) {
    return this.prisma.capa.create({
      data: {
        tenantId,
        ...dto,
      },
    });
  }

  async update(tenantId: string, id: string, dto: UpdateCapaDto) {
    await this.findOne(tenantId, id);
    return this.prisma.capa.update({
      where: { id },
      data: dto,
    });
  }
}
