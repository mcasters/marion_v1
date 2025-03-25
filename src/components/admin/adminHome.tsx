"use client";

import React from "react";
import ChatMessages from "@/components/admin/chatMessage/chatMessages";
import AdminTheme from "@/components/admin/theme/adminTheme";
import { Message } from "@/lib/type";
import s from "@/components/admin/admin.module.css";

type Props = {
  messages: Message[];
};

export default function AdminHome({ messages }: Props) {
  return (
    <>
      <h1 className={s.title1}>Administration générale</h1>
      <AdminTheme />
      <ChatMessages dbMessages={messages} />
    </>
  );
}
