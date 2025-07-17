import Link from "next/link";

import s from "@/styles/contactPage.module.css";
import {
  getAddress,
  getContactText,
  getEmail,
  getMetaMap,
  getPhone,
} from "@/utils/commonUtils";
import { getContentsFull } from "@/app/actions/contents";
import InstagramIcon from "@/components/icons/instagramIcon";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/admin";

export default async function Contact() {
  const contents = await getContentsFull();
  const metas = getMetaMap(await getMetas());
  const email = getEmail(contents);
  const contactText = getContactText(contents);
  const owner = metas.get(META.SITE_TITLE);
  const instagram = metas.get(META.INSTAGRAM);

  return (
    <>
      <address>
        <p>{owner}</p>
        <p className={s.preLine}>{getAddress(contents)}</p>
        <br />
        <p>
          <Link href={`tel:+33${getPhone(contents)}`}>
            {getPhone(contents)}
          </Link>
        </p>
        <br />
        <p>
          <Link className={s.email} href={`mailto:${email}`}>
            {email}
          </Link>
        </p>
        {owner?.startsWith("T") && instagram && (
          <>
            <br />
            <br />
            <br />
            <br />
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
          </>
        )}
      </address>
      {contactText !== "" && (
        <div className={s.text}>
          <p className={s.preLine}>{contactText}</p>
        </div>
      )}
    </>
  );
}
