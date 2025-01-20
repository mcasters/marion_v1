"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AuthStatus from "@/components/auth/AuthStatus";
import { ADMIN_MENU } from "@/constants/specific/routes";
import s from "@/styles/admin/AdminNav.module.css";

export default function AdminNav() {
  const authStatus = AuthStatus();
  const pathname = usePathname();

  return (
    <nav className={s.nav}>
      <span>Administration</span>
      <ul className={s.navItems}>
        {ADMIN_MENU.map((item) => {
          const isActive = pathname === item.PATH;

          return (
            <li key={item.NAME}>
              <Link
                href={item.PATH}
                key={item.NAME}
                className={isActive ? `${s.link} ${s.active}` : `${s.link}`}
                legacyBehavior={false}
              >
                {item.NAME}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={s.authStatus}>{authStatus}</div>
    </nav>
  );
}
