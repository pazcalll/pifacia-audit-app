"use client";

import { useEffect, useState } from "react";
import TablePagination from "../elements/table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TAudit } from "../types/audit";
import { getAudits } from "../api/authenticated/admin/get-audits";
import { toast } from "sonner";
import { TMeta } from "../types/api-response";

export default function TableAudit() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(2); // Replace with actual last page number
  const [audits, setAudits] = useState<TAudit[]>([]); // Replace with actual audit type
  const [selectedAudit, setSelectedAudit] = useState<TAudit | null>(null); // Replace with actual selected audit type

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await getAudits(currentPage); // Replace with actual API endpoint
        if ("code" in response) {
          toast(response.message, {
            style: {
              background: "red",
              color: "white",
            },
          });
          return;
        } else if ("data" in response) {
          setAudits(response.data as TAudit[]); // Assuming the API returns an array of audits
          setLastPage((response.meta as TMeta).last_page); // Assuming the API returns pagination info
        }
      } catch (error) {
        console.error("Error fetching audits:", error);
      }
    };
    fetchAudits();
  }, [currentPage]);

  return (
    <div>
      <Table className="border-[1px] border-gray-300 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">PIC</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Auditable Type</TableHead>
            <TableHead>Auditable ID</TableHead>
            <TableHead>Accessed URL</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.map((audit) => (
            <TableRow
              key={audit.id}
              onClick={() => setSelectedAudit(audit)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell className="font-medium">
                {(audit.user as { name?: string }).name}
              </TableCell>
              <TableCell>{audit.event}</TableCell>
              <TableCell>{audit.auditable_type}</TableCell>
              <TableCell>{audit.auditable_id}</TableCell>
              <TableCell>{audit.url}</TableCell>
              <TableCell>{audit.ip_address}</TableCell>
              <TableCell>{audit.created_at}</TableCell>
              <TableCell>{audit.updated_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center items-center mt-4">
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={lastPage} // Replace with actual last page number
        />
      </div>
    </div>
  );
}
