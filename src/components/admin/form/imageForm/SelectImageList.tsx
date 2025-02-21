"use client";

import React, { useState } from "react";
import s from "@/styles/admin/Admin.module.css";
import Image from "next/image";
import { Image as IImage, ItemFull } from "@/lib/type";
import { getEmptyImage } from "@/utils/commonUtils";
import { useTheme } from "@/app/context/themeProvider";

type Props = {
  items: ItemFull[];
  value: IImage;
  onChange: (image: IImage) => void;
};

export default function SelectImageList({ items, value, onChange }: Props) {
  const theme = useTheme();
  const [selectedColor, setSelectedColor] = React.useState(theme.linkColor);
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
          onClick={() => onSelectImage(getEmptyImage())}
          className={s.option}
          onMouseEnter={() =>
            filenameSelected === ""
              ? setSelectedColor(theme.linkHoverColor)
              : ""
          }
          onMouseLeave={() =>
            filenameSelected === "" ? setSelectedColor(theme.linkColor) : ""
          }
          style={
            filenameSelected === "" ? { background: `${selectedColor}` } : {}
          }
        >
          -- Aucune image --
        </div>
        {items.length > 0 &&
          items.map((item) => {
            return item.images.map((image) => {
              const isSelected = image.filename === filenameSelected;
              return (
                <div
                  key={image.id}
                  className={s.option}
                  onClick={() => onSelectImage(image)}
                  onMouseEnter={() =>
                    isSelected ? setSelectedColor(theme.linkHoverColor) : ""
                  }
                  onMouseLeave={() =>
                    isSelected ? setSelectedColor(theme.linkColor) : ""
                  }
                  style={isSelected ? { background: `${selectedColor}` } : {}}
                >
                  <Image
                    src={`/images/${item.type}/sm/${image.filename}`}
                    width={120}
                    height={120}
                    alt="Image de l'item"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              );
            });
          })}
      </div>
      Les images sont ici tronquées au carré, comme elles le sont dans la
      pastille de la catégorie qu'elle représente.
      <style jsx>{`
        .line {
          background-color: ${theme.lineColor};
        }
      `}</style>
    </>
  );
}
