import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SuppliersController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        suppliers: {
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
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateSupplierDto): Promise<{
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
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateSupplierDto): Promise<{
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
    }>;
    deactivate(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
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
    }>;
}
