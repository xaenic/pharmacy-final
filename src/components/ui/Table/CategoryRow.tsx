"use client";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
function CategoryRow({ e, i }: any) {
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
        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {i + 1}
        </td>
        <td className=" font-medium border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {e.category_name}
        </td>

        <td className=" border px-4 py-4 border-none text-center text-sm  text-gray-500">
          {e.capacity}
        </td>
        <td className="border px-4 py-4 border-none text-center text-sm  text-gray-500">
          <ActionButtons
            reference="Category"
            id={e.category_id}
            name={e.product_name}
          />
        </td>
      </motion.tr>
    </>
  );
}

export default CategoryRow;
