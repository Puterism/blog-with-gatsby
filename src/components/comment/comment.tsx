import * as React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Comment = () => {
  useEffect(() => {
    const $document = document;

    const $script = $document.createElement('script');
    $script.src = 'https://dorvcm7xtbd6v.cloudfront.net/embed.js';
    $script.defer = true;

    $document.head.appendChild($script);

    return () => {
      $script.remove();
    };
  }, []);

  return (
    <div id="darass" data-project-key="OW98x3jymJuQZWI22">
      <noscript>다라쓰 댓글 작성을 위해 JavaScript를 활성화 해주세요</noscript>
    </div>
  );
};

export default Comment;
