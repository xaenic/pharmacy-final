"use client";
import { signOut } from "@/auth";

const LogoutButton = () => {
  return (
    <button className="text-blue-600" onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default LogoutButton;
