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
import moment from "moment";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

export default function TableAudit() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(2); // Replace with actual last page number
  const [audits, setAudits] = useState<TAudit[]>([]); // Replace with actual audit type
  const [selectedAudit, setSelectedAudit] = useState<TAudit | null>(null); // Replace with actual selected audit type

  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
    <div className="max-w-[100vw] md:max-w-[100rem] overflow-auto">
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
              onClick={() => {
                setSelectedAudit(audit);
                setOpenDialog(true);
              }}
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
              <TableCell>
                {moment
                  .parseZone(audit.created_at)
                  .format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>
                {moment
                  .parseZone(audit.updated_at)
                  .format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AuditDialog
        audit={selectedAudit as TAudit}
        open={openDialog}
        setOpen={setOpenDialog}
      />
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

function AuditDialog({
  audit,
  open,
  setOpen,
}: {
  audit: TAudit;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  if (!audit) return null; // Return null if audit is not available

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Audit Detail</DialogTitle>
        </DialogHeader>
        <div className="space-x-2">
          <div className="w-sm my-1">
            <Label className="text-sm font-medium">PIC</Label>
            <Input
              type="text"
              value={(audit?.user as { name?: string }).name || ""}
              readOnly
              className="w-full"
            />
          </div>
          <div className="w-sm my-1">
            <Label className="text-sm font-medium">Auditable Type</Label>
            <Input
              type="text"
              value={audit?.auditable_type || ""}
              readOnly
              className="w-full"
            />
          </div>
          <div className="w-sm my-1">
            <Label className="text-sm font-medium">Auditable ID</Label>
            <Input
              type="text"
              value={audit?.auditable_id || ""}
              readOnly
              className="w-full"
            />
          </div>
          <div className="w-sm my-1">
            <Label className="text-sm font-medium">Old Data</Label>
            <pre className="bg-gray-200 rounded-md overflow-auto">
              {JSON.stringify(audit?.old_values, null, 2)}
            </pre>
          </div>
          <div className="w-sm my-1">
            <Label className="text-sm font-medium">New Data</Label>
            <pre className="bg-gray-200 rounded-md overflow-auto">
              {JSON.stringify(audit?.new_values, null, 2)}
            </pre>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
