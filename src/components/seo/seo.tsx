import * as React from 'react';
import Helmet from 'react-helmet';
import { useLocation } from '@reach/router';
import useSiteMetadata from '../../hooks/useSiteMetadata';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SEO = ({ title, description, image, type = 'website' }: Props) => {
  const { pathname } = useLocation();

  const { siteTitle, siteShortTitle, siteDescription, siteUrl, siteImage, siteLanguage, author } = useSiteMetadata();
  const { twitter } = author.social;

  const seo = {
    title: title ? `${title} - ${siteShortTitle}` : siteTitle,
    description: description ? description : siteDescription,
    image: image ? image : siteImage,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: siteLanguage,
        prefix: 'og: http://ogp.me/ns#',
      }}
    >
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.image && <meta name="image" content={seo.image} />}
      <meta property="og:url" content={seo.url} />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:type" content={`${type}`} />
      <meta name="twitter:card" content="summary" />
      {twitter && <meta name="twitter:creator" content={twitter} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

export default SEO;
