"use client";

import Link from "next/link";

import s from "./auth.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { useSession } from "@/app/context/sessionProvider";
import LogoutForm from "@/components/auth/LogoutForm";

export default function AuthStatus() {
  const session = useSession();

  return (
    <div>
      {!session && <Link href={ROUTES.LOGIN}>Admin</Link>}
      {session?.user.isAdmin && (
        <>
          <p>
            <small>Signed in as :</small>
            <br />
            <strong>{session.user.email}</strong>
          </p>
          <Link href={ROUTES.ADMIN}>Administration du site</Link>
          <span className={s.separator}>-</span>
          <LogoutForm />
          <span className={s.separator}>-</span>
          <Link href={ROUTES.HOME}>Home</Link>
        </>
      )}
    </div>
  );
}
