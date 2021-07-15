import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import { AllMdx } from '../types';

interface Props {
  data: AllMdx;
}

const IndexPage = ({ data }: Props) => {
  return (
    <Layout pageTitle="Home">
      <h1>하이</h1>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
      />
      <ul>
        {data.allMdx.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.frontmatter.slug}>
              <h3>{node.frontmatter.title}</h3>
              <p>{node.frontmatter.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query PostsQuery($limit: Int) {
    allMdx(limit: $limit) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            slug
            tags
          }
        }
      }
    }
  }
`;

export default IndexPage;
