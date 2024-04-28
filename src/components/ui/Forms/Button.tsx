import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const Button = ({ name, color }: { name: string; color: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`w-full ${
        pending ? "bg-gray-400" : color
      } gap-2 items-center text-xs flex text-white py-2 px-3 rounded-md hover:bg-opacity-70 duration-300 transition-colors justify-center`}
    >
      {pending ? (
        <>
          <ClipLoader color="#fff" size={14} />
          <span>{name}</span>
        </>
      ) : (
        name
      )}
    </button>
  );
};

export default Button;
