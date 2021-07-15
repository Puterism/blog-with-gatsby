import { ReactNode } from 'react';

export interface AllMdx {
  allMdx: {
    edges: Edge[];
  };
}

export interface Edge {
  node: Node;
}

export interface Node {
  id: string;
  body: string & ReactNode;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];
    slug: string;
  };
}
