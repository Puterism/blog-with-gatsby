import * as React from 'react';
import { Link } from 'gatsby';

const NotFoundTemplate = () => {
  return (
    <main>
      <title>Not found</title>
      <Link to="/">Go home</Link>
    </main>
  );
};

export default NotFoundTemplate;
