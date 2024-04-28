"use client";

import AddIcon from "@/components/icons/AddIcon";
import { useModalStore } from "@/store/store";
import React from "react";

function AddButtons() {
  const { setModal } = useModalStore();
  return (
    <div className="flex items-center gap-1">
      <div
        onClick={() => {
          setModal({
            active: true,
            shown: "Product",
          });
        }}
        className=" flex items-center gap-1 text-white cursor-pointer bg-teal-500 text-xs  rounded-md p-2 px-2"
      >
        <AddIcon />
        <span>Add Product</span>
      </div>
    </div>
  );
}

export default AddButtons;
