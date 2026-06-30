import ExploreAllGiftsPage from "@/components/gifts";

type GiftsPageProps = {
  searchParams?:
    | {
        q?: string | string[];
      }
    | Promise<{
        q?: string | string[];
      }>;
};

const GiftsPage = async ({ searchParams }: GiftsPageProps) => {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams?.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery ?? "";

  return <ExploreAllGiftsPage key={query} initialQuery={query} />;
};

export default GiftsPage;
