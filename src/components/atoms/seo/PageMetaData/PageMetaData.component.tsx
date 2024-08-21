import React from 'react';
import Head from 'next/head';

interface PageMetaDataProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  companyName?: string;
  pageName?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
}

export function PageMetaData(props: PageMetaDataProps) {
  const {
    companyName = "Bridge Financial",
    pageName = "",
    title,
    description = "Bridge offers expert consulting, real-time business valuation, and technology solutions to optimize and sell your business for maximum value.",
    keywords,
    author,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard
  } = props;

  // Ensure title and description are provided
  if (!title || !description) {
    throw new Error("The 'title' and 'description' fields are required for SEO.");
  }

  // Limit title and description length
  const truncatedTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  const truncatedDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;

  return (
    <Head>
      <title>{truncatedTitle} | {companyName} - {pageName}</title>
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
