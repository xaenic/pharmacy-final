import GithubIcon from "@/components/icons/GithubIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import Modals from "@/components/layout/Inventory/Modals";
import AddButtons from "@/components/layout/Inventory/AddButtons";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Table from "@/components/ui/Table/Table";
import BigCard from "@/components/ui/Widgets/BigCard";
import { Suspense } from "react";

import { Toaster } from "react-hot-toast";
import { getCategories, getProducts } from "@/lib/db/db";
import { FadeLoader } from "react-spinners";
import CategoryIcon from "@/components/icons/CategoryIcon";
import FolderIcon from "@/components/icons/FolderIcon";
import AddIcon from "@/components/icons/AddIcon";
import SearchProduct from "@/components/layout/Inventory/SearchProduct";
import { Product } from "@/lib/types/Product";
import { getAllTransactions } from "@/lib/db/transaction";
export const fetchCache = "force-no-store";
export default async function ATransactions() {
  const transactions = await getAllTransactions();
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
      <main className="p-4 xl:ml-52  xl:pt-4 flex flex-col w-full relative">
        <Topbar title="Inventory" />
        <div className="mt-10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex flex-col">
              <span className="text-xl font-medium">Transactions</span>
              <small className="text-xs text-slate-500">
                Total transactions ({transactions?.length})
              </small>
            </div>
            <div className="flex gap-3">
              <SearchProduct />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
