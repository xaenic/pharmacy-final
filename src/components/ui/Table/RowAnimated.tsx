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
        <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {i + 1}
        </td>
        {/* <td className=" border px-4 py-4 border-none text-center text-xs text-gray-500">
          <Image
            width={32}
            height={32}
            src={e?.image}
            alt="Avatar"
            unoptimized={true}
            className="rounded-md w-10 h-10 object-cover"
          />
        </td> */}
        <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {e.product_name}
        </td>

        <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
          ₱ {e.price}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {e.manufacturer}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {e.brand}
        </td>
        <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {e.category_name}
        </td>

        <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
          {e.quantity}
        </td>
        <td className="border px-4 py-4 border-none text-center text-xs  text-gray-500">
          <span
            className={` ${
              e.quantity == 0
                ? " text-red-500"
                : e.quantity <= 50
                ? " text-orange-500"
                : " text-green-500"
            }   bg-opacity-20 px-2 p-1 rounded-md text-xs font-medium`}
          >
            {e.quantity == 0
              ? "No Stock"
              : e.quantity <= 50
              ? "Low"
              : "Available"}
          </span>
        </td>
        <td className="border px-4 py-4 border-none text-center text-xs  text-gray-500">
          <ActionButtons reference="Product" id={e.id} name={e.product_name} />
        </td>
      </motion.tr>
    </>
  );
}

export default RowAnimated;
