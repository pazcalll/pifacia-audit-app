"use server";

import { TAdmin } from "../types/admin";
import { TApiErrorResponse, TApiResponse } from "../types/api-response";
import { baseHeaders } from "../utils";
import dotenv from "dotenv";
import { cookies } from "next/headers";
dotenv.config();

export const adminLogin = async (
  email: string,
  password: string
): Promise<
  TApiResponse<{ admin: TAdmin; token: string }> | TApiErrorResponse
> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/admins/login`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    (await cookies()).set("token", jsonResponse.data.token);
    return jsonResponse as TApiResponse<{ admin: TAdmin; token: string }>;
  }

  const error = await response.json();
  error.code = response.status;

  return error as TApiErrorResponse;
};
