export declare class CreateHandoverDto {
    code: string;
    serviceOrderId?: string;
    customerId: string;
    technicianId: string;
    equipmentId?: string;
    handoverDate: string;
    status?: string;
    recipientName: string;
    recipientPhone?: string;
    recipientTitle?: string;
    checklist?: any;
    photos?: any;
    clientSignature?: string;
    technicianSignature?: string;
    remarks?: string;
}
declare const UpdateHandoverDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateHandoverDto>>;
export declare class UpdateHandoverDto extends UpdateHandoverDto_base {
}
export {};
