import Link from "next/link";

import s from "@/styles/contact.module.css";
import {
  getAddressText,
  getContactText,
  getEmailText,
  getMetaMap,
  getPhoneText,
} from "@/utils/commonUtils";
import { getContentsFull } from "@/app/actions/contents";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { getMetas } from "@/app/actions/meta";
import { META } from "@/constants/admin";

export default async function Contact() {
  const contents = await getContentsFull();
  const metas = getMetaMap(await getMetas());
  const email = getEmailText(contents);
  const contactText = getContactText(contents);
  const siteTitle = metas.get(META.SITE_TITLE);

  return (
    <>
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
        {siteTitle?.startsWith("T") && (
          <>
            <br />
            <br />
            <br />
            <br />
            <a
              href={metas.get(META.INSTAGRAM)}
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
    </>
  );
}
