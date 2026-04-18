import {
  Body,
  Controller,
  Get,
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
@Controller('inventory/planning/ai')
export class AiForecastController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('forecasts')
  async getForecasts(@Req() req: FastifyRequest, @Query('search') search?: string) {
    const user = req.user as AuthUser;
    
    const where: any = { tenantId: user.tenantId! };
    if (search) {
      where.item = {
          OR: [
              { code: { contains: search, mode: 'insensitive' } },
              { name: { contains: search, mode: 'insensitive' } },
          ]
      };
    }

    // Get the latest forecast per item implicitly by just returning those available linked to items
    const models = await this.prisma.inventoryForecast.findMany({
       where,
       include: {
           item: { 
               select: { 
                   code: true, 
                   name: true, 
                   reorderPoint: true, 
                   reorderQty: true,
                   uoms: true 
               } 
           }
       },
       orderBy: { confidenceScore: 'desc' },
       take: 100 // Prevent massive payloads
    });

    const highRiskCount = models.filter(m => Number(m.predictedDemand) > Number(m.item.reorderQty || 0)).length;
    const upwardTrends = models.filter(m => m.trend === 'UPWARD' || m.trend === 'SEASONAL').length;

    const summary = {
        totalForecastsCount: models.length,
        highRiskStockouts: highRiskCount,
        upwardTrends
    };

    return { data: models, summary };
  }

  @Post('apply-restock')
  async applyRestockParams(@Req() req: FastifyRequest, @Body() body: { itemId: string, recommendedQty: string }) {
     const user = req.user as AuthUser;

     const item = await this.prisma.item.update({
         where: { id: body.itemId, tenantId: user.tenantId! },
         data: { reorderQty: Number(body.recommendedQty) }
     });

     return { message: 'Master Item Target Reorder Quantity adjusted by AI Recommendation!', data: item };
  }
}
