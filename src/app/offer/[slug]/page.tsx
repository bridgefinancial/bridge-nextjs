import { notFound } from 'next/navigation';
import {
  contentBySlug,
  OfferSlug,
  OPEN_VIDEO_SEARCH_PARAM_KEY,
} from './content';
import OfferPageContent from './OfferPageContent';

const DashboardPage = async ({
  params,
  searchParams,
}: {
  params: { slug: OfferSlug };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  if (!contentBySlug.has(params.slug)) {
    notFound();
  }

  const videoOpened = searchParams?.[OPEN_VIDEO_SEARCH_PARAM_KEY] == 't';

  return (
    <OfferPageContent
      isVideoOpen={videoOpened}
      slug={params.slug as OfferSlug}
    />
  );
};

export default DashboardPage;
