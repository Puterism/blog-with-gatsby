import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import useSiteMetadata from '../../hooks/useSiteMetadata';

const Author = () => {
  const { author } = useSiteMetadata();
  const { name, introduction } = author;

  return (
    <div className="flex items-center gap-4">
      <StaticImage
        src="../../../static/profile.jpeg"
        alt={name}
        width={100}
        aspectRatio={1}
        loading="lazy"
        className="rounded-full"
      />
      <div className="flex-1 leading-6">
        <p className="text-2xl font-bold mb-1">{name}</p>
        <p>{introduction}</p>
      </div>
    </div>
  );
};

export default Author;
