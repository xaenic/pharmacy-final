"use client";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
function TransactionRow({ e, i }: any) {
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
          #{e.id}
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {formatDate(e.date_created)}
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
            <div
              className={`${
                e.status == "Pending"
                  ? "bg-purple-500"
                  : e.status == "Cancelled"
                  ? "bg-red-500"
                  : "bg-green-500"
              } w-2 h-2 rounded-full`}
            ></div>
            <span> {e.status}</span>
          </div>
        </td>
        <td className="border px-4 py-4 border-none text-center text-xs  text-gray-500">
          <ActionButtons reference="Transaction" id={e.id} name={e.id} />
        </td>
      </motion.tr>
    </>
  );
}

export default TransactionRow;
