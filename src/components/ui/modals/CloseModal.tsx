"use client";

import CloseIcon from "@/components/icons/CloseIcon";
import useModalStore from "@/store/store";

function CloseModal() {
  const { setModal } = useModalStore();
  return (
    <div
      className="cursor-pointer"
      onClick={() => setModal({ active: false, shown: null })}
    >
      <CloseIcon />
    </div>
  );
}

export default CloseModal;
