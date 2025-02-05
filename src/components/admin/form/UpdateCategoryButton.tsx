"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import CategoryForm from "@/components/admin/form/CategoryForm";
import { CategoryFull, Type } from "@/lib/type";
import UpdateIcon from "@/components/icons/UpdateIcon";
import { updateCategorySculpture } from "@/app/actions/sculptures/admin";
import { updateCategoryDrawing } from "@/app/actions/drawings/admin";
import { updateCategoryPainting } from "@/app/actions/paintings/admin";

type Props = {
  category: CategoryFull;
  itemType: Type;
  disabled?: boolean;
};
export default function UpdateCategoryButton({
  category,
  itemType,
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
          type={itemType}
          categoryAction={
            itemType === Type.SCULPTURE
              ? updateCategorySculpture
              : itemType === Type.DRAWING
                ? updateCategoryDrawing
                : updateCategoryPainting
          }
          toggleModal={toggle}
        />
      </Modal>
    </>
  );
}
