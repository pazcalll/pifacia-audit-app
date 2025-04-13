"use client";

import { Button } from "../ui/button";

export default function BackButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <Button className="cursor-pointer" variant={"link"} onClick={handleBack}>
      Back
    </Button>
  );
}
