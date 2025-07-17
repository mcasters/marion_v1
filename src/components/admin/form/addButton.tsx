"use client";

import Modal from "@/components/admin/form/modal.tsx";
import { Category, Item, Type } from "@/lib/type";
import PostForm from "@/components/admin/form/item/postForm";
import WorkForm from "@/components/admin/form/item/workForm.tsx";
import React, { useState } from "react";
import s from "@/components/admin/admin.module.css";
import CategoryForm from "@/components/admin/form/item/categoryForm";

export type Props = {
  item: Item;
  categories?: Category[];
  disabled?: boolean;
};
export default function AddButton({ item, categories, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isCategory = item.type === Type.CATEGORY;
  const isPost = item.type === Type.POST;
  const isWork = !isCategory && !isPost;
  const form = isWork ? (
    <WorkForm
      item={item}
      onClose={() => setIsOpen(false)}
      categories={categories}
    />
  ) : isCategory ? (
    <CategoryForm category={item} onClose={() => setIsOpen(false)} />
  ) : (
    <PostForm post={item} onClose={() => setIsOpen(false)} />
  );
  const title = "Ajouter "
    .concat(item.type === Type.DRAWING || isPost ? "un " : "une ")
    .concat(item.type);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className={`${s.addButton} adminButton`}
        aria-label={"Ajout"}
        disabled={disabled ? disabled : false}
      >
        {title}
      </button>
      {isOpen && <Modal title={title}>{form}</Modal>}
    </>
  );
}
