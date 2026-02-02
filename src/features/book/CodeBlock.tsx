import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

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
