import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const dynamic = "force-dynamic";
import { Toaster } from "react-hot-toast";
import { getProductById, getProducts } from "@/lib/db/db";

import { Product } from "@/lib/types/Product";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getBillingDetail, getTransaction } from "@/lib/db/transaction";
import { Transaction } from "@/lib/types/Transaction";
import { ok } from "assert";
import ItemList from "@/components/layout/Inventory/ItemList";
export const fetchCache = "force-no-store";
interface Props {
  params: { id: any };
}
export default async function AddTransaction({ params }: Props) {
  const items: Product[] = await getProducts();

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster
        toastOptions={{
          className: "text-xs text-red-600 bg-orange-600",
          style: {
            color: "#000",
          },
        }}
      />
      <Sidebar />
      <main className="p-4 lg:ml-52  lg:pt-4 flex flex-col w-full relative">
        <Topbar title="Inventory" />
        <div className="mt-10">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-medium">Make Transaction</span>
              <small className="text-sm text-slate-500"></small>
            </div>
            <div>
              <Link
                href="/admin/transactions"
                className="text-sm flex items-center border p-2 px-4 gap-3 rounded-md hover:bg-gray-200 transition-colors duration-200 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 1024 1024"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
                  />
                  <path
                    fill="currentColor"
                    d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
                  />
                </svg>
                <span>Back </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ItemList products={items} />
        </div>
      </main>
    </div>
  );
}
