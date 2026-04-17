import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PackingItemModel = runtime.Types.Result.DefaultSelection<Prisma.$PackingItemPayload>;
export type AggregatePackingItem = {
    _count: PackingItemCountAggregateOutputType | null;
    _avg: PackingItemAvgAggregateOutputType | null;
    _sum: PackingItemSumAggregateOutputType | null;
    _min: PackingItemMinAggregateOutputType | null;
    _max: PackingItemMaxAggregateOutputType | null;
};
export type PackingItemAvgAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    weight: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    height: runtime.Decimal | null;
};
export type PackingItemSumAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    weight: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    height: runtime.Decimal | null;
};
export type PackingItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    packingId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    boxNo: string | null;
    weight: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    height: runtime.Decimal | null;
    trackingId: string | null;
};
export type PackingItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    packingId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    boxNo: string | null;
    weight: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    height: runtime.Decimal | null;
    trackingId: string | null;
};
export type PackingItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    packingId: number;
    lineNo: number;
    itemId: number;
    description: number;
    qty: number;
    uomCode: number;
    boxNo: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    trackingId: number;
    _all: number;
};
export type PackingItemAvgAggregateInputType = {
    lineNo?: true;
    qty?: true;
    weight?: true;
    length?: true;
    width?: true;
    height?: true;
};
export type PackingItemSumAggregateInputType = {
    lineNo?: true;
    qty?: true;
    weight?: true;
    length?: true;
    width?: true;
    height?: true;
};
export type PackingItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    packingId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    boxNo?: true;
    weight?: true;
    length?: true;
    width?: true;
    height?: true;
    trackingId?: true;
};
export type PackingItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    packingId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    boxNo?: true;
    weight?: true;
    length?: true;
    width?: true;
    height?: true;
    trackingId?: true;
};
export type PackingItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    packingId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    boxNo?: true;
    weight?: true;
    length?: true;
    width?: true;
    height?: true;
    trackingId?: true;
    _all?: true;
};
export type PackingItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PackingItemWhereInput;
    orderBy?: Prisma.PackingItemOrderByWithRelationInput | Prisma.PackingItemOrderByWithRelationInput[];
    cursor?: Prisma.PackingItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PackingItemCountAggregateInputType;
    _avg?: PackingItemAvgAggregateInputType;
    _sum?: PackingItemSumAggregateInputType;
    _min?: PackingItemMinAggregateInputType;
    _max?: PackingItemMaxAggregateInputType;
};
export type GetPackingItemAggregateType<T extends PackingItemAggregateArgs> = {
    [P in keyof T & keyof AggregatePackingItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePackingItem[P]> : Prisma.GetScalarType<T[P], AggregatePackingItem[P]>;
};
export type PackingItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PackingItemWhereInput;
    orderBy?: Prisma.PackingItemOrderByWithAggregationInput | Prisma.PackingItemOrderByWithAggregationInput[];
    by: Prisma.PackingItemScalarFieldEnum[] | Prisma.PackingItemScalarFieldEnum;
    having?: Prisma.PackingItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PackingItemCountAggregateInputType | true;
    _avg?: PackingItemAvgAggregateInputType;
    _sum?: PackingItemSumAggregateInputType;
    _min?: PackingItemMinAggregateInputType;
    _max?: PackingItemMaxAggregateInputType;
};
export type PackingItemGroupByOutputType = {
    id: string;
    tenantId: string;
    packingId: string;
    lineNo: number;
    itemId: string | null;
    description: string;
    qty: runtime.Decimal;
    uomCode: string | null;
    boxNo: string | null;
    weight: runtime.Decimal | null;
    length: runtime.Decimal | null;
    width: runtime.Decimal | null;
    height: runtime.Decimal | null;
    trackingId: string | null;
    _count: PackingItemCountAggregateOutputType | null;
    _avg: PackingItemAvgAggregateOutputType | null;
    _sum: PackingItemSumAggregateOutputType | null;
    _min: PackingItemMinAggregateOutputType | null;
    _max: PackingItemMaxAggregateOutputType | null;
};
export type GetPackingItemGroupByPayload<T extends PackingItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PackingItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PackingItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PackingItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PackingItemGroupByOutputType[P]>;
}>>;
export type PackingItemWhereInput = {
    AND?: Prisma.PackingItemWhereInput | Prisma.PackingItemWhereInput[];
    OR?: Prisma.PackingItemWhereInput[];
    NOT?: Prisma.PackingItemWhereInput | Prisma.PackingItemWhereInput[];
    id?: Prisma.StringFilter<"PackingItem"> | string;
    tenantId?: Prisma.StringFilter<"PackingItem"> | string;
    packingId?: Prisma.StringFilter<"PackingItem"> | string;
    lineNo?: Prisma.IntFilter<"PackingItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    description?: Prisma.StringFilter<"PackingItem"> | string;
    qty?: Prisma.DecimalFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    boxNo?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    weight?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    packing?: Prisma.XOR<Prisma.PackingScalarRelationFilter, Prisma.PackingWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
};
export type PackingItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    packingId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    boxNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    weight?: Prisma.SortOrderInput | Prisma.SortOrder;
    length?: Prisma.SortOrderInput | Prisma.SortOrder;
    width?: Prisma.SortOrderInput | Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    trackingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    packing?: Prisma.PackingOrderByWithRelationInput;
    item?: Prisma.ItemOrderByWithRelationInput;
};
export type PackingItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_packingId_lineNo?: Prisma.PackingItemTenantIdPackingIdLineNoCompoundUniqueInput;
    AND?: Prisma.PackingItemWhereInput | Prisma.PackingItemWhereInput[];
    OR?: Prisma.PackingItemWhereInput[];
    NOT?: Prisma.PackingItemWhereInput | Prisma.PackingItemWhereInput[];
    tenantId?: Prisma.StringFilter<"PackingItem"> | string;
    packingId?: Prisma.StringFilter<"PackingItem"> | string;
    lineNo?: Prisma.IntFilter<"PackingItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    description?: Prisma.StringFilter<"PackingItem"> | string;
    qty?: Prisma.DecimalFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    boxNo?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    weight?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    packing?: Prisma.XOR<Prisma.PackingScalarRelationFilter, Prisma.PackingWhereInput>;
    item?: Prisma.XOR<Prisma.ItemNullableScalarRelationFilter, Prisma.ItemWhereInput> | null;
}, "id" | "tenantId_packingId_lineNo">;
export type PackingItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    packingId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    boxNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    weight?: Prisma.SortOrderInput | Prisma.SortOrder;
    length?: Prisma.SortOrderInput | Prisma.SortOrder;
    width?: Prisma.SortOrderInput | Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    trackingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PackingItemCountOrderByAggregateInput;
    _avg?: Prisma.PackingItemAvgOrderByAggregateInput;
    _max?: Prisma.PackingItemMaxOrderByAggregateInput;
    _min?: Prisma.PackingItemMinOrderByAggregateInput;
    _sum?: Prisma.PackingItemSumOrderByAggregateInput;
};
export type PackingItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.PackingItemScalarWhereWithAggregatesInput | Prisma.PackingItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.PackingItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PackingItemScalarWhereWithAggregatesInput | Prisma.PackingItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PackingItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"PackingItem"> | string;
    packingId?: Prisma.StringWithAggregatesFilter<"PackingItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"PackingItem"> | number;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"PackingItem"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"PackingItem"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"PackingItem"> | string | null;
    boxNo?: Prisma.StringNullableWithAggregatesFilter<"PackingItem"> | string | null;
    weight?: Prisma.DecimalNullableWithAggregatesFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.DecimalNullableWithAggregatesFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.DecimalNullableWithAggregatesFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.DecimalNullableWithAggregatesFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.StringNullableWithAggregatesFilter<"PackingItem"> | string | null;
};
export type PackingItemCreateInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPackingItemsInput;
    packing: Prisma.PackingCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPackingItemsInput;
};
export type PackingItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    packingId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPackingItemsNestedInput;
    packing?: Prisma.PackingUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPackingItemsNestedInput;
};
export type PackingItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    packingId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemCreateManyInput = {
    id?: string;
    tenantId: string;
    packingId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    packingId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemListRelationFilter = {
    every?: Prisma.PackingItemWhereInput;
    some?: Prisma.PackingItemWhereInput;
    none?: Prisma.PackingItemWhereInput;
};
export type PackingItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PackingItemTenantIdPackingIdLineNoCompoundUniqueInput = {
    tenantId: string;
    packingId: string;
    lineNo: number;
};
export type PackingItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    packingId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    boxNo?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    trackingId?: Prisma.SortOrder;
};
export type PackingItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type PackingItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    packingId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    boxNo?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    trackingId?: Prisma.SortOrder;
};
export type PackingItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    packingId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    boxNo?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    trackingId?: Prisma.SortOrder;
};
export type PackingItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    length?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type PackingItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutTenantInput, Prisma.PackingItemUncheckedCreateWithoutTenantInput> | Prisma.PackingItemCreateWithoutTenantInput[] | Prisma.PackingItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutTenantInput | Prisma.PackingItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PackingItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
};
export type PackingItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutTenantInput, Prisma.PackingItemUncheckedCreateWithoutTenantInput> | Prisma.PackingItemCreateWithoutTenantInput[] | Prisma.PackingItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutTenantInput | Prisma.PackingItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PackingItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
};
export type PackingItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutTenantInput, Prisma.PackingItemUncheckedCreateWithoutTenantInput> | Prisma.PackingItemCreateWithoutTenantInput[] | Prisma.PackingItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutTenantInput | Prisma.PackingItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PackingItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PackingItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PackingItemCreateManyTenantInputEnvelope;
    set?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    disconnect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    delete?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    update?: Prisma.PackingItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PackingItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PackingItemUpdateManyWithWhereWithoutTenantInput | Prisma.PackingItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
};
export type PackingItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutTenantInput, Prisma.PackingItemUncheckedCreateWithoutTenantInput> | Prisma.PackingItemCreateWithoutTenantInput[] | Prisma.PackingItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutTenantInput | Prisma.PackingItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PackingItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PackingItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PackingItemCreateManyTenantInputEnvelope;
    set?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    disconnect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    delete?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    update?: Prisma.PackingItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PackingItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PackingItemUpdateManyWithWhereWithoutTenantInput | Prisma.PackingItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
};
export type PackingItemCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutItemInput, Prisma.PackingItemUncheckedCreateWithoutItemInput> | Prisma.PackingItemCreateWithoutItemInput[] | Prisma.PackingItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutItemInput | Prisma.PackingItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.PackingItemCreateManyItemInputEnvelope;
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
};
export type PackingItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutItemInput, Prisma.PackingItemUncheckedCreateWithoutItemInput> | Prisma.PackingItemCreateWithoutItemInput[] | Prisma.PackingItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutItemInput | Prisma.PackingItemCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.PackingItemCreateManyItemInputEnvelope;
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
};
export type PackingItemUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutItemInput, Prisma.PackingItemUncheckedCreateWithoutItemInput> | Prisma.PackingItemCreateWithoutItemInput[] | Prisma.PackingItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutItemInput | Prisma.PackingItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.PackingItemUpsertWithWhereUniqueWithoutItemInput | Prisma.PackingItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.PackingItemCreateManyItemInputEnvelope;
    set?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    disconnect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    delete?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    update?: Prisma.PackingItemUpdateWithWhereUniqueWithoutItemInput | Prisma.PackingItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.PackingItemUpdateManyWithWhereWithoutItemInput | Prisma.PackingItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
};
export type PackingItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutItemInput, Prisma.PackingItemUncheckedCreateWithoutItemInput> | Prisma.PackingItemCreateWithoutItemInput[] | Prisma.PackingItemUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutItemInput | Prisma.PackingItemCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.PackingItemUpsertWithWhereUniqueWithoutItemInput | Prisma.PackingItemUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.PackingItemCreateManyItemInputEnvelope;
    set?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    disconnect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    delete?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    update?: Prisma.PackingItemUpdateWithWhereUniqueWithoutItemInput | Prisma.PackingItemUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.PackingItemUpdateManyWithWhereWithoutItemInput | Prisma.PackingItemUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
};
export type PackingItemCreateNestedManyWithoutPackingInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutPackingInput, Prisma.PackingItemUncheckedCreateWithoutPackingInput> | Prisma.PackingItemCreateWithoutPackingInput[] | Prisma.PackingItemUncheckedCreateWithoutPackingInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutPackingInput | Prisma.PackingItemCreateOrConnectWithoutPackingInput[];
    createMany?: Prisma.PackingItemCreateManyPackingInputEnvelope;
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
};
export type PackingItemUncheckedCreateNestedManyWithoutPackingInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutPackingInput, Prisma.PackingItemUncheckedCreateWithoutPackingInput> | Prisma.PackingItemCreateWithoutPackingInput[] | Prisma.PackingItemUncheckedCreateWithoutPackingInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutPackingInput | Prisma.PackingItemCreateOrConnectWithoutPackingInput[];
    createMany?: Prisma.PackingItemCreateManyPackingInputEnvelope;
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
};
export type PackingItemUpdateManyWithoutPackingNestedInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutPackingInput, Prisma.PackingItemUncheckedCreateWithoutPackingInput> | Prisma.PackingItemCreateWithoutPackingInput[] | Prisma.PackingItemUncheckedCreateWithoutPackingInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutPackingInput | Prisma.PackingItemCreateOrConnectWithoutPackingInput[];
    upsert?: Prisma.PackingItemUpsertWithWhereUniqueWithoutPackingInput | Prisma.PackingItemUpsertWithWhereUniqueWithoutPackingInput[];
    createMany?: Prisma.PackingItemCreateManyPackingInputEnvelope;
    set?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    disconnect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    delete?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    update?: Prisma.PackingItemUpdateWithWhereUniqueWithoutPackingInput | Prisma.PackingItemUpdateWithWhereUniqueWithoutPackingInput[];
    updateMany?: Prisma.PackingItemUpdateManyWithWhereWithoutPackingInput | Prisma.PackingItemUpdateManyWithWhereWithoutPackingInput[];
    deleteMany?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
};
export type PackingItemUncheckedUpdateManyWithoutPackingNestedInput = {
    create?: Prisma.XOR<Prisma.PackingItemCreateWithoutPackingInput, Prisma.PackingItemUncheckedCreateWithoutPackingInput> | Prisma.PackingItemCreateWithoutPackingInput[] | Prisma.PackingItemUncheckedCreateWithoutPackingInput[];
    connectOrCreate?: Prisma.PackingItemCreateOrConnectWithoutPackingInput | Prisma.PackingItemCreateOrConnectWithoutPackingInput[];
    upsert?: Prisma.PackingItemUpsertWithWhereUniqueWithoutPackingInput | Prisma.PackingItemUpsertWithWhereUniqueWithoutPackingInput[];
    createMany?: Prisma.PackingItemCreateManyPackingInputEnvelope;
    set?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    disconnect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    delete?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    connect?: Prisma.PackingItemWhereUniqueInput | Prisma.PackingItemWhereUniqueInput[];
    update?: Prisma.PackingItemUpdateWithWhereUniqueWithoutPackingInput | Prisma.PackingItemUpdateWithWhereUniqueWithoutPackingInput[];
    updateMany?: Prisma.PackingItemUpdateManyWithWhereWithoutPackingInput | Prisma.PackingItemUpdateManyWithWhereWithoutPackingInput[];
    deleteMany?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
};
export type PackingItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
    packing: Prisma.PackingCreateNestedOneWithoutItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPackingItemsInput;
};
export type PackingItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    packingId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PackingItemCreateWithoutTenantInput, Prisma.PackingItemUncheckedCreateWithoutTenantInput>;
};
export type PackingItemCreateManyTenantInputEnvelope = {
    data: Prisma.PackingItemCreateManyTenantInput | Prisma.PackingItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type PackingItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PackingItemUpdateWithoutTenantInput, Prisma.PackingItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.PackingItemCreateWithoutTenantInput, Prisma.PackingItemUncheckedCreateWithoutTenantInput>;
};
export type PackingItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PackingItemUpdateWithoutTenantInput, Prisma.PackingItemUncheckedUpdateWithoutTenantInput>;
};
export type PackingItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.PackingItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PackingItemUpdateManyMutationInput, Prisma.PackingItemUncheckedUpdateManyWithoutTenantInput>;
};
export type PackingItemScalarWhereInput = {
    AND?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
    OR?: Prisma.PackingItemScalarWhereInput[];
    NOT?: Prisma.PackingItemScalarWhereInput | Prisma.PackingItemScalarWhereInput[];
    id?: Prisma.StringFilter<"PackingItem"> | string;
    tenantId?: Prisma.StringFilter<"PackingItem"> | string;
    packingId?: Prisma.StringFilter<"PackingItem"> | string;
    lineNo?: Prisma.IntFilter<"PackingItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    description?: Prisma.StringFilter<"PackingItem"> | string;
    qty?: Prisma.DecimalFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    boxNo?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
    weight?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.DecimalNullableFilter<"PackingItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.StringNullableFilter<"PackingItem"> | string | null;
};
export type PackingItemCreateWithoutItemInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPackingItemsInput;
    packing: Prisma.PackingCreateNestedOneWithoutItemsInput;
};
export type PackingItemUncheckedCreateWithoutItemInput = {
    id?: string;
    tenantId: string;
    packingId: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemCreateOrConnectWithoutItemInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PackingItemCreateWithoutItemInput, Prisma.PackingItemUncheckedCreateWithoutItemInput>;
};
export type PackingItemCreateManyItemInputEnvelope = {
    data: Prisma.PackingItemCreateManyItemInput | Prisma.PackingItemCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type PackingItemUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PackingItemUpdateWithoutItemInput, Prisma.PackingItemUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.PackingItemCreateWithoutItemInput, Prisma.PackingItemUncheckedCreateWithoutItemInput>;
};
export type PackingItemUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PackingItemUpdateWithoutItemInput, Prisma.PackingItemUncheckedUpdateWithoutItemInput>;
};
export type PackingItemUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.PackingItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PackingItemUpdateManyMutationInput, Prisma.PackingItemUncheckedUpdateManyWithoutItemInput>;
};
export type PackingItemCreateWithoutPackingInput = {
    id?: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPackingItemsInput;
    item?: Prisma.ItemCreateNestedOneWithoutPackingItemsInput;
};
export type PackingItemUncheckedCreateWithoutPackingInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemCreateOrConnectWithoutPackingInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PackingItemCreateWithoutPackingInput, Prisma.PackingItemUncheckedCreateWithoutPackingInput>;
};
export type PackingItemCreateManyPackingInputEnvelope = {
    data: Prisma.PackingItemCreateManyPackingInput | Prisma.PackingItemCreateManyPackingInput[];
    skipDuplicates?: boolean;
};
export type PackingItemUpsertWithWhereUniqueWithoutPackingInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PackingItemUpdateWithoutPackingInput, Prisma.PackingItemUncheckedUpdateWithoutPackingInput>;
    create: Prisma.XOR<Prisma.PackingItemCreateWithoutPackingInput, Prisma.PackingItemUncheckedCreateWithoutPackingInput>;
};
export type PackingItemUpdateWithWhereUniqueWithoutPackingInput = {
    where: Prisma.PackingItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PackingItemUpdateWithoutPackingInput, Prisma.PackingItemUncheckedUpdateWithoutPackingInput>;
};
export type PackingItemUpdateManyWithWhereWithoutPackingInput = {
    where: Prisma.PackingItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PackingItemUpdateManyMutationInput, Prisma.PackingItemUncheckedUpdateManyWithoutPackingInput>;
};
export type PackingItemCreateManyTenantInput = {
    id?: string;
    packingId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    packing?: Prisma.PackingUpdateOneRequiredWithoutItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPackingItemsNestedInput;
};
export type PackingItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    packingId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    packingId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemCreateManyItemInput = {
    id?: string;
    tenantId: string;
    packingId: string;
    lineNo: number;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPackingItemsNestedInput;
    packing?: Prisma.PackingUpdateOneRequiredWithoutItemsNestedInput;
};
export type PackingItemUncheckedUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    packingId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemUncheckedUpdateManyWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    packingId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemCreateManyPackingInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    boxNo?: string | null;
    weight?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: string | null;
};
export type PackingItemUpdateWithoutPackingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPackingItemsNestedInput;
    item?: Prisma.ItemUpdateOneWithoutPackingItemsNestedInput;
};
export type PackingItemUncheckedUpdateWithoutPackingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemUncheckedUpdateManyWithoutPackingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    boxNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    weight?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    length?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    width?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    height?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    trackingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type PackingItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    packingId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    boxNo?: boolean;
    weight?: boolean;
    length?: boolean;
    width?: boolean;
    height?: boolean;
    trackingId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    packing?: boolean | Prisma.PackingDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PackingItem$itemArgs<ExtArgs>;
}, ExtArgs["result"]["packingItem"]>;
export type PackingItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    packingId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    boxNo?: boolean;
    weight?: boolean;
    length?: boolean;
    width?: boolean;
    height?: boolean;
    trackingId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    packing?: boolean | Prisma.PackingDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PackingItem$itemArgs<ExtArgs>;
}, ExtArgs["result"]["packingItem"]>;
export type PackingItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    packingId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    boxNo?: boolean;
    weight?: boolean;
    length?: boolean;
    width?: boolean;
    height?: boolean;
    trackingId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    packing?: boolean | Prisma.PackingDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PackingItem$itemArgs<ExtArgs>;
}, ExtArgs["result"]["packingItem"]>;
export type PackingItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    packingId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    boxNo?: boolean;
    weight?: boolean;
    length?: boolean;
    width?: boolean;
    height?: boolean;
    trackingId?: boolean;
};
export type PackingItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "packingId" | "lineNo" | "itemId" | "description" | "qty" | "uomCode" | "boxNo" | "weight" | "length" | "width" | "height" | "trackingId", ExtArgs["result"]["packingItem"]>;
export type PackingItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    packing?: boolean | Prisma.PackingDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PackingItem$itemArgs<ExtArgs>;
};
export type PackingItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    packing?: boolean | Prisma.PackingDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PackingItem$itemArgs<ExtArgs>;
};
export type PackingItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    packing?: boolean | Prisma.PackingDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.PackingItem$itemArgs<ExtArgs>;
};
export type $PackingItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PackingItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        packing: Prisma.$PackingPayload<ExtArgs>;
        item: Prisma.$ItemPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        packingId: string;
        lineNo: number;
        itemId: string | null;
        description: string;
        qty: runtime.Decimal;
        uomCode: string | null;
        boxNo: string | null;
        weight: runtime.Decimal | null;
        length: runtime.Decimal | null;
        width: runtime.Decimal | null;
        height: runtime.Decimal | null;
        trackingId: string | null;
    }, ExtArgs["result"]["packingItem"]>;
    composites: {};
};
export type PackingItemGetPayload<S extends boolean | null | undefined | PackingItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PackingItemPayload, S>;
export type PackingItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PackingItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PackingItemCountAggregateInputType | true;
};
export interface PackingItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PackingItem'];
        meta: {
            name: 'PackingItem';
        };
    };
    findUnique<T extends PackingItemFindUniqueArgs>(args: Prisma.SelectSubset<T, PackingItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PackingItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PackingItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PackingItemFindFirstArgs>(args?: Prisma.SelectSubset<T, PackingItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PackingItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PackingItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PackingItemFindManyArgs>(args?: Prisma.SelectSubset<T, PackingItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PackingItemCreateArgs>(args: Prisma.SelectSubset<T, PackingItemCreateArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PackingItemCreateManyArgs>(args?: Prisma.SelectSubset<T, PackingItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PackingItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PackingItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PackingItemDeleteArgs>(args: Prisma.SelectSubset<T, PackingItemDeleteArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PackingItemUpdateArgs>(args: Prisma.SelectSubset<T, PackingItemUpdateArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PackingItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, PackingItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PackingItemUpdateManyArgs>(args: Prisma.SelectSubset<T, PackingItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PackingItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PackingItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PackingItemUpsertArgs>(args: Prisma.SelectSubset<T, PackingItemUpsertArgs<ExtArgs>>): Prisma.Prisma__PackingItemClient<runtime.Types.Result.GetResult<Prisma.$PackingItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PackingItemCountArgs>(args?: Prisma.Subset<T, PackingItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PackingItemCountAggregateOutputType> : number>;
    aggregate<T extends PackingItemAggregateArgs>(args: Prisma.Subset<T, PackingItemAggregateArgs>): Prisma.PrismaPromise<GetPackingItemAggregateType<T>>;
    groupBy<T extends PackingItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PackingItemGroupByArgs['orderBy'];
    } : {
        orderBy?: PackingItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PackingItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackingItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PackingItemFieldRefs;
}
export interface Prisma__PackingItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    packing<T extends Prisma.PackingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PackingDefaultArgs<ExtArgs>>): Prisma.Prisma__PackingClient<runtime.Types.Result.GetResult<Prisma.$PackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    item<T extends Prisma.PackingItem$itemArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PackingItem$itemArgs<ExtArgs>>): Prisma.Prisma__ItemClient<runtime.Types.Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PackingItemFieldRefs {
    readonly id: Prisma.FieldRef<"PackingItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"PackingItem", 'String'>;
    readonly packingId: Prisma.FieldRef<"PackingItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"PackingItem", 'Int'>;
    readonly itemId: Prisma.FieldRef<"PackingItem", 'String'>;
    readonly description: Prisma.FieldRef<"PackingItem", 'String'>;
    readonly qty: Prisma.FieldRef<"PackingItem", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"PackingItem", 'String'>;
    readonly boxNo: Prisma.FieldRef<"PackingItem", 'String'>;
    readonly weight: Prisma.FieldRef<"PackingItem", 'Decimal'>;
    readonly length: Prisma.FieldRef<"PackingItem", 'Decimal'>;
    readonly width: Prisma.FieldRef<"PackingItem", 'Decimal'>;
    readonly height: Prisma.FieldRef<"PackingItem", 'Decimal'>;
    readonly trackingId: Prisma.FieldRef<"PackingItem", 'String'>;
}
export type PackingItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    where: Prisma.PackingItemWhereUniqueInput;
};
export type PackingItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    where: Prisma.PackingItemWhereUniqueInput;
};
export type PackingItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    where?: Prisma.PackingItemWhereInput;
    orderBy?: Prisma.PackingItemOrderByWithRelationInput | Prisma.PackingItemOrderByWithRelationInput[];
    cursor?: Prisma.PackingItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PackingItemScalarFieldEnum | Prisma.PackingItemScalarFieldEnum[];
};
export type PackingItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    where?: Prisma.PackingItemWhereInput;
    orderBy?: Prisma.PackingItemOrderByWithRelationInput | Prisma.PackingItemOrderByWithRelationInput[];
    cursor?: Prisma.PackingItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PackingItemScalarFieldEnum | Prisma.PackingItemScalarFieldEnum[];
};
export type PackingItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    where?: Prisma.PackingItemWhereInput;
    orderBy?: Prisma.PackingItemOrderByWithRelationInput | Prisma.PackingItemOrderByWithRelationInput[];
    cursor?: Prisma.PackingItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PackingItemScalarFieldEnum | Prisma.PackingItemScalarFieldEnum[];
};
export type PackingItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PackingItemCreateInput, Prisma.PackingItemUncheckedCreateInput>;
};
export type PackingItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PackingItemCreateManyInput | Prisma.PackingItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PackingItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    data: Prisma.PackingItemCreateManyInput | Prisma.PackingItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PackingItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PackingItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PackingItemUpdateInput, Prisma.PackingItemUncheckedUpdateInput>;
    where: Prisma.PackingItemWhereUniqueInput;
};
export type PackingItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PackingItemUpdateManyMutationInput, Prisma.PackingItemUncheckedUpdateManyInput>;
    where?: Prisma.PackingItemWhereInput;
    limit?: number;
};
export type PackingItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PackingItemUpdateManyMutationInput, Prisma.PackingItemUncheckedUpdateManyInput>;
    where?: Prisma.PackingItemWhereInput;
    limit?: number;
    include?: Prisma.PackingItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PackingItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    where: Prisma.PackingItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PackingItemCreateInput, Prisma.PackingItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PackingItemUpdateInput, Prisma.PackingItemUncheckedUpdateInput>;
};
export type PackingItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
    where: Prisma.PackingItemWhereUniqueInput;
};
export type PackingItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PackingItemWhereInput;
    limit?: number;
};
export type PackingItem$itemArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemSelect<ExtArgs> | null;
    omit?: Prisma.ItemOmit<ExtArgs> | null;
    include?: Prisma.ItemInclude<ExtArgs> | null;
    where?: Prisma.ItemWhereInput;
};
export type PackingItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PackingItemSelect<ExtArgs> | null;
    omit?: Prisma.PackingItemOmit<ExtArgs> | null;
    include?: Prisma.PackingItemInclude<ExtArgs> | null;
};
