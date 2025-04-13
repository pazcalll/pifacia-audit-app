export type TApiMessage = {
  message: string;
};

export type TApiResponse<T> = TApiMessage & {
  data: T;
};

export type TApiErrorResponse = TApiMessage & {
  code: number | string;
};

export type TApiPaginationResponse<T> = {
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  data: T[];
};
