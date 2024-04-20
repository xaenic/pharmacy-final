"use client";
import { usePathname } from "next/navigation";
import LogoutButton from "../ui/Forms/LogoutButton";
import Image from "next/image";
const Sidebar = () => {
  const path = usePathname();
  return (
    <aside
      id="sidebar"
      className="left-[-1000px] lg:left-0 h-screen pb-36 duration-300 transition-all  w-56 bg-gradient-to-t to-sky-600 from-blue-500 p-5 rounded-xl  lg:m-4 text-gray-100 fixed top-0  bottom-0   flex-col justify-between"
    >
      <div className="h-full text-white  ">
        <section
          id="widget_1"
          className="border-b border-gray-200 pb-4 flex items-center gap-2 justify-center flex-col "
        >
          <Image
            width={32}
            height={32}
            src={`https://i.pinimg.com/280x280_RS/5c/a0/11/5ca01165fbff968cbb8f75eac624b42e.jpg`}
            alt="Avatar"
            unoptimized={true}
            className="rounded-full"
          />
          <h1 className="text-center font-bold">Pharmacy</h1>
          <svg
            id="hideSide"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer ml-3 lg:hidden"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 18.005c0 .55-.446.995-.995.995h-8.01a.995.995 0 0 1 0-1.99h8.01c.55 0 .995.445.995.995M22 12c0 .55-.446.995-.995.995H2.995a.995.995 0 1 1 0-1.99h18.01c.55 0 .995.446.995.995m-.995-5.01a.995.995 0 0 0 0-1.99H8.995a.995.995 0 1 0 0 1.99z"
            />
          </svg>
        </section>
        <section id="widget_2" className="mt-5 flex flex-col gap-5">
          <div
            className={`${
              path.toString() == "/admin" ? "bg-slate-900" : ""
            } flex gap-2 items-center hover:bg-slate-900  cursor-pointer text-white rounded-lg px-3 p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
              />
            </svg>
            <a href="<?php echo $dashboard; ?>" className="w-full">
              Dashboard
            </a>
          </div>
        </section>
        <section id="widget_2" className="mt-5 flex flex-col gap-5">
          <div className="flex gap-2 items-center hover:bg-slate-900 <?php if ($page_title == 'Students' || $parent[0] == 'Students') { echo 'bg-gray-900'; } ?> cursor-pointer text-white rounded-lg px-3 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
              />
            </svg>
            <a href="./students" className="w-full">
              Students
            </a>
          </div>
        </section>
      </div>
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
