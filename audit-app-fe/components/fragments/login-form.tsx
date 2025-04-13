"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type TLoginForm = {
  title: string;
  caption: string;
};

export default function LoginForm({ title, caption }: TLoginForm) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 border-[1px] rounded-[0.5rem]">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <small>{caption}</small>
      <form className="flex flex-col items-center justify-center w-full max-w-sm mx-auto mt-4 space-y-4">
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Login</Button>
        <Button className="w-full" variant="outline">
          Register
        </Button>
      </form>
    </div>
  );
}
