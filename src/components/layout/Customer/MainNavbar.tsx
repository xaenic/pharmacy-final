"use client";
import Link from "next/link";
import UserIcon from "../../icons/UserIcon";
import Image from "next/image";
import { ToastIcon } from "react-hot-toast";
import TabIcon from "@/components/icons/TabIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import CartIcon from "@/components/icons/CartIcon";
import { signOut } from "@/auth";
import { useModalStore, useSidebar } from "@/store/store";
import MobileSideBar from "./MobileSideBar";

function MainNavbar({
  session,
  total,
}: {
  session: any;
  total: number | null;
}) {
  const { setModal } = useModalStore();
  const { setSidebar } = useSidebar();
  return (
    <>
      <div className="w-full bg-slate-100 items-center text-gray-700 flex justify-between p-2">
        <div>
          <span className="text-xs">
            <span className="text-sky-600 font-medium"> COVID-19 UPDATE:</span>{" "}
            We are open with limited hours and staff.
          </span>
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <span
              onClick={() => signOut()}
              className="cursor-pointer flex items-center gap-2"
            >
              <UserIcon />
              <span className="text-xs">Logout</span>
            </span>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-2">
                <UserIcon />
                <span className="text-xs">Login</span>
              </Link>
              <Link href="/register" className="flex items-center gap-2 ">
                <span className="text-xs">/ </span>
                <span className="text-xs">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="bg-white flex items-center justify-between gap-14 p-4 py-5 lg:py-4 shad lg:px-20">
        <Image
          width={20}
          height={20}
          src="https://demo2.wpopal.com/pharmacy2/wp-content/uploads/2022/03/logo.svg"
          alt="Logo"
          className="w-44 h-8"
        />
        <ul className="lg:flex hidden text-sm text-gray-600 items-center justify-start w-full gap-6">
          <li className="flex items-center gap-2">
            <Link href="/" className="">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link href="/shop" className="">
              Shop
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <Link href="/transactions" className="">
              Transactions
            </Link>
          </li>
        </ul>
        <div className="lg:flex hidden gap-2 items-center">
          <div className="bg-slate-100 flex items-center px-6 py-2 rounded-xl text-xs gap-2">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none bg-transparent"
            />
          </div>
          {!session ? (
            <Link href="/login" className="">
              <CartIcon
                total={null}
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-500 duration-200 transition-colors"
              />
            </Link>
          ) : (
            <div
              onClick={() =>
                setModal({
                  active: true,
                  shown: "Cart",
                })
              }
            >
              <CartIcon
                total={total}
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-500 duration-200 transition-colors"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          {!session ? (
            <Link href="/login" className="">
              <CartIcon
                total={null}
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-500 duration-200 transition-colors"
              />
            </Link>
          ) : (
            <div
              onClick={() =>
                setModal({
                  active: true,
                  shown: "Cart",
                })
              }
            >
              <CartIcon
                total={total}
                className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-500 duration-200 transition-colors"
              />
            </div>
          )}
          <svg
            onClick={() =>
              setSidebar({
                active: true,
              })
            }
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="cursor-pointer"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 6h18M3 12h18M3 18h18"
            ></path>
          </svg>
        </div>
      </nav>
      <MobileSideBar />
    </>
  );
}

export default MainNavbar;
