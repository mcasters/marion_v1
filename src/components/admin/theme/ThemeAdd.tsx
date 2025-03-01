"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useAdminWorkThemeContext } from "@/app/context/adminWorkThemeProvider";
import { useAlert } from "@/app/context/AlertProvider";
import { createTheme } from "@/app/actions/theme/admin";
import { Theme } from "@prisma/client";

type Props = {
  themes: Theme[];
};

export default function ThemeAdd({ themes }: Props) {
  const { workTheme, setWorkTheme } = useAdminWorkThemeContext();
  const [themeName, setThemeName] = useState<string>("");
  const alert = useAlert();
  const createThemeAction = createTheme.bind(null, workTheme);
  const [state, action] = useActionState(createThemeAction, null);

  useEffect(() => {
    if (state) {
      alert(state.message, state.isError);
      if (!state.isError) {
        const newTheme = themes.find((t) => t.name === themeName);
        if (newTheme) {
          setWorkTheme(newTheme);
        }
        setThemeName("");
      }
    }
  }, [state]);

  return (
    <form action={action}>
      <input
        required
        placeholder="Nom du nouveau thème"
        name="name"
        type="text"
        value={themeName}
        onChange={(e) => {
          setThemeName(e.target.value);
        }}
        style={{ marginRight: "0" }}
      />
      <button type="submit" className="adminButton" style={{ marginLeft: "0" }}>
        Sauvegarder en nouveau thème
      </button>
    </form>
  );
}
