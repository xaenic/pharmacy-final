"use client";
import { usePathname } from "next/navigation";
import LogoutButton from "../ui/Forms/LogoutButton";
import Image from "next/image";
import Link from "next/link";
import ItemIcon from "../icons/ItemIcon";
import TabIcon from "../icons/TabIcon";
import DragIcon from "../icons/DragIcon";
import { useSidebar } from "@/store/store";
import { useState } from "react";
import CategoryIcon from "../icons/CategoryIcon";
const Sidebar = () => {
  const path = usePathname();

  const { active, setSidebar } = useSidebar();

  const [collapse, setCollapse] = useState(
    path.toString().includes("/admin/inventory")
  );
  return (
    <aside
      id="sidebar"
      className={`${
        active ? "left-0" : "left-[-1000px]"
      } z-40 fixed top-0  bottom-0 xl:left-0   duration-300 transition-all  bg-white   border border-gray-300   pb-36   w-56 xl:w-48  p-5 rounded-xl xl:mt-5 xl:ml-3 h-screen xl:h-[95%] xl:m-4     flex-col justify-between `}
    >
      <div className="h-full text-gray-700 text-sm">
        <div
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            setCollapse(false);
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
          {/* <Image
            width={32}
            height={32}
            src={`https://i.pinimg.com/280x280_RS/5c/a0/11/5ca01165fbff968cbb8f75eac624b42e.jpg`}
            alt="Avatar"
            unoptimized={true}
            className="rounded-full"
          /> */}
          <h1 className="text-center font-bold">Pharmacy</h1>
        </section>
        <Link
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            e.stopPropagation();
            setCollapse(false);
          }}
          href="/admin"
          id="widget_2"
          className="mt-5 flex flex-col gap-5"
        >
          <div
            className={`${
              path.toString() == "/admin" && !collapse
                ? "bg-blue-600 text-white"
                : ""
            } flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
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
            <span className="w-full">Dashboard</span>
          </div>
        </Link>
        <span id="widget_2" className="mt-5 flex flex-col gap-2 relative">
          <div
            onClick={(e) => {
              setCollapse((prev: boolean) => !prev);
              e.stopPropagation();
            }}
            className={`${
              path.toString().includes("/admin/inventory") ||
              collapse ||
              path.toString().includes("/admin/view")
                ? "bg-blue-600 text-white"
                : ""
            } flex gap-2 items-center hover:bg-blue-500 hover:text-white cursor-pointer text-gray-700 rounded-lg px-3 p-2`}
          >
            <ItemIcon />
            <span className="w-full">Inventory</span>
          </div>
          <div
            className={`${
              collapse ? "p-4" : "max-h-0 "
            } flex flex-col gap-4 overflow-hidden transition-all duration-200 bg-blue-500 bg-opacity-10  rounded-md `}
          >
            <Link
              onClick={(e) => {
                e.stopPropagation();
                setSidebar({
                  active: false,
                });
              }}
              href="/admin/inventory/products"
              className={`flex items-center gap-2 hover:text-blue-500 ${
                path.toString().includes("products") ? "text-blue-600" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={4}
                >
                  <path d="M44 14L24 4L4 14v20l20 10l20-10z"></path>
                  <path
                    strokeLinecap="round"
                    d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"
                  ></path>
                </g>
              </svg>
              <span>Products</span>
            </Link>
            <Link
              onClick={(e) => {
                e.stopPropagation();
                setSidebar({
                  active: false,
                });
              }}
              href="/admin/inventory/categories"
              className={`flex items-center gap-2 hover:text-blue-500 ${
                path.toString().includes("categories") ? "text-blue-600" : ""
              }`}
            >
              <CategoryIcon className="w-4 h-4" />
              <span>Categories</span>
            </Link>
          </div>
        </span>

        <Link
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            e.stopPropagation();
            setCollapse(false);
          }}
          href="/admin/transactions"
          id="widget_2"
          className="mt-5 flex flex-col gap-5"
        >
          <div
            className={`${
              path.toString().includes("/admin/transactions") && !collapse
                ? "bg-blue-600 text-white"
                : ""
            } flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
          >
            <DragIcon />
            <span className="w-full">Transactions</span>
          </div>
        </Link>
        <Link
          onClick={(e) => {
            setSidebar({
              active: false,
            });
            e.stopPropagation();
            setCollapse(false);
          }}
          href="/admin/transactions"
          id="widget_2"
          className="mt-5 flex flex-col gap-5"
        >
          <div
            className={`${
              path.toString().includes("/admin/returns") && !collapse
                ? "bg-blue-600 text-white"
                : ""
            } flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
          >
            <DragIcon />
            <span className="w-full">Returns</span>
          </div>
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
