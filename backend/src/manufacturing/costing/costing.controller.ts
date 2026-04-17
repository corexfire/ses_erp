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
import { CalculateCostDto, FinalizeCostDto } from './dto/costing.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/costing')
export class CostingController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('summaries')
  @RequirePermissions('manufacturing.costing.read')
  async listSummaries(@Req() req: FastifyRequest & { user: AuthUser }) {
    const costs = await this.prisma.productionCost.findMany({
      where: { tenantId: req.user.tenantId },
      include: {
        workOrder: {
          include: { finishedGood: true }
        },
        details: true
      },
      orderBy: [{ calculatedAt: 'desc' }],
    });
    return { costs };
  }

  @Post('calculate')
  @RequirePermissions('manufacturing.costing.create')
  async calculateCost(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: CalculateCostDto) {
    const wo = await this.prisma.workOrder.findFirst({
      where: { id: body.workOrderId, tenantId: req.user.tenantId },
      include: {
        bom: {
          include: { items: { include: { item: true } } }
        },
        productionIssues: {
          include: { items: true }
        },
        shopFloorLogs: true
      }
    });

    if (!wo) throw new NotFoundException('Work Order not found');

    // 1. Calculate Actual Material Cost
    let actualMaterialCost = 0;
    for (const issue of wo.productionIssues) {
      for (const item of issue.items) {
        // In a real ERP, we'd take the cost from the valuation layer or stock ledger
        // For simulation, we'll assume unitCost is stored or use a fallback
        actualMaterialCost += Number(item.qtyIssued) * (Number(item.unitCost) || 1000);
      }
    }

    // 2. Calculate Actual Labor Cost
    let totalLaborHours = 0;
    wo.shopFloorLogs.forEach(log => {
      totalLaborHours += Number(log.actualLaborHours || 0);
    });
    const laborRate = 75000; // IDR per hour simulation
    const actualLaborCost = totalLaborHours * laborRate;

    // 3. Overhead Calculation
    const fixedOverhead = body.fixedOverheadAmount || 500000;
    const variableOverhead = (body.variableOverheadRate || 25000) * totalLaborHours;
    const actualOverheadCost = fixedOverhead + variableOverhead;

    const actualTotalCost = actualMaterialCost + actualLaborCost + actualOverheadCost;

    // 4. Standard Cost (from BOM)
    let standardMaterialCost = 0;
    if (wo.bom) {
      wo.bom.items.forEach(bi => {
        // Assume standard unit cost is $1000 for simulation if not defined
        standardMaterialCost += Number(bi.qty) * 1000; 
      });
    }
    const standardTotalCost = standardMaterialCost * 1.2; // 20% mark for labor/overhead in standard

    // 5. Upsert Production Cost Record
    const costRecord = await this.prisma.productionCost.upsert({
      where: {
        tenantId_workOrderId_period: {
          tenantId: req.user.tenantId,
          workOrderId: wo.id,
          period: body.period
        }
      },
      update: {
        materialCost: actualMaterialCost,
        laborCost: actualLaborCost,
        overheadCost: actualOverheadCost,
        totalCost: actualTotalCost,
        standardCost: standardTotalCost,
        actualCost: actualTotalCost,
        materialVariance: actualMaterialCost - standardMaterialCost,
        calculatedAt: new Date()
      },
      create: {
        tenantId: req.user.tenantId,
        workOrderId: wo.id,
        period: body.period,
        materialCost: actualMaterialCost,
        laborCost: actualLaborCost,
        overheadCost: actualOverheadCost,
        totalCost: actualTotalCost,
        standardCost: standardTotalCost,
        actualCost: actualTotalCost,
        materialVariance: actualMaterialCost - standardMaterialCost,
      }
    });

    // Save Details
    await this.prisma.productionCostDetail.deleteMany({ where: { productionCostId: costRecord.id } });
    await this.prisma.productionCostDetail.createMany({
      data: [
        { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'MATERIAL', name: 'Raw Material Consumption', actualAmount: actualMaterialCost, standardAmount: standardMaterialCost, variance: actualMaterialCost - standardMaterialCost },
        { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'LABOR', name: 'Shop Floor Direct Labor', actualAmount: actualLaborCost, standardAmount: standardTotalCost * 0.1, variance: 0 },
        { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'OVERHEAD_FIXED', name: 'Factory Rent & Utilities', actualAmount: fixedOverhead, standardAmount: fixedOverhead, variance: 0 },
        { tenantId: req.user.tenantId, productionCostId: costRecord.id, costCategory: 'OVERHEAD_VARIABLE', name: 'Machine Maintenance & Power', actualAmount: variableOverhead, standardAmount: variableOverhead, variance: 0 },
      ]
    });

    return { cost: costRecord };
  }

  @Post('finalize')
  @RequirePermissions('manufacturing.costing.update')
  async finalizeCost(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: FinalizeCostDto) {
    const cost = await this.prisma.productionCost.findFirst({
      where: { id: body.costId, tenantId: req.user.tenantId },
      include: { workOrder: true }
    });
    if (!cost) throw new NotFoundException('Cost record not found');

    return await this.prisma.$transaction(async (tx) => {
      // 1. Create Journal Entry
      const entryNo = `JV-COST-${Date.now()}`;
      const journal = await tx.journalEntry.create({
        data: {
          tenantId: req.user.tenantId,
          entryNo,
          entryDate: new Date(),
          description: `Manufacturing Cost Settlement for WO ${cost.workOrder.code}`,
          status: 'POSTED',
          totalDebit: cost.totalCost,
          totalCredit: cost.totalCost,
          lines: {
            create: [
              {
                tenantId: req.user.tenantId,
                lineNo: 1,
                accountCode: '1-1330-00', // Persediaan Barang Jadi
                debit: cost.totalCost,
                credit: 0,
                description: 'Finished Goods Valuation'
              },
              {
                tenantId: req.user.tenantId,
                lineNo: 2,
                accountCode: '1-1320-00', // Persediaan Barang Dalam Proses
                debit: 0,
                credit: cost.totalCost,
                description: 'WIP Clear out'
              }
            ]
          }
        }
      });

      // 2. Mark as finalized
      const updated = await tx.productionCost.update({
        where: { id: cost.id },
        data: {
          isFinalized: true,
          journalEntryId: journal.id
        }
      });

      return { cost: updated, journal };
    });
  }
}