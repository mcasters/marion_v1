import {
  getAddressText,
  getContactText,
  getEmailText,
  getPhoneText,
} from "@/utils/commonUtils";
import s from "@/styles/admin/admin.module.css";
import { Label } from "@prisma/client";
import TextAreaForm from "@/components/admin/form/content/TextAreaForm";
import React from "react";
import InputForm from "@/components/admin/form/content/InputForm";
import { getContentsFull } from "@/app/actions/contents";

export default async function Contact() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.title1}>Contenus de la page contact</h1>
      <div className={s.container}>
        <TextAreaForm
          textContent={getAddressText(contents)}
          label={Label.ADDRESS}
          textLabel="Adresse"
        />
      </div>
      <div className={s.container}>
        <InputForm
          label={Label.PHONE}
          textContent={getPhoneText(contents)}
          textLabel="Téléphone"
          isPhone
        />
      </div>
      <div className={s.container}>
        <InputForm
          label={Label.EMAIL}
          textContent={getEmailText(contents)}
          textLabel="E-mail"
          isEmail
        />
      </div>
      <div className={s.container}>
        <TextAreaForm
          textContent={getContactText(contents)}
          label={Label.TEXT_CONTACT}
          textLabel="Texte d'accompagnement (facultatif)"
        />
      </div>
    </>
  );
}
