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
@Controller('rental/contracts')
export class RentalContractsController {
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
        { contractNo: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } },
        { assetDescription: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const contracts = await this.prisma.rentalContract.findMany({
      where,
      include: {
        customer: { select: { name: true, code: true } },
        asset: { select: { assetNo: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Summary logic for dashboards
    const summaryWhere = user.isSuperAdmin ? { status: 'ACTIVE' } : { tenantId: user.tenantId, status: 'ACTIVE' };
    const summary = {
       active: await this.prisma.rentalContract.count({ where: user.isSuperAdmin ? { status: 'ACTIVE' } : { tenantId: user.tenantId, status: 'ACTIVE' } }),
       completed: await this.prisma.rentalContract.count({ where: user.isSuperAdmin ? { status: 'COMPLETED' } : { tenantId: user.tenantId, status: 'COMPLETED' } }),
       terminated: await this.prisma.rentalContract.count({ where: user.isSuperAdmin ? { status: 'TERMINATED' } : { tenantId: user.tenantId, status: 'TERMINATED' } })
    };

    return { data: contracts, summary };
  }

  @Post()
  async create(@Req() req: FastifyRequest, @Body() body: any) {
    const user = req.user as AuthUser;
    
    // Generate a contract number if not provided
    const contractNo = body.contractNo || `RNT-${new Date().getFullYear()}-${Math.floor(Math.random() * 8999 + 1000)}`;

    const contract = await this.prisma.rentalContract.create({
      data: {
        tenantId: user.tenantId,
        contractNo,
        customerId: body.customerId,
        assetId: body.assetId || null,
        assetDescription: body.assetDescription || null,
        billingCycle: body.billingCycle,
        status: body.status || 'DRAFT',
        startDate: body.startDate ? new Date(body.startDate) : new Date(),
        endDate: body.endDate ? new Date(body.endDate) : null,
        rentalRate: body.rentalRate || 0,
        depositAmount: body.depositAmount || 0,
        notes: body.notes
      },
    });

    await this.audit.log(
      user.tenantId,
      user.id,
      'CREATE',
      'RentalContract',
      contract.id,
      null,
      contract,
    );

    return { message: 'Rental Contract created successfully', data: contract };
  }

  @Patch(':id')
  async update(
    @Req() req: FastifyRequest,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const user = req.user as AuthUser;
    const existing = await this.prisma.rentalContract.findUnique({
      where: { id },
    });

    if (!existing || existing.tenantId !== user.tenantId) {
      throw new NotFoundException('Contract not found');
    }

    const data: any = {};
    if (body.assetId !== undefined) data.assetId = body.assetId;
    if (body.assetDescription !== undefined) data.assetDescription = body.assetDescription;
    if (body.billingCycle !== undefined) data.billingCycle = body.billingCycle;
    if (body.status !== undefined) data.status = body.status;
    if (body.rentalRate !== undefined) data.rentalRate = body.rentalRate;
    if (body.depositAmount !== undefined) data.depositAmount = body.depositAmount;
    if (body.notes !== undefined) data.notes = body.notes;
    if (body.startDate) data.startDate = new Date(body.startDate);
    if (body.endDate) data.endDate = new Date(body.endDate);
    if (body.customerId) data.customerId = body.customerId;

    const updated = await this.prisma.rentalContract.update({
      where: { id },
      data,
    });

    await this.audit.log(
      user.tenantId,
      user.id,
      'UPDATE',
      'RentalContract',
      id,
      existing,
      updated,
    );

    return { message: 'Rental Contract updated successfully', data: updated };
  }

  @Get('assets')
  async getAssets(@Req() req: FastifyRequest) {
    const user = req.user as AuthUser;
    const assets = await this.prisma.fixedAsset.findMany({
      where: { tenantId: user.tenantId },
      select: { id: true, assetNo: true }
    });
    return { data: assets };
  }
}
