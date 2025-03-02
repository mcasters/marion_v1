"use client";

import ColorPicker from "@/components/admin/theme/ColorPicker";
import React from "react";
import s from "../../../styles/admin/AdminTheme.module.css";
import { PAGE_TYPE } from "@/constants/admin";
import { PresetColor } from "@prisma/client";

type Props = {
  presetColors: PresetColor[];
  deletedPresetColor: PresetColor | null;
  isToUpdate: boolean;
};

export default function ThemeDashboard({
  presetColors,
  deletedPresetColor,
  isToUpdate,
}: Props) {
  return (
    <div className={`${s.flex} ${isToUpdate ? s.toUpdate : ""}`}>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.GENERAL}</h4>
        <ColorPicker
          label="Ligne au top"
          colorLabel="lineColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Fond"
          colorLabel="backgroundColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Texte"
          colorLabel="color"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Liens"
          colorLabel="linkColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Lien pointé*"
          colorLabel="linkHoverColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.HOME}</h4>
        <ColorPicker
          label="Titre"
          colorLabel="titleColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1 - fond"
          colorLabel="menu1HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1 - texte"
          colorLabel="menu1LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1- texte pointé*"
          colorLabel="menu1LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - fond"
          colorLabel="menu2HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - texte"
          colorLabel="menu2LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - texte pointé*"
          colorLabel="menu2LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.OTHERS}</h4>
        <ColorPicker
          label="Menu 1 - fond"
          colorLabel="menu1Color"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1 - texte"
          colorLabel="menu1LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1 - texte pointé*"
          colorLabel="menu1LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - fond"
          colorLabel="menu2Color"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - texte"
          colorLabel="menu2LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - texte pointé*"
          colorLabel="menu2LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
      </section>
      <section>
        <h4 className={s.sectionTitle}>{PAGE_TYPE.ITEM}</h4>
        <ColorPicker
          label="Fond"
          colorLabel="backgroundColorItem"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Texte"
          colorLabel="colorItem"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Liens"
          colorLabel="linkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Lien pointé*"
          colorLabel="linkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1 - fond"
          colorLabel="menu1ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1 - texte"
          colorLabel="menu1LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 1 - texte pointé*"
          colorLabel="menu1LinkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - fond"
          colorLabel="menu2ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - texte"
          colorLabel="menu2LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Menu 2 - texte pointé*"
          colorLabel="menu2LinkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
      </section>
      <p>* lorsque la souris survole le texte</p>
      {isToUpdate && <span>Thème modifié (à sauvegarder)</span>}
    </div>
  );
}
