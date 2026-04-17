import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class RentalMaintenanceController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    findAll(req: FastifyRequest, search?: string, status?: string): Promise<{
        data: ({
            asset: {
                assetNo: string;
            } | null;
            contract: {
                contractNo: string;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            type: string;
            status: string;
            assetId: string | null;
            resolutionNotes: string | null;
            contractId: string | null;
            issueDescription: string;
            ticketNo: string;
            scheduledDate: Date;
            completionDate: Date | null;
            costAmount: import("@prisma/client-runtime-utils").Decimal;
            mechanicName: string | null;
        })[];
        summary: {
            scheduled: number;
            inProgress: number;
            completed: number;
            totalCost: number;
        };
    }>;
    create(req: FastifyRequest, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            type: string;
            status: string;
            assetId: string | null;
            resolutionNotes: string | null;
            contractId: string | null;
            issueDescription: string;
            ticketNo: string;
            scheduledDate: Date;
            completionDate: Date | null;
            costAmount: import("@prisma/client-runtime-utils").Decimal;
            mechanicName: string | null;
        };
    }>;
    update(req: FastifyRequest, id: string, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            type: string;
            status: string;
            assetId: string | null;
            resolutionNotes: string | null;
            contractId: string | null;
            issueDescription: string;
            ticketNo: string;
            scheduledDate: Date;
            completionDate: Date | null;
            costAmount: import("@prisma/client-runtime-utils").Decimal;
            mechanicName: string | null;
        };
    }>;
    getLookups(req: FastifyRequest): Promise<{
        data: {
            contracts: {
                id: string;
                contractNo: string;
            }[];
            assets: {
                id: string;
                assetNo: string;
            }[];
        };
    }>;
}
