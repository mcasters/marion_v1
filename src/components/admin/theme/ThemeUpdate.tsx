"use client";

import React, { useTransition } from "react";
import s from "@/styles/admin/AdminTheme.module.css";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAlert } from "@/app/context/AlertProvider";
import { THEME } from "@/constants/admin";
import { updateTheme } from "@/app/actions/theme/admin";

export default function ThemeUpdate() {
  const { workTheme } = useAdminWorkThemeContext();
  const alert = useAlert();
  const [, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const res = await updateTheme(workTheme);
      alert(res.message, res.isError);
    });
  };

  return (
    <button
      onClick={save}
      className={`${s.themeInput} "adminButton"`}
      disabled={workTheme.name === THEME.BASE_THEME}
    >
      {`Mettre à jour "${workTheme.name}"`}
    </button>
  );
}
