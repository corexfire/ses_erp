import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
export declare class CurrenciesController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listCurrencies(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        currencies: {
            symbol: string | null;
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            isBase: boolean;
        }[];
    }>;
    createCurrency(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCurrencyDto): Promise<{
        currency: {
            symbol: string | null;
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            isBase: boolean;
        };
    }>;
    deactivateCurrency(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        currency: {
            symbol: string | null;
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            isBase: boolean;
        };
    }>;
    listRates(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        exchangeRates: ({
            baseCurrency: {
                symbol: string | null;
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                isBase: boolean;
            };
            quoteCurrency: {
                symbol: string | null;
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                isBase: boolean;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            baseCurrencyId: string;
            quoteCurrencyId: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            rateDate: Date;
        })[];
    }>;
    createRate(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateExchangeRateDto): Promise<{
        exchangeRate: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            baseCurrencyId: string;
            quoteCurrencyId: string;
            rate: import("@prisma/client-runtime-utils").Decimal;
            rateDate: Date;
        };
    }>;
}
