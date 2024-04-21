"use client";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
function RowAnimated({ e, i }: any) {
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
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {i + 1}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          <Image
            width={32}
            height={32}
            src={e?.image}
            alt="Avatar"
            unoptimized={true}
            className="rounded-md w-10 h-10 object-cover"
          />
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.product_name}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.description}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.code}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.price}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.brand}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.category_name}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.type}
        </td>
        <td className="font-medium border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          {e.quantity}
        </td>
        <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          <span className="font-medium  bg-green-500 text-green-600 bg-opacity-20 px-2 p-1 rounded-md text-sm">
            In Stock
          </span>
        </td>
        <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
          <ActionButtons id={e.id} name={e.product_name} />
        </td>
      </motion.tr>
    </>
  );
}

export default RowAnimated;
