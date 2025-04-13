"use server";

import { cookies } from "next/headers";
import dotenv from "dotenv";
dotenv.config();

export const logout = async (): Promise<boolean> => {
  const token = (await cookies()).get("token")?.value;
  const res = await fetch(`${process.env.BACKEND_URL}/api/users/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    (await cookies()).delete("token");
    return true;
  }
  console.log("failed");
  return false;
};
