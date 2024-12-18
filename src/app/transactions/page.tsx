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
import { BillingDetail, Transaction } from "@/lib/types/Transaction";
import { getBillingDetail, getUserTransactions } from "@/lib/db/transaction";
import TransactionView from "@/components/layout/ProductGrid/TransactionView";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default async function Transactions() {
  const session = (await auth()) as any;
  const transactions: Transaction[] | null = session
    ? await getUserTransactions(session?.user.staff_id)
    : null;
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
            <section className="bg-slate-200  w-full p-5 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-medium">Transactions</h1>
              <div className=" mt-3 flex text-xs gap-2">
                <Link href="/">Home</Link>
                <span></span>
                <span>Transactions</span>
              </div>
            </section>
            <section className="bg-white p-10 flex items-start justify-center gap-4 min-h-screen">
              {transactions && transactions?.length > 0 ? (
                <TransactionView
                  user_id={session?.user?.staff_id}
                  transactions={transactions}
                />
              ) : (
                <h1 className="w-full text-center text-xl font-semibold">
                  You do not have any transactions yet.
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
