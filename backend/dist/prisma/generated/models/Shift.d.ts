import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ShiftModel = runtime.Types.Result.DefaultSelection<Prisma.$ShiftPayload>;
export type AggregateShift = {
    _count: ShiftCountAggregateOutputType | null;
    _min: ShiftMinAggregateOutputType | null;
    _max: ShiftMaxAggregateOutputType | null;
};
export type ShiftMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    code: string | null;
    startTime: string | null;
    endTime: string | null;
    isFlexi: boolean | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type ShiftMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    name: string | null;
    code: string | null;
    startTime: string | null;
    endTime: string | null;
    isFlexi: boolean | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type ShiftCountAggregateOutputType = {
    id: number;
    tenantId: number;
    name: number;
    code: number;
    startTime: number;
    endTime: number;
    isFlexi: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type ShiftMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    code?: true;
    startTime?: true;
    endTime?: true;
    isFlexi?: true;
    isActive?: true;
    createdAt?: true;
};
export type ShiftMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    code?: true;
    startTime?: true;
    endTime?: true;
    isFlexi?: true;
    isActive?: true;
    createdAt?: true;
};
export type ShiftCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    name?: true;
    code?: true;
    startTime?: true;
    endTime?: true;
    isFlexi?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type ShiftAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    cursor?: Prisma.ShiftWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShiftCountAggregateInputType;
    _min?: ShiftMinAggregateInputType;
    _max?: ShiftMaxAggregateInputType;
};
export type GetShiftAggregateType<T extends ShiftAggregateArgs> = {
    [P in keyof T & keyof AggregateShift]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShift[P]> : Prisma.GetScalarType<T[P], AggregateShift[P]>;
};
export type ShiftGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithAggregationInput | Prisma.ShiftOrderByWithAggregationInput[];
    by: Prisma.ShiftScalarFieldEnum[] | Prisma.ShiftScalarFieldEnum;
    having?: Prisma.ShiftScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShiftCountAggregateInputType | true;
    _min?: ShiftMinAggregateInputType;
    _max?: ShiftMaxAggregateInputType;
};
export type ShiftGroupByOutputType = {
    id: string;
    tenantId: string;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    isFlexi: boolean;
    isActive: boolean;
    createdAt: Date;
    _count: ShiftCountAggregateOutputType | null;
    _min: ShiftMinAggregateOutputType | null;
    _max: ShiftMaxAggregateOutputType | null;
};
export type GetShiftGroupByPayload<T extends ShiftGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShiftGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShiftGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShiftGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShiftGroupByOutputType[P]>;
}>>;
export type ShiftWhereInput = {
    AND?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    OR?: Prisma.ShiftWhereInput[];
    NOT?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    id?: Prisma.StringFilter<"Shift"> | string;
    tenantId?: Prisma.StringFilter<"Shift"> | string;
    name?: Prisma.StringFilter<"Shift"> | string;
    code?: Prisma.StringFilter<"Shift"> | string;
    startTime?: Prisma.StringFilter<"Shift"> | string;
    endTime?: Prisma.StringFilter<"Shift"> | string;
    isFlexi?: Prisma.BoolFilter<"Shift"> | boolean;
    isActive?: Prisma.BoolFilter<"Shift"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
};
export type ShiftOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    isFlexi?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tenant?: Prisma.TenantOrderByWithRelationInput;
};
export type ShiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tenantId_code?: Prisma.ShiftTenantIdCodeCompoundUniqueInput;
    AND?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    OR?: Prisma.ShiftWhereInput[];
    NOT?: Prisma.ShiftWhereInput | Prisma.ShiftWhereInput[];
    tenantId?: Prisma.StringFilter<"Shift"> | string;
    name?: Prisma.StringFilter<"Shift"> | string;
    code?: Prisma.StringFilter<"Shift"> | string;
    startTime?: Prisma.StringFilter<"Shift"> | string;
    endTime?: Prisma.StringFilter<"Shift"> | string;
    isFlexi?: Prisma.BoolFilter<"Shift"> | boolean;
    isActive?: Prisma.BoolFilter<"Shift"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Shift"> | Date | string;
    tenant?: Prisma.XOR<Prisma.TenantScalarRelationFilter, Prisma.TenantWhereInput>;
}, "id" | "tenantId_code">;
export type ShiftOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    isFlexi?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShiftCountOrderByAggregateInput;
    _max?: Prisma.ShiftMaxOrderByAggregateInput;
    _min?: Prisma.ShiftMinOrderByAggregateInput;
};
export type ShiftScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShiftScalarWhereWithAggregatesInput | Prisma.ShiftScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShiftScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShiftScalarWhereWithAggregatesInput | Prisma.ShiftScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Shift"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"Shift"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Shift"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Shift"> | string;
    startTime?: Prisma.StringWithAggregatesFilter<"Shift"> | string;
    endTime?: Prisma.StringWithAggregatesFilter<"Shift"> | string;
    isFlexi?: Prisma.BoolWithAggregatesFilter<"Shift"> | boolean;
    isActive?: Prisma.BoolWithAggregatesFilter<"Shift"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Shift"> | Date | string;
};
export type ShiftCreateInput = {
    id?: string;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: Date | string;
    tenant: Prisma.TenantCreateNestedOneWithoutShiftsInput;
};
export type ShiftUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShiftUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    isFlexi?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tenant?: Prisma.TenantUpdateOneRequiredWithoutShiftsNestedInput;
};
export type ShiftUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    isFlexi?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShiftCreateManyInput = {
    id?: string;
    tenantId: string;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShiftUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    isFlexi?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShiftUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    isFlexi?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShiftListRelationFilter = {
    every?: Prisma.ShiftWhereInput;
    some?: Prisma.ShiftWhereInput;
    none?: Prisma.ShiftWhereInput;
};
export type ShiftOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShiftTenantIdCodeCompoundUniqueInput = {
    tenantId: string;
    code: string;
};
export type ShiftCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    isFlexi?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShiftMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    isFlexi?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShiftMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    isFlexi?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShiftCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutTenantInput, Prisma.ShiftUncheckedCreateWithoutTenantInput> | Prisma.ShiftCreateWithoutTenantInput[] | Prisma.ShiftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutTenantInput | Prisma.ShiftCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.ShiftCreateManyTenantInputEnvelope;
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
};
export type ShiftUncheckedCreateNestedManyWithoutTenantInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutTenantInput, Prisma.ShiftUncheckedCreateWithoutTenantInput> | Prisma.ShiftCreateWithoutTenantInput[] | Prisma.ShiftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutTenantInput | Prisma.ShiftCreateOrConnectWithoutTenantInput[];
    createMany?: Prisma.ShiftCreateManyTenantInputEnvelope;
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
};
export type ShiftUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutTenantInput, Prisma.ShiftUncheckedCreateWithoutTenantInput> | Prisma.ShiftCreateWithoutTenantInput[] | Prisma.ShiftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutTenantInput | Prisma.ShiftCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.ShiftUpsertWithWhereUniqueWithoutTenantInput | Prisma.ShiftUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.ShiftCreateManyTenantInputEnvelope;
    set?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    disconnect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    delete?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    update?: Prisma.ShiftUpdateWithWhereUniqueWithoutTenantInput | Prisma.ShiftUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.ShiftUpdateManyWithWhereWithoutTenantInput | Prisma.ShiftUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
};
export type ShiftUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: Prisma.XOR<Prisma.ShiftCreateWithoutTenantInput, Prisma.ShiftUncheckedCreateWithoutTenantInput> | Prisma.ShiftCreateWithoutTenantInput[] | Prisma.ShiftUncheckedCreateWithoutTenantInput[];
    connectOrCreate?: Prisma.ShiftCreateOrConnectWithoutTenantInput | Prisma.ShiftCreateOrConnectWithoutTenantInput[];
    upsert?: Prisma.ShiftUpsertWithWhereUniqueWithoutTenantInput | Prisma.ShiftUpsertWithWhereUniqueWithoutTenantInput[];
    createMany?: Prisma.ShiftCreateManyTenantInputEnvelope;
    set?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    disconnect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    delete?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    connect?: Prisma.ShiftWhereUniqueInput | Prisma.ShiftWhereUniqueInput[];
    update?: Prisma.ShiftUpdateWithWhereUniqueWithoutTenantInput | Prisma.ShiftUpdateWithWhereUniqueWithoutTenantInput[];
    updateMany?: Prisma.ShiftUpdateManyWithWhereWithoutTenantInput | Prisma.ShiftUpdateManyWithWhereWithoutTenantInput[];
    deleteMany?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
};
export type ShiftCreateWithoutTenantInput = {
    id?: string;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShiftUncheckedCreateWithoutTenantInput = {
    id?: string;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShiftCreateOrConnectWithoutTenantInput = {
    where: Prisma.ShiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutTenantInput, Prisma.ShiftUncheckedCreateWithoutTenantInput>;
};
export type ShiftCreateManyTenantInputEnvelope = {
    data: Prisma.ShiftCreateManyTenantInput | Prisma.ShiftCreateManyTenantInput[];
    skipDuplicates?: boolean;
};
export type ShiftUpsertWithWhereUniqueWithoutTenantInput = {
    where: Prisma.ShiftWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShiftUpdateWithoutTenantInput, Prisma.ShiftUncheckedUpdateWithoutTenantInput>;
    create: Prisma.XOR<Prisma.ShiftCreateWithoutTenantInput, Prisma.ShiftUncheckedCreateWithoutTenantInput>;
};
export type ShiftUpdateWithWhereUniqueWithoutTenantInput = {
    where: Prisma.ShiftWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShiftUpdateWithoutTenantInput, Prisma.ShiftUncheckedUpdateWithoutTenantInput>;
};
export type ShiftUpdateManyWithWhereWithoutTenantInput = {
    where: Prisma.ShiftScalarWhereInput;
    data: Prisma.XOR<Prisma.ShiftUpdateManyMutationInput, Prisma.ShiftUncheckedUpdateManyWithoutTenantInput>;
};
export type ShiftScalarWhereInput = {
    AND?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
    OR?: Prisma.ShiftScalarWhereInput[];
    NOT?: Prisma.ShiftScalarWhereInput | Prisma.ShiftScalarWhereInput[];
    id?: Prisma.StringFilter<"Shift"> | string;
    tenantId?: Prisma.StringFilter<"Shift"> | string;
    name?: Prisma.StringFilter<"Shift"> | string;
    code?: Prisma.StringFilter<"Shift"> | string;
    startTime?: Prisma.StringFilter<"Shift"> | string;
    endTime?: Prisma.StringFilter<"Shift"> | string;
    isFlexi?: Prisma.BoolFilter<"Shift"> | boolean;
    isActive?: Prisma.BoolFilter<"Shift"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Shift"> | Date | string;
};
export type ShiftCreateManyTenantInput = {
    id?: string;
    name: string;
    code: string;
    startTime: string;
    endTime: string;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShiftUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    isFlexi?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShiftUncheckedUpdateWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    isFlexi?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShiftUncheckedUpdateManyWithoutTenantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    isFlexi?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShiftSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    code?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shift"]>;
export type ShiftSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    code?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shift"]>;
export type ShiftSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    code?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shift"]>;
export type ShiftSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    name?: boolean;
    code?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    isFlexi?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type ShiftOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "name" | "code" | "startTime" | "endTime" | "isFlexi" | "isActive" | "createdAt", ExtArgs["result"]["shift"]>;
export type ShiftInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type ShiftIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type ShiftIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tenant?: boolean | Prisma.TenantDefaultArgs<ExtArgs>;
};
export type $ShiftPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Shift";
    objects: {
        tenant: Prisma.$TenantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        name: string;
        code: string;
        startTime: string;
        endTime: string;
        isFlexi: boolean;
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["shift"]>;
    composites: {};
};
export type ShiftGetPayload<S extends boolean | null | undefined | ShiftDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShiftPayload, S>;
export type ShiftCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShiftCountAggregateInputType | true;
};
export interface ShiftDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Shift'];
        meta: {
            name: 'Shift';
        };
    };
    findUnique<T extends ShiftFindUniqueArgs>(args: Prisma.SelectSubset<T, ShiftFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShiftFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShiftFindFirstArgs>(args?: Prisma.SelectSubset<T, ShiftFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShiftFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShiftFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShiftFindManyArgs>(args?: Prisma.SelectSubset<T, ShiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShiftCreateArgs>(args: Prisma.SelectSubset<T, ShiftCreateArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShiftCreateManyArgs>(args?: Prisma.SelectSubset<T, ShiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShiftCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShiftDeleteArgs>(args: Prisma.SelectSubset<T, ShiftDeleteArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShiftUpdateArgs>(args: Prisma.SelectSubset<T, ShiftUpdateArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShiftDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShiftUpdateManyArgs>(args: Prisma.SelectSubset<T, ShiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShiftUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShiftUpsertArgs>(args: Prisma.SelectSubset<T, ShiftUpsertArgs<ExtArgs>>): Prisma.Prisma__ShiftClient<runtime.Types.Result.GetResult<Prisma.$ShiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShiftCountArgs>(args?: Prisma.Subset<T, ShiftCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShiftCountAggregateOutputType> : number>;
    aggregate<T extends ShiftAggregateArgs>(args: Prisma.Subset<T, ShiftAggregateArgs>): Prisma.PrismaPromise<GetShiftAggregateType<T>>;
    groupBy<T extends ShiftGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShiftGroupByArgs['orderBy'];
    } : {
        orderBy?: ShiftGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShiftFieldRefs;
}
export interface Prisma__ShiftClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tenant<T extends Prisma.TenantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenantDefaultArgs<ExtArgs>>): Prisma.Prisma__TenantClient<runtime.Types.Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShiftFieldRefs {
    readonly id: Prisma.FieldRef<"Shift", 'String'>;
    readonly tenantId: Prisma.FieldRef<"Shift", 'String'>;
    readonly name: Prisma.FieldRef<"Shift", 'String'>;
    readonly code: Prisma.FieldRef<"Shift", 'String'>;
    readonly startTime: Prisma.FieldRef<"Shift", 'String'>;
    readonly endTime: Prisma.FieldRef<"Shift", 'String'>;
    readonly isFlexi: Prisma.FieldRef<"Shift", 'Boolean'>;
    readonly isActive: Prisma.FieldRef<"Shift", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Shift", 'DateTime'>;
}
export type ShiftFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    where: Prisma.ShiftWhereUniqueInput;
};
export type ShiftFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    where: Prisma.ShiftWhereUniqueInput;
};
export type ShiftFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    cursor?: Prisma.ShiftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShiftScalarFieldEnum | Prisma.ShiftScalarFieldEnum[];
};
export type ShiftFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    cursor?: Prisma.ShiftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShiftScalarFieldEnum | Prisma.ShiftScalarFieldEnum[];
};
export type ShiftFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithRelationInput | Prisma.ShiftOrderByWithRelationInput[];
    cursor?: Prisma.ShiftWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShiftScalarFieldEnum | Prisma.ShiftScalarFieldEnum[];
};
export type ShiftCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShiftCreateInput, Prisma.ShiftUncheckedCreateInput>;
};
export type ShiftCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShiftCreateManyInput | Prisma.ShiftCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShiftCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    data: Prisma.ShiftCreateManyInput | Prisma.ShiftCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ShiftIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ShiftUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShiftUpdateInput, Prisma.ShiftUncheckedUpdateInput>;
    where: Prisma.ShiftWhereUniqueInput;
};
export type ShiftUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShiftUpdateManyMutationInput, Prisma.ShiftUncheckedUpdateManyInput>;
    where?: Prisma.ShiftWhereInput;
    limit?: number;
};
export type ShiftUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShiftUpdateManyMutationInput, Prisma.ShiftUncheckedUpdateManyInput>;
    where?: Prisma.ShiftWhereInput;
    limit?: number;
    include?: Prisma.ShiftIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ShiftUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    where: Prisma.ShiftWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShiftCreateInput, Prisma.ShiftUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShiftUpdateInput, Prisma.ShiftUncheckedUpdateInput>;
};
export type ShiftDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
    where: Prisma.ShiftWhereUniqueInput;
};
export type ShiftDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShiftWhereInput;
    limit?: number;
};
export type ShiftDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShiftSelect<ExtArgs> | null;
    omit?: Prisma.ShiftOmit<ExtArgs> | null;
    include?: Prisma.ShiftInclude<ExtArgs> | null;
};
