"use client";
import LockIcon from "@/components/icons/LockIcon";
import UserIcon from "@/components/icons/UserIcon";
import { authenticate } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import Button from "./Button";
import { useEffect } from "react";

const LoginForm = () => {
  const [error, formAction] = useFormState(authenticate, undefined, "dsa");

  return (
    <>
      {error ? <span className="text-red-600 text-sm"> {error}</span> : null}
      <form action={formAction} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="flex items-center border border-gray-200  p-2 rounded-md">
            <UserIcon />
            <input
              type="text"
              required
              name="email"
              autoComplete="off"
              placeholder="Enter username / email"
              className="w-full border-none focus:border-none outline-none rounded-md p-1 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center border border-gray-200  p-2 rounded-md">
            <LockIcon />
            <input
              type="password"
              name="password"
              required
              autoComplete="off"
              placeholder="Enter password"
              className="w-full border-none focus:border-none outline-none rounded-md p-1 text-sm"
            />
          </div>
        </div>
        <div className="">
          <Button color="bg-sky-600 text-center" name="Login" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
