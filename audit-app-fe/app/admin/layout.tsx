import { baseHeaders } from "@/components/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dotenv from "dotenv";
import AdminHeader from "@/components/fragments/admin-header";

dotenv.config();

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token");
  if (!token) redirect("/");

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/admins/profile`,
    {
      method: "GET",
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  if (!response.ok) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen">
      <div className="w-full flex justify-center">
        <AdminHeader />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
