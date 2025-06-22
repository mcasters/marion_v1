"use client";

import React, { useEffect, useRef, useState } from "react";
import s from "@/components/admin/admin.module.css";
import { useAlert } from "@/app/context/alertProvider";
import Preview from "@/components/admin/form/image/preview";

interface Props {
  isMultiple: boolean;
  acceptSmallImage: boolean;
  resetFlag?: number;
  onNewImages?: (filenames: string[]) => void;
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
  const [urls, setUrls] = useState([]);
  const [resizedFiles, setResizedFiles] = useState<File[]>([]);
  const [smallImageSelected, setSmallImageSelected] = useState<boolean>(false);
  const alert = useAlert();

  useEffect(() => {
    setUrls([]);
    setSmallImageSelected(false);
    if (inputRef.current) inputRef.current.value = "";
  }, [resetFlag]);

  const handleFiles = async () => {};

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
        {urls.length > 0 && <Preview filenames={urls} pathImage={""} />}
      </div>
    </>
  );
}
