import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Node } from '../types';
import Layout from '../components/layout/layout';

interface Props {
  data: {
    mdx: Node;
  };
}

const PageTemplate = ({ data }: Props) => {
  const { body, frontmatter } = data.mdx;
  const { title } = frontmatter;

  return (
    <Layout pageTitle={title}>
      <article className="prose max-w-none my-16">
        <MDXRenderer>{body}</MDXRenderer>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query PageById($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`;

export default PageTemplate;
