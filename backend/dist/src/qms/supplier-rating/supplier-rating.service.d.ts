import { PrismaService } from '../../prisma/prisma.service';
export declare class SupplierRatingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(tenantId: string, period: string): Promise<({
        supplier: {
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
        };
    } & {
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        supplierId: string;
        period: string;
        qualityScore: number;
        deliveryScore: number;
        ncrScore: number;
        totalScore: number;
        grade: string | null;
    })[]>;
    calculateRatings(tenantId: string, period: string): Promise<{
        message: string;
    }>;
}
