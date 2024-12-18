"use client";
import { useFormState } from "react-dom";
import CloseModal from "./CloseModal";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import { addNewCategory } from "@/lib/action";
import Button from "../Forms/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
function CategoryModal() {
  const { setModal } = useModalStore();
  const [state, formAction] = useFormState(addNewCategory, {
    message: "",
    errors: {
      name: [],
    },
  });

  const form = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (form.current) {
      if (state?.message == "Success") {
        const ok = form?.current as any;
        ok.reset();
        setModal({
          active: false,
          shown: null,
        });
        toast.success("Successfully added ✅");
        router.refresh();
      }
    }
  }, [state, router, setModal]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" p-4 lg:ml-64  lg:pt-5 bg-black bg-opacity-5 fixed  text-gray-600  top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center"
    >
      <form
        ref={form}
        action={formAction}
        className="bg-white z-10 py-5 px-7  rounded-md shadow-lg flex flex-col gap-5"
      >
        <div className="flex justify-between gap-10 items-center">
          <h1 className="text-sm font-semibold">New Category</h1>
          <CloseModal />
        </div>
        {/* <div className="  flex gap-2 items-center justify-center">
          <div className="w-24 h-24 border border-dashed border-blue-500 rounded-lg"></div>
          <h1 className="text-xs text-blue-500 font-semibold">Browse Image</h1>
        </div> */}
        {state?.errors?.name.map((e: string) => (
          <span className="text-red-600 text-sm" key={e}>
            {e}
          </span>
        )) ?? null}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm">Category Name</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="category_name"
                type="text"
                className="bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm">Max Capacity</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="capacity"
                type="number"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div></div>
          <div className="flex gap-2">
            <span
              onClick={() =>
                setModal({
                  active: false,
                  shown: null,
                })
              }
              className="cursor-pointer border border-gray-200 p-2 rounded-md text-sm"
            >
              Discard
            </span>
            <Button color="bg-blue-500" name="Add Category" />
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default CategoryModal;
