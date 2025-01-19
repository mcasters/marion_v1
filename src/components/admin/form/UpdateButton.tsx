"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryForm from "@/components/admin/form/CategoryForm";
import { CategoryFull, ItemFull, PostFull, Type } from "@/lib/db/item";
import PostForm from "@/components/admin/form/PostForm";
import UpdateIcon from "@/components/icons/UpdateIcon";

type Props = {
  item: ItemFull | CategoryFull | PostFull;
  categories?: CategoryFull[];
  disabled?: boolean;
};
export default function UpdateButton({ item, categories, disabled }: Props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        className="iconButton"
        aria-label="Mise à jour"
        disabled={disabled ? disabled : false}
      >
        <UpdateIcon />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        {item.type === Type.DRAWING ||
        item.type === Type.SCULPTURE ||
        item.type === Type.PAINTING ? (
          <ItemForm item={item} toggleModal={toggle} categories={categories} />
        ) : item.type === Type.POST ? (
          <PostForm post={item} toggleModal={toggle} />
        ) : item.type === Type.CATEGORY ? (
          <CategoryForm
            category={item}
            toggleModal={toggle}
            itemType={item.type}
          />
        ) : undefined}
      </Modal>
    </>
  );
}
