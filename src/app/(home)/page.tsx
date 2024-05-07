import { auth } from "@/auth";
import MainNavbar from "@/components/layout/Customer/MainNavbar";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import { geTCartItems } from "@/lib/db/cart_item";
import Image from "next/image";

export default async function Home() {
  const session = (await auth()) as any;
  const items: CartItem[] | null = session
    ? await geTCartItems(session?.user.staff_id)
    : null;

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <MainNavbar total={items?.length ?? null} session={session} />
      </div>
    </>
  );
}
