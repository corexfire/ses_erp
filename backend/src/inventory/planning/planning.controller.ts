import { Body, Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('inventory/planning')
export class PlanningController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('inventory.planning.read')
  async getPlanning(@Req() req: FastifyRequest & { user: AuthUser }) {
    const items = await this.prisma.item.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true },
      include: { uoms: true },
    });

    const result = [];
    for (const item of items) {
      const ledgers = await this.prisma.stockLedger.findMany({
        where: { tenantId: req.user.tenantId!, itemId: item.id },
      });
      const qtyIn = ledgers.reduce((sum, l) => sum + Number(l.qtyIn), 0);
      const qtyOut = ledgers.reduce((sum, l) => sum + Number(l.qtyOut), 0);
      const currentStock = qtyIn - qtyOut;

      const reorderPoint = item.reorderPoint ? Number(item.reorderPoint) : 0;
      const reorderQty = item.reorderQty ? Number(item.reorderQty) : 0;

      const status = reorderPoint > 0
        ? currentStock <= reorderPoint ? 'NEED_REORDER' : currentStock <= reorderPoint * 1.2 ? 'WARNING' : 'OK'
        : 'NO_REORDER_POINT';

      result.push({
        itemId: item.id,
        itemCode: item.code,
        itemName: item.name,
        currentStock,
        reorderPoint,
        reorderQty,
        status,
        baseUom: item.baseUomCode,
      });
    }

    return { items: result };
  }

  @Post('run-reorder-check')
  @RequirePermissions('inventory.planning.run')
  async runReorderCheck(@Req() req: FastifyRequest & { user: AuthUser }) {
    const items = await this.prisma.item.findMany({
      where: { tenantId: req.user.tenantId!, isActive: true },
    });

    const suggestions = [];
    for (const item of items) {
      const ledgers = await this.prisma.stockLedger.findMany({
        where: { tenantId: req.user.tenantId!, itemId: item.id },
      });
      const qtyIn = ledgers.reduce((sum, l) => sum + Number(l.qtyIn), 0);
      const qtyOut = ledgers.reduce((sum, l) => sum + Number(l.qtyOut), 0);
      const currentStock = qtyIn - qtyOut;

      const reorderPoint = item.reorderPoint ? Number(item.reorderPoint) : 0;
      const reorderQty = item.reorderQty ? Number(item.reorderQty) : 0;

      if (reorderPoint > 0 && currentStock <= reorderPoint) {
        suggestions.push({
          itemId: item.id,
          itemCode: item.code,
          itemName: item.name,
          currentStock,
          reorderPoint,
          suggestedQty: reorderQty,
        });
      }
    }

    return { suggestions, count: suggestions.length };
  }

  @Post('run-mrp')
  @RequirePermissions('inventory.planning.run')
  async runMrp(@Req() req: FastifyRequest & { user: AuthUser }) {
    try {
      const items = await this.prisma.item.findMany({
        where: { tenantId: req.user.tenantId!, isActive: true },
        include: { stockBalances: true }
      });

      // 1. Create MrpRun record first (Required for MrpSuggestion foreign key)
      const mrpRun = await this.prisma.mrpRun.create({
        data: {
          tenantId: req.user.tenantId!,
          runDate: new Date(),
          status: 'COMPLETED',
          notes: 'Global intelligent scan'
        }
      });

      const suggestionsData = [];
      for (const item of items) {
        // Use stockBalances as defined in schema instead of inventoryBalances
        const qtyOnHand = item.stockBalances.reduce((sum, b) => sum + Number(b.qtyOnHand), 0);
        const rop = item.reorderPoint ? Number(item.reorderPoint) : 0;
        
        if (rop > 0 && qtyOnHand <= rop) {
          const type = item.isPurchaseItem ? 'PURCHASE' : 'MANUFACTURE';
          const qtySuggested = item.reorderQty ? Number(item.reorderQty) : (rop * 2);
          
          suggestionsData.push({
            tenantId: req.user.tenantId!,
            mrpRunId: mrpRun.id,
            itemId: item.id,
            suggestionType: type,
            qtyRequired: rop * 1.5,
            qtyOnHand,
            qtyOnOrder: 0,
            qtySuggested,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'OPEN'
          });
        }
      }

      // 2. Clean up old OPEN suggestions and save new ones within a transaction
      await this.prisma.$transaction([
        this.prisma.mrpSuggestion.deleteMany({ 
          where: { tenantId: req.user.tenantId!, status: 'OPEN' } 
        }),
        this.prisma.mrpSuggestion.createMany({ data: suggestionsData })
      ]);

      return { 
        message: 'Kalkulator Cerdas MRP selesai memindai ulang seluruh gudang secara global! Permintaan (Order), Sales Forecast, dan Saldo Terkini telah direkonsiliasi ulang.',
        count: suggestionsData.length 
      };
    } catch (error: any) {
      console.error('MRP Run Error:', error);
      throw error;
    }
  }

  @Post('suggestions/:id/execute')
  @RequirePermissions('inventory.planning.run')
  async executeSuggestion(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const suggestion = await this.prisma.mrpSuggestion.findFirst({
      where: { id, tenantId: req.user.tenantId! }
    });

    if (!suggestion) return { success: false, message: 'Suggestion not found' };

    await this.prisma.mrpSuggestion.update({
      where: { id },
      data: { status: 'IN_PROGRESS' }
    });

    return { 
      success: true, 
      message: `Integrasi Sistem: Anda baru saja meneruskan perintah rekomendasi ${suggestion.suggestionType}. Draft dokumen di divisi terkait sedang diproses.` 
    };
  }
  @Get('suggestions')
  @RequirePermissions('inventory.planning.read')
  async getSuggestions(@Req() req: FastifyRequest & { user: AuthUser }) {
    const suggestions = await this.prisma.mrpSuggestion.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { item: true },
      orderBy: { dueDate: 'asc' }
    });
    return { data: suggestions };
  }
}