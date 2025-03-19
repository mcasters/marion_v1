"use client";

import React from "react";
import { PresetColor, Theme } from "@prisma/client";
import ChatMessages from "@/components/admin/chatMessage/chatMessages";
import AdminTheme from "@/components/admin/theme/AdminTheme";
import { Message } from "@/lib/type";
import s from "@/components/admin/admin.module.css";

type Props = {
  themes: Theme[];
  presetColors: PresetColor[];
  messages: Message[];
};

export default function AdminHome({ themes, presetColors, messages }: Props) {
  return (
    <>
      <h1 className={s.title1}>Administration générale</h1>
      <AdminTheme themes={themes} presetColors={presetColors} />
      <ChatMessages dbMessages={messages} />
    </>
  );
}
