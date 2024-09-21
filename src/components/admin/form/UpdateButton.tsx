"use client";

import { GrUpdate } from "@react-icons/all-files/gr/GrUpdate";
import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import ItemForm from "@/components/admin/form/ItemForm";
import CategoryForm from "@/components/admin/form/CategoryForm";
import { Category, PaintingFull, PostFull, SculptureFull } from "@/lib/db/item";
import PostForm from "@/components/admin/form/PostForm";
import {
  isPaintingFull,
  isPostFull,
  isSculptureFull,
} from "@/utils/commonUtils";

type Props = {
  item: PaintingFull | SculptureFull | Category | PostFull;
  type: string;
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
        <GrUpdate />
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        {isPaintingFull(item) || isSculptureFull(item) ? (
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
