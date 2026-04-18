import {
  Body,
  Controller,
  ForbiddenException,
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
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('procurement/portal')
export class VendorPortalController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('vendors')
  async getVendors(@Req() req: FastifyRequest, @Query('search') search?: string) {
    const user = req.user as AuthUser;
    
    const where: any = { tenantId: user.tenantId!, isActive: true };
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const suppliers = await this.prisma.supplier.findMany({
       where,
       include: {
           portalUsers: true,
           _count: { select: { purchaseOrders: true, purchaseInvoices: true } }
       },
       orderBy: { name: 'asc' }
    });

    const activePortalsCount = await this.prisma.vendorPortalUser.count({
        where: { tenantId: user.tenantId!, portalStatus: 'ACTIVE' }
    });
    
    const logsCount = await this.prisma.vendorPortalActivity.count({
        where: { tenantId: user.tenantId! }
    });

    const summary = {
        totalSuppliers: suppliers.length,
        portalUsers: activePortalsCount,
        engagementLogs: logsCount
    };

    return { data: suppliers, summary };
  }

  @Get('activities')
  async getActivities(@Req() req: FastifyRequest, @Query('limit') limitArg?: string) {
    const user = req.user as AuthUser;
    const limit = Number(limitArg) || 50;

    const activities = await this.prisma.vendorPortalActivity.findMany({
        where: { tenantId: user.tenantId! },
        include: {
            user: { 
                select: { email: true, portalStatus: true, supplier: { select: { name: true, code: true } } }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: limit
    });
    return { data: activities };
  }

  @Post('invite')
  async inviteUser(@Req() req: FastifyRequest, @Body() body: { supplierCode: string, email: string }) {
     const user = req.user as AuthUser;

     if (!body.supplierCode || !body.email) throw new ForbiddenException('Supplier Code and Email required');

     const portalUser = await this.prisma.vendorPortalUser.upsert({
         where: { tenantId_email: { tenantId: user.tenantId!, email: body.email } },
         update: { portalStatus: 'PENDING_INVITE', inviteSentAt: new Date() },
         create: {
             tenantId: user.tenantId!,
             supplierCode: body.supplierCode,
             email: body.email,
             portalStatus: 'PENDING_INVITE',
             inviteSentAt: new Date()
         }
     });

     await this.prisma.vendorPortalActivity.create({
         data: {
             tenantId: user.tenantId!,
             portalUserId: portalUser.id,
             activityType: 'ADMIN_INVITE',
             description: `Procurement Admin dispatched vendor portal setup link to ${body.email}.`
         }
     });

     return { message: 'Vendor Portal invitation link dispatched successfully.' };
  }

  @Post('revoke')
  async revokeUser(@Req() req: FastifyRequest, @Body() body: { portalUserId: string }) {
     const user = req.user as AuthUser;

     const portalUser = await this.prisma.vendorPortalUser.update({
         where: { id: body.portalUserId, tenantId: user.tenantId! },
         data: { portalStatus: 'SUSPENDED' }
     });

     await this.prisma.vendorPortalActivity.create({
         data: {
             tenantId: user.tenantId!,
             portalUserId: portalUser.id,
             activityType: 'ADMIN_REVOKE',
             description: `Procurement Admin suspended Vendor Portal permissions for this account.`
         }
     });

     return { message: 'Vendor Portal access revoked.' };
  }
}
