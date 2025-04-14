import TableAudit from "@/components/fragments/table-audit";
import Link from "next/link";
import dotenv from "dotenv";
dotenv.config();

export default function Page() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Link
        href={`${process.env.BACKEND_URL}/api/invoices/export`}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Download Invoices Excel File
      </Link>
      <TableAudit />
    </div>
  );
}
