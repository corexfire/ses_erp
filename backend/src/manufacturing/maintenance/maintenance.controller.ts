import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateEquipmentDto,
  CreateMaintenanceScheduleDto,
  CreateMaintenanceRequestDto,
  UpdateMaintenanceRequestDto,
  CreateMaintenanceLogDto,
} from './dto/maintenance.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/maintenance')
export class MaintenanceController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  // EQUIPMENT ENDPOINTS
  @Get('equipment')
  @RequirePermissions('manufacturing.equipment.read')
  async listEquipment(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const equipment = await this.prisma.equipment.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(q ? { OR: [{ code: { contains: q, mode: 'insensitive' } }, { name: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      include: {
        maintenancePlans: { take: 5 },
        maintenanceRequests: { where: { status: 'OPEN' } },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
    return { equipment };
  }

  @Post('equipment')
  @RequirePermissions('manufacturing.equipment.create')
  async createEquipment(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateEquipmentDto) {
    const equipment = await this.prisma.equipment.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        type: body.type,
        location: body.location,
        serialNumber: body.serialNumber,
        manufacturer: body.manufacturer,
        model: body.model,
        criticality: body.criticality || 'MEDIUM',
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
        warrantyExpiryDate: body.warrantyExpiryDate ? new Date(body.warrantyExpiryDate) : undefined,
        workCenterId: body.workCenterId,
        installedDate: body.installedDate ? new Date(body.installedDate) : undefined,
        notes: body.notes,
      },
    });

    await this.audit.log({
      tenantId: req.user.tenantId!,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'Equipment',
      entityId: equipment.id,
    });

    return { equipment };
  }

  @Patch('equipment/:id')
  @RequirePermissions('manufacturing.equipment.update')
  async updateEquipment(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: Partial<CreateEquipmentDto>,
  ) {
    const existing = await this.prisma.equipment.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    if (!existing) throw new NotFoundException('Equipment not found');

    const equipment = await this.prisma.equipment.update({
      where: { id },
      data: {
        name: body.name ?? undefined,
        type: body.type ?? undefined,
        location: body.location ?? undefined,
        serialNumber: body.serialNumber ?? undefined,
        manufacturer: body.manufacturer ?? undefined,
        model: body.model ?? undefined,
        criticality: body.criticality ?? undefined,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
        warrantyExpiryDate: body.warrantyExpiryDate ? new Date(body.warrantyExpiryDate) : undefined,
        workCenterId: body.workCenterId ?? undefined,
        notes: body.notes ?? undefined,
      },
    });

    return { equipment };
  }

  // SCHEDULE ENDPOINTS
  @Get('schedules')
  @RequirePermissions('manufacturing.maintenance.read')
  async listSchedules(@Req() req: FastifyRequest & { user: AuthUser }) {
    const schedules = await this.prisma.maintenanceSchedule.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { equipment: true, maintenanceTasks: true },
      orderBy: [{ nextDate: 'asc' }],
    });
    return { schedules };
  }

  @Post('schedules')
  @RequirePermissions('manufacturing.maintenance.create')
  async createSchedule(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateMaintenanceScheduleDto) {
    const schedule = await this.prisma.maintenanceSchedule.create({
      data: {
        tenantId: req.user.tenantId!,
        equipmentId: body.equipmentId,
        name: body.name,
        frequency: body.frequency,
        intervalDays: body.intervalDays,
        nextDate: new Date(body.nextDate),
        maintenanceTasks: body.tasks ? {
          create: body.tasks.map(t => ({ tenantId: req.user.tenantId!, description: t }))
        } : undefined,
      },
      include: { maintenanceTasks: true }
    });
    return { schedule };
  }

  // REQUEST ENDPOINTS
  @Get('requests')
  @RequirePermissions('manufacturing.maintenance.read')
  async listRequests(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const requests = await this.prisma.maintenanceRequest.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(status ? { status } : {}),
      },
      include: { equipment: true },
      orderBy: [{ requestDate: 'desc' }],
    });
    return { requests };
  }

  @Post('requests')
  @RequirePermissions('manufacturing.maintenance.create')
  async createRequest(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateMaintenanceRequestDto) {
    const request = await this.prisma.maintenanceRequest.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        equipmentId: body.equipmentId,
        requestDate: new Date(body.requestDate),
        problem: body.problem,
        priority: body.priority || 'MEDIUM',
        assignedTo: body.assignedTo,
        notes: body.notes,
      },
    });
    return { request };
  }

  @Patch('requests/:id')
  @RequirePermissions('manufacturing.maintenance.update')
  async updateRequest(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateMaintenanceRequestDto,
  ) {
    const request = await this.prisma.maintenanceRequest.update({
      where: { id },
      data: {
        status: body.status ?? undefined,
        priority: body.priority ?? undefined,
        assignedTo: body.assignedTo ?? undefined,
        notes: body.notes ?? undefined,
        resolvedDate: body.status === 'COMPLETED' ? new Date() : undefined,
      },
    });

    if (body.status === 'COMPLETED') {
      await this.prisma.equipment.update({
        where: { id: request.equipmentId },
        data: { status: 'OPERATIONAL' }
      });
    }

    return { request };
  }

  // LOG / WORK ORDER ENDPOINTS
  @Get('logs')
  @RequirePermissions('manufacturing.maintenance.read')
  async listLogs(@Req() req: FastifyRequest & { user: AuthUser }) {
    const logs = await this.prisma.maintenanceLog.findMany({
      where: { tenantId: req.user.tenantId! },
      include: {
        equipment: true,
        parts: { include: { item: true } }
      },
      orderBy: [{ logDate: 'desc' }],
    });
    return { logs };
  }

  @Post('logs')
  @RequirePermissions('manufacturing.maintenance.create')
  async createLog(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateMaintenanceLogDto) {
    return await this.prisma.$transaction(async (tx) => {
      let partsCost = 0;
      if (body.parts) {
        partsCost = body.parts.reduce((sum, p) => sum + (p.qtyUsed * p.unitCost), 0);
      }
      const laborCost = body.laborCost || 0;
      const totalCost = partsCost + laborCost;

      const log = await tx.maintenanceLog.create({
        data: {
          tenantId: req.user.tenantId!,
          equipmentId: body.equipmentId,
          requestId: body.requestId,
          scheduleId: body.scheduleId,
          technicianName: body.technicianName,
          workType: body.workType,
          durationMin: body.durationMin,
          description: body.description,
          laborCost,
          partsCost,
          totalCost,
          status: 'COMPLETED',
          parts: body.parts ? {
            create: body.parts.map(p => ({
              tenantId: req.user.tenantId!,
              itemId: p.itemId,
              warehouseId: p.warehouseId,
              qtyUsed: p.qtyUsed,
              unitCost: p.unitCost,
              totalCost: p.qtyUsed * p.unitCost
            }))
          } : undefined,
        },
      });

      // Update Equipment status if this was a repair
      if (body.workType === 'CORRECTIVE') {
        await tx.equipment.update({
          where: { id: body.equipmentId },
          data: { status: 'OPERATIONAL' }
        });
      }

      // Close related request if specified
      if (body.requestId) {
        await tx.maintenanceRequest.update({
          where: { id: body.requestId },
          data: { status: 'COMPLETED', resolvedDate: new Date() }
        });
      }

      // Stock Deduction Logic (Goods Issue Simulation)
      if (body.parts) {
        for (const part of body.parts) {
          await tx.stockLedger.create({
            data: {
              tenantId: req.user.tenantId!,
              itemId: part.itemId,
              moveType: 'GOODS_ISSUE',
              refType: 'MAINTENANCE_LOG',
              refId: log.id,
              postingDate: new Date(),
              description: `Spare part usage for maintenance log ${log.id}`,
              qtyIn: 0,
              qtyOut: part.qtyUsed,
              warehouseId: part.warehouseId,
              unitCost: part.unitCost,
            }
          });
        }
      }

      return { log };
    });
  }
}