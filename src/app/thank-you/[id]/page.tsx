import { auth } from "@/auth";
import MainNavbar from "@/components/layout/Customer/MainNavbar";
import Footer from "@/components/layout/Footer";
import { geTCartItems } from "@/lib/db/cart_item";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/db/db";
import CartModal from "@/components/ui/modals/CustomerModal/CartModal";
import { CartItem } from "@/lib/types/CartItems";
import CartView from "@/components/layout/ProductGrid/CartView";
import CheckoutView from "@/components/layout/ProductGrid/CheckoutView";
import { getBillingDetail, getTransaction } from "@/lib/db/transaction";
import Image from "next/image";
interface DetailsPageProps {
  params: { id: any };
}

export default async function ThankYou({ params }: DetailsPageProps) {
  const { id } = params;
  const session = (await auth()) as any;
  const items: CartItem[] | null = session
    ? await geTCartItems(session?.user.staff_id)
    : null;
  const transaction = await getTransaction(id);

  const billing = await getBillingDetail(session?.user?.staff_id);
  let subtotal = 0;
  transaction?.items.map((e, i) => (subtotal += e.price * e.qty));
  return (
    <>
      <div className="min-h-screen bg-white relative">
        <CartModal user_id={session?.user?.staff_id} items={items} />
        <MainNavbar total={items?.length ?? null} session={session} />
        <main className="min-h-screen flex flex-col justify-between">
          <section>
            <section className="bg-white p-10 flex flex-col items-center min-h-screen">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-sky-500 mb-4">
                  THANK YOU!
                </h1>
                <p className="text-lg text-gray-700">
                  Your order has been placed successfully.
                </p>
                <div>
                  <h1 className="mt-4 font-semibold">Order Summary</h1>
                  <div className="text-gray-600 mt-3 border-t w-full pt-2 flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.6em"
                      height="1.6em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                      ></path>
                    </svg>
                    <div className="text-sm flex flex-col">
                      <span>Delivery Address</span>
                      <span>
                        {billing?.first_name} {billing?.last_name} +
                        {session?.user?.phone_number}
                      </span>
                      <span>
                        {billing?.address} {billing?.barangay} {billing?.city}{" "}
                        {billing?.zipcode}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    {transaction?.items.map((e, i) => (
                      <div
                        key={e.id}
                        className="flex items-start border-b pb-4 gap-2"
                      >
                        <Image
                          src={e.image}
                          alt={e.product_name}
                          width={10}
                          height={10}
                          unoptimized={true}
                          className="w-14 h-14 rounded-md shrink-0"
                        />
                        <div className="flex flex-col w-full">
                          <h1 className="line-clamp-1 max-w-xs">
                            {e.product_name}
                          </h1>
                          <div className="flex justify-between">
                            <span>{e.qty} x</span>
                            <div className="text-sky-500">
                              ₱{e.price * e.qty}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-medium">Subtotal</span>
                      <span className="text-xl font-medium">{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium">
                        Processing Fee
                      </span>
                      <span className="text-sm font-medium">₱10.00</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium">TAX</span>
                      <span className="text-sm font-medium">₱32.00</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-medium">Total</span>
                      <span className="text-xl font-medium">
                        {transaction?.total}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="/transactions"
                    className="justify-end mt-6 inline-block bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition duration-200"
                  >
                    View All Transactions
                  </Link>
                </div>
              </div>
            </section>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
