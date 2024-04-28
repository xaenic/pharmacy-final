"use client";
import { useFormState } from "react-dom";
import CloseModal from "./CloseModal";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import { addNewCategory, addNewProduct, updateNewProduct } from "@/lib/action";
import Button from "../Forms/Button";
import CategoryOptions from "../Forms/CategoryOptions";
import { getProductById } from "@/lib/db/db";
import Image from "next/image";
import toast from "react-hot-toast";
import { ClipLoader, FadeLoader } from "react-spinners";
import { motion } from "framer-motion";
function EditModal({ id, categories }: { id: string | null; categories: any }) {
  const { setModal } = useModalStore();
  const [state, formAction] = useFormState(updateNewProduct, {
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
        toast.success("Successfully updated ✅");
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
      className="z-50  p-4 lg:pl-64  lg:pt-5 bg-black bg-opacity-5 fixed text-gray-600  top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    >
      {loading ? (
        <ClipLoader color="#0EA5E9" size={14} />
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
            <h1 className="text-xs font-semibold">Update Product {id}</h1>
            <CloseModal />
          </div>
          <div className="  flex gap-2 items-end justify-start">
            <div className="w-24 h-24 border border-dashed border-blue-500 rounded-lg">
              {product ? (
                <Image
                  width={32}
                  height={32}
                  src={product?.image}
                  alt="Avatar"
                  unoptimized={true}
                  className="rounded-md h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-xs text-blue-500 font-semibold">Image URL</h1>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2 w-full">
                <input
                  name="image"
                  type="text"
                  defaultValue={product?.image}
                  placeholder="Enter product image url"
                  className="text-xs bg-transparent outline-none w-full"
                />
                <input type="hidden" name="id_number" value={product?.id} />
              </div>
            </div>
          </div>
          {state?.errors?.name.map((e: string) => (
            <span className="text-red-600 text-xs" key={e}>
              {e}
            </span>
          )) ?? null}
          <div className="grid grid-cols-2  gap-2">
            <div className="gap-2 flex flex-col">
              <h2 className="text-xs my-auto">Product Name</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="product_name"
                  type="text"
                  defaultValue={product?.product_name}
                  className="text-xs bg-transparent outline-none w-full"
                  placeholder="Enter product name"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Product Code</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="code"
                  type="number"
                  defaultValue={product?.code}
                  placeholder="Enter product code"
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Buying Price</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="price"
                  type="number"
                  placeholder="Enter product price"
                  defaultValue={product?.price}
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Manufacturer</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="manufacturer"
                  type="text"
                  placeholder="Enter product brand"
                  defaultValue={product?.manufacturer}
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Generic Name</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="brand"
                  type="text"
                  placeholder="Enter generic name"
                  defaultValue={product?.brand}
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Quantity</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="quantity"
                  type="number"
                  placeholder="Enter product quantity"
                  defaultValue={product?.quantity}
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Product Type</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="type"
                  type="text"
                  placeholder="Enter product type"
                  defaultValue={product?.type}
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Category</h2>
              <select
                defaultValue={product?.category_id}
                name="category"
                className="border border-gray-200 text-slate-400 text-xs p-2 rounded-md"
              >
                <option value="Java" className="text-slate-300" disabled hidden>
                  Choose Category
                </option>
                {categories?.map((e: any, i: number) => (
                  <option value={e.category_id} key={i}>
                    {e.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
              <h2 className="text-xs my-auto">Description</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <textarea
                  name="description"
                  className="text-xs bg-transparent outline-none w-full"
                  rows={4}
                  cols={50}
                  placeholder="Enter product description"
                  defaultValue={product?.description}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button color="bg-teal-500" name="Update Product" />
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

export default EditModal;
