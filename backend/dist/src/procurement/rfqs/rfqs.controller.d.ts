import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRfqDto } from './dto/create-rfq.dto';
import { UpdateRfqDto } from './dto/update-rfq.dto';
export declare class RfqsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, q?: string, status?: string): Promise<{
        rfqs: ({
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                itemId: string | null;
                rfqId: string;
                targetPrice: import("@prisma/client-runtime-utils").Decimal;
            }[];
            vendors: ({
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
                status: string;
                notes: string | null;
                supplierId: string;
                rfqId: string;
                bidAmount: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            issueDate: Date;
            closingDate: Date | null;
            department: string | null;
            title: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        rfq: {
            purchaseOrders: {
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
            }[];
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                qty: import("@prisma/client-runtime-utils").Decimal;
                uomCode: string | null;
                itemId: string | null;
                rfqId: string;
                targetPrice: import("@prisma/client-runtime-utils").Decimal;
            }[];
            vendors: ({
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
                status: string;
                notes: string | null;
                supplierId: string;
                rfqId: string;
                bidAmount: import("@prisma/client-runtime-utils").Decimal | null;
            })[];
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            issueDate: Date;
            closingDate: Date | null;
            department: string | null;
            title: string | null;
        };
    }>;
    create(req: FastifyRequest & {
        user: AuthUser;
    }, body: CreateRfqDto): Promise<{
        rfq: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            issueDate: Date;
            closingDate: Date | null;
            department: string | null;
            title: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateRfqDto): Promise<{
        rfq: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.ProcurementDocStatus;
            notes: string | null;
            issueDate: Date;
            closingDate: Date | null;
            department: string | null;
            title: string | null;
        };
    }>;
}
