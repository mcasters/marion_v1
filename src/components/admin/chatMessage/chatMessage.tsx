"use client";

import React, { useRef } from "react";
import s from "./chatMessage.module.css";
import { useSession } from "@/app/context/sessionProvider";
import { useTheme } from "@/app/context/themeProvider";
import { Message } from "@/lib/type";
import MoreIcon from "@/components/icons/moreIcon";
import { deleteMessage } from "@/app/actions/messages";

type Props = {
  message: Message;
  onUpdate: (message: Message) => void;
  isMenuOpen: boolean;
  onClickMenu: () => void;
};

export default function ChatMessage({
  message,
  onUpdate,
  isMenuOpen,
  onClickMenu,
}: Props) {
  const session = useSession();
  const theme = useTheme();
  const menuRef = useRef(null);
  const email = message.author.email;
  const isMessageOwner = email === session?.user.email;

  const handleUpdate = () => {
    onUpdate(message);
    onClickMenu();
  };

  return (
    <div className={isMessageOwner ? s.textLeft : s.textRight}>
      <p
        className={s.authorName}
        style={{
          color: isMessageOwner ? theme.other.main.text : theme.other.main.link,
        }}
      >
        {`${email} - ${new Date(message.date).toLocaleDateString("fr-FR")}`}
      </p>
      <div
        className={s.message}
        style={{
          backgroundColor: isMessageOwner
            ? theme.other.main.text
            : theme.other.main.link,
        }}
      >
        {isMessageOwner && (
          <button className={s.moreButton} onClick={onClickMenu}>
            <MoreIcon />
          </button>
        )}
        <div ref={menuRef} className={isMenuOpen ? s.menu : `${s.menu} hidden`}>
          <button onClick={handleUpdate} className={s.menuItemButton}>
            Modifier
          </button>
          <button
            onClick={() => {
              deleteMessage(message.id);
              onClickMenu();
            }}
            className={s.menuItemButton}
          >
            Supprimer
          </button>
        </div>
        {message.text}
      </div>
    </div>
  );
}
