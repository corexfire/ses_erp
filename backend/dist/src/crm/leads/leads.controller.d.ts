import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignUserDto } from '../shared/dto/assign-user.dto';
import { ConvertLeadDto } from './dto/convert-lead.dto';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string, assignedToUserId?: string): Promise<{
        leads: ({
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
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        lead: {
            opportunities: ({
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
            activities: ({
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
                    customerId: string | null;
                    notes: string | null;
                    stage: import("prisma/generated").$Enums.OpportunityStage;
                    expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
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
                customerId: string | null;
                subject: string;
                status: import("prisma/generated").$Enums.ActivityStatus;
                assignedToId: string | null;
                notes: string | null;
                leadId: string | null;
                dueAt: Date | null;
                opportunityId: string | null;
            })[];
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
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateLeadDto): Promise<{
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateLeadDto): Promise<{
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
        };
    }>;
    convert(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: ConvertLeadDto): Promise<{
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
        };
    }>;
    assign(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: AssignUserDto): Promise<{
        lead: {
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
        };
    }>;
}
