import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { getProducts } from "@/lib/db/db";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
import RowAnimated from "./RowAnimated";

async function Table({ products }: any) {
  return (
    <div id="tabbb" className="bg-white rounded-b-md overflow-x-auto">
      <table className="w-full mt-10 text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs  uppercase rounded-md  border-b border-gray-200">
          <tr>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center ">
              NO
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              Image
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              Product Name
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              CODE
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              PRICE
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              BRAND
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              Category
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              QUANTITY
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
              STATUS
            </th>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
          </tr>
        </thead>
        <tbody id="tbody" className="relative">
          {products?.map((e: any, i: number) => (
            <RowAnimated key={i} e={e} i={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
