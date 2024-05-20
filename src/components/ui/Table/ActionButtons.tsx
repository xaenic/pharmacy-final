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
            shown:
              reference == "Product"
                ? "Edit"
                : "Transaction"
                ? "EditTransaction"
                : "EditCategory",
            id: id,
          })
        }
      >
        <EditIcon className="cursor-pointer w-4 h-4 " />
      </div>

      {reference != "Transaction" ? (
        <div
          onClick={() =>
            setModal({
              active: true,
              shown: reference == "Product" ? "Delete" : "DeleteCategory",
              id: id,
              name: name,
            })
          }
        >
          <DeleteIcon className="cursor-pointer w-4 h-4 " />
        </div>
      ) : null}

      {reference == "Product" ? (
        <Link href={`/admin/view/${id}`}>
          <ViewIcon className="cursor-pointer w-4 h-4 " />
        </Link>
      ) : reference == "Transaction" ? (
        <Link href={`/admin/transactions/view/${id}`}>
          <ViewIcon className="ml-2 cursor-pointer w-4 h-4 " />
        </Link>
      ) : null}
    </div>
  );
}

export default ActionButtons;
