"use client";

import AddIcon from "@/components/icons/AddIcon";
import useModalStore from "@/store/store";
import React from "react";

function AddButtons() {
  const { setModal } = useModalStore();
  return (
    <div className="flex items-center gap-2">
      <div
        className="cursor-pointer hover:bg-blue-400 transition-colors duration-200     bg-blue-600 rounded-md flex items-center px-3 p-3 gap-2"
        onClick={() => {
          setModal({
            active: true,
            shown: "Product",
          });
        }}
      >
        <AddIcon />
        <button className=" text-white text-sm">Product</button>
      </div>
      <div
        onClick={() => {
          setModal({
            active: true,
            shown: "Category",
          });
        }}
        className="cursor-pointer hover:bg-green-400 transition-colors duration-200     bg-green-600 rounded-md flex items-center px-3 p-3 gap-2"
      >
        <AddIcon />
        <button className=" text-white text-sm">Category</button>
      </div>
    </div>
  );
}

export default AddButtons;
