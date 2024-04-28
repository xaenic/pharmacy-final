"use client";

import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import ViewIcon from "@/components/icons/ViewIcon";
import { useModalStore } from "@/store/store";
import Link from "next/link";

function ActionButtons({
  id,
  name,
  reference = "Product",
}: {
  id: string;
  name: string;
  reference: string;
}) {
  const { setModal } = useModalStore();
  return (
    <div className="flex items-center">
      <div
        onClick={() =>
          setModal({
            active: true,
            shown: reference == "Product" ? "Edit" : "EditCategory",
            id: id,
          })
        }
      >
        <EditIcon className="cursor-pointer w-4 h-4 " />
      </div>
      <div
        onClick={() =>
          setModal({
            active: true,
            shown: reference == "Product" ? "Edit" : "DeleteCategory",
            id: id,
            name: name,
          })
        }
      >
        <DeleteIcon className="cursor-pointer w-4 h-4 " />
      </div>
      <Link href={`/admin/view/${id}`}>
        <ViewIcon className="cursor-pointer w-4 h-4 " />
      </Link>
    </div>
  );
}

export default ActionButtons;
