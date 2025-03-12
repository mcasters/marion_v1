"use client";

import s from "./ItemLayoutComponent.module.css";
import { ItemFull, ItemLayout, Type } from "@/lib/type";
import React from "react";
import MonoLayoutComponent from "@/components/item/itemLayout/mono/MonoLayoutComponent";
import GalleryLayoutComponent from "@/components/item/itemLayout/gallery/GalleryLayoutComponent";
import SculptureLayoutComponent from "@/components/item/itemLayout/sculpture/SculptureLayoutComponent";
import DoubleLayoutComponent from "@/components/item/itemLayout/double/DoubleLayoutComponent";
import { useMetas } from "@/app/context/metaProvider";
import { getItemLayout } from "@/utils/commonUtils";

interface Props {
  items: ItemFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}
export default function ItemLayoutComponent({ items, type }: Props) {
  const metas = useMetas();
  const layout = getItemLayout(metas, type);
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
