import { CodeBlock } from '../../../CodeBlock.tsx';

export function UseEffectBlock() {
  return (
    <>
      <h2 id="useEffect">useEffect</h2>
      <p>Это хук для побочных эффектов (side effects).</p>
      <CodeBlock
        code={`useEffect(() => {}, [])        // 1 раз (mount)
useEffect(() => {})            // каждый ререндер
useEffect(() => {}, [a, b])    // при изменении a или b`}
      />
      <p>Частая ошибка</p>
      <CodeBlock
        code={`useEffect(() => {
  fetchData()
}, [])
`}
      />
      <p>
        ❌ А внутри <code>fetchData</code> используется <code>props</code> или <code>state</code>
      </p>
      <p>
        👉 <b>stale closure</b> — эффект видит старые значения
      </p>
      <hr />
      <h3>Cleanup — must know</h3>
      <CodeBlock
        code={`useEffect(() => {
  const id = setInterval(...)
  return () => clearInterval(id)
}, [])`}
      />
      <p>Без cleanup:</p>
      <ul>
        <li>утечки памяти</li>
        <li>дублирующиеся подписки</li>
        <li>баги «само по себе»</li>
      </ul>
    </>
  );
}
