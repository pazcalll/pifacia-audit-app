"use server";
import {
  TApiErrorResponse,
  TApiPaginationResponse,
} from "@/components/types/api-response";
import { TAudit } from "@/components/types/audit";
import { baseHeaders } from "@/components/utils";
import dotenv from "dotenv";
import { cookies } from "next/headers";

dotenv.config();

export const getAudits = async (
  currentPage: number
): Promise<Partial<TApiPaginationResponse<TAudit> | TApiErrorResponse>> => {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/audits?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...baseHeaders,
      },
    }
  );

  if (!res.ok) {
    const errorResponse: TApiErrorResponse = await res.json();
    errorResponse.code = res.status;
    return errorResponse;
  }

  const data: TApiPaginationResponse<TAudit> = await res.json();

  return data;
};
