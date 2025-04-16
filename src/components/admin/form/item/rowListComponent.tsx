"use client";

import Image from "next/image";

import { DeleteButtonProps } from "@/components/admin/form/deleteButton";
import s from "../../adminList.module.css";
import React, { ReactElement } from "react";
import { AddUpdateButtonProps } from "@/components/admin/form/addUpdateButton";

type Props = {
  raw1: string;
  raw2?: string;
  raw3?: string;
  imageSrc: string;
  AddUpdateButton: ReactElement<AddUpdateButtonProps>;
  DeleteButton: ReactElement<DeleteButtonProps>;
};

export default function RowListComponent({
  raw1,
  raw2,
  raw3,
  imageSrc,
  AddUpdateButton,
  DeleteButton,
}: Props) {
  return (
    <ul className={s.itemList}>
      <li className={s.itemTitle}>{raw1}</li>
      {raw2 && <li className={s.itemCategory}>{raw2}</li>}
      {raw3 && <li className={s.itemYear}>{raw3}</li>}
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
      <li className={s.icon}>{AddUpdateButton}</li>
      <li className={s.icon}>{DeleteButton}</li>
    </ul>
  );
}
