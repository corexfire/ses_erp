import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type JournalEntryLineModel = runtime.Types.Result.DefaultSelection<Prisma.$JournalEntryLinePayload>;
export type AggregateJournalEntryLine = {
    _count: JournalEntryLineCountAggregateOutputType | null;
    _avg: JournalEntryLineAvgAggregateOutputType | null;
    _sum: JournalEntryLineSumAggregateOutputType | null;
    _min: JournalEntryLineMinAggregateOutputType | null;
    _max: JournalEntryLineMaxAggregateOutputType | null;
};
export type JournalEntryLineAvgAggregateOutputType = {
    lineNo: number | null;
    debit: runtime.Decimal | null;
    credit: runtime.Decimal | null;
};
export type JournalEntryLineSumAggregateOutputType = {
    lineNo: number | null;
    debit: runtime.Decimal | null;
    credit: runtime.Decimal | null;
};
export type JournalEntryLineMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    journalEntryId: string | null;
    lineNo: number | null;
    accountCode: string | null;
    description: string | null;
    debit: runtime.Decimal | null;
    credit: runtime.Decimal | null;
    referenceType: string | null;
    referenceId: string | null;
    costCenterId: string | null;
    profitCenterId: string | null;
};
export type JournalEntryLineMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    journalEntryId: string | null;
    lineNo: number | null;
    accountCode: string | null;
    description: string | null;
    debit: runtime.Decimal | null;
    credit: runtime.Decimal | null;
    referenceType: string | null;
    referenceId: string | null;
    costCenterId: string | null;
    profitCenterId: string | null;
};
export type JournalEntryLineCountAggregateOutputType = {
    id: number;
    tenantId: number;
    journalEntryId: number;
    lineNo: number;
    accountCode: number;
    description: number;
    debit: number;
    credit: number;
    referenceType: number;
    referenceId: number;
    costCenterId: number;
    profitCenterId: number;
    _all: number;
};
export type JournalEntryLineAvgAggregateInputType = {
    lineNo?: true;
    debit?: true;
    credit?: true;
};
export type JournalEntryLineSumAggregateInputType = {
    lineNo?: true;
    debit?: true;
    credit?: true;
};
export type JournalEntryLineMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    journalEntryId?: true;
    lineNo?: true;
    accountCode?: true;
    description?: true;
    debit?: true;
    credit?: true;
    referenceType?: true;
    referenceId?: true;
    costCenterId?: true;
    profitCenterId?: true;
};
export type JournalEntryLineMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    journalEntryId?: true;
    lineNo?: true;
    accountCode?: true;
    description?: true;
    debit?: true;
    credit?: true;
    referenceType?: true;
    referenceId?: true;
    costCenterId?: true;
    profitCenterId?: true;
};
export type JournalEntryLineCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    journalEntryId?: true;
    lineNo?: true;
    accountCode?: true;
    description?: true;
    debit?: true;
    credit?: true;
    referenceType?: true;
    referenceId?: true;
    costCenterId?: true;
    profitCenterId?: true;
    _all?: true;
};
export type JournalEntryLineAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JournalEntryLineWhereInput;
    orderBy?: Prisma.JournalEntryLineOrderByWithRelationInput | Prisma.JournalEntryLineOrderByWithRelationInput[];
    cursor?: Prisma.JournalEntryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JournalEntryLineCountAggregateInputType;
    _avg?: JournalEntryLineAvgAggregateInputType;
    _sum?: JournalEntryLineSumAggregateInputType;
    _min?: JournalEntryLineMinAggregateInputType;
    _max?: JournalEntryLineMaxAggregateInputType;
};
export type GetJournalEntryLineAggregateType<T extends JournalEntryLineAggregateArgs> = {
    [P in keyof T & keyof AggregateJournalEntryLine]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJournalEntryLine[P]> : Prisma.GetScalarType<T[P], AggregateJournalEntryLine[P]>;
};
export type JournalEntryLineGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JournalEntryLineWhereInput;
    orderBy?: Prisma.JournalEntryLineOrderByWithAggregationInput | Prisma.JournalEntryLineOrderByWithAggregationInput[];
    by: Prisma.JournalEntryLineScalarFieldEnum[] | Prisma.JournalEntryLineScalarFieldEnum;
    having?: Prisma.JournalEntryLineScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JournalEntryLineCountAggregateInputType | true;
    _avg?: JournalEntryLineAvgAggregateInputType;
    _sum?: JournalEntryLineSumAggregateInputType;
    _min?: JournalEntryLineMinAggregateInputType;
    _max?: JournalEntryLineMaxAggregateInputType;
};
export type JournalEntryLineGroupByOutputType = {
    id: string;
    tenantId: string;
    journalEntryId: string;
    lineNo: number;
    accountCode: string;
    description: string | null;
    debit: runtime.Decimal;
    credit: runtime.Decimal;
    referenceType: string | null;
    referenceId: string | null;
    costCenterId: string | null;
    profitCenterId: string | null;
    _count: JournalEntryLineCountAggregateOutputType | null;
    _avg: JournalEntryLineAvgAggregateOutputType | null;
    _sum: JournalEntryLineSumAggregateOutputType | null;
    _min: JournalEntryLineMinAggregateOutputType | null;
    _max: JournalEntryLineMaxAggregateOutputType | null;
};
export type GetJournalEntryLineGroupByPayload<T extends JournalEntryLineGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JournalEntryLineGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JournalEntryLineGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JournalEntryLineGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JournalEntryLineGroupByOutputType[P]>;
}>>;
export type JournalEntryLineWhereInput = {
    AND?: Prisma.JournalEntryLineWhereInput | Prisma.JournalEntryLineWhereInput[];
    OR?: Prisma.JournalEntryLineWhereInput[];
    NOT?: Prisma.JournalEntryLineWhereInput | Prisma.JournalEntryLineWhereInput[];
    id?: Prisma.StringFilter<"JournalEntryLine"> | string;
    tenantId?: Prisma.StringFilter<"JournalEntryLine"> | string;
    journalEntryId?: Prisma.StringFilter<"JournalEntryLine"> | string;
    lineNo?: Prisma.IntFilter<"JournalEntryLine"> | number;
    accountCode?: Prisma.StringFilter<"JournalEntryLine"> | string;
    description?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    debit?: Prisma.DecimalFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    costCenterId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    profitCenterId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    journalEntry?: Prisma.XOR<Prisma.JournalEntryScalarRelationFilter, Prisma.JournalEntryWhereInput>;
};
export type JournalEntryLineOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    journalEntryId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    accountCode?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    debit?: Prisma.SortOrder;
    credit?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    costCenterId?: Prisma.SortOrderInput | Prisma.SortOrder;
    profitCenterId?: Prisma.SortOrderInput | Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    journalEntry?: Prisma.JournalEntryOrderByWithRelationInput;
};
export type JournalEntryLineWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.JournalEntryLineWhereInput | Prisma.JournalEntryLineWhereInput[];
    OR?: Prisma.JournalEntryLineWhereInput[];
    NOT?: Prisma.JournalEntryLineWhereInput | Prisma.JournalEntryLineWhereInput[];
    tenantId?: Prisma.StringFilter<"JournalEntryLine"> | string;
    journalEntryId?: Prisma.StringFilter<"JournalEntryLine"> | string;
    lineNo?: Prisma.IntFilter<"JournalEntryLine"> | number;
    accountCode?: Prisma.StringFilter<"JournalEntryLine"> | string;
    description?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    debit?: Prisma.DecimalFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    costCenterId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    profitCenterId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    journalEntry?: Prisma.XOR<Prisma.JournalEntryScalarRelationFilter, Prisma.JournalEntryWhereInput>;
}, "id">;
export type JournalEntryLineOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    journalEntryId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    accountCode?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    debit?: Prisma.SortOrder;
    credit?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrderInput | Prisma.SortOrder;
    referenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    costCenterId?: Prisma.SortOrderInput | Prisma.SortOrder;
    profitCenterId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.JournalEntryLineCountOrderByAggregateInput;
    _avg?: Prisma.JournalEntryLineAvgOrderByAggregateInput;
    _max?: Prisma.JournalEntryLineMaxOrderByAggregateInput;
    _min?: Prisma.JournalEntryLineMinOrderByAggregateInput;
    _sum?: Prisma.JournalEntryLineSumOrderByAggregateInput;
};
export type JournalEntryLineScalarWhereWithAggregatesInput = {
    AND?: Prisma.JournalEntryLineScalarWhereWithAggregatesInput | Prisma.JournalEntryLineScalarWhereWithAggregatesInput[];
    OR?: Prisma.JournalEntryLineScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JournalEntryLineScalarWhereWithAggregatesInput | Prisma.JournalEntryLineScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"JournalEntryLine"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"JournalEntryLine"> | string;
    journalEntryId?: Prisma.StringWithAggregatesFilter<"JournalEntryLine"> | string;
    lineNo?: Prisma.IntWithAggregatesFilter<"JournalEntryLine"> | number;
    accountCode?: Prisma.StringWithAggregatesFilter<"JournalEntryLine"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"JournalEntryLine"> | string | null;
    debit?: Prisma.DecimalWithAggregatesFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalWithAggregatesFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableWithAggregatesFilter<"JournalEntryLine"> | string | null;
    referenceId?: Prisma.StringNullableWithAggregatesFilter<"JournalEntryLine"> | string | null;
    costCenterId?: Prisma.StringNullableWithAggregatesFilter<"JournalEntryLine"> | string | null;
    profitCenterId?: Prisma.StringNullableWithAggregatesFilter<"JournalEntryLine"> | string | null;
};
export type JournalEntryLineCreateInput = {
    id?: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutJournalEntryLinesInput;
    journalEntry: Prisma.JournalEntryCreateNestedOneWithoutLinesInput;
};
export type JournalEntryLineUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    journalEntryId: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
};
export type JournalEntryLineUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutJournalEntryLinesNestedInput;
    journalEntry?: Prisma.JournalEntryUpdateOneRequiredWithoutLinesNestedInput;
};
export type JournalEntryLineUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    journalEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JournalEntryLineCreateManyInput = {
    id?: string;
    tenantId: string;
    journalEntryId: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
};
export type JournalEntryLineUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JournalEntryLineUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    journalEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JournalEntryLineListRelationFilter = {
    every?: Prisma.JournalEntryLineWhereInput;
    some?: Prisma.JournalEntryLineWhereInput;
    none?: Prisma.JournalEntryLineWhereInput;
};
export type JournalEntryLineOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type JournalEntryLineCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    journalEntryId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    accountCode?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    debit?: Prisma.SortOrder;
    credit?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    costCenterId?: Prisma.SortOrder;
    profitCenterId?: Prisma.SortOrder;
};
export type JournalEntryLineAvgOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    debit?: Prisma.SortOrder;
    credit?: Prisma.SortOrder;
};
export type JournalEntryLineMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    journalEntryId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    accountCode?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    debit?: Prisma.SortOrder;
    credit?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    costCenterId?: Prisma.SortOrder;
    profitCenterId?: Prisma.SortOrder;
};
export type JournalEntryLineMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    journalEntryId?: Prisma.SortOrder;
    lineNo?: Prisma.SortOrder;
    accountCode?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    debit?: Prisma.SortOrder;
    credit?: Prisma.SortOrder;
    referenceType?: Prisma.SortOrder;
    referenceId?: Prisma.SortOrder;
    costCenterId?: Prisma.SortOrder;
    profitCenterId?: Prisma.SortOrder;
};
export type JournalEntryLineSumOrderByAggregateInput = {
    lineNo?: Prisma.SortOrder;
    debit?: Prisma.SortOrder;
    credit?: Prisma.SortOrder;
};
export type JournalEntryLineCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutTenantInput, Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput> | Prisma.JournalEntryLineCreateWithoutTenantInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput | Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.JournalEntryLineCreateManyTenantInputEnvelope;
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
};
export type JournalEntryLineUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutTenantInput, Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput> | Prisma.JournalEntryLineCreateWithoutTenantInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput | Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.JournalEntryLineCreateManyTenantInputEnvelope;
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
};
export type JournalEntryLineUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutTenantInput, Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput> | Prisma.JournalEntryLineCreateWithoutTenantInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput | Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutTenantInput | Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.JournalEntryLineCreateManyTenantInputEnvelope;
    set?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    disconnect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    delete?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    update?: Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutTenantInput | Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.JournalEntryLineUpdateManyWithWhereWithoutTenantInput | Prisma.JournalEntryLineUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.JournalEntryLineScalarWhereInput | Prisma.JournalEntryLineScalarWhereInput[];
};
export type JournalEntryLineUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutTenantInput, Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput> | Prisma.JournalEntryLineCreateWithoutTenantInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput | Prisma.JournalEntryLineCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutTenantInput | Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.JournalEntryLineCreateManyTenantInputEnvelope;
    set?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    disconnect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    delete?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    update?: Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutTenantInput | Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.JournalEntryLineUpdateManyWithWhereWithoutTenantInput | Prisma.JournalEntryLineUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.JournalEntryLineScalarWhereInput | Prisma.JournalEntryLineScalarWhereInput[];
};
export type JournalEntryLineCreateNestedManyWithoutJournalEntryInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput> | Prisma.JournalEntryLineCreateWithoutJournalEntryInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput | Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput[];
    createMany?: Prisma.JournalEntryLineCreateManyJournalEntryInputEnvelope;
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
};
export type JournalEntryLineUncheckedCreateNestedManyWithoutJournalEntryInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput> | Prisma.JournalEntryLineCreateWithoutJournalEntryInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput | Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput[];
    createMany?: Prisma.JournalEntryLineCreateManyJournalEntryInputEnvelope;
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
};
export type JournalEntryLineUpdateManyWithoutJournalEntryNestedInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput> | Prisma.JournalEntryLineCreateWithoutJournalEntryInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput | Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput[];
    upsert?: Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutJournalEntryInput | Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutJournalEntryInput[];
    createMany?: Prisma.JournalEntryLineCreateManyJournalEntryInputEnvelope;
    set?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    disconnect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    delete?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    update?: Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutJournalEntryInput | Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutJournalEntryInput[];
    updateMany?: Prisma.JournalEntryLineUpdateManyWithWhereWithoutJournalEntryInput | Prisma.JournalEntryLineUpdateManyWithWhereWithoutJournalEntryInput[];
    deleteMany?: Prisma.JournalEntryLineScalarWhereInput | Prisma.JournalEntryLineScalarWhereInput[];
};
export type JournalEntryLineUncheckedUpdateManyWithoutJournalEntryNestedInput = {
    create?: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput> | Prisma.JournalEntryLineCreateWithoutJournalEntryInput[] | Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput[];
    connectOrCreate?: Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput | Prisma.JournalEntryLineCreateOrConnectWithoutJournalEntryInput[];
    upsert?: Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutJournalEntryInput | Prisma.JournalEntryLineUpsertWithWhereUniqueWithoutJournalEntryInput[];
    createMany?: Prisma.JournalEntryLineCreateManyJournalEntryInputEnvelope;
    set?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    disconnect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    delete?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    connect?: Prisma.JournalEntryLineWhereUniqueInput | Prisma.JournalEntryLineWhereUniqueInput[];
    update?: Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutJournalEntryInput | Prisma.JournalEntryLineUpdateWithWhereUniqueWithoutJournalEntryInput[];
    updateMany?: Prisma.JournalEntryLineUpdateManyWithWhereWithoutJournalEntryInput | Prisma.JournalEntryLineUpdateManyWithWhereWithoutJournalEntryInput[];
    deleteMany?: Prisma.JournalEntryLineScalarWhereInput | Prisma.JournalEntryLineScalarWhereInput[];
};
export type JournalEntryLineCreateWithoutTenantInput = {
    id?: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
    journalEntry: Prisma.JournalEntryCreateNestedOneWithoutLinesInput;
};
export type JournalEntryLineUncheckedCreateWithoutTenantInput = {
    id?: string;
    journalEntryId: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
};
export type JournalEntryLineCreateOrConnectWithoutTenantInput = {
    where: Prisma.JournalEntryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutTenantInput, Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput>;
};
export type JournalEntryLineCreateManyTenantInputEnvelope = {
    data: Prisma.JournalEntryLineCreateManyTenantInput | Prisma.JournalEntryLineCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type JournalEntryLineUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.JournalEntryLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.JournalEntryLineUpdateWithoutTenantInput, Prisma.JournalEntryLineUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutTenantInput, Prisma.JournalEntryLineUncheckedCreateWithoutTenantInput>;
};
export type JournalEntryLineUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.JournalEntryLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.JournalEntryLineUpdateWithoutTenantInput, Prisma.JournalEntryLineUncheckedUpdateWithoutTenantInput>;
};
export type JournalEntryLineUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.JournalEntryLineScalarWhereInput;
    data: Prisma.XOR<Prisma.JournalEntryLineUpdateManyMutationInput, Prisma.JournalEntryLineUncheckedUpdateManyWithoutTenantInput>;
};
export type JournalEntryLineScalarWhereInput = {
    AND?: Prisma.JournalEntryLineScalarWhereInput | Prisma.JournalEntryLineScalarWhereInput[];
    OR?: Prisma.JournalEntryLineScalarWhereInput[];
    NOT?: Prisma.JournalEntryLineScalarWhereInput | Prisma.JournalEntryLineScalarWhereInput[];
    id?: Prisma.StringFilter<"JournalEntryLine"> | string;
    tenantId?: Prisma.StringFilter<"JournalEntryLine"> | string;
    journalEntryId?: Prisma.StringFilter<"JournalEntryLine"> | string;
    lineNo?: Prisma.IntFilter<"JournalEntryLine"> | number;
    accountCode?: Prisma.StringFilter<"JournalEntryLine"> | string;
    description?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    debit?: Prisma.DecimalFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFilter<"JournalEntryLine"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    referenceId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    costCenterId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
    profitCenterId?: Prisma.StringNullableFilter<"JournalEntryLine"> | string | null;
};
export type JournalEntryLineCreateWithoutJournalEntryInput = {
    id?: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
    tenant: Prisma.TenantCreateNestedOneWithoutJournalEntryLinesInput;
};
export type JournalEntryLineUncheckedCreateWithoutJournalEntryInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
};
export type JournalEntryLineCreateOrConnectWithoutJournalEntryInput = {
    where: Prisma.JournalEntryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput>;
};
export type JournalEntryLineCreateManyJournalEntryInputEnvelope = {
    data: Prisma.JournalEntryLineCreateManyJournalEntryInput | Prisma.JournalEntryLineCreateManyJournalEntryInput[];
    skipDuplicates?: boolean;
};
export type JournalEntryLineUpsertWithWhereUniqueWithoutJournalEntryInput = {
    where: Prisma.JournalEntryLineWhereUniqueInput;
    update: Prisma.XOR<Prisma.JournalEntryLineUpdateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedUpdateWithoutJournalEntryInput>;
    create: Prisma.XOR<Prisma.JournalEntryLineCreateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedCreateWithoutJournalEntryInput>;
};
export type JournalEntryLineUpdateWithWhereUniqueWithoutJournalEntryInput = {
    where: Prisma.JournalEntryLineWhereUniqueInput;
    data: Prisma.XOR<Prisma.JournalEntryLineUpdateWithoutJournalEntryInput, Prisma.JournalEntryLineUncheckedUpdateWithoutJournalEntryInput>;
};
export type JournalEntryLineUpdateManyWithWhereWithoutJournalEntryInput = {
    where: Prisma.JournalEntryLineScalarWhereInput;
    data: Prisma.XOR<Prisma.JournalEntryLineUpdateManyMutationInput, Prisma.JournalEntryLineUncheckedUpdateManyWithoutJournalEntryInput>;
};
export type JournalEntryLineCreateManyTenantInput = {
    id?: string;
    journalEntryId: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
};
export type JournalEntryLineUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    journalEntry?: Prisma.JournalEntryUpdateOneRequiredWithoutLinesNestedInput;
};
export type JournalEntryLineUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    journalEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JournalEntryLineUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    journalEntryId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JournalEntryLineCreateManyJournalEntryInput = {
    id?: string;
    tenantId: string;
    lineNo: number;
    accountCode: string;
    description?: string | null;
    debit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: string | null;
    referenceId?: string | null;
    costCenterId?: string | null;
    profitCenterId?: string | null;
};
export type JournalEntryLineUpdateWithoutJournalEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutJournalEntryLinesNestedInput;
};
export type JournalEntryLineUncheckedUpdateWithoutJournalEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JournalEntryLineUncheckedUpdateManyWithoutJournalEntryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    lineNo?: Prisma.IntFieldUpdateOperationsInput | number;
    accountCode?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    debit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    credit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    referenceType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    referenceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profitCenterId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type JournalEntryLineSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    journalEntryId?: boolean;
    lineNo?: boolean;
    accountCode?: boolean;
    description?: boolean;
    debit?: boolean;
    credit?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    costCenterId?: boolean;
    profitCenterId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    journalEntry?: boolean | Prisma.JournalEntryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["journalEntryLine"]>;
export type JournalEntryLineSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    journalEntryId?: boolean;
    lineNo?: boolean;
    accountCode?: boolean;
    description?: boolean;
    debit?: boolean;
    credit?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    costCenterId?: boolean;
    profitCenterId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    journalEntry?: boolean | Prisma.JournalEntryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["journalEntryLine"]>;
export type JournalEntryLineSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    journalEntryId?: boolean;
    lineNo?: boolean;
    accountCode?: boolean;
    description?: boolean;
    debit?: boolean;
    credit?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    costCenterId?: boolean;
    profitCenterId?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    journalEntry?: boolean | Prisma.JournalEntryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["journalEntryLine"]>;
export type JournalEntryLineSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    journalEntryId?: boolean;
    lineNo?: boolean;
    accountCode?: boolean;
    description?: boolean;
    debit?: boolean;
    credit?: boolean;
    referenceType?: boolean;
    referenceId?: boolean;
    costCenterId?: boolean;
    profitCenterId?: boolean;
};
export type JournalEntryLineOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "journalEntryId" | "lineNo" | "accountCode" | "description" | "debit" | "credit" | "referenceType" | "referenceId" | "costCenterId" | "profitCenterId", ExtArgs["result"]["journalEntryLine"]>;
export type JournalEntryLineInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    journalEntry?: boolean | Prisma.JournalEntryDefaultArgs<ExtArgs>;
};
export type JournalEntryLineIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    journalEntry?: boolean | Prisma.JournalEntryDefaultArgs<ExtArgs>;
};
export type JournalEntryLineIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    journalEntry?: boolean | Prisma.JournalEntryDefaultArgs<ExtArgs>;
};
export type $JournalEntryLinePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "JournalEntryLine";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        journalEntry: Prisma.$JournalEntryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        journalEntryId: string;
        lineNo: number;
        accountCode: string;
        description: string | null;
        debit: runtime.Decimal;
        credit: runtime.Decimal;
        referenceType: string | null;
        referenceId: string | null;
        costCenterId: string | null;
        profitCenterId: string | null;
    }, ExtArgs["result"]["journalEntryLine"]>;
    composites: {};
};
export type JournalEntryLineGetPayload<S extends boolean | null | undefined | JournalEntryLineDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload, S>;
export type JournalEntryLineCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JournalEntryLineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JournalEntryLineCountAggregateInputType | true;
};
export interface JournalEntryLineDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['JournalEntryLine'];
        meta: {
            name: 'JournalEntryLine';
        };
    };
    findUnique<T extends JournalEntryLineFindUniqueArgs>(args: Prisma.SelectSubset<T, JournalEntryLineFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JournalEntryLineFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JournalEntryLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JournalEntryLineFindFirstArgs>(args?: Prisma.SelectSubset<T, JournalEntryLineFindFirstArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JournalEntryLineFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JournalEntryLineFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JournalEntryLineFindManyArgs>(args?: Prisma.SelectSubset<T, JournalEntryLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JournalEntryLineCreateArgs>(args: Prisma.SelectSubset<T, JournalEntryLineCreateArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JournalEntryLineCreateManyArgs>(args?: Prisma.SelectSubset<T, JournalEntryLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends JournalEntryLineCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, JournalEntryLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends JournalEntryLineDeleteArgs>(args: Prisma.SelectSubset<T, JournalEntryLineDeleteArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JournalEntryLineUpdateArgs>(args: Prisma.SelectSubset<T, JournalEntryLineUpdateArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JournalEntryLineDeleteManyArgs>(args?: Prisma.SelectSubset<T, JournalEntryLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JournalEntryLineUpdateManyArgs>(args: Prisma.SelectSubset<T, JournalEntryLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends JournalEntryLineUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, JournalEntryLineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends JournalEntryLineUpsertArgs>(args: Prisma.SelectSubset<T, JournalEntryLineUpsertArgs<ExtArgs>>): Prisma.Prisma__JournalEntryLineClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryLinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JournalEntryLineCountArgs>(args?: Prisma.Subset<T, JournalEntryLineCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JournalEntryLineCountAggregateOutputType> : number>;
    aggregate<T extends JournalEntryLineAggregateArgs>(args: Prisma.Subset<T, JournalEntryLineAggregateArgs>): Prisma.PrismaPromise<GetJournalEntryLineAggregateType<T>>;
    groupBy<T extends JournalEntryLineGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JournalEntryLineGroupByArgs['orderBy'];
    } : {
        orderBy?: JournalEntryLineGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JournalEntryLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJournalEntryLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JournalEntryLineFieldRefs;
}
export interface Prisma__JournalEntryLineClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    journalEntry<T extends Prisma.JournalEntryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JournalEntryDefaultArgs<ExtArgs>>): Prisma.Prisma__JournalEntryClient<runtime.Types.Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JournalEntryLineFieldRefs {
    readonly id: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly tenantId: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly journalEntryId: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly lineNo: Prisma.FieldRef<"JournalEntryLine", 'Int'>;
    readonly accountCode: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly description: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly debit: Prisma.FieldRef<"JournalEntryLine", 'Decimal'>;
    readonly credit: Prisma.FieldRef<"JournalEntryLine", 'Decimal'>;
    readonly referenceType: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly referenceId: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly costCenterId: Prisma.FieldRef<"JournalEntryLine", 'String'>;
    readonly profitCenterId: Prisma.FieldRef<"JournalEntryLine", 'String'>;
}
export type JournalEntryLineFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    where: Prisma.JournalEntryLineWhereUniqueInput;
};
export type JournalEntryLineFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    where: Prisma.JournalEntryLineWhereUniqueInput;
};
export type JournalEntryLineFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    where?: Prisma.JournalEntryLineWhereInput;
    orderBy?: Prisma.JournalEntryLineOrderByWithRelationInput | Prisma.JournalEntryLineOrderByWithRelationInput[];
    cursor?: Prisma.JournalEntryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JournalEntryLineScalarFieldEnum | Prisma.JournalEntryLineScalarFieldEnum[];
};
export type JournalEntryLineFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    where?: Prisma.JournalEntryLineWhereInput;
    orderBy?: Prisma.JournalEntryLineOrderByWithRelationInput | Prisma.JournalEntryLineOrderByWithRelationInput[];
    cursor?: Prisma.JournalEntryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JournalEntryLineScalarFieldEnum | Prisma.JournalEntryLineScalarFieldEnum[];
};
export type JournalEntryLineFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    where?: Prisma.JournalEntryLineWhereInput;
    orderBy?: Prisma.JournalEntryLineOrderByWithRelationInput | Prisma.JournalEntryLineOrderByWithRelationInput[];
    cursor?: Prisma.JournalEntryLineWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JournalEntryLineScalarFieldEnum | Prisma.JournalEntryLineScalarFieldEnum[];
};
export type JournalEntryLineCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JournalEntryLineCreateInput, Prisma.JournalEntryLineUncheckedCreateInput>;
};
export type JournalEntryLineCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JournalEntryLineCreateManyInput | Prisma.JournalEntryLineCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JournalEntryLineCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    data: Prisma.JournalEntryLineCreateManyInput | Prisma.JournalEntryLineCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.JournalEntryLineIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type JournalEntryLineUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JournalEntryLineUpdateInput, Prisma.JournalEntryLineUncheckedUpdateInput>;
    where: Prisma.JournalEntryLineWhereUniqueInput;
};
export type JournalEntryLineUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JournalEntryLineUpdateManyMutationInput, Prisma.JournalEntryLineUncheckedUpdateManyInput>;
    where?: Prisma.JournalEntryLineWhereInput;
    limit?: number;
};
export type JournalEntryLineUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JournalEntryLineUpdateManyMutationInput, Prisma.JournalEntryLineUncheckedUpdateManyInput>;
    where?: Prisma.JournalEntryLineWhereInput;
    limit?: number;
    include?: Prisma.JournalEntryLineIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type JournalEntryLineUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    where: Prisma.JournalEntryLineWhereUniqueInput;
    create: Prisma.XOR<Prisma.JournalEntryLineCreateInput, Prisma.JournalEntryLineUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JournalEntryLineUpdateInput, Prisma.JournalEntryLineUncheckedUpdateInput>;
};
export type JournalEntryLineDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
    where: Prisma.JournalEntryLineWhereUniqueInput;
};
export type JournalEntryLineDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JournalEntryLineWhereInput;
    limit?: number;
};
export type JournalEntryLineDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JournalEntryLineSelect<ExtArgs> | null;
    omit?: Prisma.JournalEntryLineOmit<ExtArgs> | null;
    include?: Prisma.JournalEntryLineInclude<ExtArgs> | null;
};
