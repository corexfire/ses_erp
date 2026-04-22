import { PrismaService } from '../prisma/prisma.service';
import { FastifyRequest } from 'fastify';
interface AuthUser {
    id: string;
    tenantId: string;
}
interface CustomRequest extends FastifyRequest {
    user: AuthUser;
}
export declare class ConstructionExpansionController {
    private prisma;
    constructor(prisma: PrismaService);
    getDefects(req: CustomRequest): Promise<({
        wbsTask: {
            taskName: string;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        status: string;
        assignedTo: string | null;
        title: string;
        severity: string;
        projectId: string;
        resolvedAt: Date | null;
        wbsTaskId: string | null;
        photos: string | null;
        raisedBy: string | null;
    })[]>;
    createDefect(req: CustomRequest, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        status: string;
        assignedTo: string | null;
        title: string;
        severity: string;
        projectId: string;
        resolvedAt: Date | null;
        wbsTaskId: string | null;
        photos: string | null;
        raisedBy: string | null;
    }>;
    updateDefect(req: CustomRequest, id: string, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        status: string;
        assignedTo: string | null;
        title: string;
        severity: string;
        projectId: string;
        resolvedAt: Date | null;
        wbsTaskId: string | null;
        photos: string | null;
        raisedBy: string | null;
    }>;
    getRFIs(req: CustomRequest): Promise<({
        wbsTask: {
            taskName: string;
        } | null;
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        status: string;
        subject: string;
        projectId: string;
        wbsTaskId: string | null;
        attachments: string | null;
        rfiNo: string;
        requestedDate: Date;
        neededByDate: Date | null;
        assignedToUser: string | null;
        isUrgent: boolean;
    })[]>;
    createRFI(req: CustomRequest, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        status: string;
        subject: string;
        projectId: string;
        wbsTaskId: string | null;
        attachments: string | null;
        rfiNo: string;
        requestedDate: Date;
        neededByDate: Date | null;
        assignedToUser: string | null;
        isUrgent: boolean;
    }>;
    updateRFI(req: CustomRequest, id: string, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        description: string | null;
        updatedAt: Date;
        status: string;
        subject: string;
        projectId: string;
        wbsTaskId: string | null;
        attachments: string | null;
        rfiNo: string;
        requestedDate: Date;
        neededByDate: Date | null;
        assignedToUser: string | null;
        isUrgent: boolean;
    }>;
    getEquipmentLogs(req: CustomRequest): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        operatorName: string | null;
        logDate: Date;
        projectId: string;
        equipmentName: string;
        hoursOperated: number;
        fuelConsumption: number;
    }[]>;
    createEquipmentLog(req: CustomRequest, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        operatorName: string | null;
        logDate: Date;
        projectId: string;
        equipmentName: string;
        hoursOperated: number;
        fuelConsumption: number;
    }>;
    getWeatherLogs(req: CustomRequest): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        logDate: Date;
        projectId: string;
        morningCondition: string;
        afternoonCondition: string;
        eveningCondition: string;
        impactDescription: string | null;
        isSignificantDelay: boolean;
    }[]>;
    createWeatherLog(req: CustomRequest, data: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        logDate: Date;
        projectId: string;
        morningCondition: string;
        afternoonCondition: string;
        eveningCondition: string;
        impactDescription: string | null;
        isSignificantDelay: boolean;
    }>;
    getSiteInventory(req: CustomRequest): Promise<{
        uom: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        projectId: string;
        materialName: string;
        sku: string | null;
        quantityIn: import("@prisma/client-runtime-utils").Decimal;
        quantityOut: import("@prisma/client-runtime-utils").Decimal;
        transactionDate: Date;
    }[]>;
    createSiteInventory(req: CustomRequest, data: any): Promise<{
        uom: string | null;
        id: string;
        tenantId: string;
        createdAt: Date;
        notes: string | null;
        balance: import("@prisma/client-runtime-utils").Decimal;
        projectId: string;
        materialName: string;
        sku: string | null;
        quantityIn: import("@prisma/client-runtime-utils").Decimal;
        quantityOut: import("@prisma/client-runtime-utils").Decimal;
        transactionDate: Date;
    }>;
}
export {};
