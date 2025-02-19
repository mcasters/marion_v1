import { Type } from "@/lib/type";

export const getItemData = (type: string, rawFormData, fileInfo?, images?) => {
  if (type === Type.PAINTING || type === Type.DRAWING)
    return {
      title: rawFormData.title as string,
      date: new Date(Number(rawFormData.date), 1),
      technique: rawFormData.technique as string,
      description: rawFormData.description as string,
      height: Number(rawFormData.height),
      width: Number(rawFormData.width),
      isToSell: rawFormData.isToSell === "true",
      price: Number(rawFormData.price),
      imageFilename: fileInfo.filename,
      imageWidth: fileInfo.width,
      imageHeight: fileInfo.height,
      category:
        rawFormData.categoryId === ""
          ? {}
          : {
              connect: {
                id: Number(rawFormData.categoryId),
              },
            },
    };
  else
    return {
      title: rawFormData.title as string,
      date: new Date(Number(rawFormData.date), 1),
      technique: rawFormData.technique as string,
      description: rawFormData.description as string,
      height: Number(rawFormData.height),
      width: Number(rawFormData.width),
      length: Number(rawFormData.length),
      isToSell: rawFormData.isToSell === "true",
      price: Number(rawFormData.price),
      category:
        rawFormData.categoryId === ""
          ? {}
          : {
              connect: {
                id: Number(rawFormData.categoryId),
              },
            },
      images: {
        create: images,
      },
    };
};
