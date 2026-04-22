import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '../../auth/auth.types';
import { AuditService } from '../../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NcrService } from '../../qms/ncr/ncr.service';
import { UpdateQcDto } from './dto/update-qc.dto';
export declare class QcController {
    private readonly prisma;
    private readonly audit;
    private readonly ncrService;
    constructor(prisma: PrismaService, audit: AuditService, ncrService: NcrService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }, status?: string): Promise<{
        inspections: ({
            grn: ({
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
                warehouse: {
                    id: string;
                    tenantId: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    address1: string | null;
                    city: string | null;
                    province: string | null;
                    postalCode: string | null;
                    updatedAt: Date;
                    code: string;
                    type: import("prisma/generated").$Enums.WarehouseType;
                    managerId: string | null;
                    capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                    capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
                };
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.InventoryDocStatus;
                notes: string | null;
                warehouseId: string;
                supplierId: string | null;
                receiptDate: Date;
                purchaseOrderId: string | null;
                purchaseInvoiceId: string | null;
            }) | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            grnId: string | null;
            inspectionDate: Date;
            inspectorName: string | null;
            productionId: string | null;
        })[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        inspection: {
            items: {
                id: string;
                tenantId: string;
                description: string;
                lineNo: number;
                itemId: string | null;
                qcInspectionId: string;
                sampleQty: import("@prisma/client-runtime-utils").Decimal;
                passedQty: import("@prisma/client-runtime-utils").Decimal;
                failedQty: import("@prisma/client-runtime-utils").Decimal;
                defectReason: string | null;
            }[];
            grn: ({
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
                warehouse: {
                    id: string;
                    tenantId: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    address1: string | null;
                    city: string | null;
                    province: string | null;
                    postalCode: string | null;
                    updatedAt: Date;
                    code: string;
                    type: import("prisma/generated").$Enums.WarehouseType;
                    managerId: string | null;
                    capacityWeight: import("@prisma/client-runtime-utils").Decimal | null;
                    capacityVolume: import("@prisma/client-runtime-utils").Decimal | null;
                };
            } & {
                id: string;
                tenantId: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                status: import("prisma/generated").$Enums.InventoryDocStatus;
                notes: string | null;
                warehouseId: string;
                supplierId: string | null;
                receiptDate: Date;
                purchaseOrderId: string | null;
                purchaseInvoiceId: string | null;
            }) | null;
        } & {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            grnId: string | null;
            inspectionDate: Date;
            inspectorName: string | null;
            productionId: string | null;
        };
    }>;
    update(req: FastifyRequest & {
        user: AuthUser;
    }, id: string, body: UpdateQcDto): Promise<{
        inspection: {
            id: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            status: import("prisma/generated").$Enums.InventoryDocStatus;
            notes: string | null;
            grnId: string | null;
            inspectionDate: Date;
            inspectorName: string | null;
            productionId: string | null;
        };
    }>;
}
