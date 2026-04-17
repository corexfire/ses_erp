import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type TenderBidModel = runtime.Types.Result.DefaultSelection<Prisma.$TenderBidPayload>;
export type AggregateTenderBid = {
    _count: TenderBidCountAggregateOutputType | null;
    _avg: TenderBidAvgAggregateOutputType | null;
    _sum: TenderBidSumAggregateOutputType | null;
    _min: TenderBidMinAggregateOutputType | null;
    _max: TenderBidMaxAggregateOutputType | null;
};
export type TenderBidAvgAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type TenderBidSumAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type TenderBidMinAggregateOutputType = {
    id: string | null;
    tenderId: string | null;
    supplierId: string | null;
    price: runtime.Decimal | null;
    notes: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type TenderBidMaxAggregateOutputType = {
    id: string | null;
    tenderId: string | null;
    supplierId: string | null;
    price: runtime.Decimal | null;
    notes: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type TenderBidCountAggregateOutputType = {
    id: number;
    tenderId: number;
    supplierId: number;
    price: number;
    notes: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type TenderBidAvgAggregateInputType = {
    price?: true;
};
export type TenderBidSumAggregateInputType = {
    price?: true;
};
export type TenderBidMinAggregateInputType = {
    id?: true;
    tenderId?: true;
    supplierId?: true;
    price?: true;
    notes?: true;
    status?: true;
    createdAt?: true;
};
export type TenderBidMaxAggregateInputType = {
    id?: true;
    tenderId?: true;
    supplierId?: true;
    price?: true;
    notes?: true;
    status?: true;
    createdAt?: true;
};
export type TenderBidCountAggregateInputType = {
    id?: true;
    tenderId?: true;
    supplierId?: true;
    price?: true;
    notes?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type TenderBidAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenderBidWhereInput;
    orderBy?: Prisma.TenderBidOrderByWithRelationInput | Prisma.TenderBidOrderByWithRelationInput[];
    cursor?: Prisma.TenderBidWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TenderBidCountAggregateInputType;
    _avg?: TenderBidAvgAggregateInputType;
    _sum?: TenderBidSumAggregateInputType;
    _min?: TenderBidMinAggregateInputType;
    _max?: TenderBidMaxAggregateInputType;
};
export type GetTenderBidAggregateType<T extends TenderBidAggregateArgs> = {
    [P in keyof T & keyof AggregateTenderBid]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTenderBid[P]> : Prisma.GetScalarType<T[P], AggregateTenderBid[P]>;
};
export type TenderBidGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenderBidWhereInput;
    orderBy?: Prisma.TenderBidOrderByWithAggregationInput | Prisma.TenderBidOrderByWithAggregationInput[];
    by: Prisma.TenderBidScalarFieldEnum[] | Prisma.TenderBidScalarFieldEnum;
    having?: Prisma.TenderBidScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TenderBidCountAggregateInputType | true;
    _avg?: TenderBidAvgAggregateInputType;
    _sum?: TenderBidSumAggregateInputType;
    _min?: TenderBidMinAggregateInputType;
    _max?: TenderBidMaxAggregateInputType;
};
export type TenderBidGroupByOutputType = {
    id: string;
    tenderId: string;
    supplierId: string;
    price: runtime.Decimal;
    notes: string | null;
    status: string;
    createdAt: Date;
    _count: TenderBidCountAggregateOutputType | null;
    _avg: TenderBidAvgAggregateOutputType | null;
    _sum: TenderBidSumAggregateOutputType | null;
    _min: TenderBidMinAggregateOutputType | null;
    _max: TenderBidMaxAggregateOutputType | null;
};
export type GetTenderBidGroupByPayload<T extends TenderBidGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TenderBidGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TenderBidGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TenderBidGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TenderBidGroupByOutputType[P]>;
}>>;
export type TenderBidWhereInput = {
    AND?: Prisma.TenderBidWhereInput | Prisma.TenderBidWhereInput[];
    OR?: Prisma.TenderBidWhereInput[];
    NOT?: Prisma.TenderBidWhereInput | Prisma.TenderBidWhereInput[];
    id?: Prisma.StringFilter<"TenderBid"> | string;
    tenderId?: Prisma.StringFilter<"TenderBid"> | string;
    supplierId?: Prisma.StringFilter<"TenderBid"> | string;
    price?: Prisma.DecimalFilter<"TenderBid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"TenderBid"> | string | null;
    status?: Prisma.StringFilter<"TenderBid"> | string;
    createdAt?: Prisma.DateTimeFilter<"TenderBid"> | Date | string;
    tender?: Prisma.XOR<Prisma.TenderScalarRelationFilter, Prisma.TenderWhereInput>;
};
export type TenderBidOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenderId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    tender?: Prisma.TenderOrderByWithRelationInput;
};
export type TenderBidWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TenderBidWhereInput | Prisma.TenderBidWhereInput[];
    OR?: Prisma.TenderBidWhereInput[];
    NOT?: Prisma.TenderBidWhereInput | Prisma.TenderBidWhereInput[];
    tenderId?: Prisma.StringFilter<"TenderBid"> | string;
    supplierId?: Prisma.StringFilter<"TenderBid"> | string;
    price?: Prisma.DecimalFilter<"TenderBid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"TenderBid"> | string | null;
    status?: Prisma.StringFilter<"TenderBid"> | string;
    createdAt?: Prisma.DateTimeFilter<"TenderBid"> | Date | string;
    tender?: Prisma.XOR<Prisma.TenderScalarRelationFilter, Prisma.TenderWhereInput>;
}, "id">;
export type TenderBidOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenderId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TenderBidCountOrderByAggregateInput;
    _avg?: Prisma.TenderBidAvgOrderByAggregateInput;
    _max?: Prisma.TenderBidMaxOrderByAggregateInput;
    _min?: Prisma.TenderBidMinOrderByAggregateInput;
    _sum?: Prisma.TenderBidSumOrderByAggregateInput;
};
export type TenderBidScalarWhereWithAggregatesInput = {
    AND?: Prisma.TenderBidScalarWhereWithAggregatesInput | Prisma.TenderBidScalarWhereWithAggregatesInput[];
    OR?: Prisma.TenderBidScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TenderBidScalarWhereWithAggregatesInput | Prisma.TenderBidScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TenderBid"> | string;
    tenderId?: Prisma.StringWithAggregatesFilter<"TenderBid"> | string;
    supplierId?: Prisma.StringWithAggregatesFilter<"TenderBid"> | string;
    price?: Prisma.DecimalWithAggregatesFilter<"TenderBid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"TenderBid"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"TenderBid"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TenderBid"> | Date | string;
};
export type TenderBidCreateInput = {
    id?: string;
    supplierId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
    tender: Prisma.TenderCreateNestedOneWithoutBidsInput;
};
export type TenderBidUncheckedCreateInput = {
    id?: string;
    tenderId: string;
    supplierId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type TenderBidUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tender?: Prisma.TenderUpdateOneRequiredWithoutBidsNestedInput;
};
export type TenderBidUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenderId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenderBidCreateManyInput = {
    id?: string;
    tenderId: string;
    supplierId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type TenderBidUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenderBidUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenderId?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenderBidListRelationFilter = {
    every?: Prisma.TenderBidWhereInput;
    some?: Prisma.TenderBidWhereInput;
    none?: Prisma.TenderBidWhereInput;
};
export type TenderBidOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TenderBidCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenderId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TenderBidAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type TenderBidMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenderId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TenderBidMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenderId?: Prisma.SortOrder;
    supplierId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TenderBidSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type TenderBidCreateNestedManyWithoutTenderInput = {
    create?: Prisma.XOR<Prisma.TenderBidCreateWithoutTenderInput, Prisma.TenderBidUncheckedCreateWithoutTenderInput> | Prisma.TenderBidCreateWithoutTenderInput[] | Prisma.TenderBidUncheckedCreateWithoutTenderInput[];
    connectOrCreate?: Prisma.TenderBidCreateOrConnectWithoutTenderInput | Prisma.TenderBidCreateOrConnectWithoutTenderInput[];
    createMany?: Prisma.TenderBidCreateManyTenderInputEnvelope;
    connect?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
};
export type TenderBidUncheckedCreateNestedManyWithoutTenderInput = {
    create?: Prisma.XOR<Prisma.TenderBidCreateWithoutTenderInput, Prisma.TenderBidUncheckedCreateWithoutTenderInput> | Prisma.TenderBidCreateWithoutTenderInput[] | Prisma.TenderBidUncheckedCreateWithoutTenderInput[];
    connectOrCreate?: Prisma.TenderBidCreateOrConnectWithoutTenderInput | Prisma.TenderBidCreateOrConnectWithoutTenderInput[];
    createMany?: Prisma.TenderBidCreateManyTenderInputEnvelope;
    connect?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
};
export type TenderBidUpdateManyWithoutTenderNestedInput = {
    create?: Prisma.XOR<Prisma.TenderBidCreateWithoutTenderInput, Prisma.TenderBidUncheckedCreateWithoutTenderInput> | Prisma.TenderBidCreateWithoutTenderInput[] | Prisma.TenderBidUncheckedCreateWithoutTenderInput[];
    connectOrCreate?: Prisma.TenderBidCreateOrConnectWithoutTenderInput | Prisma.TenderBidCreateOrConnectWithoutTenderInput[];
    upsert?: Prisma.TenderBidUpsertWithWhereUniqueWithoutTenderInput | Prisma.TenderBidUpsertWithWhereUniqueWithoutTenderInput[];
    createMany?: Prisma.TenderBidCreateManyTenderInputEnvelope;
    set?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    disconnect?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    delete?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    connect?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    update?: Prisma.TenderBidUpdateWithWhereUniqueWithoutTenderInput | Prisma.TenderBidUpdateWithWhereUniqueWithoutTenderInput[];
    updateMany?: Prisma.TenderBidUpdateManyWithWhereWithoutTenderInput | Prisma.TenderBidUpdateManyWithWhereWithoutTenderInput[];
    deleteMany?: Prisma.TenderBidScalarWhereInput | Prisma.TenderBidScalarWhereInput[];
};
export type TenderBidUncheckedUpdateManyWithoutTenderNestedInput = {
    create?: Prisma.XOR<Prisma.TenderBidCreateWithoutTenderInput, Prisma.TenderBidUncheckedCreateWithoutTenderInput> | Prisma.TenderBidCreateWithoutTenderInput[] | Prisma.TenderBidUncheckedCreateWithoutTenderInput[];
    connectOrCreate?: Prisma.TenderBidCreateOrConnectWithoutTenderInput | Prisma.TenderBidCreateOrConnectWithoutTenderInput[];
    upsert?: Prisma.TenderBidUpsertWithWhereUniqueWithoutTenderInput | Prisma.TenderBidUpsertWithWhereUniqueWithoutTenderInput[];
    createMany?: Prisma.TenderBidCreateManyTenderInputEnvelope;
    set?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    disconnect?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    delete?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    connect?: Prisma.TenderBidWhereUniqueInput | Prisma.TenderBidWhereUniqueInput[];
    update?: Prisma.TenderBidUpdateWithWhereUniqueWithoutTenderInput | Prisma.TenderBidUpdateWithWhereUniqueWithoutTenderInput[];
    updateMany?: Prisma.TenderBidUpdateManyWithWhereWithoutTenderInput | Prisma.TenderBidUpdateManyWithWhereWithoutTenderInput[];
    deleteMany?: Prisma.TenderBidScalarWhereInput | Prisma.TenderBidScalarWhereInput[];
};
export type TenderBidCreateWithoutTenderInput = {
    id?: string;
    supplierId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type TenderBidUncheckedCreateWithoutTenderInput = {
    id?: string;
    supplierId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type TenderBidCreateOrConnectWithoutTenderInput = {
    where: Prisma.TenderBidWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenderBidCreateWithoutTenderInput, Prisma.TenderBidUncheckedCreateWithoutTenderInput>;
};
export type TenderBidCreateManyTenderInputEnvelope = {
    data: Prisma.TenderBidCreateManyTenderInput | Prisma.TenderBidCreateManyTenderInput[];
    skipDuplicates?: boolean;
};
export type TenderBidUpsertWithWhereUniqueWithoutTenderInput = {
    where: Prisma.TenderBidWhereUniqueInput;
    update: Prisma.XOR<Prisma.TenderBidUpdateWithoutTenderInput, Prisma.TenderBidUncheckedUpdateWithoutTenderInput>;
    create: Prisma.XOR<Prisma.TenderBidCreateWithoutTenderInput, Prisma.TenderBidUncheckedCreateWithoutTenderInput>;
};
export type TenderBidUpdateWithWhereUniqueWithoutTenderInput = {
    where: Prisma.TenderBidWhereUniqueInput;
    data: Prisma.XOR<Prisma.TenderBidUpdateWithoutTenderInput, Prisma.TenderBidUncheckedUpdateWithoutTenderInput>;
};
export type TenderBidUpdateManyWithWhereWithoutTenderInput = {
    where: Prisma.TenderBidScalarWhereInput;
    data: Prisma.XOR<Prisma.TenderBidUpdateManyMutationInput, Prisma.TenderBidUncheckedUpdateManyWithoutTenderInput>;
};
export type TenderBidScalarWhereInput = {
    AND?: Prisma.TenderBidScalarWhereInput | Prisma.TenderBidScalarWhereInput[];
    OR?: Prisma.TenderBidScalarWhereInput[];
    NOT?: Prisma.TenderBidScalarWhereInput | Prisma.TenderBidScalarWhereInput[];
    id?: Prisma.StringFilter<"TenderBid"> | string;
    tenderId?: Prisma.StringFilter<"TenderBid"> | string;
    supplierId?: Prisma.StringFilter<"TenderBid"> | string;
    price?: Prisma.DecimalFilter<"TenderBid"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.StringNullableFilter<"TenderBid"> | string | null;
    status?: Prisma.StringFilter<"TenderBid"> | string;
    createdAt?: Prisma.DateTimeFilter<"TenderBid"> | Date | string;
};
export type TenderBidCreateManyTenderInput = {
    id?: string;
    supplierId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: string | null;
    status?: string;
    createdAt?: Date | string;
};
export type TenderBidUpdateWithoutTenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenderBidUncheckedUpdateWithoutTenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenderBidUncheckedUpdateManyWithoutTenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    supplierId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TenderBidSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenderId?: boolean;
    supplierId?: boolean;
    price?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tender?: boolean | Prisma.TenderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tenderBid"]>;
export type TenderBidSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenderId?: boolean;
    supplierId?: boolean;
    price?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tender?: boolean | Prisma.TenderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tenderBid"]>;
export type TenderBidSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenderId?: boolean;
    supplierId?: boolean;
    price?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
    tender?: boolean | Prisma.TenderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tenderBid"]>;
export type TenderBidSelectScalar = {
    id?: boolean;
    tenderId?: boolean;
    supplierId?: boolean;
    price?: boolean;
    notes?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type TenderBidOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenderId" | "supplierId" | "price" | "notes" | "status" | "createdAt", ExtArgs["result"]["tenderBid"]>;
export type TenderBidInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tender?: boolean | Prisma.TenderDefaultArgs<ExtArgs>;
};
export type TenderBidIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tender?: boolean | Prisma.TenderDefaultArgs<ExtArgs>;
};
export type TenderBidIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tender?: boolean | Prisma.TenderDefaultArgs<ExtArgs>;
};
export type $TenderBidPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TenderBid";
    objects: {
        tender: Prisma.$TenderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenderId: string;
        supplierId: string;
        price: runtime.Decimal;
        notes: string | null;
        status: string;
        createdAt: Date;
    }, ExtArgs["result"]["tenderBid"]>;
    composites: {};
};
export type TenderBidGetPayload<S extends boolean | null | undefined | TenderBidDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TenderBidPayload, S>;
export type TenderBidCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TenderBidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TenderBidCountAggregateInputType | true;
};
export interface TenderBidDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TenderBid'];
        meta: {
            name: 'TenderBid';
        };
    };
    findUnique<T extends TenderBidFindUniqueArgs>(args: Prisma.SelectSubset<T, TenderBidFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TenderBidFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TenderBidFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TenderBidFindFirstArgs>(args?: Prisma.SelectSubset<T, TenderBidFindFirstArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TenderBidFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TenderBidFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TenderBidFindManyArgs>(args?: Prisma.SelectSubset<T, TenderBidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TenderBidCreateArgs>(args: Prisma.SelectSubset<T, TenderBidCreateArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TenderBidCreateManyArgs>(args?: Prisma.SelectSubset<T, TenderBidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TenderBidCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TenderBidCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TenderBidDeleteArgs>(args: Prisma.SelectSubset<T, TenderBidDeleteArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TenderBidUpdateArgs>(args: Prisma.SelectSubset<T, TenderBidUpdateArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TenderBidDeleteManyArgs>(args?: Prisma.SelectSubset<T, TenderBidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TenderBidUpdateManyArgs>(args: Prisma.SelectSubset<T, TenderBidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TenderBidUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TenderBidUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TenderBidUpsertArgs>(args: Prisma.SelectSubset<T, TenderBidUpsertArgs<ExtArgs>>): Prisma.Prisma__TenderBidClient<runtime.Types.Result.GetResult<Prisma.$TenderBidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TenderBidCountArgs>(args?: Prisma.Subset<T, TenderBidCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TenderBidCountAggregateOutputType> : number>;
    aggregate<T extends TenderBidAggregateArgs>(args: Prisma.Subset<T, TenderBidAggregateArgs>): Prisma.PrismaPromise<GetTenderBidAggregateType<T>>;
    groupBy<T extends TenderBidGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TenderBidGroupByArgs['orderBy'];
    } : {
        orderBy?: TenderBidGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TenderBidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenderBidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TenderBidFieldRefs;
}
export interface Prisma__TenderBidClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tender<T extends Prisma.TenderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TenderDefaultArgs<ExtArgs>>): Prisma.Prisma__TenderClient<runtime.Types.Result.GetResult<Prisma.$TenderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TenderBidFieldRefs {
    readonly id: Prisma.FieldRef<"TenderBid", 'String'>;
    readonly tenderId: Prisma.FieldRef<"TenderBid", 'String'>;
    readonly supplierId: Prisma.FieldRef<"TenderBid", 'String'>;
    readonly price: Prisma.FieldRef<"TenderBid", 'Decimal'>;
    readonly notes: Prisma.FieldRef<"TenderBid", 'String'>;
    readonly status: Prisma.FieldRef<"TenderBid", 'String'>;
    readonly createdAt: Prisma.FieldRef<"TenderBid", 'DateTime'>;
}
export type TenderBidFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    where: Prisma.TenderBidWhereUniqueInput;
};
export type TenderBidFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    where: Prisma.TenderBidWhereUniqueInput;
};
export type TenderBidFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    where?: Prisma.TenderBidWhereInput;
    orderBy?: Prisma.TenderBidOrderByWithRelationInput | Prisma.TenderBidOrderByWithRelationInput[];
    cursor?: Prisma.TenderBidWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenderBidScalarFieldEnum | Prisma.TenderBidScalarFieldEnum[];
};
export type TenderBidFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    where?: Prisma.TenderBidWhereInput;
    orderBy?: Prisma.TenderBidOrderByWithRelationInput | Prisma.TenderBidOrderByWithRelationInput[];
    cursor?: Prisma.TenderBidWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenderBidScalarFieldEnum | Prisma.TenderBidScalarFieldEnum[];
};
export type TenderBidFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    where?: Prisma.TenderBidWhereInput;
    orderBy?: Prisma.TenderBidOrderByWithRelationInput | Prisma.TenderBidOrderByWithRelationInput[];
    cursor?: Prisma.TenderBidWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TenderBidScalarFieldEnum | Prisma.TenderBidScalarFieldEnum[];
};
export type TenderBidCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TenderBidCreateInput, Prisma.TenderBidUncheckedCreateInput>;
};
export type TenderBidCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TenderBidCreateManyInput | Prisma.TenderBidCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TenderBidCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    data: Prisma.TenderBidCreateManyInput | Prisma.TenderBidCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TenderBidIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TenderBidUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TenderBidUpdateInput, Prisma.TenderBidUncheckedUpdateInput>;
    where: Prisma.TenderBidWhereUniqueInput;
};
export type TenderBidUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TenderBidUpdateManyMutationInput, Prisma.TenderBidUncheckedUpdateManyInput>;
    where?: Prisma.TenderBidWhereInput;
    limit?: number;
};
export type TenderBidUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TenderBidUpdateManyMutationInput, Prisma.TenderBidUncheckedUpdateManyInput>;
    where?: Prisma.TenderBidWhereInput;
    limit?: number;
    include?: Prisma.TenderBidIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TenderBidUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    where: Prisma.TenderBidWhereUniqueInput;
    create: Prisma.XOR<Prisma.TenderBidCreateInput, Prisma.TenderBidUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TenderBidUpdateInput, Prisma.TenderBidUncheckedUpdateInput>;
};
export type TenderBidDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
    where: Prisma.TenderBidWhereUniqueInput;
};
export type TenderBidDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TenderBidWhereInput;
    limit?: number;
};
export type TenderBidDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TenderBidSelect<ExtArgs> | null;
    omit?: Prisma.TenderBidOmit<ExtArgs> | null;
    include?: Prisma.TenderBidInclude<ExtArgs> | null;
};
