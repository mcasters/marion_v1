"use client";

import React, { useState } from "react";
import s from "../../styles/admin/Admin.module.css";
import { useSession } from "@/app/context/sessionProvider";
import { useTheme } from "@/app/context/themeProvider";
import { Message } from "@/lib/type";
import MoreIcon from "@/components/icons/MoreIcon";
import { deleteMessage } from "@/app/actions/messages";

type Props = {
  message: Message;
  onUpdate: (message: Message) => void;
};

export default function ChatMessage({ message, onUpdate }: Props) {
  const session = useSession();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const email = message.author.email;
  const isMessageOwner = email === session?.user.email;

  return (
    <div className={isMessageOwner ? s.textLeft : s.textRight}>
      <p
        className={s.authorName}
        style={{
          color: isMessageOwner ? theme.color : theme.linkColor,
        }}
      >
        {`${email} - ${new Date(message.date).toLocaleDateString("fr-FR")}`}
      </p>
      <div
        className={s.message}
        style={{
          backgroundColor: isMessageOwner ? theme.color : theme.linkColor,
        }}
      >
        {isMessageOwner && (
          <button className={s.moreButton} onClick={() => setIsOpen(!isOpen)}>
            <MoreIcon />
          </button>
        )}
        {isOpen && (
          <div className={s.menu}>
            <button
              onClick={() => {
                onUpdate(message);
                setIsOpen(false);
              }}
              className={s.menuItemButton}
            >
              Modifier
            </button>
            <button
              onClick={() => {
                deleteMessage(message.id);
                setIsOpen(false);
              }}
              className={s.menuItemButton}
            >
              Supprimer
            </button>
          </div>
        )}
        {message.text}
      </div>
    </div>
  );
}
