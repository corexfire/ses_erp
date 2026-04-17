import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CashTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$CashTransactionPayload>;
export type AggregateCashTransaction = {
    _count: CashTransactionCountAggregateOutputType | null;
    _avg: CashTransactionAvgAggregateOutputType | null;
    _sum: CashTransactionSumAggregateOutputType | null;
    _min: CashTransactionMinAggregateOutputType | null;
    _max: CashTransactionMaxAggregateOutputType | null;
};
export type CashTransactionAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type CashTransactionSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type CashTransactionMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    cashAccountId: string | null;
    transDate: Date | null;
    transType: string | null;
    description: string | null;
    amount: runtime.Decimal | null;
    reference: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type CashTransactionMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    cashAccountId: string | null;
    transDate: Date | null;
    transType: string | null;
    description: string | null;
    amount: runtime.Decimal | null;
    reference: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type CashTransactionCountAggregateOutputType = {
    id: number;
    tenantId: number;
    cashAccountId: number;
    transDate: number;
    transType: number;
    description: number;
    amount: number;
    reference: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type CashTransactionAvgAggregateInputType = {
    amount?: true;
};
export type CashTransactionSumAggregateInputType = {
    amount?: true;
};
export type CashTransactionMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    cashAccountId?: true;
    transDate?: true;
    transType?: true;
    description?: true;
    amount?: true;
    reference?: true;
    status?: true;
    createdAt?: true;
};
export type CashTransactionMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    cashAccountId?: true;
    transDate?: true;
    transType?: true;
    description?: true;
    amount?: true;
    reference?: true;
    status?: true;
    createdAt?: true;
};
export type CashTransactionCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    cashAccountId?: true;
    transDate?: true;
    transType?: true;
    description?: true;
    amount?: true;
    reference?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type CashTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CashTransactionWhereInput;
    orderBy?: Prisma.CashTransactionOrderByWithRelationInput | Prisma.CashTransactionOrderByWithRelationInput[];
    cursor?: Prisma.CashTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CashTransactionCountAggregateInputType;
    _avg?: CashTransactionAvgAggregateInputType;
    _sum?: CashTransactionSumAggregateInputType;
    _min?: CashTransactionMinAggregateInputType;
    _max?: CashTransactionMaxAggregateInputType;
};
export type GetCashTransactionAggregateType<T extends CashTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateCashTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCashTransaction[P]> : Prisma.GetScalarType<T[P], AggregateCashTransaction[P]>;
};
export type CashTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CashTransactionWhereInput;
    orderBy?: Prisma.CashTransactionOrderByWithAggregationInput | Prisma.CashTransactionOrderByWithAggregationInput[];
    by: Prisma.CashTransactionScalarFieldEnum[] | Prisma.CashTransactionScalarFieldEnum;
    having?: Prisma.CashTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CashTransactionCountAggregateInputType | true;
    _avg?: CashTransactionAvgAggregateInputType;
    _sum?: CashTransactionSumAggregateInputType;
    _min?: CashTransactionMinAggregateInputType;
    _max?: CashTransactionMaxAggregateInputType;
};
export type CashTransactionGroupByOutputType = {
    id: string;
    tenantId: string;
    cashAccountId: string;
    transDate: Date;
    transType: string;
    description: string;
    amount: runtime.Decimal;
    reference: string | null;
    status: string;
    createdAt: Date;
    _count: CashTransactionCountAggregateOutputType | null;
    _avg: CashTransactionAvgAggregateOutputType | null;
    _sum: CashTransactionSumAggregateOutputType | null;
    _min: CashTransactionMinAggregateOutputType | null;
    _max: CashTransactionMaxAggregateOutputType | null;
};
export type GetCashTransactionGroupByPayload<T extends CashTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CashTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CashTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CashTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CashTransactionGroupByOutputType[P]>;
}>>;
export type CashTransactionWhereInput = {
    AND?: Prisma.CashTransactionWhereInput | Prisma.CashTransactionWhereInput[];
    OR?: Prisma.CashTransactionWhereInput[];
    NOT?: Prisma.CashTransactionWhereInput | Prisma.CashTransactionWhereInput[];
    id?: Prisma.StringFilter<"CashTransaction"> | string;
    tenantId?: Prisma.StringFilter<"CashTransaction"> | string;
    cashAccountId?: Prisma.StringFilter<"CashTransaction"> | string;
    transDate?: Prisma.DateTimeFilter<"CashTransaction"> | Date | string;
    transType?: Prisma.StringFilter<"CashTransaction"> | string;
    description?: Prisma.StringFilter<"CashTransaction"> | string;
    amount?: Prisma.DecimalFilter<"CashTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.StringNullableFilter<"CashTransaction"> | string | null;
    status?: Prisma.StringFilter<"CashTransaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"CashTransaction"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    cashAccount?: Prisma.XOR<Prisma.CashAccountScalarRelationFilter, Prisma.CashAccountWhereInput>;
};
export type CashTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    transDate?: Prisma.SortOrder;
    transType?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    cashAccount?: Prisma.CashAccountOrderByWithRelationInput;
};
export type CashTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CashTransactionWhereInput | Prisma.CashTransactionWhereInput[];
    OR?: Prisma.CashTransactionWhereInput[];
    NOT?: Prisma.CashTransactionWhereInput | Prisma.CashTransactionWhereInput[];
    tenantId?: Prisma.StringFilter<"CashTransaction"> | string;
    cashAccountId?: Prisma.StringFilter<"CashTransaction"> | string;
    transDate?: Prisma.DateTimeFilter<"CashTransaction"> | Date | string;
    transType?: Prisma.StringFilter<"CashTransaction"> | string;
    description?: Prisma.StringFilter<"CashTransaction"> | string;
    amount?: Prisma.DecimalFilter<"CashTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.StringNullableFilter<"CashTransaction"> | string | null;
    status?: Prisma.StringFilter<"CashTransaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"CashTransaction"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    cashAccount?: Prisma.XOR<Prisma.CashAccountScalarRelationFilter, Prisma.CashAccountWhereInput>;
}, "id">;
export type CashTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    transDate?: Prisma.SortOrder;
    transType?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CashTransactionCountOrderByAggregateInput;
    _avg?: Prisma.CashTransactionAvgOrderByAggregateInput;
    _max?: Prisma.CashTransactionMaxOrderByAggregateInput;
    _min?: Prisma.CashTransactionMinOrderByAggregateInput;
    _sum?: Prisma.CashTransactionSumOrderByAggregateInput;
};
export type CashTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CashTransactionScalarWhereWithAggregatesInput | Prisma.CashTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CashTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CashTransactionScalarWhereWithAggregatesInput | Prisma.CashTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CashTransaction"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"CashTransaction"> | string;
    cashAccountId?: Prisma.StringWithAggregatesFilter<"CashTransaction"> | string;
    transDate?: Prisma.DateTimeWithAggregatesFilter<"CashTransaction"> | Date | string;
    transType?: Prisma.StringWithAggregatesFilter<"CashTransaction"> | string;
    description?: Prisma.StringWithAggregatesFilter<"CashTransaction"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"CashTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.StringNullableWithAggregatesFilter<"CashTransaction"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"CashTransaction"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CashTransaction"> | Date | string;
};
export type CashTransactionCreateInput = {
    id?: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutCashTransactionsInput;
    cashAccount: Prisma.CashAccountCreateNestedOneWithoutTransactionsInput;
};
export type CashTransactionUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    cashAccountId: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type CashTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutCashTransactionsNestedInput;
    cashAccount?: Prisma.CashAccountUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type CashTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashTransactionCreateManyInput = {
    id?: string;
    tenantId: string;
    cashAccountId: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type CashTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashTransactionListRelationFilter = {
    every?: Prisma.CashTransactionWhereInput;
    some?: Prisma.CashTransactionWhereInput;
    none?: Prisma.CashTransactionWhereInput;
};
export type CashTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CashTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    transDate?: Prisma.SortOrder;
    transType?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CashTransactionAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type CashTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    transDate?: Prisma.SortOrder;
    transType?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CashTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    transDate?: Prisma.SortOrder;
    transType?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reference?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CashTransactionSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type CashTransactionCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutTenantInput, Prisma.CashTransactionUncheckedCreateWithoutTenantInput> | Prisma.CashTransactionCreateWithoutTenantInput[] | Prisma.CashTransactionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutTenantInput | Prisma.CashTransactionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.CashTransactionCreateManyTenantInputEnvelope;
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
};
export type CashTransactionUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutTenantInput, Prisma.CashTransactionUncheckedCreateWithoutTenantInput> | Prisma.CashTransactionCreateWithoutTenantInput[] | Prisma.CashTransactionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutTenantInput | Prisma.CashTransactionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.CashTransactionCreateManyTenantInputEnvelope;
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
};
export type CashTransactionUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutTenantInput, Prisma.CashTransactionUncheckedCreateWithoutTenantInput> | Prisma.CashTransactionCreateWithoutTenantInput[] | Prisma.CashTransactionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutTenantInput | Prisma.CashTransactionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.CashTransactionUpsertWithWhereUniqueWithoutTenantInput | Prisma.CashTransactionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.CashTransactionCreateManyTenantInputEnvelope;
    set?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    disconnect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    delete?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    update?: Prisma.CashTransactionUpdateWithWhereUniqueWithoutTenantInput | Prisma.CashTransactionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.CashTransactionUpdateManyWithWhereWithoutTenantInput | Prisma.CashTransactionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.CashTransactionScalarWhereInput | Prisma.CashTransactionScalarWhereInput[];
};
export type CashTransactionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutTenantInput, Prisma.CashTransactionUncheckedCreateWithoutTenantInput> | Prisma.CashTransactionCreateWithoutTenantInput[] | Prisma.CashTransactionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutTenantInput | Prisma.CashTransactionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.CashTransactionUpsertWithWhereUniqueWithoutTenantInput | Prisma.CashTransactionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.CashTransactionCreateManyTenantInputEnvelope;
    set?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    disconnect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    delete?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    update?: Prisma.CashTransactionUpdateWithWhereUniqueWithoutTenantInput | Prisma.CashTransactionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.CashTransactionUpdateManyWithWhereWithoutTenantInput | Prisma.CashTransactionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.CashTransactionScalarWhereInput | Prisma.CashTransactionScalarWhereInput[];
};
export type CashTransactionCreateNestedManyWithoutCashAccountInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutCashAccountInput, Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput> | Prisma.CashTransactionCreateWithoutCashAccountInput[] | Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput | Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput[];
    createMany?: Prisma.CashTransactionCreateManyCashAccountInputEnvelope;
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
};
export type CashTransactionUncheckedCreateNestedManyWithoutCashAccountInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutCashAccountInput, Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput> | Prisma.CashTransactionCreateWithoutCashAccountInput[] | Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput | Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput[];
    createMany?: Prisma.CashTransactionCreateManyCashAccountInputEnvelope;
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
};
export type CashTransactionUpdateManyWithoutCashAccountNestedInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutCashAccountInput, Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput> | Prisma.CashTransactionCreateWithoutCashAccountInput[] | Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput | Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput[];
    upsert?: Prisma.CashTransactionUpsertWithWhereUniqueWithoutCashAccountInput | Prisma.CashTransactionUpsertWithWhereUniqueWithoutCashAccountInput[];
    createMany?: Prisma.CashTransactionCreateManyCashAccountInputEnvelope;
    set?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    disconnect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    delete?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    update?: Prisma.CashTransactionUpdateWithWhereUniqueWithoutCashAccountInput | Prisma.CashTransactionUpdateWithWhereUniqueWithoutCashAccountInput[];
    updateMany?: Prisma.CashTransactionUpdateManyWithWhereWithoutCashAccountInput | Prisma.CashTransactionUpdateManyWithWhereWithoutCashAccountInput[];
    deleteMany?: Prisma.CashTransactionScalarWhereInput | Prisma.CashTransactionScalarWhereInput[];
};
export type CashTransactionUncheckedUpdateManyWithoutCashAccountNestedInput = {
    create?: Prisma.XOR<Prisma.CashTransactionCreateWithoutCashAccountInput, Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput> | Prisma.CashTransactionCreateWithoutCashAccountInput[] | Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput | Prisma.CashTransactionCreateOrConnectWithoutCashAccountInput[];
    upsert?: Prisma.CashTransactionUpsertWithWhereUniqueWithoutCashAccountInput | Prisma.CashTransactionUpsertWithWhereUniqueWithoutCashAccountInput[];
    createMany?: Prisma.CashTransactionCreateManyCashAccountInputEnvelope;
    set?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    disconnect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    delete?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    connect?: Prisma.CashTransactionWhereUniqueInput | Prisma.CashTransactionWhereUniqueInput[];
    update?: Prisma.CashTransactionUpdateWithWhereUniqueWithoutCashAccountInput | Prisma.CashTransactionUpdateWithWhereUniqueWithoutCashAccountInput[];
    updateMany?: Prisma.CashTransactionUpdateManyWithWhereWithoutCashAccountInput | Prisma.CashTransactionUpdateManyWithWhereWithoutCashAccountInput[];
    deleteMany?: Prisma.CashTransactionScalarWhereInput | Prisma.CashTransactionScalarWhereInput[];
};
export type CashTransactionCreateWithoutTenantInput = {
    id?: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
    cashAccount: Prisma.CashAccountCreateNestedOneWithoutTransactionsInput;
};
export type CashTransactionUncheckedCreateWithoutTenantInput = {
    id?: string;
    cashAccountId: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type CashTransactionCreateOrConnectWithoutTenantInput = {
    where: Prisma.CashTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CashTransactionCreateWithoutTenantInput, Prisma.CashTransactionUncheckedCreateWithoutTenantInput>;
};
export type CashTransactionCreateManyTenantInputEnvelope = {
    data: Prisma.CashTransactionCreateManyTenantInput | Prisma.CashTransactionCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type CashTransactionUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.CashTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CashTransactionUpdateWithoutTenantInput, Prisma.CashTransactionUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.CashTransactionCreateWithoutTenantInput, Prisma.CashTransactionUncheckedCreateWithoutTenantInput>;
};
export type CashTransactionUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.CashTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CashTransactionUpdateWithoutTenantInput, Prisma.CashTransactionUncheckedUpdateWithoutTenantInput>;
};
export type CashTransactionUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.CashTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.CashTransactionUpdateManyMutationInput, Prisma.CashTransactionUncheckedUpdateManyWithoutTenantInput>;
};
export type CashTransactionScalarWhereInput = {
    AND?: Prisma.CashTransactionScalarWhereInput | Prisma.CashTransactionScalarWhereInput[];
    OR?: Prisma.CashTransactionScalarWhereInput[];
    NOT?: Prisma.CashTransactionScalarWhereInput | Prisma.CashTransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"CashTransaction"> | string;
    tenantId?: Prisma.StringFilter<"CashTransaction"> | string;
    cashAccountId?: Prisma.StringFilter<"CashTransaction"> | string;
    transDate?: Prisma.DateTimeFilter<"CashTransaction"> | Date | string;
    transType?: Prisma.StringFilter<"CashTransaction"> | string;
    description?: Prisma.StringFilter<"CashTransaction"> | string;
    amount?: Prisma.DecimalFilter<"CashTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.StringNullableFilter<"CashTransaction"> | string | null;
    status?: Prisma.StringFilter<"CashTransaction"> | string;
    createdAt?: Prisma.DateTimeFilter<"CashTransaction"> | Date | string;
};
export type CashTransactionCreateWithoutCashAccountInput = {
    id?: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutCashTransactionsInput;
};
export type CashTransactionUncheckedCreateWithoutCashAccountInput = {
    id?: string;
    tenantId: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type CashTransactionCreateOrConnectWithoutCashAccountInput = {
    where: Prisma.CashTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CashTransactionCreateWithoutCashAccountInput, Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput>;
};
export type CashTransactionCreateManyCashAccountInputEnvelope = {
    data: Prisma.CashTransactionCreateManyCashAccountInput | Prisma.CashTransactionCreateManyCashAccountInput[];
    skipDuplicates?: boolean;
};
export type CashTransactionUpsertWithWhereUniqueWithoutCashAccountInput = {
    where: Prisma.CashTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CashTransactionUpdateWithoutCashAccountInput, Prisma.CashTransactionUncheckedUpdateWithoutCashAccountInput>;
    create: Prisma.XOR<Prisma.CashTransactionCreateWithoutCashAccountInput, Prisma.CashTransactionUncheckedCreateWithoutCashAccountInput>;
};
export type CashTransactionUpdateWithWhereUniqueWithoutCashAccountInput = {
    where: Prisma.CashTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CashTransactionUpdateWithoutCashAccountInput, Prisma.CashTransactionUncheckedUpdateWithoutCashAccountInput>;
};
export type CashTransactionUpdateManyWithWhereWithoutCashAccountInput = {
    where: Prisma.CashTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.CashTransactionUpdateManyMutationInput, Prisma.CashTransactionUncheckedUpdateManyWithoutCashAccountInput>;
};
export type CashTransactionCreateManyTenantInput = {
    id?: string;
    cashAccountId: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type CashTransactionUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cashAccount?: Prisma.CashAccountUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type CashTransactionUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashTransactionUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashTransactionCreateManyCashAccountInput = {
    id?: string;
    tenantId: string;
    transDate: Date | string;
    transType: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type CashTransactionUpdateWithoutCashAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutCashTransactionsNestedInput;
};
export type CashTransactionUncheckedUpdateWithoutCashAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashTransactionUncheckedUpdateManyWithoutCashAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    transDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transType?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reference?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CashTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    transDate?: boolean;
    transType?: boolean;
    description?: boolean;
    amount?: boolean;
    reference?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cashTransaction"]>;
export type CashTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    transDate?: boolean;
    transType?: boolean;
    description?: boolean;
    amount?: boolean;
    reference?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cashTransaction"]>;
export type CashTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    transDate?: boolean;
    transType?: boolean;
    description?: boolean;
    amount?: boolean;
    reference?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["cashTransaction"]>;
export type CashTransactionSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    transDate?: boolean;
    transType?: boolean;
    description?: boolean;
    amount?: boolean;
    reference?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type CashTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "cashAccountId" | "transDate" | "transType" | "description" | "amount" | "reference" | "status" | "createdAt", ExtArgs["result"]["cashTransaction"]>;
export type CashTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
};
export type CashTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
};
export type CashTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
};
export type $CashTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CashTransaction";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        cashAccount: Prisma.$CashAccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        cashAccountId: string;
        transDate: Date;
        transType: string;
        description: string;
        amount: runtime.Decimal;
        reference: string | null;
        status: string;
        createdAt: Date;
    }, ExtArgs["result"]["cashTransaction"]>;
    composites: {};
};
export type CashTransactionGetPayload<S extends boolean | null | undefined | CashTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload, S>;
export type CashTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CashTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CashTransactionCountAggregateInputType | true;
};
export interface CashTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CashTransaction'];
        meta: {
            name: 'CashTransaction';
        };
    };
    findUnique<T extends CashTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, CashTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CashTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CashTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CashTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, CashTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CashTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CashTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CashTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, CashTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CashTransactionCreateArgs>(args: Prisma.SelectSubset<T, CashTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CashTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, CashTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CashTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CashTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CashTransactionDeleteArgs>(args: Prisma.SelectSubset<T, CashTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CashTransactionUpdateArgs>(args: Prisma.SelectSubset<T, CashTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CashTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CashTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CashTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, CashTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CashTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CashTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CashTransactionUpsertArgs>(args: Prisma.SelectSubset<T, CashTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__CashTransactionClient<runtime.Types.Result.GetResult<Prisma.$CashTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CashTransactionCountArgs>(args?: Prisma.Subset<T, CashTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CashTransactionCountAggregateOutputType> : number>;
    aggregate<T extends CashTransactionAggregateArgs>(args: Prisma.Subset<T, CashTransactionAggregateArgs>): Prisma.PrismaPromise<GetCashTransactionAggregateType<T>>;
    groupBy<T extends CashTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CashTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: CashTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CashTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CashTransactionFieldRefs;
}
export interface Prisma__CashTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    cashAccount<T extends Prisma.CashAccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CashAccountDefaultArgs<ExtArgs>>): Prisma.Prisma__CashAccountClient<runtime.Types.Result.GetResult<Prisma.$CashAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CashTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"CashTransaction", 'String'>;
    readonly tenantId: Prisma.FieldRef<"CashTransaction", 'String'>;
    readonly cashAccountId: Prisma.FieldRef<"CashTransaction", 'String'>;
    readonly transDate: Prisma.FieldRef<"CashTransaction", 'DateTime'>;
    readonly transType: Prisma.FieldRef<"CashTransaction", 'String'>;
    readonly description: Prisma.FieldRef<"CashTransaction", 'String'>;
    readonly amount: Prisma.FieldRef<"CashTransaction", 'Decimal'>;
    readonly reference: Prisma.FieldRef<"CashTransaction", 'String'>;
    readonly status: Prisma.FieldRef<"CashTransaction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CashTransaction", 'DateTime'>;
}
export type CashTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    where: Prisma.CashTransactionWhereUniqueInput;
};
export type CashTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    where: Prisma.CashTransactionWhereUniqueInput;
};
export type CashTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    where?: Prisma.CashTransactionWhereInput;
    orderBy?: Prisma.CashTransactionOrderByWithRelationInput | Prisma.CashTransactionOrderByWithRelationInput[];
    cursor?: Prisma.CashTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CashTransactionScalarFieldEnum | Prisma.CashTransactionScalarFieldEnum[];
};
export type CashTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    where?: Prisma.CashTransactionWhereInput;
    orderBy?: Prisma.CashTransactionOrderByWithRelationInput | Prisma.CashTransactionOrderByWithRelationInput[];
    cursor?: Prisma.CashTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CashTransactionScalarFieldEnum | Prisma.CashTransactionScalarFieldEnum[];
};
export type CashTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    where?: Prisma.CashTransactionWhereInput;
    orderBy?: Prisma.CashTransactionOrderByWithRelationInput | Prisma.CashTransactionOrderByWithRelationInput[];
    cursor?: Prisma.CashTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CashTransactionScalarFieldEnum | Prisma.CashTransactionScalarFieldEnum[];
};
export type CashTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CashTransactionCreateInput, Prisma.CashTransactionUncheckedCreateInput>;
};
export type CashTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CashTransactionCreateManyInput | Prisma.CashTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CashTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    data: Prisma.CashTransactionCreateManyInput | Prisma.CashTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CashTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CashTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CashTransactionUpdateInput, Prisma.CashTransactionUncheckedUpdateInput>;
    where: Prisma.CashTransactionWhereUniqueInput;
};
export type CashTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CashTransactionUpdateManyMutationInput, Prisma.CashTransactionUncheckedUpdateManyInput>;
    where?: Prisma.CashTransactionWhereInput;
    limit?: number;
};
export type CashTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CashTransactionUpdateManyMutationInput, Prisma.CashTransactionUncheckedUpdateManyInput>;
    where?: Prisma.CashTransactionWhereInput;
    limit?: number;
    include?: Prisma.CashTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CashTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    where: Prisma.CashTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CashTransactionCreateInput, Prisma.CashTransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CashTransactionUpdateInput, Prisma.CashTransactionUncheckedUpdateInput>;
};
export type CashTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
    where: Prisma.CashTransactionWhereUniqueInput;
};
export type CashTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CashTransactionWhereInput;
    limit?: number;
};
export type CashTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CashTransactionSelect<ExtArgs> | null;
    omit?: Prisma.CashTransactionOmit<ExtArgs> | null;
    include?: Prisma.CashTransactionInclude<ExtArgs> | null;
};
