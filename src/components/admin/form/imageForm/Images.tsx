"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { FileUploaderButton } from "@/components/admin/form/imageForm/FileUploaderButton";
import s from "@/styles/admin/Admin.module.css";

interface Props {
  onAdd?: (arg0: number) => void;
  reset?: number;
  isMultiple: boolean;
  title?: string;
}

export default function Images({ onAdd, reset, isMultiple, title }: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);

  useEffect(() => {
    if (reset !== undefined) setNewImages([]);
  }, [reset]);

  const getAlbumPreview = (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const files = Array.from(filesUploaded);

      const newFiles: string[] = [];
      files.forEach((file) => {
        newFiles.push(URL.createObjectURL(file));
      });
      setNewImages(newFiles);
      if (onAdd !== undefined) onAdd(newFiles.length);
    }
  };

  return (
    <div>
      <h5 className={s.imageTitle}>
        {title !== undefined ? title : isMultiple ? "Images :" : "Image :"}
      </h5>
      <FileUploaderButton
        name={isMultiple ? "files" : "file"}
        handleFiles={getAlbumPreview}
        isMultiple={isMultiple}
      />
      <div>
        {newImages.length > 0 &&
          newImages.map((src) => (
            <div key={src} className={s.imageWrapper}>
              <Image
                unoptimized={true}
                src={src}
                width={150}
                height={150}
                alt="Nouvelle image de l'item"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
