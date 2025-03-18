"use client";

import React from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAlert } from "@/app/context/AlertProvider";
import { THEME } from "@/constants/admin";
import { updateTheme } from "@/app/actions/theme/admin";

export default function ThemeUpdate() {
  const { workTheme } = useAdminWorkThemeContext();
  const alert = useAlert();

  return (
    <button
      onClick={async () => {
        const res = await updateTheme(workTheme);
        alert(res.message, res.isError);
      }}
      className="adminButton"
      disabled={workTheme.name === THEME.BASE_THEME}
    >
      {`Sauvegarder le thème "${workTheme.name}"`}
    </button>
  );
}
