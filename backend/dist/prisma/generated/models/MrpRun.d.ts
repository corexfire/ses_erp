import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type MrpRunModel = runtime.Types.Result.DefaultSelection<Prisma.$MrpRunPayload>;
export type AggregateMrpRun = {
    _count: MrpRunCountAggregateOutputType | null;
    _min: MrpRunMinAggregateOutputType | null;
    _max: MrpRunMaxAggregateOutputType | null;
};
export type MrpRunMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    runDate: Date | null;
    status: string | null;
    demandSource: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type MrpRunMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    runDate: Date | null;
    status: string | null;
    demandSource: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type MrpRunCountAggregateOutputType = {
    id: number;
    tenantId: number;
    runDate: number;
    status: number;
    demandSource: number;
    notes: number;
    createdAt: number;
    _all: number;
};
export type MrpRunMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    runDate?: true;
    status?: true;
    demandSource?: true;
    notes?: true;
    createdAt?: true;
};
export type MrpRunMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    runDate?: true;
    status?: true;
    demandSource?: true;
    notes?: true;
    createdAt?: true;
};
export type MrpRunCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    runDate?: true;
    status?: true;
    demandSource?: true;
    notes?: true;
    createdAt?: true;
    _all?: true;
};
export type MrpRunAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MrpRunWhereInput;
    orderBy?: Prisma.MrpRunOrderByWithRelationInput | Prisma.MrpRunOrderByWithRelationInput[];
    cursor?: Prisma.MrpRunWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MrpRunCountAggregateInputType;
    _min?: MrpRunMinAggregateInputType;
    _max?: MrpRunMaxAggregateInputType;
};
export type GetMrpRunAggregateType<T extends MrpRunAggregateArgs> = {
    [P in keyof T & keyof AggregateMrpRun]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMrpRun[P]> : Prisma.GetScalarType<T[P], AggregateMrpRun[P]>;
};
export type MrpRunGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MrpRunWhereInput;
    orderBy?: Prisma.MrpRunOrderByWithAggregationInput | Prisma.MrpRunOrderByWithAggregationInput[];
    by: Prisma.MrpRunScalarFieldEnum[] | Prisma.MrpRunScalarFieldEnum;
    having?: Prisma.MrpRunScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MrpRunCountAggregateInputType | true;
    _min?: MrpRunMinAggregateInputType;
    _max?: MrpRunMaxAggregateInputType;
};
export type MrpRunGroupByOutputType = {
    id: string;
    tenantId: string;
    runDate: Date;
    status: string;
    demandSource: string | null;
    notes: string | null;
    createdAt: Date;
    _count: MrpRunCountAggregateOutputType | null;
    _min: MrpRunMinAggregateOutputType | null;
    _max: MrpRunMaxAggregateOutputType | null;
};
export type GetMrpRunGroupByPayload<T extends MrpRunGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MrpRunGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MrpRunGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MrpRunGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MrpRunGroupByOutputType[P]>;
}>>;
export type MrpRunWhereInput = {
    AND?: Prisma.MrpRunWhereInput | Prisma.MrpRunWhereInput[];
    OR?: Prisma.MrpRunWhereInput[];
    NOT?: Prisma.MrpRunWhereInput | Prisma.MrpRunWhereInput[];
    id?: Prisma.StringFilter<"MrpRun"> | string;
    tenantId?: Prisma.StringFilter<"MrpRun"> | string;
    runDate?: Prisma.DateTimeFilter<"MrpRun"> | Date | string;
    status?: Prisma.StringFilter<"MrpRun"> | string;
    demandSource?: Prisma.StringNullableFilter<"MrpRun"> | string | null;
    notes?: Prisma.StringNullableFilter<"MrpRun"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MrpRun"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    suggestions?: Prisma.MrpSuggestionListRelationFilter;
};
export type MrpRunOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    demandSource?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    suggestions?: Prisma.MrpSuggestionOrderByRelationAggregateInput;
};
export type MrpRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MrpRunWhereInput | Prisma.MrpRunWhereInput[];
    OR?: Prisma.MrpRunWhereInput[];
    NOT?: Prisma.MrpRunWhereInput | Prisma.MrpRunWhereInput[];
    tenantId?: Prisma.StringFilter<"MrpRun"> | string;
    runDate?: Prisma.DateTimeFilter<"MrpRun"> | Date | string;
    status?: Prisma.StringFilter<"MrpRun"> | string;
    demandSource?: Prisma.StringNullableFilter<"MrpRun"> | string | null;
    notes?: Prisma.StringNullableFilter<"MrpRun"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MrpRun"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    suggestions?: Prisma.MrpSuggestionListRelationFilter;
}, "id">;
export type MrpRunOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    demandSource?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.MrpRunCountOrderByAggregateInput;
    _max?: Prisma.MrpRunMaxOrderByAggregateInput;
    _min?: Prisma.MrpRunMinOrderByAggregateInput;
};
export type MrpRunScalarWhereWithAggregatesInput = {
    AND?: Prisma.MrpRunScalarWhereWithAggregatesInput | Prisma.MrpRunScalarWhereWithAggregatesInput[];
    OR?: Prisma.MrpRunScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MrpRunScalarWhereWithAggregatesInput | Prisma.MrpRunScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MrpRun"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"MrpRun"> | string;
    runDate?: Prisma.DateTimeWithAggregatesFilter<"MrpRun"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"MrpRun"> | string;
    demandSource?: Prisma.StringNullableWithAggregatesFilter<"MrpRun"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"MrpRun"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MrpRun"> | Date | string;
};
export type MrpRunCreateInput = {
    id?: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMrpRunsInput;
    suggestions?: Prisma.MrpSuggestionCreateNestedManyWithoutMrpRunInput;
};
export type MrpRunUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    suggestions?: Prisma.MrpSuggestionUncheckedCreateNestedManyWithoutMrpRunInput;
};
export type MrpRunUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMrpRunsNestedInput;
    suggestions?: Prisma.MrpSuggestionUpdateManyWithoutMrpRunNestedInput;
};
export type MrpRunUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    suggestions?: Prisma.MrpSuggestionUncheckedUpdateManyWithoutMrpRunNestedInput;
};
export type MrpRunCreateManyInput = {
    id?: string;
    tenantId: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type MrpRunUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MrpRunUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MrpRunListRelationFilter = {
    every?: Prisma.MrpRunWhereInput;
    some?: Prisma.MrpRunWhereInput;
    none?: Prisma.MrpRunWhereInput;
};
export type MrpRunOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MrpRunCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    demandSource?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MrpRunMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    demandSource?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MrpRunMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    demandSource?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type MrpRunScalarRelationFilter = {
    is?: Prisma.MrpRunWhereInput;
    isNot?: Prisma.MrpRunWhereInput;
};
export type MrpRunCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.MrpRunCreateWithoutTenantInput, Prisma.MrpRunUncheckedCreateWithoutTenantInput> | Prisma.MrpRunCreateWithoutTenantInput[] | Prisma.MrpRunUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.MrpRunCreateOrConnectWithoutTenantInput | Prisma.MrpRunCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.MrpRunCreateManyTenantInputEnvelope;
    connect?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
};
export type MrpRunUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.MrpRunCreateWithoutTenantInput, Prisma.MrpRunUncheckedCreateWithoutTenantInput> | Prisma.MrpRunCreateWithoutTenantInput[] | Prisma.MrpRunUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.MrpRunCreateOrConnectWithoutTenantInput | Prisma.MrpRunCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.MrpRunCreateManyTenantInputEnvelope;
    connect?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
};
export type MrpRunUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.MrpRunCreateWithoutTenantInput, Prisma.MrpRunUncheckedCreateWithoutTenantInput> | Prisma.MrpRunCreateWithoutTenantInput[] | Prisma.MrpRunUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.MrpRunCreateOrConnectWithoutTenantInput | Prisma.MrpRunCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.MrpRunUpsertWithWhereUniqueWithoutTenantInput | Prisma.MrpRunUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.MrpRunCreateManyTenantInputEnvelope;
    set?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    disconnect?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    delete?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    connect?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    update?: Prisma.MrpRunUpdateWithWhereUniqueWithoutTenantInput | Prisma.MrpRunUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.MrpRunUpdateManyWithWhereWithoutTenantInput | Prisma.MrpRunUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.MrpRunScalarWhereInput | Prisma.MrpRunScalarWhereInput[];
};
export type MrpRunUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.MrpRunCreateWithoutTenantInput, Prisma.MrpRunUncheckedCreateWithoutTenantInput> | Prisma.MrpRunCreateWithoutTenantInput[] | Prisma.MrpRunUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.MrpRunCreateOrConnectWithoutTenantInput | Prisma.MrpRunCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.MrpRunUpsertWithWhereUniqueWithoutTenantInput | Prisma.MrpRunUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.MrpRunCreateManyTenantInputEnvelope;
    set?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    disconnect?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    delete?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    connect?: Prisma.MrpRunWhereUniqueInput | Prisma.MrpRunWhereUniqueInput[];
    update?: Prisma.MrpRunUpdateWithWhereUniqueWithoutTenantInput | Prisma.MrpRunUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.MrpRunUpdateManyWithWhereWithoutTenantInput | Prisma.MrpRunUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.MrpRunScalarWhereInput | Prisma.MrpRunScalarWhereInput[];
};
export type MrpRunCreateNestedOneWithoutSuggestionsInput = {
    create?: Prisma.XOR<Prisma.MrpRunCreateWithoutSuggestionsInput, Prisma.MrpRunUncheckedCreateWithoutSuggestionsInput>;
    connectOrCreate?: Prisma.MrpRunCreateOrConnectWithoutSuggestionsInput;
    connect?: Prisma.MrpRunWhereUniqueInput;
};
export type MrpRunUpdateOneRequiredWithoutSuggestionsNestedInput = {
    create?: Prisma.XOR<Prisma.MrpRunCreateWithoutSuggestionsInput, Prisma.MrpRunUncheckedCreateWithoutSuggestionsInput>;
    connectOrCreate?: Prisma.MrpRunCreateOrConnectWithoutSuggestionsInput;
    upsert?: Prisma.MrpRunUpsertWithoutSuggestionsInput;
    connect?: Prisma.MrpRunWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MrpRunUpdateToOneWithWhereWithoutSuggestionsInput, Prisma.MrpRunUpdateWithoutSuggestionsInput>, Prisma.MrpRunUncheckedUpdateWithoutSuggestionsInput>;
};
export type MrpRunCreateWithoutTenantInput = {
    id?: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    suggestions?: Prisma.MrpSuggestionCreateNestedManyWithoutMrpRunInput;
};
export type MrpRunUncheckedCreateWithoutTenantInput = {
    id?: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    suggestions?: Prisma.MrpSuggestionUncheckedCreateNestedManyWithoutMrpRunInput;
};
export type MrpRunCreateOrConnectWithoutTenantInput = {
    where: Prisma.MrpRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.MrpRunCreateWithoutTenantInput, Prisma.MrpRunUncheckedCreateWithoutTenantInput>;
};
export type MrpRunCreateManyTenantInputEnvelope = {
    data: Prisma.MrpRunCreateManyTenantInput | Prisma.MrpRunCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type MrpRunUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.MrpRunWhereUniqueInput;
    update: Prisma.XOR<Prisma.MrpRunUpdateWithoutTenantInput, Prisma.MrpRunUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.MrpRunCreateWithoutTenantInput, Prisma.MrpRunUncheckedCreateWithoutTenantInput>;
};
export type MrpRunUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.MrpRunWhereUniqueInput;
    data: Prisma.XOR<Prisma.MrpRunUpdateWithoutTenantInput, Prisma.MrpRunUncheckedUpdateWithoutTenantInput>;
};
export type MrpRunUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.MrpRunScalarWhereInput;
    data: Prisma.XOR<Prisma.MrpRunUpdateManyMutationInput, Prisma.MrpRunUncheckedUpdateManyWithoutTenantInput>;
};
export type MrpRunScalarWhereInput = {
    AND?: Prisma.MrpRunScalarWhereInput | Prisma.MrpRunScalarWhereInput[];
    OR?: Prisma.MrpRunScalarWhereInput[];
    NOT?: Prisma.MrpRunScalarWhereInput | Prisma.MrpRunScalarWhereInput[];
    id?: Prisma.StringFilter<"MrpRun"> | string;
    tenantId?: Prisma.StringFilter<"MrpRun"> | string;
    runDate?: Prisma.DateTimeFilter<"MrpRun"> | Date | string;
    status?: Prisma.StringFilter<"MrpRun"> | string;
    demandSource?: Prisma.StringNullableFilter<"MrpRun"> | string | null;
    notes?: Prisma.StringNullableFilter<"MrpRun"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MrpRun"> | Date | string;
};
export type MrpRunCreateWithoutSuggestionsInput = {
    id?: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutMrpRunsInput;
};
export type MrpRunUncheckedCreateWithoutSuggestionsInput = {
    id?: string;
    tenantId: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type MrpRunCreateOrConnectWithoutSuggestionsInput = {
    where: Prisma.MrpRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.MrpRunCreateWithoutSuggestionsInput, Prisma.MrpRunUncheckedCreateWithoutSuggestionsInput>;
};
export type MrpRunUpsertWithoutSuggestionsInput = {
    update: Prisma.XOR<Prisma.MrpRunUpdateWithoutSuggestionsInput, Prisma.MrpRunUncheckedUpdateWithoutSuggestionsInput>;
    create: Prisma.XOR<Prisma.MrpRunCreateWithoutSuggestionsInput, Prisma.MrpRunUncheckedCreateWithoutSuggestionsInput>;
    where?: Prisma.MrpRunWhereInput;
};
export type MrpRunUpdateToOneWithWhereWithoutSuggestionsInput = {
    where?: Prisma.MrpRunWhereInput;
    data: Prisma.XOR<Prisma.MrpRunUpdateWithoutSuggestionsInput, Prisma.MrpRunUncheckedUpdateWithoutSuggestionsInput>;
};
export type MrpRunUpdateWithoutSuggestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutMrpRunsNestedInput;
};
export type MrpRunUncheckedUpdateWithoutSuggestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MrpRunCreateManyTenantInput = {
    id?: string;
    runDate: Date | string;
    status?: string;
    demandSource?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type MrpRunUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    suggestions?: Prisma.MrpSuggestionUpdateManyWithoutMrpRunNestedInput;
};
export type MrpRunUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    suggestions?: Prisma.MrpSuggestionUncheckedUpdateManyWithoutMrpRunNestedInput;
};
export type MrpRunUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    demandSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MrpRunCountOutputType = {
    suggestions: number;
};
export type MrpRunCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    suggestions?: boolean | MrpRunCountOutputTypeCountSuggestionsArgs;
};
export type MrpRunCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunCountOutputTypeSelect<ExtArgs> | null;
};
export type MrpRunCountOutputTypeCountSuggestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MrpSuggestionWhereInput;
};
export type MrpRunSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    runDate?: boolean;
    status?: boolean;
    demandSource?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    suggestions?: boolean | Prisma.MrpRun$suggestionsArgs<ExtArgs>;
    _count?: boolean | Prisma.MrpRunCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mrpRun"]>;
export type MrpRunSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    runDate?: boolean;
    status?: boolean;
    demandSource?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mrpRun"]>;
export type MrpRunSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    runDate?: boolean;
    status?: boolean;
    demandSource?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mrpRun"]>;
export type MrpRunSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    runDate?: boolean;
    status?: boolean;
    demandSource?: boolean;
    notes?: boolean;
    createdAt?: boolean;
};
export type MrpRunOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "runDate" | "status" | "demandSource" | "notes" | "createdAt", ExtArgs["result"]["mrpRun"]>;
export type MrpRunInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    suggestions?: boolean | Prisma.MrpRun$suggestionsArgs<ExtArgs>;
    _count?: boolean | Prisma.MrpRunCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MrpRunIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type MrpRunIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $MrpRunPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MrpRun";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        suggestions: Prisma.$MrpSuggestionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        runDate: Date;
        status: string;
        demandSource: string | null;
        notes: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["mrpRun"]>;
    composites: {};
};
export type MrpRunGetPayload<S extends boolean | null | undefined | MrpRunDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MrpRunPayload, S>;
export type MrpRunCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MrpRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MrpRunCountAggregateInputType | true;
};
export interface MrpRunDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MrpRun'];
        meta: {
            name: 'MrpRun';
        };
    };
    findUnique<T extends MrpRunFindUniqueArgs>(args: Prisma.SelectSubset<T, MrpRunFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MrpRunFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MrpRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MrpRunFindFirstArgs>(args?: Prisma.SelectSubset<T, MrpRunFindFirstArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MrpRunFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MrpRunFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MrpRunFindManyArgs>(args?: Prisma.SelectSubset<T, MrpRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MrpRunCreateArgs>(args: Prisma.SelectSubset<T, MrpRunCreateArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MrpRunCreateManyArgs>(args?: Prisma.SelectSubset<T, MrpRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MrpRunCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MrpRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MrpRunDeleteArgs>(args: Prisma.SelectSubset<T, MrpRunDeleteArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MrpRunUpdateArgs>(args: Prisma.SelectSubset<T, MrpRunUpdateArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MrpRunDeleteManyArgs>(args?: Prisma.SelectSubset<T, MrpRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MrpRunUpdateManyArgs>(args: Prisma.SelectSubset<T, MrpRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MrpRunUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MrpRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MrpRunUpsertArgs>(args: Prisma.SelectSubset<T, MrpRunUpsertArgs<ExtArgs>>): Prisma.Prisma__MrpRunClient<runtime.Types.Result.GetResult<Prisma.$MrpRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MrpRunCountArgs>(args?: Prisma.Subset<T, MrpRunCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MrpRunCountAggregateOutputType> : number>;
    aggregate<T extends MrpRunAggregateArgs>(args: Prisma.Subset<T, MrpRunAggregateArgs>): Prisma.PrismaPromise<GetMrpRunAggregateType<T>>;
    groupBy<T extends MrpRunGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MrpRunGroupByArgs['orderBy'];
    } : {
        orderBy?: MrpRunGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MrpRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMrpRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MrpRunFieldRefs;
}
export interface Prisma__MrpRunClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    suggestions<T extends Prisma.MrpRun$suggestionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MrpRun$suggestionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MrpSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MrpRunFieldRefs {
    readonly id: Prisma.FieldRef<"MrpRun", 'String'>;
    readonly tenantId: Prisma.FieldRef<"MrpRun", 'String'>;
    readonly runDate: Prisma.FieldRef<"MrpRun", 'DateTime'>;
    readonly status: Prisma.FieldRef<"MrpRun", 'String'>;
    readonly demandSource: Prisma.FieldRef<"MrpRun", 'String'>;
    readonly notes: Prisma.FieldRef<"MrpRun", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MrpRun", 'DateTime'>;
}
export type MrpRunFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    where: Prisma.MrpRunWhereUniqueInput;
};
export type MrpRunFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    where: Prisma.MrpRunWhereUniqueInput;
};
export type MrpRunFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    where?: Prisma.MrpRunWhereInput;
    orderBy?: Prisma.MrpRunOrderByWithRelationInput | Prisma.MrpRunOrderByWithRelationInput[];
    cursor?: Prisma.MrpRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MrpRunScalarFieldEnum | Prisma.MrpRunScalarFieldEnum[];
};
export type MrpRunFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    where?: Prisma.MrpRunWhereInput;
    orderBy?: Prisma.MrpRunOrderByWithRelationInput | Prisma.MrpRunOrderByWithRelationInput[];
    cursor?: Prisma.MrpRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MrpRunScalarFieldEnum | Prisma.MrpRunScalarFieldEnum[];
};
export type MrpRunFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    where?: Prisma.MrpRunWhereInput;
    orderBy?: Prisma.MrpRunOrderByWithRelationInput | Prisma.MrpRunOrderByWithRelationInput[];
    cursor?: Prisma.MrpRunWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MrpRunScalarFieldEnum | Prisma.MrpRunScalarFieldEnum[];
};
export type MrpRunCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MrpRunCreateInput, Prisma.MrpRunUncheckedCreateInput>;
};
export type MrpRunCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MrpRunCreateManyInput | Prisma.MrpRunCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MrpRunCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    data: Prisma.MrpRunCreateManyInput | Prisma.MrpRunCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MrpRunIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MrpRunUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MrpRunUpdateInput, Prisma.MrpRunUncheckedUpdateInput>;
    where: Prisma.MrpRunWhereUniqueInput;
};
export type MrpRunUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MrpRunUpdateManyMutationInput, Prisma.MrpRunUncheckedUpdateManyInput>;
    where?: Prisma.MrpRunWhereInput;
    limit?: number;
};
export type MrpRunUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MrpRunUpdateManyMutationInput, Prisma.MrpRunUncheckedUpdateManyInput>;
    where?: Prisma.MrpRunWhereInput;
    limit?: number;
    include?: Prisma.MrpRunIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MrpRunUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    where: Prisma.MrpRunWhereUniqueInput;
    create: Prisma.XOR<Prisma.MrpRunCreateInput, Prisma.MrpRunUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MrpRunUpdateInput, Prisma.MrpRunUncheckedUpdateInput>;
};
export type MrpRunDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
    where: Prisma.MrpRunWhereUniqueInput;
};
export type MrpRunDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MrpRunWhereInput;
    limit?: number;
};
export type MrpRun$suggestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.MrpSuggestionOmit<ExtArgs> | null;
    include?: Prisma.MrpSuggestionInclude<ExtArgs> | null;
    where?: Prisma.MrpSuggestionWhereInput;
    orderBy?: Prisma.MrpSuggestionOrderByWithRelationInput | Prisma.MrpSuggestionOrderByWithRelationInput[];
    cursor?: Prisma.MrpSuggestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MrpSuggestionScalarFieldEnum | Prisma.MrpSuggestionScalarFieldEnum[];
};
export type MrpRunDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MrpRunSelect<ExtArgs> | null;
    omit?: Prisma.MrpRunOmit<ExtArgs> | null;
    include?: Prisma.MrpRunInclude<ExtArgs> | null;
};
