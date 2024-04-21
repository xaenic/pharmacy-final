"use client";

import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import useModalStore from "@/store/store";

function ActionButtons({ id, name }: { id: string; name: string }) {
  const { setModal } = useModalStore();
  return (
    <div className="flex items-center">
      <div
        onClick={() =>
          setModal({
            active: true,
            shown: "Edit",
            id: id,
          })
        }
      >
        <EditIcon className="w-5 h-5 text-blue-500" />
      </div>
      <div
        onClick={() =>
          setModal({
            active: true,
            shown: "Delete",
            id: id,
            name: name,
          })
        }
      >
        <DeleteIcon className="w-5 h-5 text-red-500" />
      </div>
    </div>
  );
}

export default ActionButtons;
