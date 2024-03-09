export interface IQueryBuilderPaginatedResponse<T> {
    total_data: number;
    total_page
    page: number;
    data: T[];
}