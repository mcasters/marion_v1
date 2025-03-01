"use client";
import { createContext, ReactNode, useContext } from "react";

const MetaContext = createContext<{ [index: string]: string }>({});

interface Props {
  metas: { [index: string]: string };
  children: ReactNode;
}

export function MetaProvider({ metas, children }: Props) {
  return <MetaContext.Provider value={metas}>{children}</MetaContext.Provider>;
}

export function useMetas() {
  return useContext(MetaContext);
}
