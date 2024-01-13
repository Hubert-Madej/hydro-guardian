export interface PaginationDetails<T> {
  data: T[];
  metadata: PaginationMetadata;
}

export interface PaginationMetadata {
  page: number;
  take: number;
  itemsCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const initialPaginationState = {
  // @ts-ignore
  data: [],
  metadata: {
    page: 0,
    take: 0,
    itemsCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};
