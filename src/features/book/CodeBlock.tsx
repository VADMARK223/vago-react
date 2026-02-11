import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as React from 'react';

SyntaxHighlighter.registerLanguage('tsx', tsx);
// SyntaxHighlighter.registerLanguage('ts', ts);

const CODE_STYLE = oneDark;
const CUSTOM_STYLE = { padding: 4 } as const;

type CodeLang = 'tsx' | 'ts';

type CodeBlockProps = {
  code: string;
  lang?: CodeLang;
  showLineNumbers?: boolean;
};

export const CodeBlock = React.memo(function CodeBlock({
  code,
  lang = 'tsx',
  showLineNumbers = false,
}: CodeBlockProps) {
  if (!code.trim()) return <div style={{ color: 'red' }}>EMPTY</div>;

  return (
    <SyntaxHighlighter
      language={lang}
      style={CODE_STYLE}
      showLineNumbers={showLineNumbers}
      wrapLongLines
      customStyle={CUSTOM_STYLE}
    >
      {code}
    </SyntaxHighlighter>
  );
});
