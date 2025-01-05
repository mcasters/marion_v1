"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryForm from "@/components/admin/form/CategoryForm";
import {
  Category,
  DrawingFull,
  PaintingFull,
  PostFull,
  SculptureFull,
  Type,
} from "@/lib/db/item";
import PostForm from "@/components/admin/form/PostForm";
import {
  isDrawingFull,
  isPaintingFull,
  isPostFull,
  isSculptureFull,
} from "@/utils/commonUtils";
import UpdateIcon from "@/components/icons/UpdateIcon";

type Props = {
  item: PaintingFull | SculptureFull | DrawingFull | Category | PostFull;
  type: Type;
  categories?: Category[];
};
export default function UpdateButton({ item, type, categories }: Props) {
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
        {isPaintingFull(item) ||
        isSculptureFull(item) ||
        isDrawingFull(item) ? (
          <ItemForm item={item} toggleModal={toggle} categories={categories} />
        ) : isPostFull(item) ? (
          <PostForm post={item} toggleModal={toggle} />
        ) : (
          <CategoryForm category={item} type={type} toggleModal={toggle} />
        )}
      </Modal>
    </>
  );
}
