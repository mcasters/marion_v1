"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { FileUploaderButton } from "@/components/admin/form/imageForm/FileUploaderButton";
import s from "@/styles/admin/Admin.module.css";
import toast from "react-hot-toast";

interface Props {
  onChange?: (arg0: number) => void;
  reset?: number;
  isMultiple: boolean;
  title?: string;
}

export default function Images({ onChange, reset, isMultiple, title }: Props) {
  const [newImages, setNewImages] = useState<string[]>([]);

  useEffect(() => {
    if (reset !== undefined) setNewImages([]);
  }, [reset]);

  const handleFiles = async (filesUploaded: FileList) => {
    if (filesUploaded?.length > 0) {
      const files = Array.from(filesUploaded);
      const newFiles: string[] = [];
      let error = false;

      for await (const file of files) {
        const bmp = await createImageBitmap(file);
        const { width, height } = bmp;
        if (width < 2000) {
          toast.error(
            `Dimensions de l'image ${file.name} trop petites : largeur de 2000 pixels minimum`,
          );
          bmp.close();
          error = true;
          break;
        } else {
          newFiles.push(URL.createObjectURL(file));
          bmp.close();
        }
      }
      if (error) return;
      setNewImages(newFiles);
      if (onChange !== undefined) onChange(newFiles.length);
    }
  };

  return (
    <>
      <p className={s.imageTitle}>
        {title !== undefined ? title : isMultiple ? "Images :" : "Image :"}
      </p>
      <FileUploaderButton
        name={isMultiple ? "files" : "file"}
        handleFiles={handleFiles}
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
                alt="Nouvelle image"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
      </div>
    </>
  );
}
