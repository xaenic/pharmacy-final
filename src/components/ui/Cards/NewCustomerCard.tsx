import Link from "next/link";
import React from "react";

function NewCustomerCard() {
  return (
    <div className="bg-white p-4 px-0 rounded-md flex flex-col gap-4 border shadow-sm">
      <div className="flex items-center justify-between mb-1 px-4">
        <h1 className="text-md text-gray-700 font-medium">New Customers</h1>
        <Link href="/admin/customers" className="text-green-500 text-xs">
          View All
        </Link>
      </div>
      <div className=" p-4 w-full flex flex-col ">
        <div className="flex items-center gap-3 border-t py-4">
          <div className="w-7 h-7 rounded-full text-green-600 bg-green-500 bg-opacity-10  text-sm flex items-center justify-center p-5">
            AB
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-700">
              Abu Bin Ishtiyak
            </span>
            <span className="text-slate-400 text-xs">info@softnio.com</span>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t py-4">
          <div className="w-7 h-7 rounded-full text-green-600 bg-green-500 bg-opacity-10  text-sm flex items-center justify-center p-5">
            AB
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-700">
              Abu Bin Ishtiyak
            </span>
            <span className="text-slate-400 text-xs">info@softnio.com</span>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t py-4">
          <div className="w-7 h-7 rounded-full text-green-600 bg-green-500 bg-opacity-10  text-sm flex items-center justify-center p-5">
            AB
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-700">
              Abu Bin Ishtiyak
            </span>
            <span className="text-slate-400 text-xs">info@softnio.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCustomerCard;
