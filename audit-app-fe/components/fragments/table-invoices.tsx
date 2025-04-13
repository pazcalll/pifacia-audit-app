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
import { TInvoice } from "../types/invoice";
import { getInvoices } from "../api/authenticated/get-invoices";
import {
  TApiErrorResponse,
  TApiPaginationResponse,
} from "../types/api-response";
import { toast } from "sonner";

export default function TableInvoices() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(2); // Replace with actual last page number
  const [invoices, setInvoices] = useState<TInvoice[]>([]); // Replace with actual invoice type

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response: TApiPaginationResponse<TInvoice> | TApiErrorResponse =
          await getInvoices(currentPage);
        if ("code" in response) {
          toast(response.message, {
            style: {
              background: "red",
              color: "white",
            },
          });
          return;
        }
        console.log(response);
        setInvoices(response.data); // Assuming the API returns an array of invoices
        setLastPage(response.meta?.last_page); // Assuming the API returns pagination info
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, [currentPage]);

  return (
    <div>
      <Table className="border-[1px] border-gray-300 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Code</TableHead>
            <TableHead>Transfer Evidence</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.code}>
              <TableCell className="font-medium">{invoice.code}</TableCell>
              <TableCell>{invoice.transfer_evidence_url}</TableCell>
              <TableCell className="text-right">
                {invoice.total_price}
              </TableCell>
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
