import { CodeBlock } from '../../../../shared/ui/codeBlock/CodeBlock.tsx';

export default function ReduceChapter() {
  return (
    <>
      <p>
        <code>reduce</code> - это метод массива, который превращает его в{' '}
        <b>одно итоговое значение</b>
      </p>
      <p>Это может быть:</p>
      <ul>
        <li>число</li>
        <li>строка</li>
        <li>объект</li>
        <li>другой массив</li>
        <li>вообще что угодно</li>
      </ul>
      <hr />
      <h2>Синтаксис</h2>
      <CodeBlock
        code={`array.reduce((accumulator, currentValue) => {
    return newAccumulator
}, initialValue)`}
      />
      <p>Где:</p>
      <ul>
        <li>
          <code>accumulator</code> — накопленное значение
        </li>
        <li>
          <code>currentValue</code> — текущий элемент массива
        </li>
        <li>
          <code>initialValue</code> — стартовое значение
        </li>
      </ul>
      <hr />
      <h2>Пример (простой)</h2>
      <p>Сумма чисел</p>
      <CodeBlock
        code={`const numbers = [1, 2, 3, 4]

const sum = numbers.reduce((acc, num) => {
    return acc + num
}, 0)

console.log(sum) // 10`}
      />
      <hr />
      <h2>Пример (сложный)</h2>
      <p>Группировка по ключам</p>
      <CodeBlock
        code={`type ChapterType = 'react' | 'ts' | 'js'

const grouped = chapters.reduce<Record<ChapterType, Chapter[]>>(
    (acc, chapter) => {
        acc[chapter.type].push(chapter)
        return acc
    },
    { react: [], ts: [], js: [] }
)`}
      />
      <hr />
      <h2>initialValue очень важен</h2>
      <p>Если не передать его:</p>
      <CodeBlock
        code={`numbers.reduce((acc, num) => acc + num)
`}
      />
      <p>Тогда:</p>
      <ul>
        <li>первый элемент станет acc</li>
        <li>reduce начнётся со второго</li>
      </ul>
      <p>Это может привести к багам.</p>
    </>
  );
}
