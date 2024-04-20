"use client";
import { signOut } from "@/auth";

const LogoutButton = () => {
  return (
    <button
      className="text-white text-center self-center"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
