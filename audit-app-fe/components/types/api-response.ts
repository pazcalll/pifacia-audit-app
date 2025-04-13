export type TApiMessage = {
  message: string;
};

export type TApiResponse<T> = TApiMessage & {
  data: T;
};

export type TApiErrorResponse = TApiMessage;
