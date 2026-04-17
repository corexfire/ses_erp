import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PurchaseOrderItemModel = runtime.Types.Result.DefaultSelection<Prisma.$PurchaseOrderItemPayload>;
export type AggregatePurchaseOrderItem = {
    _count: PurchaseOrderItemCountAggregateOutputType | null;
    _avg: PurchaseOrderItemAvgAggregateOutputType | null;
    _sum: PurchaseOrderItemSumAggregateOutputType | null;
    _min: PurchaseOrderItemMinAggregateOutputType | null;
    _max: PurchaseOrderItemMaxAggregateOutputType | null;
};
export type PurchaseOrderItemAvgAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    amount: runtime.Decimal | null;
};
export type PurchaseOrderItemSumAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    unitPrice: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    amount: runtime.Decimal | null;
};
export type PurchaseOrderItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    orderId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    unitPrice: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    taxCodeId: string | null;
    amount: runtime.Decimal | null;
};
export type PurchaseOrderItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    orderId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    unitPrice: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    taxCodeId: string | null;
    amount: runtime.Decimal | null;
};
export type PurchaseOrderItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    orderId: number;
    lineNo: number;
    itemId: number;
    description: number;
    qty: number;
    uomCode: number;
    unitPrice: number;
    discount: number;
    taxCodeId: number;
    amount: number;
    _all: number;
};
export type PurchaseOrderItemAvgAggregateInputType = {
    lineNo?: true;
    qty?: true;
    unitPrice?: true;
    discount?: true;
    amount?: true;
};
export type PurchaseOrderItemSumAggregateInputType = {
    lineNo?: true;
    qty?: true;
    unitPrice?: true;
    discount?: true;
    amount?: true;
};
export type PurchaseOrderItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    orderId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    unitPrice?: true;
    discount?: true;
    taxCodeId?: true;
    amount?: true;
};
export type PurchaseOrderItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    orderId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    unitPrice?: true;
    discount?: true;
    taxCodeId?: true;
    amount?: true;
};
export type PurchaseOrderItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    orderId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    unitPrice?: true;
    discount?: true;
    taxCodeId?: true;
    amount?: true;
    _all?: true;
};
export type PurchaseOrderItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseOrderItemWhereInput;
    orderBy?: Prisma.PurchaseOrderItemOrderByWithRelationInput | Prisma.PurchaseOrderItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseOrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PurchaseOrderItemCountAggregateInputType;
    _avg?: PurchaseOrderItemAvgAggregateInputType;
    _sum?: PurchaseOrderItemSumAggregateInputType;
    _min?: PurchaseOrderItemMinAggregateInputType;
    _max?: PurchaseOrderItemMaxAggregateInputType;
};
export type GetPurchaseOrderItemAggregateType<T extends PurchaseOrderItemAggregateArgs> = {
    [P in keyof T & keyof AggregatePurchaseOrderItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePurchaseOrderItem[P]> : Prisma.GetScalarType<T[P], AggregatePurchaseOrderItem[P]>;
};
export type PurchaseOrderItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseOrderItemWhereInput;
    orderBy?: Prisma.PurchaseOrderItemOrderByWithAggregationInput | Prisma.PurchaseOrderItemOrderByWithAggregationInput[];
    by: Prisma.PurchaseOrderItemScalarFieldEnum[] | Prisma.PurchaseOrderItemScalarFieldEnum;
    having?: Prisma.PurchaseOrderItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PurchaseOrderItemCountAggregateInputType | true;
    _avg?: PurchaseOrderItemAvgAggregateInputType;
    _sum?: PurchaseOrderItemSumAggregateInputType;
    _min?: PurchaseOrderItemMinAggregateInputType;
    _max?: PurchaseOrderItemMaxAggregateInputType;
};
export type PurchaseOrderItemGroupByOutputType = {
    id: string;
    tenantId: string;
    orderId: string;
    lineNo: number;
    itemId: string | null;
    description: string;
    qty: runtime.Decimal;
    uomCode: string | null;
    unitPrice: runtime.Decimal;
    discount: runtime.Decimal | null;
    taxCodeId: string | null;
    amount: runtime.Decimal;
    _count: PurchaseOrderItemCountAggregateOutputType | null;
    _avg: PurchaseOrderItemAvgAggregateOutputType | null;
    _sum: PurchaseOrderItemSumAggregateOutputType | null;
    _min: PurchaseOrderItemMinAggregateOutputType | null;
    _max: PurchaseOrderItemMaxAggregateOutputType | null;
};
export type GetPurchaseOrderItemGroupByPayload<T extends PurchaseOrderItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PurchaseOrderItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PurchaseOrderItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PurchaseOrderItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PurchaseOrderItemGroupByOutputType[P]>;
}>>;
export type PurchaseOrderItemWhereInput = {
    AND?: Prisma.PurchaseOrderItemWhereInput | Prisma.PurchaseOrderItemWhereInput[];
    OR?: Prisma.PurchaseOrderItemWhereInput[];
    NOT?: Prisma.PurchaseOrderItemWhereInput | Prisma.PurchaseOrderItemWhereInput[];
    id?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    orderId?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseOrderItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    description?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    unitPrice?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.DecimalNullableFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    amount?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    order?: Prisma.XOR<Prisma.PurchaseOrderScalarRelationFilter, Prisma.PurchaseOrderWhereInput>;
    taxCode?: Prisma.XOR<Prisma.TaxCodeNullableScalarRelationFilter, Prisma.TaxCodeWhereInput> | null;
};
export type PurchaseOrderItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    discount?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    order?: Prisma.PurchaseOrderOrderByWithRelationInput;
    taxCode?: Prisma.TaxCodeOrderByWithRelationInput;
};
export type PurchaseOrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_orderId_lineNo?: Prisma.PurchaseOrderItemTenantIdOrderIdLineNoCompoundUniqueInput;
    AND?: Prisma.PurchaseOrderItemWhereInput | Prisma.PurchaseOrderItemWhereInput[];
    OR?: Prisma.PurchaseOrderItemWhereInput[];
    NOT?: Prisma.PurchaseOrderItemWhereInput | Prisma.PurchaseOrderItemWhereInput[];
    tenantId?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    orderId?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseOrderItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    description?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    unitPrice?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.DecimalNullableFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    amount?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    order?: Prisma.XOR<Prisma.PurchaseOrderScalarRelationFilter, Prisma.PurchaseOrderWhereInput>;
    taxCode?: Prisma.XOR<Prisma.TaxCodeNullableScalarRelationFilter, Prisma.TaxCodeWhereInput> | null;
}, "id" | "tenantId_orderId_lineNo">;
export type PurchaseOrderItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    discount?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    _count?: Prisma.PurchaseOrderItemCountOrderByAggregateInput;
    _avg?: Prisma.PurchaseOrderItemAvgOrderByAggregateInput;
    _max?: Prisma.PurchaseOrderItemMaxOrderByAggregateInput;
    _min?: Prisma.PurchaseOrderItemMinOrderByAggregateInput;
    _sum?: Prisma.PurchaseOrderItemSumOrderByAggregateInput;
};
export type PurchaseOrderItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.PurchaseOrderItemScalarWhereWithAggregatesInput | Prisma.PurchaseOrderItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.PurchaseOrderItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PurchaseOrderItemScalarWhereWithAggregatesInput | Prisma.PurchaseOrderItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PurchaseOrderItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"PurchaseOrderItem"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"PurchaseOrderItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"PurchaseOrderItem"> | number;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"PurchaseOrderItem"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"PurchaseOrderItem"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"PurchaseOrderItem"> | string | null;
    unitPrice?: Prisma.DecimalWithAggregatesFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.DecimalNullableWithAggregatesFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.StringNullableWithAggregatesFilter<"PurchaseOrderItem"> | string | null;
    amount?: Prisma.DecimalWithAggregatesFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseOrderItemsInput;
    order: Prisma.PurchaseOrderCreateNestedOneWithoutItemsInput;
    taxCode?: Prisma.TaxCodeCreateNestedOneWithoutPurchaseOrderItemsInput;
};
export type PurchaseOrderItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    orderId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseOrderItemsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneRequiredWithoutItemsNestedInput;
    taxCode?: Prisma.TaxCodeUpdateOneWithoutPurchaseOrderItemsNestedInput;
};
export type PurchaseOrderItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateManyInput = {
    id?: string;
    tenantId: string;
    orderId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemListRelationFilter = {
    every?: Prisma.PurchaseOrderItemWhereInput;
    some?: Prisma.PurchaseOrderItemWhereInput;
    none?: Prisma.PurchaseOrderItemWhereInput;
};
export type PurchaseOrderItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PurchaseOrderItemTenantIdOrderIdLineNoCompoundUniqueInput = {
    tenantId: string;
    orderId: string;
    lineNo: number;
};
export type PurchaseOrderItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type PurchaseOrderItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type PurchaseOrderItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type PurchaseOrderItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    taxCodeId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type PurchaseOrderItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type PurchaseOrderItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseOrderItemCreateWithoutTenantInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
};
export type PurchaseOrderItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseOrderItemCreateWithoutTenantInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
};
export type PurchaseOrderItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseOrderItemCreateWithoutTenantInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    delete?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    update?: Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
};
export type PurchaseOrderItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseOrderItemCreateWithoutTenantInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    delete?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    update?: Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
};
export type PurchaseOrderItemCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput> | Prisma.PurchaseOrderItemCreateWithoutOrderInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyOrderInputEnvelope;
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
};
export type PurchaseOrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput> | Prisma.PurchaseOrderItemCreateWithoutOrderInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyOrderInputEnvelope;
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
};
export type PurchaseOrderItemUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput> | Prisma.PurchaseOrderItemCreateWithoutOrderInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutOrderInput | Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyOrderInputEnvelope;
    set?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    delete?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    update?: Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutOrderInput | Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutOrderInput | Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
};
export type PurchaseOrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput> | Prisma.PurchaseOrderItemCreateWithoutOrderInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutOrderInput | Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyOrderInputEnvelope;
    set?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    delete?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    update?: Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutOrderInput | Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutOrderInput | Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
};
export type PurchaseOrderItemCreateNestedManyWithoutTaxCodeInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTaxCodeInputEnvelope;
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
};
export type PurchaseOrderItemUncheckedCreateNestedManyWithoutTaxCodeInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTaxCodeInputEnvelope;
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
};
export type PurchaseOrderItemUpdateManyWithoutTaxCodeNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput[];
    upsert?: Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTaxCodeInputEnvelope;
    set?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    delete?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    update?: Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTaxCodeInput[];
    updateMany?: Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTaxCodeInput | Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTaxCodeInput[];
    deleteMany?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
};
export type PurchaseOrderItemUncheckedUpdateManyWithoutTaxCodeNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput> | Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput[] | Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput[];
    connectOrCreate?: Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput | Prisma.PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput[];
    upsert?: Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseOrderItemUpsertWithWhereUniqueWithoutTaxCodeInput[];
    createMany?: Prisma.PurchaseOrderItemCreateManyTaxCodeInputEnvelope;
    set?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    delete?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    connect?: Prisma.PurchaseOrderItemWhereUniqueInput | Prisma.PurchaseOrderItemWhereUniqueInput[];
    update?: Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTaxCodeInput | Prisma.PurchaseOrderItemUpdateWithWhereUniqueWithoutTaxCodeInput[];
    updateMany?: Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTaxCodeInput | Prisma.PurchaseOrderItemUpdateManyWithWhereWithoutTaxCodeInput[];
    deleteMany?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
};
export type PurchaseOrderItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    order: Prisma.PurchaseOrderCreateNestedOneWithoutItemsInput;
    taxCode?: Prisma.TaxCodeCreateNestedOneWithoutPurchaseOrderItemsInput;
};
export type PurchaseOrderItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    orderId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput>;
};
export type PurchaseOrderItemCreateManyTenantInputEnvelope = {
    data: Prisma.PurchaseOrderItemCreateManyTenantInput | Prisma.PurchaseOrderItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type PurchaseOrderItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseOrderItemUpdateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTenantInput>;
};
export type PurchaseOrderItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateWithoutTenantInput, Prisma.PurchaseOrderItemUncheckedUpdateWithoutTenantInput>;
};
export type PurchaseOrderItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.PurchaseOrderItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateManyMutationInput, Prisma.PurchaseOrderItemUncheckedUpdateManyWithoutTenantInput>;
};
export type PurchaseOrderItemScalarWhereInput = {
    AND?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
    OR?: Prisma.PurchaseOrderItemScalarWhereInput[];
    NOT?: Prisma.PurchaseOrderItemScalarWhereInput | Prisma.PurchaseOrderItemScalarWhereInput[];
    id?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    orderId?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseOrderItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    description?: Prisma.StringFilter<"PurchaseOrderItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    unitPrice?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.DecimalNullableFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.StringNullableFilter<"PurchaseOrderItem"> | string | null;
    amount?: Prisma.DecimalFilter<"PurchaseOrderItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateWithoutOrderInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseOrderItemsInput;
    taxCode?: Prisma.TaxCodeCreateNestedOneWithoutPurchaseOrderItemsInput;
};
export type PurchaseOrderItemUncheckedCreateWithoutOrderInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateOrConnectWithoutOrderInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput>;
};
export type PurchaseOrderItemCreateManyOrderInputEnvelope = {
    data: Prisma.PurchaseOrderItemCreateManyOrderInput | Prisma.PurchaseOrderItemCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type PurchaseOrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseOrderItemUpdateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutOrderInput>;
};
export type PurchaseOrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateWithoutOrderInput, Prisma.PurchaseOrderItemUncheckedUpdateWithoutOrderInput>;
};
export type PurchaseOrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.PurchaseOrderItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateManyMutationInput, Prisma.PurchaseOrderItemUncheckedUpdateManyWithoutOrderInput>;
};
export type PurchaseOrderItemCreateWithoutTaxCodeInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseOrderItemsInput;
    order: Prisma.PurchaseOrderCreateNestedOneWithoutItemsInput;
};
export type PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput = {
    id?: string;
    tenantId: string;
    orderId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateOrConnectWithoutTaxCodeInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput>;
};
export type PurchaseOrderItemCreateManyTaxCodeInputEnvelope = {
    data: Prisma.PurchaseOrderItemCreateManyTaxCodeInput | Prisma.PurchaseOrderItemCreateManyTaxCodeInput[];
    skipDuplicates?: boolean;
};
export type PurchaseOrderItemUpsertWithWhereUniqueWithoutTaxCodeInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseOrderItemUpdateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedUpdateWithoutTaxCodeInput>;
    create: Prisma.XOR<Prisma.PurchaseOrderItemCreateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedCreateWithoutTaxCodeInput>;
};
export type PurchaseOrderItemUpdateWithWhereUniqueWithoutTaxCodeInput = {
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateWithoutTaxCodeInput, Prisma.PurchaseOrderItemUncheckedUpdateWithoutTaxCodeInput>;
};
export type PurchaseOrderItemUpdateManyWithWhereWithoutTaxCodeInput = {
    where: Prisma.PurchaseOrderItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateManyMutationInput, Prisma.PurchaseOrderItemUncheckedUpdateManyWithoutTaxCodeInput>;
};
export type PurchaseOrderItemCreateManyTenantInput = {
    id?: string;
    orderId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    order?: Prisma.PurchaseOrderUpdateOneRequiredWithoutItemsNestedInput;
    taxCode?: Prisma.TaxCodeUpdateOneWithoutPurchaseOrderItemsNestedInput;
};
export type PurchaseOrderItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateManyOrderInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseOrderItemsNestedInput;
    taxCode?: Prisma.TaxCodeUpdateOneWithoutPurchaseOrderItemsNestedInput;
};
export type PurchaseOrderItemUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    taxCodeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemCreateManyTaxCodeInput = {
    id?: string;
    tenantId: string;
    orderId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUpdateWithoutTaxCodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseOrderItemsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneRequiredWithoutItemsNestedInput;
};
export type PurchaseOrderItemUncheckedUpdateWithoutTaxCodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemUncheckedUpdateManyWithoutTaxCodeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type PurchaseOrderItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    orderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    discount?: boolean;
    taxCodeId?: boolean;
    amount?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseOrderItem"]>;
export type PurchaseOrderItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    orderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    discount?: boolean;
    taxCodeId?: boolean;
    amount?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseOrderItem"]>;
export type PurchaseOrderItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    orderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    discount?: boolean;
    taxCodeId?: boolean;
    amount?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseOrderItem"]>;
export type PurchaseOrderItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    orderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    unitPrice?: boolean;
    discount?: boolean;
    taxCodeId?: boolean;
    amount?: boolean;
};
export type PurchaseOrderItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "orderId" | "lineNo" | "itemId" | "description" | "qty" | "uomCode" | "unitPrice" | "discount" | "taxCodeId" | "amount", ExtArgs["result"]["purchaseOrderItem"]>;
export type PurchaseOrderItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs>;
};
export type PurchaseOrderItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs>;
};
export type PurchaseOrderItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    taxCode?: boolean | Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs>;
};
export type $PurchaseOrderItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PurchaseOrderItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        order: Prisma.$PurchaseOrderPayload<ExtArgs>;
        taxCode: Prisma.$TaxCodePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        orderId: string;
        lineNo: number;
        itemId: string | null;
        description: string;
        qty: runtime.Decimal;
        uomCode: string | null;
        unitPrice: runtime.Decimal;
        discount: runtime.Decimal | null;
        taxCodeId: string | null;
        amount: runtime.Decimal;
    }, ExtArgs["result"]["purchaseOrderItem"]>;
    composites: {};
};
export type PurchaseOrderItemGetPayload<S extends boolean | null | undefined | PurchaseOrderItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload, S>;
export type PurchaseOrderItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PurchaseOrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PurchaseOrderItemCountAggregateInputType | true;
};
export interface PurchaseOrderItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PurchaseOrderItem'];
        meta: {
            name: 'PurchaseOrderItem';
        };
    };
    findUnique<T extends PurchaseOrderItemFindUniqueArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PurchaseOrderItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PurchaseOrderItemFindFirstArgs>(args?: Prisma.SelectSubset<T, PurchaseOrderItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PurchaseOrderItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PurchaseOrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PurchaseOrderItemFindManyArgs>(args?: Prisma.SelectSubset<T, PurchaseOrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PurchaseOrderItemCreateArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemCreateArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PurchaseOrderItemCreateManyArgs>(args?: Prisma.SelectSubset<T, PurchaseOrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PurchaseOrderItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PurchaseOrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PurchaseOrderItemDeleteArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemDeleteArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PurchaseOrderItemUpdateArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemUpdateArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PurchaseOrderItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, PurchaseOrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PurchaseOrderItemUpdateManyArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PurchaseOrderItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PurchaseOrderItemUpsertArgs>(args: Prisma.SelectSubset<T, PurchaseOrderItemUpsertArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PurchaseOrderItemCountArgs>(args?: Prisma.Subset<T, PurchaseOrderItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PurchaseOrderItemCountAggregateOutputType> : number>;
    aggregate<T extends PurchaseOrderItemAggregateArgs>(args: Prisma.Subset<T, PurchaseOrderItemAggregateArgs>): Prisma.PrismaPromise<GetPurchaseOrderItemAggregateType<T>>;
    groupBy<T extends PurchaseOrderItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PurchaseOrderItemGroupByArgs['orderBy'];
    } : {
        orderBy?: PurchaseOrderItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PurchaseOrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PurchaseOrderItemFieldRefs;
}
export interface Prisma__PurchaseOrderItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.PurchaseOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    taxCode<T extends Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseOrderItem$taxCodeArgs<ExtArgs>>): Prisma.Prisma__TaxCodeClient<runtime.Types.Result.GetResult<Prisma.$TaxCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PurchaseOrderItemFieldRefs {
    readonly id: Prisma.FieldRef<"PurchaseOrderItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"PurchaseOrderItem", 'String'>;
    readonly orderId: Prisma.FieldRef<"PurchaseOrderItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"PurchaseOrderItem", 'Int'>;
    readonly itemId: Prisma.FieldRef<"PurchaseOrderItem", 'String'>;
    readonly description: Prisma.FieldRef<"PurchaseOrderItem", 'String'>;
    readonly qty: Prisma.FieldRef<"PurchaseOrderItem", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"PurchaseOrderItem", 'String'>;
    readonly unitPrice: Prisma.FieldRef<"PurchaseOrderItem", 'Decimal'>;
    readonly discount: Prisma.FieldRef<"PurchaseOrderItem", 'Decimal'>;
    readonly taxCodeId: Prisma.FieldRef<"PurchaseOrderItem", 'String'>;
    readonly amount: Prisma.FieldRef<"PurchaseOrderItem", 'Decimal'>;
}
export type PurchaseOrderItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
};
export type PurchaseOrderItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
};
export type PurchaseOrderItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseOrderItemWhereInput;
    orderBy?: Prisma.PurchaseOrderItemOrderByWithRelationInput | Prisma.PurchaseOrderItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseOrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseOrderItemScalarFieldEnum | Prisma.PurchaseOrderItemScalarFieldEnum[];
};
export type PurchaseOrderItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseOrderItemWhereInput;
    orderBy?: Prisma.PurchaseOrderItemOrderByWithRelationInput | Prisma.PurchaseOrderItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseOrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseOrderItemScalarFieldEnum | Prisma.PurchaseOrderItemScalarFieldEnum[];
};
export type PurchaseOrderItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseOrderItemWhereInput;
    orderBy?: Prisma.PurchaseOrderItemOrderByWithRelationInput | Prisma.PurchaseOrderItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseOrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseOrderItemScalarFieldEnum | Prisma.PurchaseOrderItemScalarFieldEnum[];
};
export type PurchaseOrderItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseOrderItemCreateInput, Prisma.PurchaseOrderItemUncheckedCreateInput>;
};
export type PurchaseOrderItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PurchaseOrderItemCreateManyInput | Prisma.PurchaseOrderItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PurchaseOrderItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    data: Prisma.PurchaseOrderItemCreateManyInput | Prisma.PurchaseOrderItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PurchaseOrderItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PurchaseOrderItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateInput, Prisma.PurchaseOrderItemUncheckedUpdateInput>;
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
};
export type PurchaseOrderItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateManyMutationInput, Prisma.PurchaseOrderItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseOrderItemWhereInput;
    limit?: number;
};
export type PurchaseOrderItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseOrderItemUpdateManyMutationInput, Prisma.PurchaseOrderItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseOrderItemWhereInput;
    limit?: number;
    include?: Prisma.PurchaseOrderItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PurchaseOrderItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseOrderItemCreateInput, Prisma.PurchaseOrderItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PurchaseOrderItemUpdateInput, Prisma.PurchaseOrderItemUncheckedUpdateInput>;
};
export type PurchaseOrderItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseOrderItemWhereUniqueInput;
};
export type PurchaseOrderItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseOrderItemWhereInput;
    limit?: number;
};
export type PurchaseOrderItem$taxCodeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxCodeSelect<ExtArgs> | null;
    omit?: Prisma.TaxCodeOmit<ExtArgs> | null;
    include?: Prisma.TaxCodeInclude<ExtArgs> | null;
    where?: Prisma.TaxCodeWhereInput;
};
export type PurchaseOrderItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderItemInclude<ExtArgs> | null;
};
