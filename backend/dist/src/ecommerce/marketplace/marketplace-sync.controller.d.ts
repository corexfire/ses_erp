import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from '../../auth/auth.types';
export declare class MarketplaceSyncController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHistory(req: FastifyRequest & {
        user: AuthUser;
    }, channelId?: string, status?: string, limit?: number): Promise<{
        logs: ({
            channel: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: string;
                iconUrl: string | null;
                apiEndpoint: string | null;
                clientId: string | null;
                clientSecret: string | null;
            };
            listing: {
                id: string;
                tenantId: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                notes: string | null;
                itemId: string | null;
                channelId: string;
                marketplaceProductId: string | null;
                productSku: string;
                productName: string;
                marketplaceUrl: string | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                stockQty: number;
                syncStock: boolean;
                syncPrice: boolean;
                syncStatus: string;
                lastSyncAt: Date | null;
                lastSyncError: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            status: string;
            details: string | null;
            message: string | null;
            channelId: string;
            listingId: string;
            syncType: string;
        })[];
    }>;
    getQueue(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        queue: ({
            channel: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: string;
                iconUrl: string | null;
                apiEndpoint: string | null;
                clientId: string | null;
                clientSecret: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            itemId: string | null;
            channelId: string;
            marketplaceProductId: string | null;
            productSku: string;
            productName: string;
            marketplaceUrl: string | null;
            sellingPrice: import("@prisma/client-runtime-utils").Decimal;
            stockQty: number;
            syncStock: boolean;
            syncPrice: boolean;
            syncStatus: string;
            lastSyncAt: Date | null;
            lastSyncError: string | null;
        })[];
    }>;
    syncInventory(req: FastifyRequest & {
        user: AuthUser;
    }, listingId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    syncPrice(req: FastifyRequest & {
        user: AuthUser;
    }, listingId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    fullSync(req: FastifyRequest & {
        user: AuthUser;
    }, listingId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
