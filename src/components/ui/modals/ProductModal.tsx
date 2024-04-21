"use client";
import { useFormState } from "react-dom";
import CloseModal from "./CloseModal";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useModalStore from "@/store/store";
import { addNewCategory, addNewProduct } from "@/lib/action";
import Button from "../Forms/Button";
import CategoryOptions from "../Forms/CategoryOptions";

function ProductModal() {
  const { setModal } = useModalStore();
  const [state, formAction] = useFormState(addNewProduct, {
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
        router.refresh();
      }
    }
  }, [state, router]);
  return (
    <div className=" bg-black bg-opacity-5  text-gray-600 absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center">
      <form
        ref={form}
        action={formAction}
        className="bg-white z-10 py-5 px-7  rounded-md shadow-lg flex flex-col gap-5"
      >
        <div className="flex justify-between gap-10 items-center">
          <h1 className="text-sm font-semibold">New Product</h1>
          <CloseModal />
        </div>
        <div className="  flex gap-2 items-end justify-start">
          <div className="w-24 h-24 border border-dashed border-blue-500 rounded-lg"></div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xs text-blue-500 font-semibold">Image URL</h1>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="image"
                type="text"
                placeholder="Enter product image url"
                className="text-sm bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
        {state?.errors?.name.map((e: string) => (
          <span className="text-red-600 text-sm" key={e}>
            {e}
          </span>
        )) ?? null}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm my-auto">Product Name</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="product_name"
                type="text"
                className="text-sm bg-transparent outline-none"
                placeholder="Enter product name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm my-auto">Product Code</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="code"
                type="number"
                placeholder="Enter product code"
                className="text-sm bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm my-auto">Buying Price</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="price"
                type="number"
                placeholder="Enter product price"
                className="text-sm bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm my-auto">Brand</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="brand"
                type="text"
                placeholder="Enter product brand"
                className="text-sm bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm my-auto">Quantity</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="quantity"
                type="number"
                placeholder="Enter product quantity"
                className="text-sm bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <h2 className="text-sm my-auto">Category</h2>
            <select
              name="category"
              className="border border-gray-200 text-slate-400 text-sm p-2 rounded-md"
            >
              <option
                value="Java"
                className="text-slate-300"
                disabled
                defaultValue={"Java"}
                hidden
              >
                Choose Category
              </option>
              <CategoryOptions />
            </select>
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
            <Button color="bg-blue-500" name="Add Product" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductModal;
