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
import CategoryTable from "@/components/ui/Table/CategoryTable";

export const dynamic = "force-dynamic";
export default async function Categories() {
  const options = await getCategories();

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
        <Modals categories={options.rows} />
        <Topbar title="Inventory" />
        <div className="mt-10">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex flex-col">
              <span className="text-xl font-medium">Categories</span>
              <small className="text-xs text-slate-500">
                Total categories ({options.rows.length})
              </small>
            </div>
            <div className="flex gap-3">
              <SearchProduct />
              <AddButtons name="Category" />
            </div>
          </div>
        </div>
        <CategoryTable results={options.rows} />
      </main>
    </div>
  );
}
