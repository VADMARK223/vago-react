import { UseMemoBlock } from './UseMemoBlock';
import { UseEffectBlock } from './UseEffectBlock';
import { UseStateBlock } from './UseStateBlock';
import { UseReducerBlock } from './UseReducerBlock';
import styles from '@/features/book/Book.module.css';
import { BookHashLink } from '@/features/book/chapters/BookHashLink';

export default function HooksChapter() {
  return (
    <>
      <nav className={styles.toc}>
        <BookHashLink id="useState">Хук useState</BookHashLink>
        <BookHashLink id="useEffect">Хук useEffect</BookHashLink>
        <BookHashLink id="useMemo">Хук useMemo</BookHashLink>
        <BookHashLink id="useReducer">Хук useReducer</BookHashLink>
        <BookHashLink id="useImperativeHandle">Хук useImperativeHandle</BookHashLink>
      </nav>
      <hr />
      <UseStateBlock />
      <hr />
      <UseEffectBlock />
      <hr />
      <h2>useContext</h2>
      <p>доступ к контексту</p>
      <hr />
      <h2>useRef</h2>
      <p>
        Позволяет <b>хранить mutable значение между рендерами, не вызывая повторный рендер</b>.
      </p>
      <hr />
      <UseMemoBlock />
      <h2>useCallback</h2>
      <p>
        Это про <b>мемоизацию функций</b>, чтобы React не создавал их заново на каждом рендере.
        Часто идёт в паре с <code>useMemo</code> и <code>React.memo</code>.
      </p>
      <hr />
      <UseReducerBlock />
      <hr />
      <h2>useLayoutEffect</h2>
      <p>sync-эффекты</p>
      <h2>useTransition</h2>
      <p>приоритеты UI</p>
      <h2>useDeferredValue</h2>
      <p>отложенные обновления</p>
      <h2>useId</h2>
      <p>Генерирует стабильные уникальные id.</p>
      <h2 id="useImperativeHandle">useImperativeHandle</h2>
      <p>Позволяет явно управлять API ref’ а, передаваемого родителю.</p>
    </>
  );
}
