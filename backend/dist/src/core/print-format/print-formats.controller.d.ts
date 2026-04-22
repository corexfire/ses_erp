import type { FastifyRequest } from 'fastify';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from '../../auth/auth.types';
import { UpsertPrintFormatDto } from './dto/upsert-print-format.dto';
import { AuditService } from '../../audit/audit.service';
export declare class PrintFormatsController {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(req: FastifyRequest & {
        user: AuthUser;
    }): Promise<{
        formats: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            docType: string;
            status: string;
            module: string;
            paperSize: string;
            orientation: string;
            fontFamily: string;
            margin: string;
            accentColor: string;
            secondaryColor: string;
            footerText: string | null;
            isDefault: boolean;
            showLogo: boolean;
            showShippingAddress: boolean;
            showTax: boolean;
            showDiscount: boolean;
            showNotes: boolean;
            showSignature: boolean;
            showBankInfo: boolean;
            showQrCode: boolean;
            usageCount: number;
            formatType: string;
            width: number | null;
            height: number | null;
            barcodeType: string | null;
            showBarcode: boolean;
            showPrice: boolean;
            showItemCode: boolean;
        }[];
    }>;
    get(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        format: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            docType: string;
            status: string;
            module: string;
            paperSize: string;
            orientation: string;
            fontFamily: string;
            margin: string;
            accentColor: string;
            secondaryColor: string;
            footerText: string | null;
            isDefault: boolean;
            showLogo: boolean;
            showShippingAddress: boolean;
            showTax: boolean;
            showDiscount: boolean;
            showNotes: boolean;
            showSignature: boolean;
            showBankInfo: boolean;
            showQrCode: boolean;
            usageCount: number;
            formatType: string;
            width: number | null;
            height: number | null;
            barcodeType: string | null;
            showBarcode: boolean;
            showPrice: boolean;
            showItemCode: boolean;
        } | null;
    }>;
    upsert(req: FastifyRequest & {
        user: AuthUser;
    }, body: UpsertPrintFormatDto): Promise<{
        format: {
            id: string;
            tenantId: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            docType: string;
            status: string;
            module: string;
            paperSize: string;
            orientation: string;
            fontFamily: string;
            margin: string;
            accentColor: string;
            secondaryColor: string;
            footerText: string | null;
            isDefault: boolean;
            showLogo: boolean;
            showShippingAddress: boolean;
            showTax: boolean;
            showDiscount: boolean;
            showNotes: boolean;
            showSignature: boolean;
            showBankInfo: boolean;
            showQrCode: boolean;
            usageCount: number;
            formatType: string;
            width: number | null;
            height: number | null;
            barcodeType: string | null;
            showBarcode: boolean;
            showPrice: boolean;
            showItemCode: boolean;
        };
    }>;
    remove(req: FastifyRequest & {
        user: AuthUser;
    }, id: string): Promise<{
        success: boolean;
    }>;
}
