import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import AnchorLink from '../anchor-link/anchor-link';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import useDarkMode from '../../hooks/useDarkMode';
import Logo from '../logo/logo';
import Toggle from '../toggle/toggle';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { menu } = useSiteMetadata();
  const { darkMode, onChange } = useDarkMode();

  return (
    <MDXProvider
      components={{
        a: AnchorLink,
      }}
    >
      <div className="max-w-3xl m-auto px-4">
        <header className="flex items-center justify-between my-4">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="h-full">
            <ul className="flex items-center list-none pl-0 gap-4 h-full">
              {menu.map(({ title, link }) => (
                <li key={title} className="h-full">
                  <Link to={link} className="text-black">
                    {title}
                  </Link>
                </li>
              ))}
              <li className="h-full">
                <Toggle checked={darkMode} onChange={onChange} />
              </li>
            </ul>
          </nav>
        </header>
        <main className="my-8">{children}</main>
      </div>
    </MDXProvider>
  );
};

export default Layout;
