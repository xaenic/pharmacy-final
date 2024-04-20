import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

const Button = ({ name }: { name: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full bg-gray-800 text-white py-2 p-1 rounded-md hover:bg-gray-600 duration-300 transition-colors"
    >
      {pending ? "Saving..." : name}
    </button>
  );
};

export default Button;
