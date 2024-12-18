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
import { getBillingDetail } from "@/lib/db/transaction";
import { BillingDetail } from "@/lib/types/Transaction";
export default async function CheckOut() {
  const session = (await auth()) as any;
  const billing: BillingDetail | null = await getBillingDetail(
    session?.user?.staff_id
  );

  console.log(billing);
  const items: CartItem[] | null = session
    ? await geTCartItems(session?.user.staff_id)
    : null;
  let total = 0;

  if (items) items.map((e, i) => (total += e.price * e.qty));

  return (
    <>
      <div className="min-h-screen bg-white relative">
        <CartModal user_id={session?.user?.staff_id} items={items} />
        <MainNavbar total={items?.length ?? null} session={session} />
        <main className="min-h-screen flex flex-col justify-between">
          <section>
            <section className="bg-slate-200  w-full p-5 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-medium">Checkout</h1>
              <div className=" mt-3 flex text-xs gap-2">
                <Link href="/">Home</Link>
                <span></span>
                <span>Checkout</span>
              </div>
            </section>
            <section className="bg-white p-10 flex items-start gap-4 min-h-screen">
              {items && items?.length > 0 ? (
                <CheckoutView
                  billing={billing}
                  items={items}
                  user={session?.user}
                  total={total}
                />
              ) : (
                <h1 className="w-full text-center text-xl font-semibold">
                  Please add an item to your cart first.
                </h1>
              )}
            </section>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
