import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AttendanceModel = runtime.Types.Result.DefaultSelection<Prisma.$AttendancePayload>;
export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null;
    _avg: AttendanceAvgAggregateOutputType | null;
    _sum: AttendanceSumAggregateOutputType | null;
    _min: AttendanceMinAggregateOutputType | null;
    _max: AttendanceMaxAggregateOutputType | null;
};
export type AttendanceAvgAggregateOutputType = {
    workHours: runtime.Decimal | null;
};
export type AttendanceSumAggregateOutputType = {
    workHours: runtime.Decimal | null;
};
export type AttendanceMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    employeeId: string | null;
    date: Date | null;
    checkIn: Date | null;
    checkOut: Date | null;
    workHours: runtime.Decimal | null;
    status: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type AttendanceMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    employeeId: string | null;
    date: Date | null;
    checkIn: Date | null;
    checkOut: Date | null;
    workHours: runtime.Decimal | null;
    status: string | null;
    notes: string | null;
    createdAt: Date | null;
};
export type AttendanceCountAggregateOutputType = {
    id: number;
    tenantId: number;
    employeeId: number;
    date: number;
    checkIn: number;
    checkOut: number;
    workHours: number;
    status: number;
    notes: number;
    createdAt: number;
    _all: number;
};
export type AttendanceAvgAggregateInputType = {
    workHours?: true;
};
export type AttendanceSumAggregateInputType = {
    workHours?: true;
};
export type AttendanceMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    employeeId?: true;
    date?: true;
    checkIn?: true;
    checkOut?: true;
    workHours?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
};
export type AttendanceMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    employeeId?: true;
    date?: true;
    checkIn?: true;
    checkOut?: true;
    workHours?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
};
export type AttendanceCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    employeeId?: true;
    date?: true;
    checkIn?: true;
    checkOut?: true;
    workHours?: true;
    status?: true;
    notes?: true;
    createdAt?: true;
    _all?: true;
};
export type AttendanceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceWhereInput;
    orderBy?: Prisma.AttendanceOrderByWithRelationInput | Prisma.AttendanceOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AttendanceCountAggregateInputType;
    _avg?: AttendanceAvgAggregateInputType;
    _sum?: AttendanceSumAggregateInputType;
    _min?: AttendanceMinAggregateInputType;
    _max?: AttendanceMaxAggregateInputType;
};
export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
    [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAttendance[P]> : Prisma.GetScalarType<T[P], AggregateAttendance[P]>;
};
export type AttendanceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceWhereInput;
    orderBy?: Prisma.AttendanceOrderByWithAggregationInput | Prisma.AttendanceOrderByWithAggregationInput[];
    by: Prisma.AttendanceScalarFieldEnum[] | Prisma.AttendanceScalarFieldEnum;
    having?: Prisma.AttendanceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttendanceCountAggregateInputType | true;
    _avg?: AttendanceAvgAggregateInputType;
    _sum?: AttendanceSumAggregateInputType;
    _min?: AttendanceMinAggregateInputType;
    _max?: AttendanceMaxAggregateInputType;
};
export type AttendanceGroupByOutputType = {
    id: string;
    tenantId: string;
    employeeId: string;
    date: Date;
    checkIn: Date | null;
    checkOut: Date | null;
    workHours: runtime.Decimal | null;
    status: string;
    notes: string | null;
    createdAt: Date;
    _count: AttendanceCountAggregateOutputType | null;
    _avg: AttendanceAvgAggregateOutputType | null;
    _sum: AttendanceSumAggregateOutputType | null;
    _min: AttendanceMinAggregateOutputType | null;
    _max: AttendanceMaxAggregateOutputType | null;
};
export type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AttendanceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AttendanceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AttendanceGroupByOutputType[P]>;
}>>;
export type AttendanceWhereInput = {
    AND?: Prisma.AttendanceWhereInput | Prisma.AttendanceWhereInput[];
    OR?: Prisma.AttendanceWhereInput[];
    NOT?: Prisma.AttendanceWhereInput | Prisma.AttendanceWhereInput[];
    id?: Prisma.StringFilter<"Attendance"> | string;
    tenantId?: Prisma.StringFilter<"Attendance"> | string;
    employeeId?: Prisma.StringFilter<"Attendance"> | string;
    date?: Prisma.DateTimeFilter<"Attendance"> | Date | string;
    checkIn?: Prisma.DateTimeNullableFilter<"Attendance"> | Date | string | null;
    checkOut?: Prisma.DateTimeNullableFilter<"Attendance"> | Date | string | null;
    workHours?: Prisma.DecimalNullableFilter<"Attendance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"Attendance"> | string;
    notes?: Prisma.StringNullableFilter<"Attendance"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Attendance"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    employee?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
};
export type AttendanceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    checkIn?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOut?: Prisma.SortOrderInput | Prisma.SortOrder;
    workHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
    employee?: Prisma.EmployeeOrderByWithRelationInput;
};
export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_employeeId_date?: Prisma.AttendanceTenantIdEmployeeIdDateCompoundUniqueInput;
    AND?: Prisma.AttendanceWhereInput | Prisma.AttendanceWhereInput[];
    OR?: Prisma.AttendanceWhereInput[];
    NOT?: Prisma.AttendanceWhereInput | Prisma.AttendanceWhereInput[];
    tenantId?: Prisma.StringFilter<"Attendance"> | string;
    employeeId?: Prisma.StringFilter<"Attendance"> | string;
    date?: Prisma.DateTimeFilter<"Attendance"> | Date | string;
    checkIn?: Prisma.DateTimeNullableFilter<"Attendance"> | Date | string | null;
    checkOut?: Prisma.DateTimeNullableFilter<"Attendance"> | Date | string | null;
    workHours?: Prisma.DecimalNullableFilter<"Attendance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"Attendance"> | string;
    notes?: Prisma.StringNullableFilter<"Attendance"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Attendance"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
    employee?: Prisma.XOR<Prisma.EmployeeScalarRelationFilter, Prisma.EmployeeWhereInput>;
}, "id" | "tenantId_employeeId_date">;
export type AttendanceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    checkIn?: Prisma.SortOrderInput | Prisma.SortOrder;
    checkOut?: Prisma.SortOrderInput | Prisma.SortOrder;
    workHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AttendanceCountOrderByAggregateInput;
    _avg?: Prisma.AttendanceAvgOrderByAggregateInput;
    _max?: Prisma.AttendanceMaxOrderByAggregateInput;
    _min?: Prisma.AttendanceMinOrderByAggregateInput;
    _sum?: Prisma.AttendanceSumOrderByAggregateInput;
};
export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: Prisma.AttendanceScalarWhereWithAggregatesInput | Prisma.AttendanceScalarWhereWithAggregatesInput[];
    OR?: Prisma.AttendanceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AttendanceScalarWhereWithAggregatesInput | Prisma.AttendanceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Attendance"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"Attendance"> | string;
    employeeId?: Prisma.StringWithAggregatesFilter<"Attendance"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"Attendance"> | Date | string;
    checkIn?: Prisma.DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null;
    checkOut?: Prisma.DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null;
    workHours?: Prisma.DecimalNullableWithAggregatesFilter<"Attendance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringWithAggregatesFilter<"Attendance"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Attendance"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Attendance"> | Date | string;
};
export type AttendanceCreateInput = {
    id?: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutAttendancesInput;
    employee: Prisma.EmployeeCreateNestedOneWithoutAttendancesInput;
};
export type AttendanceUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    employeeId: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type AttendanceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutAttendancesNestedInput;
    employee?: Prisma.EmployeeUpdateOneRequiredWithoutAttendancesNestedInput;
};
export type AttendanceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendanceCreateManyInput = {
    id?: string;
    tenantId: string;
    employeeId: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type AttendanceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendanceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendanceListRelationFilter = {
    every?: Prisma.AttendanceWhereInput;
    some?: Prisma.AttendanceWhereInput;
    none?: Prisma.AttendanceWhereInput;
};
export type AttendanceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AttendanceTenantIdEmployeeIdDateCompoundUniqueInput = {
    tenantId: string;
    employeeId: string;
    date: Date | string;
};
export type AttendanceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    checkIn?: Prisma.SortOrder;
    checkOut?: Prisma.SortOrder;
    workHours?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttendanceAvgOrderByAggregateInput = {
    workHours?: Prisma.SortOrder;
};
export type AttendanceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    checkIn?: Prisma.SortOrder;
    checkOut?: Prisma.SortOrder;
    workHours?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttendanceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    employeeId?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    checkIn?: Prisma.SortOrder;
    checkOut?: Prisma.SortOrder;
    workHours?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttendanceSumOrderByAggregateInput = {
    workHours?: Prisma.SortOrder;
};
export type AttendanceCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutTenantInput, Prisma.AttendanceUncheckedCreateWithoutTenantInput> | Prisma.AttendanceCreateWithoutTenantInput[] | Prisma.AttendanceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutTenantInput | Prisma.AttendanceCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.AttendanceCreateManyTenantInputEnvelope;
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
};
export type AttendanceUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutTenantInput, Prisma.AttendanceUncheckedCreateWithoutTenantInput> | Prisma.AttendanceCreateWithoutTenantInput[] | Prisma.AttendanceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutTenantInput | Prisma.AttendanceCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.AttendanceCreateManyTenantInputEnvelope;
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
};
export type AttendanceUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutTenantInput, Prisma.AttendanceUncheckedCreateWithoutTenantInput> | Prisma.AttendanceCreateWithoutTenantInput[] | Prisma.AttendanceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutTenantInput | Prisma.AttendanceCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.AttendanceUpsertWithWhereUniqueWithoutTenantInput | Prisma.AttendanceUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.AttendanceCreateManyTenantInputEnvelope;
    set?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    disconnect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    delete?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    update?: Prisma.AttendanceUpdateWithWhereUniqueWithoutTenantInput | Prisma.AttendanceUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.AttendanceUpdateManyWithWhereWithoutTenantInput | Prisma.AttendanceUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.AttendanceScalarWhereInput | Prisma.AttendanceScalarWhereInput[];
};
export type AttendanceUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutTenantInput, Prisma.AttendanceUncheckedCreateWithoutTenantInput> | Prisma.AttendanceCreateWithoutTenantInput[] | Prisma.AttendanceUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutTenantInput | Prisma.AttendanceCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.AttendanceUpsertWithWhereUniqueWithoutTenantInput | Prisma.AttendanceUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.AttendanceCreateManyTenantInputEnvelope;
    set?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    disconnect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    delete?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    update?: Prisma.AttendanceUpdateWithWhereUniqueWithoutTenantInput | Prisma.AttendanceUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.AttendanceUpdateManyWithWhereWithoutTenantInput | Prisma.AttendanceUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.AttendanceScalarWhereInput | Prisma.AttendanceScalarWhereInput[];
};
export type AttendanceCreateNestedManyWithoutEmployeeInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutEmployeeInput, Prisma.AttendanceUncheckedCreateWithoutEmployeeInput> | Prisma.AttendanceCreateWithoutEmployeeInput[] | Prisma.AttendanceUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutEmployeeInput | Prisma.AttendanceCreateOrConnectWithoutEmployeeInput[];
    createMany?: Prisma.AttendanceCreateManyEmployeeInputEnvelope;
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
};
export type AttendanceUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutEmployeeInput, Prisma.AttendanceUncheckedCreateWithoutEmployeeInput> | Prisma.AttendanceCreateWithoutEmployeeInput[] | Prisma.AttendanceUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutEmployeeInput | Prisma.AttendanceCreateOrConnectWithoutEmployeeInput[];
    createMany?: Prisma.AttendanceCreateManyEmployeeInputEnvelope;
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
};
export type AttendanceUpdateManyWithoutEmployeeNestedInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutEmployeeInput, Prisma.AttendanceUncheckedCreateWithoutEmployeeInput> | Prisma.AttendanceCreateWithoutEmployeeInput[] | Prisma.AttendanceUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutEmployeeInput | Prisma.AttendanceCreateOrConnectWithoutEmployeeInput[];
    upsert?: Prisma.AttendanceUpsertWithWhereUniqueWithoutEmployeeInput | Prisma.AttendanceUpsertWithWhereUniqueWithoutEmployeeInput[];
    createMany?: Prisma.AttendanceCreateManyEmployeeInputEnvelope;
    set?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    disconnect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    delete?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    update?: Prisma.AttendanceUpdateWithWhereUniqueWithoutEmployeeInput | Prisma.AttendanceUpdateWithWhereUniqueWithoutEmployeeInput[];
    updateMany?: Prisma.AttendanceUpdateManyWithWhereWithoutEmployeeInput | Prisma.AttendanceUpdateManyWithWhereWithoutEmployeeInput[];
    deleteMany?: Prisma.AttendanceScalarWhereInput | Prisma.AttendanceScalarWhereInput[];
};
export type AttendanceUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: Prisma.XOR<Prisma.AttendanceCreateWithoutEmployeeInput, Prisma.AttendanceUncheckedCreateWithoutEmployeeInput> | Prisma.AttendanceCreateWithoutEmployeeInput[] | Prisma.AttendanceUncheckedCreateWithoutEmployeeInput[];
    connectOrCreate?: Prisma.AttendanceCreateOrConnectWithoutEmployeeInput | Prisma.AttendanceCreateOrConnectWithoutEmployeeInput[];
    upsert?: Prisma.AttendanceUpsertWithWhereUniqueWithoutEmployeeInput | Prisma.AttendanceUpsertWithWhereUniqueWithoutEmployeeInput[];
    createMany?: Prisma.AttendanceCreateManyEmployeeInputEnvelope;
    set?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    disconnect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    delete?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    connect?: Prisma.AttendanceWhereUniqueInput | Prisma.AttendanceWhereUniqueInput[];
    update?: Prisma.AttendanceUpdateWithWhereUniqueWithoutEmployeeInput | Prisma.AttendanceUpdateWithWhereUniqueWithoutEmployeeInput[];
    updateMany?: Prisma.AttendanceUpdateManyWithWhereWithoutEmployeeInput | Prisma.AttendanceUpdateManyWithWhereWithoutEmployeeInput[];
    deleteMany?: Prisma.AttendanceScalarWhereInput | Prisma.AttendanceScalarWhereInput[];
};
export type AttendanceCreateWithoutTenantInput = {
    id?: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
    employee: Prisma.EmployeeCreateNestedOneWithoutAttendancesInput;
};
export type AttendanceUncheckedCreateWithoutTenantInput = {
    id?: string;
    employeeId: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type AttendanceCreateOrConnectWithoutTenantInput = {
    where: Prisma.AttendanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttendanceCreateWithoutTenantInput, Prisma.AttendanceUncheckedCreateWithoutTenantInput>;
};
export type AttendanceCreateManyTenantInputEnvelope = {
    data: Prisma.AttendanceCreateManyTenantInput | Prisma.AttendanceCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type AttendanceUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.AttendanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttendanceUpdateWithoutTenantInput, Prisma.AttendanceUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.AttendanceCreateWithoutTenantInput, Prisma.AttendanceUncheckedCreateWithoutTenantInput>;
};
export type AttendanceUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.AttendanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttendanceUpdateWithoutTenantInput, Prisma.AttendanceUncheckedUpdateWithoutTenantInput>;
};
export type AttendanceUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.AttendanceScalarWhereInput;
    data: Prisma.XOR<Prisma.AttendanceUpdateManyMutationInput, Prisma.AttendanceUncheckedUpdateManyWithoutTenantInput>;
};
export type AttendanceScalarWhereInput = {
    AND?: Prisma.AttendanceScalarWhereInput | Prisma.AttendanceScalarWhereInput[];
    OR?: Prisma.AttendanceScalarWhereInput[];
    NOT?: Prisma.AttendanceScalarWhereInput | Prisma.AttendanceScalarWhereInput[];
    id?: Prisma.StringFilter<"Attendance"> | string;
    tenantId?: Prisma.StringFilter<"Attendance"> | string;
    employeeId?: Prisma.StringFilter<"Attendance"> | string;
    date?: Prisma.DateTimeFilter<"Attendance"> | Date | string;
    checkIn?: Prisma.DateTimeNullableFilter<"Attendance"> | Date | string | null;
    checkOut?: Prisma.DateTimeNullableFilter<"Attendance"> | Date | string | null;
    workHours?: Prisma.DecimalNullableFilter<"Attendance"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFilter<"Attendance"> | string;
    notes?: Prisma.StringNullableFilter<"Attendance"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Attendance"> | Date | string;
};
export type AttendanceCreateWithoutEmployeeInput = {
    id?: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutAttendancesInput;
};
export type AttendanceUncheckedCreateWithoutEmployeeInput = {
    id?: string;
    tenantId: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type AttendanceCreateOrConnectWithoutEmployeeInput = {
    where: Prisma.AttendanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttendanceCreateWithoutEmployeeInput, Prisma.AttendanceUncheckedCreateWithoutEmployeeInput>;
};
export type AttendanceCreateManyEmployeeInputEnvelope = {
    data: Prisma.AttendanceCreateManyEmployeeInput | Prisma.AttendanceCreateManyEmployeeInput[];
    skipDuplicates?: boolean;
};
export type AttendanceUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: Prisma.AttendanceWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttendanceUpdateWithoutEmployeeInput, Prisma.AttendanceUncheckedUpdateWithoutEmployeeInput>;
    create: Prisma.XOR<Prisma.AttendanceCreateWithoutEmployeeInput, Prisma.AttendanceUncheckedCreateWithoutEmployeeInput>;
};
export type AttendanceUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: Prisma.AttendanceWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttendanceUpdateWithoutEmployeeInput, Prisma.AttendanceUncheckedUpdateWithoutEmployeeInput>;
};
export type AttendanceUpdateManyWithWhereWithoutEmployeeInput = {
    where: Prisma.AttendanceScalarWhereInput;
    data: Prisma.XOR<Prisma.AttendanceUpdateManyMutationInput, Prisma.AttendanceUncheckedUpdateManyWithoutEmployeeInput>;
};
export type AttendanceCreateManyTenantInput = {
    id?: string;
    employeeId: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type AttendanceUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    employee?: Prisma.EmployeeUpdateOneRequiredWithoutAttendancesNestedInput;
};
export type AttendanceUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendanceUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    employeeId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendanceCreateManyEmployeeInput = {
    id?: string;
    tenantId: string;
    date: Date | string;
    checkIn?: Date | string | null;
    checkOut?: Date | string | null;
    workHours?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: string;
    notes?: string | null;
    createdAt?: Date | string;
};
export type AttendanceUpdateWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutAttendancesNestedInput;
};
export type AttendanceUncheckedUpdateWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendanceUncheckedUpdateManyWithoutEmployeeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    checkIn?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    checkOut?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workHours?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendanceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    date?: boolean;
    checkIn?: boolean;
    checkOut?: boolean;
    workHours?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attendance"]>;
export type AttendanceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    date?: boolean;
    checkIn?: boolean;
    checkOut?: boolean;
    workHours?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attendance"]>;
export type AttendanceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    date?: boolean;
    checkIn?: boolean;
    checkOut?: boolean;
    workHours?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attendance"]>;
export type AttendanceSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    employeeId?: boolean;
    date?: boolean;
    checkIn?: boolean;
    checkOut?: boolean;
    workHours?: boolean;
    status?: boolean;
    notes?: boolean;
    createdAt?: boolean;
};
export type AttendanceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "employeeId" | "date" | "checkIn" | "checkOut" | "workHours" | "status" | "notes" | "createdAt", ExtArgs["result"]["attendance"]>;
export type AttendanceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type AttendanceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type AttendanceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
    employee?: boolean | Prisma.EmployeeDefaultArgs<ExtArgs>;
};
export type $AttendancePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Attendance";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
        employee: Prisma.$EmployeePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        employeeId: string;
        date: Date;
        checkIn: Date | null;
        checkOut: Date | null;
        workHours: runtime.Decimal | null;
        status: string;
        notes: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["attendance"]>;
    composites: {};
};
export type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AttendancePayload, S>;
export type AttendanceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AttendanceCountAggregateInputType | true;
};
export interface AttendanceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Attendance'];
        meta: {
            name: 'Attendance';
        };
    };
    findUnique<T extends AttendanceFindUniqueArgs>(args: Prisma.SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AttendanceFindFirstArgs>(args?: Prisma.SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AttendanceFindManyArgs>(args?: Prisma.SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AttendanceCreateArgs>(args: Prisma.SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AttendanceCreateManyArgs>(args?: Prisma.SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AttendanceDeleteArgs>(args: Prisma.SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AttendanceUpdateArgs>(args: Prisma.SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: Prisma.SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AttendanceUpdateManyArgs>(args: Prisma.SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AttendanceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AttendanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AttendanceUpsertArgs>(args: Prisma.SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma.Prisma__AttendanceClient<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AttendanceCountArgs>(args?: Prisma.Subset<T, AttendanceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AttendanceCountAggregateOutputType> : number>;
    aggregate<T extends AttendanceAggregateArgs>(args: Prisma.Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>;
    groupBy<T extends AttendanceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AttendanceGroupByArgs['orderBy'];
    } : {
        orderBy?: AttendanceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AttendanceFieldRefs;
}
export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    employee<T extends Prisma.EmployeeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EmployeeDefaultArgs<ExtArgs>>): Prisma.Prisma__EmployeeClient<runtime.Types.Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AttendanceFieldRefs {
    readonly id: Prisma.FieldRef<"Attendance", 'String'>;
    readonly tenantId: Prisma.FieldRef<"Attendance", 'String'>;
    readonly employeeId: Prisma.FieldRef<"Attendance", 'String'>;
    readonly date: Prisma.FieldRef<"Attendance", 'DateTime'>;
    readonly checkIn: Prisma.FieldRef<"Attendance", 'DateTime'>;
    readonly checkOut: Prisma.FieldRef<"Attendance", 'DateTime'>;
    readonly workHours: Prisma.FieldRef<"Attendance", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Attendance", 'String'>;
    readonly notes: Prisma.FieldRef<"Attendance", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Attendance", 'DateTime'>;
}
export type AttendanceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where: Prisma.AttendanceWhereUniqueInput;
};
export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where: Prisma.AttendanceWhereUniqueInput;
};
export type AttendanceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where?: Prisma.AttendanceWhereInput;
    orderBy?: Prisma.AttendanceOrderByWithRelationInput | Prisma.AttendanceOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendanceScalarFieldEnum | Prisma.AttendanceScalarFieldEnum[];
};
export type AttendanceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where?: Prisma.AttendanceWhereInput;
    orderBy?: Prisma.AttendanceOrderByWithRelationInput | Prisma.AttendanceOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendanceScalarFieldEnum | Prisma.AttendanceScalarFieldEnum[];
};
export type AttendanceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where?: Prisma.AttendanceWhereInput;
    orderBy?: Prisma.AttendanceOrderByWithRelationInput | Prisma.AttendanceOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendanceScalarFieldEnum | Prisma.AttendanceScalarFieldEnum[];
};
export type AttendanceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttendanceCreateInput, Prisma.AttendanceUncheckedCreateInput>;
};
export type AttendanceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AttendanceCreateManyInput | Prisma.AttendanceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AttendanceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    data: Prisma.AttendanceCreateManyInput | Prisma.AttendanceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AttendanceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AttendanceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttendanceUpdateInput, Prisma.AttendanceUncheckedUpdateInput>;
    where: Prisma.AttendanceWhereUniqueInput;
};
export type AttendanceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AttendanceUpdateManyMutationInput, Prisma.AttendanceUncheckedUpdateManyInput>;
    where?: Prisma.AttendanceWhereInput;
    limit?: number;
};
export type AttendanceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttendanceUpdateManyMutationInput, Prisma.AttendanceUncheckedUpdateManyInput>;
    where?: Prisma.AttendanceWhereInput;
    limit?: number;
    include?: Prisma.AttendanceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AttendanceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where: Prisma.AttendanceWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttendanceCreateInput, Prisma.AttendanceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AttendanceUpdateInput, Prisma.AttendanceUncheckedUpdateInput>;
};
export type AttendanceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where: Prisma.AttendanceWhereUniqueInput;
};
export type AttendanceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceWhereInput;
    limit?: number;
};
export type AttendanceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
};
