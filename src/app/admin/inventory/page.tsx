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
export default function Inventory() {
  return (
    <div className="flex min-h-screen bg-slate-200">
      <Sidebar />
      <main className="p-4 lg:ml-64  lg:pt-5 flex flex-col w-full relative">
        <Modals />
        <Topbar title="Inventory" />
        <div className="flex gap-3 mt-10 bg-white rounded-t-md p-3">
          <BigCard
            title="Categories"
            color="bg-sky-500  text-sky-600 font-semibold"
            Icon={<GithubIcon />}
          />
          <BigCard
            title="Total Products"
            color="bg-orange-400 text-orange-600 font-semibold"
            Icon={<GithubIcon />}
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
            <p className="text-center text-xl font-semibold text-blue-600"></p>
          }
        >
          <Table />
        </Suspense>
      </main>
    </div>
  );
}
