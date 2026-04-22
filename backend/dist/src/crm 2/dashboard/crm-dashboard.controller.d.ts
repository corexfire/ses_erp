import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CrmDashboardController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    get(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        summary: {
            leadCount: number;
            customerCount: number;
            opportunityCount: number;
            activityOpenCount: number;
            activityOverdueCount: number;
            ticketOpenCount: number;
            ticketOverdueCount: number;
        };
        distributions: {
            opportunitiesByStage: {
                stage: import("prisma/generated").$Enums.OpportunityStage;
                count: number;
            }[];
            leadsByStatus: {
                status: import("prisma/generated").$Enums.LeadStatus;
                count: number;
            }[];
            ticketsByStatus: {
                status: import("prisma/generated").$Enums.TicketStatus;
                count: number;
            }[];
        };
        upcomingActivities: ({
            lead: {
                id: string;
                email: string | null;
                tenantId: string;
                name: string;
                createdAt: Date;
                phone: string | null;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.LeadStatus;
                notes: string | null;
                source: string | null;
                assignedToUserId: string | null;
            } | null;
            customer: {
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
                nik: string | null;
                taxAddress: string | null;
            } | null;
            opportunity: {
                id: string;
                tenantId: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
                customerId: string | null;
                notes: string | null;
                stage: import("prisma/generated").$Enums.OpportunityStage;
                closeDate: Date | null;
                leadId: string | null;
                ownerUserId: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            type: import("prisma/generated").$Enums.ActivityType;
            status: import("prisma/generated").$Enums.ActivityStatus;
            customerId: string | null;
            subject: string;
            assignedToId: string | null;
            notes: string | null;
            leadId: string | null;
            dueAt: Date | null;
            opportunityId: string | null;
        })[];
    }>;
}
