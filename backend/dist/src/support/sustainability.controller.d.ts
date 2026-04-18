import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
declare class CreateSustRecordDto {
    code: string;
    type: string;
    indicator: string;
    period: string;
    value: number;
    target: number;
    unit: string;
    description?: string;
}
export declare class SupportSustainabilityController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listRecords(req: FastifyRequest & {
        user: AuthUser;
    }, type?: string, period?: string): Promise<({
        verifiedBy: {
            employeeNo: string;
            firstName: string;
            lastName: string | null;
        } | null;
        recordedBy: {
            employeeNo: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        value: import("@prisma/client-runtime-utils").Decimal;
        updatedAt: Date;
        code: string;
        type: string;
        status: string;
        target: import("@prisma/client-runtime-utils").Decimal;
        period: string;
        unit: string;
        indicator: string;
        recordedById: string | null;
        verifiedById: string | null;
    })[]>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        carbonPulse: {
            totalEmissions: number;
            targetEmissions: number;
            trend: string;
        };
        energyMix: {
            renewableKwh: number;
            targetKwh: number;
        };
        verificationStatus: {
            verified: number;
            submitted: number;
            draft: number;
        };
    }>;
    createRecord(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateSustRecordDto): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        value: import("@prisma/client-runtime-utils").Decimal;
        updatedAt: Date;
        code: string;
        type: string;
        status: string;
        target: import("@prisma/client-runtime-utils").Decimal;
        period: string;
        unit: string;
        indicator: string;
        recordedById: string | null;
        verifiedById: string | null;
    }>;
    verifyRecord(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        value: import("@prisma/client-runtime-utils").Decimal;
        updatedAt: Date;
        code: string;
        type: string;
        status: string;
        target: import("@prisma/client-runtime-utils").Decimal;
        period: string;
        unit: string;
        indicator: string;
        recordedById: string | null;
        verifiedById: string | null;
    }>;
    updateRecord(id: string, req: FastifyRequest & {
        user: AuthUser;
    }, body: Partial<CreateSustRecordDto>): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        value: import("@prisma/client-runtime-utils").Decimal;
        updatedAt: Date;
        code: string;
        type: string;
        status: string;
        target: import("@prisma/client-runtime-utils").Decimal;
        period: string;
        unit: string;
        indicator: string;
        recordedById: string | null;
        verifiedById: string | null;
    }>;
    deleteRecord(id: string, req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        value: import("@prisma/client-runtime-utils").Decimal;
        updatedAt: Date;
        code: string;
        type: string;
        status: string;
        target: import("@prisma/client-runtime-utils").Decimal;
        period: string;
        unit: string;
        indicator: string;
        recordedById: string | null;
        verifiedById: string | null;
    }>;
}
export {};
