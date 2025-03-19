"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/modal";
import CategoryForm from "@/components/admin/form/CategoryForm";
import s from "@/styles/admin/admin.module.css";
import { Category, ItemFull, Type } from "@/lib/type";

type Props = {
  category: Category;
  items: ItemFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
};
export default function AddCategoryButton({ category, items, type }: Props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button
        onClick={toggle}
        className={`${s.addButton} adminButton`}
        aria-label="Ajout"
      >
        Ajouter une catégorie
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
