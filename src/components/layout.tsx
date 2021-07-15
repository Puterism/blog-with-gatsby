import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { container, navLinks, navLinkItem, navLinkText, heading } from './layout.module.scss';

interface Props {
  pageTitle: string;
  children?: React.ReactNode;
}

const Layout = ({ pageTitle, children }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <main className={container}>
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/blog" className={navLinkText}>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className={heading}>{pageTitle}</h1>
      {children}
    </main>
  );
};

export default Layout;
