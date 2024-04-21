import GithubIcon from "@/components/icons/GithubIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import Modals from "@/components/layout/Inventory/Modals";
import AddButtons from "@/components/layout/Inventory/AddButtons";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Table from "@/components/ui/Table/Table";
import BigCard from "@/components/ui/Widgets/BigCard";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { Toaster } from "react-hot-toast";
import { getCategories, getProducts } from "@/lib/db/db";
import { FadeLoader } from "react-spinners";
import CategoryIcon from "@/components/icons/CategoryIcon";
import FolderIcon from "@/components/icons/FolderIcon";
export default async function Inventory() {
  const options = await getCategories();
  const { products } = await getProducts();
  return (
    <div className="flex min-h-screen bg-slate-200">
      <Toaster
        toastOptions={{
          style: {
            background: "#0EA5E9",
            color: "#fff",
          },
        }}
      />
      <Sidebar />
      <main className="p-4 lg:ml-64  lg:pt-5 flex flex-col w-full relative">
        <Modals categories={options.rows} />
        <Topbar title="Inventory" />
        <div className="flex gap-3 mt-10 bg-white rounded-t-md p-3">
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
        </Suspense>
      </main>
    </div>
  );
}
