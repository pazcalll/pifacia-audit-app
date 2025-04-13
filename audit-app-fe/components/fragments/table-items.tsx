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
import { getItems } from "../api/items";
import { toast } from "sonner";
import { TItem } from "../types/item";

export default function TableItems({
  setItem,
  setDialogOpen,
}: {
  setItem?: React.Dispatch<React.SetStateAction<TItem | null>>;
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(2); // Replace with actual last page number
  const [items, setItems] = useState<TItem[]>([]); // Replace with actual items data

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems(currentPage); // Replace with actual API endpoint
        if ("code" in response) {
          toast(response.message, {
            style: {
              background: "red",
              color: "white",
            },
          });
          return;
        } else if ("data" in response) {
          setItems(response.data); // Assuming the API returns an array of items
          setLastPage(response.meta.last_page); // Assuming the API returns pagination info
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [currentPage]);

  const handleRowClick = (item: TItem) => {
    if (setItem && setDialogOpen) {
      setItem(item);
      setDialogOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Table className="border-[1px] border-gray-300 rounded-md w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => handleRowClick(item)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
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
