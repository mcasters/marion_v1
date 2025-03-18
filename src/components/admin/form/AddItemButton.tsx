"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import { Category, ItemFull, PostFull, Type } from "@/lib/type";
import PostForm from "@/components/admin/form/PostForm";
import ItemForm from "@/components/admin/form/ItemForm";
import React from "react";
import { createItem } from "@/app/actions/items/admin";
import s from "@/styles/admin/admin.module.css";

type Props = {
  item: ItemFull | PostFull;
  categories?: Category[];
};
export default function AddItemButton({ item, categories }: Props) {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        className={`${s.addButton} adminButton`}
        aria-label="Ajout"
      >
        {`Ajouter une ${item.type}`}
      </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        {item.type === Type.DRAWING ||
        item.type === Type.SCULPTURE ||
        item.type === Type.PAINTING ? (
          <ItemForm
            categories={categories}
            item={item}
            toggleModal={toggle}
            itemAction={createItem}
          />
        ) : item.type === Type.POST ? (
          <PostForm post={item} toggleModal={toggle} />
        ) : undefined}
      </Modal>
    </>
  );
}
