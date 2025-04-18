"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEvent, useState } from "react";
import { userLogin } from "../api/user-login";
import { TApiErrorResponse, TApiResponse } from "../types/api-response";
import { TUser } from "../types/user";
import { toast } from "sonner";
import { TAdmin } from "../types/admin";
import { adminLogin } from "../api/admin-login";

type TLoginForm = {
  registrationEndpoint?: string;
  title: string;
  caption: string;
  loginAs: "user" | "admin";
};

export default function LoginForm({
  registrationEndpoint,
  title,
  caption,
  loginAs = "user",
}: TLoginForm) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response:
      | TApiResponse<
          { user: TUser; token: string } | { admin: TAdmin; token: string }
        >
      | TApiErrorResponse;
    if (loginAs === "user") {
      response = await userLogin(email, password);
      if (response?.data?.token) {
        router.push("/user");
        return;
      }
    } else {
      response = await adminLogin(email, password);
      if (response?.data?.token) {
        router.push("/admin");
        return;
      }
    }
    toast(response.message, {
      style: {
        background: "red",
        color: "white",
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 border-[1px] rounded-[0.5rem]">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <small>{caption}</small>
      <form
        className="flex flex-col items-center justify-center w-md mx-auto mt-4 space-y-4"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Email"
          onInput={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onInput={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full">Submit</Button>
        {registrationEndpoint ? (
          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.push(registrationEndpoint)}
            type="button"
          >
            Register
          </Button>
        ) : null}
      </form>
    </div>
  );
}
