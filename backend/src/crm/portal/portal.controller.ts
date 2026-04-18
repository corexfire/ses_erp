import {
  Body,
  Controller,
  ForbiddenException,
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
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/portal')
export class CrmPortalController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('users')
  async getUsers(@Req() req: FastifyRequest, @Query('search') search?: string) {
    const user = req.user as AuthUser;
    
    // We fetch Customers as masters to see who has Portal access and who doesn't.
    const where: any = { tenantId: user.tenantId!, isActive: true };
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    const customers = await this.prisma.customer.findMany({
       where,
       include: {
           portalUsers: true,
           _count: { select: { salesInvoices: true, salesQuotations: true } }
       },
       orderBy: { name: 'asc' }
    });

    const activePortalsCount = await this.prisma.customerPortalUser.count({
        where: { tenantId: user.tenantId!, portalStatus: 'ACTIVE' }
    });
    
    const logsCount = await this.prisma.customerPortalActivity.count({
        where: { tenantId: user.tenantId! }
    });

    const summary = {
        totalCustomers: customers.length,
        portalUsers: activePortalsCount,
        engagementLogs: logsCount
    };

    return { data: customers, summary };
  }

  @Get('activities')
  async getActivities(@Req() req: FastifyRequest, @Query('limit') limitArg?: string) {
    const user = req.user as AuthUser;
    const limit = Number(limitArg) || 50;

    const activities = await this.prisma.customerPortalActivity.findMany({
        where: { tenantId: user.tenantId! },
        include: {
            user: { 
                select: { email: true, portalStatus: true, customer: { select: { name: true, code: true } } }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: limit
    });
    return { data: activities };
  }

  @Post('invite')
  async inviteUser(@Req() req: FastifyRequest, @Body() body: { customerCode: string, email: string }) {
     const user = req.user as AuthUser;

     if (!body.customerCode || !body.email) throw new ForbiddenException('Customer Code and Email required');

     // Upsert logic inside Postgres
     const portalUser = await this.prisma.customerPortalUser.upsert({
         where: { tenantId_email: { tenantId: user.tenantId!, email: body.email } },
         update: { portalStatus: 'PENDING_INVITE', inviteSentAt: new Date() },
         create: {
             tenantId: user.tenantId!,
             customerCode: body.customerCode,
             email: body.email,
             portalStatus: 'PENDING_INVITE',
             inviteSentAt: new Date()
         }
     });

     await this.prisma.customerPortalActivity.create({
         data: {
             tenantId: user.tenantId!,
             portalUserId: portalUser.id,
             activityType: 'ADMIN_INVITE',
             description: `System Admin dispatched setup password link to ${body.email}.`
         }
     });

     return { message: 'Portal invitation link dispatched to client inbox.' };
  }

  @Post('revoke')
  async revokeUser(@Req() req: FastifyRequest, @Body() body: { portalUserId: string }) {
     const user = req.user as AuthUser;

     const portalUser = await this.prisma.customerPortalUser.update({
         where: { id: body.portalUserId, tenantId: user.tenantId! },
         data: { portalStatus: 'SUSPENDED' }
     });

     await this.prisma.customerPortalActivity.create({
         data: {
             tenantId: user.tenantId!,
             portalUserId: portalUser.id,
             activityType: 'ADMIN_REVOKE',
             description: `System Admin revoked external B2B portal permissions for this account.`
         }
     });

     return { message: 'Portal access revoked.' };
  }
}
