import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
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
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('manufacturing/planning')
export class PlanningController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('manufacturing.planning.read')
  async listSuggestions(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
    @Query('runId') runId?: string,
  ) {
    const suggestions = await this.prisma.mrpSuggestion.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(status ? { status } : {}),
        ...(runId ? { mrpRunId: runId } : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { item: true, mrpRun: true },
      take: 200,
    });
    return { suggestions };
  }

  @Get('runs')
  @RequirePermissions('manufacturing.planning.read')
  async listRuns(@Req() req: FastifyRequest & { user: AuthUser }) {
    const runs = await this.prisma.mrpRun.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: [{ runDate: 'desc' }],
      include: { suggestions: { take: 5 } },
      take: 50,
    });
    return { runs };
  }

  @Post('run')
  @RequirePermissions('manufacturing.planning.run')
  async runMrp(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body()
    body: {
      demandSource?: string;
      planType?: string;
      planningHorizonDays?: number;
      periodStart?: string;
      notes?: string;
      includeSalesOrder?: boolean;
      includeForecast?: boolean;
      includeMinStock?: boolean;
    },
  ) {
    const items = await this.prisma.item.findMany({
      where: { tenantId: req.user.tenantId, isActive: true },
      include: {
        billOfMaterials: {
          where: { isActive: true },
          include: { items: { include: { componentItem: true } } },
        },
      },
    });

    const horizonDays = body.planningHorizonDays ?? 90;
    const periodStart = body.periodStart ? new Date(body.periodStart) : new Date();
    const periodEnd = new Date(periodStart.getTime() + horizonDays * 24 * 60 * 60 * 1000);

    const run = await this.prisma.$transaction(async (tx) => {
      const mrpRun = await tx.mrpRun.create({
        data: {
          tenantId: req.user.tenantId,
          runDate: new Date(),
          demandSource: body.demandSource ?? 'MANUAL',
          notes: body.notes,
          planType: body.planType ?? 'STANDARD',
          planningHorizonDays: horizonDays,
          periodStart,
          periodEnd,
          includeSalesOrder: body.includeSalesOrder ?? true,
          includeForecast: body.includeForecast ?? false,
          includeMinStock: body.includeMinStock ?? true,
        } as any,
      });

      for (const item of items) {
        const boms = item.billOfMaterials;
        if (boms.length === 0) continue;

        const mainBom = boms.find((b) => b.isMain) ?? boms[0];
        if (!mainBom.items) continue;

        for (const bomItem of mainBom.items) {
          const componentRequired = Number(bomItem.qty);
          const componentStock = await tx.stockLedger.aggregate({
            where: { tenantId: req.user.tenantId, itemId: bomItem.componentItemId },
            _sum: { qtyIn: true, qtyOut: true },
          });
          const componentOnHand =
            (Number(componentStock._sum.qtyIn ?? 0) || 0) -
            (Number(componentStock._sum.qtyOut ?? 0) || 0);

          if (componentOnHand < componentRequired) {
            const qtySuggested = componentRequired - componentOnHand;
            await tx.mrpSuggestion.create({
              data: {
                tenantId: req.user.tenantId,
                mrpRunId: mrpRun.id,
                itemId: bomItem.componentItemId,
                suggestionType: 'PURCHASE',
                qtyRequired: componentRequired,
                qtyOnHand: componentOnHand,
                qtyOnOrder: 0,
                qtySuggested: qtySuggested,
                dueDate: periodEnd,
                suggestedDate: new Date(periodStart.getTime() + 7 * 24 * 60 * 60 * 1000),
                priority: componentOnHand <= 0 ? 90 : componentOnHand < componentRequired / 2 ? 70 : 50,
                uomCode: bomItem.uomCode ?? undefined,
                workCenter: 'Gudang Bahan Baku',
                leadTimeDays: 7,
              } as any,
            });
          }
        }
      }

      return mrpRun;
    });

    return { run };
  }

  @Get('runs/:id')
  @RequirePermissions('manufacturing.planning.read')
  async getRun(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const run = await this.prisma.mrpRun.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { suggestions: { include: { item: true } } },
    });
    if (!run) throw new NotFoundException('MRP run not found');
    return { run };
  }
}