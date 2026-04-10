export enum CategoryStatus{
    Occupied = "Occupied",
    Limited = "Limited",
    Vacant = "Vacant",
    Disabled = "Disabled",
}

export type CalendarStatusMap = Record<string, Record<number, CategoryStatus>>;