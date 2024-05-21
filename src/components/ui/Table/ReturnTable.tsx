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
import { Transaction, Transaction_Item } from "@/lib/types/Transaction";
import TransactionRow from "./TransactionRow";
import ReturnRow from "./ReturnRow";
export const dynamic = "force-dynamic";
function ReturnTable({
  transactions,
}: {
  transactions: Transaction_Item[] | null;
}) {
  const [products, setProducts] = useState<any>(transactions);
  const [old, setOld] = useState<any>();
  const [loading, setLoading] = useState(true);

  const { term } = useSearch();
  useEffect(() => {
    setLoading(false);
    setProducts(transactions);
    setOld(transactions);
  }, [transactions]);

  useEffect(() => {
    console.log(term);
    if (term == "") {
      if (old) {
        setProducts(old);
      }
      return;
    }

    const filtered = old?.filter((product: any) => {
      if ((product.id + "").includes(term)) return true;
      if ((product.code + "").includes(term)) return true;
      if (product.status.toLowerCase().includes(term)) return true;
    });
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
          <thead className="text-xs   rounded-md  border-b border-gray-200">
            <tr>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center ">
                TRANSACTION ID
              </th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center ">
                ITEM ID
              </th>

              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                DATE
              </th>

              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                AMOUNT
              </th>
              <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center">
                QTY
              </th>
            </tr>
          </thead>
          <tbody id="tbody" className="relative">
            {products?.map((e: Product, i: number) => (
              <ReturnRow key={i} e={e} i={i} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReturnTable;
