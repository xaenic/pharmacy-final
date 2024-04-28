import GithubIcon from "@/components/icons/GithubIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import Modals from "@/components/layout/Inventory/Modals";
import AddButtons from "@/components/layout/Inventory/AddButtons";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Table from "@/components/ui/Table/Table";
import BigCard from "@/components/ui/Widgets/BigCard";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { Toaster } from "react-hot-toast";
import { getCategories, getProductById, getProducts } from "@/lib/db/db";
import { FadeLoader } from "react-spinners";
import CategoryIcon from "@/components/icons/CategoryIcon";
import FolderIcon from "@/components/icons/FolderIcon";
import AddIcon from "@/components/icons/AddIcon";
import { Product } from "@/lib/types/Product";
import Link from "next/link";
import { redirect } from "next/navigation";
interface Props {
  params: { id: any };
}
export default async function Inventory({ params }: Props) {
  const { id } = params;
  const product: Product = await getProductById(id);
  if (!product) return redirect("/admin");
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
        <Topbar title="Inventory" />
        <div className="mt-10">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-medium">Medicine Details</span>
              <small className="text-xs text-slate-500">
                Product Code {product.code}
              </small>
            </div>
            <div>
              <Link
                href="/admin/inventory/products"
                className="text-xs flex items-center border p-2 px-4 gap-3 rounded-md hover:bg-gray-200 transition-colors duration-200 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 1024 1024"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
                  />
                  <path
                    fill="currentColor"
                    d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
                  />
                </svg>
                <span>Back </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border bg-white p-5">
          <h1>Medicine Information</h1>
          <div className="flex gap-14 flex-wrap items-start p-5 pl-0">
            <div className="text-xs flex flex-col">
              <span className="text-slate-400 ">Name</span>
              <span className="text-gray-600">{product.product_name}</span>
            </div>
            <div className="text-xs flex flex-col">
              <span className="text-slate-400 ">Product Code</span>
              <span className="text-gray-600">#{product.code}</span>
            </div>
            <div className="text-xs flex flex-col">
              <span className="text-slate-400 ">Generic Name</span>
              <span className="text-gray-600">{product.brand}</span>
            </div>
            <div className="text-xs flex flex-col">
              <span className="text-slate-400 ">Manufacturer</span>
              <span className="text-gray-600">{product.manufacturer}</span>
            </div>
            <div className="text-xs flex flex-col">
              <span className="text-slate-400 ">Category</span>
              <span className="text-gray-600">{product.category_name}</span>
            </div>
            <div className="text-xs flex flex-col">
              <span className="text-slate-400 ">Type</span>
              <span className="text-gray-600">{product.type}</span>
            </div>
          </div>
          <div className="text-xs ">
            <h1 className="text-slate-400">Description</h1>
            <p>{product.description}</p>
          </div>
          <div className="mt-5">
            <h1>Stock & Price</h1>
            <div className="flex gap-14 flex-wrap items-start p-5 pl-0">
              <div className="text-xs flex flex-col">
                <span className="text-slate-400 ">Price</span>
                <span className="text-gray-600">{product.price}</span>
              </div>
              <div className="text-xs flex flex-col">
                <span className="text-slate-400 ">Starting Stock</span>
                <span className="text-gray-600">{product.quantity}</span>
              </div>
              <div className="text-xs flex flex-col">
                <span className="text-slate-400 ">Current Stock</span>
                <span className="text-gray-600">{product.quantity}</span>
              </div>
              <div className="text-xs flex flex-col">
                <span className="text-slate-400 ">Stock Status</span>
                <span
                  className={` ${
                    product.quantity == 0
                      ? "text-rose-500"
                      : product.quantity < 50
                      ? "text-orange-500"
                      : "text-green-500"
                  } `}
                >
                  {product.quantity == 0
                    ? "Out of Stocks"
                    : product.quantity < 50
                    ? "Low"
                    : "Available"}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

{
  /* <div className="flex gap-3 mt-10 bg-white rounded-t-md p-3">
          <BigCard
            title="Categories"
            total={options.rows.length}
            color="bg-sky-400  text-sky-600 font-semibold"
            Icon={<CategoryIcon className="text-white w-14 h-14 rounded-md" />}
          />
          <BigCard
            title="Total Products"
            total={products.length}
            color="bg-orange-400  text-sky-600 font-semibold"
            Icon={<FolderIcon className="text-white w-14 h-14 rounded-md" />}
          />
        </div>
        <div className="flex-wrap gap-4 flex justify-between pt-10 items-center bg-white px-3">
          <div className="bg-white border-2 border-gray-400 rounded-md flex items-center p-1">
            <SearchIcon />
            <input
              className="bg-transparent px-2 p-1 outline-none"
              type="text"
              placeholder="Search by name"
            />
          </div>
          <AddButtons />
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center mt-10">
              <FadeLoader color="#0EA5E9" width={3} />
            </div>
          }
        >
          <Table products={products} />
        </Suspense> */
}
