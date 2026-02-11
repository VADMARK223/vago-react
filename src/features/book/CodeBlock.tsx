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

  return (
    <pre>
      <code ref={ref} className="language-javascript">
        {code}
      </code>
    </pre>
  );
};
