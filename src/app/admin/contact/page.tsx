import {
  getAddressText,
  getContactText,
  getEmailText,
  getPhoneText,
} from "@/utils/commonUtils";
import s from "@/styles/admin/Admin.module.css";
import { Label } from "@prisma/client";
import TextAreaForm from "@/components/admin/form/TextAreaForm";
import React from "react";
import InputForm from "@/components/admin/form/InputForm";
import { getContentsFull } from "@/app/actions/contents";

export default async function Contact() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page contact</h1>
      <TextAreaForm
        textContent={getAddressText(contents)}
        label={Label.ADDRESS}
        textLabel="Adresse"
      />
      <InputForm
        label={Label.PHONE}
        textContent={getPhoneText(contents)}
        textLabel="Téléphone"
        isPhone
      />
      <InputForm
        label={Label.EMAIL}
        textContent={getEmailText(contents)}
        textLabel="E-mail"
        isEmail
      />
      <TextAreaForm
        textContent={getContactText(contents)}
        label={Label.TEXT_CONTACT}
        textLabel="Texte d'accompagnement (facultatif)"
      />
    </>
  );
}
