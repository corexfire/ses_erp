import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PettyCashReplenishmentModel = runtime.Types.Result.DefaultSelection<Prisma.$PettyCashReplenishmentPayload>;
export type AggregatePettyCashReplenishment = {
    _count: PettyCashReplenishmentCountAggregateOutputType | null;
    _avg: PettyCashReplenishmentAvgAggregateOutputType | null;
    _sum: PettyCashReplenishmentSumAggregateOutputType | null;
    _min: PettyCashReplenishmentMinAggregateOutputType | null;
    _max: PettyCashReplenishmentMaxAggregateOutputType | null;
};
export type PettyCashReplenishmentAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type PettyCashReplenishmentSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type PettyCashReplenishmentMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    cashAccountId: string | null;
    requestNo: string | null;
    requestDate: Date | null;
    referenceNo: string | null;
    amount: runtime.Decimal | null;
    status: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type PettyCashReplenishmentMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    cashAccountId: string | null;
    requestNo: string | null;
    requestDate: Date | null;
    referenceNo: string | null;
    amount: runtime.Decimal | null;
    status: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type PettyCashReplenishmentCountAggregateOutputType = {
    id: number;
    tenantId: number;
    cashAccountId: number;
    requestNo: number;
    requestDate: number;
    referenceNo: number;
    amount: number;
    status: number;
    notes: number;
    createdAt: number;
    _all: number;
};
export type PettyCashReplenishmentAvgAggregateInputType = {
    amount?: true;
};
export type PettyCashReplenishmentSumAggregateInputType = {
    amount?: true;
};
export type PettyCashReplenishmentMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    cashAccountId?: true;
    requestNo?: true;
    requestDate?: true;
    referenceNo?: true;
    amount?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
};
export type PettyCashReplenishmentMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    cashAccountId?: true;
    requestNo?: true;
    requestDate?: true;
    referenceNo?: true;
    amount?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
};
export type PettyCashReplenishmentCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    cashAccountId?: true;
    requestNo?: true;
    requestDate?: true;
    referenceNo?: true;
    amount?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    _all?: true;
};
export type PettyCashReplenishmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PettyCashReplenishmentWhereInput;
    orderBy?: Prisma.PettyCashReplenishmentOrderByWithRelationInput | Prisma.PettyCashReplenishmentOrderByWithRelationInput[];
    cursor?: Prisma.PettyCashReplenishmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PettyCashReplenishmentCountAggregateInputType;
    _avg?: PettyCashReplenishmentAvgAggregateInputType;
    _sum?: PettyCashReplenishmentSumAggregateInputType;
    _min?: PettyCashReplenishmentMinAggregateInputType;
    _max?: PettyCashReplenishmentMaxAggregateInputType;
};
export type GetPettyCashReplenishmentAggregateType<T extends PettyCashReplenishmentAggregateArgs> = {
    [P in keyof T & keyof AggregatePettyCashReplenishment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePettyCashReplenishment[P]> : Prisma.GetScalarType<T[P], AggregatePettyCashReplenishment[P]>;
};
export type PettyCashReplenishmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PettyCashReplenishmentWhereInput;
    orderBy?: Prisma.PettyCashReplenishmentOrderByWithAggregationInput | Prisma.PettyCashReplenishmentOrderByWithAggregationInput[];
    by: Prisma.PettyCashReplenishmentScalarFieldEnum[] | Prisma.PettyCashReplenishmentScalarFieldEnum;
    having?: Prisma.PettyCashReplenishmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PettyCashReplenishmentCountAggregateInputType | true;
    _avg?: PettyCashReplenishmentAvgAggregateInputType;
    _sum?: PettyCashReplenishmentSumAggregateInputType;
    _min?: PettyCashReplenishmentMinAggregateInputType;
    _max?: PettyCashReplenishmentMaxAggregateInputType;
};
export type PettyCashReplenishmentGroupByOutputType = {
    id: string;
    tenantId: string;
    cashAccountId: string;
    requestNo: string;
    requestDate: Date;
    referenceNo: string | null;
    amount: runtime.Decimal;
    status: string;
    notes: string | null;
    createdAt: Date;
    _count: PettyCashReplenishmentCountAggregateOutputType | null;
    _avg: PettyCashReplenishmentAvgAggregateOutputType | null;
    _sum: PettyCashReplenishmentSumAggregateOutputType | null;
    _min: PettyCashReplenishmentMinAggregateOutputType | null;
    _max: PettyCashReplenishmentMaxAggregateOutputType | null;
};
export type GetPettyCashReplenishmentGroupByPayload<T extends PettyCashReplenishmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PettyCashReplenishmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PettyCashReplenishmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PettyCashReplenishmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PettyCashReplenishmentGroupByOutputType[P]>;
}>>;
export type PettyCashReplenishmentWhereInput = {
    AND?: Prisma.PettyCashReplenishmentWhereInput | Prisma.PettyCashReplenishmentWhereInput[];
    OR?: Prisma.PettyCashReplenishmentWhereInput[];
    NOT?: Prisma.PettyCashReplenishmentWhereInput | Prisma.PettyCashReplenishmentWhereInput[];
    id?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    tenantId?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    cashAccountId?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    requestNo?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    requestDate?: Prisma.DateTimeFilter<"PettyCashReplenishment"> | Date | string;
    referenceNo?: Prisma.StringNullableFilter<"PettyCashReplenishment"> | string | null;
    amount?: Prisma.DecimalFilter<"PettyCashReplenishment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    notes?: Prisma.StringNullableFilter<"PettyCashReplenishment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PettyCashReplenishment"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    cashAccount?: Prisma.XOR<Prisma.CashAccountScalarRelationFilter, Prisma.CashAccountWhereInput>;
};
export type PettyCashReplenishmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    requestNo?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    referenceNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    cashAccount?: Prisma.CashAccountOrderByWithRelationInput;
};
export type PettyCashReplenishmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_requestNo?: Prisma.PettyCashReplenishmentTenantIdRequestNoCompoundUniqueInput;
    AND?: Prisma.PettyCashReplenishmentWhereInput | Prisma.PettyCashReplenishmentWhereInput[];
    OR?: Prisma.PettyCashReplenishmentWhereInput[];
    NOT?: Prisma.PettyCashReplenishmentWhereInput | Prisma.PettyCashReplenishmentWhereInput[];
    tenantId?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    cashAccountId?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    requestNo?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    requestDate?: Prisma.DateTimeFilter<"PettyCashReplenishment"> | Date | string;
    referenceNo?: Prisma.StringNullableFilter<"PettyCashReplenishment"> | string | null;
    amount?: Prisma.DecimalFilter<"PettyCashReplenishment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    notes?: Prisma.StringNullableFilter<"PettyCashReplenishment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PettyCashReplenishment"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    cashAccount?: Prisma.XOR<Prisma.CashAccountScalarRelationFilter, Prisma.CashAccountWhereInput>;
}, "id" | "tenantId_requestNo">;
export type PettyCashReplenishmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    requestNo?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    referenceNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PettyCashReplenishmentCountOrderByAggregateInput;
    _avg?: Prisma.PettyCashReplenishmentAvgOrderByAggregateInput;
    _max?: Prisma.PettyCashReplenishmentMaxOrderByAggregateInput;
    _min?: Prisma.PettyCashReplenishmentMinOrderByAggregateInput;
    _sum?: Prisma.PettyCashReplenishmentSumOrderByAggregateInput;
};
export type PettyCashReplenishmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PettyCashReplenishmentScalarWhereWithAggregatesInput | Prisma.PettyCashReplenishmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PettyCashReplenishmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PettyCashReplenishmentScalarWhereWithAggregatesInput | Prisma.PettyCashReplenishmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PettyCashReplenishment"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"PettyCashReplenishment"> | string;
    cashAccountId?: Prisma.StringWithAggregatesFilter<"PettyCashReplenishment"> | string;
    requestNo?: Prisma.StringWithAggregatesFilter<"PettyCashReplenishment"> | string;
    requestDate?: Prisma.DateTimeWithAggregatesFilter<"PettyCashReplenishment"> | Date | string;
    referenceNo?: Prisma.StringNullableWithAggregatesFilter<"PettyCashReplenishment"> | string | null;
    amount?: Prisma.DecimalWithAggregatesFilter<"PettyCashReplenishment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringWithAggregatesFilter<"PettyCashReplenishment"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"PettyCashReplenishment"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PettyCashReplenishment"> | Date | string;
};
export type PettyCashReplenishmentCreateInput = {
    id?: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPettyCashReplenishmentsInput;
    cashAccount: Prisma.CashAccountCreateNestedOneWithoutPettyCashReplenishmentsInput;
};
export type PettyCashReplenishmentUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    cashAccountId: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PettyCashReplenishmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPettyCashReplenishmentsNestedInput;
    cashAccount?: Prisma.CashAccountUpdateOneRequiredWithoutPettyCashReplenishmentsNestedInput;
};
export type PettyCashReplenishmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PettyCashReplenishmentCreateManyInput = {
    id?: string;
    tenantId: string;
    cashAccountId: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PettyCashReplenishmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PettyCashReplenishmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PettyCashReplenishmentListRelationFilter = {
    every?: Prisma.PettyCashReplenishmentWhereInput;
    some?: Prisma.PettyCashReplenishmentWhereInput;
    none?: Prisma.PettyCashReplenishmentWhereInput;
};
export type PettyCashReplenishmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PettyCashReplenishmentTenantIdRequestNoCompoundUniqueInput = {
    tenantId: string;
    requestNo: string;
};
export type PettyCashReplenishmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    requestNo?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    referenceNo?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PettyCashReplenishmentAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PettyCashReplenishmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    requestNo?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    referenceNo?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PettyCashReplenishmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    cashAccountId?: Prisma.SortOrder;
    requestNo?: Prisma.SortOrder;
    requestDate?: Prisma.SortOrder;
    referenceNo?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PettyCashReplenishmentSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PettyCashReplenishmentCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput> | Prisma.PettyCashReplenishmentCreateWithoutTenantInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyTenantInputEnvelope;
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
};
export type PettyCashReplenishmentUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput> | Prisma.PettyCashReplenishmentCreateWithoutTenantInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyTenantInputEnvelope;
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
};
export type PettyCashReplenishmentUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput> | Prisma.PettyCashReplenishmentCreateWithoutTenantInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutTenantInput | Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyTenantInputEnvelope;
    set?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    disconnect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    delete?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    update?: Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutTenantInput | Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutTenantInput | Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PettyCashReplenishmentScalarWhereInput | Prisma.PettyCashReplenishmentScalarWhereInput[];
};
export type PettyCashReplenishmentUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput> | Prisma.PettyCashReplenishmentCreateWithoutTenantInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutTenantInput | Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyTenantInputEnvelope;
    set?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    disconnect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    delete?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    update?: Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutTenantInput | Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutTenantInput | Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.PettyCashReplenishmentScalarWhereInput | Prisma.PettyCashReplenishmentScalarWhereInput[];
};
export type PettyCashReplenishmentCreateNestedManyWithoutCashAccountInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput> | Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyCashAccountInputEnvelope;
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
};
export type PettyCashReplenishmentUncheckedCreateNestedManyWithoutCashAccountInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput> | Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyCashAccountInputEnvelope;
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
};
export type PettyCashReplenishmentUpdateManyWithoutCashAccountNestedInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput> | Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput[];
    upsert?: Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutCashAccountInput | Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutCashAccountInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyCashAccountInputEnvelope;
    set?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    disconnect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    delete?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    update?: Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutCashAccountInput | Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutCashAccountInput[];
    updateMany?: Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutCashAccountInput | Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutCashAccountInput[];
    deleteMany?: Prisma.PettyCashReplenishmentScalarWhereInput | Prisma.PettyCashReplenishmentScalarWhereInput[];
};
export type PettyCashReplenishmentUncheckedUpdateManyWithoutCashAccountNestedInput = {
    create?: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput> | Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput[] | Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput[];
    connectOrCreate?: Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput | Prisma.PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput[];
    upsert?: Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutCashAccountInput | Prisma.PettyCashReplenishmentUpsertWithWhereUniqueWithoutCashAccountInput[];
    createMany?: Prisma.PettyCashReplenishmentCreateManyCashAccountInputEnvelope;
    set?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    disconnect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    delete?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    connect?: Prisma.PettyCashReplenishmentWhereUniqueInput | Prisma.PettyCashReplenishmentWhereUniqueInput[];
    update?: Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutCashAccountInput | Prisma.PettyCashReplenishmentUpdateWithWhereUniqueWithoutCashAccountInput[];
    updateMany?: Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutCashAccountInput | Prisma.PettyCashReplenishmentUpdateManyWithWhereWithoutCashAccountInput[];
    deleteMany?: Prisma.PettyCashReplenishmentScalarWhereInput | Prisma.PettyCashReplenishmentScalarWhereInput[];
};
export type PettyCashReplenishmentCreateWithoutTenantInput = {
    id?: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
    cashAccount: Prisma.CashAccountCreateNestedOneWithoutPettyCashReplenishmentsInput;
};
export type PettyCashReplenishmentUncheckedCreateWithoutTenantInput = {
    id?: string;
    cashAccountId: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PettyCashReplenishmentCreateOrConnectWithoutTenantInput = {
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput>;
};
export type PettyCashReplenishmentCreateManyTenantInputEnvelope = {
    data: Prisma.PettyCashReplenishmentCreateManyTenantInput | Prisma.PettyCashReplenishmentCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type PettyCashReplenishmentUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutTenantInput>;
};
export type PettyCashReplenishmentUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateWithoutTenantInput, Prisma.PettyCashReplenishmentUncheckedUpdateWithoutTenantInput>;
};
export type PettyCashReplenishmentUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.PettyCashReplenishmentScalarWhereInput;
    data: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateManyMutationInput, Prisma.PettyCashReplenishmentUncheckedUpdateManyWithoutTenantInput>;
};
export type PettyCashReplenishmentScalarWhereInput = {
    AND?: Prisma.PettyCashReplenishmentScalarWhereInput | Prisma.PettyCashReplenishmentScalarWhereInput[];
    OR?: Prisma.PettyCashReplenishmentScalarWhereInput[];
    NOT?: Prisma.PettyCashReplenishmentScalarWhereInput | Prisma.PettyCashReplenishmentScalarWhereInput[];
    id?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    tenantId?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    cashAccountId?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    requestNo?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    requestDate?: Prisma.DateTimeFilter<"PettyCashReplenishment"> | Date | string;
    referenceNo?: Prisma.StringNullableFilter<"PettyCashReplenishment"> | string | null;
    amount?: Prisma.DecimalFilter<"PettyCashReplenishment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"PettyCashReplenishment"> | string;
    notes?: Prisma.StringNullableFilter<"PettyCashReplenishment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PettyCashReplenishment"> | Date | string;
};
export type PettyCashReplenishmentCreateWithoutCashAccountInput = {
    id?: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutPettyCashReplenishmentsInput;
};
export type PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput = {
    id?: string;
    tenantId: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PettyCashReplenishmentCreateOrConnectWithoutCashAccountInput = {
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput>;
};
export type PettyCashReplenishmentCreateManyCashAccountInputEnvelope = {
    data: Prisma.PettyCashReplenishmentCreateManyCashAccountInput | Prisma.PettyCashReplenishmentCreateManyCashAccountInput[];
    skipDuplicates?: boolean;
};
export type PettyCashReplenishmentUpsertWithWhereUniqueWithoutCashAccountInput = {
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedUpdateWithoutCashAccountInput>;
    create: Prisma.XOR<Prisma.PettyCashReplenishmentCreateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedCreateWithoutCashAccountInput>;
};
export type PettyCashReplenishmentUpdateWithWhereUniqueWithoutCashAccountInput = {
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateWithoutCashAccountInput, Prisma.PettyCashReplenishmentUncheckedUpdateWithoutCashAccountInput>;
};
export type PettyCashReplenishmentUpdateManyWithWhereWithoutCashAccountInput = {
    where: Prisma.PettyCashReplenishmentScalarWhereInput;
    data: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateManyMutationInput, Prisma.PettyCashReplenishmentUncheckedUpdateManyWithoutCashAccountInput>;
};
export type PettyCashReplenishmentCreateManyTenantInput = {
    id?: string;
    cashAccountId: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PettyCashReplenishmentUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cashAccount?: Prisma.CashAccountUpdateOneRequiredWithoutPettyCashReplenishmentsNestedInput;
};
export type PettyCashReplenishmentUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PettyCashReplenishmentUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cashAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PettyCashReplenishmentCreateManyCashAccountInput = {
    id?: string;
    tenantId: string;
    requestNo: string;
    requestDate: Date | string;
    referenceNo?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type PettyCashReplenishmentUpdateWithoutCashAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutPettyCashReplenishmentsNestedInput;
};
export type PettyCashReplenishmentUncheckedUpdateWithoutCashAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PettyCashReplenishmentUncheckedUpdateManyWithoutCashAccountInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestNo?: Prisma.StringFieldUpdateOperationsInput | string;
    requestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    referenceNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PettyCashReplenishmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    requestNo?: boolean;
    requestDate?: boolean;
    referenceNo?: boolean;
    amount?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pettyCashReplenishment"]>;
export type PettyCashReplenishmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    requestNo?: boolean;
    requestDate?: boolean;
    referenceNo?: boolean;
    amount?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pettyCashReplenishment"]>;
export type PettyCashReplenishmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    requestNo?: boolean;
    requestDate?: boolean;
    referenceNo?: boolean;
    amount?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pettyCashReplenishment"]>;
export type PettyCashReplenishmentSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    cashAccountId?: boolean;
    requestNo?: boolean;
    requestDate?: boolean;
    referenceNo?: boolean;
    amount?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
};
export type PettyCashReplenishmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "cashAccountId" | "requestNo" | "requestDate" | "referenceNo" | "amount" | "status" | "notes" | "createdAt", ExtArgs["result"]["pettyCashReplenishment"]>;
export type PettyCashReplenishmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
};
export type PettyCashReplenishmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
};
export type PettyCashReplenishmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    cashAccount?: boolean | Prisma.CashAccountDefaultArgs<ExtArgs>;
};
export type $PettyCashReplenishmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PettyCashReplenishment";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        cashAccount: Prisma.$CashAccountPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        cashAccountId: string;
        requestNo: string;
        requestDate: Date;
        referenceNo: string | null;
        amount: runtime.Decimal;
        status: string;
        notes: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["pettyCashReplenishment"]>;
    composites: {};
};
export type PettyCashReplenishmentGetPayload<S extends boolean | null | undefined | PettyCashReplenishmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload, S>;
export type PettyCashReplenishmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PettyCashReplenishmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PettyCashReplenishmentCountAggregateInputType | true;
};
export interface PettyCashReplenishmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PettyCashReplenishment'];
        meta: {
            name: 'PettyCashReplenishment';
        };
    };
    findUnique<T extends PettyCashReplenishmentFindUniqueArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PettyCashReplenishmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PettyCashReplenishmentFindFirstArgs>(args?: Prisma.SelectSubset<T, PettyCashReplenishmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PettyCashReplenishmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PettyCashReplenishmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PettyCashReplenishmentFindManyArgs>(args?: Prisma.SelectSubset<T, PettyCashReplenishmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PettyCashReplenishmentCreateArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentCreateArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PettyCashReplenishmentCreateManyArgs>(args?: Prisma.SelectSubset<T, PettyCashReplenishmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PettyCashReplenishmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PettyCashReplenishmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PettyCashReplenishmentDeleteArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentDeleteArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PettyCashReplenishmentUpdateArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentUpdateArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PettyCashReplenishmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PettyCashReplenishmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PettyCashReplenishmentUpdateManyArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PettyCashReplenishmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PettyCashReplenishmentUpsertArgs>(args: Prisma.SelectSubset<T, PettyCashReplenishmentUpsertArgs<ExtArgs>>): Prisma.Prisma__PettyCashReplenishmentClient<runtime.Types.Result.GetResult<Prisma.$PettyCashReplenishmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PettyCashReplenishmentCountArgs>(args?: Prisma.Subset<T, PettyCashReplenishmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PettyCashReplenishmentCountAggregateOutputType> : number>;
    aggregate<T extends PettyCashReplenishmentAggregateArgs>(args: Prisma.Subset<T, PettyCashReplenishmentAggregateArgs>): Prisma.PrismaPromise<GetPettyCashReplenishmentAggregateType<T>>;
    groupBy<T extends PettyCashReplenishmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PettyCashReplenishmentGroupByArgs['orderBy'];
    } : {
        orderBy?: PettyCashReplenishmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PettyCashReplenishmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPettyCashReplenishmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PettyCashReplenishmentFieldRefs;
}
export interface Prisma__PettyCashReplenishmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    cashAccount<T extends Prisma.CashAccountDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CashAccountDefaultArgs<ExtArgs>>): Prisma.Prisma__CashAccountClient<runtime.Types.Result.GetResult<Prisma.$CashAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PettyCashReplenishmentFieldRefs {
    readonly id: Prisma.FieldRef<"PettyCashReplenishment", 'String'>;
    readonly tenantId: Prisma.FieldRef<"PettyCashReplenishment", 'String'>;
    readonly cashAccountId: Prisma.FieldRef<"PettyCashReplenishment", 'String'>;
    readonly requestNo: Prisma.FieldRef<"PettyCashReplenishment", 'String'>;
    readonly requestDate: Prisma.FieldRef<"PettyCashReplenishment", 'DateTime'>;
    readonly referenceNo: Prisma.FieldRef<"PettyCashReplenishment", 'String'>;
    readonly amount: Prisma.FieldRef<"PettyCashReplenishment", 'Decimal'>;
    readonly status: Prisma.FieldRef<"PettyCashReplenishment", 'String'>;
    readonly notes: Prisma.FieldRef<"PettyCashReplenishment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PettyCashReplenishment", 'DateTime'>;
}
export type PettyCashReplenishmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
};
export type PettyCashReplenishmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
};
export type PettyCashReplenishmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    where?: Prisma.PettyCashReplenishmentWhereInput;
    orderBy?: Prisma.PettyCashReplenishmentOrderByWithRelationInput | Prisma.PettyCashReplenishmentOrderByWithRelationInput[];
    cursor?: Prisma.PettyCashReplenishmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PettyCashReplenishmentScalarFieldEnum | Prisma.PettyCashReplenishmentScalarFieldEnum[];
};
export type PettyCashReplenishmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    where?: Prisma.PettyCashReplenishmentWhereInput;
    orderBy?: Prisma.PettyCashReplenishmentOrderByWithRelationInput | Prisma.PettyCashReplenishmentOrderByWithRelationInput[];
    cursor?: Prisma.PettyCashReplenishmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PettyCashReplenishmentScalarFieldEnum | Prisma.PettyCashReplenishmentScalarFieldEnum[];
};
export type PettyCashReplenishmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    where?: Prisma.PettyCashReplenishmentWhereInput;
    orderBy?: Prisma.PettyCashReplenishmentOrderByWithRelationInput | Prisma.PettyCashReplenishmentOrderByWithRelationInput[];
    cursor?: Prisma.PettyCashReplenishmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PettyCashReplenishmentScalarFieldEnum | Prisma.PettyCashReplenishmentScalarFieldEnum[];
};
export type PettyCashReplenishmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PettyCashReplenishmentCreateInput, Prisma.PettyCashReplenishmentUncheckedCreateInput>;
};
export type PettyCashReplenishmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PettyCashReplenishmentCreateManyInput | Prisma.PettyCashReplenishmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PettyCashReplenishmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    data: Prisma.PettyCashReplenishmentCreateManyInput | Prisma.PettyCashReplenishmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PettyCashReplenishmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PettyCashReplenishmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateInput, Prisma.PettyCashReplenishmentUncheckedUpdateInput>;
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
};
export type PettyCashReplenishmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateManyMutationInput, Prisma.PettyCashReplenishmentUncheckedUpdateManyInput>;
    where?: Prisma.PettyCashReplenishmentWhereInput;
    limit?: number;
};
export type PettyCashReplenishmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateManyMutationInput, Prisma.PettyCashReplenishmentUncheckedUpdateManyInput>;
    where?: Prisma.PettyCashReplenishmentWhereInput;
    limit?: number;
    include?: Prisma.PettyCashReplenishmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PettyCashReplenishmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PettyCashReplenishmentCreateInput, Prisma.PettyCashReplenishmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PettyCashReplenishmentUpdateInput, Prisma.PettyCashReplenishmentUncheckedUpdateInput>;
};
export type PettyCashReplenishmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
    where: Prisma.PettyCashReplenishmentWhereUniqueInput;
};
export type PettyCashReplenishmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PettyCashReplenishmentWhereInput;
    limit?: number;
};
export type PettyCashReplenishmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PettyCashReplenishmentSelect<ExtArgs> | null;
    omit?: Prisma.PettyCashReplenishmentOmit<ExtArgs> | null;
    include?: Prisma.PettyCashReplenishmentInclude<ExtArgs> | null;
};
