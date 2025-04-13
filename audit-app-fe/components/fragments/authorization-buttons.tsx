"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function AuthorizationButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[22rem] gap-[12px] flex justify-between">
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => router.push("/auth/admin")}
        >
          Admin
        </Button>
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => router.push("/auth/user")}
        >
          Staff
        </Button>
      </div>
    </div>
  );
}
