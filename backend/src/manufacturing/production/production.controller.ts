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
import { CreateProductionIssueDto, CreateProductionReceiptDto } from './dto/production.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/production')
export class ProductionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('issues')
  @RequirePermissions('manufacturing.production_issue.read')
  async listIssues(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const issues = await this.prisma.productionIssue.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q ? { code: { contains: q, mode: 'insensitive' } } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { workOrder: true, items: { include: { item: true } } },
      take: 200,
    });
    return { issues };
  }

  @Get('issues/:id')
  @RequirePermissions('manufacturing.production_issue.read')
  async getIssue(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const issue = await this.prisma.productionIssue.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { workOrder: true, items: { include: { item: true } } },
    });
    if (!issue) throw new NotFoundException('Production issue not found');
    return { issue };
  }

  @Post('issues')
  @RequirePermissions('manufacturing.production_issue.create')
  async createIssue(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateProductionIssueDto) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id: body.workOrderId, tenantId: req.user.tenantId },
      select: { id: true, warehouseId: true, status: true },
    });
    if (!wo) throw new NotFoundException('Work Order not found');
    if (wo.status === 'COMPLETED' || wo.status === 'CANCELED') {
      throw new NotFoundException('Cannot issue to completed/canceled Work Order');
    }

    const issue = await this.prisma.$transaction(async (tx) => {
      const created = await tx.productionIssue.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          workOrderId: body.workOrderId,
          issueDate: new Date(body.issueDate),
          notes: body.notes,
        },
      });

      for (let i = 0; i < body.items.length; i++) {
        const it = body.items[i];
        await tx.productionIssueItem.create({
          data: {
            tenantId: req.user.tenantId,
            issueId: created.id,
            lineNo: i + 1,
            itemId: it.itemId,
            qty: it.qty,
            uomCode: it.uomCode,
          },
        });

        if (wo.warehouseId) {
          await tx.stockLedger.create({
            data: {
              tenantId: req.user.tenantId,
              moveType: 'PRODUCTION_ISSUE',
              refType: 'PRODUCTION_ISSUE',
              refId: created.id,
              postingDate: new Date(),
              itemId: it.itemId,
              description: `Issue for WO ${body.code}`,
              qtyIn: '0',
              qtyOut: it.qty.toString(),
              uomCode: it.uomCode,
              warehouseId: wo.warehouseId,
            },
          });
        }
      }

      return created;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ProductionIssue',
      entityId: issue.id,
    });

    return { issue };
  }

  @Get('receipts')
  @RequirePermissions('manufacturing.production_receipt.read')
  async listReceipts(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
  ) {
    const receipts = await this.prisma.productionReceipt.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(q ? { code: { contains: q, mode: 'insensitive' } } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { workOrder: true },
      take: 200,
    });
    return { receipts };
  }

  @Get('receipts/:id')
  @RequirePermissions('manufacturing.production_receipt.read')
  async getReceipt(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const receipt = await this.prisma.productionReceipt.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { workOrder: true },
    });
    if (!receipt) throw new NotFoundException('Production receipt not found');
    return { receipt };
  }

  @Post('receipts')
  @RequirePermissions('manufacturing.production_receipt.create')
  async createReceipt(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CreateProductionReceiptDto) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id: body.workOrderId, tenantId: req.user.tenantId },
      select: { id: true, finishedGoodItemId: true, warehouseId: true, qtyProduced: true, status: true },
    });
    if (!wo) throw new NotFoundException('Work Order not found');

    const receipt = await this.prisma.$transaction(async (tx) => {
      const created = await tx.productionReceipt.create({
        data: {
          tenantId: req.user.tenantId,
          code: body.code,
          workOrderId: body.workOrderId,
          receiptDate: new Date(body.receiptDate),
          qtyProduced: body.qtyProduced,
          qtyRejected: (body as any).qtyRejected ?? 0,
          uomCode: body.uomCode,
          notes: body.notes,
          batchNo: (body as any).batchNo,
          shiftNo: (body as any).shiftNo,
        } as any,
      });

      if (wo.warehouseId) {
        await tx.stockLedger.create({
          data: {
            tenantId: req.user.tenantId,
            moveType: 'PRODUCTION_RECEIPT',
            refType: 'PRODUCTION_RECEIPT',
            refId: created.id,
            postingDate: new Date(),
            itemId: wo.finishedGoodItemId,
            description: `Production receipt for WO ${body.code}`,
            qtyIn: body.qtyProduced.toString(),
            qtyOut: '0',
            uomCode: body.uomCode,
            warehouseId: wo.warehouseId,
          },
        });
      }

      await tx.workOrder.update({
        where: { id: body.workOrderId },
        data: {
          qtyProduced: { increment: body.qtyProduced },
          status: wo.status === 'DRAFT' ? 'IN_PROGRESS' : wo.status,
        },
      });

      return created;
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ProductionReceipt',
      entityId: receipt.id,
    });

    return { receipt };
  }

  // ─── QC Endpoints ─────────────────────────────────────────────────────────

  @Get('qc')
  @RequirePermissions('manufacturing.qc.read')
  async listQc(@Req() req: FastifyRequest & { user: AuthUser }) {
    const qcs = await this.prisma.inProcessQc.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ createdAt: 'desc' }],
      include: { workOrder: { include: { finishedGood: true } } },
      take: 200,
    });
    return { qcs };
  }

  @Post('qc')
  @RequirePermissions('manufacturing.qc.create')
  async createQc(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: { workOrderId: string; qtyInspected: number; qtyPassed: number; qtyFailed: number; notes?: string; disposition?: string; inspectedBy?: string; qcDate?: string },
  ) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id: body.workOrderId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!wo) throw new NotFoundException('Work Order not found');

    const qc = await this.prisma.inProcessQc.create({
      data: {
        tenantId: req.user.tenantId,
        workOrderId: body.workOrderId,
        qtyInspected: body.qtyInspected,
        qtyPassed: body.qtyPassed,
        qtyFailed: body.qtyFailed,
        notes: body.notes,
        disposition: (body.disposition as any) ?? 'PENDING',
        inspectedBy: body.inspectedBy,
        qcDate: body.qcDate ? new Date(body.qcDate) : new Date(),
        status: 'IN_PROGRESS',
      } as any,
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'InProcessQc',
      entityId: qc.id,
    });

    return { qc };
  }

  @Patch('qc/:id')
  @RequirePermissions('manufacturing.qc.update')
  async updateQc(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: { status?: string; disposition?: string; notes?: string },
  ) {
    const qc = await this.prisma.inProcessQc.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!qc) throw new NotFoundException('QC record not found');
    const updated = await this.prisma.inProcessQc.update({
      where: { id },
      data: { status: body.status ?? undefined, disposition: body.disposition ?? undefined, notes: body.notes ?? undefined } as any,
    });
    return { qc: updated };
  }
}