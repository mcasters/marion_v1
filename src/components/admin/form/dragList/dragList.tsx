import { Fragment, useEffect, useMemo, useState } from "react";
import s from "./dragList.module.css";
import useOnClickOutside from "@/components/hooks/useOnClickOutside.ts";
import { DragListElement } from "@/lib/type.ts";
import { sortDragList } from "@/lib/utils/commonUtils.ts";
import { sortList } from "@/lib/utils/themeUtils.ts";

interface Props {
  list: DragListElement[];
  onChangeOrder: (map: Map<number, number>) => void;
}

export default function DragList({ list, onChangeOrder }: Props) {
  const { isOutside, ref } = useOnClickOutside();
  const _list = useMemo(() => sortDragList(list), [list]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropZoneIndex, setDropZoneIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [isOutside]);

  function handleSort() {
    if (dropZoneIndex !== -1 && selectedIndex !== dropZoneIndex) {
      const { map, newIndex } = sortList(_list, selectedIndex, dropZoneIndex);
      setSelectedIndex(newIndex);
      onChangeOrder(map);
    }
    setDropZoneIndex(-1);
  }

  return (
    <div ref={ref} className={s.list}>
      {_list.map((item, index) => {
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
              className={`${s.item} ${selectedIndex === index ? s.focus : undefined}`}
              draggable
              onClick={() => setSelectedIndex(index)}
              onDragStart={() => setSelectedIndex(index)}
              onDragEnd={handleSort}
            >
              {item.element}
            </div>
          </Fragment>
        );
      })}
      <div
        className={`${s.dropZone} ${dropZoneIndex === _list.length + 1 ? s.hover : undefined}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDropZoneIndex(_list.length + 1);
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
