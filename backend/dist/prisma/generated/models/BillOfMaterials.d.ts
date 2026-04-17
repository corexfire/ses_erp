import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BillOfMaterialsModel = runtime.Types.Result.DefaultSelection<Prisma.$BillOfMaterialsPayload>;
export type AggregateBillOfMaterials = {
    _count: BillOfMaterialsCountAggregateOutputType | null;
    _avg: BillOfMaterialsAvgAggregateOutputType | null;
    _sum: BillOfMaterialsSumAggregateOutputType | null;
    _min: BillOfMaterialsMinAggregateOutputType | null;
    _max: BillOfMaterialsMaxAggregateOutputType | null;
};
export type BillOfMaterialsAvgAggregateOutputType = {
    version: number | null;
};
export type BillOfMaterialsSumAggregateOutputType = {
    version: number | null;
};
export type BillOfMaterialsMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    name: string | null;
    itemId: string | null;
    version: number | null;
    isActive: boolean | null;
    isMain: boolean | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BillOfMaterialsMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    name: string | null;
    itemId: string | null;
    version: number | null;
    isActive: boolean | null;
    isMain: boolean | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BillOfMaterialsCountAggregateOutputType = {
    id: number;
    tenantId: number;
    code: number;
    name: number;
    itemId: number;
    version: number;
    isActive: number;
    isMain: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BillOfMaterialsAvgAggregateInputType = {
    version?: true;
};
export type BillOfMaterialsSumAggregateInputType = {
    version?: true;
};
export type BillOfMaterialsMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    name?: true;
    itemId?: true;
    version?: true;
    isActive?: true;
    isMain?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BillOfMaterialsMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    name?: true;
    itemId?: true;
    version?: true;
    isActive?: true;
    isMain?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BillOfMaterialsCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    name?: true;
    itemId?: true;
    version?: true;
    isActive?: true;
    isMain?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BillOfMaterialsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillOfMaterialsWhereInput;
    orderBy?: Prisma.BillOfMaterialsOrderByWithRelationInput | Prisma.BillOfMaterialsOrderByWithRelationInput[];
    cursor?: Prisma.BillOfMaterialsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BillOfMaterialsCountAggregateInputType;
    _avg?: BillOfMaterialsAvgAggregateInputType;
    _sum?: BillOfMaterialsSumAggregateInputType;
    _min?: BillOfMaterialsMinAggregateInputType;
    _max?: BillOfMaterialsMaxAggregateInputType;
};
export type GetBillOfMaterialsAggregateType<T extends BillOfMaterialsAggregateArgs> = {
    [P in keyof T & keyof AggregateBillOfMaterials]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBillOfMaterials[P]> : Prisma.GetScalarType<T[P], AggregateBillOfMaterials[P]>;
};
export type BillOfMaterialsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillOfMaterialsWhereInput;
    orderBy?: Prisma.BillOfMaterialsOrderByWithAggregationInput | Prisma.BillOfMaterialsOrderByWithAggregationInput[];
    by: Prisma.BillOfMaterialsScalarFieldEnum[] | Prisma.BillOfMaterialsScalarFieldEnum;
    having?: Prisma.BillOfMaterialsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BillOfMaterialsCountAggregateInputType | true;
    _avg?: BillOfMaterialsAvgAggregateInputType;
    _sum?: BillOfMaterialsSumAggregateInputType;
    _min?: BillOfMaterialsMinAggregateInputType;
    _max?: BillOfMaterialsMaxAggregateInputType;
};
export type BillOfMaterialsGroupByOutputType = {
    id: string;
    tenantId: string;
    code: string;
    name: string;
    itemId: string;
    version: number;
    isActive: boolean;
    isMain: boolean;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BillOfMaterialsCountAggregateOutputType | null;
    _avg: BillOfMaterialsAvgAggregateOutputType | null;
    _sum: BillOfMaterialsSumAggregateOutputType | null;
    _min: BillOfMaterialsMinAggregateOutputType | null;
    _max: BillOfMaterialsMaxAggregateOutputType | null;
};
export type GetBillOfMaterialsGroupByPayload<T extends BillOfMaterialsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BillOfMaterialsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BillOfMaterialsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BillOfMaterialsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BillOfMaterialsGroupByOutputType[P]>;
}>>;
export type BillOfMaterialsWhereInput = {
    AND?: Prisma.BillOfMaterialsWhereInput | Prisma.BillOfMaterialsWhereInput[];
    OR?: Prisma.BillOfMaterialsWhereInput[];
    NOT?: Prisma.BillOfMaterialsWhereInput | Prisma.BillOfMaterialsWhereInput[];
    id?: Prisma.StringFilter<"BillOfMaterials"> | string;
    tenantId?: Prisma.StringFilter<"BillOfMaterials"> | string;
    code?: Prisma.StringFilter<"BillOfMaterials"> | string;
    name?: Prisma.StringFilter<"BillOfMaterials"> | string;
    itemId?: Prisma.StringFilter<"BillOfMaterials"> | string;
    version?: Prisma.IntFilter<"BillOfMaterials"> | number;
    isActive?: Prisma.BoolFilter<"BillOfMaterials"> | boolean;
    isMain?: Prisma.BoolFilter<"BillOfMaterials"> | boolean;
    notes?: Prisma.StringNullableFilter<"BillOfMaterials"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BillOfMaterials"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BillOfMaterials"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    item?: Prisma.XOR<Prisma.ItemScalarRelationFilter, Prisma.ItemWhereInput>;
    items?: Prisma.BillOfMaterialsItemListRelationFilter;
    workOrders?: Prisma.WorkOrderListRelationFilter;
};
export type BillOfMaterialsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isMain?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    item?: Prisma.ItemOrderByWithRelationInput;
    items?: Prisma.BillOfMaterialsItemOrderByRelationAggregateInput;
    workOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
};
export type BillOfMaterialsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.BillOfMaterialsTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.BillOfMaterialsWhereInput | Prisma.BillOfMaterialsWhereInput[];
    OR?: Prisma.BillOfMaterialsWhereInput[];
    NOT?: Prisma.BillOfMaterialsWhereInput | Prisma.BillOfMaterialsWhereInput[];
    tenantId?: Prisma.StringFilter<"BillOfMaterials"> | string;
    code?: Prisma.StringFilter<"BillOfMaterials"> | string;
    name?: Prisma.StringFilter<"BillOfMaterials"> | string;
    itemId?: Prisma.StringFilter<"BillOfMaterials"> | string;
    version?: Prisma.IntFilter<"BillOfMaterials"> | number;
    isActive?: Prisma.BoolFilter<"BillOfMaterials"> | boolean;
    isMain?: Prisma.BoolFilter<"BillOfMaterials"> | boolean;
    notes?: Prisma.StringNullableFilter<"BillOfMaterials"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BillOfMaterials"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BillOfMaterials"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    item?: Prisma.XOR<Prisma.ItemScalarRelationFilter, Prisma.ItemWhereInput>;
    items?: Prisma.BillOfMaterialsItemListRelationFilter;
    workOrders?: Prisma.WorkOrderListRelationFilter;
}, "id" | "tenantId_code">;
export type BillOfMaterialsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isMain?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BillOfMaterialsCountOrderByAggregateInput;
    _avg?: Prisma.BillOfMaterialsAvgOrderByAggregateInput;
    _max?: Prisma.BillOfMaterialsMaxOrderByAggregateInput;
    _min?: Prisma.BillOfMaterialsMinOrderByAggregateInput;
    _sum?: Prisma.BillOfMaterialsSumOrderByAggregateInput;
};
export type BillOfMaterialsScalarWhereWithAggregatesInput = {
    AND?: Prisma.BillOfMaterialsScalarWhereWithAggregatesInput | Prisma.BillOfMaterialsScalarWhereWithAggregatesInput[];
    OR?: Prisma.BillOfMaterialsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BillOfMaterialsScalarWhereWithAggregatesInput | Prisma.BillOfMaterialsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BillOfMaterials"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"BillOfMaterials"> | string;
    code?: Prisma.StringWithAggregatesFilter<"BillOfMaterials"> | string;
    name?: Prisma.StringWithAggregatesFilter<"BillOfMaterials"> | string;
    itemId?: Prisma.StringWithAggregatesFilter<"BillOfMaterials"> | string;
    version?: Prisma.IntWithAggregatesFilter<"BillOfMaterials"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"BillOfMaterials"> | boolean;
    isMain?: Prisma.BoolWithAggregatesFilter<"BillOfMaterials"> | boolean;
    notes?: Prisma.StringNullableWithAggregatesFilter<"BillOfMaterials"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BillOfMaterials"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BillOfMaterials"> | Date | string;
};
export type BillOfMaterialsCreateInput = {
    id?: string;
    code: string;
    name: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutBillOfMaterialsInput;
    item: Prisma.ItemCreateNestedOneWithoutBillOfMaterialsInput;
    items?: Prisma.BillOfMaterialsItemCreateNestedManyWithoutBomInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    itemId: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedCreateNestedManyWithoutBomInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    item?: Prisma.ItemUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    items?: Prisma.BillOfMaterialsItemUpdateManyWithoutBomNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedUpdateManyWithoutBomNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsCreateManyInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    itemId: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillOfMaterialsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillOfMaterialsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillOfMaterialsListRelationFilter = {
    every?: Prisma.BillOfMaterialsWhereInput;
    some?: Prisma.BillOfMaterialsWhereInput;
    none?: Prisma.BillOfMaterialsWhereInput;
};
export type BillOfMaterialsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BillOfMaterialsTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type BillOfMaterialsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isMain?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillOfMaterialsAvgOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type BillOfMaterialsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isMain?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillOfMaterialsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    itemId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    isMain?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillOfMaterialsSumOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type BillOfMaterialsScalarRelationFilter = {
    is?: Prisma.BillOfMaterialsWhereInput;
    isNot?: Prisma.BillOfMaterialsWhereInput;
};
export type BillOfMaterialsNullableScalarRelationFilter = {
    is?: Prisma.BillOfMaterialsWhereInput | null;
    isNot?: Prisma.BillOfMaterialsWhereInput | null;
};
export type BillOfMaterialsCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput> | Prisma.BillOfMaterialsCreateWithoutTenantInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput | Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyTenantInputEnvelope;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
};
export type BillOfMaterialsUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput> | Prisma.BillOfMaterialsCreateWithoutTenantInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput | Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyTenantInputEnvelope;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
};
export type BillOfMaterialsUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput> | Prisma.BillOfMaterialsCreateWithoutTenantInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput | Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutTenantInput | Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyTenantInputEnvelope;
    set?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    disconnect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    delete?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    update?: Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutTenantInput | Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.BillOfMaterialsUpdateManyWithWhereWithoutTenantInput | Prisma.BillOfMaterialsUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.BillOfMaterialsScalarWhereInput | Prisma.BillOfMaterialsScalarWhereInput[];
};
export type BillOfMaterialsUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput> | Prisma.BillOfMaterialsCreateWithoutTenantInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput | Prisma.BillOfMaterialsCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutTenantInput | Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyTenantInputEnvelope;
    set?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    disconnect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    delete?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    update?: Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutTenantInput | Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.BillOfMaterialsUpdateManyWithWhereWithoutTenantInput | Prisma.BillOfMaterialsUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.BillOfMaterialsScalarWhereInput | Prisma.BillOfMaterialsScalarWhereInput[];
};
export type BillOfMaterialsCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput> | Prisma.BillOfMaterialsCreateWithoutItemInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput | Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyItemInputEnvelope;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
};
export type BillOfMaterialsUncheckedCreateNestedManyWithoutItemInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput> | Prisma.BillOfMaterialsCreateWithoutItemInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput | Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyItemInputEnvelope;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
};
export type BillOfMaterialsUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput> | Prisma.BillOfMaterialsCreateWithoutItemInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput | Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutItemInput | Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyItemInputEnvelope;
    set?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    disconnect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    delete?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    update?: Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutItemInput | Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.BillOfMaterialsUpdateManyWithWhereWithoutItemInput | Prisma.BillOfMaterialsUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.BillOfMaterialsScalarWhereInput | Prisma.BillOfMaterialsScalarWhereInput[];
};
export type BillOfMaterialsUncheckedUpdateManyWithoutItemNestedInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput> | Prisma.BillOfMaterialsCreateWithoutItemInput[] | Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput[];
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput | Prisma.BillOfMaterialsCreateOrConnectWithoutItemInput[];
    upsert?: Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutItemInput | Prisma.BillOfMaterialsUpsertWithWhereUniqueWithoutItemInput[];
    createMany?: Prisma.BillOfMaterialsCreateManyItemInputEnvelope;
    set?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    disconnect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    delete?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    connect?: Prisma.BillOfMaterialsWhereUniqueInput | Prisma.BillOfMaterialsWhereUniqueInput[];
    update?: Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutItemInput | Prisma.BillOfMaterialsUpdateWithWhereUniqueWithoutItemInput[];
    updateMany?: Prisma.BillOfMaterialsUpdateManyWithWhereWithoutItemInput | Prisma.BillOfMaterialsUpdateManyWithWhereWithoutItemInput[];
    deleteMany?: Prisma.BillOfMaterialsScalarWhereInput | Prisma.BillOfMaterialsScalarWhereInput[];
};
export type BillOfMaterialsCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemsInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutItemsInput;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput;
};
export type BillOfMaterialsUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemsInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.BillOfMaterialsUpsertWithoutItemsInput;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BillOfMaterialsUpdateToOneWithWhereWithoutItemsInput, Prisma.BillOfMaterialsUpdateWithoutItemsInput>, Prisma.BillOfMaterialsUncheckedUpdateWithoutItemsInput>;
};
export type BillOfMaterialsCreateNestedOneWithoutWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutWorkOrdersInput, Prisma.BillOfMaterialsUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutWorkOrdersInput;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput;
};
export type BillOfMaterialsUpdateOneWithoutWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutWorkOrdersInput, Prisma.BillOfMaterialsUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.BillOfMaterialsCreateOrConnectWithoutWorkOrdersInput;
    upsert?: Prisma.BillOfMaterialsUpsertWithoutWorkOrdersInput;
    disconnect?: Prisma.BillOfMaterialsWhereInput | boolean;
    delete?: Prisma.BillOfMaterialsWhereInput | boolean;
    connect?: Prisma.BillOfMaterialsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BillOfMaterialsUpdateToOneWithWhereWithoutWorkOrdersInput, Prisma.BillOfMaterialsUpdateWithoutWorkOrdersInput>, Prisma.BillOfMaterialsUncheckedUpdateWithoutWorkOrdersInput>;
};
export type BillOfMaterialsCreateWithoutTenantInput = {
    id?: string;
    code: string;
    name: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    item: Prisma.ItemCreateNestedOneWithoutBillOfMaterialsInput;
    items?: Prisma.BillOfMaterialsItemCreateNestedManyWithoutBomInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsUncheckedCreateWithoutTenantInput = {
    id?: string;
    code: string;
    name: string;
    itemId: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedCreateNestedManyWithoutBomInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsCreateOrConnectWithoutTenantInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput>;
};
export type BillOfMaterialsCreateManyTenantInputEnvelope = {
    data: Prisma.BillOfMaterialsCreateManyTenantInput | Prisma.BillOfMaterialsCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type BillOfMaterialsUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    update: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedCreateWithoutTenantInput>;
};
export type BillOfMaterialsUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutTenantInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutTenantInput>;
};
export type BillOfMaterialsUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.BillOfMaterialsScalarWhereInput;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateManyMutationInput, Prisma.BillOfMaterialsUncheckedUpdateManyWithoutTenantInput>;
};
export type BillOfMaterialsScalarWhereInput = {
    AND?: Prisma.BillOfMaterialsScalarWhereInput | Prisma.BillOfMaterialsScalarWhereInput[];
    OR?: Prisma.BillOfMaterialsScalarWhereInput[];
    NOT?: Prisma.BillOfMaterialsScalarWhereInput | Prisma.BillOfMaterialsScalarWhereInput[];
    id?: Prisma.StringFilter<"BillOfMaterials"> | string;
    tenantId?: Prisma.StringFilter<"BillOfMaterials"> | string;
    code?: Prisma.StringFilter<"BillOfMaterials"> | string;
    name?: Prisma.StringFilter<"BillOfMaterials"> | string;
    itemId?: Prisma.StringFilter<"BillOfMaterials"> | string;
    version?: Prisma.IntFilter<"BillOfMaterials"> | number;
    isActive?: Prisma.BoolFilter<"BillOfMaterials"> | boolean;
    isMain?: Prisma.BoolFilter<"BillOfMaterials"> | boolean;
    notes?: Prisma.StringNullableFilter<"BillOfMaterials"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BillOfMaterials"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BillOfMaterials"> | Date | string;
};
export type BillOfMaterialsCreateWithoutItemInput = {
    id?: string;
    code: string;
    name: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutBillOfMaterialsInput;
    items?: Prisma.BillOfMaterialsItemCreateNestedManyWithoutBomInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsUncheckedCreateWithoutItemInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedCreateNestedManyWithoutBomInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsCreateOrConnectWithoutItemInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput>;
};
export type BillOfMaterialsCreateManyItemInputEnvelope = {
    data: Prisma.BillOfMaterialsCreateManyItemInput | Prisma.BillOfMaterialsCreateManyItemInput[];
    skipDuplicates?: boolean;
};
export type BillOfMaterialsUpsertWithWhereUniqueWithoutItemInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    update: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutItemInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutItemInput>;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemInput>;
};
export type BillOfMaterialsUpdateWithWhereUniqueWithoutItemInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutItemInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutItemInput>;
};
export type BillOfMaterialsUpdateManyWithWhereWithoutItemInput = {
    where: Prisma.BillOfMaterialsScalarWhereInput;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateManyMutationInput, Prisma.BillOfMaterialsUncheckedUpdateManyWithoutItemInput>;
};
export type BillOfMaterialsCreateWithoutItemsInput = {
    id?: string;
    code: string;
    name: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutBillOfMaterialsInput;
    item: Prisma.ItemCreateNestedOneWithoutBillOfMaterialsInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsUncheckedCreateWithoutItemsInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    itemId: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsCreateOrConnectWithoutItemsInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemsInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemsInput>;
};
export type BillOfMaterialsUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutItemsInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutItemsInput, Prisma.BillOfMaterialsUncheckedCreateWithoutItemsInput>;
    where?: Prisma.BillOfMaterialsWhereInput;
};
export type BillOfMaterialsUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.BillOfMaterialsWhereInput;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutItemsInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutItemsInput>;
};
export type BillOfMaterialsUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    item?: Prisma.ItemUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsCreateWithoutWorkOrdersInput = {
    id?: string;
    code: string;
    name: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutBillOfMaterialsInput;
    item: Prisma.ItemCreateNestedOneWithoutBillOfMaterialsInput;
    items?: Prisma.BillOfMaterialsItemCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsUncheckedCreateWithoutWorkOrdersInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    itemId: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedCreateNestedManyWithoutBomInput;
};
export type BillOfMaterialsCreateOrConnectWithoutWorkOrdersInput = {
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutWorkOrdersInput, Prisma.BillOfMaterialsUncheckedCreateWithoutWorkOrdersInput>;
};
export type BillOfMaterialsUpsertWithoutWorkOrdersInput = {
    update: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutWorkOrdersInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutWorkOrdersInput>;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateWithoutWorkOrdersInput, Prisma.BillOfMaterialsUncheckedCreateWithoutWorkOrdersInput>;
    where?: Prisma.BillOfMaterialsWhereInput;
};
export type BillOfMaterialsUpdateToOneWithWhereWithoutWorkOrdersInput = {
    where?: Prisma.BillOfMaterialsWhereInput;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateWithoutWorkOrdersInput, Prisma.BillOfMaterialsUncheckedUpdateWithoutWorkOrdersInput>;
};
export type BillOfMaterialsUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    item?: Prisma.ItemUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    items?: Prisma.BillOfMaterialsItemUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsUncheckedUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsCreateManyTenantInput = {
    id?: string;
    code: string;
    name: string;
    itemId: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillOfMaterialsUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    item?: Prisma.ItemUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    items?: Prisma.BillOfMaterialsItemUpdateManyWithoutBomNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedUpdateManyWithoutBomNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    itemId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillOfMaterialsCreateManyItemInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    version?: number;
    isActive?: boolean;
    isMain?: boolean;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillOfMaterialsUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutBillOfMaterialsNestedInput;
    items?: Prisma.BillOfMaterialsItemUpdateManyWithoutBomNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsUncheckedUpdateWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BillOfMaterialsItemUncheckedUpdateManyWithoutBomNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutBomNestedInput;
};
export type BillOfMaterialsUncheckedUpdateManyWithoutItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isMain?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillOfMaterialsCountOutputType = {
    items: number;
    workOrders: number;
};
export type BillOfMaterialsCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | BillOfMaterialsCountOutputTypeCountItemsArgs;
    workOrders?: boolean | BillOfMaterialsCountOutputTypeCountWorkOrdersArgs;
};
export type BillOfMaterialsCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsCountOutputTypeSelect<ExtArgs> | null;
};
export type BillOfMaterialsCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillOfMaterialsItemWhereInput;
};
export type BillOfMaterialsCountOutputTypeCountWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
export type BillOfMaterialsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    itemId?: boolean;
    version?: boolean;
    isActive?: boolean;
    isMain?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.BillOfMaterials$itemsArgs<ExtArgs>;
    workOrders?: boolean | Prisma.BillOfMaterials$workOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.BillOfMaterialsCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["billOfMaterials"]>;
export type BillOfMaterialsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    itemId?: boolean;
    version?: boolean;
    isActive?: boolean;
    isMain?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["billOfMaterials"]>;
export type BillOfMaterialsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    itemId?: boolean;
    version?: boolean;
    isActive?: boolean;
    isMain?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["billOfMaterials"]>;
export type BillOfMaterialsSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    itemId?: boolean;
    version?: boolean;
    isActive?: boolean;
    isMain?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BillOfMaterialsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "code" | "name" | "itemId" | "version" | "isActive" | "isMain" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["billOfMaterials"]>;
export type BillOfMaterialsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.BillOfMaterials$itemsArgs<ExtArgs>;
    workOrders?: boolean | Prisma.BillOfMaterials$workOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.BillOfMaterialsCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BillOfMaterialsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
};
export type BillOfMaterialsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    item?: boolean | Prisma.ItemDefaultArgs<ExtArgs>;
};
export type $BillOfMaterialsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BillOfMaterials";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        item: Prisma.$ItemPayload<ExtArgs>;
        items: Prisma.$BillOfMaterialsItemPayload<ExtArgs>[];
        workOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        code: string;
        name: string;
        itemId: string;
        version: number;
        isActive: boolean;
        isMain: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["billOfMaterials"]>;
    composites: {};
};
export type BillOfMaterialsGetPayload<S extends boolean | null | undefined | BillOfMaterialsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload, S>;
export type BillOfMaterialsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BillOfMaterialsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BillOfMaterialsCountAggregateInputType | true;
};
export interface BillOfMaterialsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BillOfMaterials'];
        meta: {
            name: 'BillOfMaterials';
        };
    };
    findUnique<T extends BillOfMaterialsFindUniqueArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BillOfMaterialsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BillOfMaterialsFindFirstArgs>(args?: Prisma.SelectSubset<T, BillOfMaterialsFindFirstArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BillOfMaterialsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BillOfMaterialsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BillOfMaterialsFindManyArgs>(args?: Prisma.SelectSubset<T, BillOfMaterialsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BillOfMaterialsCreateArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsCreateArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BillOfMaterialsCreateManyArgs>(args?: Prisma.SelectSubset<T, BillOfMaterialsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BillOfMaterialsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BillOfMaterialsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BillOfMaterialsDeleteArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsDeleteArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BillOfMaterialsUpdateArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsUpdateArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BillOfMaterialsDeleteManyArgs>(args?: Prisma.SelectSubset<T, BillOfMaterialsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BillOfMaterialsUpdateManyArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BillOfMaterialsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BillOfMaterialsUpsertArgs>(args: Prisma.SelectSubset<T, BillOfMaterialsUpsertArgs<ExtArgs>>): Prisma.Prisma__BillOfMaterialsClient<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BillOfMaterialsCountArgs>(args?: Prisma.Subset<T, BillOfMaterialsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BillOfMaterialsCountAggregateOutputType> : number>;
    aggregate<T extends BillOfMaterialsAggregateArgs>(args: Prisma.Subset<T, BillOfMaterialsAggregateArgs>): Prisma.PrismaPromise<GetBillOfMaterialsAggregateType<T>>;
    groupBy<T extends BillOfMaterialsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BillOfMaterialsGroupByArgs['orderBy'];
    } : {
        orderBy?: BillOfMaterialsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BillOfMaterialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillOfMaterialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BillOfMaterialsFieldRefs;
}
export interface Prisma__BillOfMaterialsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    item<T extends Prisma.ItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ItemDefaultArgs<ExtArgs>>): Prisma.Prisma__ItemClient<runtime.Types.Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.BillOfMaterials$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BillOfMaterials$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillOfMaterialsItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    workOrders<T extends Prisma.BillOfMaterials$workOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BillOfMaterials$workOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BillOfMaterialsFieldRefs {
    readonly id: Prisma.FieldRef<"BillOfMaterials", 'String'>;
    readonly tenantId: Prisma.FieldRef<"BillOfMaterials", 'String'>;
    readonly code: Prisma.FieldRef<"BillOfMaterials", 'String'>;
    readonly name: Prisma.FieldRef<"BillOfMaterials", 'String'>;
    readonly itemId: Prisma.FieldRef<"BillOfMaterials", 'String'>;
    readonly version: Prisma.FieldRef<"BillOfMaterials", 'Int'>;
    readonly isActive: Prisma.FieldRef<"BillOfMaterials", 'Boolean'>;
    readonly isMain: Prisma.FieldRef<"BillOfMaterials", 'Boolean'>;
    readonly notes: Prisma.FieldRef<"BillOfMaterials", 'String'>;
    readonly createdAt: Prisma.FieldRef<"BillOfMaterials", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BillOfMaterials", 'DateTime'>;
}
export type BillOfMaterialsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    where: Prisma.BillOfMaterialsWhereUniqueInput;
};
export type BillOfMaterialsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    where: Prisma.BillOfMaterialsWhereUniqueInput;
};
export type BillOfMaterialsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    where?: Prisma.BillOfMaterialsWhereInput;
    orderBy?: Prisma.BillOfMaterialsOrderByWithRelationInput | Prisma.BillOfMaterialsOrderByWithRelationInput[];
    cursor?: Prisma.BillOfMaterialsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillOfMaterialsScalarFieldEnum | Prisma.BillOfMaterialsScalarFieldEnum[];
};
export type BillOfMaterialsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    where?: Prisma.BillOfMaterialsWhereInput;
    orderBy?: Prisma.BillOfMaterialsOrderByWithRelationInput | Prisma.BillOfMaterialsOrderByWithRelationInput[];
    cursor?: Prisma.BillOfMaterialsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillOfMaterialsScalarFieldEnum | Prisma.BillOfMaterialsScalarFieldEnum[];
};
export type BillOfMaterialsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    where?: Prisma.BillOfMaterialsWhereInput;
    orderBy?: Prisma.BillOfMaterialsOrderByWithRelationInput | Prisma.BillOfMaterialsOrderByWithRelationInput[];
    cursor?: Prisma.BillOfMaterialsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillOfMaterialsScalarFieldEnum | Prisma.BillOfMaterialsScalarFieldEnum[];
};
export type BillOfMaterialsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillOfMaterialsCreateInput, Prisma.BillOfMaterialsUncheckedCreateInput>;
};
export type BillOfMaterialsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BillOfMaterialsCreateManyInput | Prisma.BillOfMaterialsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BillOfMaterialsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    data: Prisma.BillOfMaterialsCreateManyInput | Prisma.BillOfMaterialsCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BillOfMaterialsIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BillOfMaterialsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateInput, Prisma.BillOfMaterialsUncheckedUpdateInput>;
    where: Prisma.BillOfMaterialsWhereUniqueInput;
};
export type BillOfMaterialsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateManyMutationInput, Prisma.BillOfMaterialsUncheckedUpdateManyInput>;
    where?: Prisma.BillOfMaterialsWhereInput;
    limit?: number;
};
export type BillOfMaterialsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillOfMaterialsUpdateManyMutationInput, Prisma.BillOfMaterialsUncheckedUpdateManyInput>;
    where?: Prisma.BillOfMaterialsWhereInput;
    limit?: number;
    include?: Prisma.BillOfMaterialsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BillOfMaterialsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    where: Prisma.BillOfMaterialsWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillOfMaterialsCreateInput, Prisma.BillOfMaterialsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BillOfMaterialsUpdateInput, Prisma.BillOfMaterialsUncheckedUpdateInput>;
};
export type BillOfMaterialsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
    where: Prisma.BillOfMaterialsWhereUniqueInput;
};
export type BillOfMaterialsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillOfMaterialsWhereInput;
    limit?: number;
};
export type BillOfMaterials$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsItemSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsItemOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsItemInclude<ExtArgs> | null;
    where?: Prisma.BillOfMaterialsItemWhereInput;
    orderBy?: Prisma.BillOfMaterialsItemOrderByWithRelationInput | Prisma.BillOfMaterialsItemOrderByWithRelationInput[];
    cursor?: Prisma.BillOfMaterialsItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillOfMaterialsItemScalarFieldEnum | Prisma.BillOfMaterialsItemScalarFieldEnum[];
};
export type BillOfMaterials$workOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
export type BillOfMaterialsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillOfMaterialsSelect<ExtArgs> | null;
    omit?: Prisma.BillOfMaterialsOmit<ExtArgs> | null;
    include?: Prisma.BillOfMaterialsInclude<ExtArgs> | null;
};
