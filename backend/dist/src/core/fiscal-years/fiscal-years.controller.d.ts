import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFiscalYearDto } from './dto/create-fiscal-year.dto';
export declare class FiscalYearsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        fiscalYears: ({
            periods: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                startDate: Date;
                endDate: Date;
                fiscalYearId: string;
                periodNo: number;
                isOpen: boolean;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date;
            endDate: Date;
            isClosed: boolean;
        })[];
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateFiscalYearDto): Promise<{
        fiscalYear: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date;
            endDate: Date;
            isClosed: boolean;
        };
    }>;
    close(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        fiscalYear: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            startDate: Date;
            endDate: Date;
            isClosed: boolean;
        };
    }>;
}
