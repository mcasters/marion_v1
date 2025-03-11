"use client";

import s from "./ItemLayoutComponent.module.css";
import { ItemFull, ItemLayout } from "@/lib/type";
import React from "react";
import MonoLayoutComponent from "@/components/item/itemLayout/mono/MonoLayoutComponent";
import GalleryLayoutComponent from "@/components/item/itemLayout/gallery/GalleryLayoutComponent";
import SculptureLayoutComponent from "@/components/item/itemLayout/sculpture/SculptureLayoutComponent";
import DoubleLayoutComponent from "@/components/item/itemLayout/double/DoubleLayoutComponent";

interface Props {
  items: ItemFull[];
  layout:
    | ItemLayout.DOUBLE
    | ItemLayout.MONO
    | ItemLayout.SCULPTURE
    | ItemLayout.MULTIPLE;
}
export default function ItemLayoutComponent({ items, layout }: Props) {
  return (
    <>
      {(() => {
        switch (layout) {
          case ItemLayout.MONO:
            return (
              <div className={s.monoContent}>
                {items.map((item, i) => (
                  <MonoLayoutComponent key={i} item={item} priority={i < 2} />
                ))}
              </div>
            );
          case ItemLayout.DOUBLE:
            return (
              <div className={s.doubleContent}>
                {items.map((item, i) => (
                  <DoubleLayoutComponent key={i} item={item} priority={i < 2} />
                ))}
              </div>
            );
          case ItemLayout.SCULPTURE:
            return (
              <div className={s.sculptureContent}>
                {items.map((item, i) => (
                  <SculptureLayoutComponent
                    key={i}
                    item={item}
                    priority={i < 1}
                  />
                ))}
              </div>
            );
          case ItemLayout.MULTIPLE:
            return (
              <div className={s.multipleContent}>
                <GalleryLayoutComponent items={items} />
              </div>
            );
        }
      })()}
    </>
  );
}
