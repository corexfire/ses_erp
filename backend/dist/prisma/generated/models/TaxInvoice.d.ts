import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type TaxInvoiceModel = runtime.Types.Result.DefaultSelection<Prisma.$TaxInvoicePayload>;
export type AggregateTaxInvoice = {
    _count: TaxInvoiceCountAggregateOutputType | null;
    _avg: TaxInvoiceAvgAggregateOutputType | null;
    _sum: TaxInvoiceSumAggregateOutputType | null;
    _min: TaxInvoiceMinAggregateOutputType | null;
    _max: TaxInvoiceMaxAggregateOutputType | null;
};
export type TaxInvoiceAvgAggregateOutputType = {
    baseAmount: runtime.Decimal | null;
    taxAmount: runtime.Decimal | null;
};
export type TaxInvoiceSumAggregateOutputType = {
    baseAmount: runtime.Decimal | null;
    taxAmount: runtime.Decimal | null;
};
export type TaxInvoiceMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    invoiceNo: string | null;
    invoiceDate: Date | null;
    customerId: string | null;
    supplierId: string | null;
    baseAmount: runtime.Decimal | null;
    taxAmount: runtime.Decimal | null;
    invoiceType: string | null;
    status: string | null;
    fpDate: Date | null;
    fpNumber: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TaxInvoiceMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    invoiceNo: string | null;
    invoiceDate: Date | null;
    customerId: string | null;
    supplierId: string | null;
    baseAmount: runtime.Decimal | null;
    taxAmount: runtime.Decimal | null;
    invoiceType: string | null;
    status: string | null;
    fpDate: Date | null;
    fpNumber: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TaxInvoiceCountAggregateOutputType = {
    id: number;
    tenantId: number;
    invoiceNo: number;
    invoiceDate: number;
    customerId: number;
    supplierId: number;
    baseAmount: number;
    taxAmount: number;
    invoiceType: number;
    status: number;
    fpDate: number;
    fpNumber: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TaxInvoiceAvgAggregateInputType = {
    baseAmount?: true;
    taxAmount?: true;
};
export type TaxInvoiceSumAggregateInputType = {
    baseAmount?: true;
    taxAmount?: true;
};
export type TaxInvoiceMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    invoiceNo?: true;
    invoiceDate?: true;
    customerId?: true;
    supplierId?: true;
    baseAmount?: true;
    taxAmount?: true;
    invoiceType?: true;
    status?: true;
    fpDate?: true;
    fpNumber?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TaxInvoiceMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    invoiceNo?: true;
    invoiceDate?: true;
    customerId?: true;
    supplierId?: true;
    baseAmount?: true;
    taxAmount?: true;
    invoiceType?: true;
    status?: true;
    fpDate?: true;
    fpNumber?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TaxInvoiceCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    invoiceNo?: true;
    invoiceDate?: true;
    customerId?: true;
    supplierId?: true;
    baseAmount?: true;
    taxAmount?: true;
    invoiceType?: true;
    status?: true;
    fpDate?: true;
    fpNumber?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TaxInvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaxInvoiceWhereInput;
    orderBy?: Prisma.TaxInvoiceOrderByWithRelationInput | Prisma.TaxInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.TaxInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TaxInvoiceCountAggregateInputType;
    _avg?: TaxInvoiceAvgAggregateInputType;
    _sum?: TaxInvoiceSumAggregateInputType;
    _min?: TaxInvoiceMinAggregateInputType;
    _max?: TaxInvoiceMaxAggregateInputType;
};
export type GetTaxInvoiceAggregateType<T extends TaxInvoiceAggregateArgs> = {
    [P in keyof T & keyof AggregateTaxInvoice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTaxInvoice[P]> : Prisma.GetScalarType<T[P], AggregateTaxInvoice[P]>;
};
export type TaxInvoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaxInvoiceWhereInput;
    orderBy?: Prisma.TaxInvoiceOrderByWithAggregationInput | Prisma.TaxInvoiceOrderByWithAggregationInput[];
    by: Prisma.TaxInvoiceScalarFieldEnum[] | Prisma.TaxInvoiceScalarFieldEnum;
    having?: Prisma.TaxInvoiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TaxInvoiceCountAggregateInputType | true;
    _avg?: TaxInvoiceAvgAggregateInputType;
    _sum?: TaxInvoiceSumAggregateInputType;
    _min?: TaxInvoiceMinAggregateInputType;
    _max?: TaxInvoiceMaxAggregateInputType;
};
export type TaxInvoiceGroupByOutputType = {
    id: string;
    tenantId: string;
    invoiceNo: string;
    invoiceDate: Date;
    customerId: string | null;
    supplierId: string | null;
    baseAmount: runtime.Decimal;
    taxAmount: runtime.Decimal;
    invoiceType: string;
    status: string;
    fpDate: Date | null;
    fpNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TaxInvoiceCountAggregateOutputType | null;
    _avg: TaxInvoiceAvgAggregateOutputType | null;
    _sum: TaxInvoiceSumAggregateOutputType | null;
    _min: TaxInvoiceMinAggregateOutputType | null;
    _max: TaxInvoiceMaxAggregateOutputType | null;
};
export type GetTaxInvoiceGroupByPayload<T extends TaxInvoiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TaxInvoiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TaxInvoiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TaxInvoiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TaxInvoiceGroupByOutputType[P]>;
}>>;
export type TaxInvoiceWhereInput = {
    AND?: Prisma.TaxInvoiceWhereInput | Prisma.TaxInvoiceWhereInput[];
    OR?: Prisma.TaxInvoiceWhereInput[];
    NOT?: Prisma.TaxInvoiceWhereInput | Prisma.TaxInvoiceWhereInput[];
    id?: Prisma.StringFilter<"TaxInvoice"> | string;
    tenantId?: Prisma.StringFilter<"TaxInvoice"> | string;
    invoiceNo?: Prisma.StringFilter<"TaxInvoice"> | string;
    invoiceDate?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    customerId?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    supplierId?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    baseAmount?: Prisma.DecimalFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFilter<"TaxInvoice"> | string;
    status?: Prisma.StringFilter<"TaxInvoice"> | string;
    fpDate?: Prisma.DateTimeNullableFilter<"TaxInvoice"> | Date | string | null;
    fpNumber?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
};
export type TaxInvoiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    invoiceNo?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    customerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    supplierId?: Prisma.SortOrderInput | Prisma.SortOrder;
    baseAmount?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    invoiceType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fpDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    fpNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
};
export type TaxInvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_invoiceNo?: Prisma.TaxInvoiceTenantIdInvoiceNoCompoundUniqueInput;
    AND?: Prisma.TaxInvoiceWhereInput | Prisma.TaxInvoiceWhereInput[];
    OR?: Prisma.TaxInvoiceWhereInput[];
    NOT?: Prisma.TaxInvoiceWhereInput | Prisma.TaxInvoiceWhereInput[];
    tenantId?: Prisma.StringFilter<"TaxInvoice"> | string;
    invoiceNo?: Prisma.StringFilter<"TaxInvoice"> | string;
    invoiceDate?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    customerId?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    supplierId?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    baseAmount?: Prisma.DecimalFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFilter<"TaxInvoice"> | string;
    status?: Prisma.StringFilter<"TaxInvoice"> | string;
    fpDate?: Prisma.DateTimeNullableFilter<"TaxInvoice"> | Date | string | null;
    fpNumber?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
}, "id" | "tenantId_invoiceNo">;
export type TaxInvoiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    invoiceNo?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    customerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    supplierId?: Prisma.SortOrderInput | Prisma.SortOrder;
    baseAmount?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    invoiceType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fpDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    fpNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TaxInvoiceCountOrderByAggregateInput;
    _avg?: Prisma.TaxInvoiceAvgOrderByAggregateInput;
    _max?: Prisma.TaxInvoiceMaxOrderByAggregateInput;
    _min?: Prisma.TaxInvoiceMinOrderByAggregateInput;
    _sum?: Prisma.TaxInvoiceSumOrderByAggregateInput;
};
export type TaxInvoiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.TaxInvoiceScalarWhereWithAggregatesInput | Prisma.TaxInvoiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.TaxInvoiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TaxInvoiceScalarWhereWithAggregatesInput | Prisma.TaxInvoiceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TaxInvoice"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"TaxInvoice"> | string;
    invoiceNo?: Prisma.StringWithAggregatesFilter<"TaxInvoice"> | string;
    invoiceDate?: Prisma.DateTimeWithAggregatesFilter<"TaxInvoice"> | Date | string;
    customerId?: Prisma.StringNullableWithAggregatesFilter<"TaxInvoice"> | string | null;
    supplierId?: Prisma.StringNullableWithAggregatesFilter<"TaxInvoice"> | string | null;
    baseAmount?: Prisma.DecimalWithAggregatesFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalWithAggregatesFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringWithAggregatesFilter<"TaxInvoice"> | string;
    status?: Prisma.StringWithAggregatesFilter<"TaxInvoice"> | string;
    fpDate?: Prisma.DateTimeNullableWithAggregatesFilter<"TaxInvoice"> | Date | string | null;
    fpNumber?: Prisma.StringNullableWithAggregatesFilter<"TaxInvoice"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TaxInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TaxInvoice"> | Date | string;
};
export type TaxInvoiceCreateInput = {
    id?: string;
    invoiceNo: string;
    invoiceDate: Date | string;
    customerId?: string | null;
    supplierId?: string | null;
    baseAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: string;
    status?: string;
    fpDate?: Date | string | null;
    fpNumber?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutTaxInvoicesInput;
};
export type TaxInvoiceUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    invoiceNo: string;
    invoiceDate: Date | string;
    customerId?: string | null;
    supplierId?: string | null;
    baseAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: string;
    status?: string;
    fpDate?: Date | string | null;
    fpNumber?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TaxInvoiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNo?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    baseAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fpDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fpNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutTaxInvoicesNestedInput;
};
export type TaxInvoiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNo?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    baseAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fpDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fpNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxInvoiceCreateManyInput = {
    id?: string;
    tenantId: string;
    invoiceNo: string;
    invoiceDate: Date | string;
    customerId?: string | null;
    supplierId?: string | null;
    baseAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: string;
    status?: string;
    fpDate?: Date | string | null;
    fpNumber?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TaxInvoiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNo?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    baseAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fpDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fpNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxInvoiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNo?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    baseAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fpDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fpNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxInvoiceListRelationFilter = {
    every?: Prisma.TaxInvoiceWhereInput;
    some?: Prisma.TaxInvoiceWhereInput;
    none?: Prisma.TaxInvoiceWhereInput;
};
export type TaxInvoiceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TaxInvoiceTenantIdInvoiceNoCompoundUniqueInput = {
    tenantId: string;
    invoiceNo: string;
};
export type TaxInvoiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    invoiceNo?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    baseAmount?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    invoiceType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fpDate?: Prisma.SortOrder;
    fpNumber?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TaxInvoiceAvgOrderByAggregateInput = {
    baseAmount?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
};
export type TaxInvoiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    invoiceNo?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    baseAmount?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    invoiceType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fpDate?: Prisma.SortOrder;
    fpNumber?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TaxInvoiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    invoiceNo?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    baseAmount?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    invoiceType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fpDate?: Prisma.SortOrder;
    fpNumber?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TaxInvoiceSumOrderByAggregateInput = {
    baseAmount?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
};
export type TaxInvoiceCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.TaxInvoiceCreateWithoutTenantInput, Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput> | Prisma.TaxInvoiceCreateWithoutTenantInput[] | Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput | Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.TaxInvoiceCreateManyTenantInputEnvelope;
    connect?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
};
export type TaxInvoiceUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.TaxInvoiceCreateWithoutTenantInput, Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput> | Prisma.TaxInvoiceCreateWithoutTenantInput[] | Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput | Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.TaxInvoiceCreateManyTenantInputEnvelope;
    connect?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
};
export type TaxInvoiceUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.TaxInvoiceCreateWithoutTenantInput, Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput> | Prisma.TaxInvoiceCreateWithoutTenantInput[] | Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput | Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.TaxInvoiceUpsertWithWhereUniqueWithoutTenantInput | Prisma.TaxInvoiceUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.TaxInvoiceCreateManyTenantInputEnvelope;
    set?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    disconnect?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    delete?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    connect?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    update?: Prisma.TaxInvoiceUpdateWithWhereUniqueWithoutTenantInput | Prisma.TaxInvoiceUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.TaxInvoiceUpdateManyWithWhereWithoutTenantInput | Prisma.TaxInvoiceUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.TaxInvoiceScalarWhereInput | Prisma.TaxInvoiceScalarWhereInput[];
};
export type TaxInvoiceUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.TaxInvoiceCreateWithoutTenantInput, Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput> | Prisma.TaxInvoiceCreateWithoutTenantInput[] | Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput | Prisma.TaxInvoiceCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.TaxInvoiceUpsertWithWhereUniqueWithoutTenantInput | Prisma.TaxInvoiceUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.TaxInvoiceCreateManyTenantInputEnvelope;
    set?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    disconnect?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    delete?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    connect?: Prisma.TaxInvoiceWhereUniqueInput | Prisma.TaxInvoiceWhereUniqueInput[];
    update?: Prisma.TaxInvoiceUpdateWithWhereUniqueWithoutTenantInput | Prisma.TaxInvoiceUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.TaxInvoiceUpdateManyWithWhereWithoutTenantInput | Prisma.TaxInvoiceUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.TaxInvoiceScalarWhereInput | Prisma.TaxInvoiceScalarWhereInput[];
};
export type TaxInvoiceCreateWithoutTenantInput = {
    id?: string;
    invoiceNo: string;
    invoiceDate: Date | string;
    customerId?: string | null;
    supplierId?: string | null;
    baseAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: string;
    status?: string;
    fpDate?: Date | string | null;
    fpNumber?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TaxInvoiceUncheckedCreateWithoutTenantInput = {
    id?: string;
    invoiceNo: string;
    invoiceDate: Date | string;
    customerId?: string | null;
    supplierId?: string | null;
    baseAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: string;
    status?: string;
    fpDate?: Date | string | null;
    fpNumber?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TaxInvoiceCreateOrConnectWithoutTenantInput = {
    where: Prisma.TaxInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaxInvoiceCreateWithoutTenantInput, Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput>;
};
export type TaxInvoiceCreateManyTenantInputEnvelope = {
    data: Prisma.TaxInvoiceCreateManyTenantInput | Prisma.TaxInvoiceCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type TaxInvoiceUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.TaxInvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaxInvoiceUpdateWithoutTenantInput, Prisma.TaxInvoiceUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.TaxInvoiceCreateWithoutTenantInput, Prisma.TaxInvoiceUncheckedCreateWithoutTenantInput>;
};
export type TaxInvoiceUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.TaxInvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaxInvoiceUpdateWithoutTenantInput, Prisma.TaxInvoiceUncheckedUpdateWithoutTenantInput>;
};
export type TaxInvoiceUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.TaxInvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.TaxInvoiceUpdateManyMutationInput, Prisma.TaxInvoiceUncheckedUpdateManyWithoutTenantInput>;
};
export type TaxInvoiceScalarWhereInput = {
    AND?: Prisma.TaxInvoiceScalarWhereInput | Prisma.TaxInvoiceScalarWhereInput[];
    OR?: Prisma.TaxInvoiceScalarWhereInput[];
    NOT?: Prisma.TaxInvoiceScalarWhereInput | Prisma.TaxInvoiceScalarWhereInput[];
    id?: Prisma.StringFilter<"TaxInvoice"> | string;
    tenantId?: Prisma.StringFilter<"TaxInvoice"> | string;
    invoiceNo?: Prisma.StringFilter<"TaxInvoice"> | string;
    invoiceDate?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    customerId?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    supplierId?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    baseAmount?: Prisma.DecimalFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFilter<"TaxInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFilter<"TaxInvoice"> | string;
    status?: Prisma.StringFilter<"TaxInvoice"> | string;
    fpDate?: Prisma.DateTimeNullableFilter<"TaxInvoice"> | Date | string | null;
    fpNumber?: Prisma.StringNullableFilter<"TaxInvoice"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TaxInvoice"> | Date | string;
};
export type TaxInvoiceCreateManyTenantInput = {
    id?: string;
    invoiceNo: string;
    invoiceDate: Date | string;
    customerId?: string | null;
    supplierId?: string | null;
    baseAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: string;
    status?: string;
    fpDate?: Date | string | null;
    fpNumber?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TaxInvoiceUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNo?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    baseAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fpDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fpNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxInvoiceUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNo?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    baseAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fpDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fpNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxInvoiceUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNo?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    baseAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    taxAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoiceType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fpDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fpNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxInvoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    invoiceNo?: boolean;
    invoiceDate?: boolean;
    customerId?: boolean;
    supplierId?: boolean;
    baseAmount?: boolean;
    taxAmount?: boolean;
    invoiceType?: boolean;
    status?: boolean;
    fpDate?: boolean;
    fpNumber?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taxInvoice"]>;
export type TaxInvoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    invoiceNo?: boolean;
    invoiceDate?: boolean;
    customerId?: boolean;
    supplierId?: boolean;
    baseAmount?: boolean;
    taxAmount?: boolean;
    invoiceType?: boolean;
    status?: boolean;
    fpDate?: boolean;
    fpNumber?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taxInvoice"]>;
export type TaxInvoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    invoiceNo?: boolean;
    invoiceDate?: boolean;
    customerId?: boolean;
    supplierId?: boolean;
    baseAmount?: boolean;
    taxAmount?: boolean;
    invoiceType?: boolean;
    status?: boolean;
    fpDate?: boolean;
    fpNumber?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taxInvoice"]>;
export type TaxInvoiceSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    invoiceNo?: boolean;
    invoiceDate?: boolean;
    customerId?: boolean;
    supplierId?: boolean;
    baseAmount?: boolean;
    taxAmount?: boolean;
    invoiceType?: boolean;
    status?: boolean;
    fpDate?: boolean;
    fpNumber?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TaxInvoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "invoiceNo" | "invoiceDate" | "customerId" | "supplierId" | "baseAmount" | "taxAmount" | "invoiceType" | "status" | "fpDate" | "fpNumber" | "createdAt" | "updatedAt", ExtArgs["result"]["taxInvoice"]>;
export type TaxInvoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type TaxInvoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type TaxInvoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $TaxInvoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TaxInvoice";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        invoiceNo: string;
        invoiceDate: Date;
        customerId: string | null;
        supplierId: string | null;
        baseAmount: runtime.Decimal;
        taxAmount: runtime.Decimal;
        invoiceType: string;
        status: string;
        fpDate: Date | null;
        fpNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["taxInvoice"]>;
    composites: {};
};
export type TaxInvoiceGetPayload<S extends boolean | null | undefined | TaxInvoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload, S>;
export type TaxInvoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TaxInvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TaxInvoiceCountAggregateInputType | true;
};
export interface TaxInvoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TaxInvoice'];
        meta: {
            name: 'TaxInvoice';
        };
    };
    findUnique<T extends TaxInvoiceFindUniqueArgs>(args: Prisma.SelectSubset<T, TaxInvoiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TaxInvoiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TaxInvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TaxInvoiceFindFirstArgs>(args?: Prisma.SelectSubset<T, TaxInvoiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TaxInvoiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TaxInvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TaxInvoiceFindManyArgs>(args?: Prisma.SelectSubset<T, TaxInvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TaxInvoiceCreateArgs>(args: Prisma.SelectSubset<T, TaxInvoiceCreateArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TaxInvoiceCreateManyArgs>(args?: Prisma.SelectSubset<T, TaxInvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TaxInvoiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TaxInvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TaxInvoiceDeleteArgs>(args: Prisma.SelectSubset<T, TaxInvoiceDeleteArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TaxInvoiceUpdateArgs>(args: Prisma.SelectSubset<T, TaxInvoiceUpdateArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TaxInvoiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, TaxInvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TaxInvoiceUpdateManyArgs>(args: Prisma.SelectSubset<T, TaxInvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TaxInvoiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TaxInvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TaxInvoiceUpsertArgs>(args: Prisma.SelectSubset<T, TaxInvoiceUpsertArgs<ExtArgs>>): Prisma.Prisma__TaxInvoiceClient<runtime.Types.Result.GetResult<Prisma.$TaxInvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TaxInvoiceCountArgs>(args?: Prisma.Subset<T, TaxInvoiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TaxInvoiceCountAggregateOutputType> : number>;
    aggregate<T extends TaxInvoiceAggregateArgs>(args: Prisma.Subset<T, TaxInvoiceAggregateArgs>): Prisma.PrismaPromise<GetTaxInvoiceAggregateType<T>>;
    groupBy<T extends TaxInvoiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TaxInvoiceGroupByArgs['orderBy'];
    } : {
        orderBy?: TaxInvoiceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TaxInvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaxInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TaxInvoiceFieldRefs;
}
export interface Prisma__TaxInvoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TaxInvoiceFieldRefs {
    readonly id: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly tenantId: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly invoiceNo: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly invoiceDate: Prisma.FieldRef<"TaxInvoice", 'DateTime'>;
    readonly customerId: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly supplierId: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly baseAmount: Prisma.FieldRef<"TaxInvoice", 'Decimal'>;
    readonly taxAmount: Prisma.FieldRef<"TaxInvoice", 'Decimal'>;
    readonly invoiceType: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly status: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly fpDate: Prisma.FieldRef<"TaxInvoice", 'DateTime'>;
    readonly fpNumber: Prisma.FieldRef<"TaxInvoice", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TaxInvoice", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TaxInvoice", 'DateTime'>;
}
export type TaxInvoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    where: Prisma.TaxInvoiceWhereUniqueInput;
};
export type TaxInvoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    where: Prisma.TaxInvoiceWhereUniqueInput;
};
export type TaxInvoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    where?: Prisma.TaxInvoiceWhereInput;
    orderBy?: Prisma.TaxInvoiceOrderByWithRelationInput | Prisma.TaxInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.TaxInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaxInvoiceScalarFieldEnum | Prisma.TaxInvoiceScalarFieldEnum[];
};
export type TaxInvoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    where?: Prisma.TaxInvoiceWhereInput;
    orderBy?: Prisma.TaxInvoiceOrderByWithRelationInput | Prisma.TaxInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.TaxInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaxInvoiceScalarFieldEnum | Prisma.TaxInvoiceScalarFieldEnum[];
};
export type TaxInvoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    where?: Prisma.TaxInvoiceWhereInput;
    orderBy?: Prisma.TaxInvoiceOrderByWithRelationInput | Prisma.TaxInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.TaxInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaxInvoiceScalarFieldEnum | Prisma.TaxInvoiceScalarFieldEnum[];
};
export type TaxInvoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaxInvoiceCreateInput, Prisma.TaxInvoiceUncheckedCreateInput>;
};
export type TaxInvoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TaxInvoiceCreateManyInput | Prisma.TaxInvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TaxInvoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    data: Prisma.TaxInvoiceCreateManyInput | Prisma.TaxInvoiceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TaxInvoiceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TaxInvoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaxInvoiceUpdateInput, Prisma.TaxInvoiceUncheckedUpdateInput>;
    where: Prisma.TaxInvoiceWhereUniqueInput;
};
export type TaxInvoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TaxInvoiceUpdateManyMutationInput, Prisma.TaxInvoiceUncheckedUpdateManyInput>;
    where?: Prisma.TaxInvoiceWhereInput;
    limit?: number;
};
export type TaxInvoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaxInvoiceUpdateManyMutationInput, Prisma.TaxInvoiceUncheckedUpdateManyInput>;
    where?: Prisma.TaxInvoiceWhereInput;
    limit?: number;
    include?: Prisma.TaxInvoiceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TaxInvoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    where: Prisma.TaxInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaxInvoiceCreateInput, Prisma.TaxInvoiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TaxInvoiceUpdateInput, Prisma.TaxInvoiceUncheckedUpdateInput>;
};
export type TaxInvoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
    where: Prisma.TaxInvoiceWhereUniqueInput;
};
export type TaxInvoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaxInvoiceWhereInput;
    limit?: number;
};
export type TaxInvoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.TaxInvoiceOmit<ExtArgs> | null;
    include?: Prisma.TaxInvoiceInclude<ExtArgs> | null;
};
