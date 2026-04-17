import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type GoodsReceiptItemModel = runtime.Types.Result.DefaultSelection<Prisma.$GoodsReceiptItemPayload>;
export type AggregateGoodsReceiptItem = {
    _count: GoodsReceiptItemCountAggregateOutputType | null;
    _avg: GoodsReceiptItemAvgAggregateOutputType | null;
    _sum: GoodsReceiptItemSumAggregateOutputType | null;
    _min: GoodsReceiptItemMinAggregateOutputType | null;
    _max: GoodsReceiptItemMaxAggregateOutputType | null;
};
export type GoodsReceiptItemAvgAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
};
export type GoodsReceiptItemSumAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
};
export type GoodsReceiptItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    grnId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    warehouseId: string | null;
    binLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
};
export type GoodsReceiptItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    grnId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    warehouseId: string | null;
    binLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
};
export type GoodsReceiptItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    grnId: number;
    lineNo: number;
    itemId: number;
    description: number;
    qty: number;
    uomCode: number;
    warehouseId: number;
    binLocationId: number;
    batchCode: number;
    serialNo: number;
    _all: number;
};
export type GoodsReceiptItemAvgAggregateInputType = {
    lineNo?: true;
    qty?: true;
};
export type GoodsReceiptItemSumAggregateInputType = {
    lineNo?: true;
    qty?: true;
};
export type GoodsReceiptItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    grnId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    warehouseId?: true;
    binLocationId?: true;
    batchCode?: true;
    serialNo?: true;
};
export type GoodsReceiptItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    grnId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    warehouseId?: true;
    binLocationId?: true;
    batchCode?: true;
    serialNo?: true;
};
export type GoodsReceiptItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    grnId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    warehouseId?: true;
    binLocationId?: true;
    batchCode?: true;
    serialNo?: true;
    _all?: true;
};
export type GoodsReceiptItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoodsReceiptItemWhereInput;
    orderBy?: Prisma.GoodsReceiptItemOrderByWithRelationInput | Prisma.GoodsReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GoodsReceiptItemCountAggregateInputType;
    _avg?: GoodsReceiptItemAvgAggregateInputType;
    _sum?: GoodsReceiptItemSumAggregateInputType;
    _min?: GoodsReceiptItemMinAggregateInputType;
    _max?: GoodsReceiptItemMaxAggregateInputType;
};
export type GetGoodsReceiptItemAggregateType<T extends GoodsReceiptItemAggregateArgs> = {
    [P in keyof T & keyof AggregateGoodsReceiptItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGoodsReceiptItem[P]> : Prisma.GetScalarType<T[P], AggregateGoodsReceiptItem[P]>;
};
export type GoodsReceiptItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoodsReceiptItemWhereInput;
    orderBy?: Prisma.GoodsReceiptItemOrderByWithAggregationInput | Prisma.GoodsReceiptItemOrderByWithAggregationInput[];
    by: Prisma.GoodsReceiptItemScalarFieldEnum[] | Prisma.GoodsReceiptItemScalarFieldEnum;
    having?: Prisma.GoodsReceiptItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GoodsReceiptItemCountAggregateInputType | true;
    _avg?: GoodsReceiptItemAvgAggregateInputType;
    _sum?: GoodsReceiptItemSumAggregateInputType;
    _min?: GoodsReceiptItemMinAggregateInputType;
    _max?: GoodsReceiptItemMaxAggregateInputType;
};
export type GoodsReceiptItemGroupByOutputType = {
    id: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    itemId: string | null;
    description: string;
    qty: runtime.Decimal;
    uomCode: string | null;
    warehouseId: string;
    binLocationId: string | null;
    batchCode: string | null;
    serialNo: string | null;
    _count: GoodsReceiptItemCountAggregateOutputType | null;
    _avg: GoodsReceiptItemAvgAggregateOutputType | null;
    _sum: GoodsReceiptItemSumAggregateOutputType | null;
    _min: GoodsReceiptItemMinAggregateOutputType | null;
    _max: GoodsReceiptItemMaxAggregateOutputType | null;
};
export type GetGoodsReceiptItemGroupByPayload<T extends GoodsReceiptItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GoodsReceiptItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GoodsReceiptItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GoodsReceiptItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GoodsReceiptItemGroupByOutputType[P]>;
}>>;
export type GoodsReceiptItemWhereInput = {
    AND?: Prisma.GoodsReceiptItemWhereInput | Prisma.GoodsReceiptItemWhereInput[];
    OR?: Prisma.GoodsReceiptItemWhereInput[];
    NOT?: Prisma.GoodsReceiptItemWhereInput | Prisma.GoodsReceiptItemWhereInput[];
    id?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    tenantId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    grnId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    lineNo?: Prisma.IntFilter<"GoodsReceiptItem"> | number;
    itemId?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    description?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    qty?: Prisma.DecimalFilter<"GoodsReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    warehouseId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    binLocationId?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    grn?: Prisma.XOR<Prisma.GoodsReceiptNoteScalarRelationFilter, Prisma.GoodsReceiptNoteWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    binLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
};
export type GoodsReceiptItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    grn?: Prisma.GoodsReceiptNoteOrderByWithRelationInput;
    item?: Prisma.ItemOrderByWithRelationInput;
    warehouse?: Prisma.WarehouseOrderByWithRelationInput;
    binLocation?: Prisma.BinLocationOrderByWithRelationInput;
};
export type GoodsReceiptItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_grnId_lineNo?: Prisma.GoodsReceiptItemTenantIdGrnIdLineNoCompoundUniqueInput;
    AND?: Prisma.GoodsReceiptItemWhereInput | Prisma.GoodsReceiptItemWhereInput[];
    OR?: Prisma.GoodsReceiptItemWhereInput[];
    NOT?: Prisma.GoodsReceiptItemWhereInput | Prisma.GoodsReceiptItemWhereInput[];
    tenantId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    grnId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    lineNo?: Prisma.IntFilter<"GoodsReceiptItem"> | number;
    itemId?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    description?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    qty?: Prisma.DecimalFilter<"GoodsReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    warehouseId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    binLocationId?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    grn?: Prisma.XOR<Prisma.GoodsReceiptNoteScalarRelationFilter, Prisma.GoodsReceiptNoteWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    binLocation?: Prisma.XOR<Prisma.BinLocationNullableScalarRelationFilter, Prisma.BinLocationWhereInput> | null;
}, "id" | "tenantId_grnId_lineNo">;
export type GoodsReceiptItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.GoodsReceiptItemCountOrderByAggregateInput;
    _avg?: Prisma.GoodsReceiptItemAvgOrderByAggregateInput;
    _max?: Prisma.GoodsReceiptItemMaxOrderByAggregateInput;
    _min?: Prisma.GoodsReceiptItemMinOrderByAggregateInput;
    _sum?: Prisma.GoodsReceiptItemSumOrderByAggregateInput;
};
export type GoodsReceiptItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.GoodsReceiptItemScalarWhereWithAggregatesInput | Prisma.GoodsReceiptItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.GoodsReceiptItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GoodsReceiptItemScalarWhereWithAggregatesInput | Prisma.GoodsReceiptItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"GoodsReceiptItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"GoodsReceiptItem"> | string;
    grnId?: Prisma.StringWithAggregatesFilter<"GoodsReceiptItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"GoodsReceiptItem"> | number;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptItem"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"GoodsReceiptItem"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"GoodsReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptItem"> | string | null;
    warehouseId?: Prisma.StringWithAggregatesFilter<"GoodsReceiptItem"> | string;
    binLocationId?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptItem"> | string | null;
    batchCode?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptItem"> | string | null;
    serialNo?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptItem"> | string | null;
};
export type GoodsReceiptItemCreateInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptItemsInput;
    grn: Prisma.GoodsReceiptNoteCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutGoodsReceiptItemsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutGoodsReceiptItemsInput;
};
export type GoodsReceiptItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    grn?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutGoodsReceiptItemsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutGoodsReceiptItemsNestedInput;
};
export type GoodsReceiptItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemCreateManyInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemListRelationFilter = {
    every?: Prisma.GoodsReceiptItemWhereInput;
    some?: Prisma.GoodsReceiptItemWhereInput;
    none?: Prisma.GoodsReceiptItemWhereInput;
};
export type GoodsReceiptItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GoodsReceiptItemTenantIdGrnIdLineNoCompoundUniqueInput = {
    tenantId: string;
    grnId: string;
    lineNo: number;
};
export type GoodsReceiptItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type GoodsReceiptItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
};
export type GoodsReceiptItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type GoodsReceiptItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    binLocationId?: Prisma.SortOrder;
    batchCode?: Prisma.SortOrder;
    serialNo?: Prisma.SortOrder;
};
export type GoodsReceiptItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
};
export type GoodsReceiptItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptItemCreateWithoutTenantInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyTenantInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptItemCreateWithoutTenantInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyTenantInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptItemCreateWithoutTenantInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyTenantInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutTenantInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptItemCreateWithoutTenantInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyTenantInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutTenantInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput> | Prisma.GoodsReceiptItemCreateWithoutItemInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyItemInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput> | Prisma.GoodsReceiptItemCreateWithoutItemInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyItemInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput> | Prisma.GoodsReceiptItemCreateWithoutItemInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutItemInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyItemInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutItemInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutItemInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput> | Prisma.GoodsReceiptItemCreateWithoutItemInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutItemInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyItemInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutItemInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutItemInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptItemCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyWarehouseInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptItemCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyWarehouseInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptItemCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyWarehouseInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutWarehouseInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptItemCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyWarehouseInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutWarehouseInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemCreateNestedManyWithoutBinLocationInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput> | Prisma.GoodsReceiptItemCreateWithoutBinLocationInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyBinLocationInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUncheckedCreateNestedManyWithoutBinLocationInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput> | Prisma.GoodsReceiptItemCreateWithoutBinLocationInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyBinLocationInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUpdateManyWithoutBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput> | Prisma.GoodsReceiptItemCreateWithoutBinLocationInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutBinLocationInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutBinLocationInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyBinLocationInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutBinLocationInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutBinLocationInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutBinLocationInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutBinLocationInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutBinLocationNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput> | Prisma.GoodsReceiptItemCreateWithoutBinLocationInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutBinLocationInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutBinLocationInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutBinLocationInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyBinLocationInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutBinLocationInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutBinLocationInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutBinLocationInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutBinLocationInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemCreateNestedManyWithoutGrnInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput> | Prisma.GoodsReceiptItemCreateWithoutGrnInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyGrnInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput> | Prisma.GoodsReceiptItemCreateWithoutGrnInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyGrnInputEnvelope;
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
};
export type GoodsReceiptItemUpdateManyWithoutGrnNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput> | Prisma.GoodsReceiptItemCreateWithoutGrnInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutGrnInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutGrnInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyGrnInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutGrnInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutGrnInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutGrnInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutGrnInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput> | Prisma.GoodsReceiptItemCreateWithoutGrnInput[] | Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput | Prisma.GoodsReceiptItemCreateOrConnectWithoutGrnInput[];
    upsert?: Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutGrnInput | Prisma.GoodsReceiptItemUpsertWithWhereUniqueWithoutGrnInput[];
    createMany?: Prisma.GoodsReceiptItemCreateManyGrnInputEnvelope;
    set?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptItemWhereUniqueInput | Prisma.GoodsReceiptItemWhereUniqueInput[];
    update?: Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutGrnInput | Prisma.GoodsReceiptItemUpdateWithWhereUniqueWithoutGrnInput[];
    updateMany?: Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutGrnInput | Prisma.GoodsReceiptItemUpdateManyWithWhereWithoutGrnInput[];
    deleteMany?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
};
export type GoodsReceiptItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    grn: Prisma.GoodsReceiptNoteCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutGoodsReceiptItemsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutGoodsReceiptItemsInput;
};
export type GoodsReceiptItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput>;
};
export type GoodsReceiptItemCreateManyTenantInputEnvelope = {
    data: Prisma.GoodsReceiptItemCreateManyTenantInput | Prisma.GoodsReceiptItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutTenantInput>;
};
export type GoodsReceiptItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutTenantInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutTenantInput>;
};
export type GoodsReceiptItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.GoodsReceiptItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateManyMutationInput, Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutTenantInput>;
};
export type GoodsReceiptItemScalarWhereInput = {
    AND?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
    OR?: Prisma.GoodsReceiptItemScalarWhereInput[];
    NOT?: Prisma.GoodsReceiptItemScalarWhereInput | Prisma.GoodsReceiptItemScalarWhereInput[];
    id?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    tenantId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    grnId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    lineNo?: Prisma.IntFilter<"GoodsReceiptItem"> | number;
    itemId?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    description?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    qty?: Prisma.DecimalFilter<"GoodsReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    warehouseId?: Prisma.StringFilter<"GoodsReceiptItem"> | string;
    binLocationId?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    batchCode?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
    serialNo?: Prisma.StringNullableFilter<"GoodsReceiptItem"> | string | null;
};
export type GoodsReceiptItemCreateWithoutItemInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptItemsInput;
    grn: Prisma.GoodsReceiptNoteCreateNestedOneWithoutItemsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutGoodsReceiptItemsInput;
};
export type GoodsReceiptItemUncheckedCreateWithoutItemInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemCreateOrConnectWithoutItemInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput>;
};
export type GoodsReceiptItemCreateManyItemInputEnvelope = {
    data: Prisma.GoodsReceiptItemCreateManyItemInput | Prisma.GoodsReceiptItemCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptItemUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutItemInput>;
};
export type GoodsReceiptItemUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutItemInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutItemInput>;
};
export type GoodsReceiptItemUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.GoodsReceiptItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateManyMutationInput, Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutItemInput>;
};
export type GoodsReceiptItemCreateWithoutWarehouseInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptItemsInput;
    grn: Prisma.GoodsReceiptNoteCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutGoodsReceiptItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutGoodsReceiptItemsInput;
};
export type GoodsReceiptItemUncheckedCreateWithoutWarehouseInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemCreateOrConnectWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput>;
};
export type GoodsReceiptItemCreateManyWarehouseInputEnvelope = {
    data: Prisma.GoodsReceiptItemCreateManyWarehouseInput | Prisma.GoodsReceiptItemCreateManyWarehouseInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptItemUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutWarehouseInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutWarehouseInput>;
};
export type GoodsReceiptItemUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutWarehouseInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutWarehouseInput>;
};
export type GoodsReceiptItemUpdateManyWithWhereWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateManyMutationInput, Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutWarehouseInput>;
};
export type GoodsReceiptItemCreateWithoutBinLocationInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptItemsInput;
    grn: Prisma.GoodsReceiptNoteCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutGoodsReceiptItemsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptItemsInput;
};
export type GoodsReceiptItemUncheckedCreateWithoutBinLocationInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemCreateOrConnectWithoutBinLocationInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput>;
};
export type GoodsReceiptItemCreateManyBinLocationInputEnvelope = {
    data: Prisma.GoodsReceiptItemCreateManyBinLocationInput | Prisma.GoodsReceiptItemCreateManyBinLocationInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptItemUpsertWithWhereUniqueWithoutBinLocationInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutBinLocationInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutBinLocationInput>;
};
export type GoodsReceiptItemUpdateWithWhereUniqueWithoutBinLocationInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutBinLocationInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutBinLocationInput>;
};
export type GoodsReceiptItemUpdateManyWithWhereWithoutBinLocationInput = {
    where: Prisma.GoodsReceiptItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateManyMutationInput, Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutBinLocationInput>;
};
export type GoodsReceiptItemCreateWithoutGrnInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutGoodsReceiptItemsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptItemsInput;
    binLocation?: Prisma.BinLocationCreateNestedOneWithoutGoodsReceiptItemsInput;
};
export type GoodsReceiptItemUncheckedCreateWithoutGrnInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemCreateOrConnectWithoutGrnInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput>;
};
export type GoodsReceiptItemCreateManyGrnInputEnvelope = {
    data: Prisma.GoodsReceiptItemCreateManyGrnInput | Prisma.GoodsReceiptItemCreateManyGrnInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptItemUpsertWithWhereUniqueWithoutGrnInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutGrnInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedCreateWithoutGrnInput>;
};
export type GoodsReceiptItemUpdateWithWhereUniqueWithoutGrnInput = {
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateWithoutGrnInput, Prisma.GoodsReceiptItemUncheckedUpdateWithoutGrnInput>;
};
export type GoodsReceiptItemUpdateManyWithWhereWithoutGrnInput = {
    where: Prisma.GoodsReceiptItemScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateManyMutationInput, Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnInput>;
};
export type GoodsReceiptItemCreateManyTenantInput = {
    id?: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    grn?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutGoodsReceiptItemsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutGoodsReceiptItemsNestedInput;
};
export type GoodsReceiptItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemCreateManyItemInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    grn?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutItemsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutGoodsReceiptItemsNestedInput;
};
export type GoodsReceiptItemUncheckedUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemCreateManyWarehouseInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    grn?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutGoodsReceiptItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutGoodsReceiptItemsNestedInput;
};
export type GoodsReceiptItemUncheckedUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemCreateManyBinLocationInput = {
    id?: string;
    tenantId: string;
    grnId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemUpdateWithoutBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    grn?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutGoodsReceiptItemsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
};
export type GoodsReceiptItemUncheckedUpdateWithoutBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutBinLocationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemCreateManyGrnInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    warehouseId: string;
    binLocationId?: string | null;
    batchCode?: string | null;
    serialNo?: string | null;
};
export type GoodsReceiptItemUpdateWithoutGrnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutGoodsReceiptItemsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptItemsNestedInput;
    binLocation?: Prisma.BinLocationUpdateOneWithoutGoodsReceiptItemsNestedInput;
};
export type GoodsReceiptItemUncheckedUpdateWithoutGrnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemUncheckedUpdateManyWithoutGrnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    binLocationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type GoodsReceiptItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    grnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    warehouseId?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.GoodsReceiptItem$itemArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    binLocation?: boolean | Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs>;
}, ExtArgs["result"]["goodsReceiptItem"]>;
export type GoodsReceiptItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    grnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    warehouseId?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.GoodsReceiptItem$itemArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    binLocation?: boolean | Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs>;
}, ExtArgs["result"]["goodsReceiptItem"]>;
export type GoodsReceiptItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    grnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    warehouseId?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.GoodsReceiptItem$itemArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    binLocation?: boolean | Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs>;
}, ExtArgs["result"]["goodsReceiptItem"]>;
export type GoodsReceiptItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    grnId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    warehouseId?: boolean;
    binLocationId?: boolean;
    batchCode?: boolean;
    serialNo?: boolean;
};
export type GoodsReceiptItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "grnId" | "lineNo" | "itemId" | "description" | "qty" | "uomCode" | "warehouseId" | "binLocationId" | "batchCode" | "serialNo", ExtArgs["result"]["goodsReceiptItem"]>;
export type GoodsReceiptItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.GoodsReceiptItem$itemArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    binLocation?: boolean | Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs>;
};
export type GoodsReceiptItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.GoodsReceiptItem$itemArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    binLocation?: boolean | Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs>;
};
export type GoodsReceiptItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.GoodsReceiptItem$itemArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    binLocation?: boolean | Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs>;
};
export type $GoodsReceiptItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GoodsReceiptItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        grn: Prisma.$GoodsReceiptNotePayload<ExtArgs>;
        item: Prisma.$ItemPayload<ExtArgs> | null;
        warehouse: Prisma.$WarehousePayload<ExtArgs>;
        binLocation: Prisma.$BinLocationPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        grnId: string;
        lineNo: number;
        itemId: string | null;
        description: string;
        qty: runtime.Decimal;
        uomCode: string | null;
        warehouseId: string;
        binLocationId: string | null;
        batchCode: string | null;
        serialNo: string | null;
    }, ExtArgs["result"]["goodsReceiptItem"]>;
    composites: {};
};
export type GoodsReceiptItemGetPayload<S extends boolean | null | undefined | GoodsReceiptItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload, S>;
export type GoodsReceiptItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GoodsReceiptItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GoodsReceiptItemCountAggregateInputType | true;
};
export interface GoodsReceiptItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GoodsReceiptItem'];
        meta: {
            name: 'GoodsReceiptItem';
        };
    };
    findUnique<T extends GoodsReceiptItemFindUniqueArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GoodsReceiptItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GoodsReceiptItemFindFirstArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GoodsReceiptItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GoodsReceiptItemFindManyArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GoodsReceiptItemCreateArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemCreateArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GoodsReceiptItemCreateManyArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GoodsReceiptItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GoodsReceiptItemDeleteArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemDeleteArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GoodsReceiptItemUpdateArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemUpdateArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GoodsReceiptItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GoodsReceiptItemUpdateManyArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GoodsReceiptItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GoodsReceiptItemUpsertArgs>(args: Prisma.SelectSubset<T, GoodsReceiptItemUpsertArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GoodsReceiptItemCountArgs>(args?: Prisma.Subset<T, GoodsReceiptItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GoodsReceiptItemCountAggregateOutputType> : number>;
    aggregate<T extends GoodsReceiptItemAggregateArgs>(args: Prisma.Subset<T, GoodsReceiptItemAggregateArgs>): Prisma.PrismaPromise<GetGoodsReceiptItemAggregateType<T>>;
    groupBy<T extends GoodsReceiptItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GoodsReceiptItemGroupByArgs['orderBy'];
    } : {
        orderBy?: GoodsReceiptItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GoodsReceiptItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsReceiptItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GoodsReceiptItemFieldRefs;
}
export interface Prisma__GoodsReceiptItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    grn<T extends Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    item<T extends Prisma.GoodsReceiptItem$itemArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptItem$itemArgs<ExtArgs>>): Prisma.Prisma__ItemClient<runtime.Types.Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    warehouse<T extends Prisma.WarehouseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WarehouseDefaultArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    binLocation<T extends Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptItem$binLocationArgs<ExtArgs>>): Prisma.Prisma__BinLocationClient<runtime.Types.Result.GetResult<Prisma.$BinLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GoodsReceiptItemFieldRefs {
    readonly id: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly grnId: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"GoodsReceiptItem", 'Int'>;
    readonly itemId: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly description: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly qty: Prisma.FieldRef<"GoodsReceiptItem", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly warehouseId: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly binLocationId: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly batchCode: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
    readonly serialNo: Prisma.FieldRef<"GoodsReceiptItem", 'String'>;
}
export type GoodsReceiptItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
};
export type GoodsReceiptItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
};
export type GoodsReceiptItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptItemWhereInput;
    orderBy?: Prisma.GoodsReceiptItemOrderByWithRelationInput | Prisma.GoodsReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoodsReceiptItemScalarFieldEnum | Prisma.GoodsReceiptItemScalarFieldEnum[];
};
export type GoodsReceiptItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptItemWhereInput;
    orderBy?: Prisma.GoodsReceiptItemOrderByWithRelationInput | Prisma.GoodsReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoodsReceiptItemScalarFieldEnum | Prisma.GoodsReceiptItemScalarFieldEnum[];
};
export type GoodsReceiptItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptItemWhereInput;
    orderBy?: Prisma.GoodsReceiptItemOrderByWithRelationInput | Prisma.GoodsReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoodsReceiptItemScalarFieldEnum | Prisma.GoodsReceiptItemScalarFieldEnum[];
};
export type GoodsReceiptItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoodsReceiptItemCreateInput, Prisma.GoodsReceiptItemUncheckedCreateInput>;
};
export type GoodsReceiptItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GoodsReceiptItemCreateManyInput | Prisma.GoodsReceiptItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    data: Prisma.GoodsReceiptItemCreateManyInput | Prisma.GoodsReceiptItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GoodsReceiptItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GoodsReceiptItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateInput, Prisma.GoodsReceiptItemUncheckedUpdateInput>;
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
};
export type GoodsReceiptItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateManyMutationInput, Prisma.GoodsReceiptItemUncheckedUpdateManyInput>;
    where?: Prisma.GoodsReceiptItemWhereInput;
    limit?: number;
};
export type GoodsReceiptItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoodsReceiptItemUpdateManyMutationInput, Prisma.GoodsReceiptItemUncheckedUpdateManyInput>;
    where?: Prisma.GoodsReceiptItemWhereInput;
    limit?: number;
    include?: Prisma.GoodsReceiptItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GoodsReceiptItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptItemCreateInput, Prisma.GoodsReceiptItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GoodsReceiptItemUpdateInput, Prisma.GoodsReceiptItemUncheckedUpdateInput>;
};
export type GoodsReceiptItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptItemWhereUniqueInput;
};
export type GoodsReceiptItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoodsReceiptItemWhereInput;
    limit?: number;
};
export type GoodsReceiptItem$itemArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemSelect<ExtArgs> | null;
    omit?: Prisma.ItemOmit<ExtArgs> | null;
    include?: Prisma.ItemInclude<ExtArgs> | null;
    where?: Prisma.ItemWhereInput;
};
export type GoodsReceiptItem$binLocationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BinLocationSelect<ExtArgs> | null;
    omit?: Prisma.BinLocationOmit<ExtArgs> | null;
    include?: Prisma.BinLocationInclude<ExtArgs> | null;
    where?: Prisma.BinLocationWhereInput;
};
export type GoodsReceiptItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
};
