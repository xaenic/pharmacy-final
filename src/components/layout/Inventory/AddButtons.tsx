"use client";

import AddIcon from "@/components/icons/AddIcon";
import { useModalStore } from "@/store/store";
import React from "react";

function AddButtons({ name }: { name: string }) {
  const { setModal } = useModalStore();
  return (
    <div className="flex items-center gap-1">
      <div
        onClick={() => {
          setModal({
            active: true,
            shown: name,
          });
        }}
        className=" flex items-center gap-1 text-white cursor-pointer bg-teal-500 text-xs  rounded-md p-2 px-2"
      >
        <AddIcon />
        <span>Add {name}</span>
      </div>
    </div>
  );
}

export default AddButtons;
