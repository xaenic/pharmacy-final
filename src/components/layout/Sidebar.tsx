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
          href="/admin/users"
          id="widget_2"
          className="mt-5 flex flex-col gap-5"
        >
          <div
            className={`${
              path.toString().includes("/admin/users") && !collapse
                ? "bg-blue-600 text-white"
                : ""
            } flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1.4em"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4"
              ></path>
            </svg>
            <span className="w-full">Members</span>
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
              path.toString().includes("/admin/transactions") && !collapse
                ? "bg-blue-600 text-white"
                : ""
            } flex gap-2 items-center hover:bg-blue-500 hover:text-white  cursor-pointer texr-gray-700 rounded-lg px-3 p-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z"
              ></path>
            </svg>
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
          href="/admin/returns"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m-32 96a8 8 0 0 1-8 8H99.31l10.35 10.34a8 8 0 0 1-11.32 11.32l-24-24a8 8 0 0 1 0-11.32l24-24a8 8 0 0 1 11.32 11.32L99.31 128H168v-24a8 8 0 0 1 16 0Z"
              ></path>
            </svg>
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
