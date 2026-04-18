import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDiscountRuleDto } from './dto/create-discount-rule.dto';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { CreatePriceRuleDto } from './dto/create-price-rule.dto';
import { UpdateDiscountRuleDto } from './dto/update-discount-rule.dto';
import { UpdatePriceListDto } from './dto/update-price-list.dto';
import { UpdatePriceRuleDto } from './dto/update-price-rule.dto';
export declare class PricingController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    listPriceLists(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        priceLists: ({
            items: {
                id: string;
                tenantId: string;
                endDate: Date | null;
                effectiveDate: Date;
                customerId: string | null;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                itemCode: string;
                priceListId: string;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        })[];
    }>;
    getPriceList(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        priceList: {
            items: {
                id: string;
                tenantId: string;
                endDate: Date | null;
                effectiveDate: Date;
                customerId: string | null;
                uomCode: string | null;
                unitPrice: import("@prisma/client-runtime-utils").Decimal;
                itemCode: string;
                priceListId: string;
            }[];
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    createPriceList(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreatePriceListDto): Promise<{
        priceList: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    updatePriceList(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdatePriceListDto): Promise<{
        priceList: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
    }>;
    listPriceRules(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, isActive?: string): Promise<{
        priceRules: ({
            customer: {
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
                nik: string | null;
                taxAddress: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            itemCode: string;
            customerGroup: string | null;
        })[];
    }>;
    getPriceRule(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        priceRule: {
            customer: {
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
                nik: string | null;
                taxAddress: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            itemCode: string;
            customerGroup: string | null;
        };
    }>;
    createPriceRule(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreatePriceRuleDto): Promise<{
        priceRule: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            itemCode: string;
            customerGroup: string | null;
        };
    }>;
    updatePriceRule(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdatePriceRuleDto): Promise<{
        priceRule: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            itemCode: string;
            customerGroup: string | null;
        };
    }>;
    deactivatePriceRule(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        priceRule: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            unitPrice: import("@prisma/client-runtime-utils").Decimal;
            itemCode: string;
            customerGroup: string | null;
        };
    }>;
    listDiscountRules(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, isActive?: string): Promise<{
        discountRules: ({
            customer: {
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
                nik: string | null;
                taxAddress: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            itemCode: string | null;
            discountPercent: import("@prisma/client-runtime-utils").Decimal;
            customerGroup: string | null;
        })[];
    }>;
    getDiscountRule(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        discountRule: {
            customer: {
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
                nik: string | null;
                taxAddress: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            itemCode: string | null;
            discountPercent: import("@prisma/client-runtime-utils").Decimal;
            customerGroup: string | null;
        };
    }>;
    createDiscountRule(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateDiscountRuleDto): Promise<{
        discountRule: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            itemCode: string | null;
            discountPercent: import("@prisma/client-runtime-utils").Decimal;
            customerGroup: string | null;
        };
    }>;
    updateDiscountRule(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateDiscountRuleDto): Promise<{
        discountRule: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            itemCode: string | null;
            discountPercent: import("@prisma/client-runtime-utils").Decimal;
            customerGroup: string | null;
        };
    }>;
    deactivateDiscountRule(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        discountRule: {
            id: string;
            tenantId: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            priority: number;
            updatedAt: Date;
            code: string;
            endDate: Date | null;
            effectiveDate: Date;
            customerId: string | null;
            uomCode: string | null;
            itemCode: string | null;
            discountPercent: import("@prisma/client-runtime-utils").Decimal;
            customerGroup: string | null;
        };
    }>;
}
