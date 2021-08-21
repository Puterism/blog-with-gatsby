import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import { TagsQuery } from '../types';
import Tag from '../components/tag/tag';

interface Props {
  data: TagsQuery;
}

const TagsTemplate = ({ data }: Props) => {
  return (
    <Layout pageTitle="Tags">
      <h2>태그 목록</h2>
      <ul className="flex gap-4 my-2 flex-wrap">
        {data.allMdx.group.map(({ fieldValue, totalCount }) => (
          <li key={fieldValue}>
            <Tag name={fieldValue} count={totalCount} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query Tags {
    allMdx(filter: { frontmatter: { draft: { ne: true }, template: { eq: "post" } } }) {
      totalCount
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsTemplate;
