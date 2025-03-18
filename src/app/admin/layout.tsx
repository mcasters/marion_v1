import { ReactNode } from "react";
import s from "@/styles/admin/admin.module.css";

export default async function layout({ children }: { children: ReactNode }) {
  return <div className={s.adminWrapper}>{children}</div>;
}
