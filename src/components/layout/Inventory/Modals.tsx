"use client";

import CategoryModal from "@/components/ui/modals/CategoryModal";
import DeleteCategoryModal from "@/components/ui/modals/CategoryModals/DeleteCategoryModal";
import EditCategoryModal from "@/components/ui/modals/CategoryModals/EditCategoryModal";
import DeleteModal from "@/components/ui/modals/DeleteModal";
import EditModal from "@/components/ui/modals/EditModal";
import ProductModal from "@/components/ui/modals/ProductModal";
import { useModalStore } from "@/store/store";
import { useEffect } from "react";

function Modals({ categories }: any) {
  const { active, shown, id } = useModalStore();

  useEffect(() => {
    console.log(active);
  }, [active]);
  return (
    <>
      {active && shown == "Category" ? <CategoryModal /> : null}
      {active && shown == "Product" ? (
        <ProductModal categories={categories} />
      ) : null}
      {active && shown == "Edit" ? (
        <EditModal categories={categories} id={id} />
      ) : null}
      {active && shown == "EditCategory" ? (
        <EditCategoryModal categories={categories} id={id} />
      ) : null}
      {active && shown == "Delete" ? <DeleteModal id={id} /> : null}
      {active && shown == "DeleteCategory" ? (
        <DeleteCategoryModal id={id} />
      ) : null}
    </>
  );
}

export default Modals;
