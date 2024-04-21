import { getProducts } from "@/lib/db/db";

async function Table() {
  const { products } = await getProducts();
  return (
    <div className="bg-white overflow-x-auto">
      <table className="w-full mt-10 text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs  uppercase rounded-md  border-b border-gray-200">
          <tr>
            <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center ">
              NO
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
          {products?.map((e, i: number) => (
            <tr key={i} className="">
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                {i + 1}
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                {e.product_name}
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                {e.code}
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                {e.price}
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                {e.brand}
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                sd
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                {e.quantity}
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                <span className="bg-green-500 text-green-600 bg-opacity-20 px-2 p-1 rounded-md text-sm">
                  In Stock
                </span>
              </td>
              <td className="border px-4 py-4 border-none text-center text-xs md:text-sm text-gray-500">
                :
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
