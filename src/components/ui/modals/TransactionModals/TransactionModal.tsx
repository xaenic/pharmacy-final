"use client";
import { useFormState } from "react-dom";
import CloseModal from "../CloseModal";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import { setTransactionStatus, updateNewCategory } from "@/lib/action";

import toast from "react-hot-toast";
import { ClipLoader, FadeLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
function TransactionModal({
  id,
  categories,
}: {
  id: string | null;
  categories: any;
}) {
  const { setModal } = useModalStore();
  const [state, formAction] = useFormState(updateNewCategory, {
    message: "",
    errors: {
      name: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const form = useRef(null);
  const router = useRouter();

  const statusHandler = async () => {
    if (id != null) await setTransactionStatus(parseInt(id), status);
    toast.success("Status updated successfully!");
    setModal({
      active: false,
      shown: null,
    });
    router.refresh();
  };
  const city = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="z-50  p-4 lg:pl-64  lg:pt-5 bg-black bg-opacity-5 fixed text-gray-600  top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    >
      {loading ? (
        <ClipLoader color="#0EA5E9" size={24} />
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          ref={form}
          action={formAction}
          className="bg-white z-10 py-5 px-7  rounded-md shadow-lg flex flex-col gap-5 "
        >
          <div className="flex justify-between gap-10 items-center">
            <div>
              <h1 className="text-xs font-semibold">Update Status</h1>
              <small>
                Transaction ID: <span className="text-sky-500">#{id}</span>
              </small>
            </div>

            <CloseModal />
          </div>

          {state?.errors?.name.map((e: string) => (
            <span className="text-red-600 text-xs" key={e}>
              {e}
            </span>
          )) ?? null}
          <div className="grid grid-cols-3  gap-2">
            <div className="gap-2 col-span-3 flex flex-col">
              <h2 className="text-xs my-auto">Set Status</h2>
              <Select
                size="sm"
                className="w-full"
                onChange={(e: any) => setStatus(e.target.value)}
              >
                {city.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button size="sm" color="primary" onClick={statusHandler}>
                Update Status
              </Button>
              <span
                onClick={() => {
                  setModal({
                    active: false,
                    shown: null,
                  });
                }}
                className="cursor-pointer border border-gray-200 p-2 rounded-md text-xs"
              >
                Discard
              </span>
            </div>
            <div></div>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
}

export default TransactionModal;
