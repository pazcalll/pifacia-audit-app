import UserHeader from "@/components/fragments/user-header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token");
  if (!token) redirect("/");

  return (
    <div className="w-full md:w-[calc(100vw-4rem)] lg:w-[calc(100vw-6rem)] h-screen">
      <div className="w-full flex justify-center">
        <UserHeader />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
