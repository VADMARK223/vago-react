import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('ts', ts)

type CodeLang = 'tsx' | 'ts'

type CodeBlockProps = {
    code: string
    lang?: CodeLang
    showLineNumbers?: boolean
}

export function CodeBlock({code, lang = 'tsx', showLineNumbers = false}: CodeBlockProps) {
    return (
        <SyntaxHighlighter
            language={lang}
            style={oneDark}
            showLineNumbers={showLineNumbers}
            wrapLongLines
            customStyle={{
                padding: 4,
            }}
        >
            {code}
        </SyntaxHighlighter>
    )
}
