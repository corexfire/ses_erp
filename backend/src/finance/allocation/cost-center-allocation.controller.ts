import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/cost-center-allocation')
export class CostCenterAllocationController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.costCenterAllocation.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('periodId') periodId?: string) {
    const user = req.user;
    const where: any = user.isSuperAdmin ? {} : { tenantId: user.tenantId };
    if (periodId) where.periodId = periodId;

    const allocations = await this.prisma.costCenterAllocation.findMany({
      where,
      include: { costCenter: true },
      orderBy: { createdAt: 'desc' },
    });
    return { allocations };
  }

  @Get(':id')
  @RequirePermissions('finance.costCenterAllocation.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const user = req.user;
    const where = user.isSuperAdmin ? { id } : { id, tenantId: user.tenantId };
    const allocation = await this.prisma.costCenterAllocation.findFirst({
      where,
      include: { costCenter: true },
    });
    return { allocation };
  }

  @Post()
  @RequirePermissions('finance.costCenterAllocation.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { periodId: string; costCenterId: string; accountCode: string; allocatedAmount: number; referenceNo?: string; description?: string }) {
    const user = req.user;
    const cc = await this.prisma.costCenter.findUnique({ where: { id: body.costCenterId } });
    
    const allocation = await this.prisma.costCenterAllocation.create({
      data: {
        tenantId: user.tenantId,
        periodId: body.periodId,
        costCenterId: body.costCenterId,
        accountCode: body.accountCode,
        allocatedAmount: body.allocatedAmount,
        referenceNo: body.referenceNo,
        description: body.description,
      },
      include: { costCenter: true },
    });

    const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId } });
    const entryNo = `JE-CCA-${String(journalCount + 1).padStart(6, '0')}`;
    const expenseCode = body.accountCode || '5-3100-00';
    const allocCode = await this.prisma.coaAccount.findFirst({
      where: { tenantId: user.tenantId, code: '2-1210-00' }
    });
    const allocAccountCode = allocCode?.code || '2-1210-00';

    await this.prisma.journalEntry.create({
      data: {
        tenantId: user.tenantId,
        entryNo,
        entryDate: new Date(),
        description: `Cost Center Allocation - ${cc?.code || 'CC'} (${body.description || 'Alokasi Biaya'})`,
        referenceNo: body.referenceNo,
        journalType: 'COST_CENTER_ALLOCATION',
        totalDebit: body.allocatedAmount,
        totalCredit: body.allocatedAmount,
        status: 'POSTED',
        lines: {
          create: [
            {
              tenantId: user.tenantId,
              lineNo: 1,
              accountCode: expenseCode,
              description: `Beban ${cc?.code || ''}`,
              debit: body.allocatedAmount,
              credit: 0,
              costCenterId: body.costCenterId,
              referenceType: 'CostCenterAllocation',
              referenceId: allocation.id
            },
            {
              tenantId: user.tenantId,
              lineNo: 2,
              accountCode: allocAccountCode,
              description: `Alokasi ${cc?.code || ''}`,
              debit: 0,
              credit: body.allocatedAmount,
              costCenterId: body.costCenterId,
              referenceType: 'CostCenterAllocation',
              referenceId: allocation.id
            }
          ]
        }
      }
    });

    await this.audit.log({ tenantId: user.tenantId, actorUserId: user.id, action: 'CREATE', entity: 'CostCenterAllocation', entityId: allocation.id, metadata: { allocation } });
    return { allocation };
  }

  @Post(':id')
  @RequirePermissions('finance.costCenterAllocation.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { allocatedAmount?: number; accountCode?: string; referenceNo?: string; description?: string }) {
    const allocation = await this.prisma.costCenterAllocation.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!allocation) throw new Error('Allocation not found');

    const updated = await this.prisma.costCenterAllocation.update({
      where: { id },
      data: {
        ...(body.allocatedAmount !== undefined && { allocatedAmount: body.allocatedAmount }),
        ...(body.accountCode && { accountCode: body.accountCode }),
        ...(body.referenceNo !== undefined && { referenceNo: body.referenceNo }),
        ...(body.description !== undefined && { description: body.description }),
      },
      include: { costCenter: true },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'CostCenterAllocation', entityId: id, metadata: { allocation: updated } });
    return { allocation: updated };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.costCenterAllocation.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.costCenterAllocation.deleteMany({ where: { id, tenantId: req.user.tenantId } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'CostCenterAllocation', entityId: id, metadata: { id } });
    return { success: true };
  }
}