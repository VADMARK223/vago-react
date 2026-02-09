import { CodeBlock } from '../../CodeBlock.tsx';

export default function FlatMapChapter() {
  return (
    <>
      <p>
        <code>flatMap</code> = <b>map</b> + <b>flatten</b> (сплющивание)
      </p>
      <ol>
        <li>
          Пробегается по массиву (как <code>map</code>)
        </li>
        <li>Возвращает массив</li>
        <li>Потом автоматически убирает один уровень вложенности</li>
      </ol>
      <hr />
      <h2>Примеры</h2>
      <h3>Без flatMap</h3>
      <CodeBlock
        code={`const arr = [1, 2, 3]

const result = arr.map(n => [n, n * 10])

console.log(result)
// [
//   [1, 10],
//   [2, 20],
//   [3, 30]
// ]`}
      />
      <p>Получился массив массивов 😬</p>
      <p>Чтобы сделать его плоским:</p>
      <CodeBlock code="const flat = result.flat()" />
      <h3>✅ С flatMap</h3>
      <CodeBlock
        code={`const result = arr.flatMap(n => [n, n * 10])

console.log(result)
// [1, 10, 2, 20, 3, 30]`}
      />
    </>
  );
}
