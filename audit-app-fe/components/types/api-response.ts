export type TApiMessage = {
  message: string;
};

export type TApiResponse<T> = TApiMessage & {
  data: T;
};

export type TApiErrorResponse = TApiMessage & {
  code: number | string;
};

export type TMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type TApiPaginationResponse<T> = {
  meta: TMeta;
  data: T[];
};
