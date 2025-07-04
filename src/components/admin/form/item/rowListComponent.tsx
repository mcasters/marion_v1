"use client";

import Image from "next/image";

import DeleteButton from "@/components/admin/form/deleteButton";
import s from "../../adminList.module.css";
import React from "react";
import { Category, Item, Type } from "@/lib/type.ts";
import ItemForm from "@/components/admin/form/item/itemForm.tsx";
import PostForm from "@/components/admin/form/item/postForm.tsx";
import CategoryForm from "@/components/admin/form/item/categoryForm.tsx";
import Modal from "@/components/admin/form/modal/modal.tsx";
import useModal from "@/components/admin/form/modal/useModal.tsx";
import { getImageSrc } from "@/utils/commonUtils.ts";
import { deleteCategory } from "@/app/actions/item-post/categories/admin.ts";
import { deleteItem } from "@/app/actions/item-post/admin.ts";

type Props = {
  item: Item;
  categories?: Category[];
};

export default function RowListComponent({ item, categories }: Props) {
  const isCategory = item.type === Type.CATEGORY;
  const isPost = item.type === Type.POST;
  const isWork = !isCategory && !isPost;
  const imageSrc = getImageSrc(item);
  const { isOpen, toggle } = useModal();

  return (
    <>
      <ul className={s.itemList} onDoubleClick={toggle}>
        <li className={s.itemTitle}>{isCategory ? item.value : item.title}</li>
        <li className={s.itemInfo}>
          {isCategory
            ? `${item.count} ${item.workType}(s)`
            : isPost
              ? new Date(item.date).getFullYear().toString()
              : categories
                ? categories.find((category) => category.id === item.categoryId)
                    ?.value || " "
                : " "}
        </li>
        {isWork && (
          <li className={s.itemYear}>
            {new Date(item.date).getFullYear().toString()}
          </li>
        )}
        <li className={s.itemImage}>
          {imageSrc !== "" && (
            <Image
              src={imageSrc}
              alt="Image principale de l'item"
              height={50}
              width={50}
              style={{
                objectFit: "contain",
              }}
              unoptimized
            />
          )}
        </li>
        <li className={s.itemIcon}>
          <DeleteButton
            action={
              isCategory
                ? () => deleteCategory(item.id, item.workType)
                : () => deleteItem(item.id, item.type)
            }
            disabled={
              isCategory
                ? item.count > 0 || item.key === "no-category"
                : undefined
            }
          />
        </li>
      </ul>
      <Modal isOpen={isOpen} toggle={toggle}>
        {isWork && (
          <ItemForm item={item} toggleModal={toggle} categories={categories} />
        )}
        {isPost && <PostForm post={item} toggleModal={toggle} />}
        {isCategory && <CategoryForm category={item} toggleModal={toggle} />}
      </Modal>
    </>
  );
}
