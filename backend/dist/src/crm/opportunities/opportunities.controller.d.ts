import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignUserDto } from '../shared/dto/assign-user.dto';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
export declare class OpportunitiesController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, leadId?: string, customerId?: string, stage?: string): Promise<{
        opportunities: ({
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
            owner: {
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            customerId: string | null;
            notes: string | null;
            stage: import("prisma/generated").$Enums.OpportunityStage;
            expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
            closeDate: Date | null;
            leadId: string | null;
            ownerUserId: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        opportunity: {
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
                customerId: string | null;
                subject: string;
                status: import("prisma/generated").$Enums.ActivityStatus;
                assignedToId: string | null;
                notes: string | null;
                leadId: string | null;
                dueAt: Date | null;
                opportunityId: string | null;
            })[];
            owner: {
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            customerId: string | null;
            notes: string | null;
            stage: import("prisma/generated").$Enums.OpportunityStage;
            expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
            closeDate: Date | null;
            leadId: string | null;
            ownerUserId: string | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateOpportunityDto): Promise<{
        opportunity: {
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
            owner: {
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            customerId: string | null;
            notes: string | null;
            stage: import("prisma/generated").$Enums.OpportunityStage;
            expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
            closeDate: Date | null;
            leadId: string | null;
            ownerUserId: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateOpportunityDto): Promise<{
        opportunity: {
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
            owner: {
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            customerId: string | null;
            notes: string | null;
            stage: import("prisma/generated").$Enums.OpportunityStage;
            expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
            closeDate: Date | null;
            leadId: string | null;
            ownerUserId: string | null;
        };
    }>;
    assign(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: AssignUserDto): Promise<{
        opportunity: {
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
            owner: {
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            customerId: string | null;
            notes: string | null;
            stage: import("prisma/generated").$Enums.OpportunityStage;
            expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
            closeDate: Date | null;
            leadId: string | null;
            ownerUserId: string | null;
        };
    }>;
}
