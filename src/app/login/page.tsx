import LoginForm from "@/components/auth/loginForm";
import React from "react";
import s from "@/styles/page.module.css";

export default function Page() {
  return (
    <div className={s.container}>
      <h1>Espace administration</h1>
      <h2>Authentification</h2>
      <LoginForm />
    </div>
  );
}
