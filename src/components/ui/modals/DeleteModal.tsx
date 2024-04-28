"use client";
import { useFormState } from "react-dom";
import CloseModal from "./CloseModal";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import {
  addNewCategory,
  addNewProduct,
  deleteNewProduct,
  updateNewProduct,
} from "@/lib/action";
import Button from "../Forms/Button";
import CategoryOptions from "../Forms/CategoryOptions";
import { getProductById } from "@/lib/db/db";
import Image from "next/image";
import toast from "react-hot-toast";
import { ClipLoader, FadeLoader } from "react-spinners";

import { motion } from "framer-motion";
function DeleteModal({ id }: { id: string | null }) {
  const { setModal, name } = useModalStore();
  const [state, formAction] = useFormState(deleteNewProduct, {
    message: "",
    errors: {
      name: [],
    },
  });

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
        toast.success("Successfully deleted 🗑️");
        router.refresh();
      }
    }
  }, [state, router, setModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const ok = await getProductById(id);
        setProduct(ok);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData immediately

    // Specify dependencies: id and getProductById
  }, [id]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className=" z-50 p-4 lg:pl-64  lg:pt-5 bg-black bg-opacity-5 fixed  text-gray-600  top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    >
      {loading ? (
        <ClipLoader color="#0EA5E9" size={24} />
      ) : (
        <motion.form
          ref={form}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          action={formAction}
          className="bg-white z-10 py-5 px-7  rounded-md shadow-lg flex flex-col gap-5"
        >
          <div className="flex justify-center gap-10 items-center">
            <h1 className="text-sm font-semibold text-center">
              Delete Product <span className="text-blue-500">{name}?</span>
            </h1>
          </div>
          <div className="  flex gap-2 items-end justify-center">
            <div className="w-24 h-24 border border-dashed border-blue-500 rounded-lg">
              {product ? (
                <Image
                  width={32}
                  height={32}
                  src={product?.image}
                  alt="Avatar"
                  unoptimized={true}
                  className="rounded-md h-full w-full"
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <input type="hidden" name="id_number" value={product?.id} />
            </div>
          </div>
          {state?.errors?.name.map((e: string) => (
            <span className="text-red-600 text-sm" key={e}>
              {e}
            </span>
          )) ?? null}

          <div className="flex justify-between">
            <div></div>
            <div className="flex gap-2">
              <Button color="bg-rose-700" name="Delete" />
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
            </div>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
}

export default DeleteModal;
