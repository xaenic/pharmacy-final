import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const dynamic = "force-dynamic";
import { Toaster } from "react-hot-toast";

import Link from "next/link";
import { redirect } from "next/navigation";

import { getBillingDetail, getTransaction } from "@/lib/db/transaction";
import { getUsers } from "@/lib/db/db";
import UsersTable from "@/components/ui/Table/UsersTable";
import SearchProduct from "@/components/layout/Inventory/SearchProduct";
import AddButtons from "@/components/layout/Inventory/AddButtons";
import Modals from "@/components/layout/Inventory/Modals";
export const fetchCache = "force-no-store";
export default async function UsersView() {
  const ok = await getUsers();

  let users = ok?.filter((e) => e.role != "customer");
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
        <Modals categories={null} />
        <Topbar title="Inventory" />
        <div className="mt-10">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-medium">Users</span>
              <small className="text-sm text-slate-500">
                Total Users {users?.length}
              </small>
            </div>
            <div>
              <div className="flex gap-3">
                <SearchProduct />
                <AddButtons name="User" />
              </div>
            </div>
          </div>
        </div>

        <UsersTable results={users} />
      </main>
    </div>
  );
}
