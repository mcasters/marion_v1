"use client";

import React, { useActionState } from "react";
import s from "../../styles/admin/Admin.module.css";
import { addMessage } from "@/app/actions/messages";
import { useSession } from "@/app/context/sessionProvider";
import { useTheme } from "@/app/context/themeProvider";
import { Message } from "@/lib/type";

type Props = {
  dbMessages: Message[];
};

export default function Messages({ dbMessages }: Props) {
  const session = useSession();
  const theme = useTheme();
  const [, action] = useActionState(addMessage, null);

  return (
    <section className={s.messageContainer}>
      <div className={s.headerMessages}>
        <h2>Messages</h2>
        <div className={s.shadow} />
      </div>

      <div className={s.messages}>
        {dbMessages &&
          dbMessages.map((msg, index) => {
            const email = msg.author.email;
            const isConnectedUser = email === session?.user.email;
            return (
              <div
                key={index}
                className={isConnectedUser ? s.textLeft : s.textRight}
              >
                <p
                  className={s.authorName}
                  style={{
                    color: isConnectedUser ? theme.color : theme.linkColor,
                  }}
                >
                  {`${email} (${new Date(msg.date).toLocaleDateString()}) :`}
                </p>
                <div
                  className={s.message}
                  style={{
                    backgroundColor: isConnectedUser
                      ? theme.color
                      : theme.linkColor,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
      </div>
      <br />
      <br />
      <form action={action}>
        <input type="hidden" name="userEmail" value={session?.user.email} />
        <textarea
          name="text"
          placeholder="Ton message"
          className={s.textArea}
          rows={5}
        />
        <br />
        <button
          type="submit"
          className={s.send}
          style={{ backgroundColor: theme.color, color: theme.backgroundColor }}
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
