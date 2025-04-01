import { unstable_cache } from "next/cache";
import { getSession } from "@/app/lib/auth";

export async function cacheDBDatas<S>(
  fn: () => Promise<S>,
  key: string,
): Promise<S> {
  const isAdmin = !!(await getSession());
  const query = isAdmin
    ? fn
    : unstable_cache(async () => fn(), [key], {
        revalidate: 60 * 5,
        tags: [key],
      });
  return query();
}
