"use server";

import {
  TApiErrorResponse,
  TApiPaginationResponse,
} from "../types/api-response";
import { TItem } from "../types/item";
import { baseHeaders } from "../utils";
import dotenv from "dotenv";

dotenv.config();

export const getItems = async (
  currentPage: number
): Promise<TApiPaginationResponse<TItem> | TApiErrorResponse> => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/items?page=${currentPage}`,
    {
      method: "GET",
      headers: baseHeaders,
    }
  );

  if (!response.ok) {
    const errorResponse: TApiErrorResponse = await response.json();
    errorResponse.code = response.status;
    return errorResponse;
  }

  const data: TApiPaginationResponse<TItem> = await response.json();
  return data;
};
