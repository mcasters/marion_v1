"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/modal";
import { Category, Item, Type } from "@/lib/type";
import PostForm from "@/components/admin/form/item/postForm";
import ItemForm from "@/components/admin/form/item/itemForm";
import React from "react";
import s from "@/components/admin/admin.module.css";
import modalStyle from "@/components/admin/modal.module.css";
import UpdateIcon from "@/components/icons/updateIcon";
import CategoryForm from "@/components/admin/form/item/categoryForm";

export type AddUpdateButtonProps = {
  item: Item;
  categories?: Category[];
  disabled?: boolean;
};
export default function AddUpdateButton({
  item,
  categories,
  disabled,
}: AddUpdateButtonProps) {
  const { isOpen, toggle } = useModal();
  const isUpdate = item.id != 0 || item.key === "no-category";
  const title = "Ajouter "
    .concat(
      item.type === Type.DRAWING || item.type === Type.POST ? "un " : "une ",
    )
    .concat(item.type);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        className={isUpdate ? "iconButton" : `${s.addButton} adminButton`}
        aria-label={isUpdate ? "Mise à jour" : "Ajout"}
        disabled={disabled ? disabled : false}
      >
        {isUpdate ? (
          <UpdateIcon />
        ) : (
          `Ajouter ${item.type === Type.DRAWING || item.type === Type.POST ? "un" : "une"} ${item.type}`
        )}
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <div className={modalStyle.modalContainer}>
          <h2 className={modalStyle.modalTitle}>{title}</h2>
          {item.type === Type.DRAWING ||
          item.type === Type.SCULPTURE ||
          item.type === Type.PAINTING ? (
            <ItemForm
              item={item}
              toggleModal={toggle}
              categories={categories}
            />
          ) : item.type === Type.POST ? (
            <PostForm post={item} toggleModal={toggle} />
          ) : (
            <CategoryForm category={item} toggleModal={toggle} />
          )}
        </div>
      </Modal>
    </>
  );
}
