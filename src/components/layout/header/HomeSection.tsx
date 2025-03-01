"use client";

import s from "../../../styles/Header.module.css";
import React, { useEffect, useRef, useState } from "react";
import { META } from "@/constants/specific";
import { useMetas } from "@/app/context/metaProvider";

interface Props {
  handleDisappear: (arg0: boolean) => void;
  yLimit: number;
  text?: string;
}

export default function HomeSection({
  handleDisappear,
  yLimit,
  text = "",
}: Props) {
  const metas = useMetas();
  const [isGone, setIsGone] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleDisappear(isGone);
  }, [isGone, handleDisappear]);

  useEffect(() => {
    function handleScroll() {
      if (ref.current) {
        const _isGone = ref.current.getBoundingClientRect().bottom <= yLimit;
        setIsGone(_isGone);
      }
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isGone, yLimit]);

  return text === "" ? (
    <section ref={ref} className={s.siteTitle}>
      <h1 className={`${s.title} title`}>{metas[META.SITE_TITLE]}</h1>
    </section>
  ) : (
    <section ref={ref} className={s.intro}>
      <p>{text}</p>
    </section>
  );
}
