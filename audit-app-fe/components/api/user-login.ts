"use server";

import { TApiErrorResponse, TApiResponse } from "../types/api-response";
import dotenv from "dotenv";
import { baseHeaders } from "../utils";
import { TUser } from "../types/user";
import { cookies } from "next/headers";

dotenv.config();

export const userLogin = async (
  email: string,
  password: string
): Promise<
  TApiResponse<{ user: TUser; token: string }> | TApiErrorResponse
> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/users/login`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    const jsonResponse: TApiResponse<{ user: TUser; token: string }> =
      await response.json();
    (await cookies()).set("token", jsonResponse.data.token);

    return jsonResponse;
  }

  const error = await response.json();
  error.code = response.status;

  return error as TApiErrorResponse;
};
