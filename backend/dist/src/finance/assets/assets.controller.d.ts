import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AssetsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        assets: ({
            depreciationEntries: {
                id: string;
                tenantId: string;
                createdAt: Date;
                notes: string | null;
                assetId: string;
                periodDate: Date;
                depreciationAmount: import("@prisma/client-runtime-utils").Decimal;
                accumulatedAmount: import("@prisma/client-runtime-utils").Decimal;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            category: string;
            purchaseDate: Date;
            assetNo: string;
            purchaseCost: import("@prisma/client-runtime-utils").Decimal;
            usefulLife: number;
            salvageValue: import("@prisma/client-runtime-utils").Decimal;
            depreciationMethod: string;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        asset: ({
            depreciationEntries: {
                id: string;
                tenantId: string;
                createdAt: Date;
                notes: string | null;
                assetId: string;
                periodDate: Date;
                depreciationAmount: import("@prisma/client-runtime-utils").Decimal;
                accumulatedAmount: import("@prisma/client-runtime-utils").Decimal;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            category: string;
            purchaseDate: Date;
            assetNo: string;
            purchaseCost: import("@prisma/client-runtime-utils").Decimal;
            usefulLife: number;
            salvageValue: import("@prisma/client-runtime-utils").Decimal;
            depreciationMethod: string;
        }) | null;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        assetNo: string;
        name: string;
        category: string;
        purchaseDate: string;
        purchaseCost: number;
        usefulLife: number;
        salvageValue?: number;
        depreciationMethod?: string;
    }): Promise<{
        asset: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            category: string;
            purchaseDate: Date;
            assetNo: string;
            purchaseCost: import("@prisma/client-runtime-utils").Decimal;
            usefulLife: number;
            salvageValue: import("@prisma/client-runtime-utils").Decimal;
            depreciationMethod: string;
        };
    }>;
    addDepreciation(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        periodDate: string;
        depreciationAmount: number;
        notes?: string;
    }): Promise<{
        depreciation: {
            id: string;
            tenantId: string;
            createdAt: Date;
            notes: string | null;
            assetId: string;
            periodDate: Date;
            depreciationAmount: import("@prisma/client-runtime-utils").Decimal;
            accumulatedAmount: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
}
