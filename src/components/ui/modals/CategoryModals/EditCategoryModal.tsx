"use client";
import { useFormState } from "react-dom";
import CloseModal from "../CloseModal";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import {
  addNewCategory,
  addNewProduct,
  updateNewCategory,
  updateNewProduct,
} from "@/lib/action";
import Button from "../../Forms/Button";
import { getCategoryById, getProductById } from "@/lib/db/db";
import Image from "next/image";
import toast from "react-hot-toast";
import { ClipLoader, FadeLoader } from "react-spinners";
import { motion } from "framer-motion";
function EditCategoryModal({
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
        toast.success("Successfully updated ");
        router.refresh();
      }
    }
  }, [state, router, setModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const ok = await getCategoryById(id);
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
            <h1 className="text-xs font-semibold">Update Category</h1>
            <CloseModal />
          </div>

          {state?.errors?.name.map((e: string) => (
            <span className="text-red-600 text-xs" key={e}>
              {e}
            </span>
          )) ?? null}
          <div className="grid grid-cols-3  gap-2">
            <div className="gap-2 col-span-3 flex flex-col">
              <h2 className="text-xs my-auto">Category Name</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="category_name"
                  type="text"
                  defaultValue={product?.category_name}
                  className="text-xs bg-transparent outline-none w-full"
                  placeholder="Enter product name"
                />
                <input
                  name="id"
                  type="hidden"
                  defaultValue={product?.category_id}
                />
              </div>
            </div>

            <div className="w-full col-span-3 flex flex-col gap-2">
              <h2 className="text-xs my-auto">Capacity</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="capacity"
                  type="number"
                  defaultValue={product?.capacity}
                  placeholder="Enter product code"
                  className="text-xs bg-transparent outline-none w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button color="bg-teal-500" name="Update Category" />
              <span
                onClick={() =>
                  setModal({
                    active: false,
                    shown: null,
                  })
                }
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

export default EditCategoryModal;
