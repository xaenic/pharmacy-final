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
import { IUser } from "@/lib/models/userModel";
import RowUser from "./RowUser";
export const dynamic = "force-dynamic";
function UsersTable({ results }: { results: any }) {
  const [products, setProducts] = useState<IUser[] | null>(results);
  const [old, setOld] = useState<IUser[] | null>();
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString: string, ok = false) => {
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
    const filtered = old?.filter((product) =>
      product.firstname.toLowerCase().includes(term)
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
                Name
              </th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                Image
              </th>

              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                Phone
              </th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                Email
              </th>

              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                Designation
              </th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                Status
              </th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
            </tr>
          </thead>
          <tbody id="tbody" className="relative">
            {products?.map((e: IUser, i: number) => (
              <RowUser key={i} e={e} i={i} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersTable;
