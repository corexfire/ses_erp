import { Controller, Get, Post, Patch, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/financial')
export class HrisFinancialController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('loans')
  @RequirePermissions('hris.payroll.read')
  async listLoans(@Req() req: FastifyRequest & { user: AuthUser }, @Query('employeeId') employeeId?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (employeeId) where.employeeId = employeeId;
    const loans = await this.prisma.employeeLoan.findMany({
      where,
      include: { employee: true, installments: true },
      orderBy: { createdAt: 'desc' },
    });
    return { loans };
  }

  @Post('loans')
  @RequirePermissions('hris.payroll.create')
  async createLoan(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: any) {
    const loan = await this.prisma.employeeLoan.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        amount: body.amount,
        reason: body.reason,
        status: 'APPROVED',
        installments: {
          create: body.installments.map((inst: any) => ({
            tenantId: req.user.tenantId!,
            amount: inst.amount,
            dueDate: new Date(inst.dueDate),
            status: 'UNPAID',
          })),
        },
      },
      include: { installments: true },
    });
    return { loan };
  }

  @Patch('installments/:id')
  @RequirePermissions('hris.payroll.update')
  async updateInstallment(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { status: string; paidDate?: string }) {
    const installment = await this.prisma.loanInstallment.update({
      where: { id, tenantId: req.user.tenantId! },
      data: { 
        status: body.status,
        paidDate: body.paidDate ? new Date(body.paidDate) : undefined,
      },
    });
    return { installment };
  }
}
