import { ReactNode } from 'react';

export interface AllMdx {
  allMdx: {
    totalCount?: number;
    edges: Edge[];
  };
}

export interface Edge {
  node: Node;
}

export interface Node {
  id: string;
  body: string & ReactNode;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    slug: string;
    template: string;
    cover?: string;
  };
  excerpt: string;
}

export interface SiteMetadata {
  siteTitle: string;
  siteShortTitle: string;
  siteDescription: string;
  siteUrl: string;
  siteImage: string;
  siteLanguage: string;
  author: {
    name: string;
    avatar: string;
    introduction: string;
    social: {
      [index: string]: string;
    };
  };
  menu: {
    title: string;
    link: string;
  }[];
}

export interface Tag {
  fieldValue: string;
  totalCount: number;
}

export interface TagsQuery {
  allMdx: {
    totalCount: number;
    group: Tag[];
  };
}
