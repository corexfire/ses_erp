import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PurchaseRequisitionItemModel = runtime.Types.Result.DefaultSelection<Prisma.$PurchaseRequisitionItemPayload>;
export type AggregatePurchaseRequisitionItem = {
    _count: PurchaseRequisitionItemCountAggregateOutputType | null;
    _avg: PurchaseRequisitionItemAvgAggregateOutputType | null;
    _sum: PurchaseRequisitionItemSumAggregateOutputType | null;
    _min: PurchaseRequisitionItemMinAggregateOutputType | null;
    _max: PurchaseRequisitionItemMaxAggregateOutputType | null;
};
export type PurchaseRequisitionItemAvgAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    estimatedPrice: runtime.Decimal | null;
};
export type PurchaseRequisitionItemSumAggregateOutputType = {
    lineNo: number | null;
    qty: runtime.Decimal | null;
    estimatedPrice: runtime.Decimal | null;
};
export type PurchaseRequisitionItemMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    requisitionId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    estimatedPrice: runtime.Decimal | null;
    requiredDate: Date | null;
};
export type PurchaseRequisitionItemMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    requisitionId: string | null;
    lineNo: number | null;
    itemId: string | null;
    description: string | null;
    qty: runtime.Decimal | null;
    uomCode: string | null;
    estimatedPrice: runtime.Decimal | null;
    requiredDate: Date | null;
};
export type PurchaseRequisitionItemCountAggregateOutputType = {
    id: number;
    tenantId: number;
    requisitionId: number;
    lineNo: number;
    itemId: number;
    description: number;
    qty: number;
    uomCode: number;
    estimatedPrice: number;
    requiredDate: number;
    _all: number;
};
export type PurchaseRequisitionItemAvgAggregateInputType = {
    lineNo?: true;
    qty?: true;
    estimatedPrice?: true;
};
export type PurchaseRequisitionItemSumAggregateInputType = {
    lineNo?: true;
    qty?: true;
    estimatedPrice?: true;
};
export type PurchaseRequisitionItemMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    requisitionId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    estimatedPrice?: true;
    requiredDate?: true;
};
export type PurchaseRequisitionItemMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    requisitionId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    estimatedPrice?: true;
    requiredDate?: true;
};
export type PurchaseRequisitionItemCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    requisitionId?: true;
    lineNo?: true;
    itemId?: true;
    description?: true;
    qty?: true;
    uomCode?: true;
    estimatedPrice?: true;
    requiredDate?: true;
    _all?: true;
};
export type PurchaseRequisitionItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    orderBy?: Prisma.PurchaseRequisitionItemOrderByWithRelationInput | Prisma.PurchaseRequisitionItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PurchaseRequisitionItemCountAggregateInputType;
    _avg?: PurchaseRequisitionItemAvgAggregateInputType;
    _sum?: PurchaseRequisitionItemSumAggregateInputType;
    _min?: PurchaseRequisitionItemMinAggregateInputType;
    _max?: PurchaseRequisitionItemMaxAggregateInputType;
};
export type GetPurchaseRequisitionItemAggregateType<T extends PurchaseRequisitionItemAggregateArgs> = {
    [P in keyof T & keyof AggregatePurchaseRequisitionItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePurchaseRequisitionItem[P]> : Prisma.GetScalarType<T[P], AggregatePurchaseRequisitionItem[P]>;
};
export type PurchaseRequisitionItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    orderBy?: Prisma.PurchaseRequisitionItemOrderByWithAggregationInput | Prisma.PurchaseRequisitionItemOrderByWithAggregationInput[];
    by: Prisma.PurchaseRequisitionItemScalarFieldEnum[] | Prisma.PurchaseRequisitionItemScalarFieldEnum;
    having?: Prisma.PurchaseRequisitionItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PurchaseRequisitionItemCountAggregateInputType | true;
    _avg?: PurchaseRequisitionItemAvgAggregateInputType;
    _sum?: PurchaseRequisitionItemSumAggregateInputType;
    _min?: PurchaseRequisitionItemMinAggregateInputType;
    _max?: PurchaseRequisitionItemMaxAggregateInputType;
};
export type PurchaseRequisitionItemGroupByOutputType = {
    id: string;
    tenantId: string;
    requisitionId: string;
    lineNo: number;
    itemId: string | null;
    description: string;
    qty: runtime.Decimal;
    uomCode: string | null;
    estimatedPrice: runtime.Decimal;
    requiredDate: Date | null;
    _count: PurchaseRequisitionItemCountAggregateOutputType | null;
    _avg: PurchaseRequisitionItemAvgAggregateOutputType | null;
    _sum: PurchaseRequisitionItemSumAggregateOutputType | null;
    _min: PurchaseRequisitionItemMinAggregateOutputType | null;
    _max: PurchaseRequisitionItemMaxAggregateOutputType | null;
};
export type GetPurchaseRequisitionItemGroupByPayload<T extends PurchaseRequisitionItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PurchaseRequisitionItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PurchaseRequisitionItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PurchaseRequisitionItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PurchaseRequisitionItemGroupByOutputType[P]>;
}>>;
export type PurchaseRequisitionItemWhereInput = {
    AND?: Prisma.PurchaseRequisitionItemWhereInput | Prisma.PurchaseRequisitionItemWhereInput[];
    OR?: Prisma.PurchaseRequisitionItemWhereInput[];
    NOT?: Prisma.PurchaseRequisitionItemWhereInput | Prisma.PurchaseRequisitionItemWhereInput[];
    id?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    requisitionId?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseRequisitionItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseRequisitionItem"> | string | null;
    description?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseRequisitionItem"> | string | null;
    estimatedPrice?: Prisma.DecimalFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.DateTimeNullableFilter<"PurchaseRequisitionItem"> | Date | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    requisition?: Prisma.XOR<Prisma.PurchaseRequisitionScalarRelationFilter, Prisma.PurchaseRequisitionWhereInput>;
};
export type PurchaseRequisitionItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    requisitionId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    estimatedPrice?: Prisma.SortOrder;
    requiredDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    requisition?: Prisma.PurchaseRequisitionOrderByWithRelationInput;
};
export type PurchaseRequisitionItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_requisitionId_lineNo?: Prisma.PurchaseRequisitionItemTenantIdRequisitionIdLineNoCompoundUniqueInput;
    AND?: Prisma.PurchaseRequisitionItemWhereInput | Prisma.PurchaseRequisitionItemWhereInput[];
    OR?: Prisma.PurchaseRequisitionItemWhereInput[];
    NOT?: Prisma.PurchaseRequisitionItemWhereInput | Prisma.PurchaseRequisitionItemWhereInput[];
    tenantId?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    requisitionId?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseRequisitionItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseRequisitionItem"> | string | null;
    description?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseRequisitionItem"> | string | null;
    estimatedPrice?: Prisma.DecimalFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.DateTimeNullableFilter<"PurchaseRequisitionItem"> | Date | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    requisition?: Prisma.XOR<Prisma.PurchaseRequisitionScalarRelationFilter, Prisma.PurchaseRequisitionWhereInput>;
}, "id" | "tenantId_requisitionId_lineNo">;
export type PurchaseRequisitionItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    requisitionId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    estimatedPrice?: Prisma.SortOrder;
    requiredDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PurchaseRequisitionItemCountOrderByAggregateInput;
    _avg?: Prisma.PurchaseRequisitionItemAvgOrderByAggregateInput;
    _max?: Prisma.PurchaseRequisitionItemMaxOrderByAggregateInput;
    _min?: Prisma.PurchaseRequisitionItemMinOrderByAggregateInput;
    _sum?: Prisma.PurchaseRequisitionItemSumOrderByAggregateInput;
};
export type PurchaseRequisitionItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.PurchaseRequisitionItemScalarWhereWithAggregatesInput | Prisma.PurchaseRequisitionItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.PurchaseRequisitionItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PurchaseRequisitionItemScalarWhereWithAggregatesInput | Prisma.PurchaseRequisitionItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PurchaseRequisitionItem"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"PurchaseRequisitionItem"> | string;
    requisitionId?: Prisma.StringWithAggregatesFilter<"PurchaseRequisitionItem"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"PurchaseRequisitionItem"> | number;
    itemId?: Prisma.StringNullableWithAggregatesFilter<"PurchaseRequisitionItem"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"PurchaseRequisitionItem"> | string;
    qty?: Prisma.DecimalWithAggregatesFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"PurchaseRequisitionItem"> | string | null;
    estimatedPrice?: Prisma.DecimalWithAggregatesFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.DateTimeNullableWithAggregatesFilter<"PurchaseRequisitionItem"> | Date | string | null;
};
export type PurchaseRequisitionItemCreateInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseRequisitionItemsInput;
    requisition: Prisma.PurchaseRequisitionCreateNestedOneWithoutItemsInput;
};
export type PurchaseRequisitionItemUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    requisitionId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
};
export type PurchaseRequisitionItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseRequisitionItemsNestedInput;
    requisition?: Prisma.PurchaseRequisitionUpdateOneRequiredWithoutItemsNestedInput;
};
export type PurchaseRequisitionItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PurchaseRequisitionItemCreateManyInput = {
    id?: string;
    tenantId: string;
    requisitionId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
};
export type PurchaseRequisitionItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PurchaseRequisitionItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PurchaseRequisitionItemListRelationFilter = {
    every?: Prisma.PurchaseRequisitionItemWhereInput;
    some?: Prisma.PurchaseRequisitionItemWhereInput;
    none?: Prisma.PurchaseRequisitionItemWhereInput;
};
export type PurchaseRequisitionItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PurchaseRequisitionItemTenantIdRequisitionIdLineNoCompoundUniqueInput = {
    tenantId: string;
    requisitionId: string;
    lineNo: number;
};
export type PurchaseRequisitionItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    requisitionId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    estimatedPrice?: Prisma.SortOrder;
    requiredDate?: Prisma.SortOrder;
};
export type PurchaseRequisitionItemAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    estimatedPrice?: Prisma.SortOrder;
};
export type PurchaseRequisitionItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    requisitionId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    estimatedPrice?: Prisma.SortOrder;
    requiredDate?: Prisma.SortOrder;
};
export type PurchaseRequisitionItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    requisitionId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
    estimatedPrice?: Prisma.SortOrder;
    requiredDate?: Prisma.SortOrder;
};
export type PurchaseRequisitionItemSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qty?: Prisma.SortOrder;
    estimatedPrice?: Prisma.SortOrder;
};
export type PurchaseRequisitionItemCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionItemCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
};
export type PurchaseRequisitionItemUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionItemCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
};
export type PurchaseRequisitionItemUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionItemCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseRequisitionItemScalarWhereInput | Prisma.PurchaseRequisitionItemScalarWhereInput[];
};
export type PurchaseRequisitionItemUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionItemCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseRequisitionItemScalarWhereInput | Prisma.PurchaseRequisitionItemScalarWhereInput[];
};
export type PurchaseRequisitionItemCreateNestedManyWithoutRequisitionInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput> | Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyRequisitionInputEnvelope;
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
};
export type PurchaseRequisitionItemUncheckedCreateNestedManyWithoutRequisitionInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput> | Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyRequisitionInputEnvelope;
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
};
export type PurchaseRequisitionItemUpdateManyWithoutRequisitionNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput> | Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput[];
    upsert?: Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutRequisitionInput | Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutRequisitionInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyRequisitionInputEnvelope;
    set?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutRequisitionInput | Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutRequisitionInput[];
    updateMany?: Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutRequisitionInput | Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutRequisitionInput[];
    deleteMany?: Prisma.PurchaseRequisitionItemScalarWhereInput | Prisma.PurchaseRequisitionItemScalarWhereInput[];
};
export type PurchaseRequisitionItemUncheckedUpdateManyWithoutRequisitionNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput> | Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput[] | Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput | Prisma.PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput[];
    upsert?: Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutRequisitionInput | Prisma.PurchaseRequisitionItemUpsertWithWhereUniqueWithoutRequisitionInput[];
    createMany?: Prisma.PurchaseRequisitionItemCreateManyRequisitionInputEnvelope;
    set?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionItemWhereUniqueInput | Prisma.PurchaseRequisitionItemWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutRequisitionInput | Prisma.PurchaseRequisitionItemUpdateWithWhereUniqueWithoutRequisitionInput[];
    updateMany?: Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutRequisitionInput | Prisma.PurchaseRequisitionItemUpdateManyWithWhereWithoutRequisitionInput[];
    deleteMany?: Prisma.PurchaseRequisitionItemScalarWhereInput | Prisma.PurchaseRequisitionItemScalarWhereInput[];
};
export type PurchaseRequisitionItemCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
    requisition: Prisma.PurchaseRequisitionCreateNestedOneWithoutItemsInput;
};
export type PurchaseRequisitionItemUncheckedCreateWithoutTenantInput = {
    id?: string;
    requisitionId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
};
export type PurchaseRequisitionItemCreateOrConnectWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput>;
};
export type PurchaseRequisitionItemCreateManyTenantInputEnvelope = {
    data: Prisma.PurchaseRequisitionItemCreateManyTenantInput | Prisma.PurchaseRequisitionItemCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type PurchaseRequisitionItemUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutTenantInput>;
};
export type PurchaseRequisitionItemUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateWithoutTenantInput, Prisma.PurchaseRequisitionItemUncheckedUpdateWithoutTenantInput>;
};
export type PurchaseRequisitionItemUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateManyMutationInput, Prisma.PurchaseRequisitionItemUncheckedUpdateManyWithoutTenantInput>;
};
export type PurchaseRequisitionItemScalarWhereInput = {
    AND?: Prisma.PurchaseRequisitionItemScalarWhereInput | Prisma.PurchaseRequisitionItemScalarWhereInput[];
    OR?: Prisma.PurchaseRequisitionItemScalarWhereInput[];
    NOT?: Prisma.PurchaseRequisitionItemScalarWhereInput | Prisma.PurchaseRequisitionItemScalarWhereInput[];
    id?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    requisitionId?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    lineNo?: Prisma.IntFilter<"PurchaseRequisitionItem"> | number;
    itemId?: Prisma.StringNullableFilter<"PurchaseRequisitionItem"> | string | null;
    description?: Prisma.StringFilter<"PurchaseRequisitionItem"> | string;
    qty?: Prisma.DecimalFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"PurchaseRequisitionItem"> | string | null;
    estimatedPrice?: Prisma.DecimalFilter<"PurchaseRequisitionItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.DateTimeNullableFilter<"PurchaseRequisitionItem"> | Date | string | null;
};
export type PurchaseRequisitionItemCreateWithoutRequisitionInput = {
    id?: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseRequisitionItemsInput;
};
export type PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
};
export type PurchaseRequisitionItemCreateOrConnectWithoutRequisitionInput = {
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput>;
};
export type PurchaseRequisitionItemCreateManyRequisitionInputEnvelope = {
    data: Prisma.PurchaseRequisitionItemCreateManyRequisitionInput | Prisma.PurchaseRequisitionItemCreateManyRequisitionInput[];
    skipDuplicates?: boolean;
};
export type PurchaseRequisitionItemUpsertWithWhereUniqueWithoutRequisitionInput = {
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedUpdateWithoutRequisitionInput>;
    create: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedCreateWithoutRequisitionInput>;
};
export type PurchaseRequisitionItemUpdateWithWhereUniqueWithoutRequisitionInput = {
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateWithoutRequisitionInput, Prisma.PurchaseRequisitionItemUncheckedUpdateWithoutRequisitionInput>;
};
export type PurchaseRequisitionItemUpdateManyWithWhereWithoutRequisitionInput = {
    where: Prisma.PurchaseRequisitionItemScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateManyMutationInput, Prisma.PurchaseRequisitionItemUncheckedUpdateManyWithoutRequisitionInput>;
};
export type PurchaseRequisitionItemCreateManyTenantInput = {
    id?: string;
    requisitionId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
};
export type PurchaseRequisitionItemUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    requisition?: Prisma.PurchaseRequisitionUpdateOneRequiredWithoutItemsNestedInput;
};
export type PurchaseRequisitionItemUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PurchaseRequisitionItemUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitionId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PurchaseRequisitionItemCreateManyRequisitionInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId?: string | null;
    description: string;
    qty: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    estimatedPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Date | string | null;
};
export type PurchaseRequisitionItemUpdateWithoutRequisitionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseRequisitionItemsNestedInput;
};
export type PurchaseRequisitionItemUncheckedUpdateWithoutRequisitionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PurchaseRequisitionItemUncheckedUpdateManyWithoutRequisitionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    qty?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    requiredDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PurchaseRequisitionItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    requisitionId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    estimatedPrice?: boolean;
    requiredDate?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    requisition?: boolean | Prisma.PurchaseRequisitionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseRequisitionItem"]>;
export type PurchaseRequisitionItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    requisitionId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    estimatedPrice?: boolean;
    requiredDate?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    requisition?: boolean | Prisma.PurchaseRequisitionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseRequisitionItem"]>;
export type PurchaseRequisitionItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    requisitionId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    estimatedPrice?: boolean;
    requiredDate?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    requisition?: boolean | Prisma.PurchaseRequisitionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseRequisitionItem"]>;
export type PurchaseRequisitionItemSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    requisitionId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    description?: boolean;
    qty?: boolean;
    uomCode?: boolean;
    estimatedPrice?: boolean;
    requiredDate?: boolean;
};
export type PurchaseRequisitionItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "requisitionId" | "lineNo" | "itemId" | "description" | "qty" | "uomCode" | "estimatedPrice" | "requiredDate", ExtArgs["result"]["purchaseRequisitionItem"]>;
export type PurchaseRequisitionItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    requisition?: boolean | Prisma.PurchaseRequisitionDefaultArgs<ExtArgs>;
};
export type PurchaseRequisitionItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    requisition?: boolean | Prisma.PurchaseRequisitionDefaultArgs<ExtArgs>;
};
export type PurchaseRequisitionItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    requisition?: boolean | Prisma.PurchaseRequisitionDefaultArgs<ExtArgs>;
};
export type $PurchaseRequisitionItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PurchaseRequisitionItem";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        requisition: Prisma.$PurchaseRequisitionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        requisitionId: string;
        lineNo: number;
        itemId: string | null;
        description: string;
        qty: runtime.Decimal;
        uomCode: string | null;
        estimatedPrice: runtime.Decimal;
        requiredDate: Date | null;
    }, ExtArgs["result"]["purchaseRequisitionItem"]>;
    composites: {};
};
export type PurchaseRequisitionItemGetPayload<S extends boolean | null | undefined | PurchaseRequisitionItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload, S>;
export type PurchaseRequisitionItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PurchaseRequisitionItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PurchaseRequisitionItemCountAggregateInputType | true;
};
export interface PurchaseRequisitionItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PurchaseRequisitionItem'];
        meta: {
            name: 'PurchaseRequisitionItem';
        };
    };
    findUnique<T extends PurchaseRequisitionItemFindUniqueArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PurchaseRequisitionItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PurchaseRequisitionItemFindFirstArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PurchaseRequisitionItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PurchaseRequisitionItemFindManyArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PurchaseRequisitionItemCreateArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemCreateArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PurchaseRequisitionItemCreateManyArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PurchaseRequisitionItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PurchaseRequisitionItemDeleteArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemDeleteArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PurchaseRequisitionItemUpdateArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemUpdateArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PurchaseRequisitionItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PurchaseRequisitionItemUpdateManyArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PurchaseRequisitionItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PurchaseRequisitionItemUpsertArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionItemUpsertArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionItemClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PurchaseRequisitionItemCountArgs>(args?: Prisma.Subset<T, PurchaseRequisitionItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PurchaseRequisitionItemCountAggregateOutputType> : number>;
    aggregate<T extends PurchaseRequisitionItemAggregateArgs>(args: Prisma.Subset<T, PurchaseRequisitionItemAggregateArgs>): Prisma.PrismaPromise<GetPurchaseRequisitionItemAggregateType<T>>;
    groupBy<T extends PurchaseRequisitionItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PurchaseRequisitionItemGroupByArgs['orderBy'];
    } : {
        orderBy?: PurchaseRequisitionItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PurchaseRequisitionItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseRequisitionItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PurchaseRequisitionItemFieldRefs;
}
export interface Prisma__PurchaseRequisitionItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requisition<T extends Prisma.PurchaseRequisitionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseRequisitionDefaultArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PurchaseRequisitionItemFieldRefs {
    readonly id: Prisma.FieldRef<"PurchaseRequisitionItem", 'String'>;
    readonly tenantId: Prisma.FieldRef<"PurchaseRequisitionItem", 'String'>;
    readonly requisitionId: Prisma.FieldRef<"PurchaseRequisitionItem", 'String'>;
    readonly lineNo: Prisma.FieldRef<"PurchaseRequisitionItem", 'Int'>;
    readonly itemId: Prisma.FieldRef<"PurchaseRequisitionItem", 'String'>;
    readonly description: Prisma.FieldRef<"PurchaseRequisitionItem", 'String'>;
    readonly qty: Prisma.FieldRef<"PurchaseRequisitionItem", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"PurchaseRequisitionItem", 'String'>;
    readonly estimatedPrice: Prisma.FieldRef<"PurchaseRequisitionItem", 'Decimal'>;
    readonly requiredDate: Prisma.FieldRef<"PurchaseRequisitionItem", 'DateTime'>;
}
export type PurchaseRequisitionItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
};
export type PurchaseRequisitionItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
};
export type PurchaseRequisitionItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    orderBy?: Prisma.PurchaseRequisitionItemOrderByWithRelationInput | Prisma.PurchaseRequisitionItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseRequisitionItemScalarFieldEnum | Prisma.PurchaseRequisitionItemScalarFieldEnum[];
};
export type PurchaseRequisitionItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    orderBy?: Prisma.PurchaseRequisitionItemOrderByWithRelationInput | Prisma.PurchaseRequisitionItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseRequisitionItemScalarFieldEnum | Prisma.PurchaseRequisitionItemScalarFieldEnum[];
};
export type PurchaseRequisitionItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    orderBy?: Prisma.PurchaseRequisitionItemOrderByWithRelationInput | Prisma.PurchaseRequisitionItemOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseRequisitionItemScalarFieldEnum | Prisma.PurchaseRequisitionItemScalarFieldEnum[];
};
export type PurchaseRequisitionItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateInput, Prisma.PurchaseRequisitionItemUncheckedCreateInput>;
};
export type PurchaseRequisitionItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PurchaseRequisitionItemCreateManyInput | Prisma.PurchaseRequisitionItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PurchaseRequisitionItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    data: Prisma.PurchaseRequisitionItemCreateManyInput | Prisma.PurchaseRequisitionItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PurchaseRequisitionItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PurchaseRequisitionItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateInput, Prisma.PurchaseRequisitionItemUncheckedUpdateInput>;
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
};
export type PurchaseRequisitionItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateManyMutationInput, Prisma.PurchaseRequisitionItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    limit?: number;
};
export type PurchaseRequisitionItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateManyMutationInput, Prisma.PurchaseRequisitionItemUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    limit?: number;
    include?: Prisma.PurchaseRequisitionItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PurchaseRequisitionItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseRequisitionItemCreateInput, Prisma.PurchaseRequisitionItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PurchaseRequisitionItemUpdateInput, Prisma.PurchaseRequisitionItemUncheckedUpdateInput>;
};
export type PurchaseRequisitionItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionItemWhereUniqueInput;
};
export type PurchaseRequisitionItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionItemWhereInput;
    limit?: number;
};
export type PurchaseRequisitionItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionItemSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionItemOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionItemInclude<ExtArgs> | null;
};
