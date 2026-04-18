import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AssignUserDto } from '../shared/dto/assign-user.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, customerId?: string, status?: string): Promise<{
        tickets: {
            slaDueAt: Date;
            isOverdue: boolean;
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
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateTicketDto): Promise<{
        ticket: {
            slaDueAt: Date;
            isOverdue: boolean;
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
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateTicketDto): Promise<{
        ticket: {
            slaDueAt: Date;
            isOverdue: boolean;
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
        };
    }>;
    assign(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: AssignUserDto): Promise<{
        ticket: {
            slaDueAt: Date;
            isOverdue: boolean;
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
        };
    }>;
}
