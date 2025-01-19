"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryForm from "@/components/admin/form/CategoryForm";
import { Category, ItemFull, PostFull, Type } from "@/lib/db/item";
import PostForm from "@/components/admin/form/PostForm";
import UpdateIcon from "@/components/icons/UpdateIcon";

type Props = {
  item: ItemFull | Category | PostFull;
  categories?: Category[];
};
export default function UpdateButton({ item, categories }: Props) {
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
          <CategoryForm category={item} toggleModal={toggle} />
        ) : undefined}
      </Modal>
    </>
  );
}
