import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type InProcessQcModel = runtime.Types.Result.DefaultSelection<Prisma.$InProcessQcPayload>;
export type AggregateInProcessQc = {
    _count: InProcessQcCountAggregateOutputType | null;
    _avg: InProcessQcAvgAggregateOutputType | null;
    _sum: InProcessQcSumAggregateOutputType | null;
    _min: InProcessQcMinAggregateOutputType | null;
    _max: InProcessQcMaxAggregateOutputType | null;
};
export type InProcessQcAvgAggregateOutputType = {
    qtyInspected: runtime.Decimal | null;
    qtyPassed: runtime.Decimal | null;
    qtyFailed: runtime.Decimal | null;
};
export type InProcessQcSumAggregateOutputType = {
    qtyInspected: runtime.Decimal | null;
    qtyPassed: runtime.Decimal | null;
    qtyFailed: runtime.Decimal | null;
};
export type InProcessQcMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    workOrderId: string | null;
    status: string | null;
    qtyInspected: runtime.Decimal | null;
    qtyPassed: runtime.Decimal | null;
    qtyFailed: runtime.Decimal | null;
    notes: string | null;
    inspectedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InProcessQcMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    workOrderId: string | null;
    status: string | null;
    qtyInspected: runtime.Decimal | null;
    qtyPassed: runtime.Decimal | null;
    qtyFailed: runtime.Decimal | null;
    notes: string | null;
    inspectedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InProcessQcCountAggregateOutputType = {
    id: number;
    tenantId: number;
    workOrderId: number;
    status: number;
    qtyInspected: number;
    qtyPassed: number;
    qtyFailed: number;
    notes: number;
    inspectedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InProcessQcAvgAggregateInputType = {
    qtyInspected?: true;
    qtyPassed?: true;
    qtyFailed?: true;
};
export type InProcessQcSumAggregateInputType = {
    qtyInspected?: true;
    qtyPassed?: true;
    qtyFailed?: true;
};
export type InProcessQcMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    workOrderId?: true;
    status?: true;
    qtyInspected?: true;
    qtyPassed?: true;
    qtyFailed?: true;
    notes?: true;
    inspectedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InProcessQcMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    workOrderId?: true;
    status?: true;
    qtyInspected?: true;
    qtyPassed?: true;
    qtyFailed?: true;
    notes?: true;
    inspectedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InProcessQcCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    workOrderId?: true;
    status?: true;
    qtyInspected?: true;
    qtyPassed?: true;
    qtyFailed?: true;
    notes?: true;
    inspectedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InProcessQcAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InProcessQcWhereInput;
    orderBy?: Prisma.InProcessQcOrderByWithRelationInput | Prisma.InProcessQcOrderByWithRelationInput[];
    cursor?: Prisma.InProcessQcWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InProcessQcCountAggregateInputType;
    _avg?: InProcessQcAvgAggregateInputType;
    _sum?: InProcessQcSumAggregateInputType;
    _min?: InProcessQcMinAggregateInputType;
    _max?: InProcessQcMaxAggregateInputType;
};
export type GetInProcessQcAggregateType<T extends InProcessQcAggregateArgs> = {
    [P in keyof T & keyof AggregateInProcessQc]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInProcessQc[P]> : Prisma.GetScalarType<T[P], AggregateInProcessQc[P]>;
};
export type InProcessQcGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InProcessQcWhereInput;
    orderBy?: Prisma.InProcessQcOrderByWithAggregationInput | Prisma.InProcessQcOrderByWithAggregationInput[];
    by: Prisma.InProcessQcScalarFieldEnum[] | Prisma.InProcessQcScalarFieldEnum;
    having?: Prisma.InProcessQcScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InProcessQcCountAggregateInputType | true;
    _avg?: InProcessQcAvgAggregateInputType;
    _sum?: InProcessQcSumAggregateInputType;
    _min?: InProcessQcMinAggregateInputType;
    _max?: InProcessQcMaxAggregateInputType;
};
export type InProcessQcGroupByOutputType = {
    id: string;
    tenantId: string;
    workOrderId: string;
    status: string;
    qtyInspected: runtime.Decimal;
    qtyPassed: runtime.Decimal;
    qtyFailed: runtime.Decimal;
    notes: string | null;
    inspectedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: InProcessQcCountAggregateOutputType | null;
    _avg: InProcessQcAvgAggregateOutputType | null;
    _sum: InProcessQcSumAggregateOutputType | null;
    _min: InProcessQcMinAggregateOutputType | null;
    _max: InProcessQcMaxAggregateOutputType | null;
};
export type GetInProcessQcGroupByPayload<T extends InProcessQcGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InProcessQcGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InProcessQcGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InProcessQcGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InProcessQcGroupByOutputType[P]>;
}>>;
export type InProcessQcWhereInput = {
    AND?: Prisma.InProcessQcWhereInput | Prisma.InProcessQcWhereInput[];
    OR?: Prisma.InProcessQcWhereInput[];
    NOT?: Prisma.InProcessQcWhereInput | Prisma.InProcessQcWhereInput[];
    id?: Prisma.StringFilter<"InProcessQc"> | string;
    tenantId?: Prisma.StringFilter<"InProcessQc"> | string;
    workOrderId?: Prisma.StringFilter<"InProcessQc"> | string;
    status?: Prisma.StringFilter<"InProcessQc"> | string;
    qtyInspected?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"InProcessQc"> | string | null;
    inspectedAt?: Prisma.DateTimeNullableFilter<"InProcessQc"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"InProcessQc"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"InProcessQc"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
};
export type InProcessQcOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    qtyInspected?: Prisma.SortOrder;
    qtyPassed?: Prisma.SortOrder;
    qtyFailed?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    workOrder?: Prisma.WorkOrderOrderByWithRelationInput;
};
export type InProcessQcWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InProcessQcWhereInput | Prisma.InProcessQcWhereInput[];
    OR?: Prisma.InProcessQcWhereInput[];
    NOT?: Prisma.InProcessQcWhereInput | Prisma.InProcessQcWhereInput[];
    tenantId?: Prisma.StringFilter<"InProcessQc"> | string;
    workOrderId?: Prisma.StringFilter<"InProcessQc"> | string;
    status?: Prisma.StringFilter<"InProcessQc"> | string;
    qtyInspected?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"InProcessQc"> | string | null;
    inspectedAt?: Prisma.DateTimeNullableFilter<"InProcessQc"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"InProcessQc"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"InProcessQc"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    workOrder?: Prisma.XOR<Prisma.WorkOrderScalarRelationFilter, Prisma.WorkOrderWhereInput>;
}, "id">;
export type InProcessQcOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    qtyInspected?: Prisma.SortOrder;
    qtyPassed?: Prisma.SortOrder;
    qtyFailed?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InProcessQcCountOrderByAggregateInput;
    _avg?: Prisma.InProcessQcAvgOrderByAggregateInput;
    _max?: Prisma.InProcessQcMaxOrderByAggregateInput;
    _min?: Prisma.InProcessQcMinOrderByAggregateInput;
    _sum?: Prisma.InProcessQcSumOrderByAggregateInput;
};
export type InProcessQcScalarWhereWithAggregatesInput = {
    AND?: Prisma.InProcessQcScalarWhereWithAggregatesInput | Prisma.InProcessQcScalarWhereWithAggregatesInput[];
    OR?: Prisma.InProcessQcScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InProcessQcScalarWhereWithAggregatesInput | Prisma.InProcessQcScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"InProcessQc"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"InProcessQc"> | string;
    workOrderId?: Prisma.StringWithAggregatesFilter<"InProcessQc"> | string;
    status?: Prisma.StringWithAggregatesFilter<"InProcessQc"> | string;
    qtyInspected?: Prisma.DecimalWithAggregatesFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalWithAggregatesFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalWithAggregatesFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"InProcessQc"> | string | null;
    inspectedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"InProcessQc"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InProcessQc"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"InProcessQc"> | Date | string;
};
export type InProcessQcCreateInput = {
    id?: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutInProcessQcsInput;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutInProcessQcsInput;
};
export type InProcessQcUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    workOrderId: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InProcessQcUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutInProcessQcsNestedInput;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutInProcessQcsNestedInput;
};
export type InProcessQcUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InProcessQcCreateManyInput = {
    id?: string;
    tenantId: string;
    workOrderId: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InProcessQcUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InProcessQcUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InProcessQcListRelationFilter = {
    every?: Prisma.InProcessQcWhereInput;
    some?: Prisma.InProcessQcWhereInput;
    none?: Prisma.InProcessQcWhereInput;
};
export type InProcessQcOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InProcessQcCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    qtyInspected?: Prisma.SortOrder;
    qtyPassed?: Prisma.SortOrder;
    qtyFailed?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InProcessQcAvgOrderByAggregateInput = {
    qtyInspected?: Prisma.SortOrder;
    qtyPassed?: Prisma.SortOrder;
    qtyFailed?: Prisma.SortOrder;
};
export type InProcessQcMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    qtyInspected?: Prisma.SortOrder;
    qtyPassed?: Prisma.SortOrder;
    qtyFailed?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InProcessQcMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    workOrderId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    qtyInspected?: Prisma.SortOrder;
    qtyPassed?: Prisma.SortOrder;
    qtyFailed?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    inspectedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InProcessQcSumOrderByAggregateInput = {
    qtyInspected?: Prisma.SortOrder;
    qtyPassed?: Prisma.SortOrder;
    qtyFailed?: Prisma.SortOrder;
};
export type InProcessQcCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutTenantInput, Prisma.InProcessQcUncheckedCreateWithoutTenantInput> | Prisma.InProcessQcCreateWithoutTenantInput[] | Prisma.InProcessQcUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutTenantInput | Prisma.InProcessQcCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.InProcessQcCreateManyTenantInputEnvelope;
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
};
export type InProcessQcUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutTenantInput, Prisma.InProcessQcUncheckedCreateWithoutTenantInput> | Prisma.InProcessQcCreateWithoutTenantInput[] | Prisma.InProcessQcUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutTenantInput | Prisma.InProcessQcCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.InProcessQcCreateManyTenantInputEnvelope;
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
};
export type InProcessQcUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutTenantInput, Prisma.InProcessQcUncheckedCreateWithoutTenantInput> | Prisma.InProcessQcCreateWithoutTenantInput[] | Prisma.InProcessQcUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutTenantInput | Prisma.InProcessQcCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.InProcessQcUpsertWithWhereUniqueWithoutTenantInput | Prisma.InProcessQcUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.InProcessQcCreateManyTenantInputEnvelope;
    set?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    disconnect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    delete?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    update?: Prisma.InProcessQcUpdateWithWhereUniqueWithoutTenantInput | Prisma.InProcessQcUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.InProcessQcUpdateManyWithWhereWithoutTenantInput | Prisma.InProcessQcUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.InProcessQcScalarWhereInput | Prisma.InProcessQcScalarWhereInput[];
};
export type InProcessQcUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutTenantInput, Prisma.InProcessQcUncheckedCreateWithoutTenantInput> | Prisma.InProcessQcCreateWithoutTenantInput[] | Prisma.InProcessQcUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutTenantInput | Prisma.InProcessQcCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.InProcessQcUpsertWithWhereUniqueWithoutTenantInput | Prisma.InProcessQcUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.InProcessQcCreateManyTenantInputEnvelope;
    set?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    disconnect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    delete?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    update?: Prisma.InProcessQcUpdateWithWhereUniqueWithoutTenantInput | Prisma.InProcessQcUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.InProcessQcUpdateManyWithWhereWithoutTenantInput | Prisma.InProcessQcUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.InProcessQcScalarWhereInput | Prisma.InProcessQcScalarWhereInput[];
};
export type InProcessQcCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput> | Prisma.InProcessQcCreateWithoutWorkOrderInput[] | Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput | Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.InProcessQcCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
};
export type InProcessQcUncheckedCreateNestedManyWithoutWorkOrderInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput> | Prisma.InProcessQcCreateWithoutWorkOrderInput[] | Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput | Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput[];
    createMany?: Prisma.InProcessQcCreateManyWorkOrderInputEnvelope;
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
};
export type InProcessQcUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput> | Prisma.InProcessQcCreateWithoutWorkOrderInput[] | Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput | Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.InProcessQcUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.InProcessQcUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.InProcessQcCreateManyWorkOrderInputEnvelope;
    set?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    disconnect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    delete?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    update?: Prisma.InProcessQcUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.InProcessQcUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.InProcessQcUpdateManyWithWhereWithoutWorkOrderInput | Prisma.InProcessQcUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.InProcessQcScalarWhereInput | Prisma.InProcessQcScalarWhereInput[];
};
export type InProcessQcUncheckedUpdateManyWithoutWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.InProcessQcCreateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput> | Prisma.InProcessQcCreateWithoutWorkOrderInput[] | Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput[];
    connectOrCreate?: Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput | Prisma.InProcessQcCreateOrConnectWithoutWorkOrderInput[];
    upsert?: Prisma.InProcessQcUpsertWithWhereUniqueWithoutWorkOrderInput | Prisma.InProcessQcUpsertWithWhereUniqueWithoutWorkOrderInput[];
    createMany?: Prisma.InProcessQcCreateManyWorkOrderInputEnvelope;
    set?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    disconnect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    delete?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    connect?: Prisma.InProcessQcWhereUniqueInput | Prisma.InProcessQcWhereUniqueInput[];
    update?: Prisma.InProcessQcUpdateWithWhereUniqueWithoutWorkOrderInput | Prisma.InProcessQcUpdateWithWhereUniqueWithoutWorkOrderInput[];
    updateMany?: Prisma.InProcessQcUpdateManyWithWhereWithoutWorkOrderInput | Prisma.InProcessQcUpdateManyWithWhereWithoutWorkOrderInput[];
    deleteMany?: Prisma.InProcessQcScalarWhereInput | Prisma.InProcessQcScalarWhereInput[];
};
export type InProcessQcCreateWithoutTenantInput = {
    id?: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrder: Prisma.WorkOrderCreateNestedOneWithoutInProcessQcsInput;
};
export type InProcessQcUncheckedCreateWithoutTenantInput = {
    id?: string;
    workOrderId: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InProcessQcCreateOrConnectWithoutTenantInput = {
    where: Prisma.InProcessQcWhereUniqueInput;
    create: Prisma.XOR<Prisma.InProcessQcCreateWithoutTenantInput, Prisma.InProcessQcUncheckedCreateWithoutTenantInput>;
};
export type InProcessQcCreateManyTenantInputEnvelope = {
    data: Prisma.InProcessQcCreateManyTenantInput | Prisma.InProcessQcCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type InProcessQcUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.InProcessQcWhereUniqueInput;
    update: Prisma.XOR<Prisma.InProcessQcUpdateWithoutTenantInput, Prisma.InProcessQcUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.InProcessQcCreateWithoutTenantInput, Prisma.InProcessQcUncheckedCreateWithoutTenantInput>;
};
export type InProcessQcUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.InProcessQcWhereUniqueInput;
    data: Prisma.XOR<Prisma.InProcessQcUpdateWithoutTenantInput, Prisma.InProcessQcUncheckedUpdateWithoutTenantInput>;
};
export type InProcessQcUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.InProcessQcScalarWhereInput;
    data: Prisma.XOR<Prisma.InProcessQcUpdateManyMutationInput, Prisma.InProcessQcUncheckedUpdateManyWithoutTenantInput>;
};
export type InProcessQcScalarWhereInput = {
    AND?: Prisma.InProcessQcScalarWhereInput | Prisma.InProcessQcScalarWhereInput[];
    OR?: Prisma.InProcessQcScalarWhereInput[];
    NOT?: Prisma.InProcessQcScalarWhereInput | Prisma.InProcessQcScalarWhereInput[];
    id?: Prisma.StringFilter<"InProcessQc"> | string;
    tenantId?: Prisma.StringFilter<"InProcessQc"> | string;
    workOrderId?: Prisma.StringFilter<"InProcessQc"> | string;
    status?: Prisma.StringFilter<"InProcessQc"> | string;
    qtyInspected?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFilter<"InProcessQc"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"InProcessQc"> | string | null;
    inspectedAt?: Prisma.DateTimeNullableFilter<"InProcessQc"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"InProcessQc"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"InProcessQc"> | Date | string;
};
export type InProcessQcCreateWithoutWorkOrderInput = {
    id?: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutInProcessQcsInput;
};
export type InProcessQcUncheckedCreateWithoutWorkOrderInput = {
    id?: string;
    tenantId: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InProcessQcCreateOrConnectWithoutWorkOrderInput = {
    where: Prisma.InProcessQcWhereUniqueInput;
    create: Prisma.XOR<Prisma.InProcessQcCreateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput>;
};
export type InProcessQcCreateManyWorkOrderInputEnvelope = {
    data: Prisma.InProcessQcCreateManyWorkOrderInput | Prisma.InProcessQcCreateManyWorkOrderInput[];
    skipDuplicates?: boolean;
};
export type InProcessQcUpsertWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.InProcessQcWhereUniqueInput;
    update: Prisma.XOR<Prisma.InProcessQcUpdateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedUpdateWithoutWorkOrderInput>;
    create: Prisma.XOR<Prisma.InProcessQcCreateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedCreateWithoutWorkOrderInput>;
};
export type InProcessQcUpdateWithWhereUniqueWithoutWorkOrderInput = {
    where: Prisma.InProcessQcWhereUniqueInput;
    data: Prisma.XOR<Prisma.InProcessQcUpdateWithoutWorkOrderInput, Prisma.InProcessQcUncheckedUpdateWithoutWorkOrderInput>;
};
export type InProcessQcUpdateManyWithWhereWithoutWorkOrderInput = {
    where: Prisma.InProcessQcScalarWhereInput;
    data: Prisma.XOR<Prisma.InProcessQcUpdateManyMutationInput, Prisma.InProcessQcUncheckedUpdateManyWithoutWorkOrderInput>;
};
export type InProcessQcCreateManyTenantInput = {
    id?: string;
    workOrderId: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InProcessQcUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrder?: Prisma.WorkOrderUpdateOneRequiredWithoutInProcessQcsNestedInput;
};
export type InProcessQcUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InProcessQcUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    workOrderId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InProcessQcCreateManyWorkOrderInput = {
    id?: string;
    tenantId: string;
    status?: string;
    qtyInspected: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    inspectedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InProcessQcUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutInProcessQcsNestedInput;
};
export type InProcessQcUncheckedUpdateWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InProcessQcUncheckedUpdateManyWithoutWorkOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    qtyInspected?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyPassed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    qtyFailed?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InProcessQcSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    status?: boolean;
    qtyInspected?: boolean;
    qtyPassed?: boolean;
    qtyFailed?: boolean;
    notes?: boolean;
    inspectedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inProcessQc"]>;
export type InProcessQcSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    status?: boolean;
    qtyInspected?: boolean;
    qtyPassed?: boolean;
    qtyFailed?: boolean;
    notes?: boolean;
    inspectedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inProcessQc"]>;
export type InProcessQcSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    status?: boolean;
    qtyInspected?: boolean;
    qtyPassed?: boolean;
    qtyFailed?: boolean;
    notes?: boolean;
    inspectedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["inProcessQc"]>;
export type InProcessQcSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    workOrderId?: boolean;
    status?: boolean;
    qtyInspected?: boolean;
    qtyPassed?: boolean;
    qtyFailed?: boolean;
    notes?: boolean;
    inspectedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InProcessQcOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "workOrderId" | "status" | "qtyInspected" | "qtyPassed" | "qtyFailed" | "notes" | "inspectedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["inProcessQc"]>;
export type InProcessQcInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type InProcessQcIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type InProcessQcIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workOrder?: boolean | Prisma.WorkOrderDefaultArgs<ExtArgs>;
};
export type $InProcessQcPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InProcessQc";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        workOrder: Prisma.$WorkOrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        workOrderId: string;
        status: string;
        qtyInspected: runtime.Decimal;
        qtyPassed: runtime.Decimal;
        qtyFailed: runtime.Decimal;
        notes: string | null;
        inspectedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["inProcessQc"]>;
    composites: {};
};
export type InProcessQcGetPayload<S extends boolean | null | undefined | InProcessQcDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload, S>;
export type InProcessQcCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InProcessQcFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InProcessQcCountAggregateInputType | true;
};
export interface InProcessQcDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InProcessQc'];
        meta: {
            name: 'InProcessQc';
        };
    };
    findUnique<T extends InProcessQcFindUniqueArgs>(args: Prisma.SelectSubset<T, InProcessQcFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InProcessQcFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InProcessQcFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InProcessQcFindFirstArgs>(args?: Prisma.SelectSubset<T, InProcessQcFindFirstArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InProcessQcFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InProcessQcFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InProcessQcFindManyArgs>(args?: Prisma.SelectSubset<T, InProcessQcFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InProcessQcCreateArgs>(args: Prisma.SelectSubset<T, InProcessQcCreateArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InProcessQcCreateManyArgs>(args?: Prisma.SelectSubset<T, InProcessQcCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InProcessQcCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InProcessQcCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InProcessQcDeleteArgs>(args: Prisma.SelectSubset<T, InProcessQcDeleteArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InProcessQcUpdateArgs>(args: Prisma.SelectSubset<T, InProcessQcUpdateArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InProcessQcDeleteManyArgs>(args?: Prisma.SelectSubset<T, InProcessQcDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InProcessQcUpdateManyArgs>(args: Prisma.SelectSubset<T, InProcessQcUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InProcessQcUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InProcessQcUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InProcessQcUpsertArgs>(args: Prisma.SelectSubset<T, InProcessQcUpsertArgs<ExtArgs>>): Prisma.Prisma__InProcessQcClient<runtime.Types.Result.GetResult<Prisma.$InProcessQcPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InProcessQcCountArgs>(args?: Prisma.Subset<T, InProcessQcCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InProcessQcCountAggregateOutputType> : number>;
    aggregate<T extends InProcessQcAggregateArgs>(args: Prisma.Subset<T, InProcessQcAggregateArgs>): Prisma.PrismaPromise<GetInProcessQcAggregateType<T>>;
    groupBy<T extends InProcessQcGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InProcessQcGroupByArgs['orderBy'];
    } : {
        orderBy?: InProcessQcGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InProcessQcGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInProcessQcGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InProcessQcFieldRefs;
}
export interface Prisma__InProcessQcClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    workOrder<T extends Prisma.WorkOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InProcessQcFieldRefs {
    readonly id: Prisma.FieldRef<"InProcessQc", 'String'>;
    readonly tenantId: Prisma.FieldRef<"InProcessQc", 'String'>;
    readonly workOrderId: Prisma.FieldRef<"InProcessQc", 'String'>;
    readonly status: Prisma.FieldRef<"InProcessQc", 'String'>;
    readonly qtyInspected: Prisma.FieldRef<"InProcessQc", 'Decimal'>;
    readonly qtyPassed: Prisma.FieldRef<"InProcessQc", 'Decimal'>;
    readonly qtyFailed: Prisma.FieldRef<"InProcessQc", 'Decimal'>;
    readonly notes: Prisma.FieldRef<"InProcessQc", 'String'>;
    readonly inspectedAt: Prisma.FieldRef<"InProcessQc", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"InProcessQc", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"InProcessQc", 'DateTime'>;
}
export type InProcessQcFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    where: Prisma.InProcessQcWhereUniqueInput;
};
export type InProcessQcFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    where: Prisma.InProcessQcWhereUniqueInput;
};
export type InProcessQcFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    where?: Prisma.InProcessQcWhereInput;
    orderBy?: Prisma.InProcessQcOrderByWithRelationInput | Prisma.InProcessQcOrderByWithRelationInput[];
    cursor?: Prisma.InProcessQcWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InProcessQcScalarFieldEnum | Prisma.InProcessQcScalarFieldEnum[];
};
export type InProcessQcFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    where?: Prisma.InProcessQcWhereInput;
    orderBy?: Prisma.InProcessQcOrderByWithRelationInput | Prisma.InProcessQcOrderByWithRelationInput[];
    cursor?: Prisma.InProcessQcWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InProcessQcScalarFieldEnum | Prisma.InProcessQcScalarFieldEnum[];
};
export type InProcessQcFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    where?: Prisma.InProcessQcWhereInput;
    orderBy?: Prisma.InProcessQcOrderByWithRelationInput | Prisma.InProcessQcOrderByWithRelationInput[];
    cursor?: Prisma.InProcessQcWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InProcessQcScalarFieldEnum | Prisma.InProcessQcScalarFieldEnum[];
};
export type InProcessQcCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InProcessQcCreateInput, Prisma.InProcessQcUncheckedCreateInput>;
};
export type InProcessQcCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InProcessQcCreateManyInput | Prisma.InProcessQcCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InProcessQcCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    data: Prisma.InProcessQcCreateManyInput | Prisma.InProcessQcCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InProcessQcIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InProcessQcUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InProcessQcUpdateInput, Prisma.InProcessQcUncheckedUpdateInput>;
    where: Prisma.InProcessQcWhereUniqueInput;
};
export type InProcessQcUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InProcessQcUpdateManyMutationInput, Prisma.InProcessQcUncheckedUpdateManyInput>;
    where?: Prisma.InProcessQcWhereInput;
    limit?: number;
};
export type InProcessQcUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InProcessQcUpdateManyMutationInput, Prisma.InProcessQcUncheckedUpdateManyInput>;
    where?: Prisma.InProcessQcWhereInput;
    limit?: number;
    include?: Prisma.InProcessQcIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InProcessQcUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    where: Prisma.InProcessQcWhereUniqueInput;
    create: Prisma.XOR<Prisma.InProcessQcCreateInput, Prisma.InProcessQcUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InProcessQcUpdateInput, Prisma.InProcessQcUncheckedUpdateInput>;
};
export type InProcessQcDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
    where: Prisma.InProcessQcWhereUniqueInput;
};
export type InProcessQcDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InProcessQcWhereInput;
    limit?: number;
};
export type InProcessQcDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InProcessQcSelect<ExtArgs> | null;
    omit?: Prisma.InProcessQcOmit<ExtArgs> | null;
    include?: Prisma.InProcessQcInclude<ExtArgs> | null;
};
