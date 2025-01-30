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
        <h3 className={s.sectionTitle}>{PAGE_TYPE.GENERAL}</h3>
        <ColorPicker
          label="Couleur de la ligne au top"
          colorLabel="lineColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur de fond"
          colorLabel="backgroundColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte"
          colorLabel="color"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur des liens"
          colorLabel="linkColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur des liens pointé*"
          colorLabel="linkHoverColor"
          pageTypeName={PAGE_TYPE.GENERAL}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.HOME}</h3>
        <ColorPicker
          label="Couleur du titre"
          colorLabel="titleColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur de fond du menu 1"
          colorLabel="menu1HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 1"
          colorLabel="menu1LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 1 pointé*"
          colorLabel="menu1LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur de fond du menu 2"
          colorLabel="menu2HomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 2"
          colorLabel="menu2LinkHomeColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 2 pointé*"
          colorLabel="menu2LinkHomeHoverColor"
          pageTypeName={PAGE_TYPE.HOME}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.OTHERS}</h3>
        <ColorPicker
          label="Couleur de fond du menu 1"
          colorLabel="menu1Color"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 1"
          colorLabel="menu1LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 1 pointé*"
          colorLabel="menu1LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur de fond du menu 2"
          colorLabel="menu2Color"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 2"
          colorLabel="menu2LinkColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 2 pointé*"
          colorLabel="menu2LinkHoverColor"
          pageTypeName={PAGE_TYPE.OTHERS}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
      </section>
      <section>
        <h3 className={s.sectionTitle}>{PAGE_TYPE.ITEM}</h3>
        <ColorPicker
          label="Couleur de fond"
          colorLabel="backgroundColorItem"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte"
          colorLabel="colorItem"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur des liens"
          colorLabel="linkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur des liens hover"
          colorLabel="linkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur de fond du menu 1"
          colorLabel="menu1ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 1"
          colorLabel="menu1LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 1 pointé*"
          colorLabel="menu1LinkHoverItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur de fond du menu 2"
          colorLabel="menu2ItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 2"
          colorLabel="menu2LinkItemColor"
          pageTypeName={PAGE_TYPE.ITEM}
          presetColors={presetColors}
          deletedPresetColor={deletedPresetColor}
        />
        <ColorPicker
          label="Couleur du texte du menu 2 pointé*"
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
