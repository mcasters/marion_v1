"use client";

import React, { useActionState, useEffect, useState } from "react";
import style from "../../../styles/admin/Admin.module.css";
import s from "./chatMessage.module.css";
import { addMessage, updateMessage } from "@/app/actions/messages";
import { useSession } from "@/app/context/sessionProvider";
import { useTheme } from "@/app/context/themeProvider";
import { Message } from "@/lib/type";
import ChatMessage from "@/components/admin/chatMessage/chatMessage";

type Props = {
  dbMessages: Message[];
};

export default function ChatMessages({ dbMessages }: Props) {
  const session = useSession();
  const theme = useTheme();
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number>(-1);
  const [state, action] = useActionState(
    message?.id !== undefined ? updateMessage : addMessage,
    null,
  );

  useEffect(() => {
    if (state) {
      if (!state.isError) setMessage(undefined);
    }
  }, [state]);

  useEffect(() => {
    if (menuOpenIndex !== -1) setMenuOpenIndex(-1);
  }, [message]);

  return (
    <section className={style.container}>
      <div className={s.messagesHeader}>
        <h2 className={style.title2}>Messages</h2>
        <div className={s.shadow} />
      </div>

      <div className={`${s.messages} area`}>
        {dbMessages &&
          dbMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              onUpdate={setMessage}
              onClickMenu={() => {
                if (menuOpenIndex === index) setMenuOpenIndex(-1);
                else setMenuOpenIndex(index);
              }}
              isMenuOpen={menuOpenIndex === index}
            />
          ))}
      </div>
      <br />
      <form action={action}>
        <input type="hidden" name="userEmail" value={session?.user.email} />
        {message?.id && <input type="hidden" name="id" value={message.id} />}
        <textarea
          name="text"
          placeholder="Ton message"
          value={message?.text}
          onChange={(e) =>
            setMessage(Object.assign({}, message, { text: e.target.value }))
          }
          className={s.textArea}
          rows={5}
        />
        <br />
        <button
          type="submit"
          className={s.chatButton}
          style={{ backgroundColor: theme.color }}
        >
          {message?.id ? "Mettre à jour" : "Envoyer"}
        </button>
        <button
          onClick={() => setMessage(undefined)}
          className={s.chatButton}
          style={{ backgroundColor: theme.color }}
        >
          Annuler
        </button>
      </form>
    </section>
  );
}
