import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type WorkflowDefinitionModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkflowDefinitionPayload>;
export type AggregateWorkflowDefinition = {
    _count: WorkflowDefinitionCountAggregateOutputType | null;
    _min: WorkflowDefinitionMinAggregateOutputType | null;
    _max: WorkflowDefinitionMaxAggregateOutputType | null;
};
export type WorkflowDefinitionMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    moduleKey: string | null;
    docType: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkflowDefinitionMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    moduleKey: string | null;
    docType: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkflowDefinitionCountAggregateOutputType = {
    id: number;
    tenantId: number;
    name: number;
    moduleKey: number;
    docType: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WorkflowDefinitionMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    moduleKey?: true;
    docType?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkflowDefinitionMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    moduleKey?: true;
    docType?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkflowDefinitionCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    moduleKey?: true;
    docType?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WorkflowDefinitionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    orderBy?: Prisma.WorkflowDefinitionOrderByWithRelationInput | Prisma.WorkflowDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WorkflowDefinitionCountAggregateInputType;
    _min?: WorkflowDefinitionMinAggregateInputType;
    _max?: WorkflowDefinitionMaxAggregateInputType;
};
export type GetWorkflowDefinitionAggregateType<T extends WorkflowDefinitionAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkflowDefinition]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkflowDefinition[P]> : Prisma.GetScalarType<T[P], AggregateWorkflowDefinition[P]>;
};
export type WorkflowDefinitionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    orderBy?: Prisma.WorkflowDefinitionOrderByWithAggregationInput | Prisma.WorkflowDefinitionOrderByWithAggregationInput[];
    by: Prisma.WorkflowDefinitionScalarFieldEnum[] | Prisma.WorkflowDefinitionScalarFieldEnum;
    having?: Prisma.WorkflowDefinitionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkflowDefinitionCountAggregateInputType | true;
    _min?: WorkflowDefinitionMinAggregateInputType;
    _max?: WorkflowDefinitionMaxAggregateInputType;
};
export type WorkflowDefinitionGroupByOutputType = {
    id: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: WorkflowDefinitionCountAggregateOutputType | null;
    _min: WorkflowDefinitionMinAggregateOutputType | null;
    _max: WorkflowDefinitionMaxAggregateOutputType | null;
};
export type GetWorkflowDefinitionGroupByPayload<T extends WorkflowDefinitionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkflowDefinitionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkflowDefinitionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkflowDefinitionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkflowDefinitionGroupByOutputType[P]>;
}>>;
export type WorkflowDefinitionWhereInput = {
    AND?: Prisma.WorkflowDefinitionWhereInput | Prisma.WorkflowDefinitionWhereInput[];
    OR?: Prisma.WorkflowDefinitionWhereInput[];
    NOT?: Prisma.WorkflowDefinitionWhereInput | Prisma.WorkflowDefinitionWhereInput[];
    id?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    tenantId?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    name?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    moduleKey?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    docType?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    isActive?: Prisma.BoolFilter<"WorkflowDefinition"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"WorkflowDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowDefinition"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    steps?: Prisma.WorkflowStepListRelationFilter;
    instances?: Prisma.WorkflowInstanceListRelationFilter;
    salesOrders?: Prisma.SalesOrderListRelationFilter;
    purchaseRequisitions?: Prisma.PurchaseRequisitionListRelationFilter;
    purchaseOrders?: Prisma.PurchaseOrderListRelationFilter;
    stockCounts?: Prisma.StockCountListRelationFilter;
    workOrders?: Prisma.WorkOrderListRelationFilter;
};
export type WorkflowDefinitionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    moduleKey?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    steps?: Prisma.WorkflowStepOrderByRelationAggregateInput;
    instances?: Prisma.WorkflowInstanceOrderByRelationAggregateInput;
    salesOrders?: Prisma.SalesOrderOrderByRelationAggregateInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionOrderByRelationAggregateInput;
    purchaseOrders?: Prisma.PurchaseOrderOrderByRelationAggregateInput;
    stockCounts?: Prisma.StockCountOrderByRelationAggregateInput;
    workOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
};
export type WorkflowDefinitionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_name?: Prisma.WorkflowDefinitionTenantIdNameCompoundUniqueInput;
    AND?: Prisma.WorkflowDefinitionWhereInput | Prisma.WorkflowDefinitionWhereInput[];
    OR?: Prisma.WorkflowDefinitionWhereInput[];
    NOT?: Prisma.WorkflowDefinitionWhereInput | Prisma.WorkflowDefinitionWhereInput[];
    tenantId?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    name?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    moduleKey?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    docType?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    isActive?: Prisma.BoolFilter<"WorkflowDefinition"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"WorkflowDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowDefinition"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    steps?: Prisma.WorkflowStepListRelationFilter;
    instances?: Prisma.WorkflowInstanceListRelationFilter;
    salesOrders?: Prisma.SalesOrderListRelationFilter;
    purchaseRequisitions?: Prisma.PurchaseRequisitionListRelationFilter;
    purchaseOrders?: Prisma.PurchaseOrderListRelationFilter;
    stockCounts?: Prisma.StockCountListRelationFilter;
    workOrders?: Prisma.WorkOrderListRelationFilter;
}, "id" | "tenantId_name">;
export type WorkflowDefinitionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    moduleKey?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WorkflowDefinitionCountOrderByAggregateInput;
    _max?: Prisma.WorkflowDefinitionMaxOrderByAggregateInput;
    _min?: Prisma.WorkflowDefinitionMinOrderByAggregateInput;
};
export type WorkflowDefinitionScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkflowDefinitionScalarWhereWithAggregatesInput | Prisma.WorkflowDefinitionScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkflowDefinitionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkflowDefinitionScalarWhereWithAggregatesInput | Prisma.WorkflowDefinitionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WorkflowDefinition"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"WorkflowDefinition"> | string;
    name?: Prisma.StringWithAggregatesFilter<"WorkflowDefinition"> | string;
    moduleKey?: Prisma.StringWithAggregatesFilter<"WorkflowDefinition"> | string;
    docType?: Prisma.StringWithAggregatesFilter<"WorkflowDefinition"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"WorkflowDefinition"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkflowDefinition"> | Date | string;
};
export type WorkflowDefinitionCreateInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateManyInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowDefinitionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowDefinitionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowDefinitionListRelationFilter = {
    every?: Prisma.WorkflowDefinitionWhereInput;
    some?: Prisma.WorkflowDefinitionWhereInput;
    none?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkflowDefinitionNullableScalarRelationFilter = {
    is?: Prisma.WorkflowDefinitionWhereInput | null;
    isNot?: Prisma.WorkflowDefinitionWhereInput | null;
};
export type WorkflowDefinitionTenantIdNameCompoundUniqueInput = {
    tenantId: string;
    name: string;
};
export type WorkflowDefinitionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    moduleKey?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowDefinitionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    moduleKey?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowDefinitionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    moduleKey?: Prisma.SortOrder;
    docType?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkflowDefinitionScalarRelationFilter = {
    is?: Prisma.WorkflowDefinitionWhereInput;
    isNot?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput> | Prisma.WorkflowDefinitionCreateWithoutTenantInput[] | Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput | Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.WorkflowDefinitionCreateManyTenantInputEnvelope;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
};
export type WorkflowDefinitionUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput> | Prisma.WorkflowDefinitionCreateWithoutTenantInput[] | Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput | Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.WorkflowDefinitionCreateManyTenantInputEnvelope;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
};
export type WorkflowDefinitionUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput> | Prisma.WorkflowDefinitionCreateWithoutTenantInput[] | Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput | Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.WorkflowDefinitionUpsertWithWhereUniqueWithoutTenantInput | Prisma.WorkflowDefinitionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.WorkflowDefinitionCreateManyTenantInputEnvelope;
    set?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    disconnect?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    delete?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    update?: Prisma.WorkflowDefinitionUpdateWithWhereUniqueWithoutTenantInput | Prisma.WorkflowDefinitionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.WorkflowDefinitionUpdateManyWithWhereWithoutTenantInput | Prisma.WorkflowDefinitionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.WorkflowDefinitionScalarWhereInput | Prisma.WorkflowDefinitionScalarWhereInput[];
};
export type WorkflowDefinitionUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput> | Prisma.WorkflowDefinitionCreateWithoutTenantInput[] | Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput | Prisma.WorkflowDefinitionCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.WorkflowDefinitionUpsertWithWhereUniqueWithoutTenantInput | Prisma.WorkflowDefinitionUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.WorkflowDefinitionCreateManyTenantInputEnvelope;
    set?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    disconnect?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    delete?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput | Prisma.WorkflowDefinitionWhereUniqueInput[];
    update?: Prisma.WorkflowDefinitionUpdateWithWhereUniqueWithoutTenantInput | Prisma.WorkflowDefinitionUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.WorkflowDefinitionUpdateManyWithWhereWithoutTenantInput | Prisma.WorkflowDefinitionUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.WorkflowDefinitionScalarWhereInput | Prisma.WorkflowDefinitionScalarWhereInput[];
};
export type WorkflowDefinitionCreateNestedOneWithoutSalesOrdersInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutSalesOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutSalesOrdersInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutSalesOrdersInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateOneWithoutSalesOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutSalesOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutSalesOrdersInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutSalesOrdersInput;
    upsert?: Prisma.WorkflowDefinitionUpsertWithoutSalesOrdersInput;
    disconnect?: Prisma.WorkflowDefinitionWhereInput | boolean;
    delete?: Prisma.WorkflowDefinitionWhereInput | boolean;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowDefinitionUpdateToOneWithWhereWithoutSalesOrdersInput, Prisma.WorkflowDefinitionUpdateWithoutSalesOrdersInput>, Prisma.WorkflowDefinitionUncheckedUpdateWithoutSalesOrdersInput>;
};
export type WorkflowDefinitionCreateNestedOneWithoutPurchaseRequisitionsInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseRequisitionsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseRequisitionsInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutPurchaseRequisitionsInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateOneWithoutPurchaseRequisitionsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseRequisitionsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseRequisitionsInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutPurchaseRequisitionsInput;
    upsert?: Prisma.WorkflowDefinitionUpsertWithoutPurchaseRequisitionsInput;
    disconnect?: Prisma.WorkflowDefinitionWhereInput | boolean;
    delete?: Prisma.WorkflowDefinitionWhereInput | boolean;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowDefinitionUpdateToOneWithWhereWithoutPurchaseRequisitionsInput, Prisma.WorkflowDefinitionUpdateWithoutPurchaseRequisitionsInput>, Prisma.WorkflowDefinitionUncheckedUpdateWithoutPurchaseRequisitionsInput>;
};
export type WorkflowDefinitionCreateNestedOneWithoutPurchaseOrdersInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseOrdersInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutPurchaseOrdersInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateOneWithoutPurchaseOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseOrdersInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutPurchaseOrdersInput;
    upsert?: Prisma.WorkflowDefinitionUpsertWithoutPurchaseOrdersInput;
    disconnect?: Prisma.WorkflowDefinitionWhereInput | boolean;
    delete?: Prisma.WorkflowDefinitionWhereInput | boolean;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowDefinitionUpdateToOneWithWhereWithoutPurchaseOrdersInput, Prisma.WorkflowDefinitionUpdateWithoutPurchaseOrdersInput>, Prisma.WorkflowDefinitionUncheckedUpdateWithoutPurchaseOrdersInput>;
};
export type WorkflowDefinitionCreateNestedOneWithoutStockCountsInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStockCountsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStockCountsInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutStockCountsInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateOneWithoutStockCountsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStockCountsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStockCountsInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutStockCountsInput;
    upsert?: Prisma.WorkflowDefinitionUpsertWithoutStockCountsInput;
    disconnect?: Prisma.WorkflowDefinitionWhereInput | boolean;
    delete?: Prisma.WorkflowDefinitionWhereInput | boolean;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowDefinitionUpdateToOneWithWhereWithoutStockCountsInput, Prisma.WorkflowDefinitionUpdateWithoutStockCountsInput>, Prisma.WorkflowDefinitionUncheckedUpdateWithoutStockCountsInput>;
};
export type WorkflowDefinitionCreateNestedOneWithoutStepsInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStepsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStepsInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutStepsInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateOneRequiredWithoutStepsNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStepsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStepsInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutStepsInput;
    upsert?: Prisma.WorkflowDefinitionUpsertWithoutStepsInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowDefinitionUpdateToOneWithWhereWithoutStepsInput, Prisma.WorkflowDefinitionUpdateWithoutStepsInput>, Prisma.WorkflowDefinitionUncheckedUpdateWithoutStepsInput>;
};
export type WorkflowDefinitionCreateNestedOneWithoutInstancesInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutInstancesInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutInstancesInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutInstancesInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateOneRequiredWithoutInstancesNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutInstancesInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutInstancesInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutInstancesInput;
    upsert?: Prisma.WorkflowDefinitionUpsertWithoutInstancesInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowDefinitionUpdateToOneWithWhereWithoutInstancesInput, Prisma.WorkflowDefinitionUpdateWithoutInstancesInput>, Prisma.WorkflowDefinitionUncheckedUpdateWithoutInstancesInput>;
};
export type WorkflowDefinitionCreateNestedOneWithoutWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutWorkOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutWorkOrdersInput;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateOneWithoutWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutWorkOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutWorkOrdersInput>;
    connectOrCreate?: Prisma.WorkflowDefinitionCreateOrConnectWithoutWorkOrdersInput;
    upsert?: Prisma.WorkflowDefinitionUpsertWithoutWorkOrdersInput;
    disconnect?: Prisma.WorkflowDefinitionWhereInput | boolean;
    delete?: Prisma.WorkflowDefinitionWhereInput | boolean;
    connect?: Prisma.WorkflowDefinitionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkflowDefinitionUpdateToOneWithWhereWithoutWorkOrdersInput, Prisma.WorkflowDefinitionUpdateWithoutWorkOrdersInput>, Prisma.WorkflowDefinitionUncheckedUpdateWithoutWorkOrdersInput>;
};
export type WorkflowDefinitionCreateWithoutTenantInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutTenantInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutTenantInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput>;
};
export type WorkflowDefinitionCreateManyTenantInputEnvelope = {
    data: Prisma.WorkflowDefinitionCreateManyTenantInput | Prisma.WorkflowDefinitionCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type WorkflowDefinitionUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutTenantInput>;
};
export type WorkflowDefinitionUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutTenantInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutTenantInput>;
};
export type WorkflowDefinitionUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.WorkflowDefinitionScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateManyMutationInput, Prisma.WorkflowDefinitionUncheckedUpdateManyWithoutTenantInput>;
};
export type WorkflowDefinitionScalarWhereInput = {
    AND?: Prisma.WorkflowDefinitionScalarWhereInput | Prisma.WorkflowDefinitionScalarWhereInput[];
    OR?: Prisma.WorkflowDefinitionScalarWhereInput[];
    NOT?: Prisma.WorkflowDefinitionScalarWhereInput | Prisma.WorkflowDefinitionScalarWhereInput[];
    id?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    tenantId?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    name?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    moduleKey?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    docType?: Prisma.StringFilter<"WorkflowDefinition"> | string;
    isActive?: Prisma.BoolFilter<"WorkflowDefinition"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"WorkflowDefinition"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkflowDefinition"> | Date | string;
};
export type WorkflowDefinitionCreateWithoutSalesOrdersInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutSalesOrdersInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutSalesOrdersInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutSalesOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutSalesOrdersInput>;
};
export type WorkflowDefinitionUpsertWithoutSalesOrdersInput = {
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutSalesOrdersInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutSalesOrdersInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutSalesOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutSalesOrdersInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionUpdateToOneWithWhereWithoutSalesOrdersInput = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutSalesOrdersInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutSalesOrdersInput>;
};
export type WorkflowDefinitionUpdateWithoutSalesOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutSalesOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateWithoutPurchaseRequisitionsInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutPurchaseRequisitionsInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutPurchaseRequisitionsInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseRequisitionsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseRequisitionsInput>;
};
export type WorkflowDefinitionUpsertWithoutPurchaseRequisitionsInput = {
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutPurchaseRequisitionsInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutPurchaseRequisitionsInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseRequisitionsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseRequisitionsInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionUpdateToOneWithWhereWithoutPurchaseRequisitionsInput = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutPurchaseRequisitionsInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutPurchaseRequisitionsInput>;
};
export type WorkflowDefinitionUpdateWithoutPurchaseRequisitionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutPurchaseRequisitionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateWithoutPurchaseOrdersInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutPurchaseOrdersInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutPurchaseOrdersInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseOrdersInput>;
};
export type WorkflowDefinitionUpsertWithoutPurchaseOrdersInput = {
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutPurchaseOrdersInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutPurchaseOrdersInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutPurchaseOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutPurchaseOrdersInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionUpdateToOneWithWhereWithoutPurchaseOrdersInput = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutPurchaseOrdersInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutPurchaseOrdersInput>;
};
export type WorkflowDefinitionUpdateWithoutPurchaseOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutPurchaseOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateWithoutStockCountsInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutStockCountsInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutStockCountsInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStockCountsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStockCountsInput>;
};
export type WorkflowDefinitionUpsertWithoutStockCountsInput = {
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutStockCountsInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutStockCountsInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStockCountsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStockCountsInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionUpdateToOneWithWhereWithoutStockCountsInput = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutStockCountsInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutStockCountsInput>;
};
export type WorkflowDefinitionUpdateWithoutStockCountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutStockCountsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateWithoutStepsInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutStepsInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutStepsInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStepsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStepsInput>;
};
export type WorkflowDefinitionUpsertWithoutStepsInput = {
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutStepsInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutStepsInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutStepsInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutStepsInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionUpdateToOneWithWhereWithoutStepsInput = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutStepsInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutStepsInput>;
};
export type WorkflowDefinitionUpdateWithoutStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutStepsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateWithoutInstancesInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutInstancesInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
    workOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutInstancesInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutInstancesInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutInstancesInput>;
};
export type WorkflowDefinitionUpsertWithoutInstancesInput = {
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutInstancesInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutInstancesInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutInstancesInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutInstancesInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionUpdateToOneWithWhereWithoutInstancesInput = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutInstancesInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutInstancesInput>;
};
export type WorkflowDefinitionUpdateWithoutInstancesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutInstancesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateWithoutWorkOrdersInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutWorkflowDefinitionsInput;
    steps?: Prisma.WorkflowStepCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionUncheckedCreateWithoutWorkOrdersInput = {
    id?: string;
    tenantId: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    steps?: Prisma.WorkflowStepUncheckedCreateNestedManyWithoutDefinitionInput;
    instances?: Prisma.WorkflowInstanceUncheckedCreateNestedManyWithoutDefinitionInput;
    salesOrders?: Prisma.SalesOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedCreateNestedManyWithoutWorkflowDefInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutWorkflowDefInput;
    stockCounts?: Prisma.StockCountUncheckedCreateNestedManyWithoutWorkflowDefInput;
};
export type WorkflowDefinitionCreateOrConnectWithoutWorkOrdersInput = {
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutWorkOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutWorkOrdersInput>;
};
export type WorkflowDefinitionUpsertWithoutWorkOrdersInput = {
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutWorkOrdersInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutWorkOrdersInput>;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateWithoutWorkOrdersInput, Prisma.WorkflowDefinitionUncheckedCreateWithoutWorkOrdersInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
};
export type WorkflowDefinitionUpdateToOneWithWhereWithoutWorkOrdersInput = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateWithoutWorkOrdersInput, Prisma.WorkflowDefinitionUncheckedUpdateWithoutWorkOrdersInput>;
};
export type WorkflowDefinitionUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutWorkflowDefinitionsNestedInput;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionCreateManyTenantInput = {
    id?: string;
    name: string;
    moduleKey: string;
    docType: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkflowDefinitionUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    steps?: Prisma.WorkflowStepUncheckedUpdateManyWithoutDefinitionNestedInput;
    instances?: Prisma.WorkflowInstanceUncheckedUpdateManyWithoutDefinitionNestedInput;
    salesOrders?: Prisma.SalesOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseRequisitions?: Prisma.PurchaseRequisitionUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    purchaseOrders?: Prisma.PurchaseOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    stockCounts?: Prisma.StockCountUncheckedUpdateManyWithoutWorkflowDefNestedInput;
    workOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutWorkflowDefNestedInput;
};
export type WorkflowDefinitionUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    moduleKey?: Prisma.StringFieldUpdateOperationsInput | string;
    docType?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkflowDefinitionCountOutputType = {
    steps: number;
    instances: number;
    salesOrders: number;
    purchaseRequisitions: number;
    purchaseOrders: number;
    stockCounts: number;
    workOrders: number;
};
export type WorkflowDefinitionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    steps?: boolean | WorkflowDefinitionCountOutputTypeCountStepsArgs;
    instances?: boolean | WorkflowDefinitionCountOutputTypeCountInstancesArgs;
    salesOrders?: boolean | WorkflowDefinitionCountOutputTypeCountSalesOrdersArgs;
    purchaseRequisitions?: boolean | WorkflowDefinitionCountOutputTypeCountPurchaseRequisitionsArgs;
    purchaseOrders?: boolean | WorkflowDefinitionCountOutputTypeCountPurchaseOrdersArgs;
    stockCounts?: boolean | WorkflowDefinitionCountOutputTypeCountStockCountsArgs;
    workOrders?: boolean | WorkflowDefinitionCountOutputTypeCountWorkOrdersArgs;
};
export type WorkflowDefinitionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionCountOutputTypeSelect<ExtArgs> | null;
};
export type WorkflowDefinitionCountOutputTypeCountStepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowStepWhereInput;
};
export type WorkflowDefinitionCountOutputTypeCountInstancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowInstanceWhereInput;
};
export type WorkflowDefinitionCountOutputTypeCountSalesOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SalesOrderWhereInput;
};
export type WorkflowDefinitionCountOutputTypeCountPurchaseRequisitionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseRequisitionWhereInput;
};
export type WorkflowDefinitionCountOutputTypeCountPurchaseOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PurchaseOrderWhereInput;
};
export type WorkflowDefinitionCountOutputTypeCountStockCountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockCountWhereInput;
};
export type WorkflowDefinitionCountOutputTypeCountWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
export type WorkflowDefinitionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    moduleKey?: boolean;
    docType?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    steps?: boolean | Prisma.WorkflowDefinition$stepsArgs<ExtArgs>;
    instances?: boolean | Prisma.WorkflowDefinition$instancesArgs<ExtArgs>;
    salesOrders?: boolean | Prisma.WorkflowDefinition$salesOrdersArgs<ExtArgs>;
    purchaseRequisitions?: boolean | Prisma.WorkflowDefinition$purchaseRequisitionsArgs<ExtArgs>;
    purchaseOrders?: boolean | Prisma.WorkflowDefinition$purchaseOrdersArgs<ExtArgs>;
    stockCounts?: boolean | Prisma.WorkflowDefinition$stockCountsArgs<ExtArgs>;
    workOrders?: boolean | Prisma.WorkflowDefinition$workOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkflowDefinitionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowDefinition"]>;
export type WorkflowDefinitionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    moduleKey?: boolean;
    docType?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowDefinition"]>;
export type WorkflowDefinitionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    moduleKey?: boolean;
    docType?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["workflowDefinition"]>;
export type WorkflowDefinitionSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    moduleKey?: boolean;
    docType?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WorkflowDefinitionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "name" | "moduleKey" | "docType" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["workflowDefinition"]>;
export type WorkflowDefinitionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    steps?: boolean | Prisma.WorkflowDefinition$stepsArgs<ExtArgs>;
    instances?: boolean | Prisma.WorkflowDefinition$instancesArgs<ExtArgs>;
    salesOrders?: boolean | Prisma.WorkflowDefinition$salesOrdersArgs<ExtArgs>;
    purchaseRequisitions?: boolean | Prisma.WorkflowDefinition$purchaseRequisitionsArgs<ExtArgs>;
    purchaseOrders?: boolean | Prisma.WorkflowDefinition$purchaseOrdersArgs<ExtArgs>;
    stockCounts?: boolean | Prisma.WorkflowDefinition$stockCountsArgs<ExtArgs>;
    workOrders?: boolean | Prisma.WorkflowDefinition$workOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.WorkflowDefinitionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WorkflowDefinitionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type WorkflowDefinitionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $WorkflowDefinitionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkflowDefinition";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        steps: Prisma.$WorkflowStepPayload<ExtArgs>[];
        instances: Prisma.$WorkflowInstancePayload<ExtArgs>[];
        salesOrders: Prisma.$SalesOrderPayload<ExtArgs>[];
        purchaseRequisitions: Prisma.$PurchaseRequisitionPayload<ExtArgs>[];
        purchaseOrders: Prisma.$PurchaseOrderPayload<ExtArgs>[];
        stockCounts: Prisma.$StockCountPayload<ExtArgs>[];
        workOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        name: string;
        moduleKey: string;
        docType: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["workflowDefinition"]>;
    composites: {};
};
export type WorkflowDefinitionGetPayload<S extends boolean | null | undefined | WorkflowDefinitionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload, S>;
export type WorkflowDefinitionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkflowDefinitionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkflowDefinitionCountAggregateInputType | true;
};
export interface WorkflowDefinitionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkflowDefinition'];
        meta: {
            name: 'WorkflowDefinition';
        };
    };
    findUnique<T extends WorkflowDefinitionFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WorkflowDefinitionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WorkflowDefinitionFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkflowDefinitionFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WorkflowDefinitionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkflowDefinitionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WorkflowDefinitionFindManyArgs>(args?: Prisma.SelectSubset<T, WorkflowDefinitionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WorkflowDefinitionCreateArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionCreateArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WorkflowDefinitionCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkflowDefinitionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WorkflowDefinitionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkflowDefinitionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WorkflowDefinitionDeleteArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WorkflowDefinitionUpdateArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WorkflowDefinitionDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkflowDefinitionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WorkflowDefinitionUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WorkflowDefinitionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WorkflowDefinitionUpsertArgs>(args: Prisma.SelectSubset<T, WorkflowDefinitionUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkflowDefinitionClient<runtime.Types.Result.GetResult<Prisma.$WorkflowDefinitionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WorkflowDefinitionCountArgs>(args?: Prisma.Subset<T, WorkflowDefinitionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkflowDefinitionCountAggregateOutputType> : number>;
    aggregate<T extends WorkflowDefinitionAggregateArgs>(args: Prisma.Subset<T, WorkflowDefinitionAggregateArgs>): Prisma.PrismaPromise<GetWorkflowDefinitionAggregateType<T>>;
    groupBy<T extends WorkflowDefinitionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkflowDefinitionGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkflowDefinitionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkflowDefinitionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowDefinitionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WorkflowDefinitionFieldRefs;
}
export interface Prisma__WorkflowDefinitionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    steps<T extends Prisma.WorkflowDefinition$stepsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinition$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    instances<T extends Prisma.WorkflowDefinition$instancesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinition$instancesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkflowInstancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    salesOrders<T extends Prisma.WorkflowDefinition$salesOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinition$salesOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalesOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    purchaseRequisitions<T extends Prisma.WorkflowDefinition$purchaseRequisitionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinition$purchaseRequisitionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseRequisitionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    purchaseOrders<T extends Prisma.WorkflowDefinition$purchaseOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinition$purchaseOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PurchaseOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    stockCounts<T extends Prisma.WorkflowDefinition$stockCountsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinition$stockCountsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockCountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    workOrders<T extends Prisma.WorkflowDefinition$workOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkflowDefinition$workOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WorkflowDefinitionFieldRefs {
    readonly id: Prisma.FieldRef<"WorkflowDefinition", 'String'>;
    readonly tenantId: Prisma.FieldRef<"WorkflowDefinition", 'String'>;
    readonly name: Prisma.FieldRef<"WorkflowDefinition", 'String'>;
    readonly moduleKey: Prisma.FieldRef<"WorkflowDefinition", 'String'>;
    readonly docType: Prisma.FieldRef<"WorkflowDefinition", 'String'>;
    readonly isActive: Prisma.FieldRef<"WorkflowDefinition", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"WorkflowDefinition", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkflowDefinition", 'DateTime'>;
}
export type WorkflowDefinitionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where?: Prisma.WorkflowDefinitionWhereInput;
    orderBy?: Prisma.WorkflowDefinitionOrderByWithRelationInput | Prisma.WorkflowDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowDefinitionScalarFieldEnum | Prisma.WorkflowDefinitionScalarFieldEnum[];
};
export type WorkflowDefinitionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where?: Prisma.WorkflowDefinitionWhereInput;
    orderBy?: Prisma.WorkflowDefinitionOrderByWithRelationInput | Prisma.WorkflowDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowDefinitionScalarFieldEnum | Prisma.WorkflowDefinitionScalarFieldEnum[];
};
export type WorkflowDefinitionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where?: Prisma.WorkflowDefinitionWhereInput;
    orderBy?: Prisma.WorkflowDefinitionOrderByWithRelationInput | Prisma.WorkflowDefinitionOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowDefinitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowDefinitionScalarFieldEnum | Prisma.WorkflowDefinitionScalarFieldEnum[];
};
export type WorkflowDefinitionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowDefinitionCreateInput, Prisma.WorkflowDefinitionUncheckedCreateInput>;
};
export type WorkflowDefinitionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WorkflowDefinitionCreateManyInput | Prisma.WorkflowDefinitionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WorkflowDefinitionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    data: Prisma.WorkflowDefinitionCreateManyInput | Prisma.WorkflowDefinitionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WorkflowDefinitionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WorkflowDefinitionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateInput, Prisma.WorkflowDefinitionUncheckedUpdateInput>;
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateManyMutationInput, Prisma.WorkflowDefinitionUncheckedUpdateManyInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
    limit?: number;
};
export type WorkflowDefinitionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WorkflowDefinitionUpdateManyMutationInput, Prisma.WorkflowDefinitionUncheckedUpdateManyInput>;
    where?: Prisma.WorkflowDefinitionWhereInput;
    limit?: number;
    include?: Prisma.WorkflowDefinitionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WorkflowDefinitionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkflowDefinitionCreateInput, Prisma.WorkflowDefinitionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WorkflowDefinitionUpdateInput, Prisma.WorkflowDefinitionUncheckedUpdateInput>;
};
export type WorkflowDefinitionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
    where: Prisma.WorkflowDefinitionWhereUniqueInput;
};
export type WorkflowDefinitionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkflowDefinitionWhereInput;
    limit?: number;
};
export type WorkflowDefinition$stepsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowStepSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowStepOmit<ExtArgs> | null;
    include?: Prisma.WorkflowStepInclude<ExtArgs> | null;
    where?: Prisma.WorkflowStepWhereInput;
    orderBy?: Prisma.WorkflowStepOrderByWithRelationInput | Prisma.WorkflowStepOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowStepWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowStepScalarFieldEnum | Prisma.WorkflowStepScalarFieldEnum[];
};
export type WorkflowDefinition$instancesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowInstanceSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowInstanceOmit<ExtArgs> | null;
    include?: Prisma.WorkflowInstanceInclude<ExtArgs> | null;
    where?: Prisma.WorkflowInstanceWhereInput;
    orderBy?: Prisma.WorkflowInstanceOrderByWithRelationInput | Prisma.WorkflowInstanceOrderByWithRelationInput[];
    cursor?: Prisma.WorkflowInstanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkflowInstanceScalarFieldEnum | Prisma.WorkflowInstanceScalarFieldEnum[];
};
export type WorkflowDefinition$salesOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalesOrderSelect<ExtArgs> | null;
    omit?: Prisma.SalesOrderOmit<ExtArgs> | null;
    include?: Prisma.SalesOrderInclude<ExtArgs> | null;
    where?: Prisma.SalesOrderWhereInput;
    orderBy?: Prisma.SalesOrderOrderByWithRelationInput | Prisma.SalesOrderOrderByWithRelationInput[];
    cursor?: Prisma.SalesOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SalesOrderScalarFieldEnum | Prisma.SalesOrderScalarFieldEnum[];
};
export type WorkflowDefinition$purchaseRequisitionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseRequisitionSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseRequisitionOmit<ExtArgs> | null;
    include?: Prisma.PurchaseRequisitionInclude<ExtArgs> | null;
    where?: Prisma.PurchaseRequisitionWhereInput;
    orderBy?: Prisma.PurchaseRequisitionOrderByWithRelationInput | Prisma.PurchaseRequisitionOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseRequisitionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseRequisitionScalarFieldEnum | Prisma.PurchaseRequisitionScalarFieldEnum[];
};
export type WorkflowDefinition$purchaseOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PurchaseOrderSelect<ExtArgs> | null;
    omit?: Prisma.PurchaseOrderOmit<ExtArgs> | null;
    include?: Prisma.PurchaseOrderInclude<ExtArgs> | null;
    where?: Prisma.PurchaseOrderWhereInput;
    orderBy?: Prisma.PurchaseOrderOrderByWithRelationInput | Prisma.PurchaseOrderOrderByWithRelationInput[];
    cursor?: Prisma.PurchaseOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PurchaseOrderScalarFieldEnum | Prisma.PurchaseOrderScalarFieldEnum[];
};
export type WorkflowDefinition$stockCountsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StockCountSelect<ExtArgs> | null;
    omit?: Prisma.StockCountOmit<ExtArgs> | null;
    include?: Prisma.StockCountInclude<ExtArgs> | null;
    where?: Prisma.StockCountWhereInput;
    orderBy?: Prisma.StockCountOrderByWithRelationInput | Prisma.StockCountOrderByWithRelationInput[];
    cursor?: Prisma.StockCountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StockCountScalarFieldEnum | Prisma.StockCountScalarFieldEnum[];
};
export type WorkflowDefinition$workOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WorkflowDefinitionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorkflowDefinitionSelect<ExtArgs> | null;
    omit?: Prisma.WorkflowDefinitionOmit<ExtArgs> | null;
    include?: Prisma.WorkflowDefinitionInclude<ExtArgs> | null;
};
