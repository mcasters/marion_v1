"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/modal";
import { Category, ItemFull, PostFull, Type } from "@/lib/type";
import PostForm from "@/components/admin/form/post/postForm";
import ItemForm from "@/components/admin/form/item/itemForm";
import React from "react";
import s from "@/components/admin/admin.module.css";
import UpdateIcon from "@/components/icons/updateIcon";

type Props = {
  item: ItemFull | PostFull;
  action: (
    prevState: { message: string; isError: boolean } | null,
    formData: FormData,
  ) => Promise<{ isError: boolean; message: string }>;
  categories?: Category[];
};
export default function AddUpdateButton({ item, action, categories }: Props) {
  const { isOpen, toggle } = useModal();
  const isUpdate = item.id != 0;

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        className={isUpdate ? "iconButton" : `${s.addButton} adminButton`}
        aria-label={isUpdate ? "Mise à jour" : "Ajout"}
      >
        {isUpdate ? (
          <UpdateIcon />
        ) : (
          `Ajouter ${item.type === Type.DRAWING || item.type === Type.POST ? "un" : "une"} ${item.type}`
        )}
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        {item.type === Type.DRAWING ||
        item.type === Type.SCULPTURE ||
        item.type === Type.PAINTING ? (
          <ItemForm
            item={item}
            formAction={action}
            toggleModal={toggle}
            categories={categories}
          />
        ) : item.type === Type.POST ? (
          <PostForm post={item} formAction={action} toggleModal={toggle} />
        ) : undefined}
      </Modal>
    </>
  );
}
