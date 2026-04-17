import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProjectModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectPayload>;
export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type ProjectAvgAggregateOutputType = {
    totalBudget: runtime.Decimal | null;
};
export type ProjectSumAggregateOutputType = {
    totalBudget: runtime.Decimal | null;
};
export type ProjectMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    name: string | null;
    customerId: string | null;
    description: string | null;
    contractId: string | null;
    startDate: Date | null;
    endDate: Date | null;
    totalBudget: runtime.Decimal | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProjectMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    code: string | null;
    name: string | null;
    customerId: string | null;
    description: string | null;
    contractId: string | null;
    startDate: Date | null;
    endDate: Date | null;
    totalBudget: runtime.Decimal | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProjectCountAggregateOutputType = {
    id: number;
    tenantId: number;
    code: number;
    name: number;
    customerId: number;
    description: number;
    contractId: number;
    startDate: number;
    endDate: number;
    totalBudget: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProjectAvgAggregateInputType = {
    totalBudget?: true;
};
export type ProjectSumAggregateInputType = {
    totalBudget?: true;
};
export type ProjectMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    name?: true;
    customerId?: true;
    description?: true;
    contractId?: true;
    startDate?: true;
    endDate?: true;
    totalBudget?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProjectMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    name?: true;
    customerId?: true;
    description?: true;
    contractId?: true;
    startDate?: true;
    endDate?: true;
    totalBudget?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProjectCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    code?: true;
    name?: true;
    customerId?: true;
    description?: true;
    contractId?: true;
    startDate?: true;
    endDate?: true;
    totalBudget?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectCountAggregateInputType;
    _avg?: ProjectAvgAggregateInputType;
    _sum?: ProjectSumAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
    [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProject[P]> : Prisma.GetScalarType<T[P], AggregateProject[P]>;
};
export type ProjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithAggregationInput | Prisma.ProjectOrderByWithAggregationInput[];
    by: Prisma.ProjectScalarFieldEnum[] | Prisma.ProjectScalarFieldEnum;
    having?: Prisma.ProjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectCountAggregateInputType | true;
    _avg?: ProjectAvgAggregateInputType;
    _sum?: ProjectSumAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type ProjectGroupByOutputType = {
    id: string;
    tenantId: string;
    code: string;
    name: string;
    customerId: string | null;
    description: string | null;
    contractId: string | null;
    startDate: Date | null;
    endDate: Date | null;
    totalBudget: runtime.Decimal | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]>;
}>>;
export type ProjectWhereInput = {
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    tenantId?: Prisma.StringFilter<"Project"> | string;
    code?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    customerId?: Prisma.StringNullableFilter<"Project"> | string | null;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    contractId?: Prisma.StringNullableFilter<"Project"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    totalBudget?: Prisma.DecimalNullableFilter<"Project"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    customer?: Prisma.XOR<Prisma.CustomerNullableScalarRelationFilter, Prisma.CustomerWhereInput> | null;
    wbsTasks?: Prisma.WbsTaskListRelationFilter;
    budgets?: Prisma.ProjectBudgetListRelationFilter;
    tenders?: Prisma.TenderListRelationFilter;
    progressInvoices?: Prisma.ProgressInvoiceListRelationFilter;
    dailyReports?: Prisma.DailyReportListRelationFilter;
    commitments?: Prisma.ProjectCommitmentListRelationFilter;
};
export type ProjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    customerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalBudget?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    wbsTasks?: Prisma.WbsTaskOrderByRelationAggregateInput;
    budgets?: Prisma.ProjectBudgetOrderByRelationAggregateInput;
    tenders?: Prisma.TenderOrderByRelationAggregateInput;
    progressInvoices?: Prisma.ProgressInvoiceOrderByRelationAggregateInput;
    dailyReports?: Prisma.DailyReportOrderByRelationAggregateInput;
    commitments?: Prisma.ProjectCommitmentOrderByRelationAggregateInput;
};
export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.ProjectTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    tenantId?: Prisma.StringFilter<"Project"> | string;
    code?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    customerId?: Prisma.StringNullableFilter<"Project"> | string | null;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    contractId?: Prisma.StringNullableFilter<"Project"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    totalBudget?: Prisma.DecimalNullableFilter<"Project"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    customer?: Prisma.XOR<Prisma.CustomerNullableScalarRelationFilter, Prisma.CustomerWhereInput> | null;
    wbsTasks?: Prisma.WbsTaskListRelationFilter;
    budgets?: Prisma.ProjectBudgetListRelationFilter;
    tenders?: Prisma.TenderListRelationFilter;
    progressInvoices?: Prisma.ProgressInvoiceListRelationFilter;
    dailyReports?: Prisma.DailyReportListRelationFilter;
    commitments?: Prisma.ProjectCommitmentListRelationFilter;
}, "id" | "tenantId_code">;
export type ProjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    customerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalBudget?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProjectCountOrderByAggregateInput;
    _avg?: Prisma.ProjectAvgOrderByAggregateInput;
    _max?: Prisma.ProjectMaxOrderByAggregateInput;
    _min?: Prisma.ProjectMinOrderByAggregateInput;
    _sum?: Prisma.ProjectSumOrderByAggregateInput;
};
export type ProjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    customerId?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    contractId?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    startDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null;
    totalBudget?: Prisma.DecimalNullableWithAggregatesFilter<"Project"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
};
export type ProjectCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer?: Prisma.CustomerCreateNestedOneWithoutProjectsInput;
    wbsTasks?: Prisma.WbsTaskCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetUncheckedCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderUncheckedCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportUncheckedCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneWithoutProjectsNestedInput;
    wbsTasks?: Prisma.WbsTaskUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUncheckedUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUncheckedUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUncheckedUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectListRelationFilter = {
    every?: Prisma.ProjectWhereInput;
    some?: Prisma.ProjectWhereInput;
    none?: Prisma.ProjectWhereInput;
};
export type ProjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type ProjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalBudget?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProjectAvgOrderByAggregateInput = {
    totalBudget?: Prisma.SortOrder;
};
export type ProjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalBudget?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    totalBudget?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProjectSumOrderByAggregateInput = {
    totalBudget?: Prisma.SortOrder;
};
export type ProjectScalarRelationFilter = {
    is?: Prisma.ProjectWhereInput;
    isNot?: Prisma.ProjectWhereInput;
};
export type ProjectNullableScalarRelationFilter = {
    is?: Prisma.ProjectWhereInput | null;
    isNot?: Prisma.ProjectWhereInput | null;
};
export type ProjectCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCustomerInput, Prisma.ProjectUncheckedCreateWithoutCustomerInput> | Prisma.ProjectCreateWithoutCustomerInput[] | Prisma.ProjectUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCustomerInput | Prisma.ProjectCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ProjectCreateManyCustomerInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCustomerInput, Prisma.ProjectUncheckedCreateWithoutCustomerInput> | Prisma.ProjectCreateWithoutCustomerInput[] | Prisma.ProjectUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCustomerInput | Prisma.ProjectCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ProjectCreateManyCustomerInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCustomerInput, Prisma.ProjectUncheckedCreateWithoutCustomerInput> | Prisma.ProjectCreateWithoutCustomerInput[] | Prisma.ProjectUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCustomerInput | Prisma.ProjectCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ProjectUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ProjectCreateManyCustomerInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ProjectUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutCustomerInput | Prisma.ProjectUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCustomerInput, Prisma.ProjectUncheckedCreateWithoutCustomerInput> | Prisma.ProjectCreateWithoutCustomerInput[] | Prisma.ProjectUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCustomerInput | Prisma.ProjectCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ProjectUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ProjectCreateManyCustomerInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ProjectUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutCustomerInput | Prisma.ProjectUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectCreateNestedOneWithoutWbsTasksInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutWbsTasksInput, Prisma.ProjectUncheckedCreateWithoutWbsTasksInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutWbsTasksInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutWbsTasksNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutWbsTasksInput, Prisma.ProjectUncheckedCreateWithoutWbsTasksInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutWbsTasksInput;
    upsert?: Prisma.ProjectUpsertWithoutWbsTasksInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutWbsTasksInput, Prisma.ProjectUpdateWithoutWbsTasksInput>, Prisma.ProjectUncheckedUpdateWithoutWbsTasksInput>;
};
export type ProjectCreateNestedOneWithoutBudgetsInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutBudgetsInput, Prisma.ProjectUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutBudgetsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutBudgetsInput, Prisma.ProjectUncheckedCreateWithoutBudgetsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutBudgetsInput;
    upsert?: Prisma.ProjectUpsertWithoutBudgetsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutBudgetsInput, Prisma.ProjectUpdateWithoutBudgetsInput>, Prisma.ProjectUncheckedUpdateWithoutBudgetsInput>;
};
export type ProjectCreateNestedOneWithoutTendersInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutTendersInput, Prisma.ProjectUncheckedCreateWithoutTendersInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutTendersInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneWithoutTendersNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutTendersInput, Prisma.ProjectUncheckedCreateWithoutTendersInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutTendersInput;
    upsert?: Prisma.ProjectUpsertWithoutTendersInput;
    disconnect?: Prisma.ProjectWhereInput | boolean;
    delete?: Prisma.ProjectWhereInput | boolean;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutTendersInput, Prisma.ProjectUpdateWithoutTendersInput>, Prisma.ProjectUncheckedUpdateWithoutTendersInput>;
};
export type ProjectCreateNestedOneWithoutDailyReportsInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutDailyReportsInput, Prisma.ProjectUncheckedCreateWithoutDailyReportsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutDailyReportsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutDailyReportsNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutDailyReportsInput, Prisma.ProjectUncheckedCreateWithoutDailyReportsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutDailyReportsInput;
    upsert?: Prisma.ProjectUpsertWithoutDailyReportsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutDailyReportsInput, Prisma.ProjectUpdateWithoutDailyReportsInput>, Prisma.ProjectUncheckedUpdateWithoutDailyReportsInput>;
};
export type ProjectCreateNestedOneWithoutProgressInvoicesInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProgressInvoicesInput, Prisma.ProjectUncheckedCreateWithoutProgressInvoicesInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProgressInvoicesInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutProgressInvoicesNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProgressInvoicesInput, Prisma.ProjectUncheckedCreateWithoutProgressInvoicesInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProgressInvoicesInput;
    upsert?: Prisma.ProjectUpsertWithoutProgressInvoicesInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutProgressInvoicesInput, Prisma.ProjectUpdateWithoutProgressInvoicesInput>, Prisma.ProjectUncheckedUpdateWithoutProgressInvoicesInput>;
};
export type ProjectCreateNestedOneWithoutCommitmentsInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCommitmentsInput, Prisma.ProjectUncheckedCreateWithoutCommitmentsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCommitmentsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutCommitmentsNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutCommitmentsInput, Prisma.ProjectUncheckedCreateWithoutCommitmentsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutCommitmentsInput;
    upsert?: Prisma.ProjectUpsertWithoutCommitmentsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutCommitmentsInput, Prisma.ProjectUpdateWithoutCommitmentsInput>, Prisma.ProjectUncheckedUpdateWithoutCommitmentsInput>;
};
export type ProjectCreateWithoutCustomerInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutCustomerInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetUncheckedCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderUncheckedCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportUncheckedCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutCustomerInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutCustomerInput, Prisma.ProjectUncheckedCreateWithoutCustomerInput>;
};
export type ProjectCreateManyCustomerInputEnvelope = {
    data: Prisma.ProjectCreateManyCustomerInput | Prisma.ProjectCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutCustomerInput, Prisma.ProjectUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutCustomerInput, Prisma.ProjectUncheckedCreateWithoutCustomerInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutCustomerInput, Prisma.ProjectUncheckedUpdateWithoutCustomerInput>;
};
export type ProjectUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutCustomerInput>;
};
export type ProjectScalarWhereInput = {
    AND?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    OR?: Prisma.ProjectScalarWhereInput[];
    NOT?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    tenantId?: Prisma.StringFilter<"Project"> | string;
    code?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    customerId?: Prisma.StringNullableFilter<"Project"> | string | null;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    contractId?: Prisma.StringNullableFilter<"Project"> | string | null;
    startDate?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    endDate?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    totalBudget?: Prisma.DecimalNullableFilter<"Project"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
};
export type ProjectCreateWithoutWbsTasksInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer?: Prisma.CustomerCreateNestedOneWithoutProjectsInput;
    budgets?: Prisma.ProjectBudgetCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutWbsTasksInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budgets?: Prisma.ProjectBudgetUncheckedCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderUncheckedCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportUncheckedCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutWbsTasksInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutWbsTasksInput, Prisma.ProjectUncheckedCreateWithoutWbsTasksInput>;
};
export type ProjectUpsertWithoutWbsTasksInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutWbsTasksInput, Prisma.ProjectUncheckedUpdateWithoutWbsTasksInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutWbsTasksInput, Prisma.ProjectUncheckedCreateWithoutWbsTasksInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutWbsTasksInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutWbsTasksInput, Prisma.ProjectUncheckedUpdateWithoutWbsTasksInput>;
};
export type ProjectUpdateWithoutWbsTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneWithoutProjectsNestedInput;
    budgets?: Prisma.ProjectBudgetUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutWbsTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budgets?: Prisma.ProjectBudgetUncheckedUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUncheckedUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUncheckedUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutBudgetsInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer?: Prisma.CustomerCreateNestedOneWithoutProjectsInput;
    wbsTasks?: Prisma.WbsTaskCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutBudgetsInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderUncheckedCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportUncheckedCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutBudgetsInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutBudgetsInput, Prisma.ProjectUncheckedCreateWithoutBudgetsInput>;
};
export type ProjectUpsertWithoutBudgetsInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutBudgetsInput, Prisma.ProjectUncheckedUpdateWithoutBudgetsInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutBudgetsInput, Prisma.ProjectUncheckedCreateWithoutBudgetsInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutBudgetsInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutBudgetsInput, Prisma.ProjectUncheckedUpdateWithoutBudgetsInput>;
};
export type ProjectUpdateWithoutBudgetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneWithoutProjectsNestedInput;
    wbsTasks?: Prisma.WbsTaskUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutBudgetsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUncheckedUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUncheckedUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutTendersInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer?: Prisma.CustomerCreateNestedOneWithoutProjectsInput;
    wbsTasks?: Prisma.WbsTaskCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutTendersInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetUncheckedCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportUncheckedCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutTendersInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutTendersInput, Prisma.ProjectUncheckedCreateWithoutTendersInput>;
};
export type ProjectUpsertWithoutTendersInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutTendersInput, Prisma.ProjectUncheckedUpdateWithoutTendersInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutTendersInput, Prisma.ProjectUncheckedCreateWithoutTendersInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutTendersInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutTendersInput, Prisma.ProjectUncheckedUpdateWithoutTendersInput>;
};
export type ProjectUpdateWithoutTendersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneWithoutProjectsNestedInput;
    wbsTasks?: Prisma.WbsTaskUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutTendersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUncheckedUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUncheckedUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutDailyReportsInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer?: Prisma.CustomerCreateNestedOneWithoutProjectsInput;
    wbsTasks?: Prisma.WbsTaskCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutDailyReportsInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetUncheckedCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderUncheckedCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutDailyReportsInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutDailyReportsInput, Prisma.ProjectUncheckedCreateWithoutDailyReportsInput>;
};
export type ProjectUpsertWithoutDailyReportsInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutDailyReportsInput, Prisma.ProjectUncheckedUpdateWithoutDailyReportsInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutDailyReportsInput, Prisma.ProjectUncheckedCreateWithoutDailyReportsInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutDailyReportsInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutDailyReportsInput, Prisma.ProjectUncheckedUpdateWithoutDailyReportsInput>;
};
export type ProjectUpdateWithoutDailyReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneWithoutProjectsNestedInput;
    wbsTasks?: Prisma.WbsTaskUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutDailyReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUncheckedUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUncheckedUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutProgressInvoicesInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer?: Prisma.CustomerCreateNestedOneWithoutProjectsInput;
    wbsTasks?: Prisma.WbsTaskCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutProgressInvoicesInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetUncheckedCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderUncheckedCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportUncheckedCreateNestedManyWithoutProjectInput;
    commitments?: Prisma.ProjectCommitmentUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutProgressInvoicesInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProgressInvoicesInput, Prisma.ProjectUncheckedCreateWithoutProgressInvoicesInput>;
};
export type ProjectUpsertWithoutProgressInvoicesInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutProgressInvoicesInput, Prisma.ProjectUncheckedUpdateWithoutProgressInvoicesInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProgressInvoicesInput, Prisma.ProjectUncheckedCreateWithoutProgressInvoicesInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutProgressInvoicesInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutProgressInvoicesInput, Prisma.ProjectUncheckedUpdateWithoutProgressInvoicesInput>;
};
export type ProjectUpdateWithoutProgressInvoicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneWithoutProjectsNestedInput;
    wbsTasks?: Prisma.WbsTaskUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutProgressInvoicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUncheckedUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUncheckedUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUncheckedUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutCommitmentsInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customer?: Prisma.CustomerCreateNestedOneWithoutProjectsInput;
    wbsTasks?: Prisma.WbsTaskCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutCommitmentsInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    customerId?: string | null;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedCreateNestedManyWithoutProjectInput;
    budgets?: Prisma.ProjectBudgetUncheckedCreateNestedManyWithoutProjectInput;
    tenders?: Prisma.TenderUncheckedCreateNestedManyWithoutProjectInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedCreateNestedManyWithoutProjectInput;
    dailyReports?: Prisma.DailyReportUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutCommitmentsInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutCommitmentsInput, Prisma.ProjectUncheckedCreateWithoutCommitmentsInput>;
};
export type ProjectUpsertWithoutCommitmentsInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutCommitmentsInput, Prisma.ProjectUncheckedUpdateWithoutCommitmentsInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutCommitmentsInput, Prisma.ProjectUncheckedCreateWithoutCommitmentsInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutCommitmentsInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutCommitmentsInput, Prisma.ProjectUncheckedUpdateWithoutCommitmentsInput>;
};
export type ProjectUpdateWithoutCommitmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneWithoutProjectsNestedInput;
    wbsTasks?: Prisma.WbsTaskUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutCommitmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUncheckedUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUncheckedUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyCustomerInput = {
    id?: string;
    tenantId: string;
    code: string;
    name: string;
    description?: string | null;
    contractId?: string | null;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    totalBudget?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProjectUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wbsTasks?: Prisma.WbsTaskUncheckedUpdateManyWithoutProjectNestedInput;
    budgets?: Prisma.ProjectBudgetUncheckedUpdateManyWithoutProjectNestedInput;
    tenders?: Prisma.TenderUncheckedUpdateManyWithoutProjectNestedInput;
    progressInvoices?: Prisma.ProgressInvoiceUncheckedUpdateManyWithoutProjectNestedInput;
    dailyReports?: Prisma.DailyReportUncheckedUpdateManyWithoutProjectNestedInput;
    commitments?: Prisma.ProjectCommitmentUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    totalBudget?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectCountOutputType = {
    wbsTasks: number;
    budgets: number;
    tenders: number;
    progressInvoices: number;
    dailyReports: number;
    commitments: number;
};
export type ProjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wbsTasks?: boolean | ProjectCountOutputTypeCountWbsTasksArgs;
    budgets?: boolean | ProjectCountOutputTypeCountBudgetsArgs;
    tenders?: boolean | ProjectCountOutputTypeCountTendersArgs;
    progressInvoices?: boolean | ProjectCountOutputTypeCountProgressInvoicesArgs;
    dailyReports?: boolean | ProjectCountOutputTypeCountDailyReportsArgs;
    commitments?: boolean | ProjectCountOutputTypeCountCommitmentsArgs;
};
export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectCountOutputTypeSelect<ExtArgs> | null;
};
export type ProjectCountOutputTypeCountWbsTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WbsTaskWhereInput;
};
export type ProjectCountOutputTypeCountBudgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectBudgetWhereInput;
};
export type ProjectCountOutputTypeCountTendersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenderWhereInput;
};
export type ProjectCountOutputTypeCountProgressInvoicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProgressInvoiceWhereInput;
};
export type ProjectCountOutputTypeCountDailyReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DailyReportWhereInput;
};
export type ProjectCountOutputTypeCountCommitmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectCommitmentWhereInput;
};
export type ProjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    customerId?: boolean;
    description?: boolean;
    contractId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalBudget?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.Project$customerArgs<ExtArgs>;
    wbsTasks?: boolean | Prisma.Project$wbsTasksArgs<ExtArgs>;
    budgets?: boolean | Prisma.Project$budgetsArgs<ExtArgs>;
    tenders?: boolean | Prisma.Project$tendersArgs<ExtArgs>;
    progressInvoices?: boolean | Prisma.Project$progressInvoicesArgs<ExtArgs>;
    dailyReports?: boolean | Prisma.Project$dailyReportsArgs<ExtArgs>;
    commitments?: boolean | Prisma.Project$commitmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    customerId?: boolean;
    description?: boolean;
    contractId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalBudget?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.Project$customerArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    customerId?: boolean;
    description?: boolean;
    contractId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalBudget?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    customer?: boolean | Prisma.Project$customerArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    code?: boolean;
    name?: boolean;
    customerId?: boolean;
    description?: boolean;
    contractId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    totalBudget?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "code" | "name" | "customerId" | "description" | "contractId" | "startDate" | "endDate" | "totalBudget" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>;
export type ProjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.Project$customerArgs<ExtArgs>;
    wbsTasks?: boolean | Prisma.Project$wbsTasksArgs<ExtArgs>;
    budgets?: boolean | Prisma.Project$budgetsArgs<ExtArgs>;
    tenders?: boolean | Prisma.Project$tendersArgs<ExtArgs>;
    progressInvoices?: boolean | Prisma.Project$progressInvoicesArgs<ExtArgs>;
    dailyReports?: boolean | Prisma.Project$dailyReportsArgs<ExtArgs>;
    commitments?: boolean | Prisma.Project$commitmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.Project$customerArgs<ExtArgs>;
};
export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    customer?: boolean | Prisma.Project$customerArgs<ExtArgs>;
};
export type $ProjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Project";
    objects: {
        customer: Prisma.$CustomerPayload<ExtArgs> | null;
        wbsTasks: Prisma.$WbsTaskPayload<ExtArgs>[];
        budgets: Prisma.$ProjectBudgetPayload<ExtArgs>[];
        tenders: Prisma.$TenderPayload<ExtArgs>[];
        progressInvoices: Prisma.$ProgressInvoicePayload<ExtArgs>[];
        dailyReports: Prisma.$DailyReportPayload<ExtArgs>[];
        commitments: Prisma.$ProjectCommitmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        code: string;
        name: string;
        customerId: string | null;
        description: string | null;
        contractId: string | null;
        startDate: Date | null;
        endDate: Date | null;
        totalBudget: runtime.Decimal | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["project"]>;
    composites: {};
};
export type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectPayload, S>;
export type ProjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectCountAggregateInputType | true;
};
export interface ProjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Project'];
        meta: {
            name: 'Project';
        };
    };
    findUnique<T extends ProjectFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectCreateArgs>(args: Prisma.SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectDeleteArgs>(args: Prisma.SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectUpdateArgs>(args: Prisma.SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectUpsertArgs>(args: Prisma.SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectCountArgs>(args?: Prisma.Subset<T, ProjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectCountAggregateOutputType> : number>;
    aggregate<T extends ProjectAggregateArgs>(args: Prisma.Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>;
    groupBy<T extends ProjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectFieldRefs;
}
export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    customer<T extends Prisma.Project$customerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$customerArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    wbsTasks<T extends Prisma.Project$wbsTasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$wbsTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WbsTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    budgets<T extends Prisma.Project$budgetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$budgetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectBudgetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tenders<T extends Prisma.Project$tendersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$tendersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    progressInvoices<T extends Prisma.Project$progressInvoicesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$progressInvoicesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProgressInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    dailyReports<T extends Prisma.Project$dailyReportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$dailyReportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DailyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    commitments<T extends Prisma.Project$commitmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$commitmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectCommitmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectFieldRefs {
    readonly id: Prisma.FieldRef<"Project", 'String'>;
    readonly tenantId: Prisma.FieldRef<"Project", 'String'>;
    readonly code: Prisma.FieldRef<"Project", 'String'>;
    readonly name: Prisma.FieldRef<"Project", 'String'>;
    readonly customerId: Prisma.FieldRef<"Project", 'String'>;
    readonly description: Prisma.FieldRef<"Project", 'String'>;
    readonly contractId: Prisma.FieldRef<"Project", 'String'>;
    readonly startDate: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly totalBudget: Prisma.FieldRef<"Project", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Project", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Project", 'DateTime'>;
}
export type ProjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
};
export type ProjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type ProjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
    include?: Prisma.ProjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
};
export type ProjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type Project$customerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
};
export type Project$wbsTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WbsTaskSelect<ExtArgs> | null;
    omit?: Prisma.WbsTaskOmit<ExtArgs> | null;
    include?: Prisma.WbsTaskInclude<ExtArgs> | null;
    where?: Prisma.WbsTaskWhereInput;
    orderBy?: Prisma.WbsTaskOrderByWithRelationInput | Prisma.WbsTaskOrderByWithRelationInput[];
    cursor?: Prisma.WbsTaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WbsTaskScalarFieldEnum | Prisma.WbsTaskScalarFieldEnum[];
};
export type Project$budgetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectBudgetSelect<ExtArgs> | null;
    omit?: Prisma.ProjectBudgetOmit<ExtArgs> | null;
    include?: Prisma.ProjectBudgetInclude<ExtArgs> | null;
    where?: Prisma.ProjectBudgetWhereInput;
    orderBy?: Prisma.ProjectBudgetOrderByWithRelationInput | Prisma.ProjectBudgetOrderByWithRelationInput[];
    cursor?: Prisma.ProjectBudgetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectBudgetScalarFieldEnum | Prisma.ProjectBudgetScalarFieldEnum[];
};
export type Project$tendersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderSelect<ExtArgs> | null;
    omit?: Prisma.TenderOmit<ExtArgs> | null;
    include?: Prisma.TenderInclude<ExtArgs> | null;
    where?: Prisma.TenderWhereInput;
    orderBy?: Prisma.TenderOrderByWithRelationInput | Prisma.TenderOrderByWithRelationInput[];
    cursor?: Prisma.TenderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenderScalarFieldEnum | Prisma.TenderScalarFieldEnum[];
};
export type Project$progressInvoicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProgressInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.ProgressInvoiceOmit<ExtArgs> | null;
    include?: Prisma.ProgressInvoiceInclude<ExtArgs> | null;
    where?: Prisma.ProgressInvoiceWhereInput;
    orderBy?: Prisma.ProgressInvoiceOrderByWithRelationInput | Prisma.ProgressInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.ProgressInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProgressInvoiceScalarFieldEnum | Prisma.ProgressInvoiceScalarFieldEnum[];
};
export type Project$dailyReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DailyReportSelect<ExtArgs> | null;
    omit?: Prisma.DailyReportOmit<ExtArgs> | null;
    include?: Prisma.DailyReportInclude<ExtArgs> | null;
    where?: Prisma.DailyReportWhereInput;
    orderBy?: Prisma.DailyReportOrderByWithRelationInput | Prisma.DailyReportOrderByWithRelationInput[];
    cursor?: Prisma.DailyReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DailyReportScalarFieldEnum | Prisma.DailyReportScalarFieldEnum[];
};
export type Project$commitmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectCommitmentSelect<ExtArgs> | null;
    omit?: Prisma.ProjectCommitmentOmit<ExtArgs> | null;
    include?: Prisma.ProjectCommitmentInclude<ExtArgs> | null;
    where?: Prisma.ProjectCommitmentWhereInput;
    orderBy?: Prisma.ProjectCommitmentOrderByWithRelationInput | Prisma.ProjectCommitmentOrderByWithRelationInput[];
    cursor?: Prisma.ProjectCommitmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectCommitmentScalarFieldEnum | Prisma.ProjectCommitmentScalarFieldEnum[];
};
export type ProjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
};
