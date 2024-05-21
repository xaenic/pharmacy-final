"use client";
import CloseIcon from "@/components/icons/CloseIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { addTransaction } from "@/lib/action";
import { addToCart } from "@/lib/db/cart_item";
import { Product } from "@/lib/types/Product";
import { Transaction_Item } from "@/lib/types/Transaction";
import { useModalStore } from "@/store/store";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ItemList({ products, user_id }: any) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [placing, setPlacing] = useState(false);
  const [items, setItems] = useState(products);
  const [oldItems, setOldItems] = useState(products);
  const [addedItems, setAddedItems] = useState<Transaction_Item[]>([]);
  const { setModal } = useModalStore();
  const router = useRouter();

  const incrementQuantity = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const decrementQuantity = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };

  const filterBy = [
    {
      value: "price",
      label: "Price",
    },
    {
      value: "name",
      label: "Name",
    },
  ];

  const removeCartHandler = async (product: Transaction_Item) => {
    const yawa = addedItems;
    const existingItemIndex = yawa.findIndex((item) => item.id === product.id);

    yawa.splice(existingItemIndex, 1);
    setAddedItems([...yawa]);
  };

  const addToCartHandler = async (
    stocks: number,
    product: Transaction_Item,
    quantity: number
  ) => {
    if (new Date(product.expiry_date) < new Date()) {
      toast.error("Item Has already Expired");
      return;
    }
    if (stocks == 0) {
      toast.error("No stocks available");
      return;
    }
    let qty = quantity;
    console.log(quantity);
    product["qty"] = quantity;
    const yawa = addedItems;
    const existingItemIndex = yawa.findIndex((item) => item.id === product.id);

    if (existingItemIndex > -1) {
      yawa[existingItemIndex]["qty"] += quantity;
    } else {
      yawa.push({ ...product });
    }
    setAddedItems([...yawa]);
    toast.success("Added Successfully!");
  };

  const searchHandler = (term: string) => {
    let searched = [...products];

    if (term === "") {
      setItems(oldItems);
      return;
    }

    searched = searched.filter((product) =>
      product.product_name.toLowerCase().includes(term.toLowerCase())
    );

    setItems(searched);
  };

  const sortItems = (key: string) => {
    let sorted = [...items];
    if (key === "name")
      sorted.sort((a: any, b: any) =>
        a.product_name.localeCompare(b.product_name)
      );
    if (key === "price") sorted.sort((a: any, b: any) => a.price - b.price);
    setItems(sorted);
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
      {!addedItems.length ? (
        <div className="my-10 border  bg-white p-5">ADD ITEMS FROM BELOW</div>
      ) : (
        <div className="my-10 border p-5 bg-white">
          <div className="  grid grid-cols-4 gap-2">
            {addedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-r pr-4"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => removeCartHandler(item)}
                >
                  <CloseIcon />
                </div>
                <Image
                  src={item.image}
                  alt={item.product_name}
                  width={50}
                  height={50}
                  unoptimized={true}
                />
                <div>
                  <h2 className="text-md max-w-xs line-clamp-1">
                    {item.product_name}
                  </h2>
                  <p className="">x {item.qty}</p>{" "}
                  <p className="text-sky-500">₱{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            {!placing ? (
              <Button
                onClick={async () => {
                  setPlacing(true);

                  const ok = await addTransaction(addedItems);
                  router.push(`/admin/transactions/view/${ok}`);
                  toast.success("Successfully placed");
                  setAddedItems([]);
                  setPlacing(false);
                }}
                color="primary"
              >
                Place Order
              </Button>
            ) : (
              <Button color="primary" isLoading>
                Placing Order
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="w-full">
        <div className="flex justify-between flex-wrap gap-4">
          <Select
            placeholder="Sort By"
            size="sm"
            className="max-w-56 text-xs"
            onChange={(e) => sortItems(e.target.value)}
          >
            {filterBy.map((animal) => (
              <SelectItem
                key={animal.value}
                value={animal.value}
                className="text-xs"
              >
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <div>
            <div className="bg-slate-100 p-1 px-2 rounded-md flex items-center">
              <SearchIcon />
              <input
                onChange={(e) => {
                  searchHandler(e.target.value);
                }}
                type="text"
                className="bg-transparent outline-none text-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-2">
          {items
            ? items.map((e: Transaction_Item) => (
                <div
                  key={e.id}
                  className="p-4 gap-2 flex justify-center items-start flex-col border border-gray-200 h-72"
                >
                  <Image
                    src={e.image}
                    alt={e.product_name}
                    width={10}
                    height={10}
                    unoptimized={true}
                    className="w-28 h-32 self-center bg-white"
                  />

                  <span className="font-medium text-gray-500 text-xs">
                    {e.category_name}
                  </span>
                  <h1 className="line-clamp-1 text-sm max-w-xs text-gray-700 shrink-0">
                    {e.product_name}
                  </h1>
                  <div className="w-full flex justify-between flex-col items-center">
                    <h2 className="text-red-500 font-medium">₱{e.price}</h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decrementQuantity(e.id)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{quantities[e.id] || 1}</span>
                      <button
                        onClick={() => incrementQuantity(e.id)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {loading[e.id] ? (
                    <Button
                      size="sm"
                      color="primary"
                      className="self-center bg-sky-500 shrink-0"
                      isLoading
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        addToCartHandler(e.quantity, e, quantities[e.id] || 1);
                      }}
                      size="sm"
                      color="primary"
                      className="self-center bg-sky-500 shrink-0"
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default ItemList;
