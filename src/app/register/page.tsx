"use client";

import PatternBackground from "@/components/ui/Background/PatternBackground";
import LoginForm from "@/components/ui/Forms/LoginForm";
import RegisterForm from "@/components/ui/Forms/RegisterForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <div className="relative w-full max-h-screen overflow-hidden ">
        <div className="absolute right-0 left-0 flex justify-center top-0 opacity-[1] -z-20">
          <PatternBackground />
        </div>

        <div className="max-w-xl   mx-auto min-h-screen">
          <div className="w-full shadow-lg  rounded-md p-5 flex flex-col gap-5  mt-40 border border-gray-200">
            <div className="text-center">
              <h1 className="font-bold text-3xl text-gray-800 mb-4">
                Register
              </h1>
              <h2 className="text-sm text-gray-600">
                Create your account and continue exploring
              </h2>
            </div>
            <RegisterForm />
            <div>
              <span className="text-gray-800 text-sm">
                Already Have an Account?{" "}
                <Link href="/login" className="text-blue-500 font-bold">
                  Sign In
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
