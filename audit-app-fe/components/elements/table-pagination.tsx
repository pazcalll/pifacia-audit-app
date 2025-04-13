"use client";

import { Button } from "../ui/button";

export type TTablePagination = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number;
};

export default function TablePagination({
  currentPage,
  setCurrentPage,
  lastPage,
}: TTablePagination) {
  return (
    <div className="flex w-[18rem] justify-center items-center gap-x-2">
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      {currentPage} / {lastPage}
      <Button
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
