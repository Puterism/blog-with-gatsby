import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { AllMdx } from '../types';
import Layout from '../components/layout/layout';
import Tag from '../components/tag/tag';
import { formatDateString } from '../utils/datetime';

interface Props {
  pageContext: {
    tag: string;
  };
  data: AllMdx;
}

const TagTemplate = ({ pageContext, data }: Props) => {
  const { tag } = pageContext;
  const { totalCount, edges } = data.allMdx;

  const tagTitle = `${tag} (${totalCount})`;

  return (
    <Layout pageTitle={tagTitle}>
      <Tag name={tag} count={totalCount} />
      <ul>
        {edges.map(({ node }) => {
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
  query PostsByTag($tag: String) {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { tags: { in: [$tag] } } }) {
      totalCount
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
        }
      }
    }
  }
`;

export default TagTemplate;
