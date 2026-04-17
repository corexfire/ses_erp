import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RfqVendorModel = runtime.Types.Result.DefaultSelection<Prisma.$RfqVendorPayload>;
export type AggregateRfqVendor = {
    _count: RfqVendorCountAggregateOutputType | null;
    _avg: RfqVendorAvgAggregateOutputType | null;
    _sum: RfqVendorSumAggregateOutputType | null;
    _min: RfqVendorMinAggregateOutputType | null;
    _max: RfqVendorMaxAggregateOutputType | null;
};
export type RfqVendorAvgAggregateOutputType = {
    bidAmount: runtime.Decimal | null;
};
export type RfqVendorSumAggregateOutputType = {
    bidAmount: runtime.Decimal | null;
};
export type RfqVendorMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    rfqId: string | null;
    supplierId: string | null;
    status: string | null;
    bidAmount: runtime.Decimal | null;
    notes: string | null;
    createdAt: Date | null;
};
export type RfqVendorMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    rfqId: string | null;
    supplierId: string | null;
    status: string | null;
    bidAmount: runtime.Decimal | null;
    notes: string | null;
    createdAt: Date | null;
};
export type RfqVendorCountAggregateOutputType = {
    id: number;
    tenantId: number;
    rfqId: number;
    supplierId: number;
    status: number;
    bidAmount: number;
    notes: number;
    createdAt: number;
    _all: number;
};
export type RfqVendorAvgAggregateInputType = {
    bidAmount?: true;
};
export type RfqVendorSumAggregateInputType = {
    bidAmount?: true;
};
export type RfqVendorMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    rfqId?: true;
    supplierId?: true;
    status?: true;
    bidAmount?: true;
    notes?: true;
    createdAt?: true;
};
export type RfqVendorMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    rfqId?: true;
    supplierId?: true;
    status?: true;
    bidAmount?: true;
    notes?: true;
    createdAt?: true;
};
export type RfqVendorCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    rfqId?: true;
    supplierId?: true;
    status?: true;
    bidAmount?: true;
    notes?: true;
    createdAt?: true;
    _all?: true;
};
export type RfqVendorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqVendorWhereInput;
    orderBy?: Prisma.RfqVendorOrderByWithRelationInput | Prisma.RfqVendorOrderByWithRelationInput[];
    cursor?: Prisma.RfqVendorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RfqVendorCountAggregateInputType;
    _avg?: RfqVendorAvgAggregateInputType;
    _sum?: RfqVendorSumAggregateInputType;
    _min?: RfqVendorMinAggregateInputType;
    _max?: RfqVendorMaxAggregateInputType;
};
export type GetRfqVendorAggregateType<T extends RfqVendorAggregateArgs> = {
    [P in keyof T & keyof AggregateRfqVendor]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRfqVendor[P]> : Prisma.GetScalarType<T[P], AggregateRfqVendor[P]>;
};
export type RfqVendorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqVendorWhereInput;
    orderBy?: Prisma.RfqVendorOrderByWithAggregationInput | Prisma.RfqVendorOrderByWithAggregationInput[];
    by: Prisma.RfqVendorScalarFieldEnum[] | Prisma.RfqVendorScalarFieldEnum;
    having?: Prisma.RfqVendorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RfqVendorCountAggregateInputType | true;
    _avg?: RfqVendorAvgAggregateInputType;
    _sum?: RfqVendorSumAggregateInputType;
    _min?: RfqVendorMinAggregateInputType;
    _max?: RfqVendorMaxAggregateInputType;
};
export type RfqVendorGroupByOutputType = {
    id: string;
    tenantId: string;
    rfqId: string;
    supplierId: string;
    status: string;
    bidAmount: runtime.Decimal | null;
    notes: string | null;
    createdAt: Date;
    _count: RfqVendorCountAggregateOutputType | null;
    _avg: RfqVendorAvgAggregateOutputType | null;
    _sum: RfqVendorSumAggregateOutputType | null;
    _min: RfqVendorMinAggregateOutputType | null;
    _max: RfqVendorMaxAggregateOutputType | null;
};
export type GetRfqVendorGroupByPayload<T extends RfqVendorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RfqVendorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RfqVendorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RfqVendorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RfqVendorGroupByOutputType[P]>;
}>>;
export type RfqVendorWhereInput = {
    AND?: Prisma.RfqVendorWhereInput | Prisma.RfqVendorWhereInput[];
    OR?: Prisma.RfqVendorWhereInput[];
    NOT?: Prisma.RfqVendorWhereInput | Prisma.RfqVendorWhereInput[];
    id?: Prisma.StringFilter<"RfqVendor"> | string;
    tenantId?: Prisma.StringFilter<"RfqVendor"> | string;
    rfqId?: Prisma.StringFilter<"RfqVendor"> | string;
    supplierId?: Prisma.StringFilter<"RfqVendor"> | string;
    status?: Prisma.StringFilter<"RfqVendor"> | string;
    bidAmount?: Prisma.DecimalNullableFilter<"RfqVendor"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.StringNullableFilter<"RfqVendor"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"RfqVendor"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierScalarRelationFilter, Prisma.SupplierWhereInput>;
};
export type RfqVendorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bidAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    rfq?: Prisma.RfqOrderByWithRelationInput;
    supplier?: Prisma.SupplierOrderByWithRelationInput;
};
export type RfqVendorWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_rfqId_supplierId?: Prisma.RfqVendorTenantIdRfqIdSupplierIdCompoundUniqueInput;
    AND?: Prisma.RfqVendorWhereInput | Prisma.RfqVendorWhereInput[];
    OR?: Prisma.RfqVendorWhereInput[];
    NOT?: Prisma.RfqVendorWhereInput | Prisma.RfqVendorWhereInput[];
    tenantId?: Prisma.StringFilter<"RfqVendor"> | string;
    rfqId?: Prisma.StringFilter<"RfqVendor"> | string;
    supplierId?: Prisma.StringFilter<"RfqVendor"> | string;
    status?: Prisma.StringFilter<"RfqVendor"> | string;
    bidAmount?: Prisma.DecimalNullableFilter<"RfqVendor"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.StringNullableFilter<"RfqVendor"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"RfqVendor"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    rfq?: Prisma.XOR<Prisma.RfqScalarRelationFilter, Prisma.RfqWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierScalarRelationFilter, Prisma.SupplierWhereInput>;
}, "id" | "tenantId_rfqId_supplierId">;
export type RfqVendorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bidAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RfqVendorCountOrderByAggregateInput;
    _avg?: Prisma.RfqVendorAvgOrderByAggregateInput;
    _max?: Prisma.RfqVendorMaxOrderByAggregateInput;
    _min?: Prisma.RfqVendorMinOrderByAggregateInput;
    _sum?: Prisma.RfqVendorSumOrderByAggregateInput;
};
export type RfqVendorScalarWhereWithAggregatesInput = {
    AND?: Prisma.RfqVendorScalarWhereWithAggregatesInput | Prisma.RfqVendorScalarWhereWithAggregatesInput[];
    OR?: Prisma.RfqVendorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RfqVendorScalarWhereWithAggregatesInput | Prisma.RfqVendorScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RfqVendor"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"RfqVendor"> | string;
    rfqId?: Prisma.StringWithAggregatesFilter<"RfqVendor"> | string;
    supplierId?: Prisma.StringWithAggregatesFilter<"RfqVendor"> | string;
    status?: Prisma.StringWithAggregatesFilter<"RfqVendor"> | string;
    bidAmount?: Prisma.DecimalNullableWithAggregatesFilter<"RfqVendor"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"RfqVendor"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RfqVendor"> | Date | string;
};
export type RfqVendorCreateInput = {
    id?: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutRfqVendorsInput;
    rfq: Prisma.RfqCreateNestedOneWithoutVendorsInput;
    supplier: Prisma.SupplierCreateNestedOneWithoutRfqVendorsInput;
};
export type RfqVendorUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    rfqId: string;
    supplierId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutRfqVendorsNestedInput;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutVendorsNestedInput;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutRfqVendorsNestedInput;
};
export type RfqVendorUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorCreateManyInput = {
    id?: string;
    tenantId: string;
    rfqId: string;
    supplierId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorListRelationFilter = {
    every?: Prisma.RfqVendorWhereInput;
    some?: Prisma.RfqVendorWhereInput;
    none?: Prisma.RfqVendorWhereInput;
};
export type RfqVendorOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RfqVendorTenantIdRfqIdSupplierIdCompoundUniqueInput = {
    tenantId: string;
    rfqId: string;
    supplierId: string;
};
export type RfqVendorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bidAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RfqVendorAvgOrderByAggregateInput = {
    bidAmount?: Prisma.SortOrder;
};
export type RfqVendorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bidAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RfqVendorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    rfqId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    bidAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RfqVendorSumOrderByAggregateInput = {
    bidAmount?: Prisma.SortOrder;
};
export type RfqVendorCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutTenantInput, Prisma.RfqVendorUncheckedCreateWithoutTenantInput> | Prisma.RfqVendorCreateWithoutTenantInput[] | Prisma.RfqVendorUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutTenantInput | Prisma.RfqVendorCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.RfqVendorCreateManyTenantInputEnvelope;
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
};
export type RfqVendorUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutTenantInput, Prisma.RfqVendorUncheckedCreateWithoutTenantInput> | Prisma.RfqVendorCreateWithoutTenantInput[] | Prisma.RfqVendorUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutTenantInput | Prisma.RfqVendorCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.RfqVendorCreateManyTenantInputEnvelope;
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
};
export type RfqVendorUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutTenantInput, Prisma.RfqVendorUncheckedCreateWithoutTenantInput> | Prisma.RfqVendorCreateWithoutTenantInput[] | Prisma.RfqVendorUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutTenantInput | Prisma.RfqVendorCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.RfqVendorUpsertWithWhereUniqueWithoutTenantInput | Prisma.RfqVendorUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.RfqVendorCreateManyTenantInputEnvelope;
    set?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    disconnect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    delete?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    update?: Prisma.RfqVendorUpdateWithWhereUniqueWithoutTenantInput | Prisma.RfqVendorUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.RfqVendorUpdateManyWithWhereWithoutTenantInput | Prisma.RfqVendorUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
};
export type RfqVendorUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutTenantInput, Prisma.RfqVendorUncheckedCreateWithoutTenantInput> | Prisma.RfqVendorCreateWithoutTenantInput[] | Prisma.RfqVendorUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutTenantInput | Prisma.RfqVendorCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.RfqVendorUpsertWithWhereUniqueWithoutTenantInput | Prisma.RfqVendorUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.RfqVendorCreateManyTenantInputEnvelope;
    set?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    disconnect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    delete?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    update?: Prisma.RfqVendorUpdateWithWhereUniqueWithoutTenantInput | Prisma.RfqVendorUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.RfqVendorUpdateManyWithWhereWithoutTenantInput | Prisma.RfqVendorUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
};
export type RfqVendorCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutSupplierInput, Prisma.RfqVendorUncheckedCreateWithoutSupplierInput> | Prisma.RfqVendorCreateWithoutSupplierInput[] | Prisma.RfqVendorUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutSupplierInput | Prisma.RfqVendorCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.RfqVendorCreateManySupplierInputEnvelope;
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
};
export type RfqVendorUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutSupplierInput, Prisma.RfqVendorUncheckedCreateWithoutSupplierInput> | Prisma.RfqVendorCreateWithoutSupplierInput[] | Prisma.RfqVendorUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutSupplierInput | Prisma.RfqVendorCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.RfqVendorCreateManySupplierInputEnvelope;
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
};
export type RfqVendorUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutSupplierInput, Prisma.RfqVendorUncheckedCreateWithoutSupplierInput> | Prisma.RfqVendorCreateWithoutSupplierInput[] | Prisma.RfqVendorUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutSupplierInput | Prisma.RfqVendorCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.RfqVendorUpsertWithWhereUniqueWithoutSupplierInput | Prisma.RfqVendorUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.RfqVendorCreateManySupplierInputEnvelope;
    set?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    disconnect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    delete?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    update?: Prisma.RfqVendorUpdateWithWhereUniqueWithoutSupplierInput | Prisma.RfqVendorUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.RfqVendorUpdateManyWithWhereWithoutSupplierInput | Prisma.RfqVendorUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
};
export type RfqVendorUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutSupplierInput, Prisma.RfqVendorUncheckedCreateWithoutSupplierInput> | Prisma.RfqVendorCreateWithoutSupplierInput[] | Prisma.RfqVendorUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutSupplierInput | Prisma.RfqVendorCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.RfqVendorUpsertWithWhereUniqueWithoutSupplierInput | Prisma.RfqVendorUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.RfqVendorCreateManySupplierInputEnvelope;
    set?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    disconnect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    delete?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    update?: Prisma.RfqVendorUpdateWithWhereUniqueWithoutSupplierInput | Prisma.RfqVendorUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.RfqVendorUpdateManyWithWhereWithoutSupplierInput | Prisma.RfqVendorUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
};
export type RfqVendorCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutRfqInput, Prisma.RfqVendorUncheckedCreateWithoutRfqInput> | Prisma.RfqVendorCreateWithoutRfqInput[] | Prisma.RfqVendorUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutRfqInput | Prisma.RfqVendorCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqVendorCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
};
export type RfqVendorUncheckedCreateNestedManyWithoutRfqInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutRfqInput, Prisma.RfqVendorUncheckedCreateWithoutRfqInput> | Prisma.RfqVendorCreateWithoutRfqInput[] | Prisma.RfqVendorUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutRfqInput | Prisma.RfqVendorCreateOrConnectWithoutRfqInput[];
    createMany?: Prisma.RfqVendorCreateManyRfqInputEnvelope;
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
};
export type RfqVendorUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutRfqInput, Prisma.RfqVendorUncheckedCreateWithoutRfqInput> | Prisma.RfqVendorCreateWithoutRfqInput[] | Prisma.RfqVendorUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutRfqInput | Prisma.RfqVendorCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqVendorUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqVendorUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqVendorCreateManyRfqInputEnvelope;
    set?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    disconnect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    delete?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    update?: Prisma.RfqVendorUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqVendorUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqVendorUpdateManyWithWhereWithoutRfqInput | Prisma.RfqVendorUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
};
export type RfqVendorUncheckedUpdateManyWithoutRfqNestedInput = {
    create?: Prisma.XOR<Prisma.RfqVendorCreateWithoutRfqInput, Prisma.RfqVendorUncheckedCreateWithoutRfqInput> | Prisma.RfqVendorCreateWithoutRfqInput[] | Prisma.RfqVendorUncheckedCreateWithoutRfqInput[];
    connectOrCreate?: Prisma.RfqVendorCreateOrConnectWithoutRfqInput | Prisma.RfqVendorCreateOrConnectWithoutRfqInput[];
    upsert?: Prisma.RfqVendorUpsertWithWhereUniqueWithoutRfqInput | Prisma.RfqVendorUpsertWithWhereUniqueWithoutRfqInput[];
    createMany?: Prisma.RfqVendorCreateManyRfqInputEnvelope;
    set?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    disconnect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    delete?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    connect?: Prisma.RfqVendorWhereUniqueInput | Prisma.RfqVendorWhereUniqueInput[];
    update?: Prisma.RfqVendorUpdateWithWhereUniqueWithoutRfqInput | Prisma.RfqVendorUpdateWithWhereUniqueWithoutRfqInput[];
    updateMany?: Prisma.RfqVendorUpdateManyWithWhereWithoutRfqInput | Prisma.RfqVendorUpdateManyWithWhereWithoutRfqInput[];
    deleteMany?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
};
export type RfqVendorCreateWithoutTenantInput = {
    id?: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
    rfq: Prisma.RfqCreateNestedOneWithoutVendorsInput;
    supplier: Prisma.SupplierCreateNestedOneWithoutRfqVendorsInput;
};
export type RfqVendorUncheckedCreateWithoutTenantInput = {
    id?: string;
    rfqId: string;
    supplierId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorCreateOrConnectWithoutTenantInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqVendorCreateWithoutTenantInput, Prisma.RfqVendorUncheckedCreateWithoutTenantInput>;
};
export type RfqVendorCreateManyTenantInputEnvelope = {
    data: Prisma.RfqVendorCreateManyTenantInput | Prisma.RfqVendorCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type RfqVendorUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqVendorUpdateWithoutTenantInput, Prisma.RfqVendorUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.RfqVendorCreateWithoutTenantInput, Prisma.RfqVendorUncheckedCreateWithoutTenantInput>;
};
export type RfqVendorUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqVendorUpdateWithoutTenantInput, Prisma.RfqVendorUncheckedUpdateWithoutTenantInput>;
};
export type RfqVendorUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.RfqVendorScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqVendorUpdateManyMutationInput, Prisma.RfqVendorUncheckedUpdateManyWithoutTenantInput>;
};
export type RfqVendorScalarWhereInput = {
    AND?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
    OR?: Prisma.RfqVendorScalarWhereInput[];
    NOT?: Prisma.RfqVendorScalarWhereInput | Prisma.RfqVendorScalarWhereInput[];
    id?: Prisma.StringFilter<"RfqVendor"> | string;
    tenantId?: Prisma.StringFilter<"RfqVendor"> | string;
    rfqId?: Prisma.StringFilter<"RfqVendor"> | string;
    supplierId?: Prisma.StringFilter<"RfqVendor"> | string;
    status?: Prisma.StringFilter<"RfqVendor"> | string;
    bidAmount?: Prisma.DecimalNullableFilter<"RfqVendor"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.StringNullableFilter<"RfqVendor"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"RfqVendor"> | Date | string;
};
export type RfqVendorCreateWithoutSupplierInput = {
    id?: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutRfqVendorsInput;
    rfq: Prisma.RfqCreateNestedOneWithoutVendorsInput;
};
export type RfqVendorUncheckedCreateWithoutSupplierInput = {
    id?: string;
    tenantId: string;
    rfqId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorCreateOrConnectWithoutSupplierInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqVendorCreateWithoutSupplierInput, Prisma.RfqVendorUncheckedCreateWithoutSupplierInput>;
};
export type RfqVendorCreateManySupplierInputEnvelope = {
    data: Prisma.RfqVendorCreateManySupplierInput | Prisma.RfqVendorCreateManySupplierInput[];
    skipDuplicates?: boolean;
};
export type RfqVendorUpsertWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqVendorUpdateWithoutSupplierInput, Prisma.RfqVendorUncheckedUpdateWithoutSupplierInput>;
    create: Prisma.XOR<Prisma.RfqVendorCreateWithoutSupplierInput, Prisma.RfqVendorUncheckedCreateWithoutSupplierInput>;
};
export type RfqVendorUpdateWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqVendorUpdateWithoutSupplierInput, Prisma.RfqVendorUncheckedUpdateWithoutSupplierInput>;
};
export type RfqVendorUpdateManyWithWhereWithoutSupplierInput = {
    where: Prisma.RfqVendorScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqVendorUpdateManyMutationInput, Prisma.RfqVendorUncheckedUpdateManyWithoutSupplierInput>;
};
export type RfqVendorCreateWithoutRfqInput = {
    id?: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutRfqVendorsInput;
    supplier: Prisma.SupplierCreateNestedOneWithoutRfqVendorsInput;
};
export type RfqVendorUncheckedCreateWithoutRfqInput = {
    id?: string;
    tenantId: string;
    supplierId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorCreateOrConnectWithoutRfqInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqVendorCreateWithoutRfqInput, Prisma.RfqVendorUncheckedCreateWithoutRfqInput>;
};
export type RfqVendorCreateManyRfqInputEnvelope = {
    data: Prisma.RfqVendorCreateManyRfqInput | Prisma.RfqVendorCreateManyRfqInput[];
    skipDuplicates?: boolean;
};
export type RfqVendorUpsertWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    update: Prisma.XOR<Prisma.RfqVendorUpdateWithoutRfqInput, Prisma.RfqVendorUncheckedUpdateWithoutRfqInput>;
    create: Prisma.XOR<Prisma.RfqVendorCreateWithoutRfqInput, Prisma.RfqVendorUncheckedCreateWithoutRfqInput>;
};
export type RfqVendorUpdateWithWhereUniqueWithoutRfqInput = {
    where: Prisma.RfqVendorWhereUniqueInput;
    data: Prisma.XOR<Prisma.RfqVendorUpdateWithoutRfqInput, Prisma.RfqVendorUncheckedUpdateWithoutRfqInput>;
};
export type RfqVendorUpdateManyWithWhereWithoutRfqInput = {
    where: Prisma.RfqVendorScalarWhereInput;
    data: Prisma.XOR<Prisma.RfqVendorUpdateManyMutationInput, Prisma.RfqVendorUncheckedUpdateManyWithoutRfqInput>;
};
export type RfqVendorCreateManyTenantInput = {
    id?: string;
    rfqId: string;
    supplierId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutVendorsNestedInput;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutRfqVendorsNestedInput;
};
export type RfqVendorUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorCreateManySupplierInput = {
    id?: string;
    tenantId: string;
    rfqId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutRfqVendorsNestedInput;
    rfq?: Prisma.RfqUpdateOneRequiredWithoutVendorsNestedInput;
};
export type RfqVendorUncheckedUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorUncheckedUpdateManyWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    rfqId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorCreateManyRfqInput = {
    id?: string;
    tenantId: string;
    supplierId: string;
    status?: string;
    bidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: string | null;
    createdAt?: Date | string;
};
export type RfqVendorUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutRfqVendorsNestedInput;
    supplier?: Prisma.SupplierUpdateOneRequiredWithoutRfqVendorsNestedInput;
};
export type RfqVendorUncheckedUpdateWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorUncheckedUpdateManyWithoutRfqInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    bidAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RfqVendorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    supplierId?: boolean;
    status?: boolean;
    bidAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqVendor"]>;
export type RfqVendorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    supplierId?: boolean;
    status?: boolean;
    bidAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqVendor"]>;
export type RfqVendorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    supplierId?: boolean;
    status?: boolean;
    bidAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rfqVendor"]>;
export type RfqVendorSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    rfqId?: boolean;
    supplierId?: boolean;
    status?: boolean;
    bidAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
};
export type RfqVendorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "rfqId" | "supplierId" | "status" | "bidAmount" | "notes" | "createdAt", ExtArgs["result"]["rfqVendor"]>;
export type RfqVendorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
};
export type RfqVendorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
};
export type RfqVendorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    rfq?: boolean | Prisma.RfqDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.SupplierDefaultArgs<ExtArgs>;
};
export type $RfqVendorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RfqVendor";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        rfq: Prisma.$RfqPayload<ExtArgs>;
        supplier: Prisma.$SupplierPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        rfqId: string;
        supplierId: string;
        status: string;
        bidAmount: runtime.Decimal | null;
        notes: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["rfqVendor"]>;
    composites: {};
};
export type RfqVendorGetPayload<S extends boolean | null | undefined | RfqVendorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload, S>;
export type RfqVendorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RfqVendorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RfqVendorCountAggregateInputType | true;
};
export interface RfqVendorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RfqVendor'];
        meta: {
            name: 'RfqVendor';
        };
    };
    findUnique<T extends RfqVendorFindUniqueArgs>(args: Prisma.SelectSubset<T, RfqVendorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RfqVendorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RfqVendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RfqVendorFindFirstArgs>(args?: Prisma.SelectSubset<T, RfqVendorFindFirstArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RfqVendorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RfqVendorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RfqVendorFindManyArgs>(args?: Prisma.SelectSubset<T, RfqVendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RfqVendorCreateArgs>(args: Prisma.SelectSubset<T, RfqVendorCreateArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RfqVendorCreateManyArgs>(args?: Prisma.SelectSubset<T, RfqVendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RfqVendorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RfqVendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RfqVendorDeleteArgs>(args: Prisma.SelectSubset<T, RfqVendorDeleteArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RfqVendorUpdateArgs>(args: Prisma.SelectSubset<T, RfqVendorUpdateArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RfqVendorDeleteManyArgs>(args?: Prisma.SelectSubset<T, RfqVendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RfqVendorUpdateManyArgs>(args: Prisma.SelectSubset<T, RfqVendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RfqVendorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RfqVendorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RfqVendorUpsertArgs>(args: Prisma.SelectSubset<T, RfqVendorUpsertArgs<ExtArgs>>): Prisma.Prisma__RfqVendorClient<runtime.Types.Result.GetResult<Prisma.$RfqVendorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RfqVendorCountArgs>(args?: Prisma.Subset<T, RfqVendorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RfqVendorCountAggregateOutputType> : number>;
    aggregate<T extends RfqVendorAggregateArgs>(args: Prisma.Subset<T, RfqVendorAggregateArgs>): Prisma.PrismaPromise<GetRfqVendorAggregateType<T>>;
    groupBy<T extends RfqVendorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RfqVendorGroupByArgs['orderBy'];
    } : {
        orderBy?: RfqVendorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RfqVendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRfqVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RfqVendorFieldRefs;
}
export interface Prisma__RfqVendorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    rfq<T extends Prisma.RfqDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RfqDefaultArgs<ExtArgs>>): Prisma.Prisma__RfqClient<runtime.Types.Result.GetResult<Prisma.$RfqPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    supplier<T extends Prisma.SupplierDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SupplierDefaultArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RfqVendorFieldRefs {
    readonly id: Prisma.FieldRef<"RfqVendor", 'String'>;
    readonly tenantId: Prisma.FieldRef<"RfqVendor", 'String'>;
    readonly rfqId: Prisma.FieldRef<"RfqVendor", 'String'>;
    readonly supplierId: Prisma.FieldRef<"RfqVendor", 'String'>;
    readonly status: Prisma.FieldRef<"RfqVendor", 'String'>;
    readonly bidAmount: Prisma.FieldRef<"RfqVendor", 'Decimal'>;
    readonly notes: Prisma.FieldRef<"RfqVendor", 'String'>;
    readonly createdAt: Prisma.FieldRef<"RfqVendor", 'DateTime'>;
}
export type RfqVendorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    where: Prisma.RfqVendorWhereUniqueInput;
};
export type RfqVendorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    where: Prisma.RfqVendorWhereUniqueInput;
};
export type RfqVendorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    where?: Prisma.RfqVendorWhereInput;
    orderBy?: Prisma.RfqVendorOrderByWithRelationInput | Prisma.RfqVendorOrderByWithRelationInput[];
    cursor?: Prisma.RfqVendorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqVendorScalarFieldEnum | Prisma.RfqVendorScalarFieldEnum[];
};
export type RfqVendorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    where?: Prisma.RfqVendorWhereInput;
    orderBy?: Prisma.RfqVendorOrderByWithRelationInput | Prisma.RfqVendorOrderByWithRelationInput[];
    cursor?: Prisma.RfqVendorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqVendorScalarFieldEnum | Prisma.RfqVendorScalarFieldEnum[];
};
export type RfqVendorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    where?: Prisma.RfqVendorWhereInput;
    orderBy?: Prisma.RfqVendorOrderByWithRelationInput | Prisma.RfqVendorOrderByWithRelationInput[];
    cursor?: Prisma.RfqVendorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RfqVendorScalarFieldEnum | Prisma.RfqVendorScalarFieldEnum[];
};
export type RfqVendorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqVendorCreateInput, Prisma.RfqVendorUncheckedCreateInput>;
};
export type RfqVendorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RfqVendorCreateManyInput | Prisma.RfqVendorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RfqVendorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    data: Prisma.RfqVendorCreateManyInput | Prisma.RfqVendorCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RfqVendorIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RfqVendorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqVendorUpdateInput, Prisma.RfqVendorUncheckedUpdateInput>;
    where: Prisma.RfqVendorWhereUniqueInput;
};
export type RfqVendorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RfqVendorUpdateManyMutationInput, Prisma.RfqVendorUncheckedUpdateManyInput>;
    where?: Prisma.RfqVendorWhereInput;
    limit?: number;
};
export type RfqVendorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RfqVendorUpdateManyMutationInput, Prisma.RfqVendorUncheckedUpdateManyInput>;
    where?: Prisma.RfqVendorWhereInput;
    limit?: number;
    include?: Prisma.RfqVendorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RfqVendorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    where: Prisma.RfqVendorWhereUniqueInput;
    create: Prisma.XOR<Prisma.RfqVendorCreateInput, Prisma.RfqVendorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RfqVendorUpdateInput, Prisma.RfqVendorUncheckedUpdateInput>;
};
export type RfqVendorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
    where: Prisma.RfqVendorWhereUniqueInput;
};
export type RfqVendorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RfqVendorWhereInput;
    limit?: number;
};
export type RfqVendorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RfqVendorSelect<ExtArgs> | null;
    omit?: Prisma.RfqVendorOmit<ExtArgs> | null;
    include?: Prisma.RfqVendorInclude<ExtArgs> | null;
};
