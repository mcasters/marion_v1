import Link from "next/link";

import s from "@/styles/contact.module.css";
import {
  getAddressText,
  getContactText,
  getEmailText,
  getMetasMap,
  getPhoneText,
} from "@/utils/commonUtils";
import { getContentsFull } from "@/app/actions/contents";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { META } from "@/constants/specific";
import { getMetas } from "@/app/actions/meta";
import React from "react";
import { Metadata } from "next";
import { DESCRIPTION, DOCUMENT_TITLE } from "@/constants/specific/metaHtml";

export const metadata: Metadata = {
  title: DOCUMENT_TITLE.CONTACT,
  description: DESCRIPTION.CONTACT,
};

export default async function Contact() {
  const contents = await getContentsFull();
  const metas = getMetasMap(await getMetas());
  const email = getEmailText(contents);
  const contactText = getContactText(contents);
  const siteTitle = metas[META.SITE_TITLE];

  return (
    <div className={s.container}>
      <h1 className="hidden">Contacter {siteTitle}</h1>
      <address>
        <p>{siteTitle}</p>
        <p className={s.preLine}>{getAddressText(contents)}</p>
        <br />
        <p>
          <Link href={`tel:+33${getPhoneText(contents)}`}>
            {getPhoneText(contents)}
          </Link>
        </p>
        <br />
        <p>
          <Link className={s.email} href={`mailto:${email}`}>
            {email}
          </Link>
        </p>
        {siteTitle.startsWith("T") && (
          <>
            <br />
            <br />
            <br />
            <br />
            <a
              href={metas[META.INSTAGRAM]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>
          </>
        )}
      </address>
      {contactText !== "" && (
        <div className={s.text}>
          <p className={s.preLine}>{getContactText(contents)}</p>
        </div>
      )}
    </div>
  );
}
