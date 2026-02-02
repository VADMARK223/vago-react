import {CodeBlock} from '../CodeBlock.tsx'

export function UtilityTypesChapter() {
    return (
        <>
            <p>Это <b>встроенные типы-утилиты</b>, которые помогают преобразовывать типы.</p>
            <CodeBlock code={`type User = {\n\tid: number\n\tname: string\n\tage: number\n}`}/>
            <h2><code>{`Partial<T>`}</code></h2>
            <p>Все поля становятся необязательными</p>
            <CodeBlock code={`type UserUpdate = Partial<User>`}/>
            <hr/>

            <h2><code>{`Required<T>`}</code></h2>
            <p>Все поля обязательны</p>
            <CodeBlock code={`type UserRequired = Required<User>`}/>
            <hr/>

            <h2><code>{`Pick<T, K>`}</code></h2>
            <p>Берёт только нужные поля</p>
            <CodeBlock code={`type UserPreview = Pick<User, 'id' | 'name'>`}/>
            <hr/>

            <h2><code>{`Omit<T, K>`}</code></h2>
            <p>Исключает поля</p>
            <CodeBlock code={`type UserWithoutAge = Omit<User, 'age'>`}/>
            <hr/>

            <h2><code>{`Record<T, K>`}</code></h2>
            <p>Объект с ключами и типом значений</p>
            <CodeBlock code={`type Roles = 'admin' | 'user'\n\ntype RoleMap = Record<Roles, boolean>\n// { admin: boolean; user: boolean }`}/>
            <hr/>

            <h2><code>{`Exclude<T, U>`}</code></h2>
            <p>Убирает типы из union</p>
            <CodeBlock code={`type Status = 'success' | 'error' | 'loading'\ntype WithoutLoading = Exclude<Status, 'loading'>`}/>
            <hr/>

            <h2><code>{`Extract<T, U>`}</code></h2>
            <p>Оставляет только совпадающие</p>
            <CodeBlock code={`type OnlyError = Extract<Status, 'error' | 'pending'>`}/>
            <hr/>

            <h2><code>{`NonNullable<T>`}</code></h2>
            <p>Убирает <code>null | undefined</code></p>
            <CodeBlock code={`type Clean = NonNullable<string | null | undefined>`}/>
            <hr/>

        </>
    )
}
