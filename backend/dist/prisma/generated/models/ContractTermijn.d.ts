import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ContractTermijnModel = runtime.Types.Result.DefaultSelection<Prisma.$ContractTermijnPayload>;
export type AggregateContractTermijn = {
    _count: ContractTermijnCountAggregateOutputType | null;
    _avg: ContractTermijnAvgAggregateOutputType | null;
    _sum: ContractTermijnSumAggregateOutputType | null;
    _min: ContractTermijnMinAggregateOutputType | null;
    _max: ContractTermijnMaxAggregateOutputType | null;
};
export type ContractTermijnAvgAggregateOutputType = {
    termijnNo: number | null;
    percentage: number | null;
    amount: runtime.Decimal | null;
};
export type ContractTermijnSumAggregateOutputType = {
    termijnNo: number | null;
    percentage: number | null;
    amount: runtime.Decimal | null;
};
export type ContractTermijnMinAggregateOutputType = {
    id: string | null;
    contractId: string | null;
    termijnNo: number | null;
    description: string | null;
    dueDate: Date | null;
    percentage: number | null;
    amount: runtime.Decimal | null;
    status: string | null;
    paidAt: Date | null;
};
export type ContractTermijnMaxAggregateOutputType = {
    id: string | null;
    contractId: string | null;
    termijnNo: number | null;
    description: string | null;
    dueDate: Date | null;
    percentage: number | null;
    amount: runtime.Decimal | null;
    status: string | null;
    paidAt: Date | null;
};
export type ContractTermijnCountAggregateOutputType = {
    id: number;
    contractId: number;
    termijnNo: number;
    description: number;
    dueDate: number;
    percentage: number;
    amount: number;
    status: number;
    paidAt: number;
    _all: number;
};
export type ContractTermijnAvgAggregateInputType = {
    termijnNo?: true;
    percentage?: true;
    amount?: true;
};
export type ContractTermijnSumAggregateInputType = {
    termijnNo?: true;
    percentage?: true;
    amount?: true;
};
export type ContractTermijnMinAggregateInputType = {
    id?: true;
    contractId?: true;
    termijnNo?: true;
    description?: true;
    dueDate?: true;
    percentage?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
};
export type ContractTermijnMaxAggregateInputType = {
    id?: true;
    contractId?: true;
    termijnNo?: true;
    description?: true;
    dueDate?: true;
    percentage?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
};
export type ContractTermijnCountAggregateInputType = {
    id?: true;
    contractId?: true;
    termijnNo?: true;
    description?: true;
    dueDate?: true;
    percentage?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
    _all?: true;
};
export type ContractTermijnAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContractTermijnWhereInput;
    orderBy?: Prisma.ContractTermijnOrderByWithRelationInput | Prisma.ContractTermijnOrderByWithRelationInput[];
    cursor?: Prisma.ContractTermijnWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ContractTermijnCountAggregateInputType;
    _avg?: ContractTermijnAvgAggregateInputType;
    _sum?: ContractTermijnSumAggregateInputType;
    _min?: ContractTermijnMinAggregateInputType;
    _max?: ContractTermijnMaxAggregateInputType;
};
export type GetContractTermijnAggregateType<T extends ContractTermijnAggregateArgs> = {
    [P in keyof T & keyof AggregateContractTermijn]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateContractTermijn[P]> : Prisma.GetScalarType<T[P], AggregateContractTermijn[P]>;
};
export type ContractTermijnGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContractTermijnWhereInput;
    orderBy?: Prisma.ContractTermijnOrderByWithAggregationInput | Prisma.ContractTermijnOrderByWithAggregationInput[];
    by: Prisma.ContractTermijnScalarFieldEnum[] | Prisma.ContractTermijnScalarFieldEnum;
    having?: Prisma.ContractTermijnScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ContractTermijnCountAggregateInputType | true;
    _avg?: ContractTermijnAvgAggregateInputType;
    _sum?: ContractTermijnSumAggregateInputType;
    _min?: ContractTermijnMinAggregateInputType;
    _max?: ContractTermijnMaxAggregateInputType;
};
export type ContractTermijnGroupByOutputType = {
    id: string;
    contractId: string;
    termijnNo: number;
    description: string | null;
    dueDate: Date | null;
    percentage: number;
    amount: runtime.Decimal;
    status: string;
    paidAt: Date | null;
    _count: ContractTermijnCountAggregateOutputType | null;
    _avg: ContractTermijnAvgAggregateOutputType | null;
    _sum: ContractTermijnSumAggregateOutputType | null;
    _min: ContractTermijnMinAggregateOutputType | null;
    _max: ContractTermijnMaxAggregateOutputType | null;
};
export type GetContractTermijnGroupByPayload<T extends ContractTermijnGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ContractTermijnGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ContractTermijnGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ContractTermijnGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ContractTermijnGroupByOutputType[P]>;
}>>;
export type ContractTermijnWhereInput = {
    AND?: Prisma.ContractTermijnWhereInput | Prisma.ContractTermijnWhereInput[];
    OR?: Prisma.ContractTermijnWhereInput[];
    NOT?: Prisma.ContractTermijnWhereInput | Prisma.ContractTermijnWhereInput[];
    id?: Prisma.StringFilter<"ContractTermijn"> | string;
    contractId?: Prisma.StringFilter<"ContractTermijn"> | string;
    termijnNo?: Prisma.IntFilter<"ContractTermijn"> | number;
    description?: Prisma.StringNullableFilter<"ContractTermijn"> | string | null;
    dueDate?: Prisma.DateTimeNullableFilter<"ContractTermijn"> | Date | string | null;
    percentage?: Prisma.FloatFilter<"ContractTermijn"> | number;
    amount?: Prisma.DecimalFilter<"ContractTermijn"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"ContractTermijn"> | string;
    paidAt?: Prisma.DateTimeNullableFilter<"ContractTermijn"> | Date | string | null;
};
export type ContractTermijnOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    termijnNo?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type ContractTermijnWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ContractTermijnWhereInput | Prisma.ContractTermijnWhereInput[];
    OR?: Prisma.ContractTermijnWhereInput[];
    NOT?: Prisma.ContractTermijnWhereInput | Prisma.ContractTermijnWhereInput[];
    contractId?: Prisma.StringFilter<"ContractTermijn"> | string;
    termijnNo?: Prisma.IntFilter<"ContractTermijn"> | number;
    description?: Prisma.StringNullableFilter<"ContractTermijn"> | string | null;
    dueDate?: Prisma.DateTimeNullableFilter<"ContractTermijn"> | Date | string | null;
    percentage?: Prisma.FloatFilter<"ContractTermijn"> | number;
    amount?: Prisma.DecimalFilter<"ContractTermijn"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFilter<"ContractTermijn"> | string;
    paidAt?: Prisma.DateTimeNullableFilter<"ContractTermijn"> | Date | string | null;
}, "id">;
export type ContractTermijnOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    termijnNo?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    dueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ContractTermijnCountOrderByAggregateInput;
    _avg?: Prisma.ContractTermijnAvgOrderByAggregateInput;
    _max?: Prisma.ContractTermijnMaxOrderByAggregateInput;
    _min?: Prisma.ContractTermijnMinOrderByAggregateInput;
    _sum?: Prisma.ContractTermijnSumOrderByAggregateInput;
};
export type ContractTermijnScalarWhereWithAggregatesInput = {
    AND?: Prisma.ContractTermijnScalarWhereWithAggregatesInput | Prisma.ContractTermijnScalarWhereWithAggregatesInput[];
    OR?: Prisma.ContractTermijnScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ContractTermijnScalarWhereWithAggregatesInput | Prisma.ContractTermijnScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ContractTermijn"> | string;
    contractId?: Prisma.StringWithAggregatesFilter<"ContractTermijn"> | string;
    termijnNo?: Prisma.IntWithAggregatesFilter<"ContractTermijn"> | number;
    description?: Prisma.StringNullableWithAggregatesFilter<"ContractTermijn"> | string | null;
    dueDate?: Prisma.DateTimeNullableWithAggregatesFilter<"ContractTermijn"> | Date | string | null;
    percentage?: Prisma.FloatWithAggregatesFilter<"ContractTermijn"> | number;
    amount?: Prisma.DecimalWithAggregatesFilter<"ContractTermijn"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringWithAggregatesFilter<"ContractTermijn"> | string;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ContractTermijn"> | Date | string | null;
};
export type ContractTermijnCreateInput = {
    id?: string;
    contractId: string;
    termijnNo: number;
    description?: string | null;
    dueDate?: Date | string | null;
    percentage: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    paidAt?: Date | string | null;
};
export type ContractTermijnUncheckedCreateInput = {
    id?: string;
    contractId: string;
    termijnNo: number;
    description?: string | null;
    dueDate?: Date | string | null;
    percentage: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    paidAt?: Date | string | null;
};
export type ContractTermijnUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractId?: Prisma.StringFieldUpdateOperationsInput | string;
    termijnNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    percentage?: Prisma.FloatFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ContractTermijnUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractId?: Prisma.StringFieldUpdateOperationsInput | string;
    termijnNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    percentage?: Prisma.FloatFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ContractTermijnCreateManyInput = {
    id?: string;
    contractId: string;
    termijnNo: number;
    description?: string | null;
    dueDate?: Date | string | null;
    percentage: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: string;
    paidAt?: Date | string | null;
};
export type ContractTermijnUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractId?: Prisma.StringFieldUpdateOperationsInput | string;
    termijnNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    percentage?: Prisma.FloatFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ContractTermijnUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractId?: Prisma.StringFieldUpdateOperationsInput | string;
    termijnNo?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    percentage?: Prisma.FloatFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ContractTermijnCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    termijnNo?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
};
export type ContractTermijnAvgOrderByAggregateInput = {
    termijnNo?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type ContractTermijnMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    termijnNo?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
};
export type ContractTermijnMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contractId?: Prisma.SortOrder;
    termijnNo?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
};
export type ContractTermijnSumOrderByAggregateInput = {
    termijnNo?: Prisma.SortOrder;
    percentage?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type ContractTermijnSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contractId?: boolean;
    termijnNo?: boolean;
    description?: boolean;
    dueDate?: boolean;
    percentage?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
}, ExtArgs["result"]["contractTermijn"]>;
export type ContractTermijnSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contractId?: boolean;
    termijnNo?: boolean;
    description?: boolean;
    dueDate?: boolean;
    percentage?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
}, ExtArgs["result"]["contractTermijn"]>;
export type ContractTermijnSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contractId?: boolean;
    termijnNo?: boolean;
    description?: boolean;
    dueDate?: boolean;
    percentage?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
}, ExtArgs["result"]["contractTermijn"]>;
export type ContractTermijnSelectScalar = {
    id?: boolean;
    contractId?: boolean;
    termijnNo?: boolean;
    description?: boolean;
    dueDate?: boolean;
    percentage?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
};
export type ContractTermijnOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "contractId" | "termijnNo" | "description" | "dueDate" | "percentage" | "amount" | "status" | "paidAt", ExtArgs["result"]["contractTermijn"]>;
export type $ContractTermijnPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ContractTermijn";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        contractId: string;
        termijnNo: number;
        description: string | null;
        dueDate: Date | null;
        percentage: number;
        amount: runtime.Decimal;
        status: string;
        paidAt: Date | null;
    }, ExtArgs["result"]["contractTermijn"]>;
    composites: {};
};
export type ContractTermijnGetPayload<S extends boolean | null | undefined | ContractTermijnDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload, S>;
export type ContractTermijnCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ContractTermijnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ContractTermijnCountAggregateInputType | true;
};
export interface ContractTermijnDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ContractTermijn'];
        meta: {
            name: 'ContractTermijn';
        };
    };
    findUnique<T extends ContractTermijnFindUniqueArgs>(args: Prisma.SelectSubset<T, ContractTermijnFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ContractTermijnFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ContractTermijnFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ContractTermijnFindFirstArgs>(args?: Prisma.SelectSubset<T, ContractTermijnFindFirstArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ContractTermijnFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ContractTermijnFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ContractTermijnFindManyArgs>(args?: Prisma.SelectSubset<T, ContractTermijnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ContractTermijnCreateArgs>(args: Prisma.SelectSubset<T, ContractTermijnCreateArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ContractTermijnCreateManyArgs>(args?: Prisma.SelectSubset<T, ContractTermijnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ContractTermijnCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ContractTermijnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ContractTermijnDeleteArgs>(args: Prisma.SelectSubset<T, ContractTermijnDeleteArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ContractTermijnUpdateArgs>(args: Prisma.SelectSubset<T, ContractTermijnUpdateArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ContractTermijnDeleteManyArgs>(args?: Prisma.SelectSubset<T, ContractTermijnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ContractTermijnUpdateManyArgs>(args: Prisma.SelectSubset<T, ContractTermijnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ContractTermijnUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ContractTermijnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ContractTermijnUpsertArgs>(args: Prisma.SelectSubset<T, ContractTermijnUpsertArgs<ExtArgs>>): Prisma.Prisma__ContractTermijnClient<runtime.Types.Result.GetResult<Prisma.$ContractTermijnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ContractTermijnCountArgs>(args?: Prisma.Subset<T, ContractTermijnCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ContractTermijnCountAggregateOutputType> : number>;
    aggregate<T extends ContractTermijnAggregateArgs>(args: Prisma.Subset<T, ContractTermijnAggregateArgs>): Prisma.PrismaPromise<GetContractTermijnAggregateType<T>>;
    groupBy<T extends ContractTermijnGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ContractTermijnGroupByArgs['orderBy'];
    } : {
        orderBy?: ContractTermijnGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ContractTermijnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractTermijnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ContractTermijnFieldRefs;
}
export interface Prisma__ContractTermijnClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ContractTermijnFieldRefs {
    readonly id: Prisma.FieldRef<"ContractTermijn", 'String'>;
    readonly contractId: Prisma.FieldRef<"ContractTermijn", 'String'>;
    readonly termijnNo: Prisma.FieldRef<"ContractTermijn", 'Int'>;
    readonly description: Prisma.FieldRef<"ContractTermijn", 'String'>;
    readonly dueDate: Prisma.FieldRef<"ContractTermijn", 'DateTime'>;
    readonly percentage: Prisma.FieldRef<"ContractTermijn", 'Float'>;
    readonly amount: Prisma.FieldRef<"ContractTermijn", 'Decimal'>;
    readonly status: Prisma.FieldRef<"ContractTermijn", 'String'>;
    readonly paidAt: Prisma.FieldRef<"ContractTermijn", 'DateTime'>;
}
export type ContractTermijnFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    where: Prisma.ContractTermijnWhereUniqueInput;
};
export type ContractTermijnFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    where: Prisma.ContractTermijnWhereUniqueInput;
};
export type ContractTermijnFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    where?: Prisma.ContractTermijnWhereInput;
    orderBy?: Prisma.ContractTermijnOrderByWithRelationInput | Prisma.ContractTermijnOrderByWithRelationInput[];
    cursor?: Prisma.ContractTermijnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContractTermijnScalarFieldEnum | Prisma.ContractTermijnScalarFieldEnum[];
};
export type ContractTermijnFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    where?: Prisma.ContractTermijnWhereInput;
    orderBy?: Prisma.ContractTermijnOrderByWithRelationInput | Prisma.ContractTermijnOrderByWithRelationInput[];
    cursor?: Prisma.ContractTermijnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContractTermijnScalarFieldEnum | Prisma.ContractTermijnScalarFieldEnum[];
};
export type ContractTermijnFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    where?: Prisma.ContractTermijnWhereInput;
    orderBy?: Prisma.ContractTermijnOrderByWithRelationInput | Prisma.ContractTermijnOrderByWithRelationInput[];
    cursor?: Prisma.ContractTermijnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContractTermijnScalarFieldEnum | Prisma.ContractTermijnScalarFieldEnum[];
};
export type ContractTermijnCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContractTermijnCreateInput, Prisma.ContractTermijnUncheckedCreateInput>;
};
export type ContractTermijnCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ContractTermijnCreateManyInput | Prisma.ContractTermijnCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ContractTermijnCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    data: Prisma.ContractTermijnCreateManyInput | Prisma.ContractTermijnCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ContractTermijnUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContractTermijnUpdateInput, Prisma.ContractTermijnUncheckedUpdateInput>;
    where: Prisma.ContractTermijnWhereUniqueInput;
};
export type ContractTermijnUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ContractTermijnUpdateManyMutationInput, Prisma.ContractTermijnUncheckedUpdateManyInput>;
    where?: Prisma.ContractTermijnWhereInput;
    limit?: number;
};
export type ContractTermijnUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContractTermijnUpdateManyMutationInput, Prisma.ContractTermijnUncheckedUpdateManyInput>;
    where?: Prisma.ContractTermijnWhereInput;
    limit?: number;
};
export type ContractTermijnUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    where: Prisma.ContractTermijnWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContractTermijnCreateInput, Prisma.ContractTermijnUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ContractTermijnUpdateInput, Prisma.ContractTermijnUncheckedUpdateInput>;
};
export type ContractTermijnDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
    where: Prisma.ContractTermijnWhereUniqueInput;
};
export type ContractTermijnDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContractTermijnWhereInput;
    limit?: number;
};
export type ContractTermijnDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContractTermijnSelect<ExtArgs> | null;
    omit?: Prisma.ContractTermijnOmit<ExtArgs> | null;
};
