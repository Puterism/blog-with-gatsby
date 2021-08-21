'use strict';

const path = require('path');
const kebabcase = require('lodash.kebabcase');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/',
    component: path.resolve('./src/templates/blog-template.tsx'),
  });

  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-template.tsx'),
  });

  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.tsx'),
  });

  const tagsQuery = await graphql(`
    {
      allMdx(filter: { frontmatter: { draft: { ne: true }, template: { eq: "post" } } }) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  const tags = tagsQuery.data.allMdx.group;

  tags.forEach(({ fieldValue }) => {
    createPage({
      path: `/tags/${kebabcase(fieldValue)}/`,
      component: path.resolve('./src/templates/tag-template.tsx'),
      context: {
        tag: fieldValue,
      },
    });
  });

  const allMdxQuery = await graphql(`
    {
      allMdx(filter: { frontmatter: { draft: { ne: true } } }, sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = allMdxQuery.data.allMdx;
  const posts = edges.filter((edge) => edge.node.frontmatter.template === 'post');
  const pages = edges.filter((edge) => edge.node.frontmatter.template === 'page');

  posts.forEach((post, index) => {
    const { id, fields } = post.node;
    const { slug } = fields;

    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: slug,
      component: path.resolve('./src/templates/post-template.tsx'),
      context: { id, slug, previous, next },
    });
  });

  pages.forEach((page) => {
    const { id, fields } = page.node;
    const { slug } = fields;

    createPage({
      path: slug,
      component: path.resolve('./src/templates/page-template.tsx'),
      context: { id },
    });
  });
};

module.exports = createPages;
