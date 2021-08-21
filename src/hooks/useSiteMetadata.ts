import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetadata } from '../types';

interface SiteMetadataQuery {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadataQuery>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          siteTitle
          siteShortTitle
          siteDescription
          siteUrl
          siteImage
          siteLanguage
          author {
            name
            avatar
            introduction
            social {
              twitter
              github
              facebook
              instagram
            }
          }
          menu {
            title
            link
          }
        }
      }
    }
  `);

  return site.siteMetadata;
};

export default useSiteMetadata;
