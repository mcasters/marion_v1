"use client";

import React, { useEffect, useRef, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { useAlert } from "@/app/context/alertProvider";
import Preview from "@/components/admin/form/image/preview";

interface Props {
  isMultiple: boolean;
  acceptSmallImage: boolean;
  resetFlag?: number;
  onNewImages?: (arg0: string[]) => void;
  info?: string;
}

export default function AddImages({
  isMultiple,
  acceptSmallImage,
  resetFlag,
  onNewImages,
  info,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newFilenames, setNewFilenames] = useState<string[]>([]);
  const [smallImageSelected, setSmallImageSelected] = useState<boolean>(false);
  const alert = useAlert();

  useEffect(() => {
    setNewFilenames([]);
    setSmallImageSelected(false);
    if (inputRef.current) inputRef.current.value = "";
  }, [resetFlag]);

  const handleFiles = async () => {
    if (
      !inputRef.current ||
      !inputRef.current.files ||
      inputRef.current.files.length === 0
    )
      return;
    const filesUploaded = inputRef.current.files;
    if (filesUploaded.length > 0) {
      const files = Array.from(filesUploaded);
      const newFiles: string[] = [];
      let error = false;
      let weight = 0;

      for await (const file of files) {
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
        newFiles.push(URL.createObjectURL(file));
        bmp.close();
      }

      if (!error && newFiles.length > 0) {
        setNewFilenames(newFiles);
        if (onNewImages) onNewImages(newFiles);
      } else {
        setNewFilenames([]);
        setSmallImageSelected(false);
        inputRef.current.value = "";
        if (onNewImages) onNewImages([]);
      }
    }
  };

  return (
    <>
      {info && <label className={s.formLabel}>{info}</label>}
      <div className={s.imageInputContainer}>
        <input
          type="file"
          name={isMultiple ? "files" : "file"}
          onChange={handleFiles}
          ref={inputRef}
          multiple={isMultiple}
        />
        {acceptSmallImage && (
          <label className={s.checkLabel}>
            <input
              type="checkbox"
              checked={smallImageSelected}
              onChange={() => setSmallImageSelected(!smallImageSelected)}
              className={s.checkInput}
            />
            Accepter les images sous 2000 px de large
          </label>
        )}
      </div>
      <div className={s.previewAddContainer}>
        {newFilenames.length > 0 && (
          <Preview filenames={newFilenames} pathImage={""} />
        )}
      </div>
    </>
  );
}
