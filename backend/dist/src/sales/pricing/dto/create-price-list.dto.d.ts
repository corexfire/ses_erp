import { PriceListItemDto } from './price-list-item.dto';
export declare class CreatePriceListDto {
    code: string;
    name: string;
    items?: PriceListItemDto[];
}
