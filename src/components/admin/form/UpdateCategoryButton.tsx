"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/modal";
import CategoryForm from "@/components/admin/form/CategoryForm";
import { Category, ItemFull, Type } from "@/lib/type";
import UpdateIcon from "@/components/icons/UpdateIcon";

type Props = {
  category: Category;
  items: ItemFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
  disabled?: boolean;
};
export default function UpdateCategoryButton({
  category,
  items,
  type,
  disabled,
}: Props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button
        onClick={toggle}
        className="iconButton"
        aria-label="Mise à jour"
        disabled={disabled ? disabled : false}
      >
        <UpdateIcon />
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
