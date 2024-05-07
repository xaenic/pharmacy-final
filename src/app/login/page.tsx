"use client";

import LoginForm from "@/components/ui/Forms/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <div className="max-w-lg p-5 sm:p-10 mx-auto min-h-screen">
        <div className="shadow-lg  rounded-md p-5 flex flex-col gap-5 w-full mt-40">
          <div className="text-center">
            <h1 className="font-bold text-3xl text-gray-800 mb-4">
              Welcome Back!
            </h1>
            <h2 className="text-sm text-gray-600">
              Login to your account and continue exploring
            </h2>
          </div>
          <LoginForm />
          <div>
            <span className="text-gray-800 text-sm">
              Don{`'`}t have an account?{" "}
              <Link href="/register" className="text-sky-500 font-medium">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
