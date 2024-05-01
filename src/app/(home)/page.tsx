import MainNavbar from "@/components/layout/Customer/MainNavbar";
import LogoutButton from "@/components/ui/Forms/LogoutButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <MainNavbar />
      </div>
    </>
  );
}
