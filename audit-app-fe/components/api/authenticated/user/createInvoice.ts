"use server";

import {
  TApiErrorResponse,
  TApiResponse,
} from "@/components/types/api-response";
import { TInvoice } from "@/components/types/invoice";
import { TItem } from "@/components/types/item";
import dotenv from "dotenv";
import { cookies } from "next/headers";
dotenv.config();

export const createInvoice = async (
  code: string,
  transferEvidence: File,
  item: TItem,
  quantity: number
): Promise<TApiResponse<TInvoice> | TApiErrorResponse> => {
  const formData = new FormData();
  formData.append("code", code);
  formData.append("transfer_evidence", transferEvidence);
  formData.append("invoice_items[0][item_id]", item.id);
  formData.append("invoice_items[0][item_quantity]", quantity.toString());

  console.log("Form Data:", formData.get("code"));
  console.log("Form Data:", formData.get("transfer_evidence"));
  console.log("Form Data:", formData.get("invoice_items[0][item_id]"));
  console.log("Form Data:", formData.get("invoice_items[0][item_quantity]"));

  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/invoices`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    errorResponse.code = response.status;
    console.log("Error Response:", errorResponse);
    return errorResponse as TApiErrorResponse;
  }

  const data: TApiResponse<TInvoice> = await response.json();
  return data;
};
