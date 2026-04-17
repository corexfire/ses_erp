import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PurchaseRequisitionModel = runtime.Types.Result.DefaultSelection<Prisma.$PurchaseRequisitionPayload>;
export type AggregatePurchaseRequisition = {
    _count: PurchaseRequisitionCountAggregateOutputType | null;
    _avg: PurchaseRequisitionAvgAggregateOutputType | null;
    _sum: PurchaseRequisitionSumAggregateOutputType | null;
    _min: PurchaseRequisitionMinAggregateOutputType | null;
    _max: PurchaseRequisitionMaxAggregateOutputType | null;
};
export type PurchaseRequisitionAvgAggregateOutputType = {
    estimatedTotal: runtime.Decimal | null;
    currentStepNo: number | null;
};
export type PurchaseRequisitionSumAggregateOutputType = {
    estimatedTotal: runtime.Decimal | null;
    currentStepNo: number | null;
};
export type PurchaseRequisitionMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    requestDate: Date | null;
    status: $Enums.ProcurementDocStatus | null;
    notes: string | null;
    department: string | null;
    costCenterId: string | null;
    estimatedTotal: runtime.Decimal | null;
    workflowDefinitionId: string | null;
    currentStepNo: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PurchaseRequisitionMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    requestDate: Date | null;
    status: $Enums.ProcurementDocStatus | null;
    notes: string | null;
    department: string | null;
    costCenterId: string | null;
    estimatedTotal: runtime.Decimal | null;
    workflowDefinitionId: string | null;
    currentStepNo: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PurchaseRequisitionCountAggregateOutputType = {
    id: number;
    tenantId: number;
    code: number;
    requestDate: number;
    status: number;
    notes: number;
    department: number;
    costCenterId: number;
    estimatedTotal: number;
    workflowDefinitionId: number;
    currentStepNo: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PurchaseRequisitionAvgAggregateInputType = {
    estimatedTotal?: true;
    currentStepNo?: true;
};
export type PurchaseRequisitionSumAggregateInputType = {
    estimatedTotal?: true;
    currentStepNo?: true;
};
export type PurchaseRequisitionMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    requestDate?: true;
    status?: true;
    notes?: true;
    department?: true;
    costCenterId?: true;
    estimatedTotal?: true;
    workflowDefinitionId?: true;
    currentStepNo?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PurchaseRequisitionMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    requestDate?: true;
    status?: true;
    notes?: true;
    department?: true;
    costCenterId?: true;
    estimatedTotal?: true;
    workflowDefinitionId?: true;
    currentStepNo?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PurchaseRequisitionCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    requestDate?: true;
    status?: true;
    notes?: true;
    department?: true;
    costCenterId?: true;
    estimatedTotal?: true;
    workflowDefinitionId?: true;
    currentStepNo?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PurchaseRequisitionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionWhereInput;
    orderBy?: Prisma.PurchaseRequisitionOrderByWithRelationInput | Prisma.PurchaseRequisitionOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PurchaseRequisitionCountAggregateInputType;
    _avg?: PurchaseRequisitionAvgAggregateInputType;
    _sum?: PurchaseRequisitionSumAggregateInputType;
    _min?: PurchaseRequisitionMinAggregateInputType;
    _max?: PurchaseRequisitionMaxAggregateInputType;
};
export type GetPurchaseRequisitionAggregateType<T extends PurchaseRequisitionAggregateArgs> = {
    [P in keyof T & keyof AggregatePurchaseRequisition]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePurchaseRequisition[P]> : Prisma.GetScalarType<T[P], AggregatePurchaseRequisition[P]>;
};
export type PurchaseRequisitionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionWhereInput;
    orderBy?: Prisma.PurchaseRequisitionOrderByWithAggregationInput | Prisma.PurchaseRequisitionOrderByWithAggregationInput[];
    by: Prisma.PurchaseRequisitionScalarFieldEnum[] | Prisma.PurchaseRequisitionScalarFieldEnum;
    having?: Prisma.PurchaseRequisitionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PurchaseRequisitionCountAggregateInputType | true;
    _avg?: PurchaseRequisitionAvgAggregateInputType;
    _sum?: PurchaseRequisitionSumAggregateInputType;
    _min?: PurchaseRequisitionMinAggregateInputType;
    _max?: PurchaseRequisitionMaxAggregateInputType;
};
export type PurchaseRequisitionGroupByOutputType = {
    id: string;
    tenantId: string;
    code: string;
    requestDate: Date;
    status: $Enums.ProcurementDocStatus;
    notes: string | null;
    department: string | null;
    costCenterId: string | null;
    estimatedTotal: runtime.Decimal;
    workflowDefinitionId: string | null;
    currentStepNo: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PurchaseRequisitionCountAggregateOutputType | null;
    _avg: PurchaseRequisitionAvgAggregateOutputType | null;
    _sum: PurchaseRequisitionSumAggregateOutputType | null;
    _min: PurchaseRequisitionMinAggregateOutputType | null;
    _max: PurchaseRequisitionMaxAggregateOutputType | null;
};
export type GetPurchaseRequisitionGroupByPayload<T extends PurchaseRequisitionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PurchaseRequisitionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PurchaseRequisitionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PurchaseRequisitionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PurchaseRequisitionGroupByOutputType[P]>;
}>>;
export type PurchaseRequisitionWhereInput = {
    AND?: Prisma.PurchaseRequisitionWhereInput | Prisma.PurchaseRequisitionWhereInput[];
    OR?: Prisma.PurchaseRequisitionWhereInput[];
    NOT?: Prisma.PurchaseRequisitionWhereInput | Prisma.PurchaseRequisitionWhereInput[];
    id?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    code?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    requestDate?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusFilter<"PurchaseRequisition"> | $Enums.ProcurementDocStatus;
    notes?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    department?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    costCenterId?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    estimatedTotal?: Prisma.DecimalFilter<"PurchaseRequisition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    currentStepNo?: Prisma.IntNullableFilter<"PurchaseRequisition"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    workflowDef?: Prisma.XOR<Prisma.WorkflowDefinitionNullableScalarRelationFilter, Prisma.WorkflowDefinitionWhereInput> | null;
    items?: Prisma.PurchaseRequisitionItemListRelationFilter;
};
export type PurchaseRequisitionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    department?: Prisma.SortOrderInput | Prisma.SortOrder;
    costCenterId?: Prisma.SortOrderInput | Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    workflowDefinitionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentStepNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    workflowDef?: Prisma.WorkflowDefinitionOrderByWithRelationInput;
    items?: Prisma.PurchaseRequisitionItemOrderByRelationAggregateInput;
};
export type PurchaseRequisitionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.PurchaseRequisitionTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.PurchaseRequisitionWhereInput | Prisma.PurchaseRequisitionWhereInput[];
    OR?: Prisma.PurchaseRequisitionWhereInput[];
    NOT?: Prisma.PurchaseRequisitionWhereInput | Prisma.PurchaseRequisitionWhereInput[];
    tenantId?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    code?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    requestDate?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusFilter<"PurchaseRequisition"> | $Enums.ProcurementDocStatus;
    notes?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    department?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    costCenterId?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    estimatedTotal?: Prisma.DecimalFilter<"PurchaseRequisition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    currentStepNo?: Prisma.IntNullableFilter<"PurchaseRequisition"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    workflowDef?: Prisma.XOR<Prisma.WorkflowDefinitionNullableScalarRelationFilter, Prisma.WorkflowDefinitionWhereInput> | null;
    items?: Prisma.PurchaseRequisitionItemListRelationFilter;
}, "id" | "tenantId_code">;
export type PurchaseRequisitionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    department?: Prisma.SortOrderInput | Prisma.SortOrder;
    costCenterId?: Prisma.SortOrderInput | Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    workflowDefinitionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentStepNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PurchaseRequisitionCountOrderByAggregateInput;
    _avg?: Prisma.PurchaseRequisitionAvgOrderByAggregateInput;
    _max?: Prisma.PurchaseRequisitionMaxOrderByAggregateInput;
    _min?: Prisma.PurchaseRequisitionMinOrderByAggregateInput;
    _sum?: Prisma.PurchaseRequisitionSumOrderByAggregateInput;
};
export type PurchaseRequisitionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PurchaseRequisitionScalarWhereWithAggregatesInput | Prisma.PurchaseRequisitionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PurchaseRequisitionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PurchaseRequisitionScalarWhereWithAggregatesInput | Prisma.PurchaseRequisitionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PurchaseRequisition"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"PurchaseRequisition"> | string;
    code?: Prisma.StringWithAggregatesFilter<"PurchaseRequisition"> | string;
    requestDate?: Prisma.DateTimeWithAggregatesFilter<"PurchaseRequisition"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusWithAggregatesFilter<"PurchaseRequisition"> | $Enums.ProcurementDocStatus;
    notes?: Prisma.StringNullableWithAggregatesFilter<"PurchaseRequisition"> | string | null;
    department?: Prisma.StringNullableWithAggregatesFilter<"PurchaseRequisition"> | string | null;
    costCenterId?: Prisma.StringNullableWithAggregatesFilter<"PurchaseRequisition"> | string | null;
    estimatedTotal?: Prisma.DecimalWithAggregatesFilter<"PurchaseRequisition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.StringNullableWithAggregatesFilter<"PurchaseRequisition"> | string | null;
    currentStepNo?: Prisma.IntNullableWithAggregatesFilter<"PurchaseRequisition"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PurchaseRequisition"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PurchaseRequisition"> | Date | string;
};
export type PurchaseRequisitionCreateInput = {
    id?: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseRequisitionsInput;
    workflowDef?: Prisma.WorkflowDefinitionCreateNestedOneWithoutPurchaseRequisitionsInput;
    items?: Prisma.PurchaseRequisitionItemCreateNestedManyWithoutRequisitionInput;
};
export type PurchaseRequisitionUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: string | null;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.PurchaseRequisitionItemUncheckedCreateNestedManyWithoutRequisitionInput;
};
export type PurchaseRequisitionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseRequisitionsNestedInput;
    workflowDef?: Prisma.WorkflowDefinitionUpdateOneWithoutPurchaseRequisitionsNestedInput;
    items?: Prisma.PurchaseRequisitionItemUpdateManyWithoutRequisitionNestedInput;
};
export type PurchaseRequisitionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.PurchaseRequisitionItemUncheckedUpdateManyWithoutRequisitionNestedInput;
};
export type PurchaseRequisitionCreateManyInput = {
    id?: string;
    tenantId: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: string | null;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PurchaseRequisitionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseRequisitionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseRequisitionListRelationFilter = {
    every?: Prisma.PurchaseRequisitionWhereInput;
    some?: Prisma.PurchaseRequisitionWhereInput;
    none?: Prisma.PurchaseRequisitionWhereInput;
};
export type PurchaseRequisitionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PurchaseRequisitionTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type PurchaseRequisitionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    department?: Prisma.SortOrder;
    costCenterId?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    workflowDefinitionId?: Prisma.SortOrder;
    currentStepNo?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PurchaseRequisitionAvgOrderByAggregateInput = {
    estimatedTotal?: Prisma.SortOrder;
    currentStepNo?: Prisma.SortOrder;
};
export type PurchaseRequisitionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    department?: Prisma.SortOrder;
    costCenterId?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    workflowDefinitionId?: Prisma.SortOrder;
    currentStepNo?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PurchaseRequisitionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    department?: Prisma.SortOrder;
    costCenterId?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    workflowDefinitionId?: Prisma.SortOrder;
    currentStepNo?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PurchaseRequisitionSumOrderByAggregateInput = {
    estimatedTotal?: Prisma.SortOrder;
    currentStepNo?: Prisma.SortOrder;
};
export type PurchaseRequisitionScalarRelationFilter = {
    is?: Prisma.PurchaseRequisitionWhereInput;
    isNot?: Prisma.PurchaseRequisitionWhereInput;
};
export type PurchaseRequisitionCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
};
export type PurchaseRequisitionUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyTenantInputEnvelope;
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
};
export type PurchaseRequisitionUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseRequisitionScalarWhereInput | Prisma.PurchaseRequisitionScalarWhereInput[];
};
export type PurchaseRequisitionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput> | Prisma.PurchaseRequisitionCreateWithoutTenantInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyTenantInputEnvelope;
    set?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutTenantInput | Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutTenantInput | Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PurchaseRequisitionScalarWhereInput | Prisma.PurchaseRequisitionScalarWhereInput[];
};
export type EnumProcurementDocStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProcurementDocStatus;
};
export type PurchaseRequisitionCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutItemsInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutItemsInput;
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput;
};
export type PurchaseRequisitionUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutItemsInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.PurchaseRequisitionUpsertWithoutItemsInput;
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PurchaseRequisitionUpdateToOneWithWhereWithoutItemsInput, Prisma.PurchaseRequisitionUpdateWithoutItemsInput>, Prisma.PurchaseRequisitionUncheckedUpdateWithoutItemsInput>;
};
export type PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput> | Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyWorkflowDefInputEnvelope;
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
};
export type PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput> | Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyWorkflowDefInputEnvelope;
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
};
export type PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput> | Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput[];
    upsert?: Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutWorkflowDefInput | Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutWorkflowDefInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyWorkflowDefInputEnvelope;
    set?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutWorkflowDefInput | Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutWorkflowDefInput[];
    updateMany?: Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutWorkflowDefInput | Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutWorkflowDefInput[];
    deleteMany?: Prisma.PurchaseRequisitionScalarWhereInput | Prisma.PurchaseRequisitionScalarWhereInput[];
};
export type PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput = {
    create?: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput> | Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput[] | Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput[];
    connectOrCreate?: Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput | Prisma.PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput[];
    upsert?: Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutWorkflowDefInput | Prisma.PurchaseRequisitionUpsertWithWhereUniqueWithoutWorkflowDefInput[];
    createMany?: Prisma.PurchaseRequisitionCreateManyWorkflowDefInputEnvelope;
    set?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    disconnect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    delete?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    connect?: Prisma.PurchaseRequisitionWhereUniqueInput | Prisma.PurchaseRequisitionWhereUniqueInput[];
    update?: Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutWorkflowDefInput | Prisma.PurchaseRequisitionUpdateWithWhereUniqueWithoutWorkflowDefInput[];
    updateMany?: Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutWorkflowDefInput | Prisma.PurchaseRequisitionUpdateManyWithWhereWithoutWorkflowDefInput[];
    deleteMany?: Prisma.PurchaseRequisitionScalarWhereInput | Prisma.PurchaseRequisitionScalarWhereInput[];
};
export type PurchaseRequisitionCreateWithoutTenantInput = {
    id?: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workflowDef?: Prisma.WorkflowDefinitionCreateNestedOneWithoutPurchaseRequisitionsInput;
    items?: Prisma.PurchaseRequisitionItemCreateNestedManyWithoutRequisitionInput;
};
export type PurchaseRequisitionUncheckedCreateWithoutTenantInput = {
    id?: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: string | null;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.PurchaseRequisitionItemUncheckedCreateNestedManyWithoutRequisitionInput;
};
export type PurchaseRequisitionCreateOrConnectWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput>;
};
export type PurchaseRequisitionCreateManyTenantInputEnvelope = {
    data: Prisma.PurchaseRequisitionCreateManyTenantInput | Prisma.PurchaseRequisitionCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type PurchaseRequisitionUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseRequisitionUpdateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutTenantInput>;
};
export type PurchaseRequisitionUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateWithoutTenantInput, Prisma.PurchaseRequisitionUncheckedUpdateWithoutTenantInput>;
};
export type PurchaseRequisitionUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.PurchaseRequisitionScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateManyMutationInput, Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutTenantInput>;
};
export type PurchaseRequisitionScalarWhereInput = {
    AND?: Prisma.PurchaseRequisitionScalarWhereInput | Prisma.PurchaseRequisitionScalarWhereInput[];
    OR?: Prisma.PurchaseRequisitionScalarWhereInput[];
    NOT?: Prisma.PurchaseRequisitionScalarWhereInput | Prisma.PurchaseRequisitionScalarWhereInput[];
    id?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    tenantId?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    code?: Prisma.StringFilter<"PurchaseRequisition"> | string;
    requestDate?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusFilter<"PurchaseRequisition"> | $Enums.ProcurementDocStatus;
    notes?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    department?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    costCenterId?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    estimatedTotal?: Prisma.DecimalFilter<"PurchaseRequisition"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.StringNullableFilter<"PurchaseRequisition"> | string | null;
    currentStepNo?: Prisma.IntNullableFilter<"PurchaseRequisition"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PurchaseRequisition"> | Date | string;
};
export type PurchaseRequisitionCreateWithoutItemsInput = {
    id?: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseRequisitionsInput;
    workflowDef?: Prisma.WorkflowDefinitionCreateNestedOneWithoutPurchaseRequisitionsInput;
};
export type PurchaseRequisitionUncheckedCreateWithoutItemsInput = {
    id?: string;
    tenantId: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: string | null;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PurchaseRequisitionCreateOrConnectWithoutItemsInput = {
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutItemsInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutItemsInput>;
};
export type PurchaseRequisitionUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.PurchaseRequisitionUpdateWithoutItemsInput, Prisma.PurchaseRequisitionUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutItemsInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutItemsInput>;
    where?: Prisma.PurchaseRequisitionWhereInput;
};
export type PurchaseRequisitionUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.PurchaseRequisitionWhereInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateWithoutItemsInput, Prisma.PurchaseRequisitionUncheckedUpdateWithoutItemsInput>;
};
export type PurchaseRequisitionUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseRequisitionsNestedInput;
    workflowDef?: Prisma.WorkflowDefinitionUpdateOneWithoutPurchaseRequisitionsNestedInput;
};
export type PurchaseRequisitionUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseRequisitionCreateWithoutWorkflowDefInput = {
    id?: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPurchaseRequisitionsInput;
    items?: Prisma.PurchaseRequisitionItemCreateNestedManyWithoutRequisitionInput;
};
export type PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput = {
    id?: string;
    tenantId: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.PurchaseRequisitionItemUncheckedCreateNestedManyWithoutRequisitionInput;
};
export type PurchaseRequisitionCreateOrConnectWithoutWorkflowDefInput = {
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput>;
};
export type PurchaseRequisitionCreateManyWorkflowDefInputEnvelope = {
    data: Prisma.PurchaseRequisitionCreateManyWorkflowDefInput | Prisma.PurchaseRequisitionCreateManyWorkflowDefInput[];
    skipDuplicates?: boolean;
};
export type PurchaseRequisitionUpsertWithWhereUniqueWithoutWorkflowDefInput = {
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PurchaseRequisitionUpdateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedUpdateWithoutWorkflowDefInput>;
    create: Prisma.XOR<Prisma.PurchaseRequisitionCreateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedCreateWithoutWorkflowDefInput>;
};
export type PurchaseRequisitionUpdateWithWhereUniqueWithoutWorkflowDefInput = {
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateWithoutWorkflowDefInput, Prisma.PurchaseRequisitionUncheckedUpdateWithoutWorkflowDefInput>;
};
export type PurchaseRequisitionUpdateManyWithWhereWithoutWorkflowDefInput = {
    where: Prisma.PurchaseRequisitionScalarWhereInput;
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateManyMutationInput, Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefInput>;
};
export type PurchaseRequisitionCreateManyTenantInput = {
    id?: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: string | null;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PurchaseRequisitionUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workflowDef?: Prisma.WorkflowDefinitionUpdateOneWithoutPurchaseRequisitionsNestedInput;
    items?: Prisma.PurchaseRequisitionItemUpdateManyWithoutRequisitionNestedInput;
};
export type PurchaseRequisitionUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.PurchaseRequisitionItemUncheckedUpdateManyWithoutRequisitionNestedInput;
};
export type PurchaseRequisitionUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    workflowDefinitionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseRequisitionCreateManyWorkflowDefInput = {
    id?: string;
    tenantId: string;
    code: string;
    requestDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    notes?: string | null;
    department?: string | null;
    costCenterId?: string | null;
    estimatedTotal?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PurchaseRequisitionUpdateWithoutWorkflowDefInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPurchaseRequisitionsNestedInput;
    items?: Prisma.PurchaseRequisitionItemUpdateManyWithoutRequisitionNestedInput;
};
export type PurchaseRequisitionUncheckedUpdateWithoutWorkflowDefInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.PurchaseRequisitionItemUncheckedUpdateManyWithoutRequisitionNestedInput;
};
export type PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentStepNo?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PurchaseRequisitionCountOutputType = {
    items: number;
};
export type PurchaseRequisitionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | PurchaseRequisitionCountOutputTypeCountItemsArgs;
};
export type PurchaseRequisitionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionCountOutputTypeSelect<ExtArgs> | null;
};
export type PurchaseRequisitionCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionItemWhereInput;
};
export type PurchaseRequisitionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    requestDate?: boolean;
    status?: boolean;
    notes?: boolean;
    department?: boolean;
    costCenterId?: boolean;
    estimatedTotal?: boolean;
    workflowDefinitionId?: boolean;
    currentStepNo?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workflowDef?: boolean | Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs>;
    items?: boolean | Prisma.PurchaseRequisition$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.PurchaseRequisitionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseRequisition"]>;
export type PurchaseRequisitionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    requestDate?: boolean;
    status?: boolean;
    notes?: boolean;
    department?: boolean;
    costCenterId?: boolean;
    estimatedTotal?: boolean;
    workflowDefinitionId?: boolean;
    currentStepNo?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workflowDef?: boolean | Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseRequisition"]>;
export type PurchaseRequisitionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    requestDate?: boolean;
    status?: boolean;
    notes?: boolean;
    department?: boolean;
    costCenterId?: boolean;
    estimatedTotal?: boolean;
    workflowDefinitionId?: boolean;
    currentStepNo?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workflowDef?: boolean | Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs>;
}, ExtArgs["result"]["purchaseRequisition"]>;
export type PurchaseRequisitionSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    requestDate?: boolean;
    status?: boolean;
    notes?: boolean;
    department?: boolean;
    costCenterId?: boolean;
    estimatedTotal?: boolean;
    workflowDefinitionId?: boolean;
    currentStepNo?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PurchaseRequisitionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "code" | "requestDate" | "status" | "notes" | "department" | "costCenterId" | "estimatedTotal" | "workflowDefinitionId" | "currentStepNo" | "createdAt" | "updatedAt", ExtArgs["result"]["purchaseRequisition"]>;
export type PurchaseRequisitionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workflowDef?: boolean | Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs>;
    items?: boolean | Prisma.PurchaseRequisition$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.PurchaseRequisitionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PurchaseRequisitionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workflowDef?: boolean | Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs>;
};
export type PurchaseRequisitionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    workflowDef?: boolean | Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs>;
};
export type $PurchaseRequisitionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PurchaseRequisition";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        workflowDef: Prisma.$WorkflowDefinitionPayload<ExtArgs> | null;
        items: Prisma.$PurchaseRequisitionItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        code: string;
        requestDate: Date;
        status: $Enums.ProcurementDocStatus;
        notes: string | null;
        department: string | null;
        costCenterId: string | null;
        estimatedTotal: runtime.Decimal;
        workflowDefinitionId: string | null;
        currentStepNo: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["purchaseRequisition"]>;
    composites: {};
};
export type PurchaseRequisitionGetPayload<S extends boolean | null | undefined | PurchaseRequisitionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload, S>;
export type PurchaseRequisitionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PurchaseRequisitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PurchaseRequisitionCountAggregateInputType | true;
};
export interface PurchaseRequisitionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PurchaseRequisition'];
        meta: {
            name: 'PurchaseRequisition';
        };
    };
    findUnique<T extends PurchaseRequisitionFindUniqueArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PurchaseRequisitionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PurchaseRequisitionFindFirstArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PurchaseRequisitionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PurchaseRequisitionFindManyArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PurchaseRequisitionCreateArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionCreateArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PurchaseRequisitionCreateManyArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PurchaseRequisitionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PurchaseRequisitionDeleteArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionDeleteArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PurchaseRequisitionUpdateArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionUpdateArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PurchaseRequisitionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PurchaseRequisitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PurchaseRequisitionUpdateManyArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PurchaseRequisitionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PurchaseRequisitionUpsertArgs>(args: Prisma.SelectSubset<T, PurchaseRequisitionUpsertArgs<ExtArgs>>): Prisma.Prisma__PurchaseRequisitionClient<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PurchaseRequisitionCountArgs>(args?: Prisma.Subset<T, PurchaseRequisitionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PurchaseRequisitionCountAggregateOutputType> : number>;
    aggregate<T extends PurchaseRequisitionAggregateArgs>(args: Prisma.Subset<T, PurchaseRequisitionAggregateArgs>): Prisma.PrismaPromise<GetPurchaseRequisitionAggregateType<T>>;
    groupBy<T extends PurchaseRequisitionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PurchaseRequisitionGroupByArgs['orderBy'];
    } : {
        orderBy?: PurchaseRequisitionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PurchaseRequisitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseRequisitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PurchaseRequisitionFieldRefs;
}
export interface Prisma__PurchaseRequisitionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    workflowDef<T extends Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseRequisition$workflowDefArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.PurchaseRequisition$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseRequisition$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PurchaseRequisitionFieldRefs {
    readonly id: Prisma.FieldRef<"PurchaseRequisition", 'String'>;
    readonly tenantId: Prisma.FieldRef<"PurchaseRequisition", 'String'>;
    readonly code: Prisma.FieldRef<"PurchaseRequisition", 'String'>;
    readonly requestDate: Prisma.FieldRef<"PurchaseRequisition", 'DateTime'>;
    readonly status: Prisma.FieldRef<"PurchaseRequisition", 'ProcurementDocStatus'>;
    readonly notes: Prisma.FieldRef<"PurchaseRequisition", 'String'>;
    readonly department: Prisma.FieldRef<"PurchaseRequisition", 'String'>;
    readonly costCenterId: Prisma.FieldRef<"PurchaseRequisition", 'String'>;
    readonly estimatedTotal: Prisma.FieldRef<"PurchaseRequisition", 'Decimal'>;
    readonly workflowDefinitionId: Prisma.FieldRef<"PurchaseRequisition", 'String'>;
    readonly currentStepNo: Prisma.FieldRef<"PurchaseRequisition", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"PurchaseRequisition", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PurchaseRequisition", 'DateTime'>;
}
export type PurchaseRequisitionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
};
export type PurchaseRequisitionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
};
export type PurchaseRequisitionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where?: Prisma.PurchaseRequisitionWhereInput;
    orderBy?: Prisma.PurchaseRequisitionOrderByWithRelationInput | Prisma.PurchaseRequisitionOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseRequisitionScalarFieldEnum | Prisma.PurchaseRequisitionScalarFieldEnum[];
};
export type PurchaseRequisitionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where?: Prisma.PurchaseRequisitionWhereInput;
    orderBy?: Prisma.PurchaseRequisitionOrderByWithRelationInput | Prisma.PurchaseRequisitionOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseRequisitionScalarFieldEnum | Prisma.PurchaseRequisitionScalarFieldEnum[];
};
export type PurchaseRequisitionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where?: Prisma.PurchaseRequisitionWhereInput;
    orderBy?: Prisma.PurchaseRequisitionOrderByWithRelationInput | Prisma.PurchaseRequisitionOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseRequisitionScalarFieldEnum | Prisma.PurchaseRequisitionScalarFieldEnum[];
};
export type PurchaseRequisitionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseRequisitionCreateInput, Prisma.PurchaseRequisitionUncheckedCreateInput>;
};
export type PurchaseRequisitionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PurchaseRequisitionCreateManyInput | Prisma.PurchaseRequisitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PurchaseRequisitionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    data: Prisma.PurchaseRequisitionCreateManyInput | Prisma.PurchaseRequisitionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PurchaseRequisitionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PurchaseRequisitionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateInput, Prisma.PurchaseRequisitionUncheckedUpdateInput>;
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
};
export type PurchaseRequisitionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateManyMutationInput, Prisma.PurchaseRequisitionUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseRequisitionWhereInput;
    limit?: number;
};
export type PurchaseRequisitionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PurchaseRequisitionUpdateManyMutationInput, Prisma.PurchaseRequisitionUncheckedUpdateManyInput>;
    where?: Prisma.PurchaseRequisitionWhereInput;
    limit?: number;
    include?: Prisma.PurchaseRequisitionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PurchaseRequisitionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PurchaseRequisitionCreateInput, Prisma.PurchaseRequisitionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PurchaseRequisitionUpdateInput, Prisma.PurchaseRequisitionUncheckedUpdateInput>;
};
export type PurchaseRequisitionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where: Prisma.PurchaseRequisitionWhereUniqueInput;
};
export type PurchaseRequisitionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionWhereInput;
    limit?: number;
};
export type PurchaseRequisition$workflowDefArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type PurchaseRequisition$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PurchaseRequisitionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
};
