import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from '../../auth/auth.types';
import { UpsertCompanyProfileDto } from './dto/upsert-company-profile.dto';
import { AuditService } from '../../audit/audit.service';
export declare class CompanyProfileController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    get(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        companyProfile: {
            id: string;
            email: string | null;
            tenantId: string;
            createdAt: Date;
            legalName: string;
            tradeName: string | null;
            npwp: string | null;
            phone: string | null;
            address1: string | null;
            address2: string | null;
            city: string | null;
            province: string | null;
            postalCode: string | null;
            countryCode: string | null;
            updatedAt: Date;
        } | null;
    }>;
    upsert(req: FastifyRequest & {
        user: AuthUser;
    }, body: UpsertCompanyProfileDto): Promise<{
        companyProfile: {
            id: string;
            email: string | null;
            tenantId: string;
            createdAt: Date;
            legalName: string;
            tradeName: string | null;
            npwp: string | null;
            phone: string | null;
            address1: string | null;
            address2: string | null;
            city: string | null;
            province: string | null;
            postalCode: string | null;
            countryCode: string | null;
            updatedAt: Date;
        };
    }>;
}
