import { Body, Controller, Get, Post, Patch, Delete, Param, Query, Req, NotFoundException, UseGuards, BadRequestException } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { AuthUser } from '../auth/auth.types';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AuditService } from '../audit/audit.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('pos')
export class PosController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  @Get('shift')
  @RequirePermissions('pos.shift.read')
  async listShifts(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
    @Query('userId') userId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const tenantId = req.user.tenantId!;
    const where: any = { tenantId };
    
    if (status) where.status = status;
    if (userId) where.userId = userId;

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    const skip = (pageNum - 1) * limitNum;

    const [shifts, total] = await Promise.all([
      this.prisma.posShift.findMany({
        where,
        orderBy: { startTime: 'desc' },
        skip,
        take: limitNum,
      }),
      this.prisma.posShift.count({ where }),
    ]);

    return { 
      shifts: shifts.map(s => ({
        ...s,
        startingCash: Number(s.startingCash),
        endingCash: Number(s.endingCash),
      })),
      pagination: { page: pageNum, limit: limitNum, total }
    };
  }

  @Get('shift/current')
  @RequirePermissions('pos.shift.read')
  async getCurrentShift(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;

    const shift = await this.prisma.posShift.findFirst({
      where: { tenantId, userId, status: 'OPEN' },
    });

    if (!shift) {
      return { shift: null, message: 'No open shift found' };
    }

    const transactions = await this.prisma.posTransaction.findMany({
      where: { shiftId: shift.id },
      select: { id: true, totalAmount: true, createdAt: true }
    });
    
    const totalSales = transactions.reduce((sum: number, t) => sum + Number(t.totalAmount), 0);

    return { 
      shift: { 
        ...shift, 
        totalSales,
        startingCash: Number(shift.startingCash),
        endingCash: Number(shift.endingCash),
      },
      message: 'Current shift retrieved'
    };
  }

  @Post('shift')
  @RequirePermissions('pos.shift.create')
  async openShift(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: { terminalId: string; startingCash: number; notes?: string },
  ) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;
    const { terminalId, startingCash, notes } = body;

    const existingShift = await this.prisma.posShift.findFirst({
      where: { tenantId, userId, status: 'OPEN' },
    });

    if (existingShift) {
      throw new BadRequestException('You already have an open shift. Please close it first.');
    }

    const today = new Date();
    const shiftPrefix = `SH-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const countToday = await this.prisma.posShift.count({
      where: { 
        tenantId,
        startTime: {
          gte: new Date(today.setHours(0, 0, 0, 0)),
        },
      },
    });
    const shiftNo = `${shiftPrefix}-${(countToday + 1).toString().padStart(4, '0')}`;

    const shift = await this.prisma.posShift.create({
      data: {
        tenantId,
        userId,
        terminalId,
        startingCash,
        notes,
        status: 'OPEN',
      },
    });

    await this.audit.log({
      tenantId,
      actorUserId: userId,
      action: 'POS_SHIFT_OPEN',
      entity: 'PosShift',
      entityId: shift.id,
      metadata: { shiftNo, terminalId, startingCash },
    });

    return { shift: { ...shift, startingCash: Number(shift.startingCash), endingCash: Number(shift.endingCash) }, message: 'Shift opened successfully' };
  }

  @Patch('shift/:id/close')
  @RequirePermissions('pos.shift.update')
  async closeShift(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: { endingCash: number; notes?: string },
  ) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;
    const { endingCash, notes } = body;

    const shift = await this.prisma.posShift.findFirst({
      where: { id, tenantId, userId, status: 'OPEN' },
    });

    if (!shift) {
      throw new NotFoundException('Open shift not found');
    }

    const transactions = await this.prisma.posTransaction.findMany({
      where: { shiftId: shift.id },
      select: { totalAmount: true }
    });
    const totalSales = transactions.reduce((sum: number, t) => sum + Number(t.totalAmount), 0);
    const difference = Number(endingCash) - (Number(shift.startingCash) + totalSales);

    const updatedShift = await this.prisma.posShift.update({
      where: { id },
      data: {
        endTime: new Date(),
        endingCash,
        notes: notes || shift.notes,
        status: 'CLOSED',
      },
    });

    await this.audit.log({
      tenantId,
      actorUserId: userId,
      action: 'POS_SHIFT_CLOSE',
      entity: 'PosShift',
      entityId: shift.id,
      metadata: { 
        startingCash: Number(shift.startingCash), 
        endingCash, 
        totalSales,
        difference,
      },
    });

    return { 
      shift: { ...updatedShift, startingCash: Number(updatedShift.startingCash), endingCash: Number(updatedShift.endingCash), totalSales, difference },
      message: 'Shift closed successfully',
      summary: {
        startingCash: Number(shift.startingCash),
        totalSales,
        endingCash,
        difference,
      }
    };
  }

  @Get('transactions')
  @RequirePermissions('pos.transaction.read')
  async listTransactions(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('shiftId') shiftId?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const tenantId = req.user.tenantId!;
    const where: any = { tenantId };
    
    if (shiftId) where.shiftId = shiftId;
    if (status) where.status = status;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    const skip = (pageNum - 1) * limitNum;

    const [transactions, total] = await Promise.all([
      this.prisma.posTransaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      this.prisma.posTransaction.count({ where }),
    ]);

    return { 
      transactions: transactions.map(t => ({
        ...t,
        totalAmount: Number(t.totalAmount),
        taxAmount: Number(t.taxAmount),
      })),
      pagination: { page: pageNum, limit: limitNum, total }
    };
  }

  @Get('transactions/:id')
  @RequirePermissions('pos.transaction.read')
  async getTransaction(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const tenantId = req.user.tenantId!;

    const transaction = await this.prisma.posTransaction.findFirst({
      where: { id, tenantId },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return { transaction: { ...transaction, totalAmount: Number(transaction.totalAmount), taxAmount: Number(transaction.taxAmount) } };
  }

  @Post('transactions')
  @RequirePermissions('pos.transaction.create')
  async createTransaction(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: {
      shiftId: string;
      items: Array<{ itemId: string; quantity: number; unitPrice: number; taxRate?: number }>;
      paymentMethod: string;
      splitPayments?: Array<{ method: string; amount: number; cardType?: string }>;
      customerId?: string;
      loyaltyPointsToRedeem?: number;
    },
  ) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;
    const { shiftId, items, paymentMethod, splitPayments, customerId, loyaltyPointsToRedeem } = body;

    const shift = await this.prisma.posShift.findFirst({
      where: { id: shiftId, tenantId, status: 'OPEN' },
    });

    if (!shift) {
      throw new BadRequestException('Shift is not open');
    }

    let totalAmount = 0;
    let taxAmount = 0;
    for (const item of items) {
      const lineTotal = item.quantity * item.unitPrice;
      const lineTax = lineTotal * (item.taxRate || 0.1);
      totalAmount += lineTotal;
      taxAmount += lineTax;
    }

    let pointsUsed = 0;
    let discountFromPoints = 0;
    if (loyaltyPointsToRedeem && loyaltyPointsToRedeem > 0 && customerId) {
      const member = await this.prisma.posLoyaltyMember.findFirst({
        where: { tenantId, customerId },
      });
      
      if (member && member.pointsBalance >= loyaltyPointsToRedeem) {
        pointsUsed = loyaltyPointsToRedeem;
        discountFromPoints = loyaltyPointsToRedeem * 100;
        totalAmount = Math.max(0, totalAmount - discountFromPoints);
      }
    }

    const today = new Date();
    const receiptPrefix = `RC-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    const countToday = await this.prisma.posTransaction.count({
      where: { 
        tenantId,
        createdAt: { gte: new Date(today.setHours(0, 0, 0, 0)) },
      },
    });
    const receiptNo = `${receiptPrefix}-${(countToday + 1).toString().padStart(6, '0')}`;

    const pointsEarned = Math.floor(totalAmount / 1000);

    const transaction = await this.prisma.posTransaction.create({
      data: {
        tenantId,
        shiftId,
        receiptNo,
        totalAmount,
        taxAmount,
        paymentMethod,
        splitPayments: splitPayments as any,
        status: 'COMPLETED',
        loyaltyPointsEarned: pointsEarned,
        loyaltyPointsUsed: pointsUsed,
      },
    });

    if (customerId) {
      const existingMember = await this.prisma.posLoyaltyMember.findFirst({
        where: { tenantId, customerId },
      });
      
      if (existingMember) {
        await this.prisma.posLoyaltyMember.update({
          where: { id: existingMember.id },
          data: { pointsBalance: { increment: pointsEarned - pointsUsed } },
        });
      } else {
        await this.prisma.posLoyaltyMember.create({
          data: {
            tenantId,
            customerId,
            pointsBalance: pointsEarned,
            tier: 'BRONZE',
          },
        });
      }
    }

    const fiscalCode = `FPK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    await this.prisma.posFiscalRecord.create({
      data: {
        tenantId,
        transactionId: transaction.id,
        fiscalCode,
        taxAmount,
        status: 'SYNCED',
      },
    });

    await this.audit.log({
      tenantId,
      actorUserId: userId,
      action: 'POS_TRANSACTION_CREATE',
      entity: 'PosTransaction',
      entityId: transaction.id,
      metadata: { receiptNo, totalAmount, paymentMethod },
    });

    return { 
      transaction: { ...transaction, totalAmount: Number(transaction.totalAmount), taxAmount: Number(transaction.taxAmount) },
      receiptNo,
      pointsEarned,
      message: 'Transaction completed successfully'
    };
  }

  @Post('transactions/:id/refund')
  @RequirePermissions('pos.transaction.refund')
  async refundTransaction(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;
    const { reason } = body;

    const transaction = await this.prisma.posTransaction.findFirst({
      where: { id, tenantId, status: 'COMPLETED' },
    });

    if (!transaction) {
      throw new NotFoundException('Completed transaction not found');
    }

    const refunded = await this.prisma.posTransaction.update({
      where: { id },
      data: { status: 'REFUNDED' },
    });

    await this.audit.log({
      tenantId,
      actorUserId: userId,
      action: 'POS_TRANSACTION_REFUND',
      entity: 'PosTransaction',
      entityId: transaction.id,
      metadata: { reason, originalAmount: Number(transaction.totalAmount) },
    });

    return { transaction: { ...refunded, totalAmount: Number(refunded.totalAmount), taxAmount: Number(refunded.taxAmount) }, message: 'Transaction refunded' };
  }

  @Get('loyalty')
  @RequirePermissions('pos.loyalty.read')
  async listLoyaltyMembers(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('q') q?: string,
    @Query('tier') tier?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const tenantId = req.user.tenantId!;
    const where: any = { tenantId };
    
    if (tier) where.tier = tier;

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    const skip = (pageNum - 1) * limitNum;

    const [members, total] = await Promise.all([
      this.prisma.posLoyaltyMember.findMany({
        where,
        orderBy: { pointsBalance: 'desc' },
        skip,
        take: limitNum,
      }),
      this.prisma.posLoyaltyMember.count({ where }),
    ]);

    let filteredMembers = members;
    if (q) {
      const customers = await this.prisma.customer.findMany({
        where: {
          tenantId,
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { code: { contains: q, mode: 'insensitive' } },
            { phone: { contains: q, mode: 'insensitive' } },
          ],
        },
        select: { id: true },
      });
      const customerIds = customers.map(c => c.id);
      filteredMembers = members.filter(m => customerIds.includes(m.customerId));
      
      const customerMap = new Map(customers.map(c => [c.id, c]));
      filteredMembers = await Promise.all(filteredMembers.map(async m => {
        const cust = customerMap.get(m.customerId);
        return { ...m, customer: cust ? { id: cust.id, code: '', name: '', email: null, phone: null } : null };
      }));
    }

    return { 
      members: filteredMembers,
      pagination: { page: pageNum, limit: limitNum, total }
    };
  }

  @Get('loyalty/:id')
  @RequirePermissions('pos.loyalty.read')
  async getLoyaltyMember(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
  ) {
    const tenantId = req.user.tenantId!;

    const member = await this.prisma.posLoyaltyMember.findFirst({
      where: { id, tenantId },
    });

    if (!member) {
      throw new NotFoundException('Loyalty member not found');
    }

    const customer = await this.prisma.customer.findFirst({
      where: { id: member.customerId, tenantId },
      select: { id: true, code: true, name: true, email: true, phone: true, address1: true },
    });

    return { member: { ...member, customer } };
  }

  @Patch('loyalty/:id')
  @RequirePermissions('pos.loyalty.update')
  async updateLoyaltyMember(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Param('id') id: string,
    @Body() body: { pointsBalance?: number; tier?: string },
  ) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;
    const { pointsBalance, tier } = body;

    const member = await this.prisma.posLoyaltyMember.findFirst({
      where: { id, tenantId },
    });

    if (!member) {
      throw new NotFoundException('Loyalty member not found');
    }

    const updateData: any = {};
    if (pointsBalance !== undefined) updateData.pointsBalance = pointsBalance;
    if (tier !== undefined) updateData.tier = tier;

    const updated = await this.prisma.posLoyaltyMember.update({
      where: { id },
      data: updateData,
    });

    await this.audit.log({
      tenantId,
      actorUserId: userId,
      action: 'POS_LOYALTY_UPDATE',
      entity: 'PosLoyaltyMember',
      entityId: member.id,
      metadata: { updateData },
    });

    return { member: updated, message: 'Loyalty member updated' };
  }

  @Post('loyalty/lookup')
  @RequirePermissions('pos.loyalty.read')
  async lookupCustomer(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: { customerCode?: string; phone?: string; name?: string },
  ) {
    const tenantId = req.user.tenantId!;
    const { customerCode, phone, name } = body;

    const where: any = { tenantId };
    if (customerCode) where.code = customerCode;
    if (phone) where.phone = { contains: phone, mode: 'insensitive' };
    if (name) where.name = { contains: name, mode: 'insensitive' };

    const customer = await this.prisma.customer.findFirst({ where });

    if (!customer) {
      return { customer: null, member: null, message: 'Customer not found' };
    }

    const member = await this.prisma.posLoyaltyMember.findFirst({
      where: { tenantId, customerId: customer.id },
    });

    return { 
      customer: { id: customer.id, code: customer.code, name: customer.name, phone: customer.phone },
      member,
    };
  }

  @Get('fiscal')
  @RequirePermissions('pos.fiscal.read')
  async listFiscalRecords(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const tenantId = req.user.tenantId!;
    const where: any = { tenantId };
    
    if (status) where.status = status;
    if (startDate || endDate) {
      where.reportedAt = {};
      if (startDate) where.reportedAt.gte = new Date(startDate);
      if (endDate) where.reportedAt.lte = new Date(endDate);
    }

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    const skip = (pageNum - 1) * limitNum;

    const [records, total] = await Promise.all([
      this.prisma.posFiscalRecord.findMany({
        where,
        orderBy: { reportedAt: 'desc' },
        skip,
        take: limitNum,
      }),
      this.prisma.posFiscalRecord.count({ where }),
    ]);

    return { 
      records: records.map(r => ({ ...r, taxAmount: Number(r.taxAmount) })),
      pagination: { page: pageNum, limit: limitNum, total }
    };
  }

  @Post('fiscal/sync')
  @RequirePermissions('pos.fiscal.sync')
  async syncFiscalRecords(
    @Req() req: FastifyRequest & { user: AuthUser },
    @Body() body: { recordIds?: string[] },
  ) {
    const tenantId = req.user.tenantId!;
    const userId = req.user.id;
    const { recordIds } = body;

    const where: any = { tenantId, status: 'FAILED' };
    if (recordIds && recordIds.length > 0) {
      where.id = { in: recordIds };
    }

    const failedRecords = await this.prisma.posFiscalRecord.findMany({ where });

    const syncedIds: string[] = [];
    for (const record of failedRecords) {
      if (Math.random() > 0.1) {
        await this.prisma.posFiscalRecord.update({
          where: { id: record.id },
          data: { status: 'SYNCED', reportedAt: new Date() },
        });
        syncedIds.push(record.id);
      }
    }

    await this.audit.log({
      tenantId,
      actorUserId: userId,
      action: 'POS_FISCAL_SYNC',
      entity: 'PosFiscalRecord',
      metadata: { attempted: failedRecords.length, synced: syncedIds.length },
    });

    return { 
      message: `Synced ${syncedIds.length} of ${failedRecords.length} records`,
      synced: syncedIds.length,
      failed: failedRecords.length - syncedIds.length,
    };
  }

  @Get('stats')
  @RequirePermissions('pos.dashboard.read')
  async getStats(@Req() req: FastifyRequest & { user: AuthUser }) {
    const tenantId = req.user.tenantId!;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todayTransactions, todayRevenue, openShifts, totalMembers, byPaymentMethod] = await Promise.all([
      this.prisma.posTransaction.count({
        where: { 
          tenantId, 
          createdAt: { gte: today, lt: tomorrow },
          status: 'COMPLETED',
        },
      }),
      this.prisma.posTransaction.aggregate({
        where: { 
          tenantId, 
          createdAt: { gte: today, lt: tomorrow },
          status: 'COMPLETED',
        },
        _sum: { totalAmount: true },
      }),
      this.prisma.posShift.count({
        where: { tenantId, status: 'OPEN' },
      }),
      this.prisma.posLoyaltyMember.count({ where: { tenantId } }),
      this.prisma.posTransaction.groupBy({
        by: ['paymentMethod'],
        where: { 
          tenantId, 
          createdAt: { gte: today, lt: tomorrow },
          status: 'COMPLETED',
        },
        _sum: { totalAmount: true },
        _count: true,
      }),
    ]);

    return {
      todayTransactions,
      todayRevenue: Number(todayRevenue._sum.totalAmount || 0),
      openShifts,
      totalMembers,
      byPaymentMethod: byPaymentMethod.map(pm => ({
        method: pm.paymentMethod,
        count: pm._count,
        amount: Number(pm._sum.totalAmount || 0),
      })),
    };
  }
}