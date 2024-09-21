import {
  getAddressText,
  getContactText,
  getEmailText,
  getPhoneText,
} from "@/utils/commonUtils";
import { getContentsFull } from "@/app/api/content/getContents";
import s from "@/styles/admin/Admin.module.css";
import { Label } from "@prisma/client";
import TextAreaForm from "@/components/admin/form/TextAreaForm";
import React from "react";
import InputForm from "@/components/admin/form/InputForm";

export default async function Contact() {
  const contents = await getContentsFull();

  return (
    <>
      <h1 className={s.pageTitle}>Contenus de la page contact</h1>
      <TextAreaForm
        textContent={getAddressText(contents)}
        label={Label.ADDRESS}
        api="api/content/update"
        textLabel="Adresse"
      />
      <InputForm
        label={Label.PHONE}
        api="api/content/update"
        textContent={getPhoneText(contents)}
        textLabel="Téléphone"
      />
      <InputForm
        label={Label.EMAIL}
        api="api/content/update"
        textContent={getEmailText(contents)}
        textLabel="E-mail"
      />
      <TextAreaForm
        textContent={getContactText(contents)}
        label={Label.TEXT_CONTACT}
        api="api/content/update"
        textLabel="Texte d'accompagnement (facultatif)"
      />
    </>
  );
}
