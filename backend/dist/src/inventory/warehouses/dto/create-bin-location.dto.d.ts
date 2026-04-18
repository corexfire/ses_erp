import { BinType } from '../../../../prisma/generated/client';
export declare class CreateBinLocationDto {
    code: string;
    name?: string;
    zoneId?: string;
    type?: BinType;
}
