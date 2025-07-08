import {
  getAddressText,
  getContactText,
  getEmailText,
  getPhoneText,
} from "@/utils/commonUtils";
import s from "@/components/admin/admin.module.css";
import { Label } from "@/generated/client";
import TextAreaForm from "@/components/admin/form/content/textAreaForm";
import React from "react";
import InputForm from "@/components/admin/form/content/inputForm";
import { getContentsFull } from "@/app/actions/contents";

export default async function Contact() {
  const contents = await getContentsFull();

  return (
    <div className={s.container}>
      <h1 className={s.title1}>Contenus de la page contact</h1>
      <TextAreaForm
        textContent={getAddressText(contents)}
        label={Label.ADDRESS}
        textLabel="Adresse"
      />
      <div className="separate" />
      <InputForm
        label={Label.PHONE}
        textContent={getPhoneText(contents)}
        textLabel="Téléphone"
        isPhone
      />
      <div className="separate" />
      <InputForm
        label={Label.EMAIL}
        textContent={getEmailText(contents)}
        textLabel="E-mail"
        isEmail
      />
      <div className="separate" />
      <TextAreaForm
        textContent={getContactText(contents)}
        label={Label.TEXT_CONTACT}
        textLabel="Texte d'accompagnement (facultatif)"
      />
    </div>
  );
}
