import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

function Status() {
  const { pending } = useFormStatus();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (pending) {
      setLoading(true);
    }

    if (!pending && loading) {
      toast.success("Order has been placed successfully!");
      router.refresh();
      router.push("/transactions");
    }
  }, [pending]);
  return (
    <>
      {pending ? (
        <Button isLoading type="submit" color="primary" size="lg">
          Place Order
        </Button>
      ) : (
        <Button type="submit" color="primary" size="lg">
          Place Order
        </Button>
      )}
    </>
  );
}

export default Status;
