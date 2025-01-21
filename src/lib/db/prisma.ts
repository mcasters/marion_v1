import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    omit: {
      painting: { imageFilename: true, imageWidth: true, imageHeight: true },
      drawing: { imageFilename: true, imageWidth: true, imageHeight: true },
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
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
