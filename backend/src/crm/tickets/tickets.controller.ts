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
import { AssignUserDto } from '../shared/dto/assign-user.dto';
import { computeTicketSlaDueAt, isTicketOverdue } from '../shared/crm-sla';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

const ticketStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
type TicketStatus = (typeof ticketStatuses)[number];
const isTicketStatus = (v: string): v is TicketStatus =>
  (ticketStatuses as readonly string[]).includes(v);

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('crm/tickets')
export class TicketsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('crm.ticket.read')
  async list(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
  ) {
    const tickets = await this.prisma.serviceTicket.findMany({
      where: {
        tenantId: req.user.tenantId,
        ...(customerId ? { customerId } : {}),
        ...(status && isTicketStatus(status) ? { status } : {}),
        ...(q
          ? {
              OR: [
                { code: { contains: q, mode: 'insensitive' } },
                { subject: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }],
      include: { customer: true, assignedTo: true },
      take: 200,
    });
    const now = new Date();
    return {
      tickets: tickets.map((t) => {
        const slaDueAt = computeTicketSlaDueAt(t.createdAt, t.priority);
        return {
          ...t,
          slaDueAt,
          isOverdue: isTicketOverdue({
            now,
            status: t.status,
            slaDueAt,
          }),
        };
      }),
    };
  }

  @Post()
  @RequirePermissions('crm.ticket.create')
  async create(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: CreateTicketDto,
  ) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: body.customerId, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!customer) throw new NotFoundException('Customer not found');

    const ticket = await this.prisma.serviceTicket.create({
      data: {
        tenantId: req.user.tenantId,
        code: body.code,
        customerId: body.customerId,
        subject: body.subject,
        priority: body.priority ?? 'MEDIUM',
        status: body.status ?? 'OPEN',
        assignedToId: req.user.id,
        notes: body.notes,
      },
      include: { customer: true, assignedTo: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'create',
      entity: 'ServiceTicket',
      entityId: ticket.id,
    });

    const slaDueAt = computeTicketSlaDueAt(ticket.createdAt, ticket.priority);
    return {
      ticket: {
        ...ticket,
        slaDueAt,
        isOverdue: isTicketOverdue({
          now: new Date(),
          status: ticket.status,
          slaDueAt,
        }),
      },
    };
  }

  @Patch(':id')
  @RequirePermissions('crm.ticket.update')
  async update(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: UpdateTicketDto,
  ) {
    const exists = await this.prisma.serviceTicket.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Ticket not found');

    const ticket = await this.prisma.serviceTicket.update({
      where: { id },
      data: {
        subject: body.subject ?? undefined,
        priority: body.priority ?? undefined,
        status: body.status ?? undefined,
        notes: body.notes ?? undefined,
      },
      include: { customer: true, assignedTo: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'update',
      entity: 'ServiceTicket',
      entityId: ticket.id,
    });

    const slaDueAt = computeTicketSlaDueAt(ticket.createdAt, ticket.priority);
    return {
      ticket: {
        ...ticket,
        slaDueAt,
        isOverdue: isTicketOverdue({
          now: new Date(),
          status: ticket.status,
          slaDueAt,
        }),
      },
    };
  }

  @Patch(':id/assign')
  @RequirePermissions('crm.ticket.assign')
  async assign(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: AssignUserDto,
  ) {
    const exists = await this.prisma.serviceTicket.findFirst({
      where: { id, tenantId: req.user.tenantId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundException('Ticket not found');

    const userId = body.userId?.trim() || null;
    if (userId) {
      const assignee = await this.prisma.user.findFirst({
        where: { id: userId, tenantId: req.user.tenantId, isActive: true },
        select: { id: true },
      });
      if (!assignee) throw new NotFoundException('User not found');
    }

    const ticket = await this.prisma.serviceTicket.update({
      where: { id },
      data: { assignedToId: userId },
      include: { customer: true, assignedTo: true },
    });

    await this.audit.log({
      tenantId: req.user.tenantId,
      actorUserId: req.user.id,
      action: 'assign',
      entity: 'ServiceTicket',
      entityId: ticket.id,
      metadata: { assignedToId: userId },
    });

    const slaDueAt = computeTicketSlaDueAt(ticket.createdAt, ticket.priority);
    return {
      ticket: {
        ...ticket,
        slaDueAt,
        isOverdue: isTicketOverdue({
          now: new Date(),
          status: ticket.status,
          slaDueAt,
        }),
      },
    };
  }
}
