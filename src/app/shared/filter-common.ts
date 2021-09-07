export interface IFilterCommon {
    filter: string;
    orderBy: string;
    ascending: boolean;
    page: number;
    pageSize: number;
    totalRows:number
}