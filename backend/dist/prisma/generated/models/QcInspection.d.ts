import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type QcInspectionModel = runtime.Types.Result.DefaultSelection<Prisma.$QcInspectionPayload>;
export type AggregateQcInspection = {
    _count: QcInspectionCountAggregateOutputType | null;
    _min: QcInspectionMinAggregateOutputType | null;
    _max: QcInspectionMaxAggregateOutputType | null;
};
export type QcInspectionMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    grnId: string | null;
    productionId: string | null;
    inspectionDate: Date | null;
    status: $Enums.InventoryDocStatus | null;
    inspectorName: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QcInspectionMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    grnId: string | null;
    productionId: string | null;
    inspectionDate: Date | null;
    status: $Enums.InventoryDocStatus | null;
    inspectorName: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type QcInspectionCountAggregateOutputType = {
    id: number;
    tenantId: number;
    code: number;
    grnId: number;
    productionId: number;
    inspectionDate: number;
    status: number;
    inspectorName: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type QcInspectionMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    grnId?: true;
    productionId?: true;
    inspectionDate?: true;
    status?: true;
    inspectorName?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QcInspectionMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    grnId?: true;
    productionId?: true;
    inspectionDate?: true;
    status?: true;
    inspectorName?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type QcInspectionCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    grnId?: true;
    productionId?: true;
    inspectionDate?: true;
    status?: true;
    inspectorName?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type QcInspectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QcInspectionWhereInput;
    orderBy?: Prisma.QcInspectionOrderByWithRelationInput | Prisma.QcInspectionOrderByWithRelationInput[];
    cursor?: Prisma.QcInspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QcInspectionCountAggregateInputType;
    _min?: QcInspectionMinAggregateInputType;
    _max?: QcInspectionMaxAggregateInputType;
};
export type GetQcInspectionAggregateType<T extends QcInspectionAggregateArgs> = {
    [P in keyof T & keyof AggregateQcInspection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQcInspection[P]> : Prisma.GetScalarType<T[P], AggregateQcInspection[P]>;
};
export type QcInspectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QcInspectionWhereInput;
    orderBy?: Prisma.QcInspectionOrderByWithAggregationInput | Prisma.QcInspectionOrderByWithAggregationInput[];
    by: Prisma.QcInspectionScalarFieldEnum[] | Prisma.QcInspectionScalarFieldEnum;
    having?: Prisma.QcInspectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QcInspectionCountAggregateInputType | true;
    _min?: QcInspectionMinAggregateInputType;
    _max?: QcInspectionMaxAggregateInputType;
};
export type QcInspectionGroupByOutputType = {
    id: string;
    tenantId: string;
    code: string;
    grnId: string | null;
    productionId: string | null;
    inspectionDate: Date;
    status: $Enums.InventoryDocStatus;
    inspectorName: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: QcInspectionCountAggregateOutputType | null;
    _min: QcInspectionMinAggregateOutputType | null;
    _max: QcInspectionMaxAggregateOutputType | null;
};
export type GetQcInspectionGroupByPayload<T extends QcInspectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QcInspectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QcInspectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QcInspectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QcInspectionGroupByOutputType[P]>;
}>>;
export type QcInspectionWhereInput = {
    AND?: Prisma.QcInspectionWhereInput | Prisma.QcInspectionWhereInput[];
    OR?: Prisma.QcInspectionWhereInput[];
    NOT?: Prisma.QcInspectionWhereInput | Prisma.QcInspectionWhereInput[];
    id?: Prisma.StringFilter<"QcInspection"> | string;
    tenantId?: Prisma.StringFilter<"QcInspection"> | string;
    code?: Prisma.StringFilter<"QcInspection"> | string;
    grnId?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    productionId?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    inspectionDate?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusFilter<"QcInspection"> | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    notes?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    grn?: Prisma.XOR<Prisma.GoodsReceiptNoteNullableScalarRelationFilter, Prisma.GoodsReceiptNoteWhereInput> | null;
    items?: Prisma.QcInspectionItemListRelationFilter;
};
export type QcInspectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    grnId?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectionDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    grn?: Prisma.GoodsReceiptNoteOrderByWithRelationInput;
    items?: Prisma.QcInspectionItemOrderByRelationAggregateInput;
};
export type QcInspectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.QcInspectionTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.QcInspectionWhereInput | Prisma.QcInspectionWhereInput[];
    OR?: Prisma.QcInspectionWhereInput[];
    NOT?: Prisma.QcInspectionWhereInput | Prisma.QcInspectionWhereInput[];
    tenantId?: Prisma.StringFilter<"QcInspection"> | string;
    code?: Prisma.StringFilter<"QcInspection"> | string;
    grnId?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    productionId?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    inspectionDate?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusFilter<"QcInspection"> | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    notes?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    grn?: Prisma.XOR<Prisma.GoodsReceiptNoteNullableScalarRelationFilter, Prisma.GoodsReceiptNoteWhereInput> | null;
    items?: Prisma.QcInspectionItemListRelationFilter;
}, "id" | "tenantId_code">;
export type QcInspectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    grnId?: Prisma.SortOrderInput | Prisma.SortOrder;
    productionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    inspectionDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.QcInspectionCountOrderByAggregateInput;
    _max?: Prisma.QcInspectionMaxOrderByAggregateInput;
    _min?: Prisma.QcInspectionMinOrderByAggregateInput;
};
export type QcInspectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QcInspectionScalarWhereWithAggregatesInput | Prisma.QcInspectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QcInspectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QcInspectionScalarWhereWithAggregatesInput | Prisma.QcInspectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QcInspection"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"QcInspection"> | string;
    code?: Prisma.StringWithAggregatesFilter<"QcInspection"> | string;
    grnId?: Prisma.StringNullableWithAggregatesFilter<"QcInspection"> | string | null;
    productionId?: Prisma.StringNullableWithAggregatesFilter<"QcInspection"> | string | null;
    inspectionDate?: Prisma.DateTimeWithAggregatesFilter<"QcInspection"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusWithAggregatesFilter<"QcInspection"> | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.StringNullableWithAggregatesFilter<"QcInspection"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"QcInspection"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"QcInspection"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"QcInspection"> | Date | string;
};
export type QcInspectionCreateInput = {
    id?: string;
    code: string;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutQcInspectionsInput;
    grn?: Prisma.GoodsReceiptNoteCreateNestedOneWithoutQcInspectionsInput;
    items?: Prisma.QcInspectionItemCreateNestedManyWithoutQcInspectionInput;
};
export type QcInspectionUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    grnId?: string | null;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.QcInspectionItemUncheckedCreateNestedManyWithoutQcInspectionInput;
};
export type QcInspectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutQcInspectionsNestedInput;
    grn?: Prisma.GoodsReceiptNoteUpdateOneWithoutQcInspectionsNestedInput;
    items?: Prisma.QcInspectionItemUpdateManyWithoutQcInspectionNestedInput;
};
export type QcInspectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.QcInspectionItemUncheckedUpdateManyWithoutQcInspectionNestedInput;
};
export type QcInspectionCreateManyInput = {
    id?: string;
    tenantId: string;
    code: string;
    grnId?: string | null;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QcInspectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QcInspectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QcInspectionListRelationFilter = {
    every?: Prisma.QcInspectionWhereInput;
    some?: Prisma.QcInspectionWhereInput;
    none?: Prisma.QcInspectionWhereInput;
};
export type QcInspectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QcInspectionTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type QcInspectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    productionId?: Prisma.SortOrder;
    inspectionDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectorName?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QcInspectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    productionId?: Prisma.SortOrder;
    inspectionDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectorName?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QcInspectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    grnId?: Prisma.SortOrder;
    productionId?: Prisma.SortOrder;
    inspectionDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    inspectorName?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type QcInspectionScalarRelationFilter = {
    is?: Prisma.QcInspectionWhereInput;
    isNot?: Prisma.QcInspectionWhereInput;
};
export type QcInspectionCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutTenantInput, Prisma.QcInspectionUncheckedCreateWithoutTenantInput> | Prisma.QcInspectionCreateWithoutTenantInput[] | Prisma.QcInspectionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutTenantInput | Prisma.QcInspectionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.QcInspectionCreateManyTenantInputEnvelope;
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
};
export type QcInspectionUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutTenantInput, Prisma.QcInspectionUncheckedCreateWithoutTenantInput> | Prisma.QcInspectionCreateWithoutTenantInput[] | Prisma.QcInspectionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutTenantInput | Prisma.QcInspectionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.QcInspectionCreateManyTenantInputEnvelope;
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
};
export type QcInspectionUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutTenantInput, Prisma.QcInspectionUncheckedCreateWithoutTenantInput> | Prisma.QcInspectionCreateWithoutTenantInput[] | Prisma.QcInspectionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutTenantInput | Prisma.QcInspectionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.QcInspectionUpsertWithWhereUniqueWithoutTenantInput | Prisma.QcInspectionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.QcInspectionCreateManyTenantInputEnvelope;
    set?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    disconnect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    delete?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    update?: Prisma.QcInspectionUpdateWithWhereUniqueWithoutTenantInput | Prisma.QcInspectionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.QcInspectionUpdateManyWithWhereWithoutTenantInput | Prisma.QcInspectionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.QcInspectionScalarWhereInput | Prisma.QcInspectionScalarWhereInput[];
};
export type QcInspectionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutTenantInput, Prisma.QcInspectionUncheckedCreateWithoutTenantInput> | Prisma.QcInspectionCreateWithoutTenantInput[] | Prisma.QcInspectionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutTenantInput | Prisma.QcInspectionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.QcInspectionUpsertWithWhereUniqueWithoutTenantInput | Prisma.QcInspectionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.QcInspectionCreateManyTenantInputEnvelope;
    set?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    disconnect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    delete?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    update?: Prisma.QcInspectionUpdateWithWhereUniqueWithoutTenantInput | Prisma.QcInspectionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.QcInspectionUpdateManyWithWhereWithoutTenantInput | Prisma.QcInspectionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.QcInspectionScalarWhereInput | Prisma.QcInspectionScalarWhereInput[];
};
export type QcInspectionCreateNestedManyWithoutGrnInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutGrnInput, Prisma.QcInspectionUncheckedCreateWithoutGrnInput> | Prisma.QcInspectionCreateWithoutGrnInput[] | Prisma.QcInspectionUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutGrnInput | Prisma.QcInspectionCreateOrConnectWithoutGrnInput[];
    createMany?: Prisma.QcInspectionCreateManyGrnInputEnvelope;
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
};
export type QcInspectionUncheckedCreateNestedManyWithoutGrnInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutGrnInput, Prisma.QcInspectionUncheckedCreateWithoutGrnInput> | Prisma.QcInspectionCreateWithoutGrnInput[] | Prisma.QcInspectionUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutGrnInput | Prisma.QcInspectionCreateOrConnectWithoutGrnInput[];
    createMany?: Prisma.QcInspectionCreateManyGrnInputEnvelope;
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
};
export type QcInspectionUpdateManyWithoutGrnNestedInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutGrnInput, Prisma.QcInspectionUncheckedCreateWithoutGrnInput> | Prisma.QcInspectionCreateWithoutGrnInput[] | Prisma.QcInspectionUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutGrnInput | Prisma.QcInspectionCreateOrConnectWithoutGrnInput[];
    upsert?: Prisma.QcInspectionUpsertWithWhereUniqueWithoutGrnInput | Prisma.QcInspectionUpsertWithWhereUniqueWithoutGrnInput[];
    createMany?: Prisma.QcInspectionCreateManyGrnInputEnvelope;
    set?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    disconnect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    delete?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    update?: Prisma.QcInspectionUpdateWithWhereUniqueWithoutGrnInput | Prisma.QcInspectionUpdateWithWhereUniqueWithoutGrnInput[];
    updateMany?: Prisma.QcInspectionUpdateManyWithWhereWithoutGrnInput | Prisma.QcInspectionUpdateManyWithWhereWithoutGrnInput[];
    deleteMany?: Prisma.QcInspectionScalarWhereInput | Prisma.QcInspectionScalarWhereInput[];
};
export type QcInspectionUncheckedUpdateManyWithoutGrnNestedInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutGrnInput, Prisma.QcInspectionUncheckedCreateWithoutGrnInput> | Prisma.QcInspectionCreateWithoutGrnInput[] | Prisma.QcInspectionUncheckedCreateWithoutGrnInput[];
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutGrnInput | Prisma.QcInspectionCreateOrConnectWithoutGrnInput[];
    upsert?: Prisma.QcInspectionUpsertWithWhereUniqueWithoutGrnInput | Prisma.QcInspectionUpsertWithWhereUniqueWithoutGrnInput[];
    createMany?: Prisma.QcInspectionCreateManyGrnInputEnvelope;
    set?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    disconnect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    delete?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    connect?: Prisma.QcInspectionWhereUniqueInput | Prisma.QcInspectionWhereUniqueInput[];
    update?: Prisma.QcInspectionUpdateWithWhereUniqueWithoutGrnInput | Prisma.QcInspectionUpdateWithWhereUniqueWithoutGrnInput[];
    updateMany?: Prisma.QcInspectionUpdateManyWithWhereWithoutGrnInput | Prisma.QcInspectionUpdateManyWithWhereWithoutGrnInput[];
    deleteMany?: Prisma.QcInspectionScalarWhereInput | Prisma.QcInspectionScalarWhereInput[];
};
export type QcInspectionCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutItemsInput, Prisma.QcInspectionUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutItemsInput;
    connect?: Prisma.QcInspectionWhereUniqueInput;
};
export type QcInspectionUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.QcInspectionCreateWithoutItemsInput, Prisma.QcInspectionUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.QcInspectionCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.QcInspectionUpsertWithoutItemsInput;
    connect?: Prisma.QcInspectionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QcInspectionUpdateToOneWithWhereWithoutItemsInput, Prisma.QcInspectionUpdateWithoutItemsInput>, Prisma.QcInspectionUncheckedUpdateWithoutItemsInput>;
};
export type QcInspectionCreateWithoutTenantInput = {
    id?: string;
    code: string;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    grn?: Prisma.GoodsReceiptNoteCreateNestedOneWithoutQcInspectionsInput;
    items?: Prisma.QcInspectionItemCreateNestedManyWithoutQcInspectionInput;
};
export type QcInspectionUncheckedCreateWithoutTenantInput = {
    id?: string;
    code: string;
    grnId?: string | null;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.QcInspectionItemUncheckedCreateNestedManyWithoutQcInspectionInput;
};
export type QcInspectionCreateOrConnectWithoutTenantInput = {
    where: Prisma.QcInspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QcInspectionCreateWithoutTenantInput, Prisma.QcInspectionUncheckedCreateWithoutTenantInput>;
};
export type QcInspectionCreateManyTenantInputEnvelope = {
    data: Prisma.QcInspectionCreateManyTenantInput | Prisma.QcInspectionCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type QcInspectionUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.QcInspectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QcInspectionUpdateWithoutTenantInput, Prisma.QcInspectionUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.QcInspectionCreateWithoutTenantInput, Prisma.QcInspectionUncheckedCreateWithoutTenantInput>;
};
export type QcInspectionUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.QcInspectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QcInspectionUpdateWithoutTenantInput, Prisma.QcInspectionUncheckedUpdateWithoutTenantInput>;
};
export type QcInspectionUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.QcInspectionScalarWhereInput;
    data: Prisma.XOR<Prisma.QcInspectionUpdateManyMutationInput, Prisma.QcInspectionUncheckedUpdateManyWithoutTenantInput>;
};
export type QcInspectionScalarWhereInput = {
    AND?: Prisma.QcInspectionScalarWhereInput | Prisma.QcInspectionScalarWhereInput[];
    OR?: Prisma.QcInspectionScalarWhereInput[];
    NOT?: Prisma.QcInspectionScalarWhereInput | Prisma.QcInspectionScalarWhereInput[];
    id?: Prisma.StringFilter<"QcInspection"> | string;
    tenantId?: Prisma.StringFilter<"QcInspection"> | string;
    code?: Prisma.StringFilter<"QcInspection"> | string;
    grnId?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    productionId?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    inspectionDate?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusFilter<"QcInspection"> | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    notes?: Prisma.StringNullableFilter<"QcInspection"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"QcInspection"> | Date | string;
};
export type QcInspectionCreateWithoutGrnInput = {
    id?: string;
    code: string;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutQcInspectionsInput;
    items?: Prisma.QcInspectionItemCreateNestedManyWithoutQcInspectionInput;
};
export type QcInspectionUncheckedCreateWithoutGrnInput = {
    id?: string;
    tenantId: string;
    code: string;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.QcInspectionItemUncheckedCreateNestedManyWithoutQcInspectionInput;
};
export type QcInspectionCreateOrConnectWithoutGrnInput = {
    where: Prisma.QcInspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QcInspectionCreateWithoutGrnInput, Prisma.QcInspectionUncheckedCreateWithoutGrnInput>;
};
export type QcInspectionCreateManyGrnInputEnvelope = {
    data: Prisma.QcInspectionCreateManyGrnInput | Prisma.QcInspectionCreateManyGrnInput[];
    skipDuplicates?: boolean;
};
export type QcInspectionUpsertWithWhereUniqueWithoutGrnInput = {
    where: Prisma.QcInspectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QcInspectionUpdateWithoutGrnInput, Prisma.QcInspectionUncheckedUpdateWithoutGrnInput>;
    create: Prisma.XOR<Prisma.QcInspectionCreateWithoutGrnInput, Prisma.QcInspectionUncheckedCreateWithoutGrnInput>;
};
export type QcInspectionUpdateWithWhereUniqueWithoutGrnInput = {
    where: Prisma.QcInspectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QcInspectionUpdateWithoutGrnInput, Prisma.QcInspectionUncheckedUpdateWithoutGrnInput>;
};
export type QcInspectionUpdateManyWithWhereWithoutGrnInput = {
    where: Prisma.QcInspectionScalarWhereInput;
    data: Prisma.XOR<Prisma.QcInspectionUpdateManyMutationInput, Prisma.QcInspectionUncheckedUpdateManyWithoutGrnInput>;
};
export type QcInspectionCreateWithoutItemsInput = {
    id?: string;
    code: string;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutQcInspectionsInput;
    grn?: Prisma.GoodsReceiptNoteCreateNestedOneWithoutQcInspectionsInput;
};
export type QcInspectionUncheckedCreateWithoutItemsInput = {
    id?: string;
    tenantId: string;
    code: string;
    grnId?: string | null;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QcInspectionCreateOrConnectWithoutItemsInput = {
    where: Prisma.QcInspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QcInspectionCreateWithoutItemsInput, Prisma.QcInspectionUncheckedCreateWithoutItemsInput>;
};
export type QcInspectionUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.QcInspectionUpdateWithoutItemsInput, Prisma.QcInspectionUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.QcInspectionCreateWithoutItemsInput, Prisma.QcInspectionUncheckedCreateWithoutItemsInput>;
    where?: Prisma.QcInspectionWhereInput;
};
export type QcInspectionUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.QcInspectionWhereInput;
    data: Prisma.XOR<Prisma.QcInspectionUpdateWithoutItemsInput, Prisma.QcInspectionUncheckedUpdateWithoutItemsInput>;
};
export type QcInspectionUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutQcInspectionsNestedInput;
    grn?: Prisma.GoodsReceiptNoteUpdateOneWithoutQcInspectionsNestedInput;
};
export type QcInspectionUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QcInspectionCreateManyTenantInput = {
    id?: string;
    code: string;
    grnId?: string | null;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QcInspectionUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    grn?: Prisma.GoodsReceiptNoteUpdateOneWithoutQcInspectionsNestedInput;
    items?: Prisma.QcInspectionItemUpdateManyWithoutQcInspectionNestedInput;
};
export type QcInspectionUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.QcInspectionItemUncheckedUpdateManyWithoutQcInspectionNestedInput;
};
export type QcInspectionUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    grnId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QcInspectionCreateManyGrnInput = {
    id?: string;
    tenantId: string;
    code: string;
    productionId?: string | null;
    inspectionDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    inspectorName?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type QcInspectionUpdateWithoutGrnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutQcInspectionsNestedInput;
    items?: Prisma.QcInspectionItemUpdateManyWithoutQcInspectionNestedInput;
};
export type QcInspectionUncheckedUpdateWithoutGrnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.QcInspectionItemUncheckedUpdateManyWithoutQcInspectionNestedInput;
};
export type QcInspectionUncheckedUpdateManyWithoutGrnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    productionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inspectionDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    inspectorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QcInspectionCountOutputType = {
    items: number;
};
export type QcInspectionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | QcInspectionCountOutputTypeCountItemsArgs;
};
export type QcInspectionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionCountOutputTypeSelect<ExtArgs> | null;
};
export type QcInspectionCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QcInspectionItemWhereInput;
};
export type QcInspectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    grnId?: boolean;
    productionId?: boolean;
    inspectionDate?: boolean;
    status?: boolean;
    inspectorName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.QcInspection$grnArgs<ExtArgs>;
    items?: boolean | Prisma.QcInspection$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.QcInspectionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["qcInspection"]>;
export type QcInspectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    grnId?: boolean;
    productionId?: boolean;
    inspectionDate?: boolean;
    status?: boolean;
    inspectorName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.QcInspection$grnArgs<ExtArgs>;
}, ExtArgs["result"]["qcInspection"]>;
export type QcInspectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    grnId?: boolean;
    productionId?: boolean;
    inspectionDate?: boolean;
    status?: boolean;
    inspectorName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.QcInspection$grnArgs<ExtArgs>;
}, ExtArgs["result"]["qcInspection"]>;
export type QcInspectionSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    grnId?: boolean;
    productionId?: boolean;
    inspectionDate?: boolean;
    status?: boolean;
    inspectorName?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type QcInspectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "code" | "grnId" | "productionId" | "inspectionDate" | "status" | "inspectorName" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["qcInspection"]>;
export type QcInspectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.QcInspection$grnArgs<ExtArgs>;
    items?: boolean | Prisma.QcInspection$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.QcInspectionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type QcInspectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.QcInspection$grnArgs<ExtArgs>;
};
export type QcInspectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    grn?: boolean | Prisma.QcInspection$grnArgs<ExtArgs>;
};
export type $QcInspectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QcInspection";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        grn: Prisma.$GoodsReceiptNotePayload<ExtArgs> | null;
        items: Prisma.$QcInspectionItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        code: string;
        grnId: string | null;
        productionId: string | null;
        inspectionDate: Date;
        status: $Enums.InventoryDocStatus;
        inspectorName: string | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["qcInspection"]>;
    composites: {};
};
export type QcInspectionGetPayload<S extends boolean | null | undefined | QcInspectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload, S>;
export type QcInspectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QcInspectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QcInspectionCountAggregateInputType | true;
};
export interface QcInspectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QcInspection'];
        meta: {
            name: 'QcInspection';
        };
    };
    findUnique<T extends QcInspectionFindUniqueArgs>(args: Prisma.SelectSubset<T, QcInspectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QcInspectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QcInspectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QcInspectionFindFirstArgs>(args?: Prisma.SelectSubset<T, QcInspectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QcInspectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QcInspectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QcInspectionFindManyArgs>(args?: Prisma.SelectSubset<T, QcInspectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QcInspectionCreateArgs>(args: Prisma.SelectSubset<T, QcInspectionCreateArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QcInspectionCreateManyArgs>(args?: Prisma.SelectSubset<T, QcInspectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QcInspectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QcInspectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QcInspectionDeleteArgs>(args: Prisma.SelectSubset<T, QcInspectionDeleteArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QcInspectionUpdateArgs>(args: Prisma.SelectSubset<T, QcInspectionUpdateArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QcInspectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QcInspectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QcInspectionUpdateManyArgs>(args: Prisma.SelectSubset<T, QcInspectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QcInspectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QcInspectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QcInspectionUpsertArgs>(args: Prisma.SelectSubset<T, QcInspectionUpsertArgs<ExtArgs>>): Prisma.Prisma__QcInspectionClient<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QcInspectionCountArgs>(args?: Prisma.Subset<T, QcInspectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QcInspectionCountAggregateOutputType> : number>;
    aggregate<T extends QcInspectionAggregateArgs>(args: Prisma.Subset<T, QcInspectionAggregateArgs>): Prisma.PrismaPromise<GetQcInspectionAggregateType<T>>;
    groupBy<T extends QcInspectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QcInspectionGroupByArgs['orderBy'];
    } : {
        orderBy?: QcInspectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QcInspectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQcInspectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QcInspectionFieldRefs;
}
export interface Prisma__QcInspectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    grn<T extends Prisma.QcInspection$grnArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QcInspection$grnArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.QcInspection$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QcInspection$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QcInspectionItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QcInspectionFieldRefs {
    readonly id: Prisma.FieldRef<"QcInspection", 'String'>;
    readonly tenantId: Prisma.FieldRef<"QcInspection", 'String'>;
    readonly code: Prisma.FieldRef<"QcInspection", 'String'>;
    readonly grnId: Prisma.FieldRef<"QcInspection", 'String'>;
    readonly productionId: Prisma.FieldRef<"QcInspection", 'String'>;
    readonly inspectionDate: Prisma.FieldRef<"QcInspection", 'DateTime'>;
    readonly status: Prisma.FieldRef<"QcInspection", 'InventoryDocStatus'>;
    readonly inspectorName: Prisma.FieldRef<"QcInspection", 'String'>;
    readonly notes: Prisma.FieldRef<"QcInspection", 'String'>;
    readonly createdAt: Prisma.FieldRef<"QcInspection", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"QcInspection", 'DateTime'>;
}
export type QcInspectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    where: Prisma.QcInspectionWhereUniqueInput;
};
export type QcInspectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    where: Prisma.QcInspectionWhereUniqueInput;
};
export type QcInspectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    where?: Prisma.QcInspectionWhereInput;
    orderBy?: Prisma.QcInspectionOrderByWithRelationInput | Prisma.QcInspectionOrderByWithRelationInput[];
    cursor?: Prisma.QcInspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QcInspectionScalarFieldEnum | Prisma.QcInspectionScalarFieldEnum[];
};
export type QcInspectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    where?: Prisma.QcInspectionWhereInput;
    orderBy?: Prisma.QcInspectionOrderByWithRelationInput | Prisma.QcInspectionOrderByWithRelationInput[];
    cursor?: Prisma.QcInspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QcInspectionScalarFieldEnum | Prisma.QcInspectionScalarFieldEnum[];
};
export type QcInspectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    where?: Prisma.QcInspectionWhereInput;
    orderBy?: Prisma.QcInspectionOrderByWithRelationInput | Prisma.QcInspectionOrderByWithRelationInput[];
    cursor?: Prisma.QcInspectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QcInspectionScalarFieldEnum | Prisma.QcInspectionScalarFieldEnum[];
};
export type QcInspectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QcInspectionCreateInput, Prisma.QcInspectionUncheckedCreateInput>;
};
export type QcInspectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QcInspectionCreateManyInput | Prisma.QcInspectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QcInspectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    data: Prisma.QcInspectionCreateManyInput | Prisma.QcInspectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QcInspectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QcInspectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QcInspectionUpdateInput, Prisma.QcInspectionUncheckedUpdateInput>;
    where: Prisma.QcInspectionWhereUniqueInput;
};
export type QcInspectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QcInspectionUpdateManyMutationInput, Prisma.QcInspectionUncheckedUpdateManyInput>;
    where?: Prisma.QcInspectionWhereInput;
    limit?: number;
};
export type QcInspectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QcInspectionUpdateManyMutationInput, Prisma.QcInspectionUncheckedUpdateManyInput>;
    where?: Prisma.QcInspectionWhereInput;
    limit?: number;
    include?: Prisma.QcInspectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QcInspectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    where: Prisma.QcInspectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QcInspectionCreateInput, Prisma.QcInspectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QcInspectionUpdateInput, Prisma.QcInspectionUncheckedUpdateInput>;
};
export type QcInspectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
    where: Prisma.QcInspectionWhereUniqueInput;
};
export type QcInspectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QcInspectionWhereInput;
    limit?: number;
};
export type QcInspection$grnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptNoteWhereInput;
};
export type QcInspection$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionItemSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionItemOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionItemInclude<ExtArgs> | null;
    where?: Prisma.QcInspectionItemWhereInput;
    orderBy?: Prisma.QcInspectionItemOrderByWithRelationInput | Prisma.QcInspectionItemOrderByWithRelationInput[];
    cursor?: Prisma.QcInspectionItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QcInspectionItemScalarFieldEnum | Prisma.QcInspectionItemScalarFieldEnum[];
};
export type QcInspectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QcInspectionSelect<ExtArgs> | null;
    omit?: Prisma.QcInspectionOmit<ExtArgs> | null;
    include?: Prisma.QcInspectionInclude<ExtArgs> | null;
};
