import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import type { TripCostType } from '../../../prisma/generated/client';
export declare class CreateTripCostDto {
    tripPlanId: string;
    costType: TripCostType;
    description?: string;
    amount: number;
    currencyCode?: string;
    supplierId?: string;
    notes?: string;
}
export declare class UpdateTripCostDto {
    costType?: TripCostType;
    description?: string;
    amount?: number;
    notes?: string;
}
export declare class CostingController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, tripPlanId?: string, status?: string, costType?: string): Promise<{
        costs: ({
            supplier: {
                bankAccount: string | null;
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                npwp: string | null;
                phone: string | null;
                address1: string | null;
                address2: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                countryCode: string | null;
                updatedAt: Date;
                code: string;
                bankName: string | null;
                paymentTerms: string | null;
                vendorGroup: string | null;
            } | null;
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            journalEntryId: string | null;
            status: import("prisma/generated").$Enums.TripCostStatus;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            tripPlanId: string;
            supplierId: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            costType: import("prisma/generated").$Enums.TripCostType;
            currencyCode: string;
            paymentRequestId: string | null;
            submittedBy: string | null;
            submittedAt: Date | null;
            postedToFinance: boolean;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        cost: {
            supplier: {
                bankAccount: string | null;
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                npwp: string | null;
                phone: string | null;
                address1: string | null;
                address2: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                countryCode: string | null;
                updatedAt: Date;
                code: string;
                bankName: string | null;
                paymentTerms: string | null;
                vendorGroup: string | null;
            } | null;
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            journalEntryId: string | null;
            status: import("prisma/generated").$Enums.TripCostStatus;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            tripPlanId: string;
            supplierId: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            costType: import("prisma/generated").$Enums.TripCostType;
            currencyCode: string;
            paymentRequestId: string | null;
            submittedBy: string | null;
            submittedAt: Date | null;
            postedToFinance: boolean;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateTripCostDto): Promise<{
        cost: {
            supplier: {
                bankAccount: string | null;
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                npwp: string | null;
                phone: string | null;
                address1: string | null;
                address2: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                countryCode: string | null;
                updatedAt: Date;
                code: string;
                bankName: string | null;
                paymentTerms: string | null;
                vendorGroup: string | null;
            } | null;
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            journalEntryId: string | null;
            status: import("prisma/generated").$Enums.TripCostStatus;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            tripPlanId: string;
            supplierId: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            costType: import("prisma/generated").$Enums.TripCostType;
            currencyCode: string;
            paymentRequestId: string | null;
            submittedBy: string | null;
            submittedAt: Date | null;
            postedToFinance: boolean;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateTripCostDto): Promise<{
        cost: {
            supplier: {
                bankAccount: string | null;
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                npwp: string | null;
                phone: string | null;
                address1: string | null;
                address2: string | null;
                city: string | null;
                province: string | null;
                postalCode: string | null;
                countryCode: string | null;
                updatedAt: Date;
                code: string;
                bankName: string | null;
                paymentTerms: string | null;
                vendorGroup: string | null;
            } | null;
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            journalEntryId: string | null;
            status: import("prisma/generated").$Enums.TripCostStatus;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            tripPlanId: string;
            supplierId: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            costType: import("prisma/generated").$Enums.TripCostType;
            currencyCode: string;
            paymentRequestId: string | null;
            submittedBy: string | null;
            submittedAt: Date | null;
            postedToFinance: boolean;
        };
    }>;
    submit(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        cost: {
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            journalEntryId: string | null;
            status: import("prisma/generated").$Enums.TripCostStatus;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            tripPlanId: string;
            supplierId: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            costType: import("prisma/generated").$Enums.TripCostType;
            currencyCode: string;
            paymentRequestId: string | null;
            submittedBy: string | null;
            submittedAt: Date | null;
            postedToFinance: boolean;
        };
    }>;
    approve(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        cost: {
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            journalEntryId: string | null;
            status: import("prisma/generated").$Enums.TripCostStatus;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            tripPlanId: string;
            supplierId: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            costType: import("prisma/generated").$Enums.TripCostType;
            currencyCode: string;
            paymentRequestId: string | null;
            submittedBy: string | null;
            submittedAt: Date | null;
            postedToFinance: boolean;
        };
    }>;
    post(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        cost: {
            tripPlan: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TripPlanStatus;
                notes: string | null;
                routeDate: Date;
                vehicleId: string | null;
                driverId: string | null;
                routeTemplateId: string | null;
                departureAt: Date | null;
                returnAt: Date | null;
                actualDepartureAt: Date | null;
                actualReturnAt: Date | null;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            journalEntryId: string | null;
            status: import("prisma/generated").$Enums.TripCostStatus;
            notes: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            tripPlanId: string;
            supplierId: string | null;
            approvedBy: string | null;
            approvedAt: Date | null;
            costType: import("prisma/generated").$Enums.TripCostType;
            currencyCode: string;
            paymentRequestId: string | null;
            submittedBy: string | null;
            submittedAt: Date | null;
            postedToFinance: boolean;
        };
    }>;
}
