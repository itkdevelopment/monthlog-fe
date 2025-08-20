export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type Meta = Pagination; 

export interface ApiResponse<T, K = undefined> {
  status: string;
  message: string;
  data?: T;
  meta?: Meta;
  error?: {
    code: string;
    details: K extends undefined ? unknown : K;
  };
}

export type PaginationParams = Pick<Pagination, "page" | "limit">;
