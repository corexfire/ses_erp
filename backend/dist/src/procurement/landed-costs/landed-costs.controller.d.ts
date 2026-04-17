import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLandedCostDto } from './dto/create-landed-cost.dto';
import { UpdateLandedCostDto } from './dto/update-landed-cost.dto';
export declare class LandedCostsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string): Promise<{
        landedCosts: ({
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
            } | null;
            order: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderDate: Date;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
                supplierId: string;
                paymentTerms: string | null;
                rfqId: string | null;
                expectedDeliveryDate: Date | null;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
                shippingAddress: string | null;
                subtotal: import("@prisma/client-runtime-utils").Decimal;
                taxAmount: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            invoice: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderId: string | null;
                invoiceDate: Date;
                supplierId: string;
                paymentTerms: string | null;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
                subtotal: import("@prisma/client-runtime-utils").Decimal;
                taxAmount: import("@prisma/client-runtime-utils").Decimal;
                balanceDue: import("@prisma/client-runtime-utils").Decimal;
                dueDate: Date | null;
                taxFacturNumber: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            supplierId: string | null;
            costDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            apportionmentMethod: string;
            receiptId: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        landedCost: {
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
            } | null;
            allocations: {
                id: string;
                tenantId: string;
                lineNo: number;
                itemId: string | null;
                amount: import("@prisma/client-runtime-utils").Decimal;
                costComponent: string;
                landedCostId: string;
                receiptLineNo: number | null;
            }[];
            order: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderDate: Date;
                workflowDefinitionId: string | null;
                currentStepNo: number | null;
                supplierId: string;
                paymentTerms: string | null;
                rfqId: string | null;
                expectedDeliveryDate: Date | null;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
                shippingAddress: string | null;
                subtotal: import("@prisma/client-runtime-utils").Decimal;
                taxAmount: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            invoice: {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.ProcurementDocStatus;
                notes: string | null;
                orderId: string | null;
                invoiceDate: Date;
                supplierId: string;
                paymentTerms: string | null;
                grandTotal: import("@prisma/client-runtime-utils").Decimal;
                subtotal: import("@prisma/client-runtime-utils").Decimal;
                taxAmount: import("@prisma/client-runtime-utils").Decimal;
                balanceDue: import("@prisma/client-runtime-utils").Decimal;
                dueDate: Date | null;
                taxFacturNumber: string | null;
            } | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            supplierId: string | null;
            costDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            apportionmentMethod: string;
            receiptId: string | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateLandedCostDto): Promise<{
        landedCost: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            supplierId: string | null;
            costDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            apportionmentMethod: string;
            receiptId: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateLandedCostDto): Promise<{
        landedCost: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            orderId: string | null;
            invoiceId: string | null;
            supplierId: string | null;
            costDate: Date;
            totalAmount: import("@prisma/client-runtime-utils").Decimal;
            apportionmentMethod: string;
            receiptId: string | null;
        };
    }>;
}
