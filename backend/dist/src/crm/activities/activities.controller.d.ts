import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignUserDto } from '../shared/dto/assign-user.dto';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
export declare class ActivitiesController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, leadId?: string, customerId?: string, opportunityId?: string, status?: string): Promise<{
        activities: ({
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
            assignedTo: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
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
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateActivityDto): Promise<{
        activity: {
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
            assignedTo: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateActivityDto): Promise<{
        activity: {
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
            assignedTo: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
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
        };
    }>;
    assign(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: AssignUserDto): Promise<{
        activity: {
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
            assignedTo: {
                id: string;
                email: string;
                tenantId: string;
                name: string | null;
                passwordHash: string;
                isActive: boolean;
                createdAt: Date;
                isSuperAdmin: boolean;
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
        };
    }>;
}
