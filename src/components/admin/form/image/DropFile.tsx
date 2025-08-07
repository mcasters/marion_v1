import React, { ReactNode, useEffect, useRef, useState } from "react";
import s from "@/components/admin/admin.module.css";

type Props = {
  onFile: (file: File) => void;
  children?: ReactNode;
};

export default function DropFile({ onFile, children }: Props) {
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState<boolean>(false);

  useEffect(() => {
    if (dropRef && dropRef.current) {
      const handleDrag = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOver(true);
      };
      const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let file = null;
        if (e.dataTransfer) {
          if (e.dataTransfer.items) {
            if (e.dataTransfer.items[0].kind === "file") {
              file = e.dataTransfer.items[0].getAsFile();
            }
          } else {
            file = e.dataTransfer.files[0];
          }
          if (file) onFile(file);
          setIsOver(false);
        }
      };
      const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOver(false);
      };

      const div = dropRef.current;
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop);
      div.addEventListener("dragleave", handleDragLeave);
      return () => {
        div.removeEventListener("dragover", handleDrag);
        div.removeEventListener("drop", handleDrop);
        div.removeEventListener("dragleave", handleDragLeave);
      };
    }
  }, [onFile]);

  return (
    <div
      ref={dropRef}
      className={isOver ? `${s.dropZoneOver} ${s.dropZone}` : s.dropZone}
    >
      Glisser la photo ici
      <br />
      (ou utiliser le bouton)
      {children}
    </div>
  );
}
