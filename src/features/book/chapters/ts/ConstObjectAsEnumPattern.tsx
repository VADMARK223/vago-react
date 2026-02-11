import { CodeBlock } from '../../../../shared/ui/codeBlock/CodeBlock.tsx';

export default function ConstObjectAsEnumPattern() {
  return (
    <>
      <a href="#1">Почему не enum?</a>
      <br />
      <CodeBlock
        code={`export const ROLE = {
    user: 'user',
    moderator: 'moderator',
    admin: 'admin',
} as const

export type Role = typeof ROLE[keyof typeof ROLE];`}
      />
      <hr />
      <h2>
        1. Что делает <code>as const</code>
      </h2>
      <p>
        <code>as const</code> делает:
      </p>
      <ul>
        <li>
          Все поля <code>readonly</code>
        </li>
        <li>
          Все значения становятся <b>литеральными типами</b>
        </li>
      </ul>
      <CodeBlock
        code={`{
  readonly user: "user"
  readonly moderator: "moderator"
  readonly admin: "admin"
}
`}
      />
      <p>
        ⚠️ Это важно:
        <br />
        значение <code>"user"</code> теперь не просто <code>string</code>, а конкретный тип{' '}
        <code>"user"</code>.
      </p>
      <hr />
      <h2>2. Создание типа</h2>
      <CodeBlock
        code={`export type Role = typeof ROLE[keyof typeof ROLE];
`}
      />
      <h3>
        Шаг1 - <code>typeof ROLE</code>
      </h3>
      <p>Это тип объекта:</p>
      <CodeBlock
        code={`{
  readonly user: "user"
  readonly moderator: "moderator"
  readonly admin: "admin"
}`}
      />
      <hr />

      <h3>
        Шаг 2 — <code>keyof typeof ROLE</code>
      </h3>
      <p>keyof берёт ключи объекта:</p>
      <CodeBlock code={`"user" | "moderator" | "admin"`} />
      <hr />

      <h3>
        Шаг 3 — <code>typeof ROLE[keyof typeof ROLE]</code>
      </h3>
      <p>
        Это называется <b>indexed access type</b>.
      </p>
      <blockquote>Возьми тип ROLE и получи типы всех значений по всем ключам.</blockquote>
      <CodeBlock code={`"user" | "moderator" | "admin"`} />
      <hr />

      <h3>
        🔥 В итоге тип <code>Role</code> равен:
      </h3>
      <CodeBlock code={`type Role = "user" | "moderator" | "admin"`} />
      <p>И при этом:</p>
      <ul>
        <li>не нужно вручную писать union</li>
        <li>всё синхронизировано с объектом ROLE</li>
      </ul>
      <hr />

      <h2 id="1">🔥 Почему не enum?</h2>
      <p>Можно было бы так:</p>
      <CodeBlock
        code={`enum Role {
  User = "user",
  Moderator = "moderator",
  Admin = "admin"
}`}
      />
      <ul>
        <li>не генерирует лишний JS код</li>
        <li>проще</li>
        <li>гибче</li>
        <li>лучше работает с tree-shaking</li>
        <li>удобнее в React / фронте</li>
      </ul>
      <hr />
    </>
  );
}
