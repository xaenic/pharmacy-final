import { auth } from "@/auth";
import CartIcon from "@/components/icons/CartIcon";
import MainNavbar from "@/components/layout/Customer/MainNavbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/ui/Cards/CategoryCard";
import EmblaCarousel from "@/components/ui/Carousel/Carousel";
import Slider from "@/components/ui/Carousel/Slider";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import { Button } from "@nextui-org/button";
import { geTCartItems } from "@/lib/db/cart_item";
import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/db/db";

import Products from "@/components/layout/ProductGrid/Products";
import ProductModal from "@/components/ui/modals/ProductModal";
import CartModal from "@/components/ui/modals/CustomerModal/CartModal";
import { CartItem } from "@/lib/types/CartItems";
import { Toaster } from "react-hot-toast";
import CartView from "@/components/layout/ProductGrid/CartView";
export default async function ViewCart() {
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
            <section className="bg-slate-200  w-full p-5 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-medium">Cart</h1>
              <div className=" mt-3 flex text-xs gap-2">
                <Link href="/">Home</Link>
                <span></span>
                <span>Cart</span>
              </div>
            </section>
            <section className="bg-white p-10 flex items-start gap-4 min-h-screen">
              <CartView cartItems={items} user_id={session?.user?.staff_id} />
            </section>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
