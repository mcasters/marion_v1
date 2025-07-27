import { Fragment, useEffect, useRef, useState } from "react";
import s from "./dragList.module.css";
import useOnClickOutside from "@/components/hooks/useOnClickOutside.ts";
import { DragListElement } from "@/lib/type.ts";
import { sortDragList } from "@/lib/utils/commonUtils.ts";

interface Props {
  list: DragListElement[];
  onChangeOrder: (map: Map<number, number>) => void;
}

export default function DragList({ list, onChangeOrder }: Props) {
  const { isOutside, ref } = useOnClickOutside();
  const sortedList = useRef(sortDragList(list));
  const [itemIndex, setItemIndex] = useState(-1);
  const [dropZoneIndex, setDropZoneIndex] = useState(-1);

  useEffect(() => {
    setItemIndex(-1);
  }, [isOutside]);

  useEffect(() => {
    sortedList.current = sortDragList(list);
  }, [list]);

  function handleSort() {
    if (dropZoneIndex !== -1 && itemIndex !== dropZoneIndex) {
      const sortedListClone = [...sortedList.current];
      const temp = sortedListClone[itemIndex];
      sortedListClone.splice(itemIndex, 1);

      if (itemIndex < dropZoneIndex) {
        sortedListClone.splice(dropZoneIndex - 1, 0, temp);
        setItemIndex(dropZoneIndex - 1);
      } else if (itemIndex > dropZoneIndex) {
        sortedListClone.splice(dropZoneIndex, 0, temp);
        setItemIndex(dropZoneIndex);
      }
      sortedList.current = sortedListClone;
      const map: Map<number, number> = new Map();
      sortedListClone.forEach((item, index) => map.set(item.id, index));
      onChangeOrder(map);
    }
    setDropZoneIndex(-1);
  }

  return (
    <div ref={ref} className={s.list}>
      {sortedList.current.map((item, index) => {
        return (
          <Fragment key={index}>
            {index > 0 && (
              <div
                className={`${s.dropZone} ${dropZoneIndex === index ? s.hover : undefined}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDropZoneIndex(index);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDropZoneIndex(-1);
                }}
              >
                <div className={s.line} />
              </div>
            )}
            <div
              className={`${s.item} ${itemIndex === index ? s.focus : undefined}`}
              draggable
              onClick={() => setItemIndex(index)}
              onDragStart={() => setItemIndex(index)}
              onDragEnd={handleSort}
            >
              {item.element}
            </div>
          </Fragment>
        );
      })}
      <div
        className={`${s.dropZone} ${dropZoneIndex === sortedList.current.length + 1 ? s.hover : undefined}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDropZoneIndex(sortedList.current.length + 1);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDropZoneIndex(-1);
        }}
      >
        <div className={s.line} />
      </div>
    </div>
  );
}
