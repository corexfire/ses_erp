declare const accountTypes: readonly ["ASSET", "LIABILITY", "EQUITY", "INCOME", "EXPENSE"];
export declare class CreateCoaAccountDto {
    code: string;
    name: string;
    type: (typeof accountTypes)[number];
    parentId?: string;
    isPosting?: boolean;
}
export {};
