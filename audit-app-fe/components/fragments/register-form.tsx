"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function RegisterForm() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 border-[1px] rounded-[0.5rem]">
      <h1 className="text-2xl font-bold text-center">Registration</h1>
      <form className="flex flex-col items-center justify-center w-md mx-auto mt-4 space-y-4">
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button className="w-full">Submit</Button>
        <Button
          className="w-full"
          variant="outline"
          type="button"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
