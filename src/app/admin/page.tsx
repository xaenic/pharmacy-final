"use server";
import { auth } from "@/auth";
import SearchIcon from "@/components/icons/SearchIcon";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import NewCustomerCard from "@/components/ui/Cards/NewCustomerCard";
import StatsCard from "@/components/ui/Cards/StatsCard";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import BasicCard from "@/components/ui/Widgets/BasicCard";
import { getCategories, getProducts, getUser, getUsers } from "@/lib/db/db";
import { getAllTransactions } from "@/lib/db/transaction";
import { IUser } from "@/lib/models/userModel";
import { sql } from "@vercel/postgres";
import Image from "next/image";

export interface Statistics {
  sales: number;
  customers: number;
  products: number;
  categories: number;
}
export default async function Admin(): Promise<JSX.Element> {
  const session: any = await auth();
  const users = await getUsers();
  const transactions = await getAllTransactions();
  const products = await getProducts();
  const { rows: categories } = await getCategories();
  const stats: Statistics = {
    sales: 0,
    customers: 0,
    products: 0,
    categories: 0,
  };
  let salesToday = 0;
  let customersToday = 0;
  transactions?.forEach((e) => {
    if (isSameDay(new Date(e.date_created), new Date()))
      salesToday += parseFloat(e.total + "");
  });
  transactions?.forEach((e) => {
    stats.sales += parseFloat(e.total + "");
  });
  users?.forEach((e, i) => {
    stats.customers += i;
  });
  categories?.forEach((e, i) => {
    stats.categories += i;
  });
  products?.forEach((e, i) => {
    stats.products += i;
  });
  users?.forEach((e, i) => {
    if (isSameDay(new Date(e.date_created), new Date()) && e.role == "customer")
      customersToday += i;
  });

  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
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
            <BasicCard
              title="Today's Sales"
              count={salesToday.toLocaleString()}
              percent="4.63%"
            />

            <BasicCard
              title="Today's Customer"
              count={customersToday.toLocaleString() + " Customers"}
              percent=""
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <StatsCard stats={stats} />
            <NewCustomerCard />
          </div>
        </div>
      </main>
    </div>
  );
}
