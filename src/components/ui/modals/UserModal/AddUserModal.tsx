"use client";
import { useFormState } from "react-dom";
import CloseModal from "../CloseModal";
import { DatePicker } from "@nextui-org/date-picker";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/store";
import { addNewCategory, addNewProduct, addUser, register } from "@/lib/action";
import Button from "../../Forms/Button";

import toast from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";

function AddUserModal({ categories }: any) {
  const { setModal } = useModalStore();

  const [image, setImage] = useState<any>(null);
  const [state, formAction] = useFormState(addUser, {
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
      transition={{ duration: 0.1 }}
      className=" p-4 z-50 lg:pl-64  lg:pt-5 bg-black bg-opacity-5 fixed  text-gray-600  top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    >
      <form
        ref={form}
        action={formAction}
        className="bg-white z-10 py-5 px-7  rounded-md shadow-lg flex flex-col gap-5"
      >
        <div className="flex justify-between gap-10 items-center">
          <h1 className="text-xs font-semibold">New User</h1>
          <CloseModal />
        </div>
        <div className="  flex gap-2 items-end justify-start"></div>
        {state?.errors?.name.map((e: string) => (
          <span className="text-red-600 text-xs" key={e}>
            {e}
          </span>
        )) ?? null}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">First Name</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="firstname"
                type="text"
                className="text-xs bg-transparent outline-none"
                placeholder="Enter product name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Last Name</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="lastname"
                type="text"
                className="text-xs bg-transparent outline-none"
                placeholder="Enter product name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Phone Number</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="phone_number"
                type="number"
                placeholder="Enter phone number"
                className="text-xs bg-transparent outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Email</h2>
            <div className="bg-white border border-gray-200 rounded-md px-3 p-2">
              <input
                name="email"
                type="email"
                className="text-xs bg-transparent outline-none"
                placeholder="Enter product name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Gender</h2>
            <select
              name="gender"
              className="border border-gray-200 text-slate-400 text-xs p-2 rounded-md w-full"
            >
              <option
                value="Java"
                className="text-slate-300"
                disabled
                defaultValue={"Java"}
                hidden
              >
                Choose Gender
              </option>
              <option value="Male">Male</option>
              <option value="Male">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs my-auto">Role</h2>
            <select
              name="role"
              className="border border-gray-200 text-slate-400 text-xs p-2 rounded-md w-full"
            >
              <option
                value="Java"
                className="text-slate-300"
                disabled
                defaultValue={"Java"}
                hidden
              >
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
            <Button color="bg-teal-500" name="Add User" />
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

export default AddUserModal;
