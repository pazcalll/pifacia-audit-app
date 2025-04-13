"use server";

import {
  TApiErrorResponse,
  TApiPaginationResponse,
} from "@/components/types/api-response";
import { TInvoice } from "@/components/types/invoice";
import { baseHeaders } from "@/components/utils";
import { cookies } from "next/headers";
import "dotenv";

export const getInvoices = async (
  currentPage: number
): Promise<TApiPaginationResponse<TInvoice> | TApiErrorResponse> => {
  const token = (await cookies()).get("token")?.value;
  console.log(token);
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/invoices?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorResponse: TApiErrorResponse = await response.json();
    errorResponse.code = response.status;
    return errorResponse;
  }

  const data: TApiPaginationResponse<TInvoice> = await response.json();
  return data;
};
