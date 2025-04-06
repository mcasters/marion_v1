import { mkdir, rmSync, stat } from "fs";
import sharp from "sharp";
import { join } from "path";
import { transformValueToKey } from "@/utils/commonUtils";
import { IMAGE } from "@/constants/image";
import { StructuredTheme, Type } from "@/lib/type";
import { PresetColor, Theme } from "@prisma/client";
import { getStructuredTheme, themeToHexa } from "@/utils/themeUtils";
import { getSession } from "@/app/lib/auth";
import { unstable_cache } from "next/cache";

const serverLibraryPath = process.env.PHOTOS_PATH;
const copyright = process.env.TITLE || "";

export async function cacheDatas<S>(
  fn: () => Promise<S>,
  key: string,
): Promise<S> {
  const isAdmin = !!(await getSession());
  const res = isAdmin
    ? fn
    : unstable_cache(async () => fn(), [key], {
        revalidate: 60 * 5,
        tags: [key],
      });
  return res();
}

export const getDir = (type: Type) => {
  return join(`${serverLibraryPath}`, type);
};

export const getMiscellaneousDir = () => {
  return join(`${serverLibraryPath}`, "miscellaneous");
};

export const createDirIfNecessary = (dir: string) => {
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

export const resizeAndSaveImage = async (
  file: File,
  title: string = "",
  dir: string,
) => {
  const titleString = transformValueToKey(title);
  const newFilename = `${titleString}-${Date.now()}.jpeg`;
  const maxSize = 140000;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const constraintImage = async (buffer: Buffer, quality = 90, drop = 5) => {
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

  if (metadata.width && metadata.height) {
    const ratio = metadata.width / metadata.height;
    const isPortrait = ratio <= 1.02; // (keep 2000px width for square images)
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
              Copyright: copyright,
            },
          },
        })
        .toFile(`${dir}/${newFilename}`),
    );

    promises.push(
      sharpStream
        .clone()
        .resize({
          width: IMAGE.MD_PX,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: copyright,
            },
          },
        })
        .toFile(`${dir}/md/${newFilename}`),
    );

    promises.push(
      sharpStream
        .clone()
        .resize({
          width: IMAGE.SM_PX,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: copyright,
            },
          },
        })
        .toFile(`${dir}/sm/${newFilename}`),
    );

    sharp(lightImageBuffer).pipe(sharpStream);

    return Promise.all(promises)
      .then((res) => {
        const info = res[0];
        return {
          filename: newFilename,
          width: info.width,
          height: info.height,
        };
      })
      .catch((err) => {
        console.error(
          "Erreur à l'écriture des fichiers images, nettoyage...",
          err,
        );
        try {
          deleteFile(dir, newFilename);
        } catch (e) {
          console.error("Erreur à la suppression", e);
        }
      });
  }
};

export const deleteFile = (dir: string, filename: string) => {
  rmSync(`${dir}/sm/${filename}`, { force: true });
  rmSync(`${dir}/md/${filename}`, { force: true });
  rmSync(`${dir}/${filename}`, { force: true });
};

export const getStructHexaTheme = async (
  theme: Theme,
  presetColors: PresetColor[],
): Promise<StructuredTheme> => {
  return await cacheDatas(
    async () => getStructuredTheme(themeToHexa(theme, presetColors)),
    "structuredHexaTheme",
  );
};
