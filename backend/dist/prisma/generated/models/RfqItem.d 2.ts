import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RfqItemModel = runtime.Types.Result.DefaultSelection<Prisma.$RfqItemPayload>;
export type AggregateRfqItem = {
    _count: RfqItemCountAggregateOutputType | null;
    _avg: RfqItemAvgAggregateOutputType | null;
    _sum: RfqItemSumAggregateOutputType | null;
    _min: RfqItemMinAggregateOutputType | null;
    _max: RfqItemMaxAggregateOutputType | null;
};
export type RfqItemAvgAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    targetPrice: runtime.Decimal | null;
};
export type RfqItemSumAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    targetPrice: runtime.Decimal | null;
};
export type RfqItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    rfqId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    targetPrice: runtime.Decimal | null;
};
export type RfqItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    rfqId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    targetPrice: runtime.Decimal | null;
};
export type RfqItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    rfqId: number;
    lineNo: number;
    itemId: number;
    description: number;
    qty: number;
    uomCode: number;
    targetPrice: number;
    _all: number;
};
export type RfqItemAvgAggregateInputType = {
    lineNo?: true;
    qty?: true;
    targetPrice?: true;
};
export type RfqItemSumAggregateInputType = {
    lineNo?: true;
    qty?: true;
    targetPrice?: true;
};
export type RfqItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    rfqId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    targetPrice?: true;
};
export type RfqItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    rfqId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    targetPrice?: true;
};
export type RfqItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    rfqId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    targetPrice?: true;
    _all?: true;
};
export type RfqItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqItemWhereInput;
    orderBy?: Prisma.RfqItemOrderByWithRelationInput | Prisma.RfqItemOrderByWithRelationInput[];
    cursor?: Prisma.RfqItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RfqItemCountAggregateInputType;
    _avg?: RfqItemAvgAggregateInputType;
    _sum?: RfqItemSumAggregateInputType;
    _min?: RfqItemMinAggregateInputType;
    _max?: RfqItemMaxAggregateInputType;
};
export type GetRfqItemAggregateType<T extends RfqItemAggregateArgs> = {
    [P in keyof T & keyof AggregateRfqItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRfqItem[P]> : Prisma.GetScalarType<T[P], AggregateRfqItem[P]>;
};
export type RfqItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqItemWhereInput;
    orderBy?: Prisma.RfqItemOrderByWithAggregationInput | Prisma.RfqItemOrderByWithAggregationInput[];
    by: Prisma.RfqItemScalarFieldEnum[] | Prisma.RfqItemScalarFieldEnum;
    having?: Prisma.RfqItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RfqItemCountAggregateInputType | true;
    _avg?: RfqItemAvgAggregateInputType;
    _sum?: RfqItemSumAggregateInputType;
    _min?: RfqItemMinAggregateInputType;
    _max?: RfqItemMaxAggregateInputType;
};
export type RfqItemGroupByOutputType = {
    id: string;
    tenantId: string;
    rfqId: string;
    lineNo: number;
    itemId: string | null;
    description: string;
    qty: runtime.Decimal;
    uomCode: string | null;
    targetPrice: runtime.Decimal;
    _count: RfqItemCountAggregateOutputType | null;
    _avg: RfqItemAvgAggregateOutputType | null;
    _sum: RfqItemSumAggregateOutputType | null;
    _min: RfqItemMinAggregateOutputType | null;
    _max: RfqItemMaxAggregateOutputType | null;
};
export type GetRfqItemGroupByPayload<T extends RfqItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RfqItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RfqItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RfqItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RfqItemGroupByOutputType[P]>;
}>>;
export type RfqItemWhereInput = {
    AND?: Prisma.RfqItemWhereInput | Prisma.RfqItemWhereInput[];
    OR?: Prisma.RfqItemWhereInput[];
    NOT?: Prisma.RfqItemWhereInput | Prisma.RfqItemWhereInput[];
    id?: Prisma.StringFilter<"RfqItem"> | string;
    tenantId?: Prisma.StringFilter<"RfqItem"> | string;
    rfqId?: Prisma.StringFilter<"RfqItem"> | string;
    lineNo?: Prisma.IntFilter<"RfqItem"> | number;
    itemId?: Prisma.StringNullableFilter<"RfqItem"> | string | null;
    description?: Prisma.StringFilter<"RfqItem"> | string;
    qty?: Prisma.DecimalFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"RfqItem"> | string | null;
    targetPrice?: Prisma.DecimalFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
};
export type RfqItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetPrice?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    rfq?: Prisma.RfqOrderByWithRelationInput;
};
export type RfqItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_rfqId_lineNo?: Prisma.RfqItemTenantIdRfqIdLineNoCompoundUniqueInput;
    AND?: Prisma.RfqItemWhereInput | Prisma.RfqItemWhereInput[];
    OR?: Prisma.RfqItemWhereInput[];
    NOT?: Prisma.RfqItemWhereInput | Prisma.RfqItemWhereInput[];
    tenantId?: Prisma.StringFilter<"RfqItem"> | string;
    rfqId?: Prisma.StringFilter<"RfqItem"> | string;
    lineNo?: Prisma.IntFilter<"RfqItem"> | number;
    itemId?: Prisma.StringNullableFilter<"RfqItem"> | string | null;
    description?: Prisma.StringFilter<"RfqItem"> | string;
    qty?: Prisma.DecimalFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"RfqItem"> | string | null;
    targetPrice?: Prisma.DecimalFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
}, "id" | "tenantId_rfqId_lineNo">;
export type RfqItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetPrice?: Prisma.SortOrder;
    _count?: Prisma.RfqItemCountOrderByAggregateInput;
    _avg?: Prisma.RfqItemAvgOrderByAggregateInput;
    _max?: Prisma.RfqItemMaxOrderByAggregateInput;
    _min?: Prisma.RfqItemMinOrderByAggregateInput;
    _sum?: Prisma.RfqItemSumOrderByAggregateInput;
};
export type RfqItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.RfqItemScalarWhereWithAggregatesInput | Prisma.RfqItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.RfqItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RfqItemScalarWhereWithAggregatesInput | Prisma.RfqItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RfqItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"RfqItem"> | string;
    rfqId?: Prisma.StringWithAggregatesFilter<"RfqItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"RfqItem"> | number;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"RfqItem"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"RfqItem"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"RfqItem"> | string | null;
    targetPrice?: Prisma.DecimalWithAggregatesFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemCreateInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutRfqItemsInput;
    rfq: Prisma.RfqCreateNestedOneWithoutItemsInput;
};
export type RfqItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    rfqId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutRfqItemsNestedInput;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutItemsNestedInput;
};
export type RfqItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemCreateManyInput = {
    id?: string;
    tenantId: string;
    rfqId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemListRelationFilter = {
    every?: Prisma.RfqItemWhereInput;
    some?: Prisma.RfqItemWhereInput;
    none?: Prisma.RfqItemWhereInput;
};
export type RfqItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RfqItemTenantIdRfqIdLineNoCompoundUniqueInput = {
    tenantId: string;
    rfqId: string;
    lineNo: number;
};
export type RfqItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    targetPrice?: Prisma.SortOrder;
};
export type RfqItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    targetPrice?: Prisma.SortOrder;
};
export type RfqItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    targetPrice?: Prisma.SortOrder;
};
export type RfqItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    targetPrice?: Prisma.SortOrder;
};
export type RfqItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    targetPrice?: Prisma.SortOrder;
};
export type RfqItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutTenantInput, Prisma.RfqItemUncheckedCreateWithoutTenantInput> | Prisma.RfqItemCreateWithoutTenantInput[] | Prisma.RfqItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutTenantInput | Prisma.RfqItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.RfqItemCreateManyTenantInputEnvelope;
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
};
export type RfqItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutTenantInput, Prisma.RfqItemUncheckedCreateWithoutTenantInput> | Prisma.RfqItemCreateWithoutTenantInput[] | Prisma.RfqItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutTenantInput | Prisma.RfqItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.RfqItemCreateManyTenantInputEnvelope;
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
};
export type RfqItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutTenantInput, Prisma.RfqItemUncheckedCreateWithoutTenantInput> | Prisma.RfqItemCreateWithoutTenantInput[] | Prisma.RfqItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutTenantInput | Prisma.RfqItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.RfqItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.RfqItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.RfqItemCreateManyTenantInputEnvelope;
    set?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    disconnect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    delete?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    update?: Prisma.RfqItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.RfqItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.RfqItemUpdateManyWithWhereWithoutTenantInput | Prisma.RfqItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.RfqItemScalarWhereInput | Prisma.RfqItemScalarWhereInput[];
};
export type RfqItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutTenantInput, Prisma.RfqItemUncheckedCreateWithoutTenantInput> | Prisma.RfqItemCreateWithoutTenantInput[] | Prisma.RfqItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutTenantInput | Prisma.RfqItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.RfqItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.RfqItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.RfqItemCreateManyTenantInputEnvelope;
    set?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    disconnect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    delete?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    update?: Prisma.RfqItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.RfqItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.RfqItemUpdateManyWithWhereWithoutTenantInput | Prisma.RfqItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.RfqItemScalarWhereInput | Prisma.RfqItemScalarWhereInput[];
};
export type RfqItemCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutRfqInput, Prisma.RfqItemUncheckedCreateWithoutRfqInput> | Prisma.RfqItemCreateWithoutRfqInput[] | Prisma.RfqItemUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutRfqInput | Prisma.RfqItemCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqItemCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
};
export type RfqItemUncheckedCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutRfqInput, Prisma.RfqItemUncheckedCreateWithoutRfqInput> | Prisma.RfqItemCreateWithoutRfqInput[] | Prisma.RfqItemUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutRfqInput | Prisma.RfqItemCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqItemCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
};
export type RfqItemUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutRfqInput, Prisma.RfqItemUncheckedCreateWithoutRfqInput> | Prisma.RfqItemCreateWithoutRfqInput[] | Prisma.RfqItemUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutRfqInput | Prisma.RfqItemCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqItemUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqItemUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqItemCreateManyRfqInputEnvelope;
    set?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    disconnect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    delete?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    update?: Prisma.RfqItemUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqItemUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqItemUpdateManyWithWhereWithoutRfqInput | Prisma.RfqItemUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqItemScalarWhereInput | Prisma.RfqItemScalarWhereInput[];
};
export type RfqItemUncheckedUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqItemCreateWithoutRfqInput, Prisma.RfqItemUncheckedCreateWithoutRfqInput> | Prisma.RfqItemCreateWithoutRfqInput[] | Prisma.RfqItemUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqItemCreateOrConnectWithoutRfqInput | Prisma.RfqItemCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqItemUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqItemUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqItemCreateManyRfqInputEnvelope;
    set?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    disconnect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    delete?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    connect?: Prisma.RfqItemWhereUniqueInput | Prisma.RfqItemWhereUniqueInput[];
    update?: Prisma.RfqItemUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqItemUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqItemUpdateManyWithWhereWithoutRfqInput | Prisma.RfqItemUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqItemScalarWhereInput | Prisma.RfqItemScalarWhereInput[];
};
export type RfqItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    rfq: Prisma.RfqCreateNestedOneWithoutItemsInput;
};
export type RfqItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    rfqId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.RfqItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqItemCreateWithoutTenantInput, Prisma.RfqItemUncheckedCreateWithoutTenantInput>;
};
export type RfqItemCreateManyTenantInputEnvelope = {
    data: Prisma.RfqItemCreateManyTenantInput | Prisma.RfqItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type RfqItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.RfqItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqItemUpdateWithoutTenantInput, Prisma.RfqItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.RfqItemCreateWithoutTenantInput, Prisma.RfqItemUncheckedCreateWithoutTenantInput>;
};
export type RfqItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.RfqItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqItemUpdateWithoutTenantInput, Prisma.RfqItemUncheckedUpdateWithoutTenantInput>;
};
export type RfqItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.RfqItemScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqItemUpdateManyMutationInput, Prisma.RfqItemUncheckedUpdateManyWithoutTenantInput>;
};
export type RfqItemScalarWhereInput = {
    AND?: Prisma.RfqItemScalarWhereInput | Prisma.RfqItemScalarWhereInput[];
    OR?: Prisma.RfqItemScalarWhereInput[];
    NOT?: Prisma.RfqItemScalarWhereInput | Prisma.RfqItemScalarWhereInput[];
    id?: Prisma.StringFilter<"RfqItem"> | string;
    tenantId?: Prisma.StringFilter<"RfqItem"> | string;
    rfqId?: Prisma.StringFilter<"RfqItem"> | string;
    lineNo?: Prisma.IntFilter<"RfqItem"> | number;
    itemId?: Prisma.StringNullableFilter<"RfqItem"> | string | null;
    description?: Prisma.StringFilter<"RfqItem"> | string;
    qty?: Prisma.DecimalFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"RfqItem"> | string | null;
    targetPrice?: Prisma.DecimalFilter<"RfqItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemCreateWithoutRfqInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant: Prisma.TenantCreateNestedOneWithoutRfqItemsInput;
};
export type RfqItemUncheckedCreateWithoutRfqInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemCreateOrConnectWithoutRfqInput = {
    where: Prisma.RfqItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqItemCreateWithoutRfqInput, Prisma.RfqItemUncheckedCreateWithoutRfqInput>;
};
export type RfqItemCreateManyRfqInputEnvelope = {
    data: Prisma.RfqItemCreateManyRfqInput | Prisma.RfqItemCreateManyRfqInput[];
    skipDuplicates?: boolean;
};
export type RfqItemUpsertWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqItemUpdateWithoutRfqInput, Prisma.RfqItemUncheckedUpdateWithoutRfqInput>;
    create: Prisma.XOR<Prisma.RfqItemCreateWithoutRfqInput, Prisma.RfqItemUncheckedCreateWithoutRfqInput>;
};
export type RfqItemUpdateWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqItemUpdateWithoutRfqInput, Prisma.RfqItemUncheckedUpdateWithoutRfqInput>;
};
export type RfqItemUpdateManyWithWhereWithoutRfqInput = {
    where: Prisma.RfqItemScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqItemUpdateManyMutationInput, Prisma.RfqItemUncheckedUpdateManyWithoutRfqInput>;
};
export type RfqItemCreateManyTenantInput = {
    id?: string;
    rfqId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutItemsNestedInput;
};
export type RfqItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemCreateManyRfqInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    targetPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutRfqItemsNestedInput;
};
export type RfqItemUncheckedUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemUncheckedUpdateManyWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type RfqItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    targetPrice?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqItem"]>;
export type RfqItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    targetPrice?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqItem"]>;
export type RfqItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    targetPrice?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqItem"]>;
export type RfqItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    targetPrice?: boolean;
};
export type RfqItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "rfqId" | "lineNo" | "itemId" | "description" | "qty" | "uomCode" | "targetPrice", ExtArgs["result"]["rfqItem"]>;
export type RfqItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
};
export type RfqItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
};
export type RfqItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
};
export type $RfqItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RfqItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        rfq: Prisma.$RfqPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        rfqId: string;
        lineNo: number;
        itemId: string | null;
        description: string;
        qty: runtime.Decimal;
        uomCode: string | null;
        targetPrice: runtime.Decimal;
    }, ExtArgs["result"]["rfqItem"]>;
    composites: {};
};
export type RfqItemGetPayload<S extends boolean | null | undefined | RfqItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RfqItemPayload, S>;
export type RfqItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RfqItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RfqItemCountAggregateInputType | true;
};
export interface RfqItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RfqItem'];
        meta: {
            name: 'RfqItem';
        };
    };
    findUnique<T extends RfqItemFindUniqueArgs>(args: Prisma.SelectSubset<T, RfqItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RfqItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RfqItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RfqItemFindFirstArgs>(args?: Prisma.SelectSubset<T, RfqItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RfqItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RfqItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RfqItemFindManyArgs>(args?: Prisma.SelectSubset<T, RfqItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RfqItemCreateArgs>(args: Prisma.SelectSubset<T, RfqItemCreateArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RfqItemCreateManyArgs>(args?: Prisma.SelectSubset<T, RfqItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RfqItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RfqItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RfqItemDeleteArgs>(args: Prisma.SelectSubset<T, RfqItemDeleteArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RfqItemUpdateArgs>(args: Prisma.SelectSubset<T, RfqItemUpdateArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RfqItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, RfqItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RfqItemUpdateManyArgs>(args: Prisma.SelectSubset<T, RfqItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RfqItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RfqItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RfqItemUpsertArgs>(args: Prisma.SelectSubset<T, RfqItemUpsertArgs<ExtArgs>>): Prisma.Prisma__RfqItemClient<runtime.Types.Result.GetResult<Prisma.$RfqItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RfqItemCountArgs>(args?: Prisma.Subset<T, RfqItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RfqItemCountAggregateOutputType> : number>;
    aggregate<T extends RfqItemAggregateArgs>(args: Prisma.Subset<T, RfqItemAggregateArgs>): Prisma.PrismaPromise<GetRfqItemAggregateType<T>>;
    groupBy<T extends RfqItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RfqItemGroupByArgs['orderBy'];
    } : {
        orderBy?: RfqItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RfqItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRfqItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RfqItemFieldRefs;
}
export interface Prisma__RfqItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    rfq<T extends Prisma.RfqDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RfqDefaultArgs<ExtArgs>>): Prisma.Prisma__RfqClient<runtime.Types.Result.GetResult<Prisma.$RfqPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RfqItemFieldRefs {
    readonly id: Prisma.FieldRef<"RfqItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"RfqItem", 'String'>;
    readonly rfqId: Prisma.FieldRef<"RfqItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"RfqItem", 'Int'>;
    readonly itemId: Prisma.FieldRef<"RfqItem", 'String'>;
    readonly description: Prisma.FieldRef<"RfqItem", 'String'>;
    readonly qty: Prisma.FieldRef<"RfqItem", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"RfqItem", 'String'>;
    readonly targetPrice: Prisma.FieldRef<"RfqItem", 'Decimal'>;
}
export type RfqItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    where: Prisma.RfqItemWhereUniqueInput;
};
export type RfqItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    where: Prisma.RfqItemWhereUniqueInput;
};
export type RfqItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    where?: Prisma.RfqItemWhereInput;
    orderBy?: Prisma.RfqItemOrderByWithRelationInput | Prisma.RfqItemOrderByWithRelationInput[];
    cursor?: Prisma.RfqItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqItemScalarFieldEnum | Prisma.RfqItemScalarFieldEnum[];
};
export type RfqItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    where?: Prisma.RfqItemWhereInput;
    orderBy?: Prisma.RfqItemOrderByWithRelationInput | Prisma.RfqItemOrderByWithRelationInput[];
    cursor?: Prisma.RfqItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqItemScalarFieldEnum | Prisma.RfqItemScalarFieldEnum[];
};
export type RfqItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    where?: Prisma.RfqItemWhereInput;
    orderBy?: Prisma.RfqItemOrderByWithRelationInput | Prisma.RfqItemOrderByWithRelationInput[];
    cursor?: Prisma.RfqItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqItemScalarFieldEnum | Prisma.RfqItemScalarFieldEnum[];
};
export type RfqItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqItemCreateInput, Prisma.RfqItemUncheckedCreateInput>;
};
export type RfqItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RfqItemCreateManyInput | Prisma.RfqItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RfqItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    data: Prisma.RfqItemCreateManyInput | Prisma.RfqItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RfqItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RfqItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqItemUpdateInput, Prisma.RfqItemUncheckedUpdateInput>;
    where: Prisma.RfqItemWhereUniqueInput;
};
export type RfqItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RfqItemUpdateManyMutationInput, Prisma.RfqItemUncheckedUpdateManyInput>;
    where?: Prisma.RfqItemWhereInput;
    limit?: number;
};
export type RfqItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqItemUpdateManyMutationInput, Prisma.RfqItemUncheckedUpdateManyInput>;
    where?: Prisma.RfqItemWhereInput;
    limit?: number;
    include?: Prisma.RfqItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RfqItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    where: Prisma.RfqItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqItemCreateInput, Prisma.RfqItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RfqItemUpdateInput, Prisma.RfqItemUncheckedUpdateInput>;
};
export type RfqItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
    where: Prisma.RfqItemWhereUniqueInput;
};
export type RfqItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqItemWhereInput;
    limit?: number;
};
export type RfqItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqItemSelect<ExtArgs> | null;
    omit?: Prisma.RfqItemOmit<ExtArgs> | null;
    include?: Prisma.RfqItemInclude<ExtArgs> | null;
};
