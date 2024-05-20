"use client";
import { signOut } from "@/auth";
import LogoutIcon from "@/components/icons/LogoutIcon";

const LogoutButton = () => {
  return (
    <div className="flex  gap-3">
      <LogoutIcon className="text-gray-700 text-sm w-4 h-4" />
      <button className="text-gray-700 text-sm" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
