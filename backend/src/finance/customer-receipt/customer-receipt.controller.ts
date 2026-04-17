import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/customer-receipt')
export class CustomerReceiptController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.customerReceipt.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId };
    if (status) where.status = status;

    const receipts = await this.prisma.customerReceipt.findMany({
      where,
      orderBy: { receiptDate: 'desc' },
    });
    return { receipts };
  }

  @Get(':id')
  @RequirePermissions('finance.customerReceipt.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const receipt = await this.prisma.customerReceipt.findFirst({
      where: { id, tenantId: req.user.tenantId },
    });
    return { receipt };
  }

  @Post()
  @RequirePermissions('finance.customerReceipt.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { receiptNo: string; receiptDate: string; customerCode: string; amount: number; paymentMethod: string; reference?: string; notes?: string }) {
    const receipt = await this.prisma.customerReceipt.create({
      data: {
        tenantId: req.user.tenantId,
        receiptNo: body.receiptNo,
        receiptDate: new Date(body.receiptDate),
        customerCode: body.customerCode,
        amount: body.amount,
        paymentMethod: body.paymentMethod,
        reference: body.reference,
        notes: body.notes,
        status: 'POSTED',
      },
    });

    // Create cash/bank transaction based on payment method
    if (body.paymentMethod === 'CASH') {
      const cashAccounts = await this.prisma.cashAccount.findMany({ where: { tenantId: req.user.tenantId, isActive: true }, take: 1 });
      if (cashAccounts.length > 0) {
        await this.prisma.cashTransaction.create({
          data: {
            tenantId: req.user.tenantId,
            cashAccountId: cashAccounts[0].id,
            transDate: new Date(body.receiptDate),
            transType: 'CREDIT',
            description: `Receipt from ${body.customerCode}`,
            amount: body.amount,
            reference: body.receiptNo,
            status: 'POSTED',
          },
        });
        await this.prisma.cashAccount.update({
          where: { id: cashAccounts[0].id },
          data: { balance: { increment: body.amount } },
        });
      }
    } else if (body.paymentMethod === 'BANK_TRANSFER') {
      const bankAccounts = await this.prisma.bankAccount.findMany({ where: { tenantId: req.user.tenantId, isActive: true }, take: 1 });
      if (bankAccounts.length > 0) {
        await this.prisma.bankTransaction.create({
          data: {
            tenantId: req.user.tenantId,
            bankAccountId: bankAccounts[0].id,
            transDate: new Date(body.receiptDate),
            transType: 'CREDIT',
            description: `Receipt from ${body.customerCode}`,
            amount: body.amount,
            reference: body.receiptNo,
            status: 'POSTED',
          },
        });
        await this.prisma.bankAccount.update({
          where: { id: bankAccounts[0].id },
          data: { balance: { increment: body.amount } },
        });
      }
    }

    // AR INTEGRATION: Update Customer Invoice
    if (body.reference) {
       // Support exact matches or extracted matches (e.g. INV-123 from AR-INV-123)
       const matchingInvoices = await this.prisma.customerInvoice.findMany({
          where: { 
             tenantId: req.user.tenantId,
             invoiceNo: { contains: body.reference } 
          }
       });

       // Also try reverse search if body.reference is larger (AR-1234 but invoice is just 1234)
       // For speed, let's just pick the first match we strictly find if reference is passed.
       let targetInv = matchingInvoices.find(x => body.reference!.includes(x.invoiceNo) || x.invoiceNo.includes(body.reference!));
       
       if (!targetInv && matchingInvoices.length > 0) {
           targetInv = matchingInvoices[0];
       }

       if (targetInv) {
          const newPaid = Number(targetInv.paidAmount) + Number(body.amount);
          const total = Number(targetInv.totalAmount);
          const newStatus = newPaid >= total ? 'PAID' : (newPaid > 0 ? 'PARTIAL' : targetInv.status);

          await this.prisma.customerInvoice.update({
             where: { id: targetInv.id },
             data: { 
                paidAmount: newPaid,
                status: newStatus 
             }
          });

          // Record payment line
          await this.prisma.customerInvoicePayment.create({
              data: {
                  tenantId: req.user.tenantId,
                  invoiceId: targetInv.id,
                  paymentDate: new Date(body.receiptDate),
                  amount: body.amount,
                  reference: body.receiptNo,
                  notes: body.notes
              }
          });
       }
    }

    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'CREATE', entity: 'CustomerReceipt', entityId: receipt.id, metadata: { receipt } });

    const user = req.user;
    const amount = body.amount;
    let assetCode = '111-002';
    if (body.paymentMethod === 'BANK_TRANSFER') {
      const bankAcct = await this.prisma.bankAccount.findFirst({ where: { tenantId: user.tenantId, isActive: true }, include: { coaAccount: true } });
      assetCode = bankAcct?.coaAccount?.code || '111-101';
    }
    const arCode = await this.prisma.coaAccount.findFirst({ where: { tenantId: user.tenantId, code: { startsWith: '130' } } });
    const arAccountCode = arCode?.code || '130-000';

    const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId } });
    const entryNo = `JE-CR-${String(journalCount + 1).padStart(6, '0')}`;

    await this.prisma.journalEntry.create({
      data: {
        tenantId: user.tenantId,
        entryNo,
        entryDate: new Date(body.receiptDate),
        description: `Customer Receipt - ${body.customerCode}`,
        referenceNo: body.receiptNo,
        journalType: 'CUSTOMER_RECEIPT',
        totalDebit: amount,
        totalCredit: amount,
        status: 'POSTED',
        lines: {
          create: [
            {
              tenantId: user.tenantId,
              lineNo: 1,
              accountCode: assetCode,
              description: body.paymentMethod === 'CASH' ? 'Kas' : 'Bank',
              debit: amount,
              credit: 0,
              referenceType: 'CustomerReceipt',
              referenceId: receipt.id
            },
            {
              tenantId: user.tenantId,
              lineNo: 2,
              accountCode: arAccountCode,
              description: `Piutang ${body.customerCode}`,
              debit: 0,
              credit: amount,
              referenceType: 'CustomerReceipt',
              referenceId: receipt.id
            }
          ]
        }
      }
    });

    return { receipt };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.customerReceipt.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.customerReceipt.deleteMany({ where: { id, tenantId: req.user.tenantId } });
    await this.audit.log({ tenantId: req.user.tenantId, actorUserId: req.user.id, action: 'DELETE', entity: 'CustomerReceipt', entityId: id, metadata: { id } });
    return { success: true };
  }
}