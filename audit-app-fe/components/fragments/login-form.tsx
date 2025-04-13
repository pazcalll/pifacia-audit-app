"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type TLoginForm = {
  registrationEndpoint?: string;
  title: string;
  caption: string;
};

export default function LoginForm({
  registrationEndpoint,
  title,
  caption,
}: TLoginForm) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 border-[1px] rounded-[0.5rem]">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <small>{caption}</small>
      <form className="flex flex-col items-center justify-center w-full max-w-sm mx-auto mt-4 space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
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
