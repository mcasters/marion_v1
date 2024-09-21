import React, { useRef } from "react";

interface Props {
  handleFiles: (arg0: FileList) => void;
  name: string;
  isMultiple: boolean;
}

export const FileUploaderButton = ({
  handleFiles,
  isMultiple,
  name,
}: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        className="adminButton"
        onClick={(e) => {
          e.preventDefault();
          hiddenFileInput.current?.click();
        }}
      >
        {isMultiple ? "Choisir le ou les fichiers" : "Choisir le fichier"}
      </button>
      <input
        type="file"
        name={name}
        onChange={(e) => {
          e.preventDefault();
          if (e.target.files) handleFiles(e.target.files);
        }}
        ref={hiddenFileInput}
        style={{ display: "none" }}
        multiple={isMultiple}
      />
    </>
  );
};
