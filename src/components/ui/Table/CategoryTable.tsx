"use client";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { getProducts } from "@/lib/db/db";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
import RowAnimated from "./RowAnimated";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types/Product";
import { useSearch } from "@/store/store";
import { ClipLoader } from "react-spinners";
import CategoryRow from "./CategoryRow";
export const dynamic = "force-dynamic";
function CategoryTable({ results }: { results: any }) {
  const [products, setProducts] = useState<any>(results);
  const [old, setOld] = useState<any>();
  const [loading, setLoading] = useState(true);

  const { term } = useSearch();
  useEffect(() => {
    // const fetchProducts = async () => {
    //   const results: Product[] = await getProducts();
    //   setProducts(results);
    //   setOld(results);
    setLoading(false);
    // };
    // fetchProducts();
    // console.log("triggered");
    console.log(results);
    setProducts(results);
    setOld(results);
  }, [results]);

  useEffect(() => {
    if (term == "") {
      if (old) {
        setProducts(old);
      }
      return;
    }
    const filtered = old?.filter((product: any) =>
      product.category_name.toLowerCase().includes(term)
    );
    if (filtered) setProducts(filtered);
  }, [term, old]);
  return (
    <div
      id="scroll"
      className={`bg-white rounded-lg mt-5  ${
        !loading ? "border" : ""
      } overflow-x-auto `}
    >
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader size={25} color="000" />
        </div>
      ) : (
        <table className="w-full text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-sm   rounded-md  border-b border-gray-200">
            <tr>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center ">
                NO
              </th>

              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                Category Name
              </th>

              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                Capacity
              </th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
            </tr>
          </thead>
          <tbody id="tbody" className="relative">
            {products?.map((e: Product, i: number) => (
              <CategoryRow key={i} e={e} i={i} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoryTable;
