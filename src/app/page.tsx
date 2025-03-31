import HomePage from "@/components/home/homePage";
import { getContentsFull } from "@/app/actions/contents";
import { getSliderPhotoTab } from "@/utils/imageUtils";
import { getSession } from "@/app/lib/auth";

export default async function Page() {
  const session = await getSession();
  const contents = await getContentsFull(!!session);
  const { photos, mainPhotos } = getSliderPhotoTab(contents);

  return <HomePage portraitPhotos={mainPhotos} landscapePhotos={photos} />;
}
