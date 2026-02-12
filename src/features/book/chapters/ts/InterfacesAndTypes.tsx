import { CodeBlock } from '@/shared/ui/codeBlock/CodeBlock.tsx';
import styles from '@/features/book/Book.module.css';
import { BookHashLink } from '@/features/book/chapters/BookHashLink.tsx';

export default function InterfacesAndTypes() {
  return (
    <>
      <nav className={styles.toc}>
        <BookHashLink id="rules">Правила</BookHashLink>
      </nav>
      <h2 id="rules">Правила</h2>
      <h3 id="rules">
        Правило №1 — Props = <code>interface</code>
      </h3>
      <p>
        Всегда описываем props компонентов через <code>interface</code>.
      </p>
      <CodeBlock
        code={`interface CodeBlockProps {
  code: string
  lang?: CodeLang
}

export function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {}`}
      />
      <hr />
      <h3 id="rules">Правило №2 — Все unions и enum-подобные штуки = type</h3>
      <CodeBlock
        code={`type CodeLang = 'tsx' | 'ts' | 'js' | 'go'
type Theme = 'light' | 'dark'
type Size = 'sm' | 'md' | 'lg'`}
      />
      <hr />
      <h3 id="rules">Правило №3 — DTO / API / утилитарные типы = type</h3>
      <CodeBlock
        code={`type UserDto = {
  id: string
  email: string
}

type UpdateUserDto = Partial<UserDto>
type UserPreview = Pick<UserDto, 'id' | 'email'>`}
      />
      <hr />
      <h3 id="rules">Правило №4 — Расширяемое → interface, закрытое → type</h3>
      <CodeBlock
        code={`interface BaseButtonProps {
  disabled?: boolean
}

interface IconButtonProps extends BaseButtonProps {
  icon: ReactNode
}`}
      />
      <hr />
      <h3 id="rules">Правило №5 — Не смешиваем без причины</h3>
      <p>❌ плохо:</p>
      <CodeBlock
        code={`type ButtonProps = { onClick: () => void }
interface ButtonExtra { size: 'sm' | 'md' }`}
      />
      <p>✅ хорошо:</p>
      <CodeBlock
        code={`interface ButtonProps {
  onClick: () => void
  size: ButtonSize
}

type ButtonSize = 'sm' | 'md'`}
      />
    </>
  );
}
