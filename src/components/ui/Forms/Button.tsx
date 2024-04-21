import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

const Button = ({ name, color }: { name: string; color: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`w-full ${color} text-white py-2 px-3 rounded-md hover:bg-opacity-70 duration-300 transition-colors`}
    >
      {pending ? "Saving..." : name}
    </button>
  );
};

export default Button;
