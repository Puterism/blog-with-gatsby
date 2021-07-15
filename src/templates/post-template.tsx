import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Node } from '../types';
import Layout from '../components/layout';

interface Props {
  data: {
    mdx: Node;
  };
}

const PostTemplate = ({ data }: Props) => {
  const { body, frontmatter } = data.mdx;
  const { title } = frontmatter;

  return (
    <Layout pageTitle={title}>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;

export default PostTemplate;
