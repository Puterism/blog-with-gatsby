import React from 'react';
import useComment from '../../hooks/useComment';

const Comment = () => {
  const { commentRef } = useComment();

  return <div id="comment" ref={commentRef}></div>;
};

export default Comment;
