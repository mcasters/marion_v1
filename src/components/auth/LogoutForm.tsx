"use client";

import React from "react";
import { logoutAction } from "@/app/lib/auth/actions";
import s from "./auth.module.css";

export default function LogoutForm() {
  const [state, formAction] = React.useActionState(logoutAction, null);

  return (
    <form action={formAction} className={s.logoutForm}>
      <button className="buttonLink" type="submit">
        Logout
      </button>
    </form>
  );
}
