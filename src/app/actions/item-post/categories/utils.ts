import { transformValueToKey } from "@/utils/commonUtils";

export const getCategoryData = (formData: FormData) => {
  const rawFormData = Object.fromEntries(formData);
  const value = rawFormData.value as string;
  const isUpdate = rawFormData.id !== "0";
  const contentData = {
    title: rawFormData.title as string,
    text: rawFormData.text as string,
    imageFilename: rawFormData.filename as string,
    imageWidth: Number(rawFormData.width),
    imageHeight: Number(rawFormData.height),
  };

  const content = isUpdate
    ? {
        update: contentData,
      }
    : {
        create: contentData,
      };

  return {
    key: transformValueToKey(value),
    value,
    content,
  };
};
