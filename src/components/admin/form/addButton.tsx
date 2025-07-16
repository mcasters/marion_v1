"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/modal";
import { Category, Item, Type } from "@/lib/type";
import PostForm from "@/components/admin/form/item/postForm";
import ItemForm from "@/components/admin/form/item/itemForm";
import React from "react";
import s from "@/components/admin/admin.module.css";
import modalStyle from "@/components/admin/modal.module.css";
import CategoryForm from "@/components/admin/form/item/categoryForm";

export type Props = {
  item: Item;
  categories?: Category[];
  disabled?: boolean;
};
export default function AddButton({ item, categories, disabled }: Props) {
  const { isOpen, toggle } = useModal();
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
        className={`${s.addButton} adminButton`}
        aria-label={"Ajout"}
        disabled={disabled ? disabled : false}
      >
        {title}
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
