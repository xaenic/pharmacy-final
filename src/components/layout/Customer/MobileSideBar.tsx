"use client";

import ItemIcon from "@/components/icons/ItemIcon";
import { useSidebar } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

function MobileSideBar() {
  const { active, setSidebar } = useSidebar();

  return (
    <aside
      id="sidebar"
      className={`${
        active ? "right-0" : "right-[-1000px]"
      } z-40 fixed top-0  bottom-0 xl:left-0   duration-300 transition-all  bg-white   border border-gray-300   pb-36   w-56 xl:w-48  p-5 rounded-xl xl:mt-5 xl:ml-3 h-screen xl:h-[95%] xl:m-4  lg:hidden   flex-col justify-between `}
    >
      <div className="h-full text-gray-700 text-xs">
        <div
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            e.stopPropagation();
          }}
          className="lg:hidden bg-white flex mb-4 items-center rounded-md cursor-pointer w-full justify-end"
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
        <section
          id="widget_1"
          className="border-b border-gray-200 pb-4 flex items-center gap-2 justify-center flex-col "
        >
          <Image
            width={20}
            height={20}
            src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/logo.svg"
            alt="Logo"
            className="w-32 h-8"
          />
        </section>
        <Link
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            e.stopPropagation();
          }}
          href="/admin"
          id="widget_2"
          className="mt-5 flex flex-col gap-5"
        >
          <div
            className={` flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.7em"
              height="1.7em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
              />
            </svg>
            <span className="w-full">Home</span>
          </div>
        </Link>
        <Link
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            e.stopPropagation();
          }}
          href="/shop"
          id="widget_2"
          className="mt-5 flex flex-col gap-5"
        >
          <div
            className={` flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.7em"
              height="1.7em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
              />
            </svg>
            <span className="w-full">Shop</span>
          </div>
        </Link>

        <Link
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            e.stopPropagation();
          }}
          href="/transactions"
          id="widget_2"
          className="mt-5 flex flex-col gap-5"
        >
          <div
            className={` flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.7em"
              height="1.7em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
              />
            </svg>
            <span className="w-full">Transactions</span>
          </div>
        </Link>
      </div>
      <div className="w-full flex justify-center"></div>
    </aside>
  );
}

export default MobileSideBar;
