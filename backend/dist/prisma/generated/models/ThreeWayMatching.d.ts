import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ThreeWayMatchingModel = runtime.Types.Result.DefaultSelection<Prisma.$ThreeWayMatchingPayload>;
export type AggregateThreeWayMatching = {
    _count: ThreeWayMatchingCountAggregateOutputType | null;
    _avg: ThreeWayMatchingAvgAggregateOutputType | null;
    _sum: ThreeWayMatchingSumAggregateOutputType | null;
    _min: ThreeWayMatchingMinAggregateOutputType | null;
    _max: ThreeWayMatchingMaxAggregateOutputType | null;
};
export type ThreeWayMatchingAvgAggregateOutputType = {
    varianceAmount: runtime.Decimal | null;
};
export type ThreeWayMatchingSumAggregateOutputType = {
    varianceAmount: runtime.Decimal | null;
};
export type ThreeWayMatchingMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    invoiceId: string | null;
    orderId: string | null;
    receiptId: string | null;
    matchDate: Date | null;
    status: string | null;
    discrepancyNotes: string | null;
    varianceAmount: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ThreeWayMatchingMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    invoiceId: string | null;
    orderId: string | null;
    receiptId: string | null;
    matchDate: Date | null;
    status: string | null;
    discrepancyNotes: string | null;
    varianceAmount: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ThreeWayMatchingCountAggregateOutputType = {
    id: number;
    tenantId: number;
    code: number;
    invoiceId: number;
    orderId: number;
    receiptId: number;
    matchDate: number;
    status: number;
    discrepancyNotes: number;
    varianceAmount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ThreeWayMatchingAvgAggregateInputType = {
    varianceAmount?: true;
};
export type ThreeWayMatchingSumAggregateInputType = {
    varianceAmount?: true;
};
export type ThreeWayMatchingMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    invoiceId?: true;
    orderId?: true;
    receiptId?: true;
    matchDate?: true;
    status?: true;
    discrepancyNotes?: true;
    varianceAmount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ThreeWayMatchingMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    invoiceId?: true;
    orderId?: true;
    receiptId?: true;
    matchDate?: true;
    status?: true;
    discrepancyNotes?: true;
    varianceAmount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ThreeWayMatchingCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    invoiceId?: true;
    orderId?: true;
    receiptId?: true;
    matchDate?: true;
    status?: true;
    discrepancyNotes?: true;
    varianceAmount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ThreeWayMatchingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ThreeWayMatchingWhereInput;
    orderBy?: Prisma.ThreeWayMatchingOrderByWithRelationInput | Prisma.ThreeWayMatchingOrderByWithRelationInput[];
    cursor?: Prisma.ThreeWayMatchingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ThreeWayMatchingCountAggregateInputType;
    _avg?: ThreeWayMatchingAvgAggregateInputType;
    _sum?: ThreeWayMatchingSumAggregateInputType;
    _min?: ThreeWayMatchingMinAggregateInputType;
    _max?: ThreeWayMatchingMaxAggregateInputType;
};
export type GetThreeWayMatchingAggregateType<T extends ThreeWayMatchingAggregateArgs> = {
    [P in keyof T & keyof AggregateThreeWayMatching]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateThreeWayMatching[P]> : Prisma.GetScalarType<T[P], AggregateThreeWayMatching[P]>;
};
export type ThreeWayMatchingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ThreeWayMatchingWhereInput;
    orderBy?: Prisma.ThreeWayMatchingOrderByWithAggregationInput | Prisma.ThreeWayMatchingOrderByWithAggregationInput[];
    by: Prisma.ThreeWayMatchingScalarFieldEnum[] | Prisma.ThreeWayMatchingScalarFieldEnum;
    having?: Prisma.ThreeWayMatchingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ThreeWayMatchingCountAggregateInputType | true;
    _avg?: ThreeWayMatchingAvgAggregateInputType;
    _sum?: ThreeWayMatchingSumAggregateInputType;
    _min?: ThreeWayMatchingMinAggregateInputType;
    _max?: ThreeWayMatchingMaxAggregateInputType;
};
export type ThreeWayMatchingGroupByOutputType = {
    id: string;
    tenantId: string;
    code: string;
    invoiceId: string;
    orderId: string;
    receiptId: string;
    matchDate: Date;
    status: string;
    discrepancyNotes: string | null;
    varianceAmount: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: ThreeWayMatchingCountAggregateOutputType | null;
    _avg: ThreeWayMatchingAvgAggregateOutputType | null;
    _sum: ThreeWayMatchingSumAggregateOutputType | null;
    _min: ThreeWayMatchingMinAggregateOutputType | null;
    _max: ThreeWayMatchingMaxAggregateOutputType | null;
};
export type GetThreeWayMatchingGroupByPayload<T extends ThreeWayMatchingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ThreeWayMatchingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ThreeWayMatchingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ThreeWayMatchingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ThreeWayMatchingGroupByOutputType[P]>;
}>>;
export type ThreeWayMatchingWhereInput = {
    AND?: Prisma.ThreeWayMatchingWhereInput | Prisma.ThreeWayMatchingWhereInput[];
    OR?: Prisma.ThreeWayMatchingWhereInput[];
    NOT?: Prisma.ThreeWayMatchingWhereInput | Prisma.ThreeWayMatchingWhereInput[];
    id?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    tenantId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    code?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    invoiceId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    orderId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    receiptId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    matchDate?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    status?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    discrepancyNotes?: Prisma.StringNullableFilter<"ThreeWayMatching"> | string | null;
    varianceAmount?: Prisma.DecimalFilter<"ThreeWayMatching"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    invoice?: Prisma.XOR<Prisma.PurchaseInvoiceScalarRelationFilter, Prisma.PurchaseInvoiceWhereInput>;
    order?: Prisma.XOR<Prisma.PurchaseOrderScalarRelationFilter, Prisma.PurchaseOrderWhereInput>;
    receipt?: Prisma.XOR<Prisma.GoodsReceiptNoteScalarRelationFilter, Prisma.GoodsReceiptNoteWhereInput>;
};
export type ThreeWayMatchingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    matchDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    discrepancyNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    varianceAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    invoice?: Prisma.PurchaseInvoiceOrderByWithRelationInput;
    order?: Prisma.PurchaseOrderOrderByWithRelationInput;
    receipt?: Prisma.GoodsReceiptNoteOrderByWithRelationInput;
};
export type ThreeWayMatchingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.ThreeWayMatchingTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.ThreeWayMatchingWhereInput | Prisma.ThreeWayMatchingWhereInput[];
    OR?: Prisma.ThreeWayMatchingWhereInput[];
    NOT?: Prisma.ThreeWayMatchingWhereInput | Prisma.ThreeWayMatchingWhereInput[];
    tenantId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    code?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    invoiceId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    orderId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    receiptId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    matchDate?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    status?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    discrepancyNotes?: Prisma.StringNullableFilter<"ThreeWayMatching"> | string | null;
    varianceAmount?: Prisma.DecimalFilter<"ThreeWayMatching"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    invoice?: Prisma.XOR<Prisma.PurchaseInvoiceScalarRelationFilter, Prisma.PurchaseInvoiceWhereInput>;
    order?: Prisma.XOR<Prisma.PurchaseOrderScalarRelationFilter, Prisma.PurchaseOrderWhereInput>;
    receipt?: Prisma.XOR<Prisma.GoodsReceiptNoteScalarRelationFilter, Prisma.GoodsReceiptNoteWhereInput>;
}, "id" | "tenantId_code">;
export type ThreeWayMatchingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    matchDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    discrepancyNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    varianceAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ThreeWayMatchingCountOrderByAggregateInput;
    _avg?: Prisma.ThreeWayMatchingAvgOrderByAggregateInput;
    _max?: Prisma.ThreeWayMatchingMaxOrderByAggregateInput;
    _min?: Prisma.ThreeWayMatchingMinOrderByAggregateInput;
    _sum?: Prisma.ThreeWayMatchingSumOrderByAggregateInput;
};
export type ThreeWayMatchingScalarWhereWithAggregatesInput = {
    AND?: Prisma.ThreeWayMatchingScalarWhereWithAggregatesInput | Prisma.ThreeWayMatchingScalarWhereWithAggregatesInput[];
    OR?: Prisma.ThreeWayMatchingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ThreeWayMatchingScalarWhereWithAggregatesInput | Prisma.ThreeWayMatchingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ThreeWayMatching"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"ThreeWayMatching"> | string;
    code?: Prisma.StringWithAggregatesFilter<"ThreeWayMatching"> | string;
    invoiceId?: Prisma.StringWithAggregatesFilter<"ThreeWayMatching"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"ThreeWayMatching"> | string;
    receiptId?: Prisma.StringWithAggregatesFilter<"ThreeWayMatching"> | string;
    matchDate?: Prisma.DateTimeWithAggregatesFilter<"ThreeWayMatching"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"ThreeWayMatching"> | string;
    discrepancyNotes?: Prisma.StringNullableWithAggregatesFilter<"ThreeWayMatching"> | string | null;
    varianceAmount?: Prisma.DecimalWithAggregatesFilter<"ThreeWayMatching"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ThreeWayMatching"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ThreeWayMatching"> | Date | string;
};
export type ThreeWayMatchingCreateInput = {
    id?: string;
    code: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutThreeWayMatchingsInput;
    invoice: Prisma.PurchaseInvoiceCreateNestedOneWithoutThreeWayMatchingsInput;
    order: Prisma.PurchaseOrderCreateNestedOneWithoutThreeWayMatchingsInput;
    receipt: Prisma.GoodsReceiptNoteCreateNestedOneWithoutThreeWayMatchingsInput;
};
export type ThreeWayMatchingUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    invoiceId: string;
    orderId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    receipt?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
};
export type ThreeWayMatchingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingCreateManyInput = {
    id?: string;
    tenantId: string;
    code: string;
    invoiceId: string;
    orderId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingListRelationFilter = {
    every?: Prisma.ThreeWayMatchingWhereInput;
    some?: Prisma.ThreeWayMatchingWhereInput;
    none?: Prisma.ThreeWayMatchingWhereInput;
};
export type ThreeWayMatchingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ThreeWayMatchingTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type ThreeWayMatchingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    matchDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    discrepancyNotes?: Prisma.SortOrder;
    varianceAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ThreeWayMatchingAvgOrderByAggregateInput = {
    varianceAmount?: Prisma.SortOrder;
};
export type ThreeWayMatchingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    matchDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    discrepancyNotes?: Prisma.SortOrder;
    varianceAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ThreeWayMatchingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    matchDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    discrepancyNotes?: Prisma.SortOrder;
    varianceAmount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ThreeWayMatchingSumOrderByAggregateInput = {
    varianceAmount?: Prisma.SortOrder;
};
export type ThreeWayMatchingCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput> | Prisma.ThreeWayMatchingCreateWithoutTenantInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyTenantInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput> | Prisma.ThreeWayMatchingCreateWithoutTenantInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyTenantInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput> | Prisma.ThreeWayMatchingCreateWithoutTenantInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutTenantInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyTenantInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutTenantInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutTenantInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput> | Prisma.ThreeWayMatchingCreateWithoutTenantInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutTenantInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyTenantInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutTenantInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutTenantInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput> | Prisma.ThreeWayMatchingCreateWithoutOrderInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyOrderInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput> | Prisma.ThreeWayMatchingCreateWithoutOrderInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyOrderInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput> | Prisma.ThreeWayMatchingCreateWithoutOrderInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutOrderInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyOrderInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutOrderInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutOrderInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput> | Prisma.ThreeWayMatchingCreateWithoutOrderInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutOrderInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyOrderInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutOrderInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutOrderInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput> | Prisma.ThreeWayMatchingCreateWithoutInvoiceInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyInvoiceInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput> | Prisma.ThreeWayMatchingCreateWithoutInvoiceInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyInvoiceInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput> | Prisma.ThreeWayMatchingCreateWithoutInvoiceInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyInvoiceInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutInvoiceInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput> | Prisma.ThreeWayMatchingCreateWithoutInvoiceInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyInvoiceInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutInvoiceInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput> | Prisma.ThreeWayMatchingCreateWithoutReceiptInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyReceiptInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput> | Prisma.ThreeWayMatchingCreateWithoutReceiptInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyReceiptInputEnvelope;
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
};
export type ThreeWayMatchingUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput> | Prisma.ThreeWayMatchingCreateWithoutReceiptInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutReceiptInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyReceiptInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutReceiptInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutReceiptInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput> | Prisma.ThreeWayMatchingCreateWithoutReceiptInput[] | Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput[];
    connectOrCreate?: Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput | Prisma.ThreeWayMatchingCreateOrConnectWithoutReceiptInput[];
    upsert?: Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutReceiptInput | Prisma.ThreeWayMatchingUpsertWithWhereUniqueWithoutReceiptInput[];
    createMany?: Prisma.ThreeWayMatchingCreateManyReceiptInputEnvelope;
    set?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    disconnect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    delete?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    connect?: Prisma.ThreeWayMatchingWhereUniqueInput | Prisma.ThreeWayMatchingWhereUniqueInput[];
    update?: Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutReceiptInput | Prisma.ThreeWayMatchingUpdateWithWhereUniqueWithoutReceiptInput[];
    updateMany?: Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutReceiptInput | Prisma.ThreeWayMatchingUpdateManyWithWhereWithoutReceiptInput[];
    deleteMany?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
};
export type ThreeWayMatchingCreateWithoutTenantInput = {
    id?: string;
    code: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoice: Prisma.PurchaseInvoiceCreateNestedOneWithoutThreeWayMatchingsInput;
    order: Prisma.PurchaseOrderCreateNestedOneWithoutThreeWayMatchingsInput;
    receipt: Prisma.GoodsReceiptNoteCreateNestedOneWithoutThreeWayMatchingsInput;
};
export type ThreeWayMatchingUncheckedCreateWithoutTenantInput = {
    id?: string;
    code: string;
    invoiceId: string;
    orderId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingCreateOrConnectWithoutTenantInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput>;
};
export type ThreeWayMatchingCreateManyTenantInputEnvelope = {
    data: Prisma.ThreeWayMatchingCreateManyTenantInput | Prisma.ThreeWayMatchingCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type ThreeWayMatchingUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutTenantInput>;
};
export type ThreeWayMatchingUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutTenantInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutTenantInput>;
};
export type ThreeWayMatchingUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.ThreeWayMatchingScalarWhereInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateManyMutationInput, Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutTenantInput>;
};
export type ThreeWayMatchingScalarWhereInput = {
    AND?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
    OR?: Prisma.ThreeWayMatchingScalarWhereInput[];
    NOT?: Prisma.ThreeWayMatchingScalarWhereInput | Prisma.ThreeWayMatchingScalarWhereInput[];
    id?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    tenantId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    code?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    invoiceId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    orderId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    receiptId?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    matchDate?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    status?: Prisma.StringFilter<"ThreeWayMatching"> | string;
    discrepancyNotes?: Prisma.StringNullableFilter<"ThreeWayMatching"> | string | null;
    varianceAmount?: Prisma.DecimalFilter<"ThreeWayMatching"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ThreeWayMatching"> | Date | string;
};
export type ThreeWayMatchingCreateWithoutOrderInput = {
    id?: string;
    code: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutThreeWayMatchingsInput;
    invoice: Prisma.PurchaseInvoiceCreateNestedOneWithoutThreeWayMatchingsInput;
    receipt: Prisma.GoodsReceiptNoteCreateNestedOneWithoutThreeWayMatchingsInput;
};
export type ThreeWayMatchingUncheckedCreateWithoutOrderInput = {
    id?: string;
    tenantId: string;
    code: string;
    invoiceId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingCreateOrConnectWithoutOrderInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput>;
};
export type ThreeWayMatchingCreateManyOrderInputEnvelope = {
    data: Prisma.ThreeWayMatchingCreateManyOrderInput | Prisma.ThreeWayMatchingCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type ThreeWayMatchingUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutOrderInput>;
};
export type ThreeWayMatchingUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutOrderInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutOrderInput>;
};
export type ThreeWayMatchingUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.ThreeWayMatchingScalarWhereInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateManyMutationInput, Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutOrderInput>;
};
export type ThreeWayMatchingCreateWithoutInvoiceInput = {
    id?: string;
    code: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutThreeWayMatchingsInput;
    order: Prisma.PurchaseOrderCreateNestedOneWithoutThreeWayMatchingsInput;
    receipt: Prisma.GoodsReceiptNoteCreateNestedOneWithoutThreeWayMatchingsInput;
};
export type ThreeWayMatchingUncheckedCreateWithoutInvoiceInput = {
    id?: string;
    tenantId: string;
    code: string;
    orderId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingCreateOrConnectWithoutInvoiceInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput>;
};
export type ThreeWayMatchingCreateManyInvoiceInputEnvelope = {
    data: Prisma.ThreeWayMatchingCreateManyInvoiceInput | Prisma.ThreeWayMatchingCreateManyInvoiceInput[];
    skipDuplicates?: boolean;
};
export type ThreeWayMatchingUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutInvoiceInput>;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutInvoiceInput>;
};
export type ThreeWayMatchingUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutInvoiceInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutInvoiceInput>;
};
export type ThreeWayMatchingUpdateManyWithWhereWithoutInvoiceInput = {
    where: Prisma.ThreeWayMatchingScalarWhereInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateManyMutationInput, Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutInvoiceInput>;
};
export type ThreeWayMatchingCreateWithoutReceiptInput = {
    id?: string;
    code: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutThreeWayMatchingsInput;
    invoice: Prisma.PurchaseInvoiceCreateNestedOneWithoutThreeWayMatchingsInput;
    order: Prisma.PurchaseOrderCreateNestedOneWithoutThreeWayMatchingsInput;
};
export type ThreeWayMatchingUncheckedCreateWithoutReceiptInput = {
    id?: string;
    tenantId: string;
    code: string;
    invoiceId: string;
    orderId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingCreateOrConnectWithoutReceiptInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput>;
};
export type ThreeWayMatchingCreateManyReceiptInputEnvelope = {
    data: Prisma.ThreeWayMatchingCreateManyReceiptInput | Prisma.ThreeWayMatchingCreateManyReceiptInput[];
    skipDuplicates?: boolean;
};
export type ThreeWayMatchingUpsertWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutReceiptInput>;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedCreateWithoutReceiptInput>;
};
export type ThreeWayMatchingUpdateWithWhereUniqueWithoutReceiptInput = {
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateWithoutReceiptInput, Prisma.ThreeWayMatchingUncheckedUpdateWithoutReceiptInput>;
};
export type ThreeWayMatchingUpdateManyWithWhereWithoutReceiptInput = {
    where: Prisma.ThreeWayMatchingScalarWhereInput;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateManyMutationInput, Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptInput>;
};
export type ThreeWayMatchingCreateManyTenantInput = {
    id?: string;
    code: string;
    invoiceId: string;
    orderId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoice?: Prisma.PurchaseInvoiceUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    receipt?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
};
export type ThreeWayMatchingUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingCreateManyOrderInput = {
    id?: string;
    tenantId: string;
    code: string;
    invoiceId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    receipt?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
};
export type ThreeWayMatchingUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingCreateManyInvoiceInput = {
    id?: string;
    tenantId: string;
    code: string;
    orderId: string;
    receiptId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    receipt?: Prisma.GoodsReceiptNoteUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
};
export type ThreeWayMatchingUncheckedUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingCreateManyReceiptInput = {
    id?: string;
    tenantId: string;
    code: string;
    invoiceId: string;
    orderId: string;
    matchDate?: Date | string;
    status?: string;
    discrepancyNotes?: string | null;
    varianceAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ThreeWayMatchingUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneRequiredWithoutThreeWayMatchingsNestedInput;
};
export type ThreeWayMatchingUncheckedUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingUncheckedUpdateManyWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    matchDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    discrepancyNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    varianceAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ThreeWayMatchingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    invoiceId?: boolean;
    orderId?: boolean;
    receiptId?: boolean;
    matchDate?: boolean;
    status?: boolean;
    discrepancyNotes?: boolean;
    varianceAmount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.PurchaseInvoiceDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["threeWayMatching"]>;
export type ThreeWayMatchingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    invoiceId?: boolean;
    orderId?: boolean;
    receiptId?: boolean;
    matchDate?: boolean;
    status?: boolean;
    discrepancyNotes?: boolean;
    varianceAmount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.PurchaseInvoiceDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["threeWayMatching"]>;
export type ThreeWayMatchingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    invoiceId?: boolean;
    orderId?: boolean;
    receiptId?: boolean;
    matchDate?: boolean;
    status?: boolean;
    discrepancyNotes?: boolean;
    varianceAmount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.PurchaseInvoiceDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["threeWayMatching"]>;
export type ThreeWayMatchingSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    invoiceId?: boolean;
    orderId?: boolean;
    receiptId?: boolean;
    matchDate?: boolean;
    status?: boolean;
    discrepancyNotes?: boolean;
    varianceAmount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ThreeWayMatchingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "code" | "invoiceId" | "orderId" | "receiptId" | "matchDate" | "status" | "discrepancyNotes" | "varianceAmount" | "createdAt" | "updatedAt", ExtArgs["result"]["threeWayMatching"]>;
export type ThreeWayMatchingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.PurchaseInvoiceDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
};
export type ThreeWayMatchingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.PurchaseInvoiceDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
};
export type ThreeWayMatchingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.PurchaseInvoiceDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.PurchaseOrderDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>;
};
export type $ThreeWayMatchingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ThreeWayMatching";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        invoice: Prisma.$PurchaseInvoicePayload<ExtArgs>;
        order: Prisma.$PurchaseOrderPayload<ExtArgs>;
        receipt: Prisma.$GoodsReceiptNotePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        code: string;
        invoiceId: string;
        orderId: string;
        receiptId: string;
        matchDate: Date;
        status: string;
        discrepancyNotes: string | null;
        varianceAmount: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["threeWayMatching"]>;
    composites: {};
};
export type ThreeWayMatchingGetPayload<S extends boolean | null | undefined | ThreeWayMatchingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload, S>;
export type ThreeWayMatchingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ThreeWayMatchingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ThreeWayMatchingCountAggregateInputType | true;
};
export interface ThreeWayMatchingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ThreeWayMatching'];
        meta: {
            name: 'ThreeWayMatching';
        };
    };
    findUnique<T extends ThreeWayMatchingFindUniqueArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ThreeWayMatchingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ThreeWayMatchingFindFirstArgs>(args?: Prisma.SelectSubset<T, ThreeWayMatchingFindFirstArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ThreeWayMatchingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ThreeWayMatchingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ThreeWayMatchingFindManyArgs>(args?: Prisma.SelectSubset<T, ThreeWayMatchingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ThreeWayMatchingCreateArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingCreateArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ThreeWayMatchingCreateManyArgs>(args?: Prisma.SelectSubset<T, ThreeWayMatchingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ThreeWayMatchingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ThreeWayMatchingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ThreeWayMatchingDeleteArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingDeleteArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ThreeWayMatchingUpdateArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingUpdateArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ThreeWayMatchingDeleteManyArgs>(args?: Prisma.SelectSubset<T, ThreeWayMatchingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ThreeWayMatchingUpdateManyArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ThreeWayMatchingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ThreeWayMatchingUpsertArgs>(args: Prisma.SelectSubset<T, ThreeWayMatchingUpsertArgs<ExtArgs>>): Prisma.Prisma__ThreeWayMatchingClient<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ThreeWayMatchingCountArgs>(args?: Prisma.Subset<T, ThreeWayMatchingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ThreeWayMatchingCountAggregateOutputType> : number>;
    aggregate<T extends ThreeWayMatchingAggregateArgs>(args: Prisma.Subset<T, ThreeWayMatchingAggregateArgs>): Prisma.PrismaPromise<GetThreeWayMatchingAggregateType<T>>;
    groupBy<T extends ThreeWayMatchingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ThreeWayMatchingGroupByArgs['orderBy'];
    } : {
        orderBy?: ThreeWayMatchingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ThreeWayMatchingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThreeWayMatchingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ThreeWayMatchingFieldRefs;
}
export interface Prisma__ThreeWayMatchingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    invoice<T extends Prisma.PurchaseInvoiceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseInvoiceDefaultArgs<ExtArgs>>): Prisma.Prisma__PurchaseInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PurchaseInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.PurchaseOrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PurchaseOrderDefaultArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    receipt<T extends Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNoteDefaultArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ThreeWayMatchingFieldRefs {
    readonly id: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly tenantId: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly code: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly invoiceId: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly orderId: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly receiptId: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly matchDate: Prisma.FieldRef<"ThreeWayMatching", 'DateTime'>;
    readonly status: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly discrepancyNotes: Prisma.FieldRef<"ThreeWayMatching", 'String'>;
    readonly varianceAmount: Prisma.FieldRef<"ThreeWayMatching", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"ThreeWayMatching", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ThreeWayMatching", 'DateTime'>;
}
export type ThreeWayMatchingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
};
export type ThreeWayMatchingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
};
export type ThreeWayMatchingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    where?: Prisma.ThreeWayMatchingWhereInput;
    orderBy?: Prisma.ThreeWayMatchingOrderByWithRelationInput | Prisma.ThreeWayMatchingOrderByWithRelationInput[];
    cursor?: Prisma.ThreeWayMatchingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ThreeWayMatchingScalarFieldEnum | Prisma.ThreeWayMatchingScalarFieldEnum[];
};
export type ThreeWayMatchingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    where?: Prisma.ThreeWayMatchingWhereInput;
    orderBy?: Prisma.ThreeWayMatchingOrderByWithRelationInput | Prisma.ThreeWayMatchingOrderByWithRelationInput[];
    cursor?: Prisma.ThreeWayMatchingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ThreeWayMatchingScalarFieldEnum | Prisma.ThreeWayMatchingScalarFieldEnum[];
};
export type ThreeWayMatchingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    where?: Prisma.ThreeWayMatchingWhereInput;
    orderBy?: Prisma.ThreeWayMatchingOrderByWithRelationInput | Prisma.ThreeWayMatchingOrderByWithRelationInput[];
    cursor?: Prisma.ThreeWayMatchingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ThreeWayMatchingScalarFieldEnum | Prisma.ThreeWayMatchingScalarFieldEnum[];
};
export type ThreeWayMatchingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ThreeWayMatchingCreateInput, Prisma.ThreeWayMatchingUncheckedCreateInput>;
};
export type ThreeWayMatchingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ThreeWayMatchingCreateManyInput | Prisma.ThreeWayMatchingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ThreeWayMatchingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    data: Prisma.ThreeWayMatchingCreateManyInput | Prisma.ThreeWayMatchingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ThreeWayMatchingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ThreeWayMatchingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateInput, Prisma.ThreeWayMatchingUncheckedUpdateInput>;
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
};
export type ThreeWayMatchingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateManyMutationInput, Prisma.ThreeWayMatchingUncheckedUpdateManyInput>;
    where?: Prisma.ThreeWayMatchingWhereInput;
    limit?: number;
};
export type ThreeWayMatchingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ThreeWayMatchingUpdateManyMutationInput, Prisma.ThreeWayMatchingUncheckedUpdateManyInput>;
    where?: Prisma.ThreeWayMatchingWhereInput;
    limit?: number;
    include?: Prisma.ThreeWayMatchingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ThreeWayMatchingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ThreeWayMatchingCreateInput, Prisma.ThreeWayMatchingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ThreeWayMatchingUpdateInput, Prisma.ThreeWayMatchingUncheckedUpdateInput>;
};
export type ThreeWayMatchingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
    where: Prisma.ThreeWayMatchingWhereUniqueInput;
};
export type ThreeWayMatchingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ThreeWayMatchingWhereInput;
    limit?: number;
};
export type ThreeWayMatchingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ThreeWayMatchingSelect<ExtArgs> | null;
    omit?: Prisma.ThreeWayMatchingOmit<ExtArgs> | null;
    include?: Prisma.ThreeWayMatchingInclude<ExtArgs> | null;
};
