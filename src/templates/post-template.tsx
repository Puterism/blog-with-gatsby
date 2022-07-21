import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Node } from '../types';
import Layout from '../components/layout/layout';
import Author from '../components/author/author';
import Tag from '../components/tag/tag';
import SEO from '../components/seo/seo';

interface PageContext {
  id: string;
  slug: string;
  previous: Partial<Node>;
  next: Partial<Node>;
}

interface Props {
  data: {
    mdx: Node;
  };
  pageContext: PageContext;
}

const PostTemplate = ({ data, pageContext }: Props) => {
  const { body, frontmatter, excerpt } = data.mdx;
  const { title, date, tags } = frontmatter;
  const { previous, next } = pageContext;

  const dateText = new Intl.DateTimeFormat('ko-KR').format(new Date(date));

  return (
    <Layout>
      <SEO title={title} description={excerpt} type="article" />
      <h1 className="font-bold my-2">{title}</h1>
      <small>{dateText}</small>
      <ul className="flex gap-4 my-2">
        {tags?.map((tag) => (
          <li key={tag}>
            <Tag name={tag} />
          </li>
        ))}
      </ul>
      <article className="prose dark:prose-invert max-w-none my-16">
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      <hr className="my-8" />
      <Author />
      <hr className="my-8" />
      <div className="flex flex-col justify-between gap-8 my-16 md:flex-row">
        <div>
          {previous?.frontmatter && previous?.fields && (
            <Link to={`/${previous.frontmatter.slug}` ?? previous.fields.slug}>
              <p>이전 글</p>
              <p className="text-lg font-bold">{previous.frontmatter?.title}</p>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next?.frontmatter && next?.fields && (
            <Link to={`/${next.frontmatter.slug}` ?? next.fields.slug}>
              <p>다음 글</p>
              <p className="text-lg font-bold">{next.frontmatter?.title}</p>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PostById($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
        tags
        slug
      }
      fields {
        slug
      }
      excerpt
    }
  }
`;

export default PostTemplate;
