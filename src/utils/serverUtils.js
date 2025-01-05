import { mkdir, stat, unlinkSync } from "fs";
import sharp from "sharp";
import { join } from "path";
import { IMAGE_SIZE } from "@/constants/image";
import { transformValueToKey } from "@/utils/commonUtils";

const serverLibraryPath = process.env.PHOTOS_PATH;

export const getPaintingDir = () => {
  return join(`${serverLibraryPath}`, "peinture");
};

export const getSculptureDir = () => {
  return join(`${serverLibraryPath}`, "sculpture");
};

export const getMiscellaneousDir = () => {
  return join(`${serverLibraryPath}`, "miscellaneous");
};

export const getPostDir = () => {
  return join(`${serverLibraryPath}`, "post");
};

export const getDrawingDir = () => {
  return join(`${serverLibraryPath}`, "dessin");
};

export const createDirIfNecessary = (dir) => {
  stat(dir, (err) => {
    if (err?.code === "ENOENT")
      mkdir(dir, { recursive: true }, (err) => {
        throw err;
      });
    else {
      throw err;
    }
  });
};

export const resizeAndSaveImage = async (file, title = "", dir) => {
  const titleString = transformValueToKey(title);
  const newFilename = `${titleString}-${Date.now()}.jpeg`;
  const maxSize = 140000;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const constraintImage = async (buffer, quality = 90, drop = 5) => {
    const done = await sharp(buffer)
      .jpeg({
        quality: Math.trunc(quality),
      })
      .toBuffer();
    if (done.byteLength > maxSize) {
      return constraintImage(buffer, quality - drop);
    }
    return done;
  };

  const image = await sharp(buffer);
  const metadata = await image.metadata();
  const ratio = metadata.width / metadata.height;
  const isPortrait = ratio <= 1.02; // not landscape but also not square (to keep 2000px width for square images)
  const width = !isPortrait ? 2000 : null;
  const height = isPortrait ? 1500 : null;

  const imageBuffer = await sharp(buffer)
    .resize(width, height, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .jpeg({ quality: 100 })
    .toBuffer();

  let lightImageBuffer = imageBuffer;
  if (imageBuffer.byteLength > maxSize)
    lightImageBuffer = await constraintImage(imageBuffer);

  const sharpStream = sharp({ failOn: "none" });
  const promises = [];

  promises.push(
    sharpStream
      .clone()
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Marion Casters",
          },
        },
      })
      .toFile(`${dir}/${newFilename}`),
  );

  promises.push(
    sharpStream
      .clone()
      .resize({
        width: IMAGE_SIZE.MD_PX,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Marion Casters",
          },
        },
      })
      .toFile(`${dir}/md/${newFilename}`),
  );

  promises.push(
    sharpStream
      .clone()
      .resize({
        width: IMAGE_SIZE.SM_PX,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: "Marion Casters",
          },
        },
      })
      .toFile(`${dir}/sm/${newFilename}`),
  );

  sharp(lightImageBuffer).pipe(sharpStream);

  return Promise.all(promises)
    .then((res) => {
      const info = res[0];
      return { filename: newFilename, width: info.width, height: info.height };
    })
    .catch((err) => {
      console.error(
        "Erreur à l'écriture des fichiers images, nettoyage...",
        err,
      );
      try {
        unlinkSync(`${dir}/sm/${newFilename}`);
        unlinkSync(`${dir}/md/${newFilename}`);
        unlinkSync(`${dir}/${newFilename}`);
      } catch (e) {}
    });
};

export const deleteFile = (dir, filename) => {
  try {
    unlinkSync(`${dir}/sm/${filename}`);
    unlinkSync(`${dir}/md/${filename}`);
    unlinkSync(`${dir}/${filename}`);
    return true;
  } catch (e) {
    return false;
  }
};
