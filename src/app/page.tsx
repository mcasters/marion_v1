import HomePage from "../components/home/HomePage";
import { getSlidersLandscapeAndPortait } from "@/utils/commonUtils";
import { getContentsFull } from "@/app/actions/contents";

export default async function Page() {
  // This request should be cached until manually invalidated.
  // Similar to `getStaticProps`.
  // `force-cache` is the default and can be omitted.
  // const staticData = await fetch(`https://...`, { cache: 'force-cache' });

  // This request should be refetched on every request.
  // Similar to `getServerSideProps`.
  // const dynamicData = await fetch(`https://...`, { cache: 'no-store' });

  // This request should be cached with a lifetime of 10 seconds.
  // Similar to `getStaticProps` with the `revalidate` option.
  // const revalidatedData = await fetch(`https://...`, {
  //   next: { revalidate: 10 },
  // });
  const contents = await getContentsFull();
  const { portraitImages, landscapeImages } =
    getSlidersLandscapeAndPortait(contents);

  return (
    <HomePage
      portraitImages={portraitImages}
      landscapeImages={landscapeImages}
    />
  );
}
