import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type StockCountItemModel = runtime.Types.Result.DefaultSelection<Prisma.$StockCountItemPayload>;
export type AggregateStockCountItem = {
    _count: StockCountItemCountAggregateOutputType | null;
    _avg: StockCountItemAvgAggregateOutputType | null;
    _sum: StockCountItemSumAggregateOutputType | null;
    _min: StockCountItemMinAggregateOutputType | null;
    _max: StockCountItemMaxAggregateOutputType | null;
};
export type StockCountItemAvgAggregateOutputType = {
    lineNo: number | null;
    systemQty: runtime.Decimal | null;
    countedQty: runtime.Decimal | null;
    varianceQty: runtime.Decimal | null;
};
export type StockCountItemSumAggregateOutputType = {
    lineNo: number | null;
    systemQty: runtime.Decimal | null;
    countedQty: runtime.Decimal | null;
    varianceQty: runtime.Decimal | null;
};
export type StockCountItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    stockCountId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    systemQty: runtime.Decimal | null;
    countedQty: runtime.Decimal | null;
    varianceQty: runtime.Decimal | null;
    uomCode: string | null;
    binLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
};
export type StockCountItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    stockCountId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    systemQty: runtime.Decimal | null;
    countedQty: runtime.Decimal | null;
    varianceQty: runtime.Decimal | null;
    uomCode: string | null;
    binLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
};
export type StockCountItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    stockCountId: number;
    lineNo: number;
    itemId: number;
    description: number;
    systemQty: number;
    countedQty: number;
    varianceQty: number;
    uomCode: number;
    binLocationId: number;
    batchCode: number;
    serialNo: number;
    _all: number;
};
export type StockCountItemAvgAggregateInputType = {
    lineNo?: true;
    systemQty?: true;
    countedQty?: true;
    varianceQty?: true;
};
export type StockCountItemSumAggregateInputType = {
    lineNo?: true;
    systemQty?: true;
    countedQty?: true;
    varianceQty?: true;
};
export type StockCountItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    stockCountId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    systemQty?: true;
    countedQty?: true;
    varianceQty?: true;
    uomCode?: true;
    binLocationId?: true;
    batchCode?: true;
    serialNo?: true;
};
export type StockCountItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    stockCountId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    systemQty?: true;
    countedQty?: true;
    varianceQty?: true;
    uomCode?: true;
    binLocationId?: true;
    batchCode?: true;
    serialNo?: true;
};
export type StockCountItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    stockCountId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    systemQty?: true;
    countedQty?: true;
    varianceQty?: true;
    uomCode?: true;
    binLocationId?: true;
    batchCode?: true;
    serialNo?: true;
    _all?: true;
};
export type StockCountItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockCountItemWhereInput;
    orderBy?: Prisma.StockCountItemOrderByWithRelationInput | Prisma.StockCountItemOrderByWithRelationInput[];
    cursor?: Prisma.StockCountItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StockCountItemCountAggregateInputType;
    _avg?: StockCountItemAvgAggregateInputType;
    _sum?: StockCountItemSumAggregateInputType;
    _min?: StockCountItemMinAggregateInputType;
    _max?: StockCountItemMaxAggregateInputType;
};
export type GetStockCountItemAggregateType<T extends StockCountItemAggregateArgs> = {
    [P in keyof T & keyof AggregateStockCountItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockCountItem[P]> : Prisma.GetScalarType<T[P], AggregateStockCountItem[P]>;
};
export type StockCountItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockCountItemWhereInput;
    orderBy?: Prisma.StockCountItemOrderByWithAggregationInput | Prisma.StockCountItemOrderByWithAggregationInput[];
    by: Prisma.StockCountItemScalarFieldEnum[] | Prisma.StockCountItemScalarFieldEnum;
    having?: Prisma.StockCountItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockCountItemCountAggregateInputType | true;
    _avg?: StockCountItemAvgAggregateInputType;
    _sum?: StockCountItemSumAggregateInputType;
    _min?: StockCountItemMinAggregateInputType;
    _max?: StockCountItemMaxAggregateInputType;
};
export type StockCountItemGroupByOutputType = {
    id: string;
    tenantId: string;
    stockCountId: string;
    lineNo: number;
    itemId: string | null;
    description: string;
    systemQty: runtime.Decimal;
    countedQty: runtime.Decimal;
    varianceQty: runtime.Decimal;
    uomCode: string | null;
    binLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
    _count: StockCountItemCountAggregateOutputType | null;
    _avg: StockCountItemAvgAggregateOutputType | null;
    _sum: StockCountItemSumAggregateOutputType | null;
    _min: StockCountItemMinAggregateOutputType | null;
    _max: StockCountItemMaxAggregateOutputType | null;
};
export type GetStockCountItemGroupByPayload<T extends StockCountItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockCountItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockCountItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockCountItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockCountItemGroupByOutputType[P]>;
}>>;
export type StockCountItemWhereInput = {
    AND?: Prisma.StockCountItemWhereInput | Prisma.StockCountItemWhereInput[];
    OR?: Prisma.StockCountItemWhereInput[];
    NOT?: Prisma.StockCountItemWhereInput | Prisma.StockCountItemWhereInput[];
    id?: Prisma.StringFilter<"StockCountItem"> | string;
    tenantId?: Prisma.StringFilter<"StockCountItem"> | string;
    stockCountId?: Prisma.StringFilter<"StockCountItem"> | string;
    lineNo?: Prisma.IntFilter<"StockCountItem"> | number;
    itemId?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    description?: Prisma.StringFilter<"StockCountItem"> | string;
    systemQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    binLocationId?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    stockCount?: Prisma.XOR<Prisma.StockCountScalarRelationFilter, Prisma.StockCountWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
    binLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
};
export type StockCountItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    stockCountId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    systemQty?: Prisma.SortOrder;
    countedQty?: Prisma.SortOrder;
    varianceQty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    binLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    stockCount?: Prisma.StockCountOrderByWithRelationInput;
    item?: Prisma.ItemOrderByWithRelationInput;
    binLocation?: Prisma.BinLocationOrderByWithRelationInput;
};
export type StockCountItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_stockCountId_lineNo?: Prisma.StockCountItemTenantIdStockCountIdLineNoCompoundUniqueInput;
    AND?: Prisma.StockCountItemWhereInput | Prisma.StockCountItemWhereInput[];
    OR?: Prisma.StockCountItemWhereInput[];
    NOT?: Prisma.StockCountItemWhereInput | Prisma.StockCountItemWhereInput[];
    tenantId?: Prisma.StringFilter<"StockCountItem"> | string;
    stockCountId?: Prisma.StringFilter<"StockCountItem"> | string;
    lineNo?: Prisma.IntFilter<"StockCountItem"> | number;
    itemId?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    description?: Prisma.StringFilter<"StockCountItem"> | string;
    systemQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    binLocationId?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    stockCount?: Prisma.XOR<Prisma.StockCountScalarRelationFilter, Prisma.StockCountWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
    binLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
}, "id" | "tenantId_stockCountId_lineNo">;
export type StockCountItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    stockCountId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    systemQty?: Prisma.SortOrder;
    countedQty?: Prisma.SortOrder;
    varianceQty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    binLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StockCountItemCountOrderByAggregateInput;
    _avg?: Prisma.StockCountItemAvgOrderByAggregateInput;
    _max?: Prisma.StockCountItemMaxOrderByAggregateInput;
    _min?: Prisma.StockCountItemMinOrderByAggregateInput;
    _sum?: Prisma.StockCountItemSumOrderByAggregateInput;
};
export type StockCountItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockCountItemScalarWhereWithAggregatesInput | Prisma.StockCountItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockCountItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockCountItemScalarWhereWithAggregatesInput | Prisma.StockCountItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StockCountItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"StockCountItem"> | string;
    stockCountId?: Prisma.StringWithAggregatesFilter<"StockCountItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"StockCountItem"> | number;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"StockCountItem"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"StockCountItem"> | string;
    systemQty?: Prisma.DecimalWithAggregatesFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalWithAggregatesFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalWithAggregatesFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"StockCountItem"> | string | null;
    binLocationId?: Prisma.StringNullableWithAggregatesFilter<"StockCountItem"> | string | null;
    batchCode?: Prisma.StringNullableWithAggregatesFilter<"StockCountItem"> | string | null;
    serialNo?: Prisma.StringNullableWithAggregatesFilter<"StockCountItem"> | string | null;
};
export type StockCountItemCreateInput = {
    id?: string;
    lineNo: number;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutStockCountItemsInput;
    stockCount: Prisma.StockCountCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutStockCountItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutStockCountItemsInput;
};
export type StockCountItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    stockCountId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutStockCountItemsNestedInput;
    stockCount?: Prisma.StockCountUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutStockCountItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutStockCountItemsNestedInput;
};
export type StockCountItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemCreateManyInput = {
    id?: string;
    tenantId: string;
    stockCountId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemListRelationFilter = {
    every?: Prisma.StockCountItemWhereInput;
    some?: Prisma.StockCountItemWhereInput;
    none?: Prisma.StockCountItemWhereInput;
};
export type StockCountItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StockCountItemTenantIdStockCountIdLineNoCompoundUniqueInput = {
    tenantId: string;
    stockCountId: string;
    lineNo: number;
};
export type StockCountItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    stockCountId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    systemQty?: Prisma.SortOrder;
    countedQty?: Prisma.SortOrder;
    varianceQty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type StockCountItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    systemQty?: Prisma.SortOrder;
    countedQty?: Prisma.SortOrder;
    varianceQty?: Prisma.SortOrder;
};
export type StockCountItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    stockCountId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    systemQty?: Prisma.SortOrder;
    countedQty?: Prisma.SortOrder;
    varianceQty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type StockCountItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    stockCountId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    systemQty?: Prisma.SortOrder;
    countedQty?: Prisma.SortOrder;
    varianceQty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type StockCountItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    systemQty?: Prisma.SortOrder;
    countedQty?: Prisma.SortOrder;
    varianceQty?: Prisma.SortOrder;
};
export type StockCountItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutTenantInput, Prisma.StockCountItemUncheckedCreateWithoutTenantInput> | Prisma.StockCountItemCreateWithoutTenantInput[] | Prisma.StockCountItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutTenantInput | Prisma.StockCountItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.StockCountItemCreateManyTenantInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutTenantInput, Prisma.StockCountItemUncheckedCreateWithoutTenantInput> | Prisma.StockCountItemCreateWithoutTenantInput[] | Prisma.StockCountItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutTenantInput | Prisma.StockCountItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.StockCountItemCreateManyTenantInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutTenantInput, Prisma.StockCountItemUncheckedCreateWithoutTenantInput> | Prisma.StockCountItemCreateWithoutTenantInput[] | Prisma.StockCountItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutTenantInput | Prisma.StockCountItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.StockCountItemCreateManyTenantInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutTenantInput | Prisma.StockCountItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutTenantInput, Prisma.StockCountItemUncheckedCreateWithoutTenantInput> | Prisma.StockCountItemCreateWithoutTenantInput[] | Prisma.StockCountItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutTenantInput | Prisma.StockCountItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.StockCountItemCreateManyTenantInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutTenantInput | Prisma.StockCountItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutItemInput, Prisma.StockCountItemUncheckedCreateWithoutItemInput> | Prisma.StockCountItemCreateWithoutItemInput[] | Prisma.StockCountItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutItemInput | Prisma.StockCountItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.StockCountItemCreateManyItemInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutItemInput, Prisma.StockCountItemUncheckedCreateWithoutItemInput> | Prisma.StockCountItemCreateWithoutItemInput[] | Prisma.StockCountItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutItemInput | Prisma.StockCountItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.StockCountItemCreateManyItemInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutItemInput, Prisma.StockCountItemUncheckedCreateWithoutItemInput> | Prisma.StockCountItemCreateWithoutItemInput[] | Prisma.StockCountItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutItemInput | Prisma.StockCountItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutItemInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.StockCountItemCreateManyItemInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutItemInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutItemInput | Prisma.StockCountItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutItemInput, Prisma.StockCountItemUncheckedCreateWithoutItemInput> | Prisma.StockCountItemCreateWithoutItemInput[] | Prisma.StockCountItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutItemInput | Prisma.StockCountItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutItemInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.StockCountItemCreateManyItemInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutItemInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutItemInput | Prisma.StockCountItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemCreateNestedManyWithoutBinLocationInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutBinLocationInput, Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput> | Prisma.StockCountItemCreateWithoutBinLocationInput[] | Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput | Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput[];
    createMany?: Prisma.StockCountItemCreateManyBinLocationInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUncheckedCreateNestedManyWithoutBinLocationInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutBinLocationInput, Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput> | Prisma.StockCountItemCreateWithoutBinLocationInput[] | Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput | Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput[];
    createMany?: Prisma.StockCountItemCreateManyBinLocationInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUpdateManyWithoutBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutBinLocationInput, Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput> | Prisma.StockCountItemCreateWithoutBinLocationInput[] | Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput | Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutBinLocationInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutBinLocationInput[];
    createMany?: Prisma.StockCountItemCreateManyBinLocationInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutBinLocationInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutBinLocationInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutBinLocationInput | Prisma.StockCountItemUpdateManyWithWhereWithoutBinLocationInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemUncheckedUpdateManyWithoutBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutBinLocationInput, Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput> | Prisma.StockCountItemCreateWithoutBinLocationInput[] | Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput | Prisma.StockCountItemCreateOrConnectWithoutBinLocationInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutBinLocationInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutBinLocationInput[];
    createMany?: Prisma.StockCountItemCreateManyBinLocationInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutBinLocationInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutBinLocationInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutBinLocationInput | Prisma.StockCountItemUpdateManyWithWhereWithoutBinLocationInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemCreateNestedManyWithoutStockCountInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutStockCountInput, Prisma.StockCountItemUncheckedCreateWithoutStockCountInput> | Prisma.StockCountItemCreateWithoutStockCountInput[] | Prisma.StockCountItemUncheckedCreateWithoutStockCountInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutStockCountInput | Prisma.StockCountItemCreateOrConnectWithoutStockCountInput[];
    createMany?: Prisma.StockCountItemCreateManyStockCountInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUncheckedCreateNestedManyWithoutStockCountInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutStockCountInput, Prisma.StockCountItemUncheckedCreateWithoutStockCountInput> | Prisma.StockCountItemCreateWithoutStockCountInput[] | Prisma.StockCountItemUncheckedCreateWithoutStockCountInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutStockCountInput | Prisma.StockCountItemCreateOrConnectWithoutStockCountInput[];
    createMany?: Prisma.StockCountItemCreateManyStockCountInputEnvelope;
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
};
export type StockCountItemUpdateManyWithoutStockCountNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutStockCountInput, Prisma.StockCountItemUncheckedCreateWithoutStockCountInput> | Prisma.StockCountItemCreateWithoutStockCountInput[] | Prisma.StockCountItemUncheckedCreateWithoutStockCountInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutStockCountInput | Prisma.StockCountItemCreateOrConnectWithoutStockCountInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutStockCountInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutStockCountInput[];
    createMany?: Prisma.StockCountItemCreateManyStockCountInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutStockCountInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutStockCountInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutStockCountInput | Prisma.StockCountItemUpdateManyWithWhereWithoutStockCountInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemUncheckedUpdateManyWithoutStockCountNestedInput = {
    create?: Prisma.XOR<Prisma.StockCountItemCreateWithoutStockCountInput, Prisma.StockCountItemUncheckedCreateWithoutStockCountInput> | Prisma.StockCountItemCreateWithoutStockCountInput[] | Prisma.StockCountItemUncheckedCreateWithoutStockCountInput[];
    connectOrCreate?: Prisma.StockCountItemCreateOrConnectWithoutStockCountInput | Prisma.StockCountItemCreateOrConnectWithoutStockCountInput[];
    upsert?: Prisma.StockCountItemUpsertWithWhereUniqueWithoutStockCountInput | Prisma.StockCountItemUpsertWithWhereUniqueWithoutStockCountInput[];
    createMany?: Prisma.StockCountItemCreateManyStockCountInputEnvelope;
    set?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    disconnect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    delete?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    connect?: Prisma.StockCountItemWhereUniqueInput | Prisma.StockCountItemWhereUniqueInput[];
    update?: Prisma.StockCountItemUpdateWithWhereUniqueWithoutStockCountInput | Prisma.StockCountItemUpdateWithWhereUniqueWithoutStockCountInput[];
    updateMany?: Prisma.StockCountItemUpdateManyWithWhereWithoutStockCountInput | Prisma.StockCountItemUpdateManyWithWhereWithoutStockCountInput[];
    deleteMany?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
};
export type StockCountItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    stockCount: Prisma.StockCountCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutStockCountItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutStockCountItemsInput;
};
export type StockCountItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    stockCountId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutTenantInput, Prisma.StockCountItemUncheckedCreateWithoutTenantInput>;
};
export type StockCountItemCreateManyTenantInputEnvelope = {
    data: Prisma.StockCountItemCreateManyTenantInput | Prisma.StockCountItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type StockCountItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockCountItemUpdateWithoutTenantInput, Prisma.StockCountItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutTenantInput, Prisma.StockCountItemUncheckedCreateWithoutTenantInput>;
};
export type StockCountItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateWithoutTenantInput, Prisma.StockCountItemUncheckedUpdateWithoutTenantInput>;
};
export type StockCountItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.StockCountItemScalarWhereInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateManyMutationInput, Prisma.StockCountItemUncheckedUpdateManyWithoutTenantInput>;
};
export type StockCountItemScalarWhereInput = {
    AND?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
    OR?: Prisma.StockCountItemScalarWhereInput[];
    NOT?: Prisma.StockCountItemScalarWhereInput | Prisma.StockCountItemScalarWhereInput[];
    id?: Prisma.StringFilter<"StockCountItem"> | string;
    tenantId?: Prisma.StringFilter<"StockCountItem"> | string;
    stockCountId?: Prisma.StringFilter<"StockCountItem"> | string;
    lineNo?: Prisma.IntFilter<"StockCountItem"> | number;
    itemId?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    description?: Prisma.StringFilter<"StockCountItem"> | string;
    systemQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFilter<"StockCountItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    binLocationId?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"StockCountItem"> | string | null;
};
export type StockCountItemCreateWithoutItemInput = {
    id?: string;
    lineNo: number;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutStockCountItemsInput;
    stockCount: Prisma.StockCountCreateNestedOneWithoutItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutStockCountItemsInput;
};
export type StockCountItemUncheckedCreateWithoutItemInput = {
    id?: string;
    tenantId: string;
    stockCountId: string;
    lineNo: number;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemCreateOrConnectWithoutItemInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutItemInput, Prisma.StockCountItemUncheckedCreateWithoutItemInput>;
};
export type StockCountItemCreateManyItemInputEnvelope = {
    data: Prisma.StockCountItemCreateManyItemInput | Prisma.StockCountItemCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type StockCountItemUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockCountItemUpdateWithoutItemInput, Prisma.StockCountItemUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutItemInput, Prisma.StockCountItemUncheckedCreateWithoutItemInput>;
};
export type StockCountItemUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateWithoutItemInput, Prisma.StockCountItemUncheckedUpdateWithoutItemInput>;
};
export type StockCountItemUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.StockCountItemScalarWhereInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateManyMutationInput, Prisma.StockCountItemUncheckedUpdateManyWithoutItemInput>;
};
export type StockCountItemCreateWithoutBinLocationInput = {
    id?: string;
    lineNo: number;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutStockCountItemsInput;
    stockCount: Prisma.StockCountCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutStockCountItemsInput;
};
export type StockCountItemUncheckedCreateWithoutBinLocationInput = {
    id?: string;
    tenantId: string;
    stockCountId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemCreateOrConnectWithoutBinLocationInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutBinLocationInput, Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput>;
};
export type StockCountItemCreateManyBinLocationInputEnvelope = {
    data: Prisma.StockCountItemCreateManyBinLocationInput | Prisma.StockCountItemCreateManyBinLocationInput[];
    skipDuplicates?: boolean;
};
export type StockCountItemUpsertWithWhereUniqueWithoutBinLocationInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockCountItemUpdateWithoutBinLocationInput, Prisma.StockCountItemUncheckedUpdateWithoutBinLocationInput>;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutBinLocationInput, Prisma.StockCountItemUncheckedCreateWithoutBinLocationInput>;
};
export type StockCountItemUpdateWithWhereUniqueWithoutBinLocationInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateWithoutBinLocationInput, Prisma.StockCountItemUncheckedUpdateWithoutBinLocationInput>;
};
export type StockCountItemUpdateManyWithWhereWithoutBinLocationInput = {
    where: Prisma.StockCountItemScalarWhereInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateManyMutationInput, Prisma.StockCountItemUncheckedUpdateManyWithoutBinLocationInput>;
};
export type StockCountItemCreateWithoutStockCountInput = {
    id?: string;
    lineNo: number;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutStockCountItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutStockCountItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutStockCountItemsInput;
};
export type StockCountItemUncheckedCreateWithoutStockCountInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemCreateOrConnectWithoutStockCountInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutStockCountInput, Prisma.StockCountItemUncheckedCreateWithoutStockCountInput>;
};
export type StockCountItemCreateManyStockCountInputEnvelope = {
    data: Prisma.StockCountItemCreateManyStockCountInput | Prisma.StockCountItemCreateManyStockCountInput[];
    skipDuplicates?: boolean;
};
export type StockCountItemUpsertWithWhereUniqueWithoutStockCountInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.StockCountItemUpdateWithoutStockCountInput, Prisma.StockCountItemUncheckedUpdateWithoutStockCountInput>;
    create: Prisma.XOR<Prisma.StockCountItemCreateWithoutStockCountInput, Prisma.StockCountItemUncheckedCreateWithoutStockCountInput>;
};
export type StockCountItemUpdateWithWhereUniqueWithoutStockCountInput = {
    where: Prisma.StockCountItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateWithoutStockCountInput, Prisma.StockCountItemUncheckedUpdateWithoutStockCountInput>;
};
export type StockCountItemUpdateManyWithWhereWithoutStockCountInput = {
    where: Prisma.StockCountItemScalarWhereInput;
    data: Prisma.XOR<Prisma.StockCountItemUpdateManyMutationInput, Prisma.StockCountItemUncheckedUpdateManyWithoutStockCountInput>;
};
export type StockCountItemCreateManyTenantInput = {
    id?: string;
    stockCountId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    stockCount?: Prisma.StockCountUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutStockCountItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutStockCountItemsNestedInput;
};
export type StockCountItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemCreateManyItemInput = {
    id?: string;
    tenantId: string;
    stockCountId: string;
    lineNo: number;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutStockCountItemsNestedInput;
    stockCount?: Prisma.StockCountUpdateOneRequiredWithoutItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutStockCountItemsNestedInput;
};
export type StockCountItemUncheckedUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemUncheckedUpdateManyWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemCreateManyBinLocationInput = {
    id?: string;
    tenantId: string;
    stockCountId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemUpdateWithoutBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutStockCountItemsNestedInput;
    stockCount?: Prisma.StockCountUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutStockCountItemsNestedInput;
};
export type StockCountItemUncheckedUpdateWithoutBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemUncheckedUpdateManyWithoutBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    stockCountId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemCreateManyStockCountInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    systemQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type StockCountItemUpdateWithoutStockCountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutStockCountItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutStockCountItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutStockCountItemsNestedInput;
};
export type StockCountItemUncheckedUpdateWithoutStockCountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemUncheckedUpdateManyWithoutStockCountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    systemQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    countedQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    varianceQty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type StockCountItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    stockCountId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    systemQty?: boolean;
    countedQty?: boolean;
    varianceQty?: boolean;
    uomCode?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    stockCount?: boolean | Prisma.StockCountDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.StockCountItem$itemArgs<ExtArgs>;
    binLocation?: boolean | Prisma.StockCountItem$binLocationArgs<ExtArgs>;
}, ExtArgs["result"]["stockCountItem"]>;
export type StockCountItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    stockCountId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    systemQty?: boolean;
    countedQty?: boolean;
    varianceQty?: boolean;
    uomCode?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    stockCount?: boolean | Prisma.StockCountDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.StockCountItem$itemArgs<ExtArgs>;
    binLocation?: boolean | Prisma.StockCountItem$binLocationArgs<ExtArgs>;
}, ExtArgs["result"]["stockCountItem"]>;
export type StockCountItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    stockCountId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    systemQty?: boolean;
    countedQty?: boolean;
    varianceQty?: boolean;
    uomCode?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    stockCount?: boolean | Prisma.StockCountDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.StockCountItem$itemArgs<ExtArgs>;
    binLocation?: boolean | Prisma.StockCountItem$binLocationArgs<ExtArgs>;
}, ExtArgs["result"]["stockCountItem"]>;
export type StockCountItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    stockCountId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    systemQty?: boolean;
    countedQty?: boolean;
    varianceQty?: boolean;
    uomCode?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
};
export type StockCountItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "stockCountId" | "lineNo" | "itemId" | "description" | "systemQty" | "countedQty" | "varianceQty" | "uomCode" | "binLocationId" | "batchCode" | "serialNo", ExtArgs["result"]["stockCountItem"]>;
export type StockCountItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    stockCount?: boolean | Prisma.StockCountDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.StockCountItem$itemArgs<ExtArgs>;
    binLocation?: boolean | Prisma.StockCountItem$binLocationArgs<ExtArgs>;
};
export type StockCountItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    stockCount?: boolean | Prisma.StockCountDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.StockCountItem$itemArgs<ExtArgs>;
    binLocation?: boolean | Prisma.StockCountItem$binLocationArgs<ExtArgs>;
};
export type StockCountItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    stockCount?: boolean | Prisma.StockCountDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.StockCountItem$itemArgs<ExtArgs>;
    binLocation?: boolean | Prisma.StockCountItem$binLocationArgs<ExtArgs>;
};
export type $StockCountItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockCountItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        stockCount: Prisma.$StockCountPayload<ExtArgs>;
        item: Prisma.$ItemPayload<ExtArgs> | null;
        binLocation: Prisma.$BinLocationPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        stockCountId: string;
        lineNo: number;
        itemId: string | null;
        description: string;
        systemQty: runtime.Decimal;
        countedQty: runtime.Decimal;
        varianceQty: runtime.Decimal;
        uomCode: string | null;
        binLocationId: string | null;
        batchCode: string | null;
        serialNo: string | null;
    }, ExtArgs["result"]["stockCountItem"]>;
    composites: {};
};
export type StockCountItemGetPayload<S extends boolean | null | undefined | StockCountItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload, S>;
export type StockCountItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockCountItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockCountItemCountAggregateInputType | true;
};
export interface StockCountItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockCountItem'];
        meta: {
            name: 'StockCountItem';
        };
    };
    findUnique<T extends StockCountItemFindUniqueArgs>(args: Prisma.SelectSubset<T, StockCountItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StockCountItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockCountItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StockCountItemFindFirstArgs>(args?: Prisma.SelectSubset<T, StockCountItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StockCountItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockCountItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StockCountItemFindManyArgs>(args?: Prisma.SelectSubset<T, StockCountItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StockCountItemCreateArgs>(args: Prisma.SelectSubset<T, StockCountItemCreateArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StockCountItemCreateManyArgs>(args?: Prisma.SelectSubset<T, StockCountItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StockCountItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockCountItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StockCountItemDeleteArgs>(args: Prisma.SelectSubset<T, StockCountItemDeleteArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StockCountItemUpdateArgs>(args: Prisma.SelectSubset<T, StockCountItemUpdateArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StockCountItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockCountItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StockCountItemUpdateManyArgs>(args: Prisma.SelectSubset<T, StockCountItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StockCountItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockCountItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StockCountItemUpsertArgs>(args: Prisma.SelectSubset<T, StockCountItemUpsertArgs<ExtArgs>>): Prisma.Prisma__StockCountItemClient<runtime.Types.Result.GetResult<Prisma.$StockCountItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StockCountItemCountArgs>(args?: Prisma.Subset<T, StockCountItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockCountItemCountAggregateOutputType> : number>;
    aggregate<T extends StockCountItemAggregateArgs>(args: Prisma.Subset<T, StockCountItemAggregateArgs>): Prisma.PrismaPromise<GetStockCountItemAggregateType<T>>;
    groupBy<T extends StockCountItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockCountItemGroupByArgs['orderBy'];
    } : {
        orderBy?: StockCountItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockCountItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockCountItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StockCountItemFieldRefs;
}
export interface Prisma__StockCountItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    stockCount<T extends Prisma.StockCountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockCountDefaultArgs<ExtArgs>>): Prisma.Prisma__StockCountClient<runtime.Types.Result.GetResult<Prisma.$StockCountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    item<T extends Prisma.StockCountItem$itemArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockCountItem$itemArgs<ExtArgs>>): Prisma.Prisma__ItemClient<runtime.Types.Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    binLocation<T extends Prisma.StockCountItem$binLocationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockCountItem$binLocationArgs<ExtArgs>>): Prisma.Prisma__BinLocationClient<runtime.Types.Result.GetResult<Prisma.$BinLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StockCountItemFieldRefs {
    readonly id: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly stockCountId: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"StockCountItem", 'Int'>;
    readonly itemId: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly description: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly systemQty: Prisma.FieldRef<"StockCountItem", 'Decimal'>;
    readonly countedQty: Prisma.FieldRef<"StockCountItem", 'Decimal'>;
    readonly varianceQty: Prisma.FieldRef<"StockCountItem", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly binLocationId: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly batchCode: Prisma.FieldRef<"StockCountItem", 'String'>;
    readonly serialNo: Prisma.FieldRef<"StockCountItem", 'String'>;
}
export type StockCountItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    where: Prisma.StockCountItemWhereUniqueInput;
};
export type StockCountItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    where: Prisma.StockCountItemWhereUniqueInput;
};
export type StockCountItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    where?: Prisma.StockCountItemWhereInput;
    orderBy?: Prisma.StockCountItemOrderByWithRelationInput | Prisma.StockCountItemOrderByWithRelationInput[];
    cursor?: Prisma.StockCountItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockCountItemScalarFieldEnum | Prisma.StockCountItemScalarFieldEnum[];
};
export type StockCountItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    where?: Prisma.StockCountItemWhereInput;
    orderBy?: Prisma.StockCountItemOrderByWithRelationInput | Prisma.StockCountItemOrderByWithRelationInput[];
    cursor?: Prisma.StockCountItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockCountItemScalarFieldEnum | Prisma.StockCountItemScalarFieldEnum[];
};
export type StockCountItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    where?: Prisma.StockCountItemWhereInput;
    orderBy?: Prisma.StockCountItemOrderByWithRelationInput | Prisma.StockCountItemOrderByWithRelationInput[];
    cursor?: Prisma.StockCountItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockCountItemScalarFieldEnum | Prisma.StockCountItemScalarFieldEnum[];
};
export type StockCountItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockCountItemCreateInput, Prisma.StockCountItemUncheckedCreateInput>;
};
export type StockCountItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StockCountItemCreateManyInput | Prisma.StockCountItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StockCountItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    data: Prisma.StockCountItemCreateManyInput | Prisma.StockCountItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StockCountItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StockCountItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockCountItemUpdateInput, Prisma.StockCountItemUncheckedUpdateInput>;
    where: Prisma.StockCountItemWhereUniqueInput;
};
export type StockCountItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StockCountItemUpdateManyMutationInput, Prisma.StockCountItemUncheckedUpdateManyInput>;
    where?: Prisma.StockCountItemWhereInput;
    limit?: number;
};
export type StockCountItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StockCountItemUpdateManyMutationInput, Prisma.StockCountItemUncheckedUpdateManyInput>;
    where?: Prisma.StockCountItemWhereInput;
    limit?: number;
    include?: Prisma.StockCountItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StockCountItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    where: Prisma.StockCountItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockCountItemCreateInput, Prisma.StockCountItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StockCountItemUpdateInput, Prisma.StockCountItemUncheckedUpdateInput>;
};
export type StockCountItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
    where: Prisma.StockCountItemWhereUniqueInput;
};
export type StockCountItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockCountItemWhereInput;
    limit?: number;
};
export type StockCountItem$itemArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemSelect<ExtArgs> | null;
    omit?: Prisma.ItemOmit<ExtArgs> | null;
    include?: Prisma.ItemInclude<ExtArgs> | null;
    where?: Prisma.ItemWhereInput;
};
export type StockCountItem$binLocationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BinLocationSelect<ExtArgs> | null;
    omit?: Prisma.BinLocationOmit<ExtArgs> | null;
    include?: Prisma.BinLocationInclude<ExtArgs> | null;
    where?: Prisma.BinLocationWhereInput;
};
export type StockCountItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountItemSelect<ExtArgs> | null;
    omit?: Prisma.StockCountItemOmit<ExtArgs> | null;
    include?: Prisma.StockCountItemInclude<ExtArgs> | null;
};
