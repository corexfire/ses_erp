import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
export declare class CampaignsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        campaigns: {
            budget: import("@prisma/client-runtime-utils").Decimal | null;
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import("prisma/generated").$Enums.CampaignStatus;
            notes: string | null;
            channel: string | null;
        }[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateCampaignDto): Promise<{
        campaign: {
            budget: import("@prisma/client-runtime-utils").Decimal | null;
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import("prisma/generated").$Enums.CampaignStatus;
            notes: string | null;
            channel: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateCampaignDto): Promise<{
        campaign: {
            budget: import("@prisma/client-runtime-utils").Decimal | null;
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import("prisma/generated").$Enums.CampaignStatus;
            notes: string | null;
            channel: string | null;
        };
    }>;
}
