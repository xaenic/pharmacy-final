"use client";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
function RowAnimated({ e, i }: any) {
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
          #{e.code}
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-sm  text-gray-500 flex justify-center">
          <Image
            width={40}
            height={40}
            alt="Product Image"
            className="h-6 w-6 rounded-full object-cover bg-white"
            unoptimized={true}
            src={e.image}
          />
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {e.product_name}
        </td>

        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          ₱ {e.price}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {formatDate(e.expiry_date, false)}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {formatDate(e.restock_date, false)}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {e.category_name}
        </td>

        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {e.quantity}
        </td>
        <td className="border px-4 py-4 border-none text-center text-sm  text-gray-500">
          <span
            className={` ${
              new Date(e.expiry_date) < new Date()
                ? "text-purple-500"
                : e.quantity == 0
                ? " text-red-500"
                : e.quantity <= 50
                ? " text-orange-500"
                : " text-green-500"
            }   bg-opacity-20 px-2 p-1 rounded-md text-sm font-medium`}
          >
            {new Date(e.expiry_date) < new Date()
              ? "Expired"
              : e.quantity == 0
              ? "No Stock"
              : e.quantity <= 50
              ? "Low"
              : "Available"}
          </span>
        </td>
        <td className="border px-4 py-4 border-none text-center text-sm  text-gray-500">
          <ActionButtons reference="Product" id={e.id} name={e.product_name} />
        </td>
      </motion.tr>
    </>
  );
}

export default RowAnimated;
