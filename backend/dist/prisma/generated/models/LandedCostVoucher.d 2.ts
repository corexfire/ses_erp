import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type LandedCostVoucherModel = runtime.Types.Result.DefaultSelection<Prisma.$LandedCostVoucherPayload>;
export type AggregateLandedCostVoucher = {
    _count: LandedCostVoucherCountAggregateOutputType | null;
    _avg: LandedCostVoucherAvgAggregateOutputType | null;
    _sum: LandedCostVoucherSumAggregateOutputType | null;
    _min: LandedCostVoucherMinAggregateOutputType | null;
    _max: LandedCostVoucherMaxAggregateOutputType | null;
};
export type LandedCostVoucherAvgAggregateOutputType = {
    totalAmount: runtime.Decimal | null;
};
export type LandedCostVoucherSumAggregateOutputType = {
    totalAmount: runtime.Decimal | null;
};
export type LandedCostVoucherMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    supplierId: string | null;
    orderId: string | null;
    invoiceId: string | null;
    costDate: Date | null;
    status: $Enums.ProcurementDocStatus | null;
    apportionmentMethod: string | null;
    receiptId: string | null;
    totalAmount: runtime.Decimal | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LandedCostVoucherMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    supplierId: string | null;
    orderId: string | null;
    invoiceId: string | null;
    costDate: Date | null;
    status: $Enums.ProcurementDocStatus | null;
    apportionmentMethod: string | null;
    receiptId: string | null;
    totalAmount: runtime.Decimal | null;
    notes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type LandedCostVoucherCountAggregateOutputType = {
    id: number;
    tenantId: number;
    code: number;
    supplierId: number;
    orderId: number;
    invoiceId: number;
    costDate: number;
    status: number;
    apportionmentMethod: number;
    receiptId: number;
    totalAmount: number;
    notes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type LandedCostVoucherAvgAggregateInputType = {
    totalAmount?: true;
};
export type LandedCostVoucherSumAggregateInputType = {
    totalAmount?: true;
};
export type LandedCostVoucherMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    supplierId?: true;
    orderId?: true;
    invoiceId?: true;
    costDate?: true;
    status?: true;
    apportionmentMethod?: true;
    receiptId?: true;
    totalAmount?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LandedCostVoucherMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    supplierId?: true;
    orderId?: true;
    invoiceId?: true;
    costDate?: true;
    status?: true;
    apportionmentMethod?: true;
    receiptId?: true;
    totalAmount?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type LandedCostVoucherCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    supplierId?: true;
    orderId?: true;
    invoiceId?: true;
    costDate?: true;
    status?: true;
    apportionmentMethod?: true;
    receiptId?: true;
    totalAmount?: true;
    notes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type LandedCostVoucherAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LandedCostVoucherWhereInput;
    orderBy?: Prisma.LandedCostVoucherOrderByWithRelationInput | Prisma.LandedCostVoucherOrderByWithRelationInput[];
    cursor?: Prisma.LandedCostVoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LandedCostVoucherCountAggregateInputType;
    _avg?: LandedCostVoucherAvgAggregateInputType;
    _sum?: LandedCostVoucherSumAggregateInputType;
    _min?: LandedCostVoucherMinAggregateInputType;
    _max?: LandedCostVoucherMaxAggregateInputType;
};
export type GetLandedCostVoucherAggregateType<T extends LandedCostVoucherAggregateArgs> = {
    [P in keyof T & keyof AggregateLandedCostVoucher]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLandedCostVoucher[P]> : Prisma.GetScalarType<T[P], AggregateLandedCostVoucher[P]>;
};
export type LandedCostVoucherGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LandedCostVoucherWhereInput;
    orderBy?: Prisma.LandedCostVoucherOrderByWithAggregationInput | Prisma.LandedCostVoucherOrderByWithAggregationInput[];
    by: Prisma.LandedCostVoucherScalarFieldEnum[] | Prisma.LandedCostVoucherScalarFieldEnum;
    having?: Prisma.LandedCostVoucherScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LandedCostVoucherCountAggregateInputType | true;
    _avg?: LandedCostVoucherAvgAggregateInputType;
    _sum?: LandedCostVoucherSumAggregateInputType;
    _min?: LandedCostVoucherMinAggregateInputType;
    _max?: LandedCostVoucherMaxAggregateInputType;
};
export type LandedCostVoucherGroupByOutputType = {
    id: string;
    tenantId: string;
    code: string;
    supplierId: string | null;
    orderId: string | null;
    invoiceId: string | null;
    costDate: Date;
    status: $Enums.ProcurementDocStatus;
    apportionmentMethod: string;
    receiptId: string | null;
    totalAmount: runtime.Decimal;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: LandedCostVoucherCountAggregateOutputType | null;
    _avg: LandedCostVoucherAvgAggregateOutputType | null;
    _sum: LandedCostVoucherSumAggregateOutputType | null;
    _min: LandedCostVoucherMinAggregateOutputType | null;
    _max: LandedCostVoucherMaxAggregateOutputType | null;
};
export type GetLandedCostVoucherGroupByPayload<T extends LandedCostVoucherGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LandedCostVoucherGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LandedCostVoucherGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LandedCostVoucherGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LandedCostVoucherGroupByOutputType[P]>;
}>>;
export type LandedCostVoucherWhereInput = {
    AND?: Prisma.LandedCostVoucherWhereInput | Prisma.LandedCostVoucherWhereInput[];
    OR?: Prisma.LandedCostVoucherWhereInput[];
    NOT?: Prisma.LandedCostVoucherWhereInput | Prisma.LandedCostVoucherWhereInput[];
    id?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    tenantId?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    code?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    supplierId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    orderId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    invoiceId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    costDate?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusFilter<"LandedCostVoucher"> | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    receiptId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    totalAmount?: Prisma.DecimalFilter<"LandedCostVoucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierNullableScalarRelationFilter, Prisma.SupplierWhereInput> | null;
    order?: Prisma.XOR<Prisma.PurchaseOrderNullableScalarRelationFilter, Prisma.PurchaseOrderWhereInput> | null;
    invoice?: Prisma.XOR<Prisma.PurchaseInvoiceNullableScalarRelationFilter, Prisma.PurchaseInvoiceWhereInput> | null;
    allocations?: Prisma.LandedCostAllocationListRelationFilter;
};
export type LandedCostVoucherOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrderInput | Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    invoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    costDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    apportionmentMethod?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    supplier?: Prisma.SupplierOrderByWithRelationInput;
    order?: Prisma.PurchaseOrderOrderByWithRelationInput;
    invoice?: Prisma.PurchaseInvoiceOrderByWithRelationInput;
    allocations?: Prisma.LandedCostAllocationOrderByRelationAggregateInput;
};
export type LandedCostVoucherWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.LandedCostVoucherTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.LandedCostVoucherWhereInput | Prisma.LandedCostVoucherWhereInput[];
    OR?: Prisma.LandedCostVoucherWhereInput[];
    NOT?: Prisma.LandedCostVoucherWhereInput | Prisma.LandedCostVoucherWhereInput[];
    tenantId?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    code?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    supplierId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    orderId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    invoiceId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    costDate?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusFilter<"LandedCostVoucher"> | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    receiptId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    totalAmount?: Prisma.DecimalFilter<"LandedCostVoucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    supplier?: Prisma.XOR<Prisma.SupplierNullableScalarRelationFilter, Prisma.SupplierWhereInput> | null;
    order?: Prisma.XOR<Prisma.PurchaseOrderNullableScalarRelationFilter, Prisma.PurchaseOrderWhereInput> | null;
    invoice?: Prisma.XOR<Prisma.PurchaseInvoiceNullableScalarRelationFilter, Prisma.PurchaseInvoiceWhereInput> | null;
    allocations?: Prisma.LandedCostAllocationListRelationFilter;
}, "id" | "tenantId_code">;
export type LandedCostVoucherOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrderInput | Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    invoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    costDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    apportionmentMethod?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.LandedCostVoucherCountOrderByAggregateInput;
    _avg?: Prisma.LandedCostVoucherAvgOrderByAggregateInput;
    _max?: Prisma.LandedCostVoucherMaxOrderByAggregateInput;
    _min?: Prisma.LandedCostVoucherMinOrderByAggregateInput;
    _sum?: Prisma.LandedCostVoucherSumOrderByAggregateInput;
};
export type LandedCostVoucherScalarWhereWithAggregatesInput = {
    AND?: Prisma.LandedCostVoucherScalarWhereWithAggregatesInput | Prisma.LandedCostVoucherScalarWhereWithAggregatesInput[];
    OR?: Prisma.LandedCostVoucherScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LandedCostVoucherScalarWhereWithAggregatesInput | Prisma.LandedCostVoucherScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"LandedCostVoucher"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"LandedCostVoucher"> | string;
    code?: Prisma.StringWithAggregatesFilter<"LandedCostVoucher"> | string;
    supplierId?: Prisma.StringNullableWithAggregatesFilter<"LandedCostVoucher"> | string | null;
    orderId?: Prisma.StringNullableWithAggregatesFilter<"LandedCostVoucher"> | string | null;
    invoiceId?: Prisma.StringNullableWithAggregatesFilter<"LandedCostVoucher"> | string | null;
    costDate?: Prisma.DateTimeWithAggregatesFilter<"LandedCostVoucher"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusWithAggregatesFilter<"LandedCostVoucher"> | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringWithAggregatesFilter<"LandedCostVoucher"> | string;
    receiptId?: Prisma.StringNullableWithAggregatesFilter<"LandedCostVoucher"> | string | null;
    totalAmount?: Prisma.DecimalWithAggregatesFilter<"LandedCostVoucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"LandedCostVoucher"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LandedCostVoucher"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"LandedCostVoucher"> | Date | string;
};
export type LandedCostVoucherCreateInput = {
    id?: string;
    code: string;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutLandedCostsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutLandedCostsInput;
    order?: Prisma.PurchaseOrderCreateNestedOneWithoutLandedCostsInput;
    invoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutLandedCostsInput;
    allocations?: Prisma.LandedCostAllocationCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    supplierId?: string | null;
    orderId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutLandedCostsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutLandedCostsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneWithoutLandedCostsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneWithoutLandedCostsNestedInput;
    allocations?: Prisma.LandedCostAllocationUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherCreateManyInput = {
    id?: string;
    tenantId: string;
    code: string;
    supplierId?: string | null;
    orderId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LandedCostVoucherUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LandedCostVoucherUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LandedCostVoucherListRelationFilter = {
    every?: Prisma.LandedCostVoucherWhereInput;
    some?: Prisma.LandedCostVoucherWhereInput;
    none?: Prisma.LandedCostVoucherWhereInput;
};
export type LandedCostVoucherOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LandedCostVoucherTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type LandedCostVoucherCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    costDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    apportionmentMethod?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LandedCostVoucherAvgOrderByAggregateInput = {
    totalAmount?: Prisma.SortOrder;
};
export type LandedCostVoucherMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    costDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    apportionmentMethod?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LandedCostVoucherMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    costDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    apportionmentMethod?: Prisma.SortOrder;
    receiptId?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type LandedCostVoucherSumOrderByAggregateInput = {
    totalAmount?: Prisma.SortOrder;
};
export type LandedCostVoucherScalarRelationFilter = {
    is?: Prisma.LandedCostVoucherWhereInput;
    isNot?: Prisma.LandedCostVoucherWhereInput;
};
export type LandedCostVoucherCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput> | Prisma.LandedCostVoucherCreateWithoutTenantInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput | Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyTenantInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput> | Prisma.LandedCostVoucherCreateWithoutTenantInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput | Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyTenantInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput> | Prisma.LandedCostVoucherCreateWithoutTenantInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput | Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutTenantInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyTenantInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutTenantInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutTenantInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput> | Prisma.LandedCostVoucherCreateWithoutTenantInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput | Prisma.LandedCostVoucherCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutTenantInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyTenantInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutTenantInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutTenantInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput> | Prisma.LandedCostVoucherCreateWithoutSupplierInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput | Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.LandedCostVoucherCreateManySupplierInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput> | Prisma.LandedCostVoucherCreateWithoutSupplierInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput | Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput[];
    createMany?: Prisma.LandedCostVoucherCreateManySupplierInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput> | Prisma.LandedCostVoucherCreateWithoutSupplierInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput | Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutSupplierInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.LandedCostVoucherCreateManySupplierInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutSupplierInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutSupplierInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput> | Prisma.LandedCostVoucherCreateWithoutSupplierInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput | Prisma.LandedCostVoucherCreateOrConnectWithoutSupplierInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutSupplierInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutSupplierInput[];
    createMany?: Prisma.LandedCostVoucherCreateManySupplierInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutSupplierInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutSupplierInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutSupplierInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutSupplierInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput> | Prisma.LandedCostVoucherCreateWithoutOrderInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput | Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyOrderInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput> | Prisma.LandedCostVoucherCreateWithoutOrderInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput | Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyOrderInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput> | Prisma.LandedCostVoucherCreateWithoutOrderInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput | Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutOrderInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyOrderInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutOrderInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutOrderInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput> | Prisma.LandedCostVoucherCreateWithoutOrderInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput | Prisma.LandedCostVoucherCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutOrderInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyOrderInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutOrderInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutOrderInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput> | Prisma.LandedCostVoucherCreateWithoutInvoiceInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput | Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyInvoiceInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput> | Prisma.LandedCostVoucherCreateWithoutInvoiceInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput | Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyInvoiceInputEnvelope;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
};
export type LandedCostVoucherUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput> | Prisma.LandedCostVoucherCreateWithoutInvoiceInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput | Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyInvoiceInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutInvoiceInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput> | Prisma.LandedCostVoucherCreateWithoutInvoiceInput[] | Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput | Prisma.LandedCostVoucherCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.LandedCostVoucherUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.LandedCostVoucherCreateManyInvoiceInputEnvelope;
    set?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    disconnect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    delete?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    connect?: Prisma.LandedCostVoucherWhereUniqueInput | Prisma.LandedCostVoucherWhereUniqueInput[];
    update?: Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.LandedCostVoucherUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.LandedCostVoucherUpdateManyWithWhereWithoutInvoiceInput | Prisma.LandedCostVoucherUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
};
export type LandedCostVoucherCreateNestedOneWithoutAllocationsInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutAllocationsInput, Prisma.LandedCostVoucherUncheckedCreateWithoutAllocationsInput>;
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutAllocationsInput;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput;
};
export type LandedCostVoucherUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutAllocationsInput, Prisma.LandedCostVoucherUncheckedCreateWithoutAllocationsInput>;
    connectOrCreate?: Prisma.LandedCostVoucherCreateOrConnectWithoutAllocationsInput;
    upsert?: Prisma.LandedCostVoucherUpsertWithoutAllocationsInput;
    connect?: Prisma.LandedCostVoucherWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LandedCostVoucherUpdateToOneWithWhereWithoutAllocationsInput, Prisma.LandedCostVoucherUpdateWithoutAllocationsInput>, Prisma.LandedCostVoucherUncheckedUpdateWithoutAllocationsInput>;
};
export type LandedCostVoucherCreateWithoutTenantInput = {
    id?: string;
    code: string;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    supplier?: Prisma.SupplierCreateNestedOneWithoutLandedCostsInput;
    order?: Prisma.PurchaseOrderCreateNestedOneWithoutLandedCostsInput;
    invoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutLandedCostsInput;
    allocations?: Prisma.LandedCostAllocationCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherUncheckedCreateWithoutTenantInput = {
    id?: string;
    code: string;
    supplierId?: string | null;
    orderId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherCreateOrConnectWithoutTenantInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput>;
};
export type LandedCostVoucherCreateManyTenantInputEnvelope = {
    data: Prisma.LandedCostVoucherCreateManyTenantInput | Prisma.LandedCostVoucherCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type LandedCostVoucherUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    update: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedCreateWithoutTenantInput>;
};
export type LandedCostVoucherUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutTenantInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutTenantInput>;
};
export type LandedCostVoucherUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.LandedCostVoucherScalarWhereInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateManyMutationInput, Prisma.LandedCostVoucherUncheckedUpdateManyWithoutTenantInput>;
};
export type LandedCostVoucherScalarWhereInput = {
    AND?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
    OR?: Prisma.LandedCostVoucherScalarWhereInput[];
    NOT?: Prisma.LandedCostVoucherScalarWhereInput | Prisma.LandedCostVoucherScalarWhereInput[];
    id?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    tenantId?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    code?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    supplierId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    orderId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    invoiceId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    costDate?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    status?: Prisma.EnumProcurementDocStatusFilter<"LandedCostVoucher"> | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFilter<"LandedCostVoucher"> | string;
    receiptId?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    totalAmount?: Prisma.DecimalFilter<"LandedCostVoucher"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"LandedCostVoucher"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"LandedCostVoucher"> | Date | string;
};
export type LandedCostVoucherCreateWithoutSupplierInput = {
    id?: string;
    code: string;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutLandedCostsInput;
    order?: Prisma.PurchaseOrderCreateNestedOneWithoutLandedCostsInput;
    invoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutLandedCostsInput;
    allocations?: Prisma.LandedCostAllocationCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherUncheckedCreateWithoutSupplierInput = {
    id?: string;
    tenantId: string;
    code: string;
    orderId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherCreateOrConnectWithoutSupplierInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput>;
};
export type LandedCostVoucherCreateManySupplierInputEnvelope = {
    data: Prisma.LandedCostVoucherCreateManySupplierInput | Prisma.LandedCostVoucherCreateManySupplierInput[];
    skipDuplicates?: boolean;
};
export type LandedCostVoucherUpsertWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    update: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutSupplierInput>;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedCreateWithoutSupplierInput>;
};
export type LandedCostVoucherUpdateWithWhereUniqueWithoutSupplierInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutSupplierInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutSupplierInput>;
};
export type LandedCostVoucherUpdateManyWithWhereWithoutSupplierInput = {
    where: Prisma.LandedCostVoucherScalarWhereInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateManyMutationInput, Prisma.LandedCostVoucherUncheckedUpdateManyWithoutSupplierInput>;
};
export type LandedCostVoucherCreateWithoutOrderInput = {
    id?: string;
    code: string;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutLandedCostsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutLandedCostsInput;
    invoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutLandedCostsInput;
    allocations?: Prisma.LandedCostAllocationCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherUncheckedCreateWithoutOrderInput = {
    id?: string;
    tenantId: string;
    code: string;
    supplierId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherCreateOrConnectWithoutOrderInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput>;
};
export type LandedCostVoucherCreateManyOrderInputEnvelope = {
    data: Prisma.LandedCostVoucherCreateManyOrderInput | Prisma.LandedCostVoucherCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type LandedCostVoucherUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    update: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedCreateWithoutOrderInput>;
};
export type LandedCostVoucherUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutOrderInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutOrderInput>;
};
export type LandedCostVoucherUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.LandedCostVoucherScalarWhereInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateManyMutationInput, Prisma.LandedCostVoucherUncheckedUpdateManyWithoutOrderInput>;
};
export type LandedCostVoucherCreateWithoutInvoiceInput = {
    id?: string;
    code: string;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutLandedCostsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutLandedCostsInput;
    order?: Prisma.PurchaseOrderCreateNestedOneWithoutLandedCostsInput;
    allocations?: Prisma.LandedCostAllocationCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherUncheckedCreateWithoutInvoiceInput = {
    id?: string;
    tenantId: string;
    code: string;
    supplierId?: string | null;
    orderId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedCreateNestedManyWithoutLandedCostInput;
};
export type LandedCostVoucherCreateOrConnectWithoutInvoiceInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput>;
};
export type LandedCostVoucherCreateManyInvoiceInputEnvelope = {
    data: Prisma.LandedCostVoucherCreateManyInvoiceInput | Prisma.LandedCostVoucherCreateManyInvoiceInput[];
    skipDuplicates?: boolean;
};
export type LandedCostVoucherUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    update: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutInvoiceInput>;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedCreateWithoutInvoiceInput>;
};
export type LandedCostVoucherUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutInvoiceInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutInvoiceInput>;
};
export type LandedCostVoucherUpdateManyWithWhereWithoutInvoiceInput = {
    where: Prisma.LandedCostVoucherScalarWhereInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateManyMutationInput, Prisma.LandedCostVoucherUncheckedUpdateManyWithoutInvoiceInput>;
};
export type LandedCostVoucherCreateWithoutAllocationsInput = {
    id?: string;
    code: string;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutLandedCostsInput;
    supplier?: Prisma.SupplierCreateNestedOneWithoutLandedCostsInput;
    order?: Prisma.PurchaseOrderCreateNestedOneWithoutLandedCostsInput;
    invoice?: Prisma.PurchaseInvoiceCreateNestedOneWithoutLandedCostsInput;
};
export type LandedCostVoucherUncheckedCreateWithoutAllocationsInput = {
    id?: string;
    tenantId: string;
    code: string;
    supplierId?: string | null;
    orderId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LandedCostVoucherCreateOrConnectWithoutAllocationsInput = {
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutAllocationsInput, Prisma.LandedCostVoucherUncheckedCreateWithoutAllocationsInput>;
};
export type LandedCostVoucherUpsertWithoutAllocationsInput = {
    update: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutAllocationsInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutAllocationsInput>;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateWithoutAllocationsInput, Prisma.LandedCostVoucherUncheckedCreateWithoutAllocationsInput>;
    where?: Prisma.LandedCostVoucherWhereInput;
};
export type LandedCostVoucherUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: Prisma.LandedCostVoucherWhereInput;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateWithoutAllocationsInput, Prisma.LandedCostVoucherUncheckedUpdateWithoutAllocationsInput>;
};
export type LandedCostVoucherUpdateWithoutAllocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutLandedCostsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutLandedCostsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneWithoutLandedCostsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneWithoutLandedCostsNestedInput;
};
export type LandedCostVoucherUncheckedUpdateWithoutAllocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LandedCostVoucherCreateManyTenantInput = {
    id?: string;
    code: string;
    supplierId?: string | null;
    orderId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LandedCostVoucherUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    supplier?: Prisma.SupplierUpdateOneWithoutLandedCostsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneWithoutLandedCostsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneWithoutLandedCostsNestedInput;
    allocations?: Prisma.LandedCostAllocationUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LandedCostVoucherCreateManySupplierInput = {
    id?: string;
    tenantId: string;
    code: string;
    orderId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LandedCostVoucherUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutLandedCostsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneWithoutLandedCostsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneWithoutLandedCostsNestedInput;
    allocations?: Prisma.LandedCostAllocationUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateManyWithoutSupplierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LandedCostVoucherCreateManyOrderInput = {
    id?: string;
    tenantId: string;
    code: string;
    supplierId?: string | null;
    invoiceId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LandedCostVoucherUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutLandedCostsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutLandedCostsNestedInput;
    invoice?: Prisma.PurchaseInvoiceUpdateOneWithoutLandedCostsNestedInput;
    allocations?: Prisma.LandedCostAllocationUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LandedCostVoucherCreateManyInvoiceInput = {
    id?: string;
    tenantId: string;
    code: string;
    supplierId?: string | null;
    orderId?: string | null;
    costDate: Date | string;
    status?: $Enums.ProcurementDocStatus;
    apportionmentMethod?: string;
    receiptId?: string | null;
    totalAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type LandedCostVoucherUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutLandedCostsNestedInput;
    supplier?: Prisma.SupplierUpdateOneWithoutLandedCostsNestedInput;
    order?: Prisma.PurchaseOrderUpdateOneWithoutLandedCostsNestedInput;
    allocations?: Prisma.LandedCostAllocationUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    allocations?: Prisma.LandedCostAllocationUncheckedUpdateManyWithoutLandedCostNestedInput;
};
export type LandedCostVoucherUncheckedUpdateManyWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    costDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumProcurementDocStatusFieldUpdateOperationsInput | $Enums.ProcurementDocStatus;
    apportionmentMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LandedCostVoucherCountOutputType = {
    allocations: number;
};
export type LandedCostVoucherCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    allocations?: boolean | LandedCostVoucherCountOutputTypeCountAllocationsArgs;
};
export type LandedCostVoucherCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherCountOutputTypeSelect<ExtArgs> | null;
};
export type LandedCostVoucherCountOutputTypeCountAllocationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LandedCostAllocationWhereInput;
};
export type LandedCostVoucherSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    supplierId?: boolean;
    orderId?: boolean;
    invoiceId?: boolean;
    costDate?: boolean;
    status?: boolean;
    apportionmentMethod?: boolean;
    receiptId?: boolean;
    totalAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.LandedCostVoucher$supplierArgs<ExtArgs>;
    order?: boolean | Prisma.LandedCostVoucher$orderArgs<ExtArgs>;
    invoice?: boolean | Prisma.LandedCostVoucher$invoiceArgs<ExtArgs>;
    allocations?: boolean | Prisma.LandedCostVoucher$allocationsArgs<ExtArgs>;
    _count?: boolean | Prisma.LandedCostVoucherCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["landedCostVoucher"]>;
export type LandedCostVoucherSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    supplierId?: boolean;
    orderId?: boolean;
    invoiceId?: boolean;
    costDate?: boolean;
    status?: boolean;
    apportionmentMethod?: boolean;
    receiptId?: boolean;
    totalAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.LandedCostVoucher$supplierArgs<ExtArgs>;
    order?: boolean | Prisma.LandedCostVoucher$orderArgs<ExtArgs>;
    invoice?: boolean | Prisma.LandedCostVoucher$invoiceArgs<ExtArgs>;
}, ExtArgs["result"]["landedCostVoucher"]>;
export type LandedCostVoucherSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    supplierId?: boolean;
    orderId?: boolean;
    invoiceId?: boolean;
    costDate?: boolean;
    status?: boolean;
    apportionmentMethod?: boolean;
    receiptId?: boolean;
    totalAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.LandedCostVoucher$supplierArgs<ExtArgs>;
    order?: boolean | Prisma.LandedCostVoucher$orderArgs<ExtArgs>;
    invoice?: boolean | Prisma.LandedCostVoucher$invoiceArgs<ExtArgs>;
}, ExtArgs["result"]["landedCostVoucher"]>;
export type LandedCostVoucherSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    supplierId?: boolean;
    orderId?: boolean;
    invoiceId?: boolean;
    costDate?: boolean;
    status?: boolean;
    apportionmentMethod?: boolean;
    receiptId?: boolean;
    totalAmount?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type LandedCostVoucherOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "code" | "supplierId" | "orderId" | "invoiceId" | "costDate" | "status" | "apportionmentMethod" | "receiptId" | "totalAmount" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["landedCostVoucher"]>;
export type LandedCostVoucherInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.LandedCostVoucher$supplierArgs<ExtArgs>;
    order?: boolean | Prisma.LandedCostVoucher$orderArgs<ExtArgs>;
    invoice?: boolean | Prisma.LandedCostVoucher$invoiceArgs<ExtArgs>;
    allocations?: boolean | Prisma.LandedCostVoucher$allocationsArgs<ExtArgs>;
    _count?: boolean | Prisma.LandedCostVoucherCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LandedCostVoucherIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.LandedCostVoucher$supplierArgs<ExtArgs>;
    order?: boolean | Prisma.LandedCostVoucher$orderArgs<ExtArgs>;
    invoice?: boolean | Prisma.LandedCostVoucher$invoiceArgs<ExtArgs>;
};
export type LandedCostVoucherIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    supplier?: boolean | Prisma.LandedCostVoucher$supplierArgs<ExtArgs>;
    order?: boolean | Prisma.LandedCostVoucher$orderArgs<ExtArgs>;
    invoice?: boolean | Prisma.LandedCostVoucher$invoiceArgs<ExtArgs>;
};
export type $LandedCostVoucherPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LandedCostVoucher";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        supplier: Prisma.$SupplierPayload<ExtArgs> | null;
        order: Prisma.$PurchaseOrderPayload<ExtArgs> | null;
        invoice: Prisma.$PurchaseInvoicePayload<ExtArgs> | null;
        allocations: Prisma.$LandedCostAllocationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        code: string;
        supplierId: string | null;
        orderId: string | null;
        invoiceId: string | null;
        costDate: Date;
        status: $Enums.ProcurementDocStatus;
        apportionmentMethod: string;
        receiptId: string | null;
        totalAmount: runtime.Decimal;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["landedCostVoucher"]>;
    composites: {};
};
export type LandedCostVoucherGetPayload<S extends boolean | null | undefined | LandedCostVoucherDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload, S>;
export type LandedCostVoucherCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LandedCostVoucherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LandedCostVoucherCountAggregateInputType | true;
};
export interface LandedCostVoucherDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LandedCostVoucher'];
        meta: {
            name: 'LandedCostVoucher';
        };
    };
    findUnique<T extends LandedCostVoucherFindUniqueArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LandedCostVoucherFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LandedCostVoucherFindFirstArgs>(args?: Prisma.SelectSubset<T, LandedCostVoucherFindFirstArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LandedCostVoucherFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LandedCostVoucherFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LandedCostVoucherFindManyArgs>(args?: Prisma.SelectSubset<T, LandedCostVoucherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LandedCostVoucherCreateArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherCreateArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LandedCostVoucherCreateManyArgs>(args?: Prisma.SelectSubset<T, LandedCostVoucherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LandedCostVoucherCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LandedCostVoucherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LandedCostVoucherDeleteArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherDeleteArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LandedCostVoucherUpdateArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherUpdateArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LandedCostVoucherDeleteManyArgs>(args?: Prisma.SelectSubset<T, LandedCostVoucherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LandedCostVoucherUpdateManyArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LandedCostVoucherUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LandedCostVoucherUpsertArgs>(args: Prisma.SelectSubset<T, LandedCostVoucherUpsertArgs<ExtArgs>>): Prisma.Prisma__LandedCostVoucherClient<runtime.Types.Result.GetResult<Prisma.$LandedCostVoucherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LandedCostVoucherCountArgs>(args?: Prisma.Subset<T, LandedCostVoucherCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LandedCostVoucherCountAggregateOutputType> : number>;
    aggregate<T extends LandedCostVoucherAggregateArgs>(args: Prisma.Subset<T, LandedCostVoucherAggregateArgs>): Prisma.PrismaPromise<GetLandedCostVoucherAggregateType<T>>;
    groupBy<T extends LandedCostVoucherGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LandedCostVoucherGroupByArgs['orderBy'];
    } : {
        orderBy?: LandedCostVoucherGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LandedCostVoucherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLandedCostVoucherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LandedCostVoucherFieldRefs;
}
export interface Prisma__LandedCostVoucherClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    supplier<T extends Prisma.LandedCostVoucher$supplierArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LandedCostVoucher$supplierArgs<ExtArgs>>): Prisma.Prisma__SupplierClient<runtime.Types.Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.LandedCostVoucher$orderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LandedCostVoucher$orderArgs<ExtArgs>>): Prisma.Prisma__PurchaseOrderClient<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    invoice<T extends Prisma.LandedCostVoucher$invoiceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LandedCostVoucher$invoiceArgs<ExtArgs>>): Prisma.Prisma__PurchaseInvoiceClient<runtime.Types.Result.GetResult<Prisma.$PurchaseInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    allocations<T extends Prisma.LandedCostVoucher$allocationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LandedCostVoucher$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LandedCostAllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LandedCostVoucherFieldRefs {
    readonly id: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly tenantId: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly code: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly supplierId: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly orderId: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly invoiceId: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly costDate: Prisma.FieldRef<"LandedCostVoucher", 'DateTime'>;
    readonly status: Prisma.FieldRef<"LandedCostVoucher", 'ProcurementDocStatus'>;
    readonly apportionmentMethod: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly receiptId: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly totalAmount: Prisma.FieldRef<"LandedCostVoucher", 'Decimal'>;
    readonly notes: Prisma.FieldRef<"LandedCostVoucher", 'String'>;
    readonly createdAt: Prisma.FieldRef<"LandedCostVoucher", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"LandedCostVoucher", 'DateTime'>;
}
export type LandedCostVoucherFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    where: Prisma.LandedCostVoucherWhereUniqueInput;
};
export type LandedCostVoucherFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    where: Prisma.LandedCostVoucherWhereUniqueInput;
};
export type LandedCostVoucherFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    where?: Prisma.LandedCostVoucherWhereInput;
    orderBy?: Prisma.LandedCostVoucherOrderByWithRelationInput | Prisma.LandedCostVoucherOrderByWithRelationInput[];
    cursor?: Prisma.LandedCostVoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LandedCostVoucherScalarFieldEnum | Prisma.LandedCostVoucherScalarFieldEnum[];
};
export type LandedCostVoucherFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    where?: Prisma.LandedCostVoucherWhereInput;
    orderBy?: Prisma.LandedCostVoucherOrderByWithRelationInput | Prisma.LandedCostVoucherOrderByWithRelationInput[];
    cursor?: Prisma.LandedCostVoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LandedCostVoucherScalarFieldEnum | Prisma.LandedCostVoucherScalarFieldEnum[];
};
export type LandedCostVoucherFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    where?: Prisma.LandedCostVoucherWhereInput;
    orderBy?: Prisma.LandedCostVoucherOrderByWithRelationInput | Prisma.LandedCostVoucherOrderByWithRelationInput[];
    cursor?: Prisma.LandedCostVoucherWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LandedCostVoucherScalarFieldEnum | Prisma.LandedCostVoucherScalarFieldEnum[];
};
export type LandedCostVoucherCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LandedCostVoucherCreateInput, Prisma.LandedCostVoucherUncheckedCreateInput>;
};
export type LandedCostVoucherCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LandedCostVoucherCreateManyInput | Prisma.LandedCostVoucherCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LandedCostVoucherCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    data: Prisma.LandedCostVoucherCreateManyInput | Prisma.LandedCostVoucherCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LandedCostVoucherIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LandedCostVoucherUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateInput, Prisma.LandedCostVoucherUncheckedUpdateInput>;
    where: Prisma.LandedCostVoucherWhereUniqueInput;
};
export type LandedCostVoucherUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateManyMutationInput, Prisma.LandedCostVoucherUncheckedUpdateManyInput>;
    where?: Prisma.LandedCostVoucherWhereInput;
    limit?: number;
};
export type LandedCostVoucherUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LandedCostVoucherUpdateManyMutationInput, Prisma.LandedCostVoucherUncheckedUpdateManyInput>;
    where?: Prisma.LandedCostVoucherWhereInput;
    limit?: number;
    include?: Prisma.LandedCostVoucherIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LandedCostVoucherUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    where: Prisma.LandedCostVoucherWhereUniqueInput;
    create: Prisma.XOR<Prisma.LandedCostVoucherCreateInput, Prisma.LandedCostVoucherUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LandedCostVoucherUpdateInput, Prisma.LandedCostVoucherUncheckedUpdateInput>;
};
export type LandedCostVoucherDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
    where: Prisma.LandedCostVoucherWhereUniqueInput;
};
export type LandedCostVoucherDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LandedCostVoucherWhereInput;
    limit?: number;
};
export type LandedCostVoucher$supplierArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SupplierSelect<ExtArgs> | null;
    omit?: Prisma.SupplierOmit<ExtArgs> | null;
    include?: Prisma.SupplierInclude<ExtArgs> | null;
    where?: Prisma.SupplierWhereInput;
};
export type LandedCostVoucher$orderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderInclude<ExtArgs> | null;
    where?: Prisma.PurchaseOrderWhereInput;
};
export type LandedCostVoucher$invoiceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseInvoiceOmit<ExtArgs> | null;
    include?: Prisma.PurchaseInvoiceInclude<ExtArgs> | null;
    where?: Prisma.PurchaseInvoiceWhereInput;
};
export type LandedCostVoucher$allocationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostAllocationSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostAllocationOmit<ExtArgs> | null;
    include?: Prisma.LandedCostAllocationInclude<ExtArgs> | null;
    where?: Prisma.LandedCostAllocationWhereInput;
    orderBy?: Prisma.LandedCostAllocationOrderByWithRelationInput | Prisma.LandedCostAllocationOrderByWithRelationInput[];
    cursor?: Prisma.LandedCostAllocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LandedCostAllocationScalarFieldEnum | Prisma.LandedCostAllocationScalarFieldEnum[];
};
export type LandedCostVoucherDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LandedCostVoucherSelect<ExtArgs> | null;
    omit?: Prisma.LandedCostVoucherOmit<ExtArgs> | null;
    include?: Prisma.LandedCostVoucherInclude<ExtArgs> | null;
};
