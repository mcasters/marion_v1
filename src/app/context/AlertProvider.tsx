"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import Alert from "@/components/AlertModal/AlertModal";

export type AlertContextType = (message: string, isError?: boolean) => void;

const AlertContext = createContext<AlertContextType>(() => {});

interface Props {
  children: ReactNode;
}

export function AlertProvider({ children }: Props) {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const alert = (message: string, isError?: boolean) => {
    setMessage(message);
    if (isError) setIsError(isError);
    setIsOpen(true);
  };
  return (
    <AlertContext.Provider value={alert}>
      {isOpen && (
        <Alert
          message={message}
          isError={isError}
          onClose={() => setIsOpen(false)}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
