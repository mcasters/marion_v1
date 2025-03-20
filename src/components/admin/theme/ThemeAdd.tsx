"use client";

import React, { useState } from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAlert } from "@/app/context/alertProvider";
import { createTheme } from "@/app/actions/theme/admin";

export default function ThemeAdd() {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const [themeName, setThemeName] = useState<string>("");
  const alert = useAlert();

  return (
    <>
      <input
        required
        placeholder="Nom du nouveau thème"
        type="text"
        value={themeName}
        onChange={(e) => {
          setThemeName(e.target.value);
        }}
        style={{ marginRight: "0" }}
      />
      <button
        onClick={async () => {
          const res = await createTheme(workTheme, themeName);
          if (res.theme) {
            setWorkTheme(res.theme);
            setThemeName("");
          }
          alert(res.message, res.isError);
        }}
        className="adminButton"
        style={{ marginLeft: "0" }}
      >
        Sauvegarder en nouveau thème
      </button>
    </>
  );
}
