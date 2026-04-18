import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        customers: {
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
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        customer: {
            tickets: {
                slaDueAt: Date;
                isOverdue: boolean;
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
                id: string;
                tenantId: string;
                createdAt: Date;
                priority: import("prisma/generated").$Enums.TicketPriority;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.TicketStatus;
                customerId: string;
                subject: string;
                assignedToId: string | null;
                notes: string | null;
            }[];
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
                expectedValue: import("@prisma/client-runtime-utils").Decimal | null;
                customerId: string | null;
                notes: string | null;
                stage: import("prisma/generated").$Enums.OpportunityStage;
                closeDate: Date | null;
                leadId: string | null;
                ownerUserId: string | null;
            })[];
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
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCustomerDto): Promise<{
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
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateCustomerDto): Promise<{
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
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
}
