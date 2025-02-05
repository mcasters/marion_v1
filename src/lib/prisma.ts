import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    omit: {
      painting: { imageFilename: true, imageWidth: true, imageHeight: true },
      drawing: { imageFilename: true, imageWidth: true, imageHeight: true },
      categoryContent: {
        imageFilename: true,
        imageWidth: true,
        imageHeight: true,
      },
    },
  }).$extends({
    result: {
      painting: {
        images: {
          needs: { imageFilename: true, imageWidth: true, imageHeight: true },
          compute(painting) {
            return [
              {
                id: 0,
                filename: painting.imageFilename,
                width: painting.imageWidth,
                height: painting.imageHeight,
                isMain: true,
              },
            ];
          },
        },
        length: {
          compute() {
            return 0;
          },
        },
      },
      drawing: {
        images: {
          needs: { imageFilename: true, imageWidth: true, imageHeight: true },
          compute(drawing) {
            return [
              {
                id: 0,
                filename: drawing.imageFilename,
                width: drawing.imageWidth,
                height: drawing.imageHeight,
                isMain: true,
              },
            ];
          },
        },
        length: {
          compute() {
            return 0;
          },
        },
      },
      categoryContent: {
        image: {
          needs: { imageFilename: true, imageWidth: true, imageHeight: true },
          compute(categoryContent) {
            return [
              {
                id: 0,
                filename: categoryContent.imageFilename,
                width: categoryContent.imageWidth,
                height: categoryContent.imageHeight,
                isMain: true,
              },
            ];
          },
        },
        length: {
          compute() {
            return 0;
          },
        },
      },
      paintingCategory: {
        items: {
          needs: { paintings: true },
          compute(paintingCategory) {
            return paintingCategory.paintings;
          },
        },
      },
      sculptureCategory: {
        items: {
          needs: { sculptures: true },
          compute(sculptureCategory) {
            return sculptureCategory.sculptures;
          },
        },
      },
      drawingCategory: {
        items: {
          needs: { drawings: true },
          compute(drawingCategory) {
            return drawingCategory.drawings;
          },
        },
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
