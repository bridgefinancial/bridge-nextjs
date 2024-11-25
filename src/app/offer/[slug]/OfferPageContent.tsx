'use client';

import OfferContent from '@/components/templates/layouts/OfferLayout/OfferContent/OfferContent.component';
import { useLogoutUser, useSessionUser } from '@/services/users.service';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import {
  contentBySlug,
  OfferSlug,
  OPEN_VIDEO_SEARCH_PARAM_KEY,
} from './content';

type OfferPageContentProps = {
  isVideoOpen: boolean;
  slug: OfferSlug;
};

const OfferPageContent = ({ isVideoOpen, slug }: OfferPageContentProps) => {
  const { data: user } = useSessionUser();
  const { mutateAsync: logout } = useLogoutUser();
  const router = useRouter();

  const content = contentBySlug.get(slug);

  if (!content) {
    return <></>;
  }

  return (
    <Suspense>
      <OfferContent
        videoDetails={{
          opened: isVideoOpen,
          url: '',
          onClose: () => {
            router.push(`?${OPEN_VIDEO_SEARCH_PARAM_KEY}=f`);
          },
        }}
        user={user}
        features={content.features}
        logout={logout}
        testimonials={content.testimonials}
        messageWithCta={{
          titleProps: {
            titleText: content.heading,
          },
          paragraphProps: {
            paragraphText: content.subheading,
          },
          buttonProps: content.buttonProps,
        }}
      />
    </Suspense>
  );
};

export default OfferPageContent;
