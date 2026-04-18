import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CrmPortalController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    getUsers(req: FastifyRequest, search?: string): Promise<{
        data: ({
            _count: {
                salesInvoices: number;
                salesQuotations: number;
            };
            portalUsers: {
                id: string;
                email: string;
                tenantId: string;
                passwordHash: string | null;
                createdAt: Date;
                updatedAt: Date;
                customerCode: string;
                portalStatus: string;
                lastLoginAt: Date | null;
                inviteSentAt: Date | null;
            }[];
        } & {
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
        })[];
        summary: {
            totalCustomers: number;
            portalUsers: number;
            engagementLogs: number;
        };
    }>;
    getActivities(req: FastifyRequest, limitArg?: string): Promise<{
        data: ({
            user: {
                customer: {
                    name: string;
                    code: string;
                };
                email: string;
                portalStatus: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string;
            portalUserId: string;
            activityType: string;
            ipAddress: string | null;
        })[];
    }>;
    inviteUser(req: FastifyRequest, body: {
        customerCode: string;
        email: string;
    }): Promise<{
        message: string;
    }>;
    revokeUser(req: FastifyRequest, body: {
        portalUserId: string;
    }): Promise<{
        message: string;
    }>;
}
