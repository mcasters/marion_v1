"use client";

import React, { useActionState, useEffect, useState } from "react";
import s from "../../styles/admin/Admin.module.css";
import { addMessage, updateMessage } from "@/app/actions/messages";
import { useSession } from "@/app/context/sessionProvider";
import { useTheme } from "@/app/context/themeProvider";
import { Message } from "@/lib/type";
import ChatMessage from "@/components/admin/chatMessage";

type Props = {
  dbMessages: Message[];
};

export default function ChatMessages({ dbMessages }: Props) {
  const session = useSession();
  const theme = useTheme();
  const [messageToUpdate, setMessageToUpdate] = useState<Message | undefined>(
    undefined,
  );
  const [state, action] = useActionState(
    messageToUpdate?.id !== undefined ? updateMessage : addMessage,
    null,
  );

  useEffect(() => {
    if (state) {
      if (!state.isError) setMessageToUpdate(undefined);
    }
  }, [state]);

  return (
    <section className={s.container}>
      <div className={s.messagesHeader}>
        <h2 className={s.title2}>Messages</h2>
        <div className={s.shadow} />
      </div>

      <div className={s.messages}>
        {dbMessages &&
          dbMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              onUpdate={setMessageToUpdate}
            />
          ))}
      </div>
      <br />
      <br />
      <form action={action}>
        <input type="hidden" name="userEmail" value={session?.user.email} />
        {messageToUpdate && (
          <input type="hidden" name="id" value={messageToUpdate.id} />
        )}
        <textarea
          name="text"
          placeholder="Ton message"
          value={messageToUpdate?.text}
          onChange={(e) =>
            setMessageToUpdate(
              Object.assign({}, messageToUpdate, { text: e.target.value }),
            )
          }
          className={s.textArea}
          rows={5}
        />
        <br />
        <button
          type="submit"
          className={s.submitButton}
          style={{ backgroundColor: theme.color, color: theme.backgroundColor }}
        >
          {messageToUpdate?.id !== undefined ? "Mettre à jour" : "Envoyer"}
        </button>
      </form>
    </section>
  );
}
