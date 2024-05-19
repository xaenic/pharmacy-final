"use client";

import { addToCart, deleteItemFromCart } from "@/lib/db/cart_item";
import { CartItem } from "@/lib/types/CartItems";
import { Product } from "@/lib/types/Product";
import { useModalStore } from "@/store/store";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function CartModal({
  items,
  user_id,
}: {
  items: CartItem[] | null;
  user_id: any;
}) {
  const { active, shown, id, setModal } = useModalStore();
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const router = useRouter();
  useEffect(() => {
    const calculateTotalPrice = (
      items: CartItem[] | null
    ): number | undefined => {
      return items?.reduce((total, item) => total + item.price * item.qty, 0);
    };
    const get = calculateTotalPrice(items);
    if (get) setTotal(get);
    else setTotal(0);
  }, [items]);

  const increment = async (id: number, quantity: number, orig: number) => {
    await addToCart(undefined, user_id, id, quantity + 1 - orig);
    router.refresh();
  };
  const decrement = async (id: number, quantity: number, orig: number) => {
    if (quantity <= 0) return;
    quantity = quantity - orig;
    await addToCart(undefined, user_id, id, quantity);
    router.refresh();
  };
  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <>
      <Toaster
        toastOptions={{
          className: "text-xs text-red-600 bg-orange-600",
          style: {
            color: "#000",
          },
        }}
      />
      <div
        className={`bg-black bg-opacity-10 select-none absolute w-full h-full z-30  ${
          active ? "" : "hidden"
        }`}
      >
        {" "}
      </div>
      <AnimatePresence>
        {active && shown === "Cart" ? (
          <motion.div
            className="z-40 h-full w-64 flex justify-between flex-col pb-3 shadow-lg rounded-tl-lg rounded-bl-lg fixed bg-white right-0"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="items-center flex justify-between p-5">
              <h1>Shopping Cart</h1>
              <span
                className="cursor-pointer"
                onClick={() =>
                  setModal({
                    active: false,
                    shown: null,
                  })
                }
              >
                x
              </span>
            </div>
            <hr />
            <div className="mt-2 flex justify-start flex-col gap-4 h-[65%] overflow-y-auto">
              {items?.map((e, i) => (
                <div
                  key={e.id}
                  className="ml-2 flex flex-row gap-2 border-b-2 pb-4 border-slate-100"
                >
                  <Image
                    alt="asd"
                    src={e.image}
                    width={10}
                    height={10}
                    unoptimized={true}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-medium">{e.product_name}</p>
                    <p className="text-xs font-medium">{e.category_name}</p>
                    <p className="text-xs font-medium">₱ {e.price}</p>
                    <span className="text-slate-600 text-xs">
                      {e.quantity} Stocks Available
                    </span>
                    <div className="text-xs flex flex-row gap-10 bg-slate-200 rounded-lg shadow-xl self-start p-1 items-center justify-center">
                      <span
                        onClick={() => {
                          if (e.quantity < e.qty + 1) {
                            toast.error("Not enough stocks available");
                          } else {
                            increment(e.product_id, e.qty, e.qty);
                          }
                        }}
                        className="text-xl cursor-pointer select-none"
                      >
                        +
                      </span>
                      <span>{e.qty}</span>
                      <span
                        onClick={() => {
                          decrement(e.product_id, e.qty - 1, e.qty);
                        }}
                        className="text-xl cursor-pointer select-none"
                      >
                        -
                      </span>
                    </div>
                    <div
                      onClick={async () => {
                        await deleteItemFromCart(user_id, e.id);
                        toast.success("Item deleted from cart");
                        router.refresh();
                      }}
                      className="text-xs bg-red-600 text-center self-start p-1 px-2 rounded-md text-white cursor-pointer"
                    >
                      Remove
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end flex-col p-3 pt-0">
              <div className="my-5 pl-3">
                Subtotal:{" "}
                <span className="text-sky-500">₱{formatPrice(total)}</span>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  href="/viewcart"
                  as={Link}
                  color="default"
                  size="md"
                  className="rounded-full w-full"
                >
                  View Cart
                </Button>
                <Button
                  color="primary"
                  size="md"
                  className="rounded-full w-full"
                >
                  Proceed Checkout
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default CartModal;
