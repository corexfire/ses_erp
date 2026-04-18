import type { FastifyRequest } from 'fastify';
import { AuthUser } from '../../auth/auth.types';
import { SupplierRatingService } from './supplier-rating.service';
export declare class SupplierRatingController {
    private readonly ratingService;
    constructor(ratingService: SupplierRatingService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, period: string): Promise<{
        list: ({
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
        })[];
    }>;
    calculate(req: FastifyRequest & {
        user: AuthUser;
    }, period: string): Promise<{
        message: string;
    }>;
}
