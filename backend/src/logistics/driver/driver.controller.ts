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
import type { DriverStatus, DriverLicenseType } from '../../../prisma/generated/client';

const driverStatusSet = new Set<DriverStatus>(['ACTIVE', 'ON_LEAVE', 'INACTIVE']);
const isDriverStatus = (value?: string): value is DriverStatus =>
  Boolean(value) && driverStatusSet.has(value as DriverStatus);

const driverLicenseTypeSet = new Set<DriverLicenseType>(['A', 'B1', 'B2', 'C', 'D']);
const isDriverLicenseType = (value?: string): value is DriverLicenseType =>
  Boolean(value) && driverLicenseTypeSet.has(value as DriverLicenseType);

export class CreateDriverDto {
  code?: string;
  name!: string;
  employeeId?: string;
  licenseType!: DriverLicenseType;
  licenseNo?: string;
  licenseExpiry?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: DriverStatus;
  transporterId?: string;
  notes?: string;
}

export class UpdateDriverDto {
  name?: string;
  employeeId?: string;
  licenseType?: DriverLicenseType;
  licenseNo?: string;
  licenseExpiry?: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: DriverStatus;
  transporterId?: string;
  notes?: string;
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('logistics/drivers')
export class DriverController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('logistics.driver.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('status') status?: string,
  ) {
    const drivers = await this.prisma.logisticsDriver.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { name: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
        ...(isDriverStatus(status) ? { status } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { transporter: true },
      take: 200,
    });
    return { drivers };
  }

  @Get(':id')
  @RequirePermissions('logistics.driver.read')
  async get(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const driver = await this.prisma.logisticsDriver.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { transporter: true, tripPlans: { take: 10, orderBy: { routeDate: 'desc' } } },
    });
    if (!driver) throw new NotFoundException('Driver not found');
    return { driver };
  }

  @Post()
  @RequirePermissions('logistics.driver.manage')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateDriverDto,
  ) {
    if (body.transporterId) {
      const transporter = await this.prisma.transporter.findFirst({
        where: { id: body.transporterId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!transporter) throw new NotFoundException('Transporter not found');
    }

    const count = await this.prisma.logisticsDriver.count({ where: { tenantId: req.user.tenantId } });
    const code = `DRV-${String(count + 1).padStart(6, '0')}`;

    const driver = await this.prisma.logisticsDriver.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code || code,
        name: body.name,
        employeeId: body.employeeId,
        licenseType: body.licenseType,
        licenseNo: body.licenseNo,
        licenseExpiry: body.licenseExpiry ? new Date(body.licenseExpiry) : undefined,
        phone: body.phone,
        email: body.email,
        address: body.address,
        status: body.status || 'ACTIVE',
        transporterId: body.transporterId,
        notes: body.notes,
      },
      include: { transporter: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'CREATE',
      entity: 'LogisticsDriver',
      entityId: driver.id,
      metadata: { code: driver.code, name: driver.name, status: driver.status },
    });

    return { driver };
  }

  @Patch(':id')
  @RequirePermissions('logistics.driver.manage')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateDriverDto,
  ) {
    const exists = await this.prisma.logisticsDriver.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Driver not found');

    if (body.transporterId) {
      const transporter = await this.prisma.transporter.findFirst({
        where: { id: body.transporterId, tenantId: req.user.tenantId },
        select: { id: true },
      });
      if (!transporter) throw new NotFoundException('Transporter not found');
    }

    const driver = await this.prisma.logisticsDriver.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.employeeId !== undefined && { employeeId: body.employeeId }),
        ...(body.licenseType && { licenseType: body.licenseType }),
        ...(body.licenseNo !== undefined && { licenseNo: body.licenseNo }),
        ...(body.licenseExpiry && { licenseExpiry: new Date(body.licenseExpiry) }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.email !== undefined && { email: body.email }),
        ...(body.address !== undefined && { address: body.address }),
        ...(body.status && { status: body.status }),
        ...(body.transporterId !== undefined && { transporterId: body.transporterId }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
      include: { transporter: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'UPDATE',
      entity: 'LogisticsDriver',
      entityId: driver.id,
      metadata: { code: driver.code, name: driver.name },
    });

    return { driver };
  }
}
