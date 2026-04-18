import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CashController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        accounts: ({
            transactions: {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string;
                status: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                reference: string | null;
                transDate: Date;
                transType: string;
                cashAccountId: string;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            accountNo: string;
            accountType: string;
            balance: import("@prisma/client-runtime-utils").Decimal;
            coaAccountId: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        account: ({
            transactions: {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string;
                status: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                reference: string | null;
                transDate: Date;
                transType: string;
                cashAccountId: string;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            accountNo: string;
            accountType: string;
            balance: import("@prisma/client-runtime-utils").Decimal;
            coaAccountId: string | null;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        accountNo: string;
        name: string;
        accountType?: string;
    }): Promise<{
        account: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            accountNo: string;
            accountType: string;
            balance: import("@prisma/client-runtime-utils").Decimal;
            coaAccountId: string | null;
        };
    }>;
    addTransaction(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        transDate: string;
        transType: string;
        description: string;
        amount: number;
        reference?: string;
    }): Promise<{
        transaction: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            status: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            reference: string | null;
            transDate: Date;
            transType: string;
            cashAccountId: string;
        };
    }>;
}
