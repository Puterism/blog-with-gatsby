import * as React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { Node } from '../../types';

interface Props {
  post?: Node;
}

const SEO = ({ post }: Props) => {
  const { siteTitle, siteShortTitle, siteDescription, siteUrl, siteImage, siteLanguage, author } = useSiteMetadata();
  const { twitter } = author.social;

  const postTitle = post?.frontmatter.title;
  const postDescription = post?.frontmatter.description ?? post?.excerpt;
  const postCover = post?.frontmatter.cover;
  const postSlug = post?.fields?.slug ?? post?.frontmatter?.slug ?? '';

  const title = postTitle ? `${postTitle} - ${siteShortTitle}` : siteTitle;
  const description = postDescription ? postDescription : siteDescription;
  const image = postCover ? postCover : siteImage;
  const url = `${siteUrl}${postSlug}`;

  return (
    <Helmet
      htmlAttributes={{
        lang: siteLanguage,
        prefix: 'og: http://ogp.me/ns#',
      }}
    >
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={twitter ? twitter : ''} />
    </Helmet>
  );
};

export default SEO;
