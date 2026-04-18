import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class VendorPortalController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    getVendors(req: FastifyRequest, search?: string): Promise<{
        data: ({
            _count: {
                purchaseOrders: number;
                purchaseInvoices: number;
            };
            portalUsers: {
                id: string;
                email: string;
                tenantId: string;
                passwordHash: string | null;
                createdAt: Date;
                updatedAt: Date;
                portalStatus: string;
                lastLoginAt: Date | null;
                inviteSentAt: Date | null;
                supplierCode: string;
            }[];
        } & {
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
        })[];
        summary: {
            totalSuppliers: number;
            portalUsers: number;
            engagementLogs: number;
        };
    }>;
    getActivities(req: FastifyRequest, limitArg?: string): Promise<{
        data: ({
            user: {
                supplier: {
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
        supplierCode: string;
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
