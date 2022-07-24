import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeProvider';

const useComment = (): {
  commentRef: React.RefObject<HTMLDivElement>;
  updateThemeColor: () => void;
} => {
  const commentRef = useRef<HTMLDivElement>(null);
  const { theme, darkMode } = useTheme();
  const [isLoaded, setLoaded] = useState(false);

  const updateThemeColor = useCallback(() => {
    if (!commentRef.current) return;

    const message = {
      type: 'set-theme',
      theme: `github-${theme}`,
    };

    const utterances = commentRef.current.getElementsByTagName('iframe')[0];

    if (!utterances?.contentWindow) return;

    utterances.contentWindow.postMessage(message, 'https://utteranc.es');
  }, [theme]);

  const handleMessage = useCallback((event) => {
    if (!commentRef.current) return;
    if (event.origin !== 'https://utteranc.es') return;

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    updateThemeColor();
  }, [isLoaded, updateThemeColor]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (!commentRef.current) return;

    const utterances = document.createElement('script');
    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: 'Puterism/blog-with-gatsby',
      'issue-term': 'pathname',
      label: 'Comment',
      theme: 'github-dark',
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    commentRef.current.appendChild(utterances);
  }, []);

  return { commentRef, updateThemeColor };
};

export default useComment;
