import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout/layout';
import { AllMdx } from '../types';
import Author from '../components/author/author';
import { formatDateString } from '../utils/datetime';
import SEO from '../components/seo/seo';

interface Props {
  data: AllMdx;
}

const BlogTemplate = ({ data }: Props) => {
  return (
    <Layout>
      <SEO />
      <hr className="mb-8" />
      <Author />
      <hr className="my-8" />
      <h2>블로그</h2>
      <ul>
        {data.allMdx.edges.map(({ node }) => {
          const { id, frontmatter, fields } = node;
          const { title, date } = frontmatter;

          return (
            <li key={id} className="my-8">
              <Link to={`/${frontmatter.slug}` ?? fields.slug}>
                <h3 className="font-bold">{title}</h3>
                <small>{formatDateString(date)}</small>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query Posts($limit: Int) {
    allMdx(
      limit: $limit
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            slug
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default BlogTemplate;
