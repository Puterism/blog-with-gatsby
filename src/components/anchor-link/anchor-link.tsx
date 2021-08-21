import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';

interface Props {
  href: string;
}

const AnchorLink = ({ children, href }: PropsWithChildren<Props>) => {
  if (href.startsWith('/')) {
    return <Link to={href}>{children}</Link>;
  }

  const onPage = href.startsWith('#');

  return (
    <a href={href} target={onPage ? undefined : '_blank'} rel={onPage ? undefined : 'noopener noreferrer'}>
      {children}
    </a>
  );
};

export default AnchorLink;
