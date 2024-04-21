"use client";

import CategoryModal from "@/components/ui/modals/CategoryModal";
import DeleteModal from "@/components/ui/modals/DeleteModal";
import EditModal from "@/components/ui/modals/EditModal";
import ProductModal from "@/components/ui/modals/ProductModal";
import useModalStore from "@/store/store";
import { useEffect } from "react";

function Modals() {
  const { active, shown, id } = useModalStore();

  useEffect(() => {
    console.log(active);
  }, [active]);
  return (
    <>
      {active && shown == "Category" ? <CategoryModal /> : null}
      {active && shown == "Product" ? <ProductModal /> : null}
      {active && shown == "Edit" ? <EditModal id={id} /> : null}
      {active && shown == "Delete" ? <DeleteModal id={id} /> : null}
    </>
  );
}

export default Modals;
