import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type GoodsReceiptNoteModel = runtime.Types.Result.DefaultSelection<Prisma.$GoodsReceiptNotePayload>;
export type AggregateGoodsReceiptNote = {
    _count: GoodsReceiptNoteCountAggregateOutputType | null;
    _min: GoodsReceiptNoteMinAggregateOutputType | null;
    _max: GoodsReceiptNoteMaxAggregateOutputType | null;
};
export type GoodsReceiptNoteMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    receiptDate: Date | null;
    status: $Enums.InventoryDocStatus | null;
    supplierId: string | null;
    purchaseOrderId: string | null;
    purchaseInvoiceId: string | null;
    warehouseId: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GoodsReceiptNoteMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    receiptDate: Date | null;
    status: $Enums.InventoryDocStatus | null;
    supplierId: string | null;
    purchaseOrderId: string | null;
    purchaseInvoiceId: string | null;
    warehouseId: string | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GoodsReceiptNoteCountAggregateOutputType = {
    id: number;
    tenantId: number;
    code: number;
    receiptDate: number;
    status: number;
    supplierId: number;
    purchaseOrderId: number;
    purchaseInvoiceId: number;
    warehouseId: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type GoodsReceiptNoteMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    receiptDate?: true;
    status?: true;
    supplierId?: true;
    purchaseOrderId?: true;
    purchaseInvoiceId?: true;
    warehouseId?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GoodsReceiptNoteMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    receiptDate?: true;
    status?: true;
    supplierId?: true;
    purchaseOrderId?: true;
    purchaseInvoiceId?: true;
    warehouseId?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GoodsReceiptNoteCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    receiptDate?: true;
    status?: true;
    supplierId?: true;
    purchaseOrderId?: true;
    purchaseInvoiceId?: true;
    warehouseId?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type GoodsReceiptNoteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoodsReceiptNoteWhereInput;
    orderBy?: Prisma.GoodsReceiptNoteOrderByWithRelationInput | Prisma.GoodsReceiptNoteOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GoodsReceiptNoteCountAggregateInputType;
    _min?: GoodsReceiptNoteMinAggregateInputType;
    _max?: GoodsReceiptNoteMaxAggregateInputType;
};
export type GetGoodsReceiptNoteAggregateType<T extends GoodsReceiptNoteAggregateArgs> = {
    [P in keyof T & keyof AggregateGoodsReceiptNote]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGoodsReceiptNote[P]> : Prisma.GetScalarType<T[P], AggregateGoodsReceiptNote[P]>;
};
export type GoodsReceiptNoteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoodsReceiptNoteWhereInput;
    orderBy?: Prisma.GoodsReceiptNoteOrderByWithAggregationInput | Prisma.GoodsReceiptNoteOrderByWithAggregationInput[];
    by: Prisma.GoodsReceiptNoteScalarFieldEnum[] | Prisma.GoodsReceiptNoteScalarFieldEnum;
    having?: Prisma.GoodsReceiptNoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GoodsReceiptNoteCountAggregateInputType | true;
    _min?: GoodsReceiptNoteMinAggregateInputType;
    _max?: GoodsReceiptNoteMaxAggregateInputType;
};
export type GoodsReceiptNoteGroupByOutputType = {
    id: string;
    tenantId: string;
    code: string;
    receiptDate: Date;
    status: $Enums.InventoryDocStatus;
    supplierId: string | null;
    purchaseOrderId: string | null;
    purchaseInvoiceId: string | null;
    warehouseId: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: GoodsReceiptNoteCountAggregateOutputType | null;
    _min: GoodsReceiptNoteMinAggregateOutputType | null;
    _max: GoodsReceiptNoteMaxAggregateOutputType | null;
};
export type GetGoodsReceiptNoteGroupByPayload<T extends GoodsReceiptNoteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GoodsReceiptNoteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GoodsReceiptNoteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GoodsReceiptNoteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GoodsReceiptNoteGroupByOutputType[P]>;
}>>;
export type GoodsReceiptNoteWhereInput = {
    AND?: Prisma.GoodsReceiptNoteWhereInput | Prisma.GoodsReceiptNoteWhereInput[];
    OR?: Prisma.GoodsReceiptNoteWhereInput[];
    NOT?: Prisma.GoodsReceiptNoteWhereInput | Prisma.GoodsReceiptNoteWhereInput[];
    id?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    tenantId?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    code?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    receiptDate?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusFilter<"GoodsReceiptNote"> | $Enums.InventoryDocStatus;
    supplierId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    purchaseOrderId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    purchaseInvoiceId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    warehouseId?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    notes?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierNullableScalarRelationFilter, Prisma.SupplierWhereInput> | null;
    purchaseOrder?: Prisma.XOR<Prisma.PurchaseOrderNullableScalarRelationFilter, Prisma.PurchaseOrderWhereInput> | null;
    purchaseInvoice?: Prisma.XOR<Prisma.PurchaseInvoiceNullableScalarRelationFilter, Prisma.PurchaseInvoiceWhereInput> | null;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    items?: Prisma.GoodsReceiptItemListRelationFilter;
    qcInspections?: Prisma.QcInspectionListRelationFilter;
    putaways?: Prisma.PutawayListRelationFilter;
    threeWayMatchings?: Prisma.ThreeWayMatchingListRelationFilter;
};
export type GoodsReceiptNoteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receiptDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseInvoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    supplier?: Prisma.SupplierOrderByWithRelationInput;
    purchaseOrder?: Prisma.PurchaseOrderOrderByWithRelationInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceOrderByWithRelationInput;
    warehouse?: Prisma.WarehouseOrderByWithRelationInput;
    items?: Prisma.GoodsReceiptItemOrderByRelationAggregateInput;
    qcInspections?: Prisma.QcInspectionOrderByRelationAggregateInput;
    putaways?: Prisma.PutawayOrderByRelationAggregateInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingOrderByRelationAggregateInput;
};
export type GoodsReceiptNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.GoodsReceiptNoteTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.GoodsReceiptNoteWhereInput | Prisma.GoodsReceiptNoteWhereInput[];
    OR?: Prisma.GoodsReceiptNoteWhereInput[];
    NOT?: Prisma.GoodsReceiptNoteWhereInput | Prisma.GoodsReceiptNoteWhereInput[];
    tenantId?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    code?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    receiptDate?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusFilter<"GoodsReceiptNote"> | $Enums.InventoryDocStatus;
    supplierId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    purchaseOrderId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    purchaseInvoiceId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    warehouseId?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    notes?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierNullableScalarRelationFilter, Prisma.SupplierWhereInput> | null;
    purchaseOrder?: Prisma.XOR<Prisma.PurchaseOrderNullableScalarRelationFilter, Prisma.PurchaseOrderWhereInput> | null;
    purchaseInvoice?: Prisma.XOR<Prisma.PurchaseInvoiceNullableScalarRelationFilter, Prisma.PurchaseInvoiceWhereInput> | null;
    warehouse?: Prisma.XOR<Prisma.WarehouseScalarRelationFilter, Prisma.WarehouseWhereInput>;
    items?: Prisma.GoodsReceiptItemListRelationFilter;
    qcInspections?: Prisma.QcInspectionListRelationFilter;
    putaways?: Prisma.PutawayListRelationFilter;
    threeWayMatchings?: Prisma.ThreeWayMatchingListRelationFilter;
}, "id" | "tenantId_code">;
export type GoodsReceiptNoteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receiptDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseInvoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.GoodsReceiptNoteCountOrderByAggregateInput;
    _max?: Prisma.GoodsReceiptNoteMaxOrderByAggregateInput;
    _min?: Prisma.GoodsReceiptNoteMinOrderByAggregateInput;
};
export type GoodsReceiptNoteScalarWhereWithAggregatesInput = {
    AND?: Prisma.GoodsReceiptNoteScalarWhereWithAggregatesInput | Prisma.GoodsReceiptNoteScalarWhereWithAggregatesInput[];
    OR?: Prisma.GoodsReceiptNoteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GoodsReceiptNoteScalarWhereWithAggregatesInput | Prisma.GoodsReceiptNoteScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"GoodsReceiptNote"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"GoodsReceiptNote"> | string;
    code?: Prisma.StringWithAggregatesFilter<"GoodsReceiptNote"> | string;
    receiptDate?: Prisma.DateTimeWithAggregatesFilter<"GoodsReceiptNote"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusWithAggregatesFilter<"GoodsReceiptNote"> | $Enums.InventoryDocStatus;
    supplierId?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptNote"> | string | null;
    purchaseOrderId?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptNote"> | string | null;
    purchaseInvoiceId?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptNote"> | string | null;
    warehouseId?: Prisma.StringWithAggregatesFilter<"GoodsReceiptNote"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"GoodsReceiptNote"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"GoodsReceiptNote"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"GoodsReceiptNote"> | Date | string;
};
export type GoodsReceiptNoteCreateInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteCreateManyInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoodsReceiptNoteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoodsReceiptNoteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoodsReceiptNoteListRelationFilter = {
    every?: Prisma.GoodsReceiptNoteWhereInput;
    some?: Prisma.GoodsReceiptNoteWhereInput;
    none?: Prisma.GoodsReceiptNoteWhereInput;
};
export type GoodsReceiptNoteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GoodsReceiptNoteTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type GoodsReceiptNoteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receiptDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    purchaseInvoiceId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GoodsReceiptNoteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receiptDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    purchaseInvoiceId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GoodsReceiptNoteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    receiptDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    purchaseOrderId?: Prisma.SortOrder;
    purchaseInvoiceId?: Prisma.SortOrder;
    warehouseId?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GoodsReceiptNoteScalarRelationFilter = {
    is?: Prisma.GoodsReceiptNoteWhereInput;
    isNot?: Prisma.GoodsReceiptNoteWhereInput;
};
export type GoodsReceiptNoteNullableScalarRelationFilter = {
    is?: Prisma.GoodsReceiptNoteWhereInput | null;
    isNot?: Prisma.GoodsReceiptNoteWhereInput | null;
};
export type GoodsReceiptNoteCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptNoteCreateWithoutTenantInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyTenantInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptNoteCreateWithoutTenantInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyTenantInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptNoteCreateWithoutTenantInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyTenantInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutTenantInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput> | Prisma.GoodsReceiptNoteCreateWithoutTenantInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyTenantInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutTenantInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutTenantInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput> | Prisma.GoodsReceiptNoteCreateWithoutSupplierInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManySupplierInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput> | Prisma.GoodsReceiptNoteCreateWithoutSupplierInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManySupplierInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput> | Prisma.GoodsReceiptNoteCreateWithoutSupplierInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutSupplierInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManySupplierInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutSupplierInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutSupplierInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput> | Prisma.GoodsReceiptNoteCreateWithoutSupplierInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutSupplierInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManySupplierInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutSupplierInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutSupplierInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteCreateNestedManyWithoutPurchaseOrderInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseOrderInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUncheckedCreateNestedManyWithoutPurchaseOrderInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseOrderInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseOrderInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseOrderInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseOrderInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseOrderInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutPurchaseOrderNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseOrderInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseOrderInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseOrderInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseOrderInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseOrderInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteCreateNestedManyWithoutPurchaseInvoiceInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseInvoiceInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUncheckedCreateNestedManyWithoutPurchaseInvoiceInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseInvoiceInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUpdateManyWithoutPurchaseInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseInvoiceInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseInvoiceInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseInvoiceInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseInvoiceInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutPurchaseInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput> | Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseInvoiceInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyPurchaseInvoiceInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseInvoiceInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseInvoiceInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseInvoiceInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyWarehouseInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUncheckedCreateNestedManyWithoutWarehouseInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyWarehouseInputEnvelope;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
};
export type GoodsReceiptNoteUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyWarehouseInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutWarehouseInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutWarehouseNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput> | Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput[] | Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput[];
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput | Prisma.GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput[];
    upsert?: Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptNoteUpsertWithWhereUniqueWithoutWarehouseInput[];
    createMany?: Prisma.GoodsReceiptNoteCreateManyWarehouseInputEnvelope;
    set?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    disconnect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    delete?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput | Prisma.GoodsReceiptNoteWhereUniqueInput[];
    update?: Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutWarehouseInput | Prisma.GoodsReceiptNoteUpdateWithWhereUniqueWithoutWarehouseInput[];
    updateMany?: Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutWarehouseInput | Prisma.GoodsReceiptNoteUpdateManyWithWhereWithoutWarehouseInput[];
    deleteMany?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
};
export type EnumInventoryDocStatusFieldUpdateOperationsInput = {
    set?: $Enums.InventoryDocStatus;
};
export type GoodsReceiptNoteCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutItemsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutItemsInput;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutItemsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.GoodsReceiptNoteUpsertWithoutItemsInput;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GoodsReceiptNoteUpdateToOneWithWhereWithoutItemsInput, Prisma.GoodsReceiptNoteUpdateWithoutItemsInput>, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutItemsInput>;
};
export type GoodsReceiptNoteCreateNestedOneWithoutPutawaysInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPutawaysInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPutawaysInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPutawaysInput;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteUpdateOneWithoutPutawaysNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPutawaysInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPutawaysInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutPutawaysInput;
    upsert?: Prisma.GoodsReceiptNoteUpsertWithoutPutawaysInput;
    disconnect?: Prisma.GoodsReceiptNoteWhereInput | boolean;
    delete?: Prisma.GoodsReceiptNoteWhereInput | boolean;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GoodsReceiptNoteUpdateToOneWithWhereWithoutPutawaysInput, Prisma.GoodsReceiptNoteUpdateWithoutPutawaysInput>, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutPutawaysInput>;
};
export type GoodsReceiptNoteCreateNestedOneWithoutQcInspectionsInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutQcInspectionsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutQcInspectionsInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutQcInspectionsInput;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteUpdateOneWithoutQcInspectionsNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutQcInspectionsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutQcInspectionsInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutQcInspectionsInput;
    upsert?: Prisma.GoodsReceiptNoteUpsertWithoutQcInspectionsInput;
    disconnect?: Prisma.GoodsReceiptNoteWhereInput | boolean;
    delete?: Prisma.GoodsReceiptNoteWhereInput | boolean;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GoodsReceiptNoteUpdateToOneWithWhereWithoutQcInspectionsInput, Prisma.GoodsReceiptNoteUpdateWithoutQcInspectionsInput>, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutQcInspectionsInput>;
};
export type GoodsReceiptNoteCreateNestedOneWithoutThreeWayMatchingsInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutThreeWayMatchingsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutThreeWayMatchingsInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutThreeWayMatchingsInput;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteUpdateOneRequiredWithoutThreeWayMatchingsNestedInput = {
    create?: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutThreeWayMatchingsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutThreeWayMatchingsInput>;
    connectOrCreate?: Prisma.GoodsReceiptNoteCreateOrConnectWithoutThreeWayMatchingsInput;
    upsert?: Prisma.GoodsReceiptNoteUpsertWithoutThreeWayMatchingsInput;
    connect?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GoodsReceiptNoteUpdateToOneWithWhereWithoutThreeWayMatchingsInput, Prisma.GoodsReceiptNoteUpdateWithoutThreeWayMatchingsInput>, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutThreeWayMatchingsInput>;
};
export type GoodsReceiptNoteCreateWithoutTenantInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutTenantInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutTenantInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput>;
};
export type GoodsReceiptNoteCreateManyTenantInputEnvelope = {
    data: Prisma.GoodsReceiptNoteCreateManyTenantInput | Prisma.GoodsReceiptNoteCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptNoteUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutTenantInput>;
};
export type GoodsReceiptNoteUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutTenantInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutTenantInput>;
};
export type GoodsReceiptNoteUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.GoodsReceiptNoteScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateManyMutationInput, Prisma.GoodsReceiptNoteUncheckedUpdateManyWithoutTenantInput>;
};
export type GoodsReceiptNoteScalarWhereInput = {
    AND?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
    OR?: Prisma.GoodsReceiptNoteScalarWhereInput[];
    NOT?: Prisma.GoodsReceiptNoteScalarWhereInput | Prisma.GoodsReceiptNoteScalarWhereInput[];
    id?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    tenantId?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    code?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    receiptDate?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    status?: Prisma.EnumInventoryDocStatusFilter<"GoodsReceiptNote"> | $Enums.InventoryDocStatus;
    supplierId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    purchaseOrderId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    purchaseInvoiceId?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    warehouseId?: Prisma.StringFilter<"GoodsReceiptNote"> | string;
    notes?: Prisma.StringNullableFilter<"GoodsReceiptNote"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"GoodsReceiptNote"> | Date | string;
};
export type GoodsReceiptNoteCreateWithoutSupplierInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutSupplierInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutSupplierInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput>;
};
export type GoodsReceiptNoteCreateManySupplierInputEnvelope = {
    data: Prisma.GoodsReceiptNoteCreateManySupplierInput | Prisma.GoodsReceiptNoteCreateManySupplierInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptNoteUpsertWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutSupplierInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutSupplierInput>;
};
export type GoodsReceiptNoteUpdateWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutSupplierInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutSupplierInput>;
};
export type GoodsReceiptNoteUpdateManyWithWhereWithoutSupplierInput = {
    where: Prisma.GoodsReceiptNoteScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateManyMutationInput, Prisma.GoodsReceiptNoteUncheckedUpdateManyWithoutSupplierInput>;
};
export type GoodsReceiptNoteCreateWithoutPurchaseOrderInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutPurchaseOrderInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput>;
};
export type GoodsReceiptNoteCreateManyPurchaseOrderInputEnvelope = {
    data: Prisma.GoodsReceiptNoteCreateManyPurchaseOrderInput | Prisma.GoodsReceiptNoteCreateManyPurchaseOrderInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseOrderInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutPurchaseOrderInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseOrderInput>;
};
export type GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseOrderInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutPurchaseOrderInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutPurchaseOrderInput>;
};
export type GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseOrderInput = {
    where: Prisma.GoodsReceiptNoteScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateManyMutationInput, Prisma.GoodsReceiptNoteUncheckedUpdateManyWithoutPurchaseOrderInput>;
};
export type GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutPurchaseInvoiceInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput>;
};
export type GoodsReceiptNoteCreateManyPurchaseInvoiceInputEnvelope = {
    data: Prisma.GoodsReceiptNoteCreateManyPurchaseInvoiceInput | Prisma.GoodsReceiptNoteCreateManyPurchaseInvoiceInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptNoteUpsertWithWhereUniqueWithoutPurchaseInvoiceInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutPurchaseInvoiceInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPurchaseInvoiceInput>;
};
export type GoodsReceiptNoteUpdateWithWhereUniqueWithoutPurchaseInvoiceInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutPurchaseInvoiceInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutPurchaseInvoiceInput>;
};
export type GoodsReceiptNoteUpdateManyWithWhereWithoutPurchaseInvoiceInput = {
    where: Prisma.GoodsReceiptNoteScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateManyMutationInput, Prisma.GoodsReceiptNoteUncheckedUpdateManyWithoutPurchaseInvoiceInput>;
};
export type GoodsReceiptNoteCreateWithoutWarehouseInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput>;
};
export type GoodsReceiptNoteCreateManyWarehouseInputEnvelope = {
    data: Prisma.GoodsReceiptNoteCreateManyWarehouseInput | Prisma.GoodsReceiptNoteCreateManyWarehouseInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptNoteUpsertWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutWarehouseInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutWarehouseInput>;
};
export type GoodsReceiptNoteUpdateWithWhereUniqueWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutWarehouseInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutWarehouseInput>;
};
export type GoodsReceiptNoteUpdateManyWithWhereWithoutWarehouseInput = {
    where: Prisma.GoodsReceiptNoteScalarWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateManyMutationInput, Prisma.GoodsReceiptNoteUncheckedUpdateManyWithoutWarehouseInput>;
};
export type GoodsReceiptNoteCreateWithoutItemsInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutItemsInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutItemsInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutItemsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutItemsInput>;
};
export type GoodsReceiptNoteUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutItemsInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutItemsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutItemsInput>;
    where?: Prisma.GoodsReceiptNoteWhereInput;
};
export type GoodsReceiptNoteUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.GoodsReceiptNoteWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutItemsInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutItemsInput>;
};
export type GoodsReceiptNoteUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteCreateWithoutPutawaysInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutPutawaysInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutPutawaysInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPutawaysInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPutawaysInput>;
};
export type GoodsReceiptNoteUpsertWithoutPutawaysInput = {
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutPutawaysInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutPutawaysInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutPutawaysInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutPutawaysInput>;
    where?: Prisma.GoodsReceiptNoteWhereInput;
};
export type GoodsReceiptNoteUpdateToOneWithWhereWithoutPutawaysInput = {
    where?: Prisma.GoodsReceiptNoteWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutPutawaysInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutPutawaysInput>;
};
export type GoodsReceiptNoteUpdateWithoutPutawaysInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutPutawaysInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteCreateWithoutQcInspectionsInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutQcInspectionsInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedCreateNestedManyWithoutReceiptInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutQcInspectionsInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutQcInspectionsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutQcInspectionsInput>;
};
export type GoodsReceiptNoteUpsertWithoutQcInspectionsInput = {
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutQcInspectionsInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutQcInspectionsInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutQcInspectionsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutQcInspectionsInput>;
    where?: Prisma.GoodsReceiptNoteWhereInput;
};
export type GoodsReceiptNoteUpdateToOneWithWhereWithoutQcInspectionsInput = {
    where?: Prisma.GoodsReceiptNoteWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutQcInspectionsInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutQcInspectionsInput>;
};
export type GoodsReceiptNoteUpdateWithoutQcInspectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutQcInspectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteCreateWithoutThreeWayMatchingsInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutGoodsReceiptsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseOrder?: Prisma.PurchaseOrderCreateNestedOneWithoutGoodsReceiptsInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutGoodsReceiptsInput;
    warehouse: Prisma.WarehouseCreateNestedOneWithoutGoodsReceiptsInput;
    items?: Prisma.GoodsReceiptItemCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayCreateNestedManyWithoutGrnInput;
};
export type GoodsReceiptNoteUncheckedCreateWithoutThreeWayMatchingsInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedCreateNestedManyWithoutGrnInput;
    qcInspections?: Prisma.QcInspectionUncheckedCreateNestedManyWithoutGrnInput;
    putaways?: Prisma.PutawayUncheckedCreateNestedManyWithoutGrnInput;
};
export type GoodsReceiptNoteCreateOrConnectWithoutThreeWayMatchingsInput = {
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutThreeWayMatchingsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutThreeWayMatchingsInput>;
};
export type GoodsReceiptNoteUpsertWithoutThreeWayMatchingsInput = {
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutThreeWayMatchingsInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutThreeWayMatchingsInput>;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateWithoutThreeWayMatchingsInput, Prisma.GoodsReceiptNoteUncheckedCreateWithoutThreeWayMatchingsInput>;
    where?: Prisma.GoodsReceiptNoteWhereInput;
};
export type GoodsReceiptNoteUpdateToOneWithWhereWithoutThreeWayMatchingsInput = {
    where?: Prisma.GoodsReceiptNoteWhereInput;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateWithoutThreeWayMatchingsInput, Prisma.GoodsReceiptNoteUncheckedUpdateWithoutThreeWayMatchingsInput>;
};
export type GoodsReceiptNoteUpdateWithoutThreeWayMatchingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutThreeWayMatchingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
};
export type GoodsReceiptNoteCreateManyTenantInput = {
    id?: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoodsReceiptNoteUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoodsReceiptNoteCreateManySupplierInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoodsReceiptNoteUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoodsReceiptNoteCreateManyPurchaseOrderInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseInvoiceId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoodsReceiptNoteUpdateWithoutPurchaseOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutPurchaseOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutPurchaseOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoodsReceiptNoteCreateManyPurchaseInvoiceInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    warehouseId: string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoodsReceiptNoteUpdateWithoutPurchaseInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    warehouse?: Prisma.WarehouseUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutPurchaseInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutPurchaseInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    warehouseId?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoodsReceiptNoteCreateManyWarehouseInput = {
    id?: string;
    tenantId: string;
    code: string;
    receiptDate: Date | string;
    status?: $Enums.InventoryDocStatus;
    supplierId?: string | null;
    purchaseOrderId?: string | null;
    purchaseInvoiceId?: string | null;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoodsReceiptNoteUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutGoodsReceiptsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseOrder?: Prisma.PurchaseOrderUpdateOneWithoutGoodsReceiptsNestedInput;
    purchaseInvoice?: Prisma.PurchaseInvoiceUpdateOneWithoutGoodsReceiptsNestedInput;
    items?: Prisma.GoodsReceiptItemUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.GoodsReceiptItemUncheckedUpdateManyWithoutGrnNestedInput;
    qcInspections?: Prisma.QcInspectionUncheckedUpdateManyWithoutGrnNestedInput;
    putaways?: Prisma.PutawayUncheckedUpdateManyWithoutGrnNestedInput;
    threeWayMatchings?: Prisma.ThreeWayMatchingUncheckedUpdateManyWithoutReceiptNestedInput;
};
export type GoodsReceiptNoteUncheckedUpdateManyWithoutWarehouseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInventoryDocStatusFieldUpdateOperationsInput | $Enums.InventoryDocStatus;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseOrderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseInvoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoodsReceiptNoteCountOutputType = {
    items: number;
    qcInspections: number;
    putaways: number;
    threeWayMatchings: number;
};
export type GoodsReceiptNoteCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | GoodsReceiptNoteCountOutputTypeCountItemsArgs;
    qcInspections?: boolean | GoodsReceiptNoteCountOutputTypeCountQcInspectionsArgs;
    putaways?: boolean | GoodsReceiptNoteCountOutputTypeCountPutawaysArgs;
    threeWayMatchings?: boolean | GoodsReceiptNoteCountOutputTypeCountThreeWayMatchingsArgs;
};
export type GoodsReceiptNoteCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteCountOutputTypeSelect<ExtArgs> | null;
};
export type GoodsReceiptNoteCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoodsReceiptItemWhereInput;
};
export type GoodsReceiptNoteCountOutputTypeCountQcInspectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QcInspectionWhereInput;
};
export type GoodsReceiptNoteCountOutputTypeCountPutawaysArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PutawayWhereInput;
};
export type GoodsReceiptNoteCountOutputTypeCountThreeWayMatchingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ThreeWayMatchingWhereInput;
};
export type GoodsReceiptNoteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    receiptDate?: boolean;
    status?: boolean;
    supplierId?: boolean;
    purchaseOrderId?: boolean;
    purchaseInvoiceId?: boolean;
    warehouseId?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.GoodsReceiptNote$supplierArgs<ExtArgs>;
    purchaseOrder?: boolean | Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs>;
    purchaseInvoice?: boolean | Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.GoodsReceiptNote$itemsArgs<ExtArgs>;
    qcInspections?: boolean | Prisma.GoodsReceiptNote$qcInspectionsArgs<ExtArgs>;
    putaways?: boolean | Prisma.GoodsReceiptNote$putawaysArgs<ExtArgs>;
    threeWayMatchings?: boolean | Prisma.GoodsReceiptNote$threeWayMatchingsArgs<ExtArgs>;
    _count?: boolean | Prisma.GoodsReceiptNoteCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["goodsReceiptNote"]>;
export type GoodsReceiptNoteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    receiptDate?: boolean;
    status?: boolean;
    supplierId?: boolean;
    purchaseOrderId?: boolean;
    purchaseInvoiceId?: boolean;
    warehouseId?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.GoodsReceiptNote$supplierArgs<ExtArgs>;
    purchaseOrder?: boolean | Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs>;
    purchaseInvoice?: boolean | Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["goodsReceiptNote"]>;
export type GoodsReceiptNoteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    receiptDate?: boolean;
    status?: boolean;
    supplierId?: boolean;
    purchaseOrderId?: boolean;
    purchaseInvoiceId?: boolean;
    warehouseId?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.GoodsReceiptNote$supplierArgs<ExtArgs>;
    purchaseOrder?: boolean | Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs>;
    purchaseInvoice?: boolean | Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["goodsReceiptNote"]>;
export type GoodsReceiptNoteSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    receiptDate?: boolean;
    status?: boolean;
    supplierId?: boolean;
    purchaseOrderId?: boolean;
    purchaseInvoiceId?: boolean;
    warehouseId?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type GoodsReceiptNoteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "code" | "receiptDate" | "status" | "supplierId" | "purchaseOrderId" | "purchaseInvoiceId" | "warehouseId" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["goodsReceiptNote"]>;
export type GoodsReceiptNoteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.GoodsReceiptNote$supplierArgs<ExtArgs>;
    purchaseOrder?: boolean | Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs>;
    purchaseInvoice?: boolean | Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.GoodsReceiptNote$itemsArgs<ExtArgs>;
    qcInspections?: boolean | Prisma.GoodsReceiptNote$qcInspectionsArgs<ExtArgs>;
    putaways?: boolean | Prisma.GoodsReceiptNote$putawaysArgs<ExtArgs>;
    threeWayMatchings?: boolean | Prisma.GoodsReceiptNote$threeWayMatchingsArgs<ExtArgs>;
    _count?: boolean | Prisma.GoodsReceiptNoteCountOutputTypeDefaultArgs<ExtArgs>;
};
export type GoodsReceiptNoteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.GoodsReceiptNote$supplierArgs<ExtArgs>;
    purchaseOrder?: boolean | Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs>;
    purchaseInvoice?: boolean | Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
};
export type GoodsReceiptNoteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.GoodsReceiptNote$supplierArgs<ExtArgs>;
    purchaseOrder?: boolean | Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs>;
    purchaseInvoice?: boolean | Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs>;
    warehouse?: boolean | Prisma.WarehouseDefaultArgs<ExtArgs>;
};
export type $GoodsReceiptNotePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GoodsReceiptNote";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        supplier: Prisma.$SupplierPayload<ExtArgs> | null;
        purchaseOrder: Prisma.$PurchaseOrderPayload<ExtArgs> | null;
        purchaseInvoice: Prisma.$PurchaseInvoicePayload<ExtArgs> | null;
        warehouse: Prisma.$WarehousePayload<ExtArgs>;
        items: Prisma.$GoodsReceiptItemPayload<ExtArgs>[];
        qcInspections: Prisma.$QcInspectionPayload<ExtArgs>[];
        putaways: Prisma.$PutawayPayload<ExtArgs>[];
        threeWayMatchings: Prisma.$ThreeWayMatchingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        code: string;
        receiptDate: Date;
        status: $Enums.InventoryDocStatus;
        supplierId: string | null;
        purchaseOrderId: string | null;
        purchaseInvoiceId: string | null;
        warehouseId: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["goodsReceiptNote"]>;
    composites: {};
};
export type GoodsReceiptNoteGetPayload<S extends boolean | null | undefined | GoodsReceiptNoteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload, S>;
export type GoodsReceiptNoteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GoodsReceiptNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GoodsReceiptNoteCountAggregateInputType | true;
};
export interface GoodsReceiptNoteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GoodsReceiptNote'];
        meta: {
            name: 'GoodsReceiptNote';
        };
    };
    findUnique<T extends GoodsReceiptNoteFindUniqueArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GoodsReceiptNoteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GoodsReceiptNoteFindFirstArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptNoteFindFirstArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GoodsReceiptNoteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GoodsReceiptNoteFindManyArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GoodsReceiptNoteCreateArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteCreateArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GoodsReceiptNoteCreateManyArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GoodsReceiptNoteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GoodsReceiptNoteDeleteArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteDeleteArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GoodsReceiptNoteUpdateArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteUpdateArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GoodsReceiptNoteDeleteManyArgs>(args?: Prisma.SelectSubset<T, GoodsReceiptNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GoodsReceiptNoteUpdateManyArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GoodsReceiptNoteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GoodsReceiptNoteUpsertArgs>(args: Prisma.SelectSubset<T, GoodsReceiptNoteUpsertArgs<ExtArgs>>): Prisma.Prisma__GoodsReceiptNoteClient<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GoodsReceiptNoteCountArgs>(args?: Prisma.Subset<T, GoodsReceiptNoteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GoodsReceiptNoteCountAggregateOutputType> : number>;
    aggregate<T extends GoodsReceiptNoteAggregateArgs>(args: Prisma.Subset<T, GoodsReceiptNoteAggregateArgs>): Prisma.PrismaPromise<GetGoodsReceiptNoteAggregateType<T>>;
    groupBy<T extends GoodsReceiptNoteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GoodsReceiptNoteGroupByArgs['orderBy'];
    } : {
        orderBy?: GoodsReceiptNoteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GoodsReceiptNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsReceiptNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GoodsReceiptNoteFieldRefs;
}
export interface Prisma__GoodsReceiptNoteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    supplier<T extends Prisma.GoodsReceiptNote$supplierArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNote$supplierArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    purchaseOrder<T extends Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNote$purchaseOrderArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    purchaseInvoice<T extends Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs>>): Prisma.Prisma__PurchaseInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PurchaseInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    warehouse<T extends Prisma.WarehouseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WarehouseDefaultArgs<ExtArgs>>): Prisma.Prisma__WarehouseClient<runtime.Types.Result.GetResult<Prisma.$WarehousePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.GoodsReceiptNote$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNote$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoodsReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    qcInspections<T extends Prisma.GoodsReceiptNote$qcInspectionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNote$qcInspectionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QcInspectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    putaways<T extends Prisma.GoodsReceiptNote$putawaysArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNote$putawaysArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PutawayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    threeWayMatchings<T extends Prisma.GoodsReceiptNote$threeWayMatchingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GoodsReceiptNote$threeWayMatchingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ThreeWayMatchingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GoodsReceiptNoteFieldRefs {
    readonly id: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly tenantId: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly code: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly receiptDate: Prisma.FieldRef<"GoodsReceiptNote", 'DateTime'>;
    readonly status: Prisma.FieldRef<"GoodsReceiptNote", 'InventoryDocStatus'>;
    readonly supplierId: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly purchaseOrderId: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly purchaseInvoiceId: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly warehouseId: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly notes: Prisma.FieldRef<"GoodsReceiptNote", 'String'>;
    readonly createdAt: Prisma.FieldRef<"GoodsReceiptNote", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"GoodsReceiptNote", 'DateTime'>;
}
export type GoodsReceiptNoteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptNoteWhereInput;
    orderBy?: Prisma.GoodsReceiptNoteOrderByWithRelationInput | Prisma.GoodsReceiptNoteOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoodsReceiptNoteScalarFieldEnum | Prisma.GoodsReceiptNoteScalarFieldEnum[];
};
export type GoodsReceiptNoteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptNoteWhereInput;
    orderBy?: Prisma.GoodsReceiptNoteOrderByWithRelationInput | Prisma.GoodsReceiptNoteOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoodsReceiptNoteScalarFieldEnum | Prisma.GoodsReceiptNoteScalarFieldEnum[];
};
export type GoodsReceiptNoteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptNoteWhereInput;
    orderBy?: Prisma.GoodsReceiptNoteOrderByWithRelationInput | Prisma.GoodsReceiptNoteOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptNoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoodsReceiptNoteScalarFieldEnum | Prisma.GoodsReceiptNoteScalarFieldEnum[];
};
export type GoodsReceiptNoteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteCreateInput, Prisma.GoodsReceiptNoteUncheckedCreateInput>;
};
export type GoodsReceiptNoteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GoodsReceiptNoteCreateManyInput | Prisma.GoodsReceiptNoteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GoodsReceiptNoteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    data: Prisma.GoodsReceiptNoteCreateManyInput | Prisma.GoodsReceiptNoteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GoodsReceiptNoteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GoodsReceiptNoteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateInput, Prisma.GoodsReceiptNoteUncheckedUpdateInput>;
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateManyMutationInput, Prisma.GoodsReceiptNoteUncheckedUpdateManyInput>;
    where?: Prisma.GoodsReceiptNoteWhereInput;
    limit?: number;
};
export type GoodsReceiptNoteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateManyMutationInput, Prisma.GoodsReceiptNoteUncheckedUpdateManyInput>;
    where?: Prisma.GoodsReceiptNoteWhereInput;
    limit?: number;
    include?: Prisma.GoodsReceiptNoteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GoodsReceiptNoteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoodsReceiptNoteCreateInput, Prisma.GoodsReceiptNoteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GoodsReceiptNoteUpdateInput, Prisma.GoodsReceiptNoteUncheckedUpdateInput>;
};
export type GoodsReceiptNoteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
    where: Prisma.GoodsReceiptNoteWhereUniqueInput;
};
export type GoodsReceiptNoteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoodsReceiptNoteWhereInput;
    limit?: number;
};
export type GoodsReceiptNote$supplierArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where?: Prisma.SupplierWhereInput;
};
export type GoodsReceiptNote$purchaseOrderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderInclude<ExtArgs> | null;
    where?: Prisma.PurchaseOrderWhereInput;
};
export type GoodsReceiptNote$purchaseInvoiceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PurchaseInvoiceInclude<ExtArgs> | null;
    where?: Prisma.PurchaseInvoiceWhereInput;
};
export type GoodsReceiptNote$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.GoodsReceiptItemWhereInput;
    orderBy?: Prisma.GoodsReceiptItemOrderByWithRelationInput | Prisma.GoodsReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.GoodsReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoodsReceiptItemScalarFieldEnum | Prisma.GoodsReceiptItemScalarFieldEnum[];
};
export type GoodsReceiptNote$qcInspectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GoodsReceiptNote$putawaysArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PutawaySelect<ExtArgs> | null;
    omit?: Prisma.PutawayOmit<ExtArgs> | null;
    include?: Prisma.PutawayInclude<ExtArgs> | null;
    where?: Prisma.PutawayWhereInput;
    orderBy?: Prisma.PutawayOrderByWithRelationInput | Prisma.PutawayOrderByWithRelationInput[];
    cursor?: Prisma.PutawayWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PutawayScalarFieldEnum | Prisma.PutawayScalarFieldEnum[];
};
export type GoodsReceiptNote$threeWayMatchingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GoodsReceiptNoteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoodsReceiptNoteSelect<ExtArgs> | null;
    omit?: Prisma.GoodsReceiptNoteOmit<ExtArgs> | null;
    include?: Prisma.GoodsReceiptNoteInclude<ExtArgs> | null;
};
