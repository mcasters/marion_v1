"use client";

import React from "react";
import s from "./Auth.module.css";
import { logoutAction } from "@/app/actions/auth";

export default function LogoutForm() {
  const [state, formAction] = React.useActionState(logoutAction, null);

  return (
    <form className={s.logoutForm}>
      <button formAction={formAction} className="buttonLink">
        Déconnexion
      </button>
    </form>
  );
}
