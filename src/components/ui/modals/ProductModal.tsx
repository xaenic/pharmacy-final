"use client";
import { useFormState } from "react-dom";
import CloseModal from "./CloseModal";
import { DatePicker } from "@nextui-org/date-picker";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import { addNewCategory, addNewProduct } from "@/lib/action";
import Button from "../Forms/Button";
import CategoryOptions from "../Forms/CategoryOptions";
import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";
function ProductModal({ categories }: any) {
  const { setModal } = useModalStore();

  function generateProductCode() {
    const timestamp = Date.now(); // Get the current timestamp
    const randomChars = Math.random().toString(36).substring(2, 6); // Generate random characters

    // Combine timestamp and random characters to create the product code
    const productCode = `${timestamp}`;

    return productCode;
  }

  const [image, setImage] = useState<any>(null);
  const [state, formAction] = useFormState(addNewProduct, {
    message: "",
    errors: {
      name: [],
    },
  });
  const [code, setCOde] = useState(generateProductCode());
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
  console.log(generateProductCode());
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className=" p-4 z-50 lg:pl-64  lg:pt-5 bg-black bg-opacity-5 fixed  text-gray-600  top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    >
      <form
        ref={form}
        action={formAction}
        className="bg-white z-10 py-5 px-7  rounded-md shadow-lg flex flex-col gap-5"
      >
        <div className="flex justify-between gap-10 items-center">
          <h1 className="text-xs font-semibold">New Product</h1>
          <CloseModal />
        </div>
        <div className="  flex gap-2 items-end justify-start">
          <div className="w-24 h-24 border border-dashed border-blue-500 rounded-lg">
            {image ? (
              <Image
                width={32}
                height={32}
                src={image}
                alt="Avatar"
                unoptimized={true}
                className="rounded-md h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-xs text-blue-500 font-semibold">Image URL</h1>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image ?? ""}
                name="image"
                type="text"
                placeholder="Enter product image url"
                className="text-xs bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>
        {state?.errors?.name.map((e: string) => (
          <span className="text-red-600 text-xs" key={e}>
            {e}
          </span>
        )) ?? null}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Product Name</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="product_name"
                type="text"
                className="text-xs bg-transparent outline-none"
                placeholder="Enter product name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Product Code</h2>
            <div className="bg-slate-200 border border-gray-200 rounded-md px-3 p-2">
              <input
                name="code"
                hidden
                onChange={(e) => setCOde(e.target.value)}
                value={code}
                type="number"
                placeholder="e.g 10101"
                className="text-xs bg-transparent outline-none w-full"
              />
              <input
                disabled
                onChange={(e) => setCOde(e.target.value)}
                value={code}
                type="number"
                placeholder="e.g 10101"
                className="text-xs bg-transparent outline-none w-full"
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
                className="text-xs bg-transparent outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Manufacturer</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="manufacturer"
                type="text"
                placeholder="Manufacturer"
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
                placeholder="Generic Name"
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
                placeholder="Product quantity"
                className="text-xs bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className=" flex-col gap-2 hidden">
            <h2 className="text-xs my-auto ">Product Type</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="type"
                type="text"
                placeholder="Product type"
                className="text-xs bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Category</h2>
            <select
              name="category"
              className="border border-gray-200 text-slate-400 text-xs p-2 rounded-md w-full"
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
              {categories?.map((e: any, i: number) => (
                <option value={e.category_id} key={i}>
                  {e.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-col gap-2 flex">
            <h2 className="text-xs my-auto ">Expiry Date</h2>
            <DatePicker name="expiry" size="sm" variant="bordered" />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <h2 className="text-xs my-auto">Description</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <textarea
                id="w3review"
                name="description"
                className="text-xs bg-transparent outline-none w-full"
                rows={4}
                cols={50}
                placeholder="Lorem epsum"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button color="bg-teal-500" name="Add Product" />
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
      </form>
    </motion.div>
  );
}

export default ProductModal;
