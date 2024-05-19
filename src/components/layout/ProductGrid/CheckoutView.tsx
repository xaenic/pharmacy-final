"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { IUser } from "@/lib/models/userModel";
import { Select, SelectItem } from "@nextui-org/select";
import { CartItem } from "@/lib/types/CartItems";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/lib/action";
import toast from "react-hot-toast";
import { BillingDetail } from "@/lib/types/Transaction";

function CheckoutView({
  user,
  billing,
  items,
  total,
}: {
  user: IUser;
  billing: BillingDetail | null;
  items: CartItem[] | null;
  total: number;
}) {
  const city = ["LAPU-LAPU", "CEBU", "TOLEDO"];
  const [barangay, setBarangay] = useState(billing?.barangay);
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

  const { register, handleSubmit, control } = useForm();
  const { isSubmitting, isSubmitSuccessful } = useFormState({ control });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await placeOrder("a", data);
      // Redirect after successful form submission
      // Change '/thank-you' to the path you want to redirect to
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push("/thank-you");
    }
  }, [isSubmitSuccessful]);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-6 w-full"
      >
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-10">Billing Details</h1>
          <div className="grid w-full gap-4">
            <Input
              type="text"
              {...register("firstname")}
              radius="full"
              label="First Name"
              variant="flat"
              defaultValue={billing?.first_name}
            />
            <Input
              type="text"
              {...register("lastname")}
              radius="full"
              label="Last Name"
              variant="flat"
              className="shadow-none"
              defaultValue={billing?.last_name}
            />
            <Input
              type="text"
              {...register("phone_number")}
              radius="full"
              label="Phone Number"
              variant="flat"
              className="shadow-none"
              defaultValue={user.phone_number}
            />
            <Input
              type="email"
              {...register("email")}
              radius="full"
              label="Email"
              variant="flat"
              className="shadow-none"
              defaultValue={user.email}
            />

            <Select
              {...register("city")}
              label="Select City"
              className="w-full"
            >
              {city.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </Select>
            <Select
              {...register("barangay")}
              label="Select Barangay"
              className="w-full"
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
            >
              {cebuBarangays.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              {...register("address")}
              radius="full"
              label="Street Address"
              variant="flat"
              className="shadow-none"
              name="address"
              defaultValue={billing?.address || ""}
            />
            <Input
              type="text"
              {...register("zipcode")}
              radius="full"
              label="Zip Code"
              variant="flat"
              className="shadow-none"
              name="zipcode"
              defaultValue={billing?.zipcode + "" || ""}
            />
          </div>
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
              {items?.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between border-b pb-4"
                >
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
              <span className="text-xl font-semibold">{total}</span>
            </div>
            <small className="text-gray-500 ">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </small>

            {isSubmitting ? (
              <Button type="submit" color="primary" size="lg" isLoading>
                Placing Order...
              </Button>
            ) : (
              <Button type="submit" color="primary" size="lg">
                Place Order
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default CheckoutView;
