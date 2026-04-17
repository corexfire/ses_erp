import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PutawayItemModel = runtime.Types.Result.DefaultSelection<Prisma.$PutawayItemPayload>;
export type AggregatePutawayItem = {
    _count: PutawayItemCountAggregateOutputType | null;
    _avg: PutawayItemAvgAggregateOutputType | null;
    _sum: PutawayItemSumAggregateOutputType | null;
    _min: PutawayItemMinAggregateOutputType | null;
    _max: PutawayItemMaxAggregateOutputType | null;
};
export type PutawayItemAvgAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
};
export type PutawayItemSumAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
};
export type PutawayItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    putawayId: string | null;
    lineNo: number | null;
    grnItemId: string | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    fromBinLocationId: string | null;
    toBinLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
};
export type PutawayItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    putawayId: string | null;
    lineNo: number | null;
    grnItemId: string | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    fromBinLocationId: string | null;
    toBinLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
};
export type PutawayItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    putawayId: number;
    lineNo: number;
    grnItemId: number;
    itemId: number;
    description: number;
    qty: number;
    fromBinLocationId: number;
    toBinLocationId: number;
    batchCode: number;
    serialNo: number;
    _all: number;
};
export type PutawayItemAvgAggregateInputType = {
    lineNo?: true;
    qty?: true;
};
export type PutawayItemSumAggregateInputType = {
    lineNo?: true;
    qty?: true;
};
export type PutawayItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    putawayId?: true;
    lineNo?: true;
    grnItemId?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    fromBinLocationId?: true;
    toBinLocationId?: true;
    batchCode?: true;
    serialNo?: true;
};
export type PutawayItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    putawayId?: true;
    lineNo?: true;
    grnItemId?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    fromBinLocationId?: true;
    toBinLocationId?: true;
    batchCode?: true;
    serialNo?: true;
};
export type PutawayItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    putawayId?: true;
    lineNo?: true;
    grnItemId?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    fromBinLocationId?: true;
    toBinLocationId?: true;
    batchCode?: true;
    serialNo?: true;
    _all?: true;
};
export type PutawayItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PutawayItemWhereInput;
    orderBy?: Prisma.PutawayItemOrderByWithRelationInput | Prisma.PutawayItemOrderByWithRelationInput[];
    cursor?: Prisma.PutawayItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PutawayItemCountAggregateInputType;
    _avg?: PutawayItemAvgAggregateInputType;
    _sum?: PutawayItemSumAggregateInputType;
    _min?: PutawayItemMinAggregateInputType;
    _max?: PutawayItemMaxAggregateInputType;
};
export type GetPutawayItemAggregateType<T extends PutawayItemAggregateArgs> = {
    [P in keyof T & keyof AggregatePutawayItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePutawayItem[P]> : Prisma.GetScalarType<T[P], AggregatePutawayItem[P]>;
};
export type PutawayItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PutawayItemWhereInput;
    orderBy?: Prisma.PutawayItemOrderByWithAggregationInput | Prisma.PutawayItemOrderByWithAggregationInput[];
    by: Prisma.PutawayItemScalarFieldEnum[] | Prisma.PutawayItemScalarFieldEnum;
    having?: Prisma.PutawayItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PutawayItemCountAggregateInputType | true;
    _avg?: PutawayItemAvgAggregateInputType;
    _sum?: PutawayItemSumAggregateInputType;
    _min?: PutawayItemMinAggregateInputType;
    _max?: PutawayItemMaxAggregateInputType;
};
export type PutawayItemGroupByOutputType = {
    id: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId: string | null;
    itemId: string | null;
    description: string;
    qty: runtime.Decimal;
    fromBinLocationId: string | null;
    toBinLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
    _count: PutawayItemCountAggregateOutputType | null;
    _avg: PutawayItemAvgAggregateOutputType | null;
    _sum: PutawayItemSumAggregateOutputType | null;
    _min: PutawayItemMinAggregateOutputType | null;
    _max: PutawayItemMaxAggregateOutputType | null;
};
export type GetPutawayItemGroupByPayload<T extends PutawayItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PutawayItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PutawayItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PutawayItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PutawayItemGroupByOutputType[P]>;
}>>;
export type PutawayItemWhereInput = {
    AND?: Prisma.PutawayItemWhereInput | Prisma.PutawayItemWhereInput[];
    OR?: Prisma.PutawayItemWhereInput[];
    NOT?: Prisma.PutawayItemWhereInput | Prisma.PutawayItemWhereInput[];
    id?: Prisma.StringFilter<"PutawayItem"> | string;
    tenantId?: Prisma.StringFilter<"PutawayItem"> | string;
    putawayId?: Prisma.StringFilter<"PutawayItem"> | string;
    lineNo?: Prisma.IntFilter<"PutawayItem"> | number;
    grnItemId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    itemId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    description?: Prisma.StringFilter<"PutawayItem"> | string;
    qty?: Prisma.DecimalFilter<"PutawayItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    toBinLocationId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    putaway?: Prisma.XOR<Prisma.PutawayScalarRelationFilter, Prisma.PutawayWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
    fromBinLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
    toBinLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
};
export type PutawayItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    putawayId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    grnItemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    fromBinLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    toBinLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    putaway?: Prisma.PutawayOrderByWithRelationInput;
    item?: Prisma.ItemOrderByWithRelationInput;
    fromBinLocation?: Prisma.BinLocationOrderByWithRelationInput;
    toBinLocation?: Prisma.BinLocationOrderByWithRelationInput;
};
export type PutawayItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_putawayId_lineNo?: Prisma.PutawayItemTenantIdPutawayIdLineNoCompoundUniqueInput;
    AND?: Prisma.PutawayItemWhereInput | Prisma.PutawayItemWhereInput[];
    OR?: Prisma.PutawayItemWhereInput[];
    NOT?: Prisma.PutawayItemWhereInput | Prisma.PutawayItemWhereInput[];
    tenantId?: Prisma.StringFilter<"PutawayItem"> | string;
    putawayId?: Prisma.StringFilter<"PutawayItem"> | string;
    lineNo?: Prisma.IntFilter<"PutawayItem"> | number;
    grnItemId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    itemId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    description?: Prisma.StringFilter<"PutawayItem"> | string;
    qty?: Prisma.DecimalFilter<"PutawayItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    toBinLocationId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    putaway?: Prisma.XOR<Prisma.PutawayScalarRelationFilter, Prisma.PutawayWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
    fromBinLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
    toBinLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
}, "id" | "tenantId_putawayId_lineNo">;
export type PutawayItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    putawayId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    grnItemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    fromBinLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    toBinLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PutawayItemCountOrderByAggregateInput;
    _avg?: Prisma.PutawayItemAvgOrderByAggregateInput;
    _max?: Prisma.PutawayItemMaxOrderByAggregateInput;
    _min?: Prisma.PutawayItemMinOrderByAggregateInput;
    _sum?: Prisma.PutawayItemSumOrderByAggregateInput;
};
export type PutawayItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.PutawayItemScalarWhereWithAggregatesInput | Prisma.PutawayItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.PutawayItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PutawayItemScalarWhereWithAggregatesInput | Prisma.PutawayItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PutawayItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"PutawayItem"> | string;
    putawayId?: Prisma.StringWithAggregatesFilter<"PutawayItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"PutawayItem"> | number;
    grnItemId?: Prisma.StringNullableWithAggregatesFilter<"PutawayItem"> | string | null;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"PutawayItem"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"PutawayItem"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"PutawayItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.StringNullableWithAggregatesFilter<"PutawayItem"> | string | null;
    toBinLocationId?: Prisma.StringNullableWithAggregatesFilter<"PutawayItem"> | string | null;
    batchCode?: Prisma.StringNullableWithAggregatesFilter<"PutawayItem"> | string | null;
    serialNo?: Prisma.StringNullableWithAggregatesFilter<"PutawayItem"> | string | null;
};
export type PutawayItemCreateInput = {
    id?: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPutawayItemsInput;
    putaway: Prisma.PutawayCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPutawayItemsInput;
    fromBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsFromInput;
    toBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsToInput;
};
export type PutawayItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPutawayItemsNestedInput;
    putaway?: Prisma.PutawayUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPutawayItemsNestedInput;
    fromBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsFromNestedInput;
    toBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsToNestedInput;
};
export type PutawayItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemCreateManyInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemListRelationFilter = {
    every?: Prisma.PutawayItemWhereInput;
    some?: Prisma.PutawayItemWhereInput;
    none?: Prisma.PutawayItemWhereInput;
};
export type PutawayItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PutawayItemTenantIdPutawayIdLineNoCompoundUniqueInput = {
    tenantId: string;
    putawayId: string;
    lineNo: number;
};
export type PutawayItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    putawayId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    grnItemId?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    fromBinLocationId?: Prisma.SortOrder;
    toBinLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type PutawayItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
};
export type PutawayItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    putawayId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    grnItemId?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    fromBinLocationId?: Prisma.SortOrder;
    toBinLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type PutawayItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    putawayId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    grnItemId?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    fromBinLocationId?: Prisma.SortOrder;
    toBinLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type PutawayItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
};
export type PutawayItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutTenantInput, Prisma.PutawayItemUncheckedCreateWithoutTenantInput> | Prisma.PutawayItemCreateWithoutTenantInput[] | Prisma.PutawayItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutTenantInput | Prisma.PutawayItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PutawayItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutTenantInput, Prisma.PutawayItemUncheckedCreateWithoutTenantInput> | Prisma.PutawayItemCreateWithoutTenantInput[] | Prisma.PutawayItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutTenantInput | Prisma.PutawayItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PutawayItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutTenantInput, Prisma.PutawayItemUncheckedCreateWithoutTenantInput> | Prisma.PutawayItemCreateWithoutTenantInput[] | Prisma.PutawayItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutTenantInput | Prisma.PutawayItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PutawayItemCreateManyTenantInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutTenantInput | Prisma.PutawayItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutTenantInput, Prisma.PutawayItemUncheckedCreateWithoutTenantInput> | Prisma.PutawayItemCreateWithoutTenantInput[] | Prisma.PutawayItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutTenantInput | Prisma.PutawayItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PutawayItemCreateManyTenantInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutTenantInput | Prisma.PutawayItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutItemInput, Prisma.PutawayItemUncheckedCreateWithoutItemInput> | Prisma.PutawayItemCreateWithoutItemInput[] | Prisma.PutawayItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutItemInput | Prisma.PutawayItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.PutawayItemCreateManyItemInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutItemInput, Prisma.PutawayItemUncheckedCreateWithoutItemInput> | Prisma.PutawayItemCreateWithoutItemInput[] | Prisma.PutawayItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutItemInput | Prisma.PutawayItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.PutawayItemCreateManyItemInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutItemInput, Prisma.PutawayItemUncheckedCreateWithoutItemInput> | Prisma.PutawayItemCreateWithoutItemInput[] | Prisma.PutawayItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutItemInput | Prisma.PutawayItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutItemInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.PutawayItemCreateManyItemInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutItemInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutItemInput | Prisma.PutawayItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutItemInput, Prisma.PutawayItemUncheckedCreateWithoutItemInput> | Prisma.PutawayItemCreateWithoutItemInput[] | Prisma.PutawayItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutItemInput | Prisma.PutawayItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutItemInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.PutawayItemCreateManyItemInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutItemInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutItemInput | Prisma.PutawayItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemCreateNestedManyWithoutFromBinLocationInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput> | Prisma.PutawayItemCreateWithoutFromBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyFromBinLocationInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemCreateNestedManyWithoutToBinLocationInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput> | Prisma.PutawayItemCreateWithoutToBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyToBinLocationInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUncheckedCreateNestedManyWithoutFromBinLocationInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput> | Prisma.PutawayItemCreateWithoutFromBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyFromBinLocationInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUncheckedCreateNestedManyWithoutToBinLocationInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput> | Prisma.PutawayItemCreateWithoutToBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyToBinLocationInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUpdateManyWithoutFromBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput> | Prisma.PutawayItemCreateWithoutFromBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutFromBinLocationInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutFromBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyFromBinLocationInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutFromBinLocationInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutFromBinLocationInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutFromBinLocationInput | Prisma.PutawayItemUpdateManyWithWhereWithoutFromBinLocationInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemUpdateManyWithoutToBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput> | Prisma.PutawayItemCreateWithoutToBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutToBinLocationInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutToBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyToBinLocationInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutToBinLocationInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutToBinLocationInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutToBinLocationInput | Prisma.PutawayItemUpdateManyWithWhereWithoutToBinLocationInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemUncheckedUpdateManyWithoutFromBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput> | Prisma.PutawayItemCreateWithoutFromBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutFromBinLocationInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutFromBinLocationInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutFromBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyFromBinLocationInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutFromBinLocationInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutFromBinLocationInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutFromBinLocationInput | Prisma.PutawayItemUpdateManyWithWhereWithoutFromBinLocationInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemUncheckedUpdateManyWithoutToBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput> | Prisma.PutawayItemCreateWithoutToBinLocationInput[] | Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput | Prisma.PutawayItemCreateOrConnectWithoutToBinLocationInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutToBinLocationInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutToBinLocationInput[];
    createMany?: Prisma.PutawayItemCreateManyToBinLocationInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutToBinLocationInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutToBinLocationInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutToBinLocationInput | Prisma.PutawayItemUpdateManyWithWhereWithoutToBinLocationInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemCreateNestedManyWithoutPutawayInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutPutawayInput, Prisma.PutawayItemUncheckedCreateWithoutPutawayInput> | Prisma.PutawayItemCreateWithoutPutawayInput[] | Prisma.PutawayItemUncheckedCreateWithoutPutawayInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutPutawayInput | Prisma.PutawayItemCreateOrConnectWithoutPutawayInput[];
    createMany?: Prisma.PutawayItemCreateManyPutawayInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUncheckedCreateNestedManyWithoutPutawayInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutPutawayInput, Prisma.PutawayItemUncheckedCreateWithoutPutawayInput> | Prisma.PutawayItemCreateWithoutPutawayInput[] | Prisma.PutawayItemUncheckedCreateWithoutPutawayInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutPutawayInput | Prisma.PutawayItemCreateOrConnectWithoutPutawayInput[];
    createMany?: Prisma.PutawayItemCreateManyPutawayInputEnvelope;
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
};
export type PutawayItemUpdateManyWithoutPutawayNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutPutawayInput, Prisma.PutawayItemUncheckedCreateWithoutPutawayInput> | Prisma.PutawayItemCreateWithoutPutawayInput[] | Prisma.PutawayItemUncheckedCreateWithoutPutawayInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutPutawayInput | Prisma.PutawayItemCreateOrConnectWithoutPutawayInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutPutawayInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutPutawayInput[];
    createMany?: Prisma.PutawayItemCreateManyPutawayInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutPutawayInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutPutawayInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutPutawayInput | Prisma.PutawayItemUpdateManyWithWhereWithoutPutawayInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemUncheckedUpdateManyWithoutPutawayNestedInput = {
    create?: Prisma.XOR<Prisma.PutawayItemCreateWithoutPutawayInput, Prisma.PutawayItemUncheckedCreateWithoutPutawayInput> | Prisma.PutawayItemCreateWithoutPutawayInput[] | Prisma.PutawayItemUncheckedCreateWithoutPutawayInput[];
    connectOrCreate?: Prisma.PutawayItemCreateOrConnectWithoutPutawayInput | Prisma.PutawayItemCreateOrConnectWithoutPutawayInput[];
    upsert?: Prisma.PutawayItemUpsertWithWhereUniqueWithoutPutawayInput | Prisma.PutawayItemUpsertWithWhereUniqueWithoutPutawayInput[];
    createMany?: Prisma.PutawayItemCreateManyPutawayInputEnvelope;
    set?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    disconnect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    delete?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    connect?: Prisma.PutawayItemWhereUniqueInput | Prisma.PutawayItemWhereUniqueInput[];
    update?: Prisma.PutawayItemUpdateWithWhereUniqueWithoutPutawayInput | Prisma.PutawayItemUpdateWithWhereUniqueWithoutPutawayInput[];
    updateMany?: Prisma.PutawayItemUpdateManyWithWhereWithoutPutawayInput | Prisma.PutawayItemUpdateManyWithWhereWithoutPutawayInput[];
    deleteMany?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
};
export type PutawayItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: string | null;
    serialNo?: string | null;
    putaway: Prisma.PutawayCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPutawayItemsInput;
    fromBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsFromInput;
    toBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsToInput;
};
export type PutawayItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutTenantInput, Prisma.PutawayItemUncheckedCreateWithoutTenantInput>;
};
export type PutawayItemCreateManyTenantInputEnvelope = {
    data: Prisma.PutawayItemCreateManyTenantInput | Prisma.PutawayItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type PutawayItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PutawayItemUpdateWithoutTenantInput, Prisma.PutawayItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutTenantInput, Prisma.PutawayItemUncheckedCreateWithoutTenantInput>;
};
export type PutawayItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateWithoutTenantInput, Prisma.PutawayItemUncheckedUpdateWithoutTenantInput>;
};
export type PutawayItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.PutawayItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateManyMutationInput, Prisma.PutawayItemUncheckedUpdateManyWithoutTenantInput>;
};
export type PutawayItemScalarWhereInput = {
    AND?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
    OR?: Prisma.PutawayItemScalarWhereInput[];
    NOT?: Prisma.PutawayItemScalarWhereInput | Prisma.PutawayItemScalarWhereInput[];
    id?: Prisma.StringFilter<"PutawayItem"> | string;
    tenantId?: Prisma.StringFilter<"PutawayItem"> | string;
    putawayId?: Prisma.StringFilter<"PutawayItem"> | string;
    lineNo?: Prisma.IntFilter<"PutawayItem"> | number;
    grnItemId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    itemId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    description?: Prisma.StringFilter<"PutawayItem"> | string;
    qty?: Prisma.DecimalFilter<"PutawayItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    toBinLocationId?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"PutawayItem"> | string | null;
};
export type PutawayItemCreateWithoutItemInput = {
    id?: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPutawayItemsInput;
    putaway: Prisma.PutawayCreateNestedOneWithoutItemsInput;
    fromBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsFromInput;
    toBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsToInput;
};
export type PutawayItemUncheckedCreateWithoutItemInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemCreateOrConnectWithoutItemInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutItemInput, Prisma.PutawayItemUncheckedCreateWithoutItemInput>;
};
export type PutawayItemCreateManyItemInputEnvelope = {
    data: Prisma.PutawayItemCreateManyItemInput | Prisma.PutawayItemCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type PutawayItemUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PutawayItemUpdateWithoutItemInput, Prisma.PutawayItemUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutItemInput, Prisma.PutawayItemUncheckedCreateWithoutItemInput>;
};
export type PutawayItemUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateWithoutItemInput, Prisma.PutawayItemUncheckedUpdateWithoutItemInput>;
};
export type PutawayItemUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.PutawayItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateManyMutationInput, Prisma.PutawayItemUncheckedUpdateManyWithoutItemInput>;
};
export type PutawayItemCreateWithoutFromBinLocationInput = {
    id?: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPutawayItemsInput;
    putaway: Prisma.PutawayCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPutawayItemsInput;
    toBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsToInput;
};
export type PutawayItemUncheckedCreateWithoutFromBinLocationInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemCreateOrConnectWithoutFromBinLocationInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput>;
};
export type PutawayItemCreateManyFromBinLocationInputEnvelope = {
    data: Prisma.PutawayItemCreateManyFromBinLocationInput | Prisma.PutawayItemCreateManyFromBinLocationInput[];
    skipDuplicates?: boolean;
};
export type PutawayItemCreateWithoutToBinLocationInput = {
    id?: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPutawayItemsInput;
    putaway: Prisma.PutawayCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPutawayItemsInput;
    fromBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsFromInput;
};
export type PutawayItemUncheckedCreateWithoutToBinLocationInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemCreateOrConnectWithoutToBinLocationInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput>;
};
export type PutawayItemCreateManyToBinLocationInputEnvelope = {
    data: Prisma.PutawayItemCreateManyToBinLocationInput | Prisma.PutawayItemCreateManyToBinLocationInput[];
    skipDuplicates?: boolean;
};
export type PutawayItemUpsertWithWhereUniqueWithoutFromBinLocationInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PutawayItemUpdateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedUpdateWithoutFromBinLocationInput>;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutFromBinLocationInput>;
};
export type PutawayItemUpdateWithWhereUniqueWithoutFromBinLocationInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateWithoutFromBinLocationInput, Prisma.PutawayItemUncheckedUpdateWithoutFromBinLocationInput>;
};
export type PutawayItemUpdateManyWithWhereWithoutFromBinLocationInput = {
    where: Prisma.PutawayItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateManyMutationInput, Prisma.PutawayItemUncheckedUpdateManyWithoutFromBinLocationInput>;
};
export type PutawayItemUpsertWithWhereUniqueWithoutToBinLocationInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PutawayItemUpdateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedUpdateWithoutToBinLocationInput>;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedCreateWithoutToBinLocationInput>;
};
export type PutawayItemUpdateWithWhereUniqueWithoutToBinLocationInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateWithoutToBinLocationInput, Prisma.PutawayItemUncheckedUpdateWithoutToBinLocationInput>;
};
export type PutawayItemUpdateManyWithWhereWithoutToBinLocationInput = {
    where: Prisma.PutawayItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateManyMutationInput, Prisma.PutawayItemUncheckedUpdateManyWithoutToBinLocationInput>;
};
export type PutawayItemCreateWithoutPutawayInput = {
    id?: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPutawayItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPutawayItemsInput;
    fromBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsFromInput;
    toBinLocation?: Prisma.BinLocationCreateNestedOneWithoutPutawayItemsToInput;
};
export type PutawayItemUncheckedCreateWithoutPutawayInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemCreateOrConnectWithoutPutawayInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutPutawayInput, Prisma.PutawayItemUncheckedCreateWithoutPutawayInput>;
};
export type PutawayItemCreateManyPutawayInputEnvelope = {
    data: Prisma.PutawayItemCreateManyPutawayInput | Prisma.PutawayItemCreateManyPutawayInput[];
    skipDuplicates?: boolean;
};
export type PutawayItemUpsertWithWhereUniqueWithoutPutawayInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PutawayItemUpdateWithoutPutawayInput, Prisma.PutawayItemUncheckedUpdateWithoutPutawayInput>;
    create: Prisma.XOR<Prisma.PutawayItemCreateWithoutPutawayInput, Prisma.PutawayItemUncheckedCreateWithoutPutawayInput>;
};
export type PutawayItemUpdateWithWhereUniqueWithoutPutawayInput = {
    where: Prisma.PutawayItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateWithoutPutawayInput, Prisma.PutawayItemUncheckedUpdateWithoutPutawayInput>;
};
export type PutawayItemUpdateManyWithWhereWithoutPutawayInput = {
    where: Prisma.PutawayItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PutawayItemUpdateManyMutationInput, Prisma.PutawayItemUncheckedUpdateManyWithoutPutawayInput>;
};
export type PutawayItemCreateManyTenantInput = {
    id?: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    putaway?: Prisma.PutawayUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPutawayItemsNestedInput;
    fromBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsFromNestedInput;
    toBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsToNestedInput;
};
export type PutawayItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemCreateManyItemInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPutawayItemsNestedInput;
    putaway?: Prisma.PutawayUpdateOneRequiredWithoutItemsNestedInput;
    fromBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsFromNestedInput;
    toBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsToNestedInput;
};
export type PutawayItemUncheckedUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemUncheckedUpdateManyWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemCreateManyFromBinLocationInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemCreateManyToBinLocationInput = {
    id?: string;
    tenantId: string;
    putawayId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemUpdateWithoutFromBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPutawayItemsNestedInput;
    putaway?: Prisma.PutawayUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPutawayItemsNestedInput;
    toBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsToNestedInput;
};
export type PutawayItemUncheckedUpdateWithoutFromBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemUncheckedUpdateManyWithoutFromBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemUpdateWithoutToBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPutawayItemsNestedInput;
    putaway?: Prisma.PutawayUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPutawayItemsNestedInput;
    fromBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsFromNestedInput;
};
export type PutawayItemUncheckedUpdateWithoutToBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemUncheckedUpdateManyWithoutToBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    putawayId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemCreateManyPutawayInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    grnItemId?: string | null;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: string | null;
    toBinLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type PutawayItemUpdateWithoutPutawayInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPutawayItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPutawayItemsNestedInput;
    fromBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsFromNestedInput;
    toBinLocation?: Prisma.BinLocationUpdateOneWithoutPutawayItemsToNestedInput;
};
export type PutawayItemUncheckedUpdateWithoutPutawayInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemUncheckedUpdateManyWithoutPutawayInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    grnItemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    fromBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toBinLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PutawayItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    putawayId?: boolean;
    lineNo?: boolean;
    grnItemId?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    fromBinLocationId?: boolean;
    toBinLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    putaway?: boolean | Prisma.PutawayDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PutawayItem$itemArgs<ExtArgs>;
    fromBinLocation?: boolean | Prisma.PutawayItem$fromBinLocationArgs<ExtArgs>;
    toBinLocation?: boolean | Prisma.PutawayItem$toBinLocationArgs<ExtArgs>;
}, ExtArgs["result"]["putawayItem"]>;
export type PutawayItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    putawayId?: boolean;
    lineNo?: boolean;
    grnItemId?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    fromBinLocationId?: boolean;
    toBinLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    putaway?: boolean | Prisma.PutawayDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PutawayItem$itemArgs<ExtArgs>;
    fromBinLocation?: boolean | Prisma.PutawayItem$fromBinLocationArgs<ExtArgs>;
    toBinLocation?: boolean | Prisma.PutawayItem$toBinLocationArgs<ExtArgs>;
}, ExtArgs["result"]["putawayItem"]>;
export type PutawayItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    putawayId?: boolean;
    lineNo?: boolean;
    grnItemId?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    fromBinLocationId?: boolean;
    toBinLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    putaway?: boolean | Prisma.PutawayDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PutawayItem$itemArgs<ExtArgs>;
    fromBinLocation?: boolean | Prisma.PutawayItem$fromBinLocationArgs<ExtArgs>;
    toBinLocation?: boolean | Prisma.PutawayItem$toBinLocationArgs<ExtArgs>;
}, ExtArgs["result"]["putawayItem"]>;
export type PutawayItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    putawayId?: boolean;
    lineNo?: boolean;
    grnItemId?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    fromBinLocationId?: boolean;
    toBinLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
};
export type PutawayItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "putawayId" | "lineNo" | "grnItemId" | "itemId" | "description" | "qty" | "fromBinLocationId" | "toBinLocationId" | "batchCode" | "serialNo", ExtArgs["result"]["putawayItem"]>;
export type PutawayItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    putaway?: boolean | Prisma.PutawayDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PutawayItem$itemArgs<ExtArgs>;
    fromBinLocation?: boolean | Prisma.PutawayItem$fromBinLocationArgs<ExtArgs>;
    toBinLocation?: boolean | Prisma.PutawayItem$toBinLocationArgs<ExtArgs>;
};
export type PutawayItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    putaway?: boolean | Prisma.PutawayDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PutawayItem$itemArgs<ExtArgs>;
    fromBinLocation?: boolean | Prisma.PutawayItem$fromBinLocationArgs<ExtArgs>;
    toBinLocation?: boolean | Prisma.PutawayItem$toBinLocationArgs<ExtArgs>;
};
export type PutawayItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    putaway?: boolean | Prisma.PutawayDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PutawayItem$itemArgs<ExtArgs>;
    fromBinLocation?: boolean | Prisma.PutawayItem$fromBinLocationArgs<ExtArgs>;
    toBinLocation?: boolean | Prisma.PutawayItem$toBinLocationArgs<ExtArgs>;
};
export type $PutawayItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PutawayItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        putaway: Prisma.$PutawayPayload<ExtArgs>;
        item: Prisma.$ItemPayload<ExtArgs> | null;
        fromBinLocation: Prisma.$BinLocationPayload<ExtArgs> | null;
        toBinLocation: Prisma.$BinLocationPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        putawayId: string;
        lineNo: number;
        grnItemId: string | null;
        itemId: string | null;
        description: string;
        qty: runtime.Decimal;
        fromBinLocationId: string | null;
        toBinLocationId: string | null;
        batchCode: string | null;
        serialNo: string | null;
    }, ExtArgs["result"]["putawayItem"]>;
    composites: {};
};
export type PutawayItemGetPayload<S extends boolean | null | undefined | PutawayItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload, S>;
export type PutawayItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PutawayItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PutawayItemCountAggregateInputType | true;
};
export interface PutawayItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PutawayItem'];
        meta: {
            name: 'PutawayItem';
        };
    };
    findUnique<T extends PutawayItemFindUniqueArgs>(args: Prisma.SelectSubset<T, PutawayItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PutawayItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PutawayItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PutawayItemFindFirstArgs>(args?: Prisma.SelectSubset<T, PutawayItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PutawayItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PutawayItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PutawayItemFindManyArgs>(args?: Prisma.SelectSubset<T, PutawayItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PutawayItemCreateArgs>(args: Prisma.SelectSubset<T, PutawayItemCreateArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PutawayItemCreateManyArgs>(args?: Prisma.SelectSubset<T, PutawayItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PutawayItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PutawayItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PutawayItemDeleteArgs>(args: Prisma.SelectSubset<T, PutawayItemDeleteArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PutawayItemUpdateArgs>(args: Prisma.SelectSubset<T, PutawayItemUpdateArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PutawayItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, PutawayItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PutawayItemUpdateManyArgs>(args: Prisma.SelectSubset<T, PutawayItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PutawayItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PutawayItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PutawayItemUpsertArgs>(args: Prisma.SelectSubset<T, PutawayItemUpsertArgs<ExtArgs>>): Prisma.Prisma__PutawayItemClient<runtime.Types.Result.GetResult<Prisma.$PutawayItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PutawayItemCountArgs>(args?: Prisma.Subset<T, PutawayItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PutawayItemCountAggregateOutputType> : number>;
    aggregate<T extends PutawayItemAggregateArgs>(args: Prisma.Subset<T, PutawayItemAggregateArgs>): Prisma.PrismaPromise<GetPutawayItemAggregateType<T>>;
    groupBy<T extends PutawayItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PutawayItemGroupByArgs['orderBy'];
    } : {
        orderBy?: PutawayItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PutawayItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPutawayItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PutawayItemFieldRefs;
}
export interface Prisma__PutawayItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    putaway<T extends Prisma.PutawayDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PutawayDefaultArgs<ExtArgs>>): Prisma.Prisma__PutawayClient<runtime.Types.Result.GetResult<Prisma.$PutawayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    item<T extends Prisma.PutawayItem$itemArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PutawayItem$itemArgs<ExtArgs>>): Prisma.Prisma__ItemClient<runtime.Types.Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    fromBinLocation<T extends Prisma.PutawayItem$fromBinLocationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PutawayItem$fromBinLocationArgs<ExtArgs>>): Prisma.Prisma__BinLocationClient<runtime.Types.Result.GetResult<Prisma.$BinLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    toBinLocation<T extends Prisma.PutawayItem$toBinLocationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PutawayItem$toBinLocationArgs<ExtArgs>>): Prisma.Prisma__BinLocationClient<runtime.Types.Result.GetResult<Prisma.$BinLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PutawayItemFieldRefs {
    readonly id: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly putawayId: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"PutawayItem", 'Int'>;
    readonly grnItemId: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly itemId: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly description: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly qty: Prisma.FieldRef<"PutawayItem", 'Decimal'>;
    readonly fromBinLocationId: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly toBinLocationId: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly batchCode: Prisma.FieldRef<"PutawayItem", 'String'>;
    readonly serialNo: Prisma.FieldRef<"PutawayItem", 'String'>;
}
export type PutawayItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    where: Prisma.PutawayItemWhereUniqueInput;
};
export type PutawayItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    where: Prisma.PutawayItemWhereUniqueInput;
};
export type PutawayItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    where?: Prisma.PutawayItemWhereInput;
    orderBy?: Prisma.PutawayItemOrderByWithRelationInput | Prisma.PutawayItemOrderByWithRelationInput[];
    cursor?: Prisma.PutawayItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PutawayItemScalarFieldEnum | Prisma.PutawayItemScalarFieldEnum[];
};
export type PutawayItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    where?: Prisma.PutawayItemWhereInput;
    orderBy?: Prisma.PutawayItemOrderByWithRelationInput | Prisma.PutawayItemOrderByWithRelationInput[];
    cursor?: Prisma.PutawayItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PutawayItemScalarFieldEnum | Prisma.PutawayItemScalarFieldEnum[];
};
export type PutawayItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    where?: Prisma.PutawayItemWhereInput;
    orderBy?: Prisma.PutawayItemOrderByWithRelationInput | Prisma.PutawayItemOrderByWithRelationInput[];
    cursor?: Prisma.PutawayItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PutawayItemScalarFieldEnum | Prisma.PutawayItemScalarFieldEnum[];
};
export type PutawayItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PutawayItemCreateInput, Prisma.PutawayItemUncheckedCreateInput>;
};
export type PutawayItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PutawayItemCreateManyInput | Prisma.PutawayItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PutawayItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    data: Prisma.PutawayItemCreateManyInput | Prisma.PutawayItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PutawayItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PutawayItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PutawayItemUpdateInput, Prisma.PutawayItemUncheckedUpdateInput>;
    where: Prisma.PutawayItemWhereUniqueInput;
};
export type PutawayItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PutawayItemUpdateManyMutationInput, Prisma.PutawayItemUncheckedUpdateManyInput>;
    where?: Prisma.PutawayItemWhereInput;
    limit?: number;
};
export type PutawayItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PutawayItemUpdateManyMutationInput, Prisma.PutawayItemUncheckedUpdateManyInput>;
    where?: Prisma.PutawayItemWhereInput;
    limit?: number;
    include?: Prisma.PutawayItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PutawayItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    where: Prisma.PutawayItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PutawayItemCreateInput, Prisma.PutawayItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PutawayItemUpdateInput, Prisma.PutawayItemUncheckedUpdateInput>;
};
export type PutawayItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
    where: Prisma.PutawayItemWhereUniqueInput;
};
export type PutawayItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PutawayItemWhereInput;
    limit?: number;
};
export type PutawayItem$itemArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemSelect<ExtArgs> | null;
    omit?: Prisma.ItemOmit<ExtArgs> | null;
    include?: Prisma.ItemInclude<ExtArgs> | null;
    where?: Prisma.ItemWhereInput;
};
export type PutawayItem$fromBinLocationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BinLocationSelect<ExtArgs> | null;
    omit?: Prisma.BinLocationOmit<ExtArgs> | null;
    include?: Prisma.BinLocationInclude<ExtArgs> | null;
    where?: Prisma.BinLocationWhereInput;
};
export type PutawayItem$toBinLocationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BinLocationSelect<ExtArgs> | null;
    omit?: Prisma.BinLocationOmit<ExtArgs> | null;
    include?: Prisma.BinLocationInclude<ExtArgs> | null;
    where?: Prisma.BinLocationWhereInput;
};
export type PutawayItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawayItemSelect<ExtArgs> | null;
    omit?: Prisma.PutawayItemOmit<ExtArgs> | null;
    include?: Prisma.PutawayItemInclude<ExtArgs> | null;
};
