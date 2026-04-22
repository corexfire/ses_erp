export declare class CreateVehicleDocumentDto {
    documentType: string;
    documentNumber: string;
    issueDate?: string;
    expiryDate?: string;
    status?: string;
    notes?: string;
}
declare const UpdateVehicleDocumentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVehicleDocumentDto>>;
export declare class UpdateVehicleDocumentDto extends UpdateVehicleDocumentDto_base {
}
export {};
