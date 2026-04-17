import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type VehicleDocumentModel = runtime.Types.Result.DefaultSelection<Prisma.$VehicleDocumentPayload>;
export type AggregateVehicleDocument = {
    _count: VehicleDocumentCountAggregateOutputType | null;
    _min: VehicleDocumentMinAggregateOutputType | null;
    _max: VehicleDocumentMaxAggregateOutputType | null;
};
export type VehicleDocumentMinAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    vehicleId: string | null;
    documentType: string | null;
    documentNumber: string | null;
    issueDate: Date | null;
    expiryDate: Date | null;
    fileId: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicleDocumentMaxAggregateOutputType = {
    id: string | null;
    tenantId: string | null;
    vehicleId: string | null;
    documentType: string | null;
    documentNumber: string | null;
    issueDate: Date | null;
    expiryDate: Date | null;
    fileId: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicleDocumentCountAggregateOutputType = {
    id: number;
    tenantId: number;
    vehicleId: number;
    documentType: number;
    documentNumber: number;
    issueDate: number;
    expiryDate: number;
    fileId: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type VehicleDocumentMinAggregateInputType = {
    id?: true;
    tenantId?: true;
    vehicleId?: true;
    documentType?: true;
    documentNumber?: true;
    issueDate?: true;
    expiryDate?: true;
    fileId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicleDocumentMaxAggregateInputType = {
    id?: true;
    tenantId?: true;
    vehicleId?: true;
    documentType?: true;
    documentNumber?: true;
    issueDate?: true;
    expiryDate?: true;
    fileId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicleDocumentCountAggregateInputType = {
    id?: true;
    tenantId?: true;
    vehicleId?: true;
    documentType?: true;
    documentNumber?: true;
    issueDate?: true;
    expiryDate?: true;
    fileId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type VehicleDocumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleDocumentWhereInput;
    orderBy?: Prisma.VehicleDocumentOrderByWithRelationInput | Prisma.VehicleDocumentOrderByWithRelationInput[];
    cursor?: Prisma.VehicleDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VehicleDocumentCountAggregateInputType;
    _min?: VehicleDocumentMinAggregateInputType;
    _max?: VehicleDocumentMaxAggregateInputType;
};
export type GetVehicleDocumentAggregateType<T extends VehicleDocumentAggregateArgs> = {
    [P in keyof T & keyof AggregateVehicleDocument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVehicleDocument[P]> : Prisma.GetScalarType<T[P], AggregateVehicleDocument[P]>;
};
export type VehicleDocumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleDocumentWhereInput;
    orderBy?: Prisma.VehicleDocumentOrderByWithAggregationInput | Prisma.VehicleDocumentOrderByWithAggregationInput[];
    by: Prisma.VehicleDocumentScalarFieldEnum[] | Prisma.VehicleDocumentScalarFieldEnum;
    having?: Prisma.VehicleDocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VehicleDocumentCountAggregateInputType | true;
    _min?: VehicleDocumentMinAggregateInputType;
    _max?: VehicleDocumentMaxAggregateInputType;
};
export type VehicleDocumentGroupByOutputType = {
    id: string;
    tenantId: string;
    vehicleId: string;
    documentType: string;
    documentNumber: string | null;
    issueDate: Date | null;
    expiryDate: Date | null;
    fileId: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: VehicleDocumentCountAggregateOutputType | null;
    _min: VehicleDocumentMinAggregateOutputType | null;
    _max: VehicleDocumentMaxAggregateOutputType | null;
};
export type GetVehicleDocumentGroupByPayload<T extends VehicleDocumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VehicleDocumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VehicleDocumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VehicleDocumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VehicleDocumentGroupByOutputType[P]>;
}>>;
export type VehicleDocumentWhereInput = {
    AND?: Prisma.VehicleDocumentWhereInput | Prisma.VehicleDocumentWhereInput[];
    OR?: Prisma.VehicleDocumentWhereInput[];
    NOT?: Prisma.VehicleDocumentWhereInput | Prisma.VehicleDocumentWhereInput[];
    id?: Prisma.StringFilter<"VehicleDocument"> | string;
    tenantId?: Prisma.StringFilter<"VehicleDocument"> | string;
    vehicleId?: Prisma.StringFilter<"VehicleDocument"> | string;
    documentType?: Prisma.StringFilter<"VehicleDocument"> | string;
    documentNumber?: Prisma.StringNullableFilter<"VehicleDocument"> | string | null;
    issueDate?: Prisma.DateTimeNullableFilter<"VehicleDocument"> | Date | string | null;
    expiryDate?: Prisma.DateTimeNullableFilter<"VehicleDocument"> | Date | string | null;
    fileId?: Prisma.StringNullableFilter<"VehicleDocument"> | string | null;
    status?: Prisma.StringFilter<"VehicleDocument"> | string;
    createdAt?: Prisma.DateTimeFilter<"VehicleDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VehicleDocument"> | Date | string;
};
export type VehicleDocumentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    documentType?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VehicleDocumentWhereInput | Prisma.VehicleDocumentWhereInput[];
    OR?: Prisma.VehicleDocumentWhereInput[];
    NOT?: Prisma.VehicleDocumentWhereInput | Prisma.VehicleDocumentWhereInput[];
    tenantId?: Prisma.StringFilter<"VehicleDocument"> | string;
    vehicleId?: Prisma.StringFilter<"VehicleDocument"> | string;
    documentType?: Prisma.StringFilter<"VehicleDocument"> | string;
    documentNumber?: Prisma.StringNullableFilter<"VehicleDocument"> | string | null;
    issueDate?: Prisma.DateTimeNullableFilter<"VehicleDocument"> | Date | string | null;
    expiryDate?: Prisma.DateTimeNullableFilter<"VehicleDocument"> | Date | string | null;
    fileId?: Prisma.StringNullableFilter<"VehicleDocument"> | string | null;
    status?: Prisma.StringFilter<"VehicleDocument"> | string;
    createdAt?: Prisma.DateTimeFilter<"VehicleDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"VehicleDocument"> | Date | string;
}, "id">;
export type VehicleDocumentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    documentType?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    issueDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiryDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.VehicleDocumentCountOrderByAggregateInput;
    _max?: Prisma.VehicleDocumentMaxOrderByAggregateInput;
    _min?: Prisma.VehicleDocumentMinOrderByAggregateInput;
};
export type VehicleDocumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.VehicleDocumentScalarWhereWithAggregatesInput | Prisma.VehicleDocumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.VehicleDocumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VehicleDocumentScalarWhereWithAggregatesInput | Prisma.VehicleDocumentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VehicleDocument"> | string;
    tenantId?: Prisma.StringWithAggregatesFilter<"VehicleDocument"> | string;
    vehicleId?: Prisma.StringWithAggregatesFilter<"VehicleDocument"> | string;
    documentType?: Prisma.StringWithAggregatesFilter<"VehicleDocument"> | string;
    documentNumber?: Prisma.StringNullableWithAggregatesFilter<"VehicleDocument"> | string | null;
    issueDate?: Prisma.DateTimeNullableWithAggregatesFilter<"VehicleDocument"> | Date | string | null;
    expiryDate?: Prisma.DateTimeNullableWithAggregatesFilter<"VehicleDocument"> | Date | string | null;
    fileId?: Prisma.StringNullableWithAggregatesFilter<"VehicleDocument"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"VehicleDocument"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"VehicleDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"VehicleDocument"> | Date | string;
};
export type VehicleDocumentCreateInput = {
    id?: string;
    tenantId: string;
    vehicleId: string;
    documentType: string;
    documentNumber?: string | null;
    issueDate?: Date | string | null;
    expiryDate?: Date | string | null;
    fileId?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleDocumentUncheckedCreateInput = {
    id?: string;
    tenantId: string;
    vehicleId: string;
    documentType: string;
    documentNumber?: string | null;
    issueDate?: Date | string | null;
    expiryDate?: Date | string | null;
    fileId?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleDocumentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    documentType?: Prisma.StringFieldUpdateOperationsInput | string;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleDocumentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    documentType?: Prisma.StringFieldUpdateOperationsInput | string;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleDocumentCreateManyInput = {
    id?: string;
    tenantId: string;
    vehicleId: string;
    documentType: string;
    documentNumber?: string | null;
    issueDate?: Date | string | null;
    expiryDate?: Date | string | null;
    fileId?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleDocumentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    documentType?: Prisma.StringFieldUpdateOperationsInput | string;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleDocumentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tenantId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleId?: Prisma.StringFieldUpdateOperationsInput | string;
    documentType?: Prisma.StringFieldUpdateOperationsInput | string;
    documentNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issueDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiryDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    fileId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleDocumentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    documentType?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrder;
    issueDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleDocumentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    documentType?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrder;
    issueDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleDocumentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tenantId?: Prisma.SortOrder;
    vehicleId?: Prisma.SortOrder;
    documentType?: Prisma.SortOrder;
    documentNumber?: Prisma.SortOrder;
    issueDate?: Prisma.SortOrder;
    expiryDate?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleDocumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    vehicleId?: boolean;
    documentType?: boolean;
    documentNumber?: boolean;
    issueDate?: boolean;
    expiryDate?: boolean;
    fileId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["vehicleDocument"]>;
export type VehicleDocumentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    vehicleId?: boolean;
    documentType?: boolean;
    documentNumber?: boolean;
    issueDate?: boolean;
    expiryDate?: boolean;
    fileId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["vehicleDocument"]>;
export type VehicleDocumentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tenantId?: boolean;
    vehicleId?: boolean;
    documentType?: boolean;
    documentNumber?: boolean;
    issueDate?: boolean;
    expiryDate?: boolean;
    fileId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["vehicleDocument"]>;
export type VehicleDocumentSelectScalar = {
    id?: boolean;
    tenantId?: boolean;
    vehicleId?: boolean;
    documentType?: boolean;
    documentNumber?: boolean;
    issueDate?: boolean;
    expiryDate?: boolean;
    fileId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type VehicleDocumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tenantId" | "vehicleId" | "documentType" | "documentNumber" | "issueDate" | "expiryDate" | "fileId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicleDocument"]>;
export type $VehicleDocumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VehicleDocument";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tenantId: string;
        vehicleId: string;
        documentType: string;
        documentNumber: string | null;
        issueDate: Date | null;
        expiryDate: Date | null;
        fileId: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["vehicleDocument"]>;
    composites: {};
};
export type VehicleDocumentGetPayload<S extends boolean | null | undefined | VehicleDocumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload, S>;
export type VehicleDocumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VehicleDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VehicleDocumentCountAggregateInputType | true;
};
export interface VehicleDocumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VehicleDocument'];
        meta: {
            name: 'VehicleDocument';
        };
    };
    findUnique<T extends VehicleDocumentFindUniqueArgs>(args: Prisma.SelectSubset<T, VehicleDocumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VehicleDocumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VehicleDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VehicleDocumentFindFirstArgs>(args?: Prisma.SelectSubset<T, VehicleDocumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VehicleDocumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VehicleDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VehicleDocumentFindManyArgs>(args?: Prisma.SelectSubset<T, VehicleDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VehicleDocumentCreateArgs>(args: Prisma.SelectSubset<T, VehicleDocumentCreateArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VehicleDocumentCreateManyArgs>(args?: Prisma.SelectSubset<T, VehicleDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VehicleDocumentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VehicleDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VehicleDocumentDeleteArgs>(args: Prisma.SelectSubset<T, VehicleDocumentDeleteArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VehicleDocumentUpdateArgs>(args: Prisma.SelectSubset<T, VehicleDocumentUpdateArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VehicleDocumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, VehicleDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VehicleDocumentUpdateManyArgs>(args: Prisma.SelectSubset<T, VehicleDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VehicleDocumentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VehicleDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VehicleDocumentUpsertArgs>(args: Prisma.SelectSubset<T, VehicleDocumentUpsertArgs<ExtArgs>>): Prisma.Prisma__VehicleDocumentClient<runtime.Types.Result.GetResult<Prisma.$VehicleDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VehicleDocumentCountArgs>(args?: Prisma.Subset<T, VehicleDocumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VehicleDocumentCountAggregateOutputType> : number>;
    aggregate<T extends VehicleDocumentAggregateArgs>(args: Prisma.Subset<T, VehicleDocumentAggregateArgs>): Prisma.PrismaPromise<GetVehicleDocumentAggregateType<T>>;
    groupBy<T extends VehicleDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VehicleDocumentGroupByArgs['orderBy'];
    } : {
        orderBy?: VehicleDocumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VehicleDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VehicleDocumentFieldRefs;
}
export interface Prisma__VehicleDocumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VehicleDocumentFieldRefs {
    readonly id: Prisma.FieldRef<"VehicleDocument", 'String'>;
    readonly tenantId: Prisma.FieldRef<"VehicleDocument", 'String'>;
    readonly vehicleId: Prisma.FieldRef<"VehicleDocument", 'String'>;
    readonly documentType: Prisma.FieldRef<"VehicleDocument", 'String'>;
    readonly documentNumber: Prisma.FieldRef<"VehicleDocument", 'String'>;
    readonly issueDate: Prisma.FieldRef<"VehicleDocument", 'DateTime'>;
    readonly expiryDate: Prisma.FieldRef<"VehicleDocument", 'DateTime'>;
    readonly fileId: Prisma.FieldRef<"VehicleDocument", 'String'>;
    readonly status: Prisma.FieldRef<"VehicleDocument", 'String'>;
    readonly createdAt: Prisma.FieldRef<"VehicleDocument", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"VehicleDocument", 'DateTime'>;
}
export type VehicleDocumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    where: Prisma.VehicleDocumentWhereUniqueInput;
};
export type VehicleDocumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    where: Prisma.VehicleDocumentWhereUniqueInput;
};
export type VehicleDocumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    where?: Prisma.VehicleDocumentWhereInput;
    orderBy?: Prisma.VehicleDocumentOrderByWithRelationInput | Prisma.VehicleDocumentOrderByWithRelationInput[];
    cursor?: Prisma.VehicleDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleDocumentScalarFieldEnum | Prisma.VehicleDocumentScalarFieldEnum[];
};
export type VehicleDocumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    where?: Prisma.VehicleDocumentWhereInput;
    orderBy?: Prisma.VehicleDocumentOrderByWithRelationInput | Prisma.VehicleDocumentOrderByWithRelationInput[];
    cursor?: Prisma.VehicleDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleDocumentScalarFieldEnum | Prisma.VehicleDocumentScalarFieldEnum[];
};
export type VehicleDocumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    where?: Prisma.VehicleDocumentWhereInput;
    orderBy?: Prisma.VehicleDocumentOrderByWithRelationInput | Prisma.VehicleDocumentOrderByWithRelationInput[];
    cursor?: Prisma.VehicleDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleDocumentScalarFieldEnum | Prisma.VehicleDocumentScalarFieldEnum[];
};
export type VehicleDocumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleDocumentCreateInput, Prisma.VehicleDocumentUncheckedCreateInput>;
};
export type VehicleDocumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VehicleDocumentCreateManyInput | Prisma.VehicleDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VehicleDocumentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    data: Prisma.VehicleDocumentCreateManyInput | Prisma.VehicleDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VehicleDocumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleDocumentUpdateInput, Prisma.VehicleDocumentUncheckedUpdateInput>;
    where: Prisma.VehicleDocumentWhereUniqueInput;
};
export type VehicleDocumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VehicleDocumentUpdateManyMutationInput, Prisma.VehicleDocumentUncheckedUpdateManyInput>;
    where?: Prisma.VehicleDocumentWhereInput;
    limit?: number;
};
export type VehicleDocumentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleDocumentUpdateManyMutationInput, Prisma.VehicleDocumentUncheckedUpdateManyInput>;
    where?: Prisma.VehicleDocumentWhereInput;
    limit?: number;
};
export type VehicleDocumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    where: Prisma.VehicleDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicleDocumentCreateInput, Prisma.VehicleDocumentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VehicleDocumentUpdateInput, Prisma.VehicleDocumentUncheckedUpdateInput>;
};
export type VehicleDocumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
    where: Prisma.VehicleDocumentWhereUniqueInput;
};
export type VehicleDocumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleDocumentWhereInput;
    limit?: number;
};
export type VehicleDocumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleDocumentSelect<ExtArgs> | null;
    omit?: Prisma.VehicleDocumentOmit<ExtArgs> | null;
};
