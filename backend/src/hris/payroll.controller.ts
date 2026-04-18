import { Controller, Get, Post, Body, Param, Query, Req, NotFoundException, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/payroll')
export class PayrollController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.payroll.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('period') period?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (period) where.period = period;

    const runs = await this.prisma.payrollRun.findMany({
      where,
      include: { employee: true },
      orderBy: [{ period: 'desc' }],
    });
    return { runs };
  }

  @Get(':id')
  @RequirePermissions('hris.payroll.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const run = await this.prisma.payrollRun.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { employee: true },
    });
    return { run };
  }

  @Post()
  @RequirePermissions('hris.payroll.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { employeeId: string; period: string; basicSalary: number; allowances?: number; deductions?: number; taxAmount?: number }) {
    const grossPay = body.basicSalary + (body.allowances || 0);
    const netPay = grossPay - (body.deductions || 0) - (body.taxAmount || 0);

    const existing = await this.prisma.payrollRun.findFirst({
      where: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        period: body.period,
      }
    });

    if (existing) {
      const run = await this.prisma.payrollRun.update({
        where: { id: existing.id },
        data: {
          basicSalary: body.basicSalary,
          allowances: body.allowances || 0,
          deductions: body.deductions || 0,
          grossPay,
          netPay,
          taxAmount: body.taxAmount || 0,
          status: existing.status === 'APPROVED' ? 'APPROVED' : 'DRAFT',
        },
        include: { employee: true },
      });
      return { run };
    }

    const run = await this.prisma.payrollRun.create({
      data: {
        tenantId: req.user.tenantId!,
        employeeId: body.employeeId,
        period: body.period,
        basicSalary: body.basicSalary,
        allowances: body.allowances || 0,
        deductions: body.deductions || 0,
        grossPay,
        netPay,
        taxAmount: body.taxAmount || 0,
        status: 'DRAFT',
      },
      include: { employee: true },
    });
    return { run };
  }

  @Post(':id/approve')
  @RequirePermissions('hris.payroll.approve')
  async approve(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string, @Body() body: { payDate: string }) {
    const run = await this.prisma.payrollRun.findFirst({
      where: { id, tenantId: req.user.tenantId! },
      include: { employee: true },
    });
    if (!run) throw new NotFoundException('Payroll run not found');

    const grossPay = Number(run.grossPay) || 0;
    const taxAmount = Number(run.taxAmount) || 0;
    const netPay = Number(run.netPay) || 0;

    const updatedRun = await this.prisma.$transaction(async (tx) => {
      const updated = await tx.payrollRun.update({
        where: { id },
        data: { status: 'APPROVED', payDate: new Date(body.payDate) },
        include: { employee: true },
      });

      if (grossPay > 0) {
        const jeCount = await tx.journalEntry.count({ where: { tenantId: req.user.tenantId! } });
        const jeNo = `JE-PY-${String(jeCount + 1).padStart(6, '0')}`;

         const journal = await tx.journalEntry.create({
           data: {
             tenantId: req.user.tenantId!,
             entryNo: jeNo,
             entryDate: new Date(),
             description: `Payroll Period ${run.period} - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
             referenceNo: run.period,
             journalType: 'PAYROLL',
             totalDebit: grossPay,
             totalCredit: grossPay,
             status: 'POSTED',
           }
         });

        const journalLines: any[] = [];
        let lineNo = 1;

        // Debit: Beban Gaji (Salary Expense) = grossPay
        journalLines.push({
          tenantId: req.user.tenantId!,
          journalEntryId: journal.id,
          lineNo: lineNo++,
          accountCode: '5-1000-00',
           description: `Beban Gaji & Tunjangan - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
          debit: grossPay,
          credit: 0,
          referenceId: run.id,
        });

        // Credit: Hutang Gaji (Salary Payable) = netPay (take home pay)
        journalLines.push({
          tenantId: req.user.tenantId!,
          journalEntryId: journal.id,
          lineNo: lineNo++,
          accountCode: '2-1200-00',
           description: `Hutang Gaji - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
          debit: 0,
          credit: netPay,
          referenceId: run.id,
        });

        // Credit: PPh 21 Terutang (Tax Payable) = taxAmount
        if (taxAmount > 0) {
          journalLines.push({
            tenantId: req.user.tenantId!,
            journalEntryId: journal.id,
            lineNo: lineNo++,
            accountCode: '2-1300-00',
             description: `PPh Pasal 21 Terutang - ${run.employee ? `${run.employee.firstName} ${run.employee.lastName || ''}`.trim() : run.employeeId}`,
            debit: 0,
            credit: taxAmount,
            referenceId: run.id,
          });
        }

        await tx.journalEntryLine.createMany({ data: journalLines });
      }

      return updated;
    });

    return { run: updatedRun };
  }
}

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('hris/ess')
export class ESSController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @RequirePermissions('hris.ess.read')
  async profile(@Req() req: FastifyRequest & { user: AuthUser }) {
    const employees = await this.prisma.employee.findMany({
      where: { tenantId: req.user.tenantId! },
      include: { attendances: { orderBy: [{ date: 'desc' }], take: 5 } },
    });
    return { employees };
  }

  @Get('my-attendance')
  @RequirePermissions('hris.ess.read')
  async myAttendance(@Req() req: FastifyRequest & { user: AuthUser }) {
    const attendances = await this.prisma.attendance.findMany({
      where: { tenantId: req.user.tenantId! },
      orderBy: [{ date: 'desc' }],
      take: 30,
    });
    return { attendances };
  }

  @Get('my-payroll')
  @RequirePermissions('hris.ess.read')
  async myPayroll(@Req() req: FastifyRequest & { user: AuthUser }) {
    const runs = await this.prisma.payrollRun.findMany({
      where: { tenantId: req.user.tenantId!, status: 'APPROVED' },
      orderBy: [{ period: 'desc' }],
    });
    return { runs };
  }
}