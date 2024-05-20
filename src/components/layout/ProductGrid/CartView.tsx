"use client";
import CloseIcon from "@/components/icons/CloseIcon";
import { deleteItemFromCart } from "@/lib/db/cart_item";
import { CartItem } from "@/lib/types/CartItems";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function CartView({
  total,
  cartItems,
  user_id,
}: {
  total: number;
  cartItems: CartItem[] | null;
  user_id: number;
}) {
  const router = useRouter();
  return (
    <>
      <div className="lg:mx-20 w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div
          id="scroll"
          className={`bg-white rounded-lg mt-5 col-span-2  overflow-x-auto w-full`}
        >
          <table className="w-full text-m7 rounded-md text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs   rounded-md  border-b border-gray-200">
              <tr>
                <th className="border px-4 py-4 font-medium border-none text-gray-800 text-center "></th>
                <th className="border px-4 py-4 font-medium border-none text-gray-800 text-center "></th>
                <th className="border px-4 py-4 font-medium border-none text-gray-800 text-center">
                  PRODUCT
                </th>

                <th className="border px-4 py-4 font-medium border-none text-gray-800 text-center">
                  PRICE
                </th>
                <th className="border px-4 py-4 font-medium border-none text-gray-800 text-center">
                  QUANTITY
                </th>
                <th className="border px-4 py-4 font-medium border-none text-gray-800 text-center">
                  SUBTOTAL
                </th>
              </tr>
            </thead>

            <tbody id="tbody" className="relative">
              {cartItems && cartItems?.length > 0 ? (
                cartItems?.map((e, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-300 transition-colors duration-200"
                  >
                    <td className=" border px-4 py-4 border-none text-center   text-gray-700">
                      <div
                        className="cursor-pointer"
                        onClick={async () => {
                          await deleteItemFromCart(user_id, e.id);
                          router.refresh();
                        }}
                      >
                        <CloseIcon />
                      </div>
                    </td>
                    <td className=" font-medium border px-4 py-4 border-none text-center   text-gray-700">
                      <Image
                        src={e.image}
                        alt={e.product_name}
                        width={10}
                        height={10}
                        unoptimized={true}
                        className="h-20 w-20"
                      />
                    </td>

                    <td className=" border px-4 py-4 border-none text-center  text-gray-700">
                      {e.product_name}
                    </td>
                    <td className=" border px-4 py-4 border-none text-center   text-gray-700">
                      {e.price}
                    </td>
                    <td className=" border px-4 py-4 border-none text-center   text-gray-700">
                      {e.qty}
                    </td>
                    <td className=" border px-4 py-4 border-none text-center   text-gray-700">
                      ₱{e.qty * e.price}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="right-0 left-0 flex justify-center mt-10 absolute flex-col items-center">
                    <h1 className="font-semibold text-gray-700  text-xl  ">
                      No Items yet
                    </h1>
                    <Link
                      isBlock
                      showAnchorIcon
                      href="/shop"
                      color="primary"
                      className="text-sm"
                    >
                      View Shop
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col w-full p-10  gap-3 pt-0">
          <h1 className="text-2xl font-medium ">Cart Summary</h1>
          <div className="flex justify-between items-center w-full mt-6">
            <h2 className="font-medium text-xl">Subtotal:</h2>
            <span>₱{total}</span>
          </div>
          <div className="flex justify-between items-center w-full mt-6">
            <h2 className="font-medium text-2xl">Total:</h2>
            <span>₱{total}</span>
          </div>
          <Button
            as={Link}
            href="/checkout"
            color="primary"
            variant="solid"
            size="lg"
            className="mt-4 w-full"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
}

export default CartView;
