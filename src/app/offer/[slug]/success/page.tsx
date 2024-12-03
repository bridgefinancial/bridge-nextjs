import { notFound } from 'next/navigation';
import { contentBySlug, OfferSlug } from '../content';
import OfferSuccessPage from './OfferSuccessPage';

const OfferSuccess = async ({
  params,
  searchParams,
}: {
  params: { slug: OfferSlug };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  if (!contentBySlug.has(params.slug)) {
    notFound();
  }

  return (
    <OfferSuccessPage
      iconPath={
        contentBySlug.get(params.slug)?.iconPath ??
        '/assets/images/journey/chart.png'
      }
    />
  );
};

export default OfferSuccess;
