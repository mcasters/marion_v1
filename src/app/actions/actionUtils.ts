import { unstable_cache } from "next/cache";

export async function cacheDBDatas<S>(
  fn: () => Promise<S>,
  isAdmin: boolean,
  key: string,
): Promise<S> {
  const query = isAdmin
    ? fn
    : unstable_cache(async () => fn(), [key], {
        revalidate: 60 * 5,
        tags: [key],
      });
  return query();
}
