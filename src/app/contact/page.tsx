import Link from "next/link";

import s from "@/styles/contact.module.css";
import {
  getAddressText,
  getContactText,
  getEmailText,
  getPhoneText,
} from "@/utils/commonUtils";
import { getContentsFull } from "@/app/actions/contents";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { TEXTS } from "@/constants/specific";

export default async function Contact() {
  const contents = await getContentsFull();
  const email = getEmailText(contents);
  const contactText = getContactText(contents);

  return (
    <>
      <address>
        <p>{TEXTS.TITLE}</p>
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
        {TEXTS.TITLE === "Thierry Casters" && (
          <>
            <br />
            <br />
            <br />
            <br />
            <a
              href="https://www.instagram.com/thierrycasters/"
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
