"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { IUser } from "@/lib/models/userModel";
import { Select, SelectItem } from "@nextui-org/select";
import { CartItem } from "@/lib/types/CartItems";
import { Button } from "@nextui-org/button";
function CheckoutView({
  user,
  items,
}: {
  user: IUser;
  items: CartItem[] | null;
}) {
  const city = ["LAPU-LAPU", "CEBU", "TOLEDO"];
  const cebuBarangays = [
    "Adlaon",
    "Agsungot",
    "Alambijud",
    "Alaska",
    "Aliwanay",
    "Anapog",
    "Apas",
    "Babag",
    "Bacayan",
    "Banawa",
    "Labangon",
  ];
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 gap-6 w-full">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-10">Billing Details</h1>
          <form className="grid  w-full gap-4">
            <Input
              type="text"
              radius="full"
              label="First Name"
              variant="flat"
              defaultValue={user.firstname}
            />
            <Input
              type="text"
              radius="full"
              label="Last Name"
              variant="flat"
              className="shadow-none"
              defaultValue={user.lastname}
            />
            <Input
              type="text"
              radius="full"
              label="Phone Number"
              variant="flat"
              className="shadow-none"
              defaultValue={user.phone_number}
            />
            <Input
              type="email"
              radius="full"
              label="Email"
              variant="flat"
              className="shadow-none"
              defaultValue={user.email}
            />

            <Select label="Select City" className="w-full">
              {city.map((animal) => (
                <SelectItem key={animal} value={animal}>
                  {animal}
                </SelectItem>
              ))}
            </Select>
            <Select label="Select Barangay" className="w-full">
              {cebuBarangays.map((animal) => (
                <SelectItem key={animal} value={animal}>
                  {animal}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              radius="full"
              label="Street Address"
              variant="flat"
              className="shadow-none"
            />
            <Input
              type="number"
              radius="full"
              label="Zip Code"
              variant="flat"
              className="shadow-none"
            />
          </form>
        </div>
        <div>
          <h1 className="text-xl font-bold mb-10">YOUR ORDER</h1>
          <hr />
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">Product</span>
              <span className="text-xl font-semibold">Subtotal</span>
            </div>
            <div className="text-gray-600 text-md flex flex-col gap-3 mt-5">
              {items?.map((e, i) => (
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex gap-2">
                    <span className="line-clamp-1 max-w-xs">
                      {e.product_name}
                    </span>
                    <span className="text-sky-500"> x {e.qty}</span>
                  </div>

                  <span className="">{e.price * e.qty}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-5 mb-5">
              <span className="text-2xl font-semibold capitalize">TOTAL</span>
              <span className="text-xl font-semibold">12312312</span>
            </div>
            <small className="text-gray-500 ">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </small>
            <Button color="primary" size="lg">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutView;
