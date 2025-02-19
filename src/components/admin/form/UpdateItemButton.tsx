"use client";

import useModal from "@/components/admin/form/modal/useModal";
import Modal from "@/components/admin/form/modal/Modal";
import { CategoryFull, ItemFull, PostFull, Type } from "@/lib/type";
import PostForm from "@/components/admin/form/PostForm";
import UpdateIcon from "@/components/icons/UpdateIcon";
import ItemForm from "@/components/admin/form/ItemForm";
import React from "react";
import { updateItem } from "@/app/actions/drawings/admin";

type Props = {
  item: ItemFull | PostFull;
  categories?: CategoryFull[];
};
export default function UpdateItemButton({ item, categories }: Props) {
  const { isOpen, toggle } = useModal();
  const action = updateItem;

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
          <ItemForm
            categories={categories}
            item={item}
            toggleModal={toggle}
            itemAction={action}
          />
        ) : item.type === Type.POST ? (
          <PostForm post={item} toggleModal={toggle} />
        ) : undefined}
      </Modal>
    </>
  );
}
