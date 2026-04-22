import { Controller, Get, Post, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import type { AuthUser } from '../../auth/auth.types';
import { RequirePermissions } from '../../auth/permissions.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('finance/vendor-payment')
export class VendorPaymentController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @RequirePermissions('finance.vendorPayment.read')
  async list(@Req() req: FastifyRequest & { user: AuthUser }, @Query('status') status?: string) {
    const where: any = { tenantId: req.user.tenantId! };
    if (status) where.status = status;

    const payments = await this.prisma.vendorPayment.findMany({
      where,
      include: {
        supplier: true,
        invoice: true
      },
      orderBy: { paymentDate: 'desc' },
    });
    return { payments };
  }

  @Get(':id')
  @RequirePermissions('finance.vendorPayment.read')
  async get(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    const payment = await this.prisma.vendorPayment.findFirst({
      where: { id, tenantId: req.user.tenantId! },
    });
    return { payment };
  }

  @Post()
  @RequirePermissions('finance.vendorPayment.create')
  async create(@Req() req: FastifyRequest & { user: AuthUser }, @Body() body: { paymentNo: string; paymentDate: string; supplierId: string; amount: number; paymentMethod: string; reference?: string; notes?: string; invoiceId?: string }) {
    // Fetch supplier to get the code for descriptions
    const supplier = await this.prisma.supplier.findFirst({ where: { id: body.supplierId, tenantId: req.user.tenantId! } });
    const supplierCode = supplier?.code || 'N/A';

    const payment = await this.prisma.vendorPayment.create({
      data: {
        tenantId: req.user.tenantId!,
        paymentNo: body.paymentNo,
        paymentDate: new Date(body.paymentDate),
        supplierId: body.supplierId,
        invoiceId: body.invoiceId,
        amount: body.amount,
        paymentMethod: body.paymentMethod,
        reference: body.reference,
        notes: body.notes,
        status: 'POSTED',
      },
    });

    // Create cash/bank transaction based on payment method
    if (body.paymentMethod === 'CASH') {
      const cashAccounts = await this.prisma.cashAccount.findMany({ where: { tenantId: req.user.tenantId!, isActive: true }, take: 1 });
      if (cashAccounts.length > 0) {
        await this.prisma.cashTransaction.create({
          data: {
            tenantId: req.user.tenantId!,
            cashAccountId: cashAccounts[0].id,
            transDate: new Date(body.paymentDate),
            transType: 'DEBIT',
            description: `Payment to ${supplierCode}`,
            amount: body.amount,
            reference: body.paymentNo,
            status: 'POSTED',
          },
        });
        await this.prisma.cashAccount.update({
          where: { id: cashAccounts[0].id },
          data: { balance: { decrement: body.amount } },
        });
      }
    } else if (body.paymentMethod === 'BANK_TRANSFER') {
      const bankAccounts = await this.prisma.bankAccount.findMany({ where: { tenantId: req.user.tenantId!, isActive: true }, take: 1 });
      if (bankAccounts.length > 0) {
        await this.prisma.bankTransaction.create({
          data: {
            tenantId: req.user.tenantId!,
            bankAccountId: bankAccounts[0].id,
            transDate: new Date(body.paymentDate),
            transType: 'DEBIT',
            description: `Payment to ${supplierCode}`,
            amount: body.amount,
            reference: body.paymentNo,
            status: 'POSTED',
          },
        });
        await this.prisma.bankAccount.update({
          where: { id: bankAccounts[0].id },
          data: { balance: { decrement: body.amount } },
        });
      }
    }

    // AP INTEGRATION: Update Purchase Invoice
    if (body.reference) {
       const matchingInvoices = await this.prisma.purchaseInvoice.findMany({
          where: { 
             tenantId: req.user.tenantId!,
             code: { contains: body.reference } 
          }
       });

       let targetInv = matchingInvoices.find(x => body.reference!.includes(x.code) || x.code.includes(body.reference!));
       
       if (!targetInv && matchingInvoices.length > 0) {
           targetInv = matchingInvoices[0];
       }

       if (targetInv) {
          const newBalance = Number(targetInv.balanceDue) - Number(body.amount);
          const newStatus = newBalance <= 0 ? 'CLOSED' : targetInv.status;

          await this.prisma.purchaseInvoice.update({
             where: { id: targetInv.id },
             data: { 
                balanceDue: Math.max(0, newBalance),
                status: newStatus 
             }
          });
       }
    }

    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'CREATE', entity: 'VendorPayment', entityId: payment.id, metadata: { payment } });

    const user = req.user;
    const amount = body.amount;
    let assetCode = '111-002';
    if (body.paymentMethod === 'BANK_TRANSFER') {
      const bankAcct = await this.prisma.bankAccount.findFirst({ where: { tenantId: user.tenantId!, isActive: true }, include: { coaAccount: true } });
      assetCode = bankAcct?.coaAccount?.code || '111-101';
    }
    const apCode = await this.prisma.coaAccount.findFirst({ where: { tenantId: user.tenantId!, code: { startsWith: '210' } } });
    const apAccountCode = apCode?.code || '210-000';

    const journalCount = await this.prisma.journalEntry.count({ where: { tenantId: user.tenantId! } });
    const entryNo = `JE-VP-${String(journalCount + 1).padStart(6, '0')}`;

    await this.prisma.journalEntry.create({
      data: {
        tenantId: user.tenantId!,
        entryNo,
        entryDate: new Date(body.paymentDate),
        description: `Vendor Payment - ${supplierCode}`,
        referenceNo: body.paymentNo,
        journalType: 'VENDOR_PAYMENT',
        totalDebit: amount,
        totalCredit: amount,
        status: 'POSTED',
        lines: {
          create: [
            {
              tenantId: user.tenantId!,
              lineNo: 1,
              accountCode: apAccountCode,
              description: `Hutang ${supplierCode}`,
              debit: amount,
              credit: 0,
              referenceId: payment.id
            },
            {
              tenantId: user.tenantId!,
              lineNo: 2,
              accountCode: assetCode,
              description: body.paymentMethod === 'CASH' ? 'Kas' : 'Bank',
              debit: 0,
              credit: amount,
              referenceId: payment.id
            }
          ]
        }
      }
    });

    return { payment };
  }

  @Post(':id/delete')
  @RequirePermissions('finance.vendorPayment.delete')
  async delete(@Req() req: FastifyRequest & { user: AuthUser }, @Param('id') id: string) {
    await this.prisma.vendorPayment.deleteMany({ where: { id, tenantId: req.user.tenantId! } });
    await this.audit.log({ tenantId: req.user.tenantId!, actorUserId: req.user.id, action: 'DELETE', entity: 'VendorPayment', entityId: id, metadata: { id } });
    return { success: true };
  }
}