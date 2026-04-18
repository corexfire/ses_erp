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
@Controller('rental/billing')
export class RentalBillingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  async findAll(@Req() req: FastifyRequest, @Query('search') search?: string, @Query('status') status?: string) {
    const user = req.user as AuthUser;
    
    const where: any = user.isSuperAdmin ? {} : { tenantId: user.tenantId! };
    
    if (search) {
      where.OR = [
        { billingNo: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } },
        { contract: { contractNo: { contains: search, mode: 'insensitive' } } },
      ];
    }
    
    if (status) {
      where.status = status;
    }

    const billings = await this.prisma.rentalBilling.findMany({
      where,
      include: {
        customer: { select: { name: true, code: true } },
        contract: { select: { contractNo: true } }
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Summary logic for dashboards
    const summaryWhere = user.isSuperAdmin ? {} : { tenantId: user.tenantId! };
    const summaryAggr = await this.prisma.rentalBilling.groupBy({
       by: ['status'],
       where: summaryWhere,
       _sum: { totalAmount: true }
    });

    const summary = {
       unpaid: summaryAggr.find(s => s.status === 'UNPAID')?._sum.totalAmount || 0,
       paid: summaryAggr.find(s => s.status === 'PAID')?._sum.totalAmount || 0,
       overdue: summaryAggr.find(s => s.status === 'OVERDUE')?._sum.totalAmount || 0,
       count: billings.length
    };

    return { data: billings, summary };
  }

  @Post()
  async create(@Req() req: FastifyRequest, @Body() body: any) {
    const user = req.user as AuthUser;
    
    const billingNo = body.billingNo || `RB-${new Date().getFullYear()}-${Math.floor(Math.random() * 89999 + 10000)}`;
    const taxAmount = body.taxAmount || 0;
    const totalAmount = (body.amount || 0) + taxAmount;

    // Must fetch customerId from the contract if not pushed directly (safety mechanism)
    const contract = await this.prisma.rentalContract.findUnique({ where: { id: body.contractId } });
    if (!contract || contract.tenantId !== user.tenantId!) {
        throw new NotFoundException('Rental Contract not found or invalid.');
    }

    const billing = await this.prisma.rentalBilling.create({
      data: {
        tenantId: user.tenantId!,
        billingNo,
        contractId: body.contractId,
        customerId: contract.customerId,
        periodStart: new Date(body.periodStart),
        periodEnd: new Date(body.periodEnd),
        dueDate: new Date(body.dueDate),
        amount: body.amount || 0,
        taxAmount,
        totalAmount,
        status: body.status || 'UNPAID',
        notes: body.notes
      },
    });

    await this.audit.log({ tenantId: user.tenantId!, actorUserId: user.id, action: 'CREATE', entity: 'RentalBilling', entityId: billing.id,  });

    return { message: 'Rental Invoice created successfully', data: billing };
  }

  @Patch(':id')
  async update(
    @Req() req: FastifyRequest,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const user = req.user as AuthUser;
    const existing = await this.prisma.rentalBilling.findUnique({
      where: { id },
    });

    if (!existing || existing.tenantId !== user.tenantId!) {
      throw new NotFoundException('Invoice not found');
    }

    const data: any = {};
    if (body.status !== undefined) data.status = body.status;
    if (body.amount !== undefined) {
        data.amount = body.amount;
        data.totalAmount = Number(data.amount) + Number(existing.taxAmount);
    }
    // Simple edit logic - can be expanded.
    if (body.periodStart) data.periodStart = new Date(body.periodStart);
    if (body.periodEnd) data.periodEnd = new Date(body.periodEnd);
    if (body.dueDate) data.dueDate = new Date(body.dueDate);
    if (body.notes !== undefined) data.notes = body.notes;

    const updated = await this.prisma.rentalBilling.update({
      where: { id },
      data,
    });

    await this.audit.log({ tenantId: user.tenantId!, actorUserId: user.id, action: 'UPDATE', entity: 'RentalBilling', entityId: id, metadata: existing });

    return { message: 'Invoice updated successfully', data: updated };
  }

  @Get('contracts')
  async getContracts(@Req() req: FastifyRequest) {
    const user = req.user as AuthUser;
    const where = user.isSuperAdmin ? { status: 'ACTIVE' } : { tenantId: user.tenantId!, status: 'ACTIVE' };
    const items = await this.prisma.rentalContract.findMany({
      where,
      select: { id: true, contractNo: true, rentalRate: true, billingCycle: true }
    });
    return { data: items };
  }
}
