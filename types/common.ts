export interface Paginated {
  totalCount: number;
  totalPages: number;
  page: number;
}

export type SortOrder = 'asc' | 'desc';

export interface ListParams {
  page?: number;
  limit?: number;
  sortOrder?: SortOrder;
}
