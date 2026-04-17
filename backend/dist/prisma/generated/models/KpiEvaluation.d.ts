import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type KpiEvaluationModel = runtime.Types.Result.DefaultSelection<Prisma.$KpiEvaluationPayload>;
export type AggregateKpiEvaluation = {
    _count: KpiEvaluationCountAggregateOutputType | null;
    _avg: KpiEvaluationAvgAggregateOutputType | null;
    _sum: KpiEvaluationSumAggregateOutputType | null;
    _min: KpiEvaluationMinAggregateOutputType | null;
    _max: KpiEvaluationMaxAggregateOutputType | null;
};
export type KpiEvaluationAvgAggregateOutputType = {
    score: runtime.Decimal | null;
};
export type KpiEvaluationSumAggregateOutputType = {
    score: runtime.Decimal | null;
};
export type KpiEvaluationMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    employeeId: string | null;
    period: string | null;
    score: runtime.Decimal | null;
    grade: string | null;
    comments: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type KpiEvaluationMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    employeeId: string | null;
    period: string | null;
    score: runtime.Decimal | null;
    grade: string | null;
    comments: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type KpiEvaluationCountAggregateOutputType = {
    id: number;
    tenantId: number;
    employeeId: number;
    period: number;
    score: number;
    grade: number;
    comments: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type KpiEvaluationAvgAggregateInputType = {
    score?: true;
};
export type KpiEvaluationSumAggregateInputType = {
    score?: true;
};
export type KpiEvaluationMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    employeeId?: true;
    period?: true;
    score?: true;
    grade?: true;
    comments?: true;
    status?: true;
    createdAt?: true;
};
export type KpiEvaluationMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    employeeId?: true;
    period?: true;
    score?: true;
    grade?: true;
    comments?: true;
    status?: true;
    createdAt?: true;
};
export type KpiEvaluationCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    employeeId?: true;
    period?: true;
    score?: true;
    grade?: true;
    comments?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type KpiEvaluationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KpiEvaluationWhereInput;
    orderBy?: Prisma.KpiEvaluationOrderByWithRelationInput | Prisma.KpiEvaluationOrderByWithRelationInput[];
    cursor?: Prisma.KpiEvaluationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | KpiEvaluationCountAggregateInputType;
    _avg?: KpiEvaluationAvgAggregateInputType;
    _sum?: KpiEvaluationSumAggregateInputType;
    _min?: KpiEvaluationMinAggregateInputType;
    _max?: KpiEvaluationMaxAggregateInputType;
};
export type GetKpiEvaluationAggregateType<T extends KpiEvaluationAggregateArgs> = {
    [P in keyof T & keyof AggregateKpiEvaluation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKpiEvaluation[P]> : Prisma.GetScalarType<T[P], AggregateKpiEvaluation[P]>;
};
export type KpiEvaluationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KpiEvaluationWhereInput;
    orderBy?: Prisma.KpiEvaluationOrderByWithAggregationInput | Prisma.KpiEvaluationOrderByWithAggregationInput[];
    by: Prisma.KpiEvaluationScalarFieldEnum[] | Prisma.KpiEvaluationScalarFieldEnum;
    having?: Prisma.KpiEvaluationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KpiEvaluationCountAggregateInputType | true;
    _avg?: KpiEvaluationAvgAggregateInputType;
    _sum?: KpiEvaluationSumAggregateInputType;
    _min?: KpiEvaluationMinAggregateInputType;
    _max?: KpiEvaluationMaxAggregateInputType;
};
export type KpiEvaluationGroupByOutputType = {
    id: string;
    tenantId: string;
    employeeId: string;
    period: string;
    score: runtime.Decimal;
    grade: string | null;
    comments: string | null;
    status: string;
    createdAt: Date;
    _count: KpiEvaluationCountAggregateOutputType | null;
    _avg: KpiEvaluationAvgAggregateOutputType | null;
    _sum: KpiEvaluationSumAggregateOutputType | null;
    _min: KpiEvaluationMinAggregateOutputType | null;
    _max: KpiEvaluationMaxAggregateOutputType | null;
};
export type GetKpiEvaluationGroupByPayload<T extends KpiEvaluationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KpiEvaluationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KpiEvaluationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KpiEvaluationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KpiEvaluationGroupByOutputType[P]>;
}>>;
export type KpiEvaluationWhereInput = {
    AND?: Prisma.KpiEvaluationWhereInput | Prisma.KpiEvaluationWhereInput[];
    OR?: Prisma.KpiEvaluationWhereInput[];
    NOT?: Prisma.KpiEvaluationWhereInput | Prisma.KpiEvaluationWhereInput[];
    id?: Prisma.StringFilter<"KpiEvaluation"> | string;
    tenantId?: Prisma.StringFilter<"KpiEvaluation"> | string;
    employeeId?: Prisma.StringFilter<"KpiEvaluation"> | string;
    period?: Prisma.StringFilter<"KpiEvaluation"> | string;
    score?: Prisma.DecimalFilter<"KpiEvaluation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.StringNullableFilter<"KpiEvaluation"> | string | null;
    comments?: Prisma.StringNullableFilter<"KpiEvaluation"> | string | null;
    status?: Prisma.StringFilter<"KpiEvaluation"> | string;
    createdAt?: Prisma.DateTimeFilter<"KpiEvaluation"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    employee?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
};
export type KpiEvaluationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    grade?: Prisma.SortOrderInput | Prisma.SortOrder;
    comments?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    employee?: Prisma.EmployeeOrderByWithRelationInput;
};
export type KpiEvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_employeeId_period?: Prisma.KpiEvaluationTenantIdEmployeeIdPeriodCompoundUniqueInput;
    AND?: Prisma.KpiEvaluationWhereInput | Prisma.KpiEvaluationWhereInput[];
    OR?: Prisma.KpiEvaluationWhereInput[];
    NOT?: Prisma.KpiEvaluationWhereInput | Prisma.KpiEvaluationWhereInput[];
    tenantId?: Prisma.StringFilter<"KpiEvaluation"> | string;
    employeeId?: Prisma.StringFilter<"KpiEvaluation"> | string;
    period?: Prisma.StringFilter<"KpiEvaluation"> | string;
    score?: Prisma.DecimalFilter<"KpiEvaluation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.StringNullableFilter<"KpiEvaluation"> | string | null;
    comments?: Prisma.StringNullableFilter<"KpiEvaluation"> | string | null;
    status?: Prisma.StringFilter<"KpiEvaluation"> | string;
    createdAt?: Prisma.DateTimeFilter<"KpiEvaluation"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    employee?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
}, "id" | "tenantId_employeeId_period">;
export type KpiEvaluationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    grade?: Prisma.SortOrderInput | Prisma.SortOrder;
    comments?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.KpiEvaluationCountOrderByAggregateInput;
    _avg?: Prisma.KpiEvaluationAvgOrderByAggregateInput;
    _max?: Prisma.KpiEvaluationMaxOrderByAggregateInput;
    _min?: Prisma.KpiEvaluationMinOrderByAggregateInput;
    _sum?: Prisma.KpiEvaluationSumOrderByAggregateInput;
};
export type KpiEvaluationScalarWhereWithAggregatesInput = {
    AND?: Prisma.KpiEvaluationScalarWhereWithAggregatesInput | Prisma.KpiEvaluationScalarWhereWithAggregatesInput[];
    OR?: Prisma.KpiEvaluationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KpiEvaluationScalarWhereWithAggregatesInput | Prisma.KpiEvaluationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"KpiEvaluation"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"KpiEvaluation"> | string;
    employeeId?: Prisma.StringWithAggregatesFilter<"KpiEvaluation"> | string;
    period?: Prisma.StringWithAggregatesFilter<"KpiEvaluation"> | string;
    score?: Prisma.DecimalWithAggregatesFilter<"KpiEvaluation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.StringNullableWithAggregatesFilter<"KpiEvaluation"> | string | null;
    comments?: Prisma.StringNullableWithAggregatesFilter<"KpiEvaluation"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"KpiEvaluation"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"KpiEvaluation"> | Date | string;
};
export type KpiEvaluationCreateInput = {
    id?: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutKpiEvaluationsInput;
    employee: Prisma.EmployeeCreateNestedOneWithoutKpiEvaluationsInput;
};
export type KpiEvaluationUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    employeeId: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type KpiEvaluationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutKpiEvaluationsNestedInput;
    employee?: Prisma.EmployeeUpdateOneRequiredWithoutKpiEvaluationsNestedInput;
};
export type KpiEvaluationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KpiEvaluationCreateManyInput = {
    id?: string;
    tenantId: string;
    employeeId: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type KpiEvaluationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KpiEvaluationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KpiEvaluationListRelationFilter = {
    every?: Prisma.KpiEvaluationWhereInput;
    some?: Prisma.KpiEvaluationWhereInput;
    none?: Prisma.KpiEvaluationWhereInput;
};
export type KpiEvaluationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type KpiEvaluationTenantIdEmployeeIdPeriodCompoundUniqueInput = {
    tenantId: string;
    employeeId: string;
    period: string;
};
export type KpiEvaluationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KpiEvaluationAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type KpiEvaluationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KpiEvaluationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    period?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    comments?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KpiEvaluationSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type KpiEvaluationCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutTenantInput, Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput> | Prisma.KpiEvaluationCreateWithoutTenantInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput | Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.KpiEvaluationCreateManyTenantInputEnvelope;
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
};
export type KpiEvaluationUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutTenantInput, Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput> | Prisma.KpiEvaluationCreateWithoutTenantInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput | Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.KpiEvaluationCreateManyTenantInputEnvelope;
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
};
export type KpiEvaluationUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutTenantInput, Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput> | Prisma.KpiEvaluationCreateWithoutTenantInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput | Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutTenantInput | Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.KpiEvaluationCreateManyTenantInputEnvelope;
    set?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    disconnect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    delete?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    update?: Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutTenantInput | Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.KpiEvaluationUpdateManyWithWhereWithoutTenantInput | Prisma.KpiEvaluationUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.KpiEvaluationScalarWhereInput | Prisma.KpiEvaluationScalarWhereInput[];
};
export type KpiEvaluationUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutTenantInput, Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput> | Prisma.KpiEvaluationCreateWithoutTenantInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput | Prisma.KpiEvaluationCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutTenantInput | Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.KpiEvaluationCreateManyTenantInputEnvelope;
    set?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    disconnect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    delete?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    update?: Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutTenantInput | Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.KpiEvaluationUpdateManyWithWhereWithoutTenantInput | Prisma.KpiEvaluationUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.KpiEvaluationScalarWhereInput | Prisma.KpiEvaluationScalarWhereInput[];
};
export type KpiEvaluationCreateNestedManyWithoutEmployeeInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput> | Prisma.KpiEvaluationCreateWithoutEmployeeInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput | Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput[];
    createMany?: Prisma.KpiEvaluationCreateManyEmployeeInputEnvelope;
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
};
export type KpiEvaluationUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput> | Prisma.KpiEvaluationCreateWithoutEmployeeInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput | Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput[];
    createMany?: Prisma.KpiEvaluationCreateManyEmployeeInputEnvelope;
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
};
export type KpiEvaluationUpdateManyWithoutEmployeeNestedInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput> | Prisma.KpiEvaluationCreateWithoutEmployeeInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput | Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput[];
    upsert?: Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutEmployeeInput | Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutEmployeeInput[];
    createMany?: Prisma.KpiEvaluationCreateManyEmployeeInputEnvelope;
    set?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    disconnect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    delete?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    update?: Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutEmployeeInput | Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutEmployeeInput[];
    updateMany?: Prisma.KpiEvaluationUpdateManyWithWhereWithoutEmployeeInput | Prisma.KpiEvaluationUpdateManyWithWhereWithoutEmployeeInput[];
    deleteMany?: Prisma.KpiEvaluationScalarWhereInput | Prisma.KpiEvaluationScalarWhereInput[];
};
export type KpiEvaluationUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput> | Prisma.KpiEvaluationCreateWithoutEmployeeInput[] | Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput | Prisma.KpiEvaluationCreateOrConnectWithoutEmployeeInput[];
    upsert?: Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutEmployeeInput | Prisma.KpiEvaluationUpsertWithWhereUniqueWithoutEmployeeInput[];
    createMany?: Prisma.KpiEvaluationCreateManyEmployeeInputEnvelope;
    set?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    disconnect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    delete?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    connect?: Prisma.KpiEvaluationWhereUniqueInput | Prisma.KpiEvaluationWhereUniqueInput[];
    update?: Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutEmployeeInput | Prisma.KpiEvaluationUpdateWithWhereUniqueWithoutEmployeeInput[];
    updateMany?: Prisma.KpiEvaluationUpdateManyWithWhereWithoutEmployeeInput | Prisma.KpiEvaluationUpdateManyWithWhereWithoutEmployeeInput[];
    deleteMany?: Prisma.KpiEvaluationScalarWhereInput | Prisma.KpiEvaluationScalarWhereInput[];
};
export type KpiEvaluationCreateWithoutTenantInput = {
    id?: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
    employee: Prisma.EmployeeCreateNestedOneWithoutKpiEvaluationsInput;
};
export type KpiEvaluationUncheckedCreateWithoutTenantInput = {
    id?: string;
    employeeId: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type KpiEvaluationCreateOrConnectWithoutTenantInput = {
    where: Prisma.KpiEvaluationWhereUniqueInput;
    create: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutTenantInput, Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput>;
};
export type KpiEvaluationCreateManyTenantInputEnvelope = {
    data: Prisma.KpiEvaluationCreateManyTenantInput | Prisma.KpiEvaluationCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type KpiEvaluationUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.KpiEvaluationWhereUniqueInput;
    update: Prisma.XOR<Prisma.KpiEvaluationUpdateWithoutTenantInput, Prisma.KpiEvaluationUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutTenantInput, Prisma.KpiEvaluationUncheckedCreateWithoutTenantInput>;
};
export type KpiEvaluationUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.KpiEvaluationWhereUniqueInput;
    data: Prisma.XOR<Prisma.KpiEvaluationUpdateWithoutTenantInput, Prisma.KpiEvaluationUncheckedUpdateWithoutTenantInput>;
};
export type KpiEvaluationUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.KpiEvaluationScalarWhereInput;
    data: Prisma.XOR<Prisma.KpiEvaluationUpdateManyMutationInput, Prisma.KpiEvaluationUncheckedUpdateManyWithoutTenantInput>;
};
export type KpiEvaluationScalarWhereInput = {
    AND?: Prisma.KpiEvaluationScalarWhereInput | Prisma.KpiEvaluationScalarWhereInput[];
    OR?: Prisma.KpiEvaluationScalarWhereInput[];
    NOT?: Prisma.KpiEvaluationScalarWhereInput | Prisma.KpiEvaluationScalarWhereInput[];
    id?: Prisma.StringFilter<"KpiEvaluation"> | string;
    tenantId?: Prisma.StringFilter<"KpiEvaluation"> | string;
    employeeId?: Prisma.StringFilter<"KpiEvaluation"> | string;
    period?: Prisma.StringFilter<"KpiEvaluation"> | string;
    score?: Prisma.DecimalFilter<"KpiEvaluation"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.StringNullableFilter<"KpiEvaluation"> | string | null;
    comments?: Prisma.StringNullableFilter<"KpiEvaluation"> | string | null;
    status?: Prisma.StringFilter<"KpiEvaluation"> | string;
    createdAt?: Prisma.DateTimeFilter<"KpiEvaluation"> | Date | string;
};
export type KpiEvaluationCreateWithoutEmployeeInput = {
    id?: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutKpiEvaluationsInput;
};
export type KpiEvaluationUncheckedCreateWithoutEmployeeInput = {
    id?: string;
    tenantId: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type KpiEvaluationCreateOrConnectWithoutEmployeeInput = {
    where: Prisma.KpiEvaluationWhereUniqueInput;
    create: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput>;
};
export type KpiEvaluationCreateManyEmployeeInputEnvelope = {
    data: Prisma.KpiEvaluationCreateManyEmployeeInput | Prisma.KpiEvaluationCreateManyEmployeeInput[];
    skipDuplicates?: boolean;
};
export type KpiEvaluationUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: Prisma.KpiEvaluationWhereUniqueInput;
    update: Prisma.XOR<Prisma.KpiEvaluationUpdateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedUpdateWithoutEmployeeInput>;
    create: Prisma.XOR<Prisma.KpiEvaluationCreateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedCreateWithoutEmployeeInput>;
};
export type KpiEvaluationUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: Prisma.KpiEvaluationWhereUniqueInput;
    data: Prisma.XOR<Prisma.KpiEvaluationUpdateWithoutEmployeeInput, Prisma.KpiEvaluationUncheckedUpdateWithoutEmployeeInput>;
};
export type KpiEvaluationUpdateManyWithWhereWithoutEmployeeInput = {
    where: Prisma.KpiEvaluationScalarWhereInput;
    data: Prisma.XOR<Prisma.KpiEvaluationUpdateManyMutationInput, Prisma.KpiEvaluationUncheckedUpdateManyWithoutEmployeeInput>;
};
export type KpiEvaluationCreateManyTenantInput = {
    id?: string;
    employeeId: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type KpiEvaluationUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    employee?: Prisma.EmployeeUpdateOneRequiredWithoutKpiEvaluationsNestedInput;
};
export type KpiEvaluationUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KpiEvaluationUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KpiEvaluationCreateManyEmployeeInput = {
    id?: string;
    tenantId: string;
    period: string;
    score: runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: string | null;
    comments?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type KpiEvaluationUpdateWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutKpiEvaluationsNestedInput;
};
export type KpiEvaluationUncheckedUpdateWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KpiEvaluationUncheckedUpdateManyWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    period?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    comments?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KpiEvaluationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    period?: boolean;
    score?: boolean;
    grade?: boolean;
    comments?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["kpiEvaluation"]>;
export type KpiEvaluationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    period?: boolean;
    score?: boolean;
    grade?: boolean;
    comments?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["kpiEvaluation"]>;
export type KpiEvaluationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    period?: boolean;
    score?: boolean;
    grade?: boolean;
    comments?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["kpiEvaluation"]>;
export type KpiEvaluationSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    period?: boolean;
    score?: boolean;
    grade?: boolean;
    comments?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type KpiEvaluationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "employeeId" | "period" | "score" | "grade" | "comments" | "status" | "createdAt", ExtArgs["result"]["kpiEvaluation"]>;
export type KpiEvaluationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type KpiEvaluationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type KpiEvaluationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $KpiEvaluationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KpiEvaluation";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        employee: Prisma.$EmployeePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        employeeId: string;
        period: string;
        score: runtime.Decimal;
        grade: string | null;
        comments: string | null;
        status: string;
        createdAt: Date;
    }, ExtArgs["result"]["kpiEvaluation"]>;
    composites: {};
};
export type KpiEvaluationGetPayload<S extends boolean | null | undefined | KpiEvaluationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload, S>;
export type KpiEvaluationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KpiEvaluationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KpiEvaluationCountAggregateInputType | true;
};
export interface KpiEvaluationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KpiEvaluation'];
        meta: {
            name: 'KpiEvaluation';
        };
    };
    findUnique<T extends KpiEvaluationFindUniqueArgs>(args: Prisma.SelectSubset<T, KpiEvaluationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends KpiEvaluationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KpiEvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends KpiEvaluationFindFirstArgs>(args?: Prisma.SelectSubset<T, KpiEvaluationFindFirstArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends KpiEvaluationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KpiEvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends KpiEvaluationFindManyArgs>(args?: Prisma.SelectSubset<T, KpiEvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends KpiEvaluationCreateArgs>(args: Prisma.SelectSubset<T, KpiEvaluationCreateArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends KpiEvaluationCreateManyArgs>(args?: Prisma.SelectSubset<T, KpiEvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends KpiEvaluationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, KpiEvaluationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends KpiEvaluationDeleteArgs>(args: Prisma.SelectSubset<T, KpiEvaluationDeleteArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends KpiEvaluationUpdateArgs>(args: Prisma.SelectSubset<T, KpiEvaluationUpdateArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends KpiEvaluationDeleteManyArgs>(args?: Prisma.SelectSubset<T, KpiEvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends KpiEvaluationUpdateManyArgs>(args: Prisma.SelectSubset<T, KpiEvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends KpiEvaluationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, KpiEvaluationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends KpiEvaluationUpsertArgs>(args: Prisma.SelectSubset<T, KpiEvaluationUpsertArgs<ExtArgs>>): Prisma.Prisma__KpiEvaluationClient<runtime.Types.Result.GetResult<Prisma.$KpiEvaluationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends KpiEvaluationCountArgs>(args?: Prisma.Subset<T, KpiEvaluationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KpiEvaluationCountAggregateOutputType> : number>;
    aggregate<T extends KpiEvaluationAggregateArgs>(args: Prisma.Subset<T, KpiEvaluationAggregateArgs>): Prisma.PrismaPromise<GetKpiEvaluationAggregateType<T>>;
    groupBy<T extends KpiEvaluationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KpiEvaluationGroupByArgs['orderBy'];
    } : {
        orderBy?: KpiEvaluationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KpiEvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKpiEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: KpiEvaluationFieldRefs;
}
export interface Prisma__KpiEvaluationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    employee<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface KpiEvaluationFieldRefs {
    readonly id: Prisma.FieldRef<"KpiEvaluation", 'String'>;
    readonly tenantId: Prisma.FieldRef<"KpiEvaluation", 'String'>;
    readonly employeeId: Prisma.FieldRef<"KpiEvaluation", 'String'>;
    readonly period: Prisma.FieldRef<"KpiEvaluation", 'String'>;
    readonly score: Prisma.FieldRef<"KpiEvaluation", 'Decimal'>;
    readonly grade: Prisma.FieldRef<"KpiEvaluation", 'String'>;
    readonly comments: Prisma.FieldRef<"KpiEvaluation", 'String'>;
    readonly status: Prisma.FieldRef<"KpiEvaluation", 'String'>;
    readonly createdAt: Prisma.FieldRef<"KpiEvaluation", 'DateTime'>;
}
export type KpiEvaluationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    where: Prisma.KpiEvaluationWhereUniqueInput;
};
export type KpiEvaluationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    where: Prisma.KpiEvaluationWhereUniqueInput;
};
export type KpiEvaluationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    where?: Prisma.KpiEvaluationWhereInput;
    orderBy?: Prisma.KpiEvaluationOrderByWithRelationInput | Prisma.KpiEvaluationOrderByWithRelationInput[];
    cursor?: Prisma.KpiEvaluationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KpiEvaluationScalarFieldEnum | Prisma.KpiEvaluationScalarFieldEnum[];
};
export type KpiEvaluationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    where?: Prisma.KpiEvaluationWhereInput;
    orderBy?: Prisma.KpiEvaluationOrderByWithRelationInput | Prisma.KpiEvaluationOrderByWithRelationInput[];
    cursor?: Prisma.KpiEvaluationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KpiEvaluationScalarFieldEnum | Prisma.KpiEvaluationScalarFieldEnum[];
};
export type KpiEvaluationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    where?: Prisma.KpiEvaluationWhereInput;
    orderBy?: Prisma.KpiEvaluationOrderByWithRelationInput | Prisma.KpiEvaluationOrderByWithRelationInput[];
    cursor?: Prisma.KpiEvaluationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KpiEvaluationScalarFieldEnum | Prisma.KpiEvaluationScalarFieldEnum[];
};
export type KpiEvaluationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KpiEvaluationCreateInput, Prisma.KpiEvaluationUncheckedCreateInput>;
};
export type KpiEvaluationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.KpiEvaluationCreateManyInput | Prisma.KpiEvaluationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type KpiEvaluationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    data: Prisma.KpiEvaluationCreateManyInput | Prisma.KpiEvaluationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.KpiEvaluationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type KpiEvaluationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KpiEvaluationUpdateInput, Prisma.KpiEvaluationUncheckedUpdateInput>;
    where: Prisma.KpiEvaluationWhereUniqueInput;
};
export type KpiEvaluationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.KpiEvaluationUpdateManyMutationInput, Prisma.KpiEvaluationUncheckedUpdateManyInput>;
    where?: Prisma.KpiEvaluationWhereInput;
    limit?: number;
};
export type KpiEvaluationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KpiEvaluationUpdateManyMutationInput, Prisma.KpiEvaluationUncheckedUpdateManyInput>;
    where?: Prisma.KpiEvaluationWhereInput;
    limit?: number;
    include?: Prisma.KpiEvaluationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type KpiEvaluationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    where: Prisma.KpiEvaluationWhereUniqueInput;
    create: Prisma.XOR<Prisma.KpiEvaluationCreateInput, Prisma.KpiEvaluationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.KpiEvaluationUpdateInput, Prisma.KpiEvaluationUncheckedUpdateInput>;
};
export type KpiEvaluationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
    where: Prisma.KpiEvaluationWhereUniqueInput;
};
export type KpiEvaluationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KpiEvaluationWhereInput;
    limit?: number;
};
export type KpiEvaluationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KpiEvaluationSelect<ExtArgs> | null;
    omit?: Prisma.KpiEvaluationOmit<ExtArgs> | null;
    include?: Prisma.KpiEvaluationInclude<ExtArgs> | null;
};
