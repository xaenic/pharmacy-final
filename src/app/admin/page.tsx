"use server";
import { auth } from "@/auth";
import SearchIcon from "@/components/icons/SearchIcon";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import NewCustomerCard from "@/components/ui/Cards/NewCustomerCard";
import StatsCard from "@/components/ui/Cards/StatsCard";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import BasicCard from "@/components/ui/Widgets/BasicCard";
import { getUser } from "@/lib/db/db";
import { IUser } from "@/lib/models/userModel";
import { sql } from "@vercel/postgres";
import Image from "next/image";

export default async function Admin(): Promise<JSX.Element> {
  const session: any = await auth();

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="p-4 xl:ml-52  xl:pt-5 flex flex-col w-full">
        <Topbar title="Dashboard" />

        <div className="px-0 p-3 mt-3">
          <h1 className="font-semibold text-gray-700 text-xl">
            Pharmacy Management
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {" "}
            Welcome {session?.user?.role} to admin dashboard
          </p>
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            <BasicCard title="Today's Sales" count="$10,945" percent="4.63%" />
            <BasicCard
              title="Today's Revenue"
              count="$12,338"
              percent="2.34%"
            />
            <BasicCard
              title="Today's Customer"
              count="$20,847"
              percent="4.63%"
            />
            <BasicCard
              title="Today's Expense"
              count="$23,485"
              percent="1.34%"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <StatsCard />
            <NewCustomerCard />
          </div>
        </div>
      </main>
    </div>
  );
}
