import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type WorkOrderComponentModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkOrderComponentPayload>;
export type AggregateWorkOrderComponent = {
    _count: WorkOrderComponentCountAggregateOutputType | null;
    _avg: WorkOrderComponentAvgAggregateOutputType | null;
    _sum: WorkOrderComponentSumAggregateOutputType | null;
    _min: WorkOrderComponentMinAggregateOutputType | null;
    _max: WorkOrderComponentMaxAggregateOutputType | null;
};
export type WorkOrderComponentAvgAggregateOutputType = {
    lineNo: number | null;
    qtyRequired: runtime.Decimal | null;
    qtyIssued: runtime.Decimal | null;
};
export type WorkOrderComponentSumAggregateOutputType = {
    lineNo: number | null;
    qtyRequired: runtime.Decimal | null;
    qtyIssued: runtime.Decimal | null;
};
export type WorkOrderComponentMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    workOrderId: string | null;
    lineNo: number | null;
    itemId: string | null;
    qtyRequired: runtime.Decimal | null;
    qtyIssued: runtime.Decimal | null;
    uomCode: string | null;
};
export type WorkOrderComponentMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    workOrderId: string | null;
    lineNo: number | null;
    itemId: string | null;
    qtyRequired: runtime.Decimal | null;
    qtyIssued: runtime.Decimal | null;
    uomCode: string | null;
};
export type WorkOrderComponentCountAggregateOutputType = {
    id: number;
    tenantId: number;
    workOrderId: number;
    lineNo: number;
    itemId: number;
    qtyRequired: number;
    qtyIssued: number;
    uomCode: number;
    _all: number;
};
export type WorkOrderComponentAvgAggregateInputType = {
    lineNo?: true;
    qtyRequired?: true;
    qtyIssued?: true;
};
export type WorkOrderComponentSumAggregateInputType = {
    lineNo?: true;
    qtyRequired?: true;
    qtyIssued?: true;
};
export type WorkOrderComponentMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    workOrderId?: true;
    lineNo?: true;
    itemId?: true;
    qtyRequired?: true;
    qtyIssued?: true;
    uomCode?: true;
};
export type WorkOrderComponentMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    workOrderId?: true;
    lineNo?: true;
    itemId?: true;
    qtyRequired?: true;
    qtyIssued?: true;
    uomCode?: true;
};
export type WorkOrderComponentCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    workOrderId?: true;
    lineNo?: true;
    itemId?: true;
    qtyRequired?: true;
    qtyIssued?: true;
    uomCode?: true;
    _all?: true;
};
export type WorkOrderComponentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderComponentWhereInput;
    orderBy?: Prisma.WorkOrderComponentOrderByWithRelationInput | Prisma.WorkOrderComponentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderComponentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkOrderComponentCountAggregateInputType;
    _avg?: WorkOrderComponentAvgAggregateInputType;
    _sum?: WorkOrderComponentSumAggregateInputType;
    _min?: WorkOrderComponentMinAggregateInputType;
    _max?: WorkOrderComponentMaxAggregateInputType;
};
export type GetWorkOrderComponentAggregateType<T extends WorkOrderComponentAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkOrderComponent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkOrderComponent[P]> : Prisma.GetScalarType<T[P], AggregateWorkOrderComponent[P]>;
};
export type WorkOrderComponentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderComponentWhereInput;
    orderBy?: Prisma.WorkOrderComponentOrderByWithAggregationInput | Prisma.WorkOrderComponentOrderByWithAggregationInput[];
    by: Prisma.WorkOrderComponentScalarFieldEnum[] | Prisma.WorkOrderComponentScalarFieldEnum;
    having?: Prisma.WorkOrderComponentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkOrderComponentCountAggregateInputType | true;
    _avg?: WorkOrderComponentAvgAggregateInputType;
    _sum?: WorkOrderComponentSumAggregateInputType;
    _min?: WorkOrderComponentMinAggregateInputType;
    _max?: WorkOrderComponentMaxAggregateInputType;
};
export type WorkOrderComponentGroupByOutputType = {
    id: string;
    tenantId: string;
    workOrderId: string;
    lineNo: number;
    itemId: string;
    qtyRequired: runtime.Decimal;
    qtyIssued: runtime.Decimal;
    uomCode: string | null;
    _count: WorkOrderComponentCountAggregateOutputType | null;
    _avg: WorkOrderComponentAvgAggregateOutputType | null;
    _sum: WorkOrderComponentSumAggregateOutputType | null;
    _min: WorkOrderComponentMinAggregateOutputType | null;
    _max: WorkOrderComponentMaxAggregateOutputType | null;
};
export type GetWorkOrderComponentGroupByPayload<T extends WorkOrderComponentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkOrderComponentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkOrderComponentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkOrderComponentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkOrderComponentGroupByOutputType[P]>;
}>>;
export type WorkOrderComponentWhereInput = {
    AND?: Prisma.WorkOrderComponentWhereInput | Prisma.WorkOrderComponentWhereInput[];
    OR?: Prisma.WorkOrderComponentWhereInput[];
    NOT?: Prisma.WorkOrderComponentWhereInput | Prisma.WorkOrderComponentWhereInput[];
    id?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    tenantId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    workOrderId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    lineNo?: Prisma.IntFilter<"WorkOrderComponent"> | number;
    itemId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    qtyRequired?: Prisma.DecimalFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"WorkOrderComponent"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
    item?: Prisma.XOR<Prisma.ItemScalarRelationFilter, Prisma.ItemWhereInput>;
};
export type WorkOrderComponentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    qtyRequired?: Prisma.SortOrder;
    qtyIssued?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    workOrder?: Prisma.WorkOrderOrderByWithRelationInput;
    item?: Prisma.ItemOrderByWithRelationInput;
};
export type WorkOrderComponentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_workOrderId_lineNo?: Prisma.WorkOrderComponentTenantIdWorkOrderIdLineNoCompoundUniqueInput;
    AND?: Prisma.WorkOrderComponentWhereInput | Prisma.WorkOrderComponentWhereInput[];
    OR?: Prisma.WorkOrderComponentWhereInput[];
    NOT?: Prisma.WorkOrderComponentWhereInput | Prisma.WorkOrderComponentWhereInput[];
    tenantId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    workOrderId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    lineNo?: Prisma.IntFilter<"WorkOrderComponent"> | number;
    itemId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    qtyRequired?: Prisma.DecimalFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"WorkOrderComponent"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
    item?: Prisma.XOR<Prisma.ItemScalarRelationFilter, Prisma.ItemWhereInput>;
}, "id" | "tenantId_workOrderId_lineNo">;
export type WorkOrderComponentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    qtyRequired?: Prisma.SortOrder;
    qtyIssued?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.WorkOrderComponentCountOrderByAggregateInput;
    _avg?: Prisma.WorkOrderComponentAvgOrderByAggregateInput;
    _max?: Prisma.WorkOrderComponentMaxOrderByAggregateInput;
    _min?: Prisma.WorkOrderComponentMinOrderByAggregateInput;
    _sum?: Prisma.WorkOrderComponentSumOrderByAggregateInput;
};
export type WorkOrderComponentScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkOrderComponentScalarWhereWithAggregatesInput | Prisma.WorkOrderComponentScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkOrderComponentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkOrderComponentScalarWhereWithAggregatesInput | Prisma.WorkOrderComponentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkOrderComponent"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"WorkOrderComponent"> | string;
    workOrderId?: Prisma.StringWithAggregatesFilter<"WorkOrderComponent"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"WorkOrderComponent"> | number;
    itemId?: Prisma.StringWithAggregatesFilter<"WorkOrderComponent"> | string;
    qtyRequired?: Prisma.DecimalWithAggregatesFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalWithAggregatesFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableWithAggregatesFilter<"WorkOrderComponent"> | string | null;
};
export type WorkOrderComponentCreateInput = {
    id?: string;
    lineNo: number;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkOrderComponentsInput;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutComponentsInput;
    item: Prisma.ItemCreateNestedOneWithoutWorkOrderComponentsInput;
};
export type WorkOrderComponentUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    workOrderId: string;
    lineNo: number;
    itemId: string;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkOrderComponentsNestedInput;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutComponentsNestedInput;
    item?: Prisma.ItemUpdateOneRequiredWithoutWorkOrderComponentsNestedInput;
};
export type WorkOrderComponentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentCreateManyInput = {
    id?: string;
    tenantId: string;
    workOrderId: string;
    lineNo: number;
    itemId: string;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentListRelationFilter = {
    every?: Prisma.WorkOrderComponentWhereInput;
    some?: Prisma.WorkOrderComponentWhereInput;
    none?: Prisma.WorkOrderComponentWhereInput;
};
export type WorkOrderComponentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkOrderComponentTenantIdWorkOrderIdLineNoCompoundUniqueInput = {
    tenantId: string;
    workOrderId: string;
    lineNo: number;
};
export type WorkOrderComponentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    qtyRequired?: Prisma.SortOrder;
    qtyIssued?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
};
export type WorkOrderComponentAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qtyRequired?: Prisma.SortOrder;
    qtyIssued?: Prisma.SortOrder;
};
export type WorkOrderComponentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    qtyRequired?: Prisma.SortOrder;
    qtyIssued?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
};
export type WorkOrderComponentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    qtyRequired?: Prisma.SortOrder;
    qtyIssued?: Prisma.SortOrder;
    uomCode?: Prisma.SortOrder;
};
export type WorkOrderComponentSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    qtyRequired?: Prisma.SortOrder;
    qtyIssued?: Prisma.SortOrder;
};
export type WorkOrderComponentCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput> | Prisma.WorkOrderComponentCreateWithoutTenantInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput | Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyTenantInputEnvelope;
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
};
export type WorkOrderComponentUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput> | Prisma.WorkOrderComponentCreateWithoutTenantInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput | Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyTenantInputEnvelope;
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
};
export type WorkOrderComponentUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput> | Prisma.WorkOrderComponentCreateWithoutTenantInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput | Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutTenantInput | Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyTenantInputEnvelope;
    set?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    delete?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    update?: Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutTenantInput | Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.WorkOrderComponentUpdateManyWithWhereWithoutTenantInput | Prisma.WorkOrderComponentUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
};
export type WorkOrderComponentUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput> | Prisma.WorkOrderComponentCreateWithoutTenantInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput | Prisma.WorkOrderComponentCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutTenantInput | Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyTenantInputEnvelope;
    set?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    delete?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    update?: Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutTenantInput | Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.WorkOrderComponentUpdateManyWithWhereWithoutTenantInput | Prisma.WorkOrderComponentUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
};
export type WorkOrderComponentCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutItemInput, Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput> | Prisma.WorkOrderComponentCreateWithoutItemInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput | Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyItemInputEnvelope;
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
};
export type WorkOrderComponentUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutItemInput, Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput> | Prisma.WorkOrderComponentCreateWithoutItemInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput | Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyItemInputEnvelope;
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
};
export type WorkOrderComponentUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutItemInput, Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput> | Prisma.WorkOrderComponentCreateWithoutItemInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput | Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutItemInput | Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyItemInputEnvelope;
    set?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    delete?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    update?: Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutItemInput | Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.WorkOrderComponentUpdateManyWithWhereWithoutItemInput | Prisma.WorkOrderComponentUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
};
export type WorkOrderComponentUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutItemInput, Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput> | Prisma.WorkOrderComponentCreateWithoutItemInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput | Prisma.WorkOrderComponentCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutItemInput | Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyItemInputEnvelope;
    set?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    delete?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    update?: Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutItemInput | Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.WorkOrderComponentUpdateManyWithWhereWithoutItemInput | Prisma.WorkOrderComponentUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
};
export type WorkOrderComponentCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderComponentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
};
export type WorkOrderComponentUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderComponentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
};
export type WorkOrderComponentUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderComponentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyWorkOrderInputEnvelope;
    set?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    delete?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    update?: Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.WorkOrderComponentUpdateManyWithWhereWithoutWorkOrderInput | Prisma.WorkOrderComponentUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
};
export type WorkOrderComponentUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput> | Prisma.WorkOrderComponentCreateWithoutWorkOrderInput[] | Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput | Prisma.WorkOrderComponentCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderComponentUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.WorkOrderComponentCreateManyWorkOrderInputEnvelope;
    set?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    delete?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    connect?: Prisma.WorkOrderComponentWhereUniqueInput | Prisma.WorkOrderComponentWhereUniqueInput[];
    update?: Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.WorkOrderComponentUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.WorkOrderComponentUpdateManyWithWhereWithoutWorkOrderInput | Prisma.WorkOrderComponentUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
};
export type WorkOrderComponentCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutComponentsInput;
    item: Prisma.ItemCreateNestedOneWithoutWorkOrderComponentsInput;
};
export type WorkOrderComponentUncheckedCreateWithoutTenantInput = {
    id?: string;
    workOrderId: string;
    lineNo: number;
    itemId: string;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentCreateOrConnectWithoutTenantInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput>;
};
export type WorkOrderComponentCreateManyTenantInputEnvelope = {
    data: Prisma.WorkOrderComponentCreateManyTenantInput | Prisma.WorkOrderComponentCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderComponentUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderComponentUpdateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedCreateWithoutTenantInput>;
};
export type WorkOrderComponentUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateWithoutTenantInput, Prisma.WorkOrderComponentUncheckedUpdateWithoutTenantInput>;
};
export type WorkOrderComponentUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.WorkOrderComponentScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateManyMutationInput, Prisma.WorkOrderComponentUncheckedUpdateManyWithoutTenantInput>;
};
export type WorkOrderComponentScalarWhereInput = {
    AND?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
    OR?: Prisma.WorkOrderComponentScalarWhereInput[];
    NOT?: Prisma.WorkOrderComponentScalarWhereInput | Prisma.WorkOrderComponentScalarWhereInput[];
    id?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    tenantId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    workOrderId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    lineNo?: Prisma.IntFilter<"WorkOrderComponent"> | number;
    itemId?: Prisma.StringFilter<"WorkOrderComponent"> | string;
    qtyRequired?: Prisma.DecimalFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFilter<"WorkOrderComponent"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.StringNullableFilter<"WorkOrderComponent"> | string | null;
};
export type WorkOrderComponentCreateWithoutItemInput = {
    id?: string;
    lineNo: number;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkOrderComponentsInput;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutComponentsInput;
};
export type WorkOrderComponentUncheckedCreateWithoutItemInput = {
    id?: string;
    tenantId: string;
    workOrderId: string;
    lineNo: number;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentCreateOrConnectWithoutItemInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutItemInput, Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput>;
};
export type WorkOrderComponentCreateManyItemInputEnvelope = {
    data: Prisma.WorkOrderComponentCreateManyItemInput | Prisma.WorkOrderComponentCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderComponentUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderComponentUpdateWithoutItemInput, Prisma.WorkOrderComponentUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutItemInput, Prisma.WorkOrderComponentUncheckedCreateWithoutItemInput>;
};
export type WorkOrderComponentUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateWithoutItemInput, Prisma.WorkOrderComponentUncheckedUpdateWithoutItemInput>;
};
export type WorkOrderComponentUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.WorkOrderComponentScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateManyMutationInput, Prisma.WorkOrderComponentUncheckedUpdateManyWithoutItemInput>;
};
export type WorkOrderComponentCreateWithoutWorkOrderInput = {
    id?: string;
    lineNo: number;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkOrderComponentsInput;
    item: Prisma.ItemCreateNestedOneWithoutWorkOrderComponentsInput;
};
export type WorkOrderComponentUncheckedCreateWithoutWorkOrderInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId: string;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentCreateOrConnectWithoutWorkOrderInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput>;
};
export type WorkOrderComponentCreateManyWorkOrderInputEnvelope = {
    data: Prisma.WorkOrderComponentCreateManyWorkOrderInput | Prisma.WorkOrderComponentCreateManyWorkOrderInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderComponentUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderComponentUpdateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedUpdateWithoutWorkOrderInput>;
    create: Prisma.XOR<Prisma.WorkOrderComponentCreateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedCreateWithoutWorkOrderInput>;
};
export type WorkOrderComponentUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateWithoutWorkOrderInput, Prisma.WorkOrderComponentUncheckedUpdateWithoutWorkOrderInput>;
};
export type WorkOrderComponentUpdateManyWithWhereWithoutWorkOrderInput = {
    where: Prisma.WorkOrderComponentScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateManyMutationInput, Prisma.WorkOrderComponentUncheckedUpdateManyWithoutWorkOrderInput>;
};
export type WorkOrderComponentCreateManyTenantInput = {
    id?: string;
    workOrderId: string;
    lineNo: number;
    itemId: string;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutComponentsNestedInput;
    item?: Prisma.ItemUpdateOneRequiredWithoutWorkOrderComponentsNestedInput;
};
export type WorkOrderComponentUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentCreateManyItemInput = {
    id?: string;
    tenantId: string;
    workOrderId: string;
    lineNo: number;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkOrderComponentsNestedInput;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutComponentsNestedInput;
};
export type WorkOrderComponentUncheckedUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentUncheckedUpdateManyWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentCreateManyWorkOrderInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    itemId: string;
    qtyRequired: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: string | null;
};
export type WorkOrderComponentUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkOrderComponentsNestedInput;
    item?: Prisma.ItemUpdateOneRequiredWithoutWorkOrderComponentsNestedInput;
};
export type WorkOrderComponentUncheckedUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyRequired?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyIssued?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    uomCode?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type WorkOrderComponentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    qtyRequired?: boolean;
    qtyIssued?: boolean;
    uomCode?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrderComponent"]>;
export type WorkOrderComponentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    qtyRequired?: boolean;
    qtyIssued?: boolean;
    uomCode?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrderComponent"]>;
export type WorkOrderComponentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    qtyRequired?: boolean;
    qtyIssued?: boolean;
    uomCode?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workOrderComponent"]>;
export type WorkOrderComponentSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    lineNo?: boolean;
    itemId?: boolean;
    qtyRequired?: boolean;
    qtyIssued?: boolean;
    uomCode?: boolean;
};
export type WorkOrderComponentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "workOrderId" | "lineNo" | "itemId" | "qtyRequired" | "qtyIssued" | "uomCode", ExtArgs["result"]["workOrderComponent"]>;
export type WorkOrderComponentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
};
export type WorkOrderComponentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
};
export type WorkOrderComponentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
};
export type $WorkOrderComponentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkOrderComponent";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        workOrder: Prisma.$WorkOrderPayload<ExtArgs>;
        item: Prisma.$ItemPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        workOrderId: string;
        lineNo: number;
        itemId: string;
        qtyRequired: runtime.Decimal;
        qtyIssued: runtime.Decimal;
        uomCode: string | null;
    }, ExtArgs["result"]["workOrderComponent"]>;
    composites: {};
};
export type WorkOrderComponentGetPayload<S extends boolean | null | undefined | WorkOrderComponentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload, S>;
export type WorkOrderComponentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkOrderComponentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkOrderComponentCountAggregateInputType | true;
};
export interface WorkOrderComponentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkOrderComponent'];
        meta: {
            name: 'WorkOrderComponent';
        };
    };
    findUnique<T extends WorkOrderComponentFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkOrderComponentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkOrderComponentFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkOrderComponentFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkOrderComponentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkOrderComponentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkOrderComponentFindManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderComponentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkOrderComponentCreateArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentCreateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkOrderComponentCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderComponentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkOrderComponentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkOrderComponentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkOrderComponentDeleteArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkOrderComponentUpdateArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkOrderComponentDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderComponentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkOrderComponentUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkOrderComponentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkOrderComponentUpsertArgs>(args: Prisma.SelectSubset<T, WorkOrderComponentUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkOrderComponentClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderComponentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkOrderComponentCountArgs>(args?: Prisma.Subset<T, WorkOrderComponentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkOrderComponentCountAggregateOutputType> : number>;
    aggregate<T extends WorkOrderComponentAggregateArgs>(args: Prisma.Subset<T, WorkOrderComponentAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderComponentAggregateType<T>>;
    groupBy<T extends WorkOrderComponentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkOrderComponentGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkOrderComponentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkOrderComponentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderComponentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkOrderComponentFieldRefs;
}
export interface Prisma__WorkOrderComponentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    workOrder<T extends Prisma.WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    item<T extends Prisma.ItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ItemDefaultArgs<ExtArgs>>): Prisma.Prisma__ItemClient<runtime.Types.Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkOrderComponentFieldRefs {
    readonly id: Prisma.FieldRef<"WorkOrderComponent", 'String'>;
    readonly tenantId: Prisma.FieldRef<"WorkOrderComponent", 'String'>;
    readonly workOrderId: Prisma.FieldRef<"WorkOrderComponent", 'String'>;
    readonly lineNo: Prisma.FieldRef<"WorkOrderComponent", 'Int'>;
    readonly itemId: Prisma.FieldRef<"WorkOrderComponent", 'String'>;
    readonly qtyRequired: Prisma.FieldRef<"WorkOrderComponent", 'Decimal'>;
    readonly qtyIssued: Prisma.FieldRef<"WorkOrderComponent", 'Decimal'>;
    readonly uomCode: Prisma.FieldRef<"WorkOrderComponent", 'String'>;
}
export type WorkOrderComponentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderComponentWhereUniqueInput;
};
export type WorkOrderComponentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderComponentWhereUniqueInput;
};
export type WorkOrderComponentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderComponentWhereInput;
    orderBy?: Prisma.WorkOrderComponentOrderByWithRelationInput | Prisma.WorkOrderComponentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderComponentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderComponentScalarFieldEnum | Prisma.WorkOrderComponentScalarFieldEnum[];
};
export type WorkOrderComponentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderComponentWhereInput;
    orderBy?: Prisma.WorkOrderComponentOrderByWithRelationInput | Prisma.WorkOrderComponentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderComponentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderComponentScalarFieldEnum | Prisma.WorkOrderComponentScalarFieldEnum[];
};
export type WorkOrderComponentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderComponentWhereInput;
    orderBy?: Prisma.WorkOrderComponentOrderByWithRelationInput | Prisma.WorkOrderComponentOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderComponentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderComponentScalarFieldEnum | Prisma.WorkOrderComponentScalarFieldEnum[];
};
export type WorkOrderComponentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderComponentCreateInput, Prisma.WorkOrderComponentUncheckedCreateInput>;
};
export type WorkOrderComponentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkOrderComponentCreateManyInput | Prisma.WorkOrderComponentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderComponentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    data: Prisma.WorkOrderComponentCreateManyInput | Prisma.WorkOrderComponentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorkOrderComponentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorkOrderComponentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateInput, Prisma.WorkOrderComponentUncheckedUpdateInput>;
    where: Prisma.WorkOrderComponentWhereUniqueInput;
};
export type WorkOrderComponentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateManyMutationInput, Prisma.WorkOrderComponentUncheckedUpdateManyInput>;
    where?: Prisma.WorkOrderComponentWhereInput;
    limit?: number;
};
export type WorkOrderComponentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkOrderComponentUpdateManyMutationInput, Prisma.WorkOrderComponentUncheckedUpdateManyInput>;
    where?: Prisma.WorkOrderComponentWhereInput;
    limit?: number;
    include?: Prisma.WorkOrderComponentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorkOrderComponentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderComponentWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderComponentCreateInput, Prisma.WorkOrderComponentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkOrderComponentUpdateInput, Prisma.WorkOrderComponentUncheckedUpdateInput>;
};
export type WorkOrderComponentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
    where: Prisma.WorkOrderComponentWhereUniqueInput;
};
export type WorkOrderComponentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderComponentWhereInput;
    limit?: number;
};
export type WorkOrderComponentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderComponentSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderComponentOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderComponentInclude<ExtArgs> | null;
};
