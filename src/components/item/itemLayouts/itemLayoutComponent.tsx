"use client";

import s from "./itemLayoutComponent.module.css";
import { ItemDarkBackground, ItemLayout, Type, workFull } from "@/lib/type";
import React from "react";
import MonoLayoutComponent from "@/components/item/itemLayouts/mono/monoLayoutComponent";
import GalleryLayoutComponent from "@/components/item/itemLayouts/gallery/galleryLayoutComponent";
import SculptureLayoutComponent from "@/components/item/itemLayouts/sculpture/sculptureLayoutComponent";
import DoubleLayoutComponent from "@/components/item/itemLayouts/double/doubleLayoutComponent";
import { useMetas } from "@/app/context/metaProvider";
import { getItemLayout } from "@/utils/commonUtils";

interface Props {
  items: workFull[];
  type: Type.PAINTING | Type.SCULPTURE | Type.DRAWING;
}
export default function ItemLayoutComponent({ items, type }: Props) {
  const metas = useMetas();
  const [itemLayout, itemDarkBackground] = getItemLayout(metas, type);
  return (
    <>
      {(() => {
        switch (itemLayout) {
          case ItemLayout.MONO:
            return (
              <div
                className={`${s.monoContent} ${itemDarkBackground === ItemDarkBackground.TRUE ? s.darkBackground : ""}`}
              >
                {items.map((item, i) => (
                  <MonoLayoutComponent key={i} item={item} priority={i < 2} />
                ))}
              </div>
            );
          case ItemLayout.DOUBLE:
            return (
              <div
                className={`${s.doubleContent} ${itemDarkBackground === ItemDarkBackground.TRUE ? s.darkBackground : ""}`}
              >
                {items.map((item, i) => (
                  <DoubleLayoutComponent key={i} item={item} priority={i < 2} />
                ))}
              </div>
            );
          case ItemLayout.SCULPTURE:
            return (
              <div
                className={`${s.sculptureContent} ${itemDarkBackground === ItemDarkBackground.TRUE ? s.darkBackground : ""}`}
              >
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
              <div
                className={`${s.multipleContent} ${itemDarkBackground === ItemDarkBackground.TRUE ? s.darkBackground : ""}`}
              >
                <GalleryLayoutComponent items={items} />
              </div>
            );
        }
      })()}
    </>
  );
}
