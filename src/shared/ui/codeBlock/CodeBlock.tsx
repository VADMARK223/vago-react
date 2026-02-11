import styles from './CodeBlock.module.css';
import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('javascript', javascript);

interface Props {
  code: string;
}

export const CodeBlock = ({ code }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      hljs.highlightElement(ref.current);
    }
  }, []);

  if (!code.trim()) return null;

  return (
    <div className={styles.wrapper}>
      <pre className={styles.pre}>
        <code ref={ref} className={`language-javascript ${styles.code}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};
