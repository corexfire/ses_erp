import { Controller, Get, Post, Body, Req, Patch, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';

@Controller('construction')
@UseGuards(JwtAuthGuard)
export class ConstructionExpansionController {

  constructor(private prisma: PrismaService) {}

  // ==========================================
  // PUNCH LIST (DEFECT MANAGEMENT)
  // ==========================================
  @Get('defects')
  async getDefects(@Req() req: FastifyRequest & { user: AuthUser }) {

    return this.prisma.projectDefect.findMany({
      where: { tenantId: req.user.tenantId },
      include: { wbsTask: { select: { taskName: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Post('defects')
  async createDefect(@Req() req: FastifyRequest & { user: AuthUser }, @Body() data: any) {

    return this.prisma.projectDefect.create({
      data: {
        ...data,
        tenantId: req.user.tenantId
      }
    });
  }

  @Patch('defects/:id')
  async updateDefect(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() data: any) {

    if (data.status === 'CLOSED' || data.status === 'RESOLVED') {
       data.resolvedAt = new Date();
    }
    return this.prisma.projectDefect.update({
      where: { id, tenantId: req.user.tenantId },
      data
    });
  }

  // ==========================================
  // REQUEST FOR INSPECTION (RFI)
  // ==========================================
  @Get('rfis')
  async getRFIs(@Req() req: FastifyRequest & { user: AuthUser }) {

    return this.prisma.projectRFI.findMany({
      where: { tenantId: req.user.tenantId },
      include: { wbsTask: { select: { taskName: true } } },
      orderBy: { requestedDate: 'desc' }
    });
  }

  @Post('rfis')
  async createRFI(@Req() req: FastifyRequest & { user: AuthUser }, @Body() data: any) {

    // Generate simple RFI NO
    const count = await this.prisma.projectRFI.count({ where: { tenantId: req.user.tenantId } });
    const rfiNo = `RFI-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    
    return this.prisma.projectRFI.create({
      data: {
        ...data,
        rfiNo,
        tenantId: req.user.tenantId,
        requestedDate: data.requestedDate ? new Date(data.requestedDate) : new Date(),
        neededByDate: data.neededByDate ? new Date(data.neededByDate) : null
      }
    });
  }

  @Patch('rfis/:id')
  async updateRFI(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() data: any) {

    return this.prisma.projectRFI.update({
      where: { id, tenantId: req.user.tenantId },
      data
    });
  }

  // ==========================================
  // EQUIPMENT LOGS
  // ==========================================
  @Get('equipment-logs')
  async getEquipmentLogs(@Req() req: FastifyRequest & { user: AuthUser }) {

    return this.prisma.projectEquipmentLog.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: { logDate: 'desc' }
    });
  }

  @Post('equipment-logs')
  async createEquipmentLog(@Req() req: FastifyRequest & { user: AuthUser }, @Body() data: any) {

    return this.prisma.projectEquipmentLog.create({
      data: {
        ...data,
        tenantId: req.user.tenantId,
        logDate: new Date(data.logDate)
      }
    });
  }

  // ==========================================
  // WEATHER LOGS
  // ==========================================
  @Get('weather-logs')
  async getWeatherLogs(@Req() req: FastifyRequest & { user: AuthUser }) {

    return this.prisma.projectWeatherLog.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: { logDate: 'desc' }
    });
  }

  @Post('weather-logs')
  async createWeatherLog(@Req() req: FastifyRequest & { user: AuthUser }, @Body() data: any) {

    return this.prisma.projectWeatherLog.create({
      data: {
        ...data,
        tenantId: req.user.tenantId,
        logDate: new Date(data.logDate)
      }
    });
  }

  // ==========================================
  // SITE INVENTORY
  // ==========================================
  @Get('site-inventory')
  async getSiteInventory(@Req() req: FastifyRequest & { user: AuthUser }) {

    return this.prisma.projectSiteInventory.findMany({
      where: { tenantId: req.user.tenantId },
      orderBy: { transactionDate: 'desc' }
    });
  }

  @Post('site-inventory')
  async createSiteInventory(@Req() req: FastifyRequest & { user: AuthUser }, @Body() data: any) {

    const qtyIn = data.quantityIn || 0;
    const qtyOut = data.quantityOut || 0;

    // Find previous balance for this material
    const previous = await this.prisma.projectSiteInventory.findFirst({
        where: { tenantId: req.user.tenantId, projectId: data.projectId, materialName: data.materialName },
        orderBy: { transactionDate: 'desc' }
    });

    const prevBalance = previous ? Number(previous.balance) : 0;
    const newBalance = prevBalance + Number(qtyIn) - Number(qtyOut);

    return this.prisma.projectSiteInventory.create({
      data: {
        ...data,
        tenantId: req.user.tenantId,
        balance: newBalance,
        transactionDate: new Date(data.transactionDate)
      }
    });
  }
}
