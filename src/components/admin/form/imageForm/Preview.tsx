"use client";

import React, { useState } from "react";
import Image from "next/image";
import s from "@/styles/admin/Admin.module.css";
import { Image as IImage } from "@/lib/db/item";
import DeleteIcon from "@/components/icons/DeleteIcon";

type Props = {
  images: IImage[];
  pathImage: string;
  onDelete: (filename: string) => void;
};

export default function Preview({ images, pathImage, onDelete }: Props) {
  const [existantFilenames, setExistantFilenames] = useState<string[]>(
    images.map((i) => i.filename),
  );

  return (
    <>
      {existantFilenames.map((filename) => (
        <div key={filename} className={s.imageWrapper}>
          <div>
            <Image
              loader={({ src }) => {
                return `${pathImage}/sm/${src}`;
              }}
              src={`${filename}`}
              width={150}
              height={150}
              alt="Image de l'item"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <button
            onClick={() => {
              const tab = existantFilenames.filter((f) => {
                return f !== filename;
              });
              setExistantFilenames(tab);
              onDelete(filename);
            }}
            className="iconButton"
            aria-label="Supprimer"
          >
            <DeleteIcon />
          </button>
        </div>
      ))}
    </>
  );
}
