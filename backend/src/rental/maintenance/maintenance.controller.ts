import {
  Body,
  Controller,
  ForbiddenException,
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

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('rental/maintenance')
export class RentalMaintenanceController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  async findAll(@Req() req: FastifyRequest, @Query('search') search?: string, @Query('status') status?: string) {
    const user = req.user as AuthUser;
    
    const where: any = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
    
    if (search) {
      where.OR = [
        { ticketNo: { contains: search, mode: 'insensitive' } },
        { issueDescription: { contains: search, mode: 'insensitive' } },
        { contract: { contractNo: { contains: search, mode: 'insensitive' } } },
        { asset: { assetNo: { contains: search, mode: 'insensitive' } } },
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const maintenances = await this.prisma.rentalMaintenance.findMany({
      where,
      include: {
        asset: { select: { assetNo: true } },
        contract: { select: { contractNo: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Summary logic for dashboards
    const summaryWhere = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
    const summaryAggr = await this.prisma.rentalMaintenance.groupBy({
       by: ['status'],
       where: summaryWhere,
       _sum: { costAmount: true }
    });

    const summary = {
       scheduled: await this.prisma.rentalMaintenance.count({ where: { ...summaryWhere, status: 'SCHEDULED' } }),
       inProgress: await this.prisma.rentalMaintenance.count({ where: { ...summaryWhere, status: 'IN_PROGRESS' } }),
       completed: await this.prisma.rentalMaintenance.count({ where: { ...summaryWhere, status: 'COMPLETED' } }),
       totalCost: summaryAggr.reduce((sum, item) => sum + (Number(item._sum.costAmount) || 0), 0)
    };

    return { data: maintenances, summary };
  }

  @Post()
  async create(@Req() req: FastifyRequest, @Body() body: any) {
    const user = req.user as AuthUser;
    
    const ticketNo = body.ticketNo || `RWO-${new Date().getFullYear()}-${Math.floor(Math.random() * 89999 + 10000)}`;

    const record = await this.prisma.rentalMaintenance.create({
      data: {
        tenantId: user.tenantId,
        ticketNo,
        contractId: body.contractId || null,
        assetId: body.assetId || null,
        type: body.type || 'REPAIR',
        priority: body.priority || 'LOW',
        status: body.status || 'SCHEDULED',
        scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : new Date(),
        costAmount: body.costAmount || 0,
        mechanicName: body.mechanicName || null,
        issueDescription: body.issueDescription || '',
        resolutionNotes: body.resolutionNotes || null
      },
    });

    await this.audit.log(
      user.tenantId,
      user.id,
      'CREATE',
      'RentalMaintenance',
      record.id,
      null,
      record,
    );

    return { message: 'Maintenance Work Order created', data: record };
  }

  @Patch(':id')
  async update(
    @Req() req: FastifyRequest,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const user = req.user as AuthUser;
    const existing = await this.prisma.rentalMaintenance.findUnique({
      where: { id },
    });

    if (!existing || existing.tenantId !== user.tenantId) {
      throw new NotFoundException('Work Order not found');
    }

    const data: any = {};
    if (body.status !== undefined) {
        data.status = body.status;
        if (data.status === 'COMPLETED' && existing.status !== 'COMPLETED') {
            data.completionDate = new Date();
        }
    }
    if (body.type !== undefined) data.type = body.type;
    if (body.priority !== undefined) data.priority = body.priority;
    if (body.costAmount !== undefined) data.costAmount = body.costAmount;
    if (body.mechanicName !== undefined) data.mechanicName = body.mechanicName;
    if (body.issueDescription !== undefined) data.issueDescription = body.issueDescription;
    if (body.resolutionNotes !== undefined) data.resolutionNotes = body.resolutionNotes;
    if (body.scheduledDate) data.scheduledDate = new Date(body.scheduledDate);

    const updated = await this.prisma.rentalMaintenance.update({
      where: { id },
      data,
    });

    await this.audit.log(
      user.tenantId,
      user.id,
      'UPDATE',
      'RentalMaintenance',
      id,
      existing,
      updated,
    );

    return { message: 'Maintenance Work Order updated', data: updated };
  }

  @Get('lookups')
  async getLookups(@Req() req: FastifyRequest) {
    const user = req.user as AuthUser;
    const contractWhere = user.isSuperAdmin ? { status: 'ACTIVE' } : { tenantId: user.tenantId, status: 'ACTIVE' };
    const assetWhere = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
    const contracts = await this.prisma.rentalContract.findMany({
      where: contractWhere,
      select: { id: true, contractNo: true }
    });
    const assets = await this.prisma.fixedAsset.findMany({
      where: assetWhere,
      select: { id: true, assetNo: true }
    });
    return { data: { contracts, assets } };
  }
}
