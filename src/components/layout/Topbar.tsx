"use client";
import Image from "next/image";
import SearchIcon from "../icons/SearchIcon";
import { SidebarState, useSidebar } from "@/store/store";
function Topbar({ title }: { title: string }) {
  const { setSidebar } = useSidebar();
  return (
    <div className="flex gap-3">
      <div
        onClick={() =>
          setSidebar({
            active: true,
          })
        }
        className="xl:hidden bg-white flex p-3 items-center rounded-md cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="w-4 h-4"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M3 6h18M3 12h18M3 18h18"
          />
        </svg>
      </div>
      <div className="w-full flex justify-between items-center  bg-white p-2 rounded-md flex-wrap">
        <div className="bg-white   text-sm px-3  flex items-center pr-2">
          <SearchIcon />
          <input
            className="bg-transparent p-1 outline-none text-xs  pr-0"
            type="text"
            placeholder="Search anything"
          />
        </div>
        <div className="flex items-center gap-3">
          <div>
            <Image
              width={32}
              height={32}
              src={`https://i.pinimg.com/280x280_RS/5c/a0/11/5ca01165fbff968cbb8f75eac624b42e.jpg`}
              alt="Avatar"
              unoptimized={true}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
