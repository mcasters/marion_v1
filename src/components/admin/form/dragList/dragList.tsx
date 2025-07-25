import { Fragment, useEffect, useState } from "react";
import s from "./dragList.module.css";
import useOnClickOutside from "@/components/hooks/useOnClickOutside.ts";

interface Props<Element> {
  list: Element[];
}

export default function DragList<Element>({ list }: Props<Element>) {
  const [mouseOutside, refList] = useOnClickOutside();
  const [items, setItems] = useState(list);
  const [focusItem, setFocusItem] = useState(-1);
  const [dropZoneHover, setDropZoneHover] = useState(-1);

  useEffect(() => {
    setFocusItem(-1);
  }, [mouseOutside]);

  function handleSort() {
    if (dropZoneHover !== -1 && focusItem !== dropZoneHover) {
      const itemsClone = [...items];
      const temp = itemsClone[focusItem];
      itemsClone.splice(focusItem, 1);

      if (focusItem < dropZoneHover) {
        itemsClone.splice(dropZoneHover - 1, 0, temp);
        setFocusItem(dropZoneHover - 1);
      } else if (focusItem > dropZoneHover) {
        itemsClone.splice(dropZoneHover, 0, temp);
        setFocusItem(dropZoneHover);
      }
      setItems(itemsClone);
    }
    setDropZoneHover(-1);
  }

  return (
    <div className={s.list} ref={refList}>
      {items.map((item, index) => {
        return (
          <Fragment key={index}>
            <div
              className={`${s.dropZone} ${dropZoneHover === index ? s.hover : undefined}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDropZoneHover(index);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDropZoneHover(-1);
              }}
            >
              <div className={s.line} />
            </div>
            <div
              className={`${s.item} ${focusItem === index ? s.focus : undefined}`}
              draggable
              onClick={() => setFocusItem(index)}
              onDragStart={() => setFocusItem(index)}
              onDragEnd={handleSort}
            >
              {item}
            </div>
          </Fragment>
        );
      })}
      <div
        className={`${s.dropZone} ${dropZoneHover === items.length + 1 ? s.hover : undefined}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDropZoneHover(items.length + 1);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDropZoneHover(-1);
        }}
      >
        <div className={s.line} />
      </div>
    </div>
  );
}
