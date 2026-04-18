import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ReportsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generalLedger(req: FastifyRequest & {
        user: AuthUser;
    }, accountCode?: string, startDate?: string, endDate?: string): Promise<{
        generalLedger: unknown[];
        startDate: string;
        endDate: string;
    }>;
    balanceSheet(req: FastifyRequest & {
        user: AuthUser;
    }, asOfDate?: string): Promise<{
        balanceSheet: any;
        asOfDate: string;
    }>;
    profitLoss(req: FastifyRequest & {
        user: AuthUser;
    }, startDate?: string, endDate?: string): Promise<{
        profitLoss: any;
        startDate: string;
        endDate: string;
    }>;
    trialBalance(req: FastifyRequest & {
        user: AuthUser;
    }, asOfDate?: string): Promise<{
        trialBalance: {
            code: string;
            name: string;
            type: import("prisma/generated").$Enums.AccountType;
            debit: number;
            credit: number;
            balance: number;
        }[];
        totalDebit: number;
        totalCredit: number;
        asOfDate: string;
    }>;
    agingReport(req: FastifyRequest & {
        user: AuthUser;
    }, asOfDate?: string, type?: string): Promise<{
        agingData: any[];
        summary: any;
        asOfDate: string;
    }>;
}
