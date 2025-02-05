"use client";

import React, { useState } from "react";
import s from "@/styles/admin/Admin.module.css";
import Image from "next/image";
import { Image as IImage, ItemFull } from "@/lib/type";
import { getEmptyImage } from "@/utils/commonUtils";

type Props = {
  items: ItemFull[];
  value: IImage;
  onChange: (image: IImage) => void;
};

export default function SelectImageForm({ items, value, onChange }: Props) {
  const [filenameSelected, setFilenameSelected] = useState<string>(
    value.filename,
  );

  const onSelectImage = (image: IImage) => {
    setFilenameSelected(image.filename);
    onChange(image);
  };

  return (
    <>
      <label className={s.formLabel}>Image de la catégorie (facultative)</label>
      <div className={s.selectList}>
        <div
          className={`${s.option} ${filenameSelected === "" ? s.imageSelected : ""}`}
          onClick={() => onSelectImage(getEmptyImage())}
        >
          -- Aucune image --
        </div>
        {items.length > 0 &&
          items.map((item) => {
            return (
              <div
                key={item.id}
                className={`${s.option} ${item.images[0].filename === filenameSelected ? s.imageSelected : ""}`}
                onClick={() => onSelectImage(item.images[0])}
              >
                <Image
                  loader={({ src }) => {
                    return `/images/${item.type}/sm/${src}`;
                  }}
                  src={`${item.images[0].filename}`}
                  width={80}
                  height={80}
                  alt="Image de l'item"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
