import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateMaterialRequestDto {
    code: string;
    projectId: string;
    wbsTaskId?: string;
    requestDate: string;
    priority?: string;
    notes?: string;
    status?: string;
    items: {
        itemId?: string;
        description: string;
        quantity: number;
        uomCode?: string;
        requiredDate?: string;
        notes?: string;
    }[];
}
export declare class MaterialRequestController {
    private prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, projectId?: string, status?: string, q?: string): Promise<{
        data: ({
            project: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                description: string | null;
                updatedAt: Date;
                code: string;
                startDate: Date | null;
                endDate: Date | null;
                status: string;
                customerId: string | null;
                contractId: string | null;
                totalBudget: import("@prisma/client-runtime-utils").Decimal | null;
                retentionRate: import("@prisma/client-runtime-utils").Decimal | null;
                downPaymentTotal: import("@prisma/client-runtime-utils").Decimal | null;
                dpRecoveryRate: import("@prisma/client-runtime-utils").Decimal | null;
                billingType: string;
            };
            wbsTask: {
                id: string;
                tenantId: string;
                createdAt: Date;
                description: string | null;
                priority: string;
                startDate: Date | null;
                endDate: Date | null;
                status: string;
                actualCost: import("@prisma/client-runtime-utils").Decimal | null;
                projectId: string;
                teamId: string | null;
                level: number;
                taskCode: string;
                taskName: string;
                parentTaskId: string | null;
                assigneeId: string | null;
                plannedWeight: number;
                plannedCost: import("@prisma/client-runtime-utils").Decimal | null;
                actualProgress: number | null;
                taskType: string;
                tags: string | null;
                categoryId: string | null;
            } | null;
            items: ({
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
            } & {
                id: string;
                tenantId: string;
                description: string;
                notes: string | null;
                uomCode: string | null;
                itemId: string | null;
                requiredDate: Date | null;
                requestId: string;
                quantity: import("@prisma/client-runtime-utils").Decimal;
            })[];
            requestedBy: {
                id: string;
                email: string;
                name: string | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            code: string;
            status: string;
            notes: string | null;
            requestDate: Date;
            projectId: string;
            wbsTaskId: string | null;
            requestedById: string;
        })[];
    }>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        total: number;
        pending: number;
        approved: number;
        itemCount: number;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateMaterialRequestDto): Promise<{
        items: {
            id: string;
            tenantId: string;
            description: string;
            notes: string | null;
            uomCode: string | null;
            itemId: string | null;
            requiredDate: Date | null;
            requestId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        priority: string;
        updatedAt: Date;
        code: string;
        status: string;
        notes: string | null;
        requestDate: Date;
        projectId: string;
        wbsTaskId: string | null;
        requestedById: string;
    }>;
    update(id: string, body: Partial<CreateMaterialRequestDto>, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        items: {
            id: string;
            tenantId: string;
            description: string;
            notes: string | null;
            uomCode: string | null;
            itemId: string | null;
            requiredDate: Date | null;
            requestId: string;
            quantity: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        priority: string;
        updatedAt: Date;
        code: string;
        status: string;
        notes: string | null;
        requestDate: Date;
        projectId: string;
        wbsTaskId: string | null;
        requestedById: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
