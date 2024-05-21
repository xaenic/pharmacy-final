"use client";
import { useFormState } from "react-dom";
import CloseModal from "../CloseModal";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import {
  addNewCategory,
  addNewProduct,
  updateNewProduct,
  updateThisUser,
} from "@/lib/action";
import Button from "../../Forms/Button";

import { getProductById, getUser } from "@/lib/db/db";
import Image from "next/image";
import toast from "react-hot-toast";
import { ClipLoader, FadeLoader } from "react-spinners";
import { motion } from "framer-motion";
import { DatePicker } from "@nextui-org/date-picker";
import { now, parseAbsoluteToLocal } from "@internationalized/date";
function EditUserModal({
  id,
  categories,
}: {
  id: string | null;
  categories: any;
}) {
  const { setModal } = useModalStore();
  const [state, formAction] = useFormState(updateThisUser, {
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
        const ok = await getUser(id, id);
        console.log(ok);
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
            <h1 className="text-xs font-semibold">Update User {id}</h1>
            <CloseModal />
          </div>
          <div className="  flex gap-2 items-end justify-start"></div>
          {state?.errors?.name.map((e: string) => (
            <span className="text-red-600 text-xs" key={e}>
              {e}
            </span>
          )) ?? null}
          <div className="grid grid-cols-2  gap-2">
            <div className="gap-2 flex flex-col">
              <h2 className="text-xs my-auto">First Name</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="firstname"
                  type="text"
                  defaultValue={product?.firstname}
                  className="text-xs bg-transparent outline-none w-full"
                  placeholder="Enter product name"
                />
              </div>
            </div>
            <div className="gap-2 flex flex-col">
              <h2 className="text-xs my-auto">Last Name</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="lastname"
                  type="text"
                  defaultValue={product?.lastname}
                  className="text-xs bg-transparent outline-none w-full"
                  placeholder="Enter product name"
                />
                <input
                  name="id"
                  type="text"
                  hidden
                  defaultValue={product?.staff_id}
                  className="text-xs bg-transparent outline-none w-full"
                  placeholder="Enter product name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Phone Number</h2>
              <div className="bg-slate-100 border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="phone_number"
                  type="number"
                  defaultValue={product?.phone_number}
                  placeholder="Enter phone number"
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Email</h2>
              <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter product price"
                  defaultValue={product?.email}
                  className="text-xs bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Gender</h2>
              <select
                name="gender"
                className="border border-gray-200 text-slate-400 text-xs p-2 rounded-md w-full"
                defaultValue={product?.gender}
              >
                <option value="Java" className="text-slate-300" disabled hidden>
                  Choose Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Status</h2>
              <select
                name="status"
                className="border border-gray-200 text-slate-400 text-xs p-2 rounded-md w-full"
                defaultValue={product?.active ? "true" : "false"}
              >
                <option value="Java" className="text-slate-300" disabled hidden>
                  Choose Gender
                </option>
                <option value="true">Active</option>
                <option value="false">Disabled</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xs my-auto">Role</h2>
              <select
                name="role"
                className="border border-gray-200 text-slate-400 text-xs p-2 rounded-md w-full"
                defaultValue={product?.role}
              >
                <option value="Java" className="text-slate-300" disabled hidden>
                  Choose User Role
                </option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Delivery Man">Delivery Man</option>
                <option value="Accountant">Accountant</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Salesman">Salesman</option>
                <option value="Cleaner">Cleaner</option>
              </select>
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

export default EditUserModal;
