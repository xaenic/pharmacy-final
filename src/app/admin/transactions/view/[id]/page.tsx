import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export const dynamic = "force-dynamic";
import { Toaster } from "react-hot-toast";
import { getProductById } from "@/lib/db/db";

import { Product } from "@/lib/types/Product";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getBillingDetail, getTransaction } from "@/lib/db/transaction";
import { Transaction } from "@/lib/types/Transaction";
import { ok } from "assert";
interface Props {
  params: { id: any };
}
export default async function TransactionView({ params }: Props) {
  const { id } = params;
  const transaction = await getTransaction(id);
  let total = 0;

  const billing = await getBillingDetail(transaction?.user_id || 1);
  if (!transaction) return redirect("/admin");

  transaction.items.map((e, i) => (total += e.price * e.qty));
  const formatDate = (dateString: string, ok = false) => {
    const date = new Date(dateString);

    if (ok)
      return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

    if (!ok)
      return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  };
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
              <span className="text-xl font-medium">
                Transaction
                <span className="text-sky-500">#{transaction.id}</span>
              </span>
              <small className="text-sm text-slate-500">
                Created At {formatDate(transaction.date_created, true)}
              </small>

              <span
                className={`${
                  transaction.status == "Cancelled"
                    ? "text-red-500"
                    : "text-green-500"
                } text-sm`}
              >
                {transaction.status}
              </span>
            </div>
            <div>
              <Link
                href="/admin/transactions"
                className="text-sm flex items-center border p-2 px-4 gap-3 rounded-md hover:bg-gray-200 transition-colors duration-200 "
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
          <h1 className="text-center text-2xl font-medium">Pharmacy</h1>
          <div className="flex p-5 justify-between items-center">
            <div className="text-sm flex flex-col">
              <span className="text-gray-600 font-medium">
                TRANSACTION FROM
              </span>
              <div className="text-xl font-medium">
                {transaction.firstname} {transaction.lastname}
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.6em"
                    height="1.6em"
                    viewBox="0 0 24 24"
                    className="text-sky-500"
                  >
                    <path
                      fill="currentColor"
                      d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                    ></path>
                  </svg>
                  <p className="max-w-xs text-gray-500">
                    {billing?.address} {billing?.barangay} {billing?.city}{" "}
                    {billing?.zipcode}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.3em"
                    height="1.3em"
                    viewBox="0 0 24 24"
                    className="text-sky-500"
                  >
                    <path
                      fill="currentColor"
                      d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25c1.12.37 2.32.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                    ></path>
                  </svg>
                  <p className="max-w-xs text-gray-500">
                    +{transaction.phone_number}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-sky-500 text-xl font-semibold">
                TRANSACTION
              </h1>
              <div>
                <div className="flex justify-between font-medium">
                  <span className="text-sm text-gray-500">
                    TRANSACTION ID :
                  </span>
                  <span className="text-gray-700 text-sm">
                    {transaction.id}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-sm text-gray-500 ">DATE :</span>
                  <span className="text-gray-700 text-sm">
                    {formatDate(transaction.date_created, false)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5  overflow-x-auto">
            <table className="w-full text-sm rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs   rounded-md  border-b border-gray-200">
                <tr>
                  <th className="border px-4 py-4 font-medium border-none text-sky-500 text-center ">
                    ITEM ID
                  </th>
                  <th className="border px-4 py-4 font-medium border-none text-sky-500 text-left">
                    NAME
                  </th>

                  <th className="border px-4 py-4 font-medium border-none text-sky-500 text-center"></th>

                  <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
                  <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
                  <th className="border px-4 py-4 font-medium border-none text-gray-500 text-center"></th>
                  <th className="border px-4 py-4 font-medium border-none text-sky-500 text-center">
                    PRICE
                  </th>

                  <th className="border px-4 py-4 font-medium border-none text-sky-500 text-center">
                    QUANTITY
                  </th>
                  <th className="border px-4 py-4 font-medium border-none text-sky-500 text-center">
                    AMOUNT
                  </th>
                  <th className="border px-4 py-4 font-medium border-none text-sky-500 text-center"></th>
                </tr>
              </thead>
              <tbody id="tbody" className="relative">
                {transaction.items.map((e, i) => (
                  <tr
                    key={e.id}
                    className="hover:bg-gray-300 transition-colors duration-200"
                  >
                    <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
                      {e.code}
                    </td>

                    <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500 flex justify-start">
                      {e.product_name}
                    </td>
                    <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                    <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                    <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                    <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                    <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
                      {e.price}
                    </td>

                    <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
                      {e.qty}
                    </td>
                    <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500">
                      ₱ {e.qty * e.price}
                    </td>
                  </tr>
                ))}
                <tr className="hover:bg-gray-300 transition-colors duration-200">
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500 flex justify-start"></td>
                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-left text-md font-medium  text-gray-700">
                    Subtotal
                  </td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-md  text-gray-500">
                    ₱{total}
                  </td>
                </tr>
                <tr className="hover:bg-gray-300 transition-colors duration-200">
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500 flex justify-start"></td>
                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-left text-md   text-gray-700">
                    Processing Fee
                  </td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-md  text-gray-500">
                    ₱ 10.00
                  </td>
                </tr>
                <tr className="hover:bg-gray-300 transition-colors duration-200 border-b">
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500 flex justify-start"></td>
                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-left text-md  text-gray-700">
                    TAX
                  </td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-md  text-gray-500">
                    ₱32.00
                  </td>
                </tr>
                <tr className="hover:bg-gray-300 transition-colors duration-200 ">
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500 flex justify-start"></td>
                  <td className=" font-medium border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-left font-medium text-lg  text-gray-700">
                    GRAND TOTAL
                  </td>

                  <td className=" border px-4 py-4 border-none text-center text-xs  text-gray-500"></td>
                  <td className=" border px-4 py-4 border-none text-center text-lg font-medium text-gray-500">
                    ₱{total + 10 + 32}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
