"use server";
import { auth } from "@/auth";
import SearchIcon from "@/components/icons/SearchIcon";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import BasicCard from "@/components/ui/Widgets/BasicCard";
import { getUser } from "@/lib/db/db";
import { IUser } from "@/lib/models/userModel";
import { sql } from "@vercel/postgres";
import Image from "next/image";
export default async function Admin(): Promise<JSX.Element> {
  const session = await auth();
  return (
    <div className="flex min-h-screen bg-slate-200">
      <Sidebar />
      <main className="p-4 lg:ml-64  lg:pt-5 flex flex-col w-full">
        <Topbar title="Dashboard" />

        <div className="px-0 p-3 mt-3">
          <h1>Welcome ! {session?.user?.name}</h1>
          <div className="flex gap-4 mt-10">
            <BasicCard />
            <BasicCard />
            <BasicCard />
          </div>
        </div>
      </main>
    </div>
  );
}
