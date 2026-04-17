import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PurchaseReturnItemModel = runtime.Types.Result.DefaultSelection<Prisma.$PurchaseReturnItemPayload>;
export type AggregatePurchaseReturnItem = {
    _count: PurchaseReturnItemCountAggregateOutputType | null;
    _avg: PurchaseReturnItemAvgAggregateOutputType | null;
    _sum: PurchaseReturnItemSumAggregateOutputType | null;
    _min: PurchaseReturnItemMinAggregateOutputType | null;
    _max: PurchaseReturnItemMaxAggregateOutputType | null;
};
export type PurchaseReturnItemAvgAggregateOutputType = {
    lineNo: number | null;
    receiptLineNo: number | null;
    qty: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    amount: runtime.Decimal | null;
};
export type PurchaseReturnItemSumAggregateOutputType = {
    lineNo: number | null;
    receiptLineNo: number | null;
    qty: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    amount: runtime.Decimal | null;
};
export type PurchaseReturnItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    returnId: string | null;
    lineNo: number | null;
    itemId: string | null;
    receiptLineNo: number | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    unitPrice: runtime.Decimal | null;
    amount: runtime.Decimal | null;
    taxCodeId: string | null;
};
export type PurchaseReturnItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    returnId: string | null;
    lineNo: number | null;
    itemId: string | null;
    receiptLineNo: number | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    unitPrice: runtime.Decimal | null;
    amount: runtime.Decimal | null;
    taxCodeId: string | null;
};
export type PurchaseReturnItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    returnId: number;
    lineNo: number;
    itemId: number;
    receiptLineNo: number;
    description: number;
    qty: number;
    uomCode: number;
    unitPrice: number;
    amount: number;
    taxCodeId: number;
    _all: number;
};
export type PurchaseReturnItemAvgAggregateInputType = {
    lineNo?: true;
    receiptLineNo?: true;
    qty?: true;
    unitPrice?: true;
    amount?: true;
};
export type PurchaseReturnItemSumAggregateInputType = {
    lineNo?: true;
    receiptLineNo?: true;
    qty?: true;
    unitPrice?: true;
    amount?: true;
};
export type PurchaseReturnItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    returnId?: true;
    lineNo?: true;
    itemId?: true;
    receiptLineNo?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    unitPrice?: true;
    amount?: true;
    taxCodeId?: true;
};
export type PurchaseReturnItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    returnId?: true;
    lineNo?: true;
    itemId?: true;
    receiptLineNo?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    unitPrice?: true;
    amount?: true;
    taxCodeId?: true;
};
export type PurchaseReturnItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    returnId?: true;
    lineNo?: true;
    itemId?: true;
    receiptLineNo?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    unitPrice?: true;
    amount?: true;
    taxCodeId?: true;
    _all?: true;
};
export type PurchaseReturnItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReturnItemWhereInput;
    orderBy?: Prisma.PurchaseReturnItemOrderByWithRelationInput | Prisma.PurchaseReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PurchaseReturnItemCountAggregateInputType;
    _avg?: PurchaseReturnItemAvgAggregateInputType;
    _sum?: PurchaseReturnItemSumAggregateInputType;
    _min?: PurchaseReturnItemMinAggregateInputType;
    _max?: PurchaseReturnItemMaxAggregateInputType;
};
export type GetPurchaseReturnItemAggregateType<T extends PurchaseReturnItemAggregateArgs> = {
    [P in keyof T & keyof AggregatePurchaseReturnItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePurchaseReturnItem[P]> : Prisma.GetScalarType<T[P], AggregatePurchaseReturnItem[P]>;
};
export type PurchaseReturnItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReturnItemWhereInput;
    orderBy?: Prisma.PurchaseReturnItemOrderByWithAggregationInput | Prisma.PurchaseReturnItemOrderByWithAggregationInput[];
    by: Prisma.PurchaseReturnItemScalarFieldEnum[] | Prisma.PurchaseReturnItemScalarFieldEnum;
    having?: Prisma.PurchaseReturnItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PurchaseReturnItemCountAggregateInputType | true;
    _avg?: PurchaseReturnItemAvgAggregateInputType;
    _sum?: PurchaseReturnItemSumAggregateInputType;
    _min?: PurchaseReturnItemMinAggregateInputType;
    _max?: PurchaseReturnItemMaxAggregateInputType;
};
export type PurchaseReturnItemGroupByOutputType = {
    id: string;
    tenantId: string;
    returnId: string;
    lineNo: number;
    itemId: string | null;
    receiptLineNo: number | null;
    description: string;
    qty: runtime.Decimal;
    uomCode: string | null;
    unitPrice: runtime.Decimal;
    amount: runtime.Decimal;
    taxCodeId: string | null;
    _count: PurchaseReturnItemCountAggregateOutputType | null;
    _avg: PurchaseReturnItemAvgAggregateOutputType | null;
    _sum: PurchaseReturnItemSumAggregateOutputType | null;
    _min: PurchaseReturnItemMinAggregateOutputType | null;
    _max: PurchaseReturnItemMaxAggregateOutputType | null;
};
export type GetPurchaseReturnItemGroupByPayload<T extends PurchaseReturnItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PurchaseReturnItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PurchaseReturnItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PurchaseReturnItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PurchaseReturnItemGroupByOutputType[P]>;
}>>;
export type PurchaseReturnItemWhereInput = {
    AND?: Prisma.PurchaseReturnItemWhereInput | Prisma.PurchaseReturnItemWhereInput[];
    OR?: Prisma.PurchaseReturnItemWhereInput[];
    NOT?: Prisma.PurchaseReturnItemWhereInput | Prisma.PurchaseReturnItemWhereInput[];
    id?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    returnId?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseReturnItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    receiptLineNo?: Prisma.IntNullableFilter<"PurchaseReturnItem"> | number | null;
    description?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    unitPrice?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    purchaseReturn?: Prisma.XOR<Prisma.PurchaseReturnScalarRelationFilter, Prisma.PurchaseReturnWhereInput>;
    taxCode?: Prisma.XOR<Prisma.TaxCodeNullableScalarRelationFilter, Prisma.TaxCodeWhereInput> | null;
};
export type PurchaseReturnItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    receiptLineNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    purchaseReturn?: Prisma.PurchaseReturnOrderByWithRelationInput;
    taxCode?: Prisma.TaxCodeOrderByWithRelationInput;
};
export type PurchaseReturnItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_returnId_lineNo?: Prisma.PurchaseReturnItemTenantIdReturnIdLineNoCompoundUniqueInput;
    AND?: Prisma.PurchaseReturnItemWhereInput | Prisma.PurchaseReturnItemWhereInput[];
    OR?: Prisma.PurchaseReturnItemWhereInput[];
    NOT?: Prisma.PurchaseReturnItemWhereInput | Prisma.PurchaseReturnItemWhereInput[];
    tenantId?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    returnId?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseReturnItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    receiptLineNo?: Prisma.IntNullableFilter<"PurchaseReturnItem"> | number | null;
    description?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    unitPrice?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    purchaseReturn?: Prisma.XOR<Prisma.PurchaseReturnScalarRelationFilter, Prisma.PurchaseReturnWhereInput>;
    taxCode?: Prisma.XOR<Prisma.TaxCodeNullableScalarRelationFilter, Prisma.TaxCodeWhereInput> | null;
}, "id" | "tenantId_returnId_lineNo">;
export type PurchaseReturnItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    receiptLineNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PurchaseReturnItemCountOrderByAggregateInput;
    _avg?: Prisma.PurchaseReturnItemAvgOrderByAggregateInput;
    _max?: Prisma.PurchaseReturnItemMaxOrderByAggregateInput;
    _min?: Prisma.PurchaseReturnItemMinOrderByAggregateInput;
    _sum?: Prisma.PurchaseReturnItemSumOrderByAggregateInput;
};
export type PurchaseReturnItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.PurchaseReturnItemScalarWhereWithAggregatesInput | Prisma.PurchaseReturnItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.PurchaseReturnItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PurchaseReturnItemScalarWhereWithAggregatesInput | Prisma.PurchaseReturnItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PurchaseReturnItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"PurchaseReturnItem"> | string;
    returnId?: Prisma.StringWithAggregatesFilter<"PurchaseReturnItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"PurchaseReturnItem"> | number;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"PurchaseReturnItem"> | string | null;
    receiptLineNo?: Prisma.IntNullableWithAggregatesFilter<"PurchaseReturnItem"> | number | null;
    description?: Prisma.StringWithAggregatesFilter<"PurchaseReturnItem"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"PurchaseReturnItem"> | string | null;
    unitPrice?: Prisma.DecimalWithAggregatesFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.StringNullableWithAggregatesFilter<"PurchaseReturnItem"> | string | null;
};
export type PurchaseReturnItemCreateInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseReturnItemsInput;
    purchaseReturn: Prisma.PurchaseReturnCreateNestedOneWithoutItemsInput;
    taxCode?: Prisma.TaxCodeCreateNestedOneWithoutPurchaseReturnItemsInput;
};
export type PurchaseReturnItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    returnId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: string | null;
};
export type PurchaseReturnItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseReturnItemsNestedInput;
    purchaseReturn?: Prisma.PurchaseReturnUpdateOneRequiredWithoutItemsNestedInput;
    taxCode?: Prisma.TaxCodeUpdateOneWithoutPurchaseReturnItemsNestedInput;
};
export type PurchaseReturnItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PurchaseReturnItemCreateManyInput = {
    id?: string;
    tenantId: string;
    returnId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: string | null;
};
export type PurchaseReturnItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseReturnItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PurchaseReturnItemListRelationFilter = {
    every?: Prisma.PurchaseReturnItemWhereInput;
    some?: Prisma.PurchaseReturnItemWhereInput;
    none?: Prisma.PurchaseReturnItemWhereInput;
};
export type PurchaseReturnItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PurchaseReturnItemTenantIdReturnIdLineNoCompoundUniqueInput = {
    tenantId: string;
    returnId: string;
    lineNo: number;
};
export type PurchaseReturnItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    receiptLineNo?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrder;
};
export type PurchaseReturnItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    receiptLineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type PurchaseReturnItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    receiptLineNo?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrder;
};
export type PurchaseReturnItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    returnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    receiptLineNo?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrder;
};
export type PurchaseReturnItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    receiptLineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type PurchaseReturnItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseReturnItemCreateWithoutTenantInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
};
export type PurchaseReturnItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseReturnItemCreateWithoutTenantInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
};
export type PurchaseReturnItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseReturnItemCreateWithoutTenantInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    update?: Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
};
export type PurchaseReturnItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseReturnItemCreateWithoutTenantInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    update?: Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
};
export type PurchaseReturnItemCreateNestedManyWithoutPurchaseReturnInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput> | Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyPurchaseReturnInputEnvelope;
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
};
export type PurchaseReturnItemUncheckedCreateNestedManyWithoutPurchaseReturnInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput> | Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyPurchaseReturnInputEnvelope;
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
};
export type PurchaseReturnItemUpdateManyWithoutPurchaseReturnNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput> | Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput[];
    upsert?: Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutPurchaseReturnInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyPurchaseReturnInputEnvelope;
    set?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    update?: Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutPurchaseReturnInput[];
    updateMany?: Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutPurchaseReturnInput[];
    deleteMany?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
};
export type PurchaseReturnItemUncheckedUpdateManyWithoutPurchaseReturnNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput> | Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput[];
    upsert?: Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutPurchaseReturnInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyPurchaseReturnInputEnvelope;
    set?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    update?: Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutPurchaseReturnInput[];
    updateMany?: Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutPurchaseReturnInput | Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutPurchaseReturnInput[];
    deleteMany?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
};
export type PurchaseReturnItemCreateNestedManyWithoutTaxCodeInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTaxCodeInputEnvelope;
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
};
export type PurchaseReturnItemUncheckedCreateNestedManyWithoutTaxCodeInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTaxCodeInputEnvelope;
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
};
export type PurchaseReturnItemUpdateManyWithoutTaxCodeNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput[];
    upsert?: Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTaxCodeInputEnvelope;
    set?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    update?: Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTaxCodeInput[];
    updateMany?: Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTaxCodeInput | Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTaxCodeInput[];
    deleteMany?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
};
export type PurchaseReturnItemUncheckedUpdateManyWithoutTaxCodeNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput[];
    upsert?: Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseReturnItemUpsertWithWhereUniqueWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseReturnItemCreateManyTaxCodeInputEnvelope;
    set?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    delete?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    connect?: Prisma.PurchaseReturnItemWhereUniqueInput | Prisma.PurchaseReturnItemWhereUniqueInput[];
    update?: Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseReturnItemUpdateWithWhereUniqueWithoutTaxCodeInput[];
    updateMany?: Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTaxCodeInput | Prisma.PurchaseReturnItemUpdateManyWithWhereWithoutTaxCodeInput[];
    deleteMany?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
};
export type PurchaseReturnItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseReturn: Prisma.PurchaseReturnCreateNestedOneWithoutItemsInput;
    taxCode?: Prisma.TaxCodeCreateNestedOneWithoutPurchaseReturnItemsInput;
};
export type PurchaseReturnItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    returnId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: string | null;
};
export type PurchaseReturnItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput>;
};
export type PurchaseReturnItemCreateManyTenantInputEnvelope = {
    data: Prisma.PurchaseReturnItemCreateManyTenantInput | Prisma.PurchaseReturnItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReturnItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseReturnItemUpdateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTenantInput>;
};
export type PurchaseReturnItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateWithoutTenantInput, Prisma.PurchaseReturnItemUncheckedUpdateWithoutTenantInput>;
};
export type PurchaseReturnItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.PurchaseReturnItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateManyMutationInput, Prisma.PurchaseReturnItemUncheckedUpdateManyWithoutTenantInput>;
};
export type PurchaseReturnItemScalarWhereInput = {
    AND?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
    OR?: Prisma.PurchaseReturnItemScalarWhereInput[];
    NOT?: Prisma.PurchaseReturnItemScalarWhereInput | Prisma.PurchaseReturnItemScalarWhereInput[];
    id?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    returnId?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseReturnItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    receiptLineNo?: Prisma.IntNullableFilter<"PurchaseReturnItem"> | number | null;
    description?: Prisma.StringFilter<"PurchaseReturnItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
    unitPrice?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFilter<"PurchaseReturnItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.StringNullableFilter<"PurchaseReturnItem"> | string | null;
};
export type PurchaseReturnItemCreateWithoutPurchaseReturnInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseReturnItemsInput;
    taxCode?: Prisma.TaxCodeCreateNestedOneWithoutPurchaseReturnItemsInput;
};
export type PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: string | null;
};
export type PurchaseReturnItemCreateOrConnectWithoutPurchaseReturnInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput>;
};
export type PurchaseReturnItemCreateManyPurchaseReturnInputEnvelope = {
    data: Prisma.PurchaseReturnItemCreateManyPurchaseReturnInput | Prisma.PurchaseReturnItemCreateManyPurchaseReturnInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReturnItemUpsertWithWhereUniqueWithoutPurchaseReturnInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseReturnItemUpdateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedUpdateWithoutPurchaseReturnInput>;
    create: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutPurchaseReturnInput>;
};
export type PurchaseReturnItemUpdateWithWhereUniqueWithoutPurchaseReturnInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateWithoutPurchaseReturnInput, Prisma.PurchaseReturnItemUncheckedUpdateWithoutPurchaseReturnInput>;
};
export type PurchaseReturnItemUpdateManyWithWhereWithoutPurchaseReturnInput = {
    where: Prisma.PurchaseReturnItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateManyMutationInput, Prisma.PurchaseReturnItemUncheckedUpdateManyWithoutPurchaseReturnInput>;
};
export type PurchaseReturnItemCreateWithoutTaxCodeInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseReturnItemsInput;
    purchaseReturn: Prisma.PurchaseReturnCreateNestedOneWithoutItemsInput;
};
export type PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput = {
    id?: string;
    tenantId: string;
    returnId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseReturnItemCreateOrConnectWithoutTaxCodeInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput>;
};
export type PurchaseReturnItemCreateManyTaxCodeInputEnvelope = {
    data: Prisma.PurchaseReturnItemCreateManyTaxCodeInput | Prisma.PurchaseReturnItemCreateManyTaxCodeInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReturnItemUpsertWithWhereUniqueWithoutTaxCodeInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseReturnItemUpdateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedUpdateWithoutTaxCodeInput>;
    create: Prisma.XOR<Prisma.PurchaseReturnItemCreateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedCreateWithoutTaxCodeInput>;
};
export type PurchaseReturnItemUpdateWithWhereUniqueWithoutTaxCodeInput = {
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateWithoutTaxCodeInput, Prisma.PurchaseReturnItemUncheckedUpdateWithoutTaxCodeInput>;
};
export type PurchaseReturnItemUpdateManyWithWhereWithoutTaxCodeInput = {
    where: Prisma.PurchaseReturnItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateManyMutationInput, Prisma.PurchaseReturnItemUncheckedUpdateManyWithoutTaxCodeInput>;
};
export type PurchaseReturnItemCreateManyTenantInput = {
    id?: string;
    returnId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: string | null;
};
export type PurchaseReturnItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseReturn?: Prisma.PurchaseReturnUpdateOneRequiredWithoutItemsNestedInput;
    taxCode?: Prisma.TaxCodeUpdateOneWithoutPurchaseReturnItemsNestedInput;
};
export type PurchaseReturnItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PurchaseReturnItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PurchaseReturnItemCreateManyPurchaseReturnInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: string | null;
};
export type PurchaseReturnItemUpdateWithoutPurchaseReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseReturnItemsNestedInput;
    taxCode?: Prisma.TaxCodeUpdateOneWithoutPurchaseReturnItemsNestedInput;
};
export type PurchaseReturnItemUncheckedUpdateWithoutPurchaseReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PurchaseReturnItemUncheckedUpdateManyWithoutPurchaseReturnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PurchaseReturnItemCreateManyTaxCodeInput = {
    id?: string;
    tenantId: string;
    returnId: string;
    lineNo: number;
    itemId?: string | null;
    receiptLineNo?: number | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseReturnItemUpdateWithoutTaxCodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseReturnItemsNestedInput;
    purchaseReturn?: Prisma.PurchaseReturnUpdateOneRequiredWithoutItemsNestedInput;
};
export type PurchaseReturnItemUncheckedUpdateWithoutTaxCodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseReturnItemUncheckedUpdateManyWithoutTaxCodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    returnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receiptLineNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseReturnItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    returnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    receiptLineNo?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    amount?: boolean;
    taxCodeId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    purchaseReturn?: boolean | Prisma.PurchaseReturnDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReturnItem"]>;
export type PurchaseReturnItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    returnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    receiptLineNo?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    amount?: boolean;
    taxCodeId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    purchaseReturn?: boolean | Prisma.PurchaseReturnDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReturnItem"]>;
export type PurchaseReturnItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    returnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    receiptLineNo?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    amount?: boolean;
    taxCodeId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    purchaseReturn?: boolean | Prisma.PurchaseReturnDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseReturnItem"]>;
export type PurchaseReturnItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    returnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    receiptLineNo?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    amount?: boolean;
    taxCodeId?: boolean;
};
export type PurchaseReturnItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "returnId" | "lineNo" | "itemId" | "receiptLineNo" | "description" | "qty" | "uomCode" | "unitPrice" | "amount" | "taxCodeId", ExtArgs["result"]["purchaseReturnItem"]>;
export type PurchaseReturnItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    purchaseReturn?: boolean | Prisma.PurchaseReturnDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs>;
};
export type PurchaseReturnItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    purchaseReturn?: boolean | Prisma.PurchaseReturnDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs>;
};
export type PurchaseReturnItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    purchaseReturn?: boolean | Prisma.PurchaseReturnDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs>;
};
export type $PurchaseReturnItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PurchaseReturnItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        purchaseReturn: Prisma.$PurchaseReturnPayload<ExtArgs>;
        taxCode: Prisma.$TaxCodePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        returnId: string;
        lineNo: number;
        itemId: string | null;
        receiptLineNo: number | null;
        description: string;
        qty: runtime.Decimal;
        uomCode: string | null;
        unitPrice: runtime.Decimal;
        amount: runtime.Decimal;
        taxCodeId: string | null;
    }, ExtArgs["result"]["purchaseReturnItem"]>;
    composites: {};
};
export type PurchaseReturnItemGetPayload<S extends boolean | null | undefined | PurchaseReturnItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload, S>;
export type PurchaseReturnItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PurchaseReturnItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PurchaseReturnItemCountAggregateInputType | true;
};
export interface PurchaseReturnItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PurchaseReturnItem'];
        meta: {
            name: 'PurchaseReturnItem';
        };
    };
    findUnique<T extends PurchaseReturnItemFindUniqueArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PurchaseReturnItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PurchaseReturnItemFindFirstArgs>(args?: Prisma.SelectSubset<T, PurchaseReturnItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PurchaseReturnItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PurchaseReturnItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PurchaseReturnItemFindManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReturnItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PurchaseReturnItemCreateArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemCreateArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PurchaseReturnItemCreateManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReturnItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PurchaseReturnItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PurchaseReturnItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PurchaseReturnItemDeleteArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemDeleteArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PurchaseReturnItemUpdateArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemUpdateArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PurchaseReturnItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, PurchaseReturnItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PurchaseReturnItemUpdateManyArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PurchaseReturnItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PurchaseReturnItemUpsertArgs>(args: Prisma.SelectSubset<T, PurchaseReturnItemUpsertArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PurchaseReturnItemCountArgs>(args?: Prisma.Subset<T, PurchaseReturnItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PurchaseReturnItemCountAggregateOutputType> : number>;
    aggregate<T extends PurchaseReturnItemAggregateArgs>(args: Prisma.Subset<T, PurchaseReturnItemAggregateArgs>): Prisma.PrismaPromise<GetPurchaseReturnItemAggregateType<T>>;
    groupBy<T extends PurchaseReturnItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PurchaseReturnItemGroupByArgs['orderBy'];
    } : {
        orderBy?: PurchaseReturnItemGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PurchaseReturnItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseReturnItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PurchaseReturnItemFieldRefs;
}
export interface Prisma__PurchaseReturnItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    purchaseReturn<T extends Prisma.PurchaseReturnDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseReturnDefaultArgs<ExtArgs>>): Prisma.Prisma__PurchaseReturnClient<runtime.Types.Result.GetResult<Prisma.$PurchaseReturnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    taxCode<T extends Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseReturnItem$taxCodeArgs<ExtArgs>>): Prisma.Prisma__TaxCodeClient<runtime.Types.Result.GetResult<Prisma.$TaxCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PurchaseReturnItemFieldRefs {
    readonly id: Prisma.FieldRef<"PurchaseReturnItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"PurchaseReturnItem", 'String'>;
    readonly returnId: Prisma.FieldRef<"PurchaseReturnItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"PurchaseReturnItem", 'Int'>;
    readonly itemId: Prisma.FieldRef<"PurchaseReturnItem", 'String'>;
    readonly receiptLineNo: Prisma.FieldRef<"PurchaseReturnItem", 'Int'>;
    readonly description: Prisma.FieldRef<"PurchaseReturnItem", 'String'>;
    readonly qty: Prisma.FieldRef<"PurchaseReturnItem", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"PurchaseReturnItem", 'String'>;
    readonly unitPrice: Prisma.FieldRef<"PurchaseReturnItem", 'Decimal'>;
    readonly amount: Prisma.FieldRef<"PurchaseReturnItem", 'Decimal'>;
    readonly taxCodeId: Prisma.FieldRef<"PurchaseReturnItem", 'String'>;
}
export type PurchaseReturnItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
};
export type PurchaseReturnItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
};
export type PurchaseReturnItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseReturnItemWhereInput;
    orderBy?: Prisma.PurchaseReturnItemOrderByWithRelationInput | Prisma.PurchaseReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseReturnItemScalarFieldEnum | Prisma.PurchaseReturnItemScalarFieldEnum[];
};
export type PurchaseReturnItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseReturnItemWhereInput;
    orderBy?: Prisma.PurchaseReturnItemOrderByWithRelationInput | Prisma.PurchaseReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseReturnItemScalarFieldEnum | Prisma.PurchaseReturnItemScalarFieldEnum[];
};
export type PurchaseReturnItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseReturnItemWhereInput;
    orderBy?: Prisma.PurchaseReturnItemOrderByWithRelationInput | Prisma.PurchaseReturnItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseReturnItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseReturnItemScalarFieldEnum | Prisma.PurchaseReturnItemScalarFieldEnum[];
};
export type PurchaseReturnItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReturnItemCreateInput, Prisma.PurchaseReturnItemUncheckedCreateInput>;
};
export type PurchaseReturnItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PurchaseReturnItemCreateManyInput | Prisma.PurchaseReturnItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PurchaseReturnItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    data: Prisma.PurchaseReturnItemCreateManyInput | Prisma.PurchaseReturnItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PurchaseReturnItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PurchaseReturnItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateInput, Prisma.PurchaseReturnItemUncheckedUpdateInput>;
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
};
export type PurchaseReturnItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateManyMutationInput, Prisma.PurchaseReturnItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseReturnItemWhereInput;
    limit?: number;
};
export type PurchaseReturnItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseReturnItemUpdateManyMutationInput, Prisma.PurchaseReturnItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseReturnItemWhereInput;
    limit?: number;
    include?: Prisma.PurchaseReturnItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PurchaseReturnItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseReturnItemCreateInput, Prisma.PurchaseReturnItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PurchaseReturnItemUpdateInput, Prisma.PurchaseReturnItemUncheckedUpdateInput>;
};
export type PurchaseReturnItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseReturnItemWhereUniqueInput;
};
export type PurchaseReturnItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseReturnItemWhereInput;
    limit?: number;
};
export type PurchaseReturnItem$taxCodeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxCodeSelect<ExtArgs> | null;
    omit?: Prisma.TaxCodeOmit<ExtArgs> | null;
    include?: Prisma.TaxCodeInclude<ExtArgs> | null;
    where?: Prisma.TaxCodeWhereInput;
};
export type PurchaseReturnItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseReturnItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseReturnItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseReturnItemInclude<ExtArgs> | null;
};
