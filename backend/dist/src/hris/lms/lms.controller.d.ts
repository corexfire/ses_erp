import type { FastifyRequest } from 'fastify';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class HrisLmsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    getCourses(req: FastifyRequest, search?: string): Promise<{
        data: ({
            _count: {
                enrollments: number;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            status: string;
            title: string;
            category: string | null;
            durationHours: number;
            mandatory: boolean;
        })[];
        summary: {
            totalCourses: number;
            totalEnrollments: number;
            completionRate: number;
            failedCount: number;
        };
    }>;
    getEnrollments(req: FastifyRequest, courseId?: string): Promise<{
        data: ({
            employee: {
                department: string | null;
                employeeNo: string;
                firstName: string;
                lastName: string | null;
            };
            course: {
                code: string;
                title: string;
            };
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            completedAt: Date | null;
            employeeId: string;
            score: number | null;
            courseId: string;
            enrolledAt: Date;
        })[];
    }>;
    createCourse(req: FastifyRequest, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            description: string | null;
            updatedAt: Date;
            code: string;
            status: string;
            title: string;
            category: string | null;
            durationHours: number;
            mandatory: boolean;
        };
    }>;
    enrollEmployee(req: FastifyRequest, body: any): Promise<{
        message: string;
        data: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            notes: string | null;
            completedAt: Date | null;
            employeeId: string;
            score: number | null;
            courseId: string;
            enrolledAt: Date;
        };
    }>;
    getLookups(req: FastifyRequest): Promise<{
        data: {
            employees: {
                id: string;
                employeeNo: string;
                firstName: string;
                lastName: string | null;
            }[];
        };
    }>;
}
