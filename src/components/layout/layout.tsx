import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import AnchorLink from '../anchor-link/anchor-link';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import useSiteMetadata from '../../hooks/useSiteMetadata';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { menu } = useSiteMetadata();

  return (
    <MDXProvider
      components={{
        a: AnchorLink,
      }}
    >
      <div className="max-w-3xl m-auto px-4">
        <header className="flex items-center justify-between my-4">
          <Link to="/">
            <Logo width={50} height={50} />
          </Link>
          <nav className="h-full">
            <ul className="flex list-none pl-0 gap-4 h-full">
              {menu.map(({ title, link }) => (
                <li key={title} className="h-full">
                  <Link to={link} className="text-black">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="my-8">{children}</main>
      </div>
    </MDXProvider>
  );
};

export default Layout;
