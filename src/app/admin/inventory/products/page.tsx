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

export const dynamic = "force-dynamic";
export default async function Products() {
  const options = await getCategories();
  const results: Product[] = await getProducts();

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
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-medium">Products</span>
              <small className="text-xs text-slate-500">
                Here is the list of products
              </small>
            </div>
            <div className="flex gap-3">
              <SearchProduct />
              <AddButtons />
            </div>
          </div>
        </div>
        <Table results={results} />
      </main>
    </div>
  );
}

{
  /* <div className="flex gap-3 mt-10 bg-white rounded-t-md p-3">
          <BigCard
            title="Categories"
            total={options.rows.length}
            color="bg-sky-400  text-sky-600 font-semibold"
            Icon={<CategoryIcon className="text-white w-14 h-14 rounded-md" />}
          />
          <BigCard
            title="Total Products"
            total={products.length}
            color="bg-orange-400  text-sky-600 font-semibold"
            Icon={<FolderIcon className="text-white w-14 h-14 rounded-md" />}
          />
        </div>
        <div className="flex-wrap gap-4 flex justify-between pt-10 items-center bg-white px-3">
          <div className="bg-white border-2 border-gray-400 rounded-md flex items-center p-1">
            <SearchIcon />
            <input
              className="bg-transparent px-2 p-1 outline-none"
              type="text"
              placeholder="Search by name"
            />
          </div>
          <AddButtons />
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center mt-10">
              <FadeLoader color="#0EA5E9" width={3} />
            </div>
          }
        >
          <Table products={products} />
        </Suspense> */
}
