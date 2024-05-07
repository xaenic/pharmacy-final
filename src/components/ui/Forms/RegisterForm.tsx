"use client";
import LockIcon from "@/components/icons/LockIcon";
import UserIcon from "@/components/icons/UserIcon";
import { authenticate, register } from "@/lib/action";
import { useFormState } from "react-dom";
import Button from "./Button";

const RegisterForm = () => {
  const [error, formAction] = useFormState(register, undefined, "dsa");
  return (
    <>
      {error ? (
        <span
          className={`${
            error.includes("Success") ? "text-green-600" : "text-red-600"
          } text-sm`}
        >
          {" "}
          {error}
        </span>
      ) : null}
      <form action={formAction}>
        <div className="grid grid-cols-2 w-full gap-3">
          <div className="flex flex-col">
            <div className="flex items-center border border-gray-200  p-2 rounded-md">
              <UserIcon />
              <input
                type="text"
                required
                name="firstname"
                autoComplete="off"
                placeholder="First Name"
                className="w-full border-none focus:border-none outline-none rounded-md p-1 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center border border-gray-200  p-2 rounded-md">
              <UserIcon />
              <input
                type="text"
                required
                name="lastname"
                autoComplete="off"
                placeholder="Last Name"
                className="w-full border-none focus:border-none outline-none rounded-md p-1 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center border border-gray-200  p-2 rounded-md">
              <UserIcon />
              <input
                type="email"
                required
                name="email"
                autoComplete="off"
                placeholder="Email address"
                className="w-full border-none focus:border-none outline-none rounded-md p-1 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center border border-gray-200  p-2 rounded-md">
              <UserIcon />
              <select
                name="gender"
                className="w-full text-slate-600 outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center border border-gray-200  p-2 rounded-md">
              <UserIcon />
              <input
                type="number"
                required
                name="phone_number"
                autoComplete="off"
                placeholder="Phone Number"
                className="w-full border-none focus:border-none outline-none rounded-md p-1 text-sm"
              />
              <input
                type="hidden"
                required
                defaultValue="customer"
                name="role"
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
          <div className="col-span-2 ">
            <Button color="bg-sky-600 text-center py-3" name="Register" />
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
