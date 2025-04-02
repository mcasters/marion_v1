"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/modal";
import CategoryForm from "@/components/admin/form/category/categoryForm";
import s from "@/components/admin/admin.module.css";
import { Category, ItemFull, Type } from "@/lib/type";
import UpdateIcon from "@/components/icons/updateIcon";

type Props = {
  category: Category;
  items: ItemFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  disabled?: boolean;
};
export default function AddUpdateCategoryButton({
  category,
  items,
  type,
  disabled,
}: Props) {
  const { isOpen, toggle } = useModal();
  const isUpdate = category.id !== 0 || category.key === "no-category";

  return (
    <>
      <button
        onClick={toggle}
        className={isUpdate ? "iconButton" : `${s.addButton} adminButton`}
        aria-label={isUpdate ? "Ajout" : "Mise à jour"}
        disabled={disabled ? disabled : false}
      >
        {isUpdate ? <UpdateIcon /> : "Ajouter une catégorie"}
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CategoryForm
          category={category}
          items={items}
          type={type}
          toggleModal={toggle}
        />
      </Modal>
    </>
  );
}
