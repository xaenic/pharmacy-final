"use client";
import { signOut } from "@/auth";
import LogoutIcon from "@/components/icons/LogoutIcon";

const LogoutButton = () => {
  return (
    <div className="flex items-center gap-3">
      <LogoutIcon className="text-white w-5 h-5" />
      <button
        className="text-white text-center self-center"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
