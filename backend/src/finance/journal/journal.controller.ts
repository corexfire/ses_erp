import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Req, UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/journal')
export class JournalController {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  @Get()
  @RequirePermissions('finance.journal.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const entries = await this.prisma.journalEntry.findMany({
      where: { tenantId: req.user.tenantId, ...(status ? { status } : {}) },
      include: { lines: true },
      orderBy: [{ entryDate: 'desc' }],
      take: 200,
    });
    return { entries };
  }

  @Get(':id')
  @RequirePermissions('finance.journal.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const entry = await this.prisma.journalEntry.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { lines: { orderBy: [{ lineNo: 'asc' }] } },
    });
    return { entry };
  }

  @Post()
  @RequirePermissions('finance.journal.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { entryDate: string; description?: string; referenceNo?: string; journalType?: string; lines: { accountCode: string; description?: string; debit: number; credit: number; costCenterId?: string }[] }) {
    const count = await this.prisma.journalEntry.count({ where: { tenantId: req.user.tenantId } });
    const entryNo = `JE-${String(count + 1).padStart(6, '0')}`;

    const totalDebit = body.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
    const totalCredit = body.lines.reduce((sum, l) => sum + (l.credit || 0), 0);

    const entry = await this.prisma.journalEntry.create({
      data: {
        tenantId: req.user.tenantId,
        entryNo,
        entryDate: new Date(body.entryDate),
        description: body.description,
        referenceNo: body.referenceNo,
        journalType: body.journalType || 'GENERAL',
        totalDebit,
        totalCredit,
        status: 'DRAFT',
        lines: {
          create: body.lines.map((line, idx) => ({
            tenantId: req.user.tenantId,
            lineNo: idx + 1,
            accountCode: line.accountCode,
            description: line.description,
            costCenterId: line.costCenterId,
            debit: line.debit || 0,
            credit: line.credit || 0,
          })),
        },
      },
      include: { lines: true },
    });

    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'JournalEntry', entityId: entry.id, metadata: { entryNo } });
    return { entry };
  }

  @Patch(':id')
  @RequirePermissions('finance.journal.update')
  async update(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { entryDate?: string; description?: string; referenceNo?: string; journalType?: string; lines?: { accountCode: string; description?: string; debit: number; credit: number; costCenterId?: string }[] }) {
    const existing = await this.prisma.journalEntry.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!existing) throw new NotFoundException('Journal entry not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only update draft entries');

    if (body.lines) {
      await this.prisma.journalEntryLine.deleteMany({ where: { journalEntryId: id } });
    }

    const totalDebit = body.lines?.reduce((sum, l) => sum + (l.debit || 0), 0) ?? existing.totalDebit;
    const totalCredit = body.lines?.reduce((sum, l) => sum + (l.credit || 0), 0) ?? existing.totalCredit;

    const entry = await this.prisma.journalEntry.update({
      where: { id },
      data: {
        ...(body.entryDate && { entryDate: new Date(body.entryDate) }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.referenceNo !== undefined && { referenceNo: body.referenceNo }),
        ...(body.journalType !== undefined && { journalType: body.journalType }),
        ...(body.lines && {
          totalDebit,
          totalCredit,
          lines: {
            create: body.lines.map((line, idx) => ({
              tenantId: req.user.tenantId,
              lineNo: idx + 1,
              accountCode: line.accountCode,
              description: line.description,
              costCenterId: line.costCenterId,
              debit: line.debit || 0,
              credit: line.credit || 0,
            })),
          },
        }),
      },
      include: { lines: true },
    });

    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'UPDATE', entity: 'JournalEntry', entityId: id });
    return { entry };
  }

  @Delete(':id')
  @RequirePermissions('finance.journal.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const existing = await this.prisma.journalEntry.findFirst({ where: { id, tenantId: req.user.tenantId } });
    if (!existing) throw new NotFoundException('Journal entry not found');
    if (existing.status !== 'DRAFT') throw new ForbiddenException('Can only delete draft entries');

    await this.prisma.journalEntryLine.deleteMany({ where: { journalEntryId: id } });
    await this.prisma.journalEntry.delete({ where: { id } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'JournalEntry', entityId: id });
    return { success: true };
  }

  @Post(':id/post')
  @RequirePermissions('finance.journal.post')
  async post(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const entry = await this.prisma.journalEntry.findFirst({
      where: { id, tenantId: req.user.tenantId },
      include: { lines: true },
    });
    if (!entry) throw new NotFoundException('Journal entry not found');
    if (entry.status !== 'DRAFT') throw new ForbiddenException('Can only post draft entries');
    if (entry.lines.length === 0) throw new ForbiddenException('Cannot post empty entry');
    if (entry.totalDebit !== entry.totalCredit) throw new ForbiddenException('Debit and credit must balance');

    const updated = await this.prisma.journalEntry.update({
      where: { id },
      data: { status: 'POSTED' },
    });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'POST', entity: 'JournalEntry', entityId: id, metadata: { entryNo: entry.entryNo } });
    return { entry: updated };
  }
}