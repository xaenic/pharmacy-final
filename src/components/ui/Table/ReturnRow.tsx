"use client";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
function ReturnRow({ e, i }: any) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
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
        <td className=" border px-4 py-4 border-none text-center text-xs  text-sky-500">
          #{e.transaction_id}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-xs  text-sky-500">
          #{e.code}
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {formatDate(e.updated_at)}
        </td>

        <td className=" border px-4 py-4 border-none text-center text-xs  text-red-500">
          ₱{e.total}
        </td>
        <td
          className={` border px-4 py-4 border-none text-center text-xs font-medium  ${
            e.status == "Pending"
              ? "text-purple-500"
              : e.status == "Cancelled"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          <div className="flex justify-center items-center gap-2">
            <span> {e.qty}</span>
          </div>
        </td>
      </motion.tr>
    </>
  );
}

export default ReturnRow;
