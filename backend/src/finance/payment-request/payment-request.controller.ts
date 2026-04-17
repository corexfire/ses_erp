import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/payment-request')
export class PaymentRequestController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.paymentRequest.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId };
    if (status) where.status = status;

    const requests = await this.prisma.paymentRequest.findMany({
      where,
      orderBy: { requestDate: 'desc' },
    });
    return { requests };
  }

  @Get(':id')
  @RequirePermissions('finance.paymentRequest.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const request = await this.prisma.paymentRequest.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    return { request };
  }

  @Post()
  @RequirePermissions('finance.paymentRequest.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { requestNo: string; requestDate: string; requesterId: string; description: string; amount: number }) {
    const request = await this.prisma.paymentRequest.create({
      data: {
        tenantId: req.user.tenantId,
        requestNo: body.requestNo,
        requestDate: new Date(body.requestDate),
        requesterId: body.requesterId,
        description: body.description,
        amount: body.amount,
        status: 'PENDING',
        approvalStatus: 'PENDING',
      },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'PaymentRequest', entityId: request.id, metadata: { request } });
    return { request };
  }

  @Post(':id/approve')
  @RequirePermissions('finance.paymentRequest.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const request = await this.prisma.paymentRequest.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!request) throw new Error('Payment request not found');

    const updated = await this.prisma.paymentRequest.update({
      where: { id },
      data: { approvalStatus: 'APPROVED', status: 'APPROVED' },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'APPROVE', entity: 'PaymentRequest', entityId: id, metadata: { request: updated } });
    return { request: updated };
  }

  @Post(':id/reject')
  @RequirePermissions('finance.paymentRequest.approve')
  async reject(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { reason?: string }) {
    const updated = await this.prisma.paymentRequest.update({
      where: { id },
      data: { approvalStatus: 'REJECTED', status: 'REJECTED' },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'REJECT', entity: 'PaymentRequest', entityId: id, metadata: { request: updated, reason: body.reason } });
    return { request: updated };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.paymentRequest.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.paymentRequest.deleteMany({ where: { id, tenantId: req.user.tenantId } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'PaymentRequest', entityId: id, metadata: { id } });
    return { success: true };
  }
}