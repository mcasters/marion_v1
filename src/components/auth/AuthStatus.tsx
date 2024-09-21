'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import s from './AuthStatus.module.css';
import { ROUTES } from '@/constants/routes';

export default function AuthStatus() {
  const { data: session } = useSession();

  return (
    <div>
      {!session && (
        <button
          className="buttonLink"
          onClick={() => {
            signIn(undefined, { callbackUrl: ROUTES.ADMIN });
          }}
        >
          Admin in
        </button>
      )}
      {session?.user && (
        <>
          <p>
            <small>Signed in as :</small>
            <br />
            <strong>{session.user.email}</strong>
          </p>
          <Link href={ROUTES.ADMIN}>Administration du site</Link>
          <span className={s.separator}>-</span>
          <button
            className="buttonLink"
            onClick={() => {
              signOut({ callbackUrl: ROUTES.HOME });
            }}
          >
            Admin out
          </button>
          <span className={s.separator}>-</span>
          <Link href="/">Home</Link>
        </>
      )}
    </div>
  );
}
