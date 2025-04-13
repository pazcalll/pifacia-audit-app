"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import TableItems from "./table-items";
import { TItem } from "../types/item";
import { createInvoice } from "../api/authenticated/user/createInvoice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddInvoiceForm() {
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [item, setItem] = useState<TItem | null>(null);
  const [transferEvidence, setTransferEvidence] = useState<File | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await createInvoice(
      code,
      transferEvidence as File,
      item as TItem,
      quantity
    );

    if ("code" in response) {
      toast(response.message, {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    } else if ("data" in response) {
      toast("Invoice created successfully", {
        style: {
          background: "green",
          color: "white",
        },
      });
      router.push("/user");
    } else {
      toast("An error occurred", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="border-[1px] border-gray-300 rounded-md p-4 w-[30rem]">
      <h1 className="text-2xl font-bold text-center">Add Invoice</h1>
      <form
        className="flex flex-col items-center justify-center w-md mx-auto mt-4 space-y-4"
        onSubmit={handleSubmit}
      >
        <ItemsDialog setParentItem={setItem} />
        <Input
          type="string"
          placeholder="Code"
          onInput={(e) => setCode(e.target.value)}
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Quantity"
          onInput={(e) => setQuantity(e.target.value)}
          className="w-full"
        />
        <Input
          type="file"
          placeholder="Transfer Evidence"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setTransferEvidence(e.target.files[0]); // Set the selected file to state
            }
          }}
        />
        <Button className="w-full">Submit</Button>
      </form>
    </div>
  );
}

function ItemsDialog({
  setParentItem,
}: {
  setParentItem: React.Dispatch<React.SetStateAction<TItem | null>>;
}) {
  const [item, setItem] = useState<TItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setParentItem(item);
  }, [item]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Item: {item?.name || "Select an item"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select an item</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <TableItems setItem={setItem} setDialogOpen={setDialogOpen} />
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
