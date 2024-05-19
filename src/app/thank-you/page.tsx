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
export default async function ThankYou() {
  const session = (await auth()) as any;
  const items: CartItem[] | null = session
    ? await geTCartItems(session?.user.staff_id)
    : null;
  return (
    <>
      <div className="min-h-screen bg-white relative">
        <CartModal user_id={session?.user?.staff_id} items={items} />
        <MainNavbar total={items?.length ?? null} session={session} />
        <main className="min-h-screen flex flex-col justify-between">
          <section>
            <section className="bg-white p-10 flex flex-col items-center min-h-screen">
              <div className="bg-green-100 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-green-700 mb-4">
                  THANK YOU!
                </h1>
                <p className="text-lg text-gray-700">
                  Your order has been placed successfully.
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  You will receive a confirmation email shortly.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                >
                  Back to Home
                </Link>
              </div>
            </section>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
