import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Node } from '../types';
import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';
import ThemeProvider from '../contexts/ThemeProvider';

interface Props {
  data: {
    mdx: Node;
  };
}

const PageTemplate = ({ data }: Props) => {
  const { body, frontmatter, excerpt } = data.mdx;
  const { title } = frontmatter;

  return (
    <ThemeProvider>
      <Layout>
        <SEO title={title} description={excerpt} />
        <article className="prose dark:prose-invert max-w-none my-16">
          <MDXRenderer localImages={frontmatter.embeddedImagesLocal}>{body}</MDXRenderer>
        </article>
      </Layout>
    </ThemeProvider>
  );
};

export const query = graphql`
  query PageById($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      excerpt
    }
  }
`;

export default PageTemplate;
