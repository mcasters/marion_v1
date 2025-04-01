import HomePage from "@/components/home/homePage";
import { getContentsFull } from "@/app/actions/contents";
import { getSliderPhotoTab } from "@/utils/imageUtils";

export default async function Page() {
  const contents = await getContentsFull();
  const { photos, mainPhotos } = getSliderPhotoTab(contents);

  return <HomePage portraitPhotos={mainPhotos} landscapePhotos={photos} />;
}
