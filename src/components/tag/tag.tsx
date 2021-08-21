import * as React from 'react';
import { Link } from 'gatsby';
import kebabcase from 'lodash.kebabcase';
import './tag.css';

interface Props {
  name: string;
  count?: number;
}

const Tag = ({ name, count }: Props) => (
  <div className="tag">
    <Link to={`/tags/${kebabcase(name)}`}>{name}</Link>
    {count && <span className="count">{count}</span>}
  </div>
);

export default Tag;
