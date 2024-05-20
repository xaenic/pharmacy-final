"use client";
import { updateStatus } from "@/lib/action";
import { updateTransaction } from "@/lib/db/transaction";
import { Transaction } from "@/lib/types/Transaction";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function TransactionView({
  transactions,
  user_id,
}: {
  transactions: Transaction[];
  user_id: number;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const clickHandler = async (
    user_id: number,
    transaction_id: number,
    status: string
  ) => {
    setLoading(true);

    await updateStatus(user_id, transaction_id, status);
    router.refresh();
    setLoading(false);
  };
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {transactions.map((e, i) => (
          <div
            key={e.id}
            className="bg-white p-4 shadow-sm border rounded-xl w-full"
          >
            <div className="items-center flex justify-between">
              <small>Transaction ID: {e.id}</small>
              <div className="flex flex-col">
                <small className="text-rose-500">{e.status}</small>

                <small className="text-gray-500">
                  {new Date(e.date_created).toLocaleString()}
                </small>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-3">
              {e?.items?.map((item, i) => (
                <div key={i}>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <div className="flex items-start">
                      <Image
                        src={item.image}
                        alt={item.product_name}
                        width={10}
                        height={10}
                        unoptimized={true}
                        className="w-20 h-20"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-sm">{item.product_name}</h2>
                        <h1>x {item.qty}</h1>
                      </div>
                    </div>
                    <div>
                      <h1>₱{item.price}</h1>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full border-t p-2 text-sm flex items-end flex-col ">
                <span>Order Total: ₱{e.total}</span>
                <div className="flex gap-3 mt-4">
                  {e.status == "Pending" && loading ? (
                    <Button
                      onClick={() => clickHandler(user_id, e.id, "Cancelled")}
                      color="danger"
                      className="text-white"
                      size="sm"
                      isLoading
                    >
                      Cancel
                    </Button>
                  ) : e.status == "Pending" ? (
                    <Button
                      onClick={() => clickHandler(user_id, e.id, "Cancelled")}
                      color="danger"
                      className="text-white"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  ) : e.status == "Cancelled" && !loading ? (
                    <Button
                      color="default"
                      className="text-white outline-none"
                      disabled
                      size="sm"
                    >
                      Cancelled
                    </Button>
                  ) : (
                    <>
                      <Button color="primary" className="text-white" size="sm">
                        Order Received
                      </Button>
                      <Button color="default" className="text-white" size="sm">
                        Return Items
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TransactionView;
