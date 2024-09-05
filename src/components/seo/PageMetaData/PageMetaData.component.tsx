import React from 'react';
import Head from 'next/head';

interface PageMetaDataProps {
  companyName?: string;
  pageName?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
}

export function PageMetaData(props: PageMetaDataProps) {
  const {
    companyName = "Bridge Financial",
    pageName = "",
    description = "Bridge offers expert consulting, real-time business valuation, and technology solutions to optimize and sell your business for maximum value.",
    keywords,
    author,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard
  } = props;

  // Combine companyName and pageName to create the title
  const combinedTitle = `${companyName}${pageName ? ` - ${pageName}` : ''}`;

  // Limit description length
  const truncatedDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;
console.log(combinedTitle, truncatedDescription)
  return (
    <Head>
      <title>{combinedTitle}</title>
      <meta name="description" content={truncatedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
    </Head>
  );
}

export default PageMetaData;
