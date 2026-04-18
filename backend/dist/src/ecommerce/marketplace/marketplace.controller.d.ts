import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
export declare class MarketplaceController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, channelId?: string, status?: string): Promise<{
        listings: ({
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
    listChannels(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        channels: {
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
        }[];
    }>;
    getSyncLog(req: FastifyRequest & {
        user: AuthUser;
    }, listingId?: string): Promise<{
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
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        stats: {
            total: number;
            synced: number;
            pending: number;
            failed: number;
        };
        byChannel: {
            id: string;
            name: string;
            icon: string | null;
            totalListings: number;
            lastSync: Date | null;
            status: string;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        listing: {
            item: {
                id: string;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                itemGroupId: string | null;
                baseUomCode: string | null;
                trackingType: import("prisma/generated").$Enums.ItemTrackingType;
                valuationMethod: import("prisma/generated").$Enums.ValuationMethod;
                reorderPoint: import("@prisma/client-runtime-utils").Decimal | null;
                reorderQty: import("@prisma/client-runtime-utils").Decimal | null;
                isPurchaseItem: boolean;
                isSalesItem: boolean;
                purchaseTaxCodeId: string | null;
                salesTaxCodeId: string | null;
                brand: string | null;
                isSparePart: boolean;
                manufacturer: string | null;
                oemPartNumber: string | null;
            } | null;
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: {
        channelId: string;
        itemId?: string;
        productName: string;
        productSku: string;
        marketplaceProductId?: string;
        marketplaceUrl?: string;
        sellingPrice: number;
        stockQty: number;
        syncStock: boolean;
        syncPrice: boolean;
        notes?: string;
    }): Promise<{
        listing: {
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: {
        channelId?: string;
        productName?: string;
        productSku?: string;
        marketplaceProductId?: string;
        marketplaceUrl?: string;
        sellingPrice?: number;
        stockQty?: number;
        syncStock?: boolean;
        syncPrice?: boolean;
        notes?: string;
        isActive?: boolean;
    }): Promise<{
        listing: {
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
        };
    }>;
    sync(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        result: {
            success: boolean;
            message: string;
            timestamp: Date;
        };
    }>;
    syncAll(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        summary: {
            total: number;
            success: number;
            failed: number;
        };
        results: {
            listingId: string;
            success: boolean;
        }[];
    }>;
    delete(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
