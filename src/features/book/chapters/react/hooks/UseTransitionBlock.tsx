import { CodeBlock } from '@/shared/ui/codeBlock';

export const UseTransitionBlock = () => {
  return (
    <>
      <h2 id="useTansition">9. Хук useTransition</h2>
      <p>
        Это хук из React 18, который позволяет пометить обновление состояния как{' '}
        <b>неприоритетное (transition)</b>. Ты контролируешь, какое обновление сделать
        низкоприоритетным
      </p>
      <blockquote>
        что-то должно обновиться, но не срочно — пусть React сделает это “когда сможет”, не блокируя
        интерфейс.
      </blockquote>
      <h3>Зачем он вообще нужен?</h3>
      <p>
        Без <code>useTransition</code>:
      </p>
      <ul>
        <li>Пользователь печатает</li>
        <li>
          Ты делаешь <code>setState</code>
        </li>
        <li>Компонент рендерит 10 000 элементов</li>
        <li>Input начинает лагать</li>
      </ul>
      <p>
        С <code>useTransition</code>:
      </p>
      <ul>
        <li>Ввод остаётся плавным</li>
        <li>Тяжёлый рендер выполняется “в фоне”</li>
      </ul>

      <h3>Сигнатура</h3>
      <CodeBlock code="const [isPending, startTransition] = useTransition();" />
      <ul>
        <li>
          <code>startTransition(fn)</code> - оборачиваешь обновление
        </li>
        <li>
          <code>isPending</code> — показывает, что transition ещё выполняется
        </li>
      </ul>
      <h4>Пример (поисковый фильтр)</h4>
      <CodeBlock
        code="const [query, setQuery] = useState('');
const [filtered, setFiltered] = useState(data);
const [isPending, startTransition] = useTransition();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setQuery(value); // срочное обновление

  startTransition(() => {
    setFiltered(
      data.filter(item => item.includes(value))
    );
  });
};"
      />
      <p>Теперь:</p>
      <ul>
        <li>
          <code>query</code> обновляется сразу (input не лагает)
        </li>
        <li>
          <code>filtered</code> считается “в фоне”
        </li>
      </ul>
      <p>Можно показывать лоадер, пока transition не завершен</p>
      <CodeBlock code="{isPending && <Spinner />}" />
    </>
  );
};
