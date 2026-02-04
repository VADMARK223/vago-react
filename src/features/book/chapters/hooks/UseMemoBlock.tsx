import {CodeBlock} from '../../CodeBlock.tsx'

export function UseMemoBlock() {
    return (
        <div>
            <h2 id={'useMemo'}>useMemo</h2>
            <p>Хук <b>запоминает (мемоизирует) результат вычисления и пересчитывает его только тогда, когда меняются
                зависимости, чтобы React не пересчитывал дорогие значения на каждом
                рендере.</b>
            </p>
            <blockquote>
                ❌ не пересчитывай тяжёлую логику на каждый ререндер<br/>
                ✅ пересчитывай её только когда реально нужно
            </blockquote>
            <hr/>
            <h3>Синтаксис</h3>
            <CodeBlock code={`const value = useMemo(() => {
  return expensiveCalculation(a, b)
}, [a, b])
`}/>
            <ul>
                <li>функция внутри <code>useMemo</code> возвращает значение</li>
                <li><code>[a, b]</code> — зависимости</li>
                <li>если <code>a</code> и <code>b</code> не изменились → React вернёт старый результат</li>
            </ul>
            <hr/>
            <h3>Назначение</h3>
            <h4>1. Тяжелые вычисление</h4>
            <CodeBlock code={`const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.age - b.age)
}, [users])
`}/>
            <p>Без <code>useMemo</code> сортировка будет выполняться на каждый ререндер, даже если <code>users</code> те
                же самые.</p>
            <hr/>

            <h4>2. Стабильные ссылки (часто с <code>memo</code>)</h4>
            <CodeBlock code={`const filteredTodos = useMemo(() => {
  return todos.filter(t => t.done)
}, [todos])
`}/>
            <p>Это важно, если:</p>
            <ul>
                <li>ты передаёшь значение в <code>React.memo</code></li>
                <li>или в зависимости другого хука (<code>useEffect</code>, <code>useCallback</code>)</li>
            </ul>
            <h4>3. Избежать лишних ререндеров дочерних компонентов</h4>
            <CodeBlock code={`const config = useMemo(() => ({
  theme: 'dark',
  pageSize: 20,
}), [])
`}/>
            <p>Без <code>useMemo</code> объект создаётся заново → дочерний компонент думает, что пропсы изменились.</p>
            <hr/>

            <h3>Важные нюансы</h3>
            <p><code>useMemo</code> — <b>не кеш навсегда</b></p>
            <ul>
                <li>React <b>может забыть значение</b></li>
                <li>нельзя полагаться на него как на persistent cache</li>
            </ul>
            <h4><code>seMemo</code> ≠ <code>useCallback</code></h4>
            <CodeBlock code={`useMemo(() => value, deps)      // запоминает значение
useCallback(() => fn, deps)     // запоминает функцию
`}/>
            <p>На самом деле:</p>
            <CodeBlock code={`useCallback(fn, deps)
// это то же самое, что
useMemo(() => fn, deps)
`}/>
            <hr/>
            <h3>Типичная ошибка</h3>
            <CodeBlock code={`useMemo(() => {
  doSomething()
}, [a])
`}/>
            <p>⚠️ <code>useMemo</code> <b>должен возвращать значение</b>, Если тебе нужен сайд-эффект → это <code>useEffect</code></p>

            <hr/>
            <h3>Короткое правило</h3>
        </div>


    )
}
