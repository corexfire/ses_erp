import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/accounts')
export class CoaController {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  @Get()
  @RequirePermissions('finance.coa.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('type') type?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (type) where.type = type;
    const accounts = await this.prisma.coaAccount.findMany({
      where,
      include: { parent: true },
      orderBy: [{ code: 'asc' }],
    });
    return { accounts };
  }

  @Get(':id')
  @RequirePermissions('finance.coa.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const account = await this.prisma.coaAccount.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { parent: true, children: true },
    });
    return { account };
  }

  @Post()
  @RequirePermissions('finance.coa.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { code: string; name: string; type: string; parentId?: string; isPosting?: boolean }) {
    const account = await this.prisma.coaAccount.create({
      data: {
        tenantId: req.user.tenantId!,
        code: body.code,
        name: body.name,
        type: body.type as any,
        parentId: body.parentId || null,
        isPosting: body.isPosting ?? true,
      },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'CoaAccount', entityId: account.id, metadata: { code: body.code } });
    return { account };
  }

  @Patch(':id')
  @RequirePermissions('finance.coa.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { name?: string; isActive?: boolean; isPosting?: boolean }) {
    const account = await this.prisma.coaAccount.update({
      where: { id },
      data: { ...body },
    });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'UPDATE', entity: 'CoaAccount', entityId: id });
    return { account };
  }

  @Delete(':id')
  @RequirePermissions('finance.coa.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.coaAccount.delete({ where: { id } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'CoaAccount', entityId: id });
    return { success: true };
  }
}