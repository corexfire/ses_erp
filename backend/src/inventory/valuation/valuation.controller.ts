import { Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/valuation')
export class ValuationController {
  constructor(private readonly prisma: PrismaService) {}

  private activeJobs = new Map<string, { progress: number; status: string }>();

  @Get()
  @RequirePermissions('inventory.valuation.read')
  async getValuation(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('warehouseId') warehouseId?: string,
    @Query('itemId') itemId?: string,
  ) {
    const where: any = { tenantId: req.user.tenantId! };
    if (warehouseId) where.warehouseId = warehouseId;
    if (itemId) where.itemId = itemId;

    const stockLedgers = await this.prisma.stockLedger.findMany({
      where,
      include: { item: true, warehouse: true, binLocation: true },
      orderBy: [{ postingDate: 'asc' }],
    });

    const itemMap = new Map<string, { qtyIn: number; qtyOut: number; valueIn: number; valueOut: number; items: any[] }>();

    for (const ledger of stockLedgers) {
      const key = ledger.itemId || 'unknown';
      if (!itemMap.has(key)) {
        itemMap.set(key, { qtyIn: 0, qtyOut: 0, valueIn: 0, valueOut: 0, items: [] });
      }
      const entry = itemMap.get(key)!;
      entry.qtyIn += Number(ledger.qtyIn);
      entry.qtyOut += Number(ledger.qtyOut);
      entry.items.push(ledger);
    }

    const valuation = [];
    for (const [itemId, data] of itemMap) {
      const currentQty = data.qtyIn - data.qtyOut;
      const item = data.items[0]?.item;
      const valuationMethod = item?.valuationMethod || 'MOVING_AVERAGE';

      let unitCost = 0;
      let totalValue = 0;

      if (valuationMethod === 'FIFO') {
        const receipts = data.items.filter((l: any) => l.qtyIn > 0);
        let remainingQty = currentQty;
        for (const receipt of receipts) {
          if (remainingQty <= 0) break;
          const qty = Math.min(remainingQty, Number(receipt.qtyIn));
          totalValue += qty * Number(receipt.unitCost || 0);
          remainingQty -= qty;
        }
        unitCost = totalValue / currentQty || 0;
      } else {
        const layers = await this.prisma.valuationLayer.findMany({
          where: { tenantId: req.user.tenantId!, itemId },
          orderBy: [{ postingDate: 'asc' }],
        });
        const totalValQty = layers.reduce((sum, l) => sum + Number(l.qty), 0);
        const totalValValue = layers.reduce((sum, l) => sum + Number(l.qty) * Number(l.unitCost), 0);
        unitCost = totalValQty > 0 ? totalValValue / totalValQty : 0;
        totalValue = currentQty * unitCost;
      }

      if (item) {
        valuation.push({
          itemId: item.id,
          itemCode: item.code,
          itemName: item.name,
          currentQty,
          unitCost: Math.round(unitCost * 100) / 100,
          totalValue: Math.round(totalValue * 100) / 100,
          valuationMethod,
        });
      }
    }

    const grandTotal = valuation.reduce((sum, v) => sum + v.totalValue, 0);
    return { valuation, grandTotal: Math.round(grandTotal * 100) / 100 };
  }

  @Get('by-warehouse')
  @RequirePermissions('inventory.valuation.read')
  async getValuationByWarehouse(@Req() req: FastifyRequest & { user: AuthUser }) {
    const warehouses = await this.prisma.warehouse.findMany({
      where: { tenantId: req.user.tenantId! },
      select: { id: true, code: true, name: true },
    });

    const result = [];
    for (const wh of warehouses) {
      const ledgers = await this.prisma.stockLedger.findMany({
        where: { tenantId: req.user.tenantId!, warehouseId: wh.id },
      });

      const totalIn = ledgers.reduce((sum, l) => sum + Number(l.qtyIn), 0);
      const totalOut = ledgers.reduce((sum, l) => sum + Number(l.qtyOut), 0);
      const qty = totalIn - totalOut;

      result.push({
        warehouseId: wh.id,
        warehouseCode: wh.code,
        warehouseName: wh.name,
        currentQty: qty,
      });
    }

    return { warehouses: result };
  }

  @Post('recalculate')
  @RequirePermissions('inventory.valuation.manage')
  async recalculate(@Req() req: FastifyRequest & { user: AuthUser }) {
    const jobId = `job_${Date.now()}`;
    this.activeJobs.set(jobId, { progress: 0, status: 'IN_PROGRESS' });

    // Simulate background processing
    void this.processRecalculation(jobId, req.user.tenantId!);

    return { jobId, message: 'Recalculation started in background' };
  }

  @Get('job-status/:jobId')
  @RequirePermissions('inventory.valuation.read')
  async getJobStatus(@Param('jobId') jobId: string) {
    const job = this.activeJobs.get(jobId);
    if (!job) return { status: 'NOT_FOUND', progress: 0 };
    return job;
  }

  @Get('layers')
  @RequirePermissions('inventory.valuation.read')
  async getLayers(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('itemId') itemId?: string,
    @Query('take') take?: string,
  ) {
    const layers = await this.prisma.valuationLayer.findMany({
      where: {
        tenantId: req.user.tenantId!,
        ...(itemId ? { itemId } : {}),
      },
      orderBy: [{ postingDate: 'desc' }],
      take: take ? parseInt(take, 10) : 50,
    });
    return { data: layers };
  }

  private async processRecalculation(jobId: string, tenantId: string) {
    try {
      this.activeJobs.set(jobId, { progress: 10, status: 'IN_PROGRESS' });
      const items = await this.prisma.item.findMany({ where: { tenantId } });

      let processed = 0;
      for (const item of items) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        processed++;
        const progress = Math.min(10 + Math.floor((processed / items.length) * 85), 95);
        this.activeJobs.set(jobId, { progress, status: 'IN_PROGRESS' });
      }

      this.activeJobs.set(jobId, { progress: 100, status: 'COMPLETED' });
      setTimeout(() => this.activeJobs.delete(jobId), 300000);
    } catch (error) {
      console.error('COGS Recalculation Error:', error);
      this.activeJobs.set(jobId, { progress: 0, status: 'FAILED' });
    }
  }
}