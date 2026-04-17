import type * as runtime from "@prisma/client/runtime/client";
import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type EnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus;
};
export type EnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type EnumSalesDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SalesDocStatus | Prisma.EnumSalesDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSalesDocStatusFilter<$PrismaModel> | $Enums.SalesDocStatus;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type EnumSalesDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SalesDocStatus | Prisma.EnumSalesDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSalesDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.SalesDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSalesDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSalesDocStatusFilter<$PrismaModel>;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type DecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type EnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | Prisma.EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus;
};
export type EnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | Prisma.EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentStatusFilter<$PrismaModel>;
};
export type EnumProcurementDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementDocStatus | Prisma.EnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProcurementDocStatusFilter<$PrismaModel> | $Enums.ProcurementDocStatus;
};
export type EnumProcurementDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementDocStatus | Prisma.EnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProcurementDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcurementDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProcurementDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProcurementDocStatusFilter<$PrismaModel>;
};
export type EnumItemTrackingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemTrackingType | Prisma.EnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumItemTrackingTypeFilter<$PrismaModel> | $Enums.ItemTrackingType;
};
export type EnumValuationMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ValuationMethod | Prisma.EnumValuationMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumValuationMethodFilter<$PrismaModel> | $Enums.ValuationMethod;
};
export type EnumItemTrackingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemTrackingType | Prisma.EnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumItemTrackingTypeWithAggregatesFilter<$PrismaModel> | $Enums.ItemTrackingType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumItemTrackingTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumItemTrackingTypeFilter<$PrismaModel>;
};
export type EnumValuationMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ValuationMethod | Prisma.EnumValuationMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumValuationMethodWithAggregatesFilter<$PrismaModel> | $Enums.ValuationMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumValuationMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumValuationMethodFilter<$PrismaModel>;
};
export type EnumStockMoveTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMoveType | Prisma.EnumStockMoveTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumStockMoveTypeFilter<$PrismaModel> | $Enums.StockMoveType;
};
export type EnumStockMoveTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMoveType | Prisma.EnumStockMoveTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumStockMoveTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockMoveType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumStockMoveTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumStockMoveTypeFilter<$PrismaModel>;
};
export type EnumInventoryDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryDocStatus | Prisma.EnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryDocStatusFilter<$PrismaModel> | $Enums.InventoryDocStatus;
};
export type EnumInventoryDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryDocStatus | Prisma.EnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.InventoryDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInventoryDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInventoryDocStatusFilter<$PrismaModel>;
};
export type EnumOpportunityStageFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityStage | Prisma.EnumOpportunityStageFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityStageFilter<$PrismaModel> | $Enums.OpportunityStage;
};
export type EnumOpportunityStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityStage | Prisma.EnumOpportunityStageFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityStageWithAggregatesFilter<$PrismaModel> | $Enums.OpportunityStage;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOpportunityStageFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOpportunityStageFilter<$PrismaModel>;
};
export type EnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel> | $Enums.ActivityType;
};
export type EnumActivityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityStatus | Prisma.EnumActivityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityStatusFilter<$PrismaModel> | $Enums.ActivityStatus;
};
export type EnumActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
};
export type EnumActivityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityStatus | Prisma.EnumActivityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityStatusWithAggregatesFilter<$PrismaModel> | $Enums.ActivityStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityStatusFilter<$PrismaModel>;
};
export type EnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | Prisma.EnumCampaignStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus;
};
export type EnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | Prisma.EnumCampaignStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCampaignStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCampaignStatusFilter<$PrismaModel>;
};
export type EnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | Prisma.EnumTicketPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority;
};
export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | Prisma.EnumTicketStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus;
};
export type EnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | Prisma.EnumTicketPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTicketPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTicketPriorityFilter<$PrismaModel>;
};
export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | Prisma.EnumTicketStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTicketStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTicketStatusFilter<$PrismaModel>;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type EnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel;
};
export type EnumNotificationTemplateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTemplateStatus | Prisma.EnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTemplateStatusFilter<$PrismaModel> | $Enums.NotificationTemplateStatus;
};
export type EnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
};
export type EnumNotificationTemplateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTemplateStatus | Prisma.EnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTemplateStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationTemplateStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTemplateStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTemplateStatusFilter<$PrismaModel>;
};
export type EnumNotificationLogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationLogStatus | Prisma.EnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationLogStatusFilter<$PrismaModel> | $Enums.NotificationLogStatus;
};
export type EnumNotificationLogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationLogStatus | Prisma.EnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationLogStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationLogStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationLogStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationLogStatusFilter<$PrismaModel>;
};
export type EnumNotificationChannelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumNotificationChannelNullableFilter<$PrismaModel> | $Enums.NotificationChannel | null;
};
export type EnumNotificationScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationScheduleStatus | Prisma.EnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationScheduleStatusFilter<$PrismaModel> | $Enums.NotificationScheduleStatus;
};
export type EnumNotificationChannelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumNotificationChannelNullableWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelNullableFilter<$PrismaModel>;
};
export type EnumNotificationScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationScheduleStatus | Prisma.EnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationScheduleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationScheduleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationScheduleStatusFilter<$PrismaModel>;
};
export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | Prisma.EnumAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType;
};
export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | Prisma.EnumAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccountTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccountTypeFilter<$PrismaModel>;
};
export type EnumWorkflowInstanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
};
export type EnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
};
export type EnumApprovalActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalAction | Prisma.EnumApprovalActionFieldRefInput<$PrismaModel>;
    in?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumApprovalActionFilter<$PrismaModel> | $Enums.ApprovalAction;
};
export type EnumApprovalActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalAction | Prisma.EnumApprovalActionFieldRefInput<$PrismaModel>;
    in?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumApprovalActionWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalAction;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumApprovalActionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumApprovalActionFilter<$PrismaModel>;
};
export type EnumProductionDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionDocStatus | Prisma.EnumProductionDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionDocStatusFilter<$PrismaModel> | $Enums.ProductionDocStatus;
};
export type EnumProductionDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionDocStatus | Prisma.EnumProductionDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductionDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProductionDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProductionDocStatusFilter<$PrismaModel>;
};
export type EnumVehicleOwnershipTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleOwnershipType | Prisma.EnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleOwnershipTypeFilter<$PrismaModel> | $Enums.VehicleOwnershipType;
};
export type EnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus;
};
export type EnumVehicleOwnershipTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleOwnershipType | Prisma.EnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleOwnershipTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleOwnershipType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVehicleOwnershipTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVehicleOwnershipTypeFilter<$PrismaModel>;
};
export type EnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
};
export type EnumDriverLicenseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverLicenseType | Prisma.EnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverLicenseTypeFilter<$PrismaModel> | $Enums.DriverLicenseType;
};
export type EnumDriverStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | Prisma.EnumDriverStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverStatusFilter<$PrismaModel> | $Enums.DriverStatus;
};
export type EnumDriverLicenseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverLicenseType | Prisma.EnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverLicenseTypeWithAggregatesFilter<$PrismaModel> | $Enums.DriverLicenseType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDriverLicenseTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDriverLicenseTypeFilter<$PrismaModel>;
};
export type EnumDriverStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | Prisma.EnumDriverStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel> | $Enums.DriverStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDriverStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDriverStatusFilter<$PrismaModel>;
};
export type EnumTripPlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripPlanStatus | Prisma.EnumTripPlanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripPlanStatusFilter<$PrismaModel> | $Enums.TripPlanStatus;
};
export type EnumTripPlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripPlanStatus | Prisma.EnumTripPlanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripPlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripPlanStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripPlanStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripPlanStatusFilter<$PrismaModel>;
};
export type EnumTripCheckpointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCheckpointType | Prisma.EnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCheckpointTypeFilter<$PrismaModel> | $Enums.TripCheckpointType;
};
export type EnumTripCheckpointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCheckpointType | Prisma.EnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCheckpointTypeWithAggregatesFilter<$PrismaModel> | $Enums.TripCheckpointType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripCheckpointTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripCheckpointTypeFilter<$PrismaModel>;
};
export type EnumDeliveryOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryOrderStatus | Prisma.EnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryOrderStatusFilter<$PrismaModel> | $Enums.DeliveryOrderStatus;
};
export type EnumDeliveryPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryPriority | Prisma.EnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryPriorityFilter<$PrismaModel> | $Enums.DeliveryPriority;
};
export type EnumDeliveryOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryOrderStatus | Prisma.EnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryOrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeliveryOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeliveryOrderStatusFilter<$PrismaModel>;
};
export type EnumDeliveryPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryPriority | Prisma.EnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryPriorityWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeliveryPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeliveryPriorityFilter<$PrismaModel>;
};
export type EnumProofOfDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofOfDeliveryStatus | Prisma.EnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProofOfDeliveryStatusFilter<$PrismaModel> | $Enums.ProofOfDeliveryStatus;
};
export type EnumProofOfDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofOfDeliveryStatus | Prisma.EnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProofOfDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProofOfDeliveryStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProofOfDeliveryStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProofOfDeliveryStatusFilter<$PrismaModel>;
};
export type EnumDeliveryExceptionReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryExceptionReason | Prisma.EnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryExceptionReasonFilter<$PrismaModel> | $Enums.DeliveryExceptionReason;
};
export type EnumDeliveryExceptionReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryExceptionReason | Prisma.EnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryExceptionReasonWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryExceptionReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeliveryExceptionReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeliveryExceptionReasonFilter<$PrismaModel>;
};
export type EnumWavePickingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WavePickingStatus | Prisma.EnumWavePickingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWavePickingStatusFilter<$PrismaModel> | $Enums.WavePickingStatus;
};
export type EnumWavePickingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WavePickingStatus | Prisma.EnumWavePickingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWavePickingStatusWithAggregatesFilter<$PrismaModel> | $Enums.WavePickingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWavePickingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWavePickingStatusFilter<$PrismaModel>;
};
export type EnumTripCostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostType | Prisma.EnumTripCostTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostTypeFilter<$PrismaModel> | $Enums.TripCostType;
};
export type EnumTripCostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostStatus | Prisma.EnumTripCostStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostStatusFilter<$PrismaModel> | $Enums.TripCostStatus;
};
export type EnumTripCostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostType | Prisma.EnumTripCostTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostTypeWithAggregatesFilter<$PrismaModel> | $Enums.TripCostType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripCostTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripCostTypeFilter<$PrismaModel>;
};
export type EnumTripCostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostStatus | Prisma.EnumTripCostStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripCostStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripCostStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripCostStatusFilter<$PrismaModel>;
};
export type FloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedEnumLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel> | $Enums.LeadStatus;
};
export type NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadStatus | Prisma.EnumLeadStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.LeadStatus[] | Prisma.ListEnumLeadStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeadStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumLeadStatusFilter<$PrismaModel>;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedEnumSalesDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SalesDocStatus | Prisma.EnumSalesDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSalesDocStatusFilter<$PrismaModel> | $Enums.SalesDocStatus;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedEnumSalesDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SalesDocStatus | Prisma.EnumSalesDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SalesDocStatus[] | Prisma.ListEnumSalesDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSalesDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.SalesDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSalesDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSalesDocStatusFilter<$PrismaModel>;
};
export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel>;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalFilter<$PrismaModel>;
};
export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedEnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | Prisma.EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus;
};
export type NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | Prisma.EnumShipmentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ShipmentStatus[] | Prisma.ListEnumShipmentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumShipmentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumShipmentStatusFilter<$PrismaModel>;
};
export type NestedEnumProcurementDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementDocStatus | Prisma.EnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProcurementDocStatusFilter<$PrismaModel> | $Enums.ProcurementDocStatus;
};
export type NestedEnumProcurementDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementDocStatus | Prisma.EnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProcurementDocStatus[] | Prisma.ListEnumProcurementDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProcurementDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcurementDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProcurementDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProcurementDocStatusFilter<$PrismaModel>;
};
export type NestedEnumItemTrackingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemTrackingType | Prisma.EnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumItemTrackingTypeFilter<$PrismaModel> | $Enums.ItemTrackingType;
};
export type NestedEnumValuationMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ValuationMethod | Prisma.EnumValuationMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumValuationMethodFilter<$PrismaModel> | $Enums.ValuationMethod;
};
export type NestedEnumItemTrackingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemTrackingType | Prisma.EnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ItemTrackingType[] | Prisma.ListEnumItemTrackingTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumItemTrackingTypeWithAggregatesFilter<$PrismaModel> | $Enums.ItemTrackingType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumItemTrackingTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumItemTrackingTypeFilter<$PrismaModel>;
};
export type NestedEnumValuationMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ValuationMethod | Prisma.EnumValuationMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ValuationMethod[] | Prisma.ListEnumValuationMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumValuationMethodWithAggregatesFilter<$PrismaModel> | $Enums.ValuationMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumValuationMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumValuationMethodFilter<$PrismaModel>;
};
export type NestedEnumStockMoveTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMoveType | Prisma.EnumStockMoveTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumStockMoveTypeFilter<$PrismaModel> | $Enums.StockMoveType;
};
export type NestedEnumStockMoveTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockMoveType | Prisma.EnumStockMoveTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.StockMoveType[] | Prisma.ListEnumStockMoveTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumStockMoveTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockMoveType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumStockMoveTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumStockMoveTypeFilter<$PrismaModel>;
};
export type NestedEnumInventoryDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryDocStatus | Prisma.EnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryDocStatusFilter<$PrismaModel> | $Enums.InventoryDocStatus;
};
export type NestedEnumInventoryDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InventoryDocStatus | Prisma.EnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InventoryDocStatus[] | Prisma.ListEnumInventoryDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInventoryDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.InventoryDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInventoryDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInventoryDocStatusFilter<$PrismaModel>;
};
export type NestedEnumOpportunityStageFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityStage | Prisma.EnumOpportunityStageFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityStageFilter<$PrismaModel> | $Enums.OpportunityStage;
};
export type NestedEnumOpportunityStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OpportunityStage | Prisma.EnumOpportunityStageFieldRefInput<$PrismaModel>;
    in?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OpportunityStage[] | Prisma.ListEnumOpportunityStageFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOpportunityStageWithAggregatesFilter<$PrismaModel> | $Enums.OpportunityStage;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOpportunityStageFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOpportunityStageFilter<$PrismaModel>;
};
export type NestedEnumActivityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel> | $Enums.ActivityType;
};
export type NestedEnumActivityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityStatus | Prisma.EnumActivityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityStatusFilter<$PrismaModel> | $Enums.ActivityStatus;
};
export type NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityType | Prisma.EnumActivityTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityType[] | Prisma.ListEnumActivityTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActivityType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityTypeFilter<$PrismaModel>;
};
export type NestedEnumActivityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityStatus | Prisma.EnumActivityStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ActivityStatus[] | Prisma.ListEnumActivityStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumActivityStatusWithAggregatesFilter<$PrismaModel> | $Enums.ActivityStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumActivityStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumActivityStatusFilter<$PrismaModel>;
};
export type NestedEnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | Prisma.EnumCampaignStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus;
};
export type NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | Prisma.EnumCampaignStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CampaignStatus[] | Prisma.ListEnumCampaignStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumCampaignStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumCampaignStatusFilter<$PrismaModel>;
};
export type NestedEnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | Prisma.EnumTicketPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority;
};
export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | Prisma.EnumTicketStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus;
};
export type NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | Prisma.EnumTicketPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketPriority[] | Prisma.ListEnumTicketPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTicketPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTicketPriorityFilter<$PrismaModel>;
};
export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | Prisma.EnumTicketStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketStatus[] | Prisma.ListEnumTicketStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTicketStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTicketStatusFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedEnumNotificationChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel> | $Enums.NotificationChannel;
};
export type NestedEnumNotificationTemplateStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTemplateStatus | Prisma.EnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTemplateStatusFilter<$PrismaModel> | $Enums.NotificationTemplateStatus;
};
export type NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationChannelWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelFilter<$PrismaModel>;
};
export type NestedEnumNotificationTemplateStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationTemplateStatus | Prisma.EnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationTemplateStatus[] | Prisma.ListEnumNotificationTemplateStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationTemplateStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationTemplateStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationTemplateStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationTemplateStatusFilter<$PrismaModel>;
};
export type NestedEnumNotificationLogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationLogStatus | Prisma.EnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationLogStatusFilter<$PrismaModel> | $Enums.NotificationLogStatus;
};
export type NestedEnumNotificationLogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationLogStatus | Prisma.EnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationLogStatus[] | Prisma.ListEnumNotificationLogStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationLogStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationLogStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationLogStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationLogStatusFilter<$PrismaModel>;
};
export type NestedEnumNotificationChannelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumNotificationChannelNullableFilter<$PrismaModel> | $Enums.NotificationChannel | null;
};
export type NestedEnumNotificationScheduleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationScheduleStatus | Prisma.EnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationScheduleStatusFilter<$PrismaModel> | $Enums.NotificationScheduleStatus;
};
export type NestedEnumNotificationChannelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationChannel | Prisma.EnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    in?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.NotificationChannel[] | Prisma.ListEnumNotificationChannelFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumNotificationChannelNullableWithAggregatesFilter<$PrismaModel> | $Enums.NotificationChannel | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationChannelNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationChannelNullableFilter<$PrismaModel>;
};
export type NestedEnumNotificationScheduleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationScheduleStatus | Prisma.EnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.NotificationScheduleStatus[] | Prisma.ListEnumNotificationScheduleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumNotificationScheduleStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationScheduleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumNotificationScheduleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumNotificationScheduleStatusFilter<$PrismaModel>;
};
export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | Prisma.EnumAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType;
};
export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | Prisma.EnumAccountTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AccountType[] | Prisma.ListEnumAccountTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAccountTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAccountTypeFilter<$PrismaModel>;
};
export type NestedEnumWorkflowInstanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
};
export type NestedEnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowInstanceStatus | Prisma.EnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkflowInstanceStatus[] | Prisma.ListEnumWorkflowInstanceStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkflowInstanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowInstanceStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkflowInstanceStatusFilter<$PrismaModel>;
};
export type NestedEnumApprovalActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalAction | Prisma.EnumApprovalActionFieldRefInput<$PrismaModel>;
    in?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumApprovalActionFilter<$PrismaModel> | $Enums.ApprovalAction;
};
export type NestedEnumApprovalActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApprovalAction | Prisma.EnumApprovalActionFieldRefInput<$PrismaModel>;
    in?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ApprovalAction[] | Prisma.ListEnumApprovalActionFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumApprovalActionWithAggregatesFilter<$PrismaModel> | $Enums.ApprovalAction;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumApprovalActionFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumApprovalActionFilter<$PrismaModel>;
};
export type NestedEnumProductionDocStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionDocStatus | Prisma.EnumProductionDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionDocStatusFilter<$PrismaModel> | $Enums.ProductionDocStatus;
};
export type NestedEnumProductionDocStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductionDocStatus | Prisma.EnumProductionDocStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProductionDocStatus[] | Prisma.ListEnumProductionDocStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProductionDocStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductionDocStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProductionDocStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProductionDocStatusFilter<$PrismaModel>;
};
export type NestedEnumVehicleOwnershipTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleOwnershipType | Prisma.EnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleOwnershipTypeFilter<$PrismaModel> | $Enums.VehicleOwnershipType;
};
export type NestedEnumVehicleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel> | $Enums.VehicleStatus;
};
export type NestedEnumVehicleOwnershipTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleOwnershipType | Prisma.EnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleOwnershipType[] | Prisma.ListEnumVehicleOwnershipTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleOwnershipTypeWithAggregatesFilter<$PrismaModel> | $Enums.VehicleOwnershipType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVehicleOwnershipTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVehicleOwnershipTypeFilter<$PrismaModel>;
};
export type NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VehicleStatus | Prisma.EnumVehicleStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VehicleStatus[] | Prisma.ListEnumVehicleStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVehicleStatusWithAggregatesFilter<$PrismaModel> | $Enums.VehicleStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVehicleStatusFilter<$PrismaModel>;
};
export type NestedEnumDriverLicenseTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverLicenseType | Prisma.EnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverLicenseTypeFilter<$PrismaModel> | $Enums.DriverLicenseType;
};
export type NestedEnumDriverStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | Prisma.EnumDriverStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverStatusFilter<$PrismaModel> | $Enums.DriverStatus;
};
export type NestedEnumDriverLicenseTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverLicenseType | Prisma.EnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverLicenseType[] | Prisma.ListEnumDriverLicenseTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverLicenseTypeWithAggregatesFilter<$PrismaModel> | $Enums.DriverLicenseType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDriverLicenseTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDriverLicenseTypeFilter<$PrismaModel>;
};
export type NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DriverStatus | Prisma.EnumDriverStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DriverStatus[] | Prisma.ListEnumDriverStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDriverStatusWithAggregatesFilter<$PrismaModel> | $Enums.DriverStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDriverStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDriverStatusFilter<$PrismaModel>;
};
export type NestedEnumTripPlanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripPlanStatus | Prisma.EnumTripPlanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripPlanStatusFilter<$PrismaModel> | $Enums.TripPlanStatus;
};
export type NestedEnumTripPlanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripPlanStatus | Prisma.EnumTripPlanStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripPlanStatus[] | Prisma.ListEnumTripPlanStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripPlanStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripPlanStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripPlanStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripPlanStatusFilter<$PrismaModel>;
};
export type NestedEnumTripCheckpointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCheckpointType | Prisma.EnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCheckpointTypeFilter<$PrismaModel> | $Enums.TripCheckpointType;
};
export type NestedEnumTripCheckpointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCheckpointType | Prisma.EnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCheckpointType[] | Prisma.ListEnumTripCheckpointTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCheckpointTypeWithAggregatesFilter<$PrismaModel> | $Enums.TripCheckpointType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripCheckpointTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripCheckpointTypeFilter<$PrismaModel>;
};
export type NestedEnumDeliveryOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryOrderStatus | Prisma.EnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryOrderStatusFilter<$PrismaModel> | $Enums.DeliveryOrderStatus;
};
export type NestedEnumDeliveryPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryPriority | Prisma.EnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryPriorityFilter<$PrismaModel> | $Enums.DeliveryPriority;
};
export type NestedEnumDeliveryOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryOrderStatus | Prisma.EnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryOrderStatus[] | Prisma.ListEnumDeliveryOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryOrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeliveryOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeliveryOrderStatusFilter<$PrismaModel>;
};
export type NestedEnumDeliveryPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryPriority | Prisma.EnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryPriority[] | Prisma.ListEnumDeliveryPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryPriorityWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeliveryPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeliveryPriorityFilter<$PrismaModel>;
};
export type NestedEnumProofOfDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofOfDeliveryStatus | Prisma.EnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProofOfDeliveryStatusFilter<$PrismaModel> | $Enums.ProofOfDeliveryStatus;
};
export type NestedEnumProofOfDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProofOfDeliveryStatus | Prisma.EnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ProofOfDeliveryStatus[] | Prisma.ListEnumProofOfDeliveryStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumProofOfDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProofOfDeliveryStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumProofOfDeliveryStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumProofOfDeliveryStatusFilter<$PrismaModel>;
};
export type NestedEnumDeliveryExceptionReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryExceptionReason | Prisma.EnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryExceptionReasonFilter<$PrismaModel> | $Enums.DeliveryExceptionReason;
};
export type NestedEnumDeliveryExceptionReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryExceptionReason | Prisma.EnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    in?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DeliveryExceptionReason[] | Prisma.ListEnumDeliveryExceptionReasonFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDeliveryExceptionReasonWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryExceptionReason;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDeliveryExceptionReasonFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDeliveryExceptionReasonFilter<$PrismaModel>;
};
export type NestedEnumWavePickingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WavePickingStatus | Prisma.EnumWavePickingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWavePickingStatusFilter<$PrismaModel> | $Enums.WavePickingStatus;
};
export type NestedEnumWavePickingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WavePickingStatus | Prisma.EnumWavePickingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WavePickingStatus[] | Prisma.ListEnumWavePickingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWavePickingStatusWithAggregatesFilter<$PrismaModel> | $Enums.WavePickingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWavePickingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWavePickingStatusFilter<$PrismaModel>;
};
export type NestedEnumTripCostTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostType | Prisma.EnumTripCostTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostTypeFilter<$PrismaModel> | $Enums.TripCostType;
};
export type NestedEnumTripCostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostStatus | Prisma.EnumTripCostStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostStatusFilter<$PrismaModel> | $Enums.TripCostStatus;
};
export type NestedEnumTripCostTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostType | Prisma.EnumTripCostTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostType[] | Prisma.ListEnumTripCostTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostTypeWithAggregatesFilter<$PrismaModel> | $Enums.TripCostType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripCostTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripCostTypeFilter<$PrismaModel>;
};
export type NestedEnumTripCostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TripCostStatus | Prisma.EnumTripCostStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TripCostStatus[] | Prisma.ListEnumTripCostStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTripCostStatusWithAggregatesFilter<$PrismaModel> | $Enums.TripCostStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTripCostStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTripCostStatusFilter<$PrismaModel>;
};
export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
