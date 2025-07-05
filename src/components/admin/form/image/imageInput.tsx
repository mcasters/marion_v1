"use client";

import React, { useRef, useState } from "react";
import { useAlert } from "@/app/context/alertProvider";
import s from "@/components/admin/admin.module.css";
import Preview from "@/components/admin/form/image/preview";
import { constraintImage } from "@/components/admin/form/formUtils";

type Props = {
  isMultiple: boolean;
  acceptSmallImage: boolean;
  setResizedFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function ImageInput({
  isMultiple,
  acceptSmallImage,
  setResizedFiles,
}: Props) {
  const alert = useAlert();
  const inputRef = useRef<HTMLInputElement>(null);
  const [smallImageSelected, setSmallImageSelected] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleReset = () => {
    setResizedFiles([]);
    setPreviewImages([]);
    setSmallImageSelected(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFiles = async () => {
    const fileList = inputRef.current?.files;
    if (fileList && fileList.length > 0) {
      if (!isMultiple) {
        setResizedFiles([]);
        setPreviewImages([]);
      }

      const files = Array.from(fileList);
      let error = false;
      let weight = 0;

      for (const file of files) {
        weight += file.size;
        if (weight > 30000000) {
          error = true;
          alert(
            "La taille totale des fichiers excède la limite de sécurité (30 MB).\nAjouter moins de fichier à la fois.",
            true,
            5000,
          );
          break;
        }
        const bmp = await createImageBitmap(file);
        const { width } = bmp;
        if (!smallImageSelected && width < 2000) {
          error = true;
          alert(
            `Dimension de l'image trop petite. Largeur minimum : 2000 pixels`,
            true,
            5000,
          );
          bmp.close();
          break;
        }

        const resizedFile = await constraintImage(file);
        setResizedFiles((prevState) => [...prevState, resizedFile]);
        setPreviewImages((prevState) => [
          ...prevState,
          URL.createObjectURL(resizedFile),
        ]);
      }
      if (error) handleReset();
    }
  };

  return (
    <>
      <div className={s.imageInputContainer}>
        <input
          type="file"
          onChange={handleFiles}
          ref={inputRef}
          multiple={isMultiple}
          accept="image/png, image/jpeg"
        />
        {acceptSmallImage && (
          <label>
            <input
              type="checkbox"
              checked={smallImageSelected}
              onChange={() => setSmallImageSelected(!smallImageSelected)}
            />
            Accepter les images sous 2000 px de large
          </label>
        )}
      </div>
      <div className={s.previewAddContainer}>
        {previewImages.length > 0 && (
          <Preview filenames={previewImages} pathImage="" />
        )}
      </div>
    </>
  );
}
