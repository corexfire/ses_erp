import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../auth/auth.types';
import { PrismaService } from '../prisma/prisma.service';
export declare class SuccessionController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        plans: ({
            incumbent: {
                id: string;
                email: string;
                tenantId: string;
                createdAt: Date;
                phone: string | null;
                updatedAt: Date;
                status: string;
                department: string | null;
                managerId: string | null;
                employeeNo: string;
                firstName: string;
                lastName: string | null;
                position: string | null;
                hireDate: Date | null;
                salary: import("@prisma/client-runtime-utils").Decimal | null;
            } | null;
            candidates: ({
                employee: {
                    id: string;
                    email: string;
                    tenantId: string;
                    createdAt: Date;
                    phone: string | null;
                    updatedAt: Date;
                    status: string;
                    department: string | null;
                    managerId: string | null;
                    employeeNo: string;
                    firstName: string;
                    lastName: string | null;
                    position: string | null;
                    hireDate: Date | null;
                    salary: import("@prisma/client-runtime-utils").Decimal | null;
                };
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                employeeId: string;
                readiness: string;
                potentialScore: number;
                performanceScore: number;
                gapAnalysis: string | null;
                planId: string;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            status: string;
            department: string | null;
            positionName: string;
            incumbentId: string | null;
        })[];
    }>;
    getStats(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        totalPlans: number;
        readyNowCount: number;
        vacantRoles: number;
        averageReadiness: number;
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: any): Promise<{
        plan: {
            id: string;
            tenantId: string;
            createdAt: Date;
            priority: string;
            updatedAt: Date;
            status: string;
            department: string | null;
            positionName: string;
            incumbentId: string | null;
        };
    }>;
    addCandidate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: any): Promise<{
        candidate: {
            id: string;
            tenantId: string;
            createdAt: Date;
            employeeId: string;
            readiness: string;
            potentialScore: number;
            performanceScore: number;
            gapAnalysis: string | null;
            planId: string;
        };
    }>;
    updateCandidate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: any): Promise<{
        candidate: {
            id: string;
            tenantId: string;
            createdAt: Date;
            employeeId: string;
            readiness: string;
            potentialScore: number;
            performanceScore: number;
            gapAnalysis: string | null;
            planId: string;
        };
    }>;
}
