"use client";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
import { IUser } from "@/lib/models/userModel";
function RowUser({ e, i }: { e: IUser; i: any }) {
  const formatDate = (dateString: string, ok = false) => {
    if (!dateString) return "None";
    const date = new Date(dateString);

    if (ok)
      return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

    if (!ok)
      return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  };
  return (
    <>
      <motion.tr
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="hover:bg-gray-300 transition-colors duration-200"
      >
        <td className=" border px-4 py-4 border-none text-center text-sm  text-sky-500">
          {e.firstname} {e.lastname}
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-sm  text-gray-500 flex justify-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-white">
            {e.firstname[0]}
          </div>
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-sm  text-gray-500">
          +{e.phone_number}
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {e.email}
        </td>

        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500 capitalize">
          {e.role}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500"></td>
        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500"></td>
        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          <span className={`${e.active ? "text-green-500" : "text-red-500"}`}>
            {e.active ? "Active" : "Inactive"}
          </span>
        </td>

        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500"></td>

        <td className="border px-4 py-4 border-none text-center text-sm  text-gray-500">
          <ActionButtons
            reference="User"
            id={e.staff_id + ""}
            name={e.firstname}
          />
        </td>
      </motion.tr>
    </>
  );
}

export default RowUser;
