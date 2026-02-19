import { UseMemoBlock } from './UseMemoBlock';
import { UseEffectBlock } from './UseEffectBlock';
import { UseStateBlock } from './UseStateBlock';
import { UseReducerBlock } from './UseReducerBlock';
import styles from '@/features/book/Book.module.css';
import { BookHashLink } from '@/features/book/chapters/BookHashLink';
import { UseLayoutEffectBlock } from '@/features/book/chapters/react/hooks/UseLayoutEffectBlock';
import { UseTransitionBlock } from '@/features/book/chapters/react/hooks/UseTransitionBlock';
import { UseDeferredBlock } from '@/features/book/chapters/react/hooks/UseDeferredBlock';
import { CodeBlock } from '@/shared/ui/codeBlock';

export default function HooksChapter() {
  return (
    <>
      <nav className={styles.toc}>
        <BookHashLink id="useState">1. Хук useState</BookHashLink>
        <BookHashLink id="useEffect">2. Хук useEffect</BookHashLink>
        <BookHashLink id="useLayoutEffect">3. Хук useLayoutEffect</BookHashLink>
        <BookHashLink id="useContext">4. Хук useContext</BookHashLink>
        <BookHashLink id="useRef">5. Хук useRef</BookHashLink>
        <BookHashLink id="useMemo">6. Хук useMemo</BookHashLink>
        <BookHashLink id="useCallback"> 7. Хук useCallback</BookHashLink>
        <BookHashLink id="useReducer">8. Хук useReducer</BookHashLink>
        <BookHashLink id="useTansition">9. Хук useTransition</BookHashLink>
        <BookHashLink id="useDeferred">10. Хук useDeferred</BookHashLink>
        <BookHashLink id="useId">11. Хук useId</BookHashLink>
        <BookHashLink id="useImperativeHandle">12. Хук useImperativeHandle</BookHashLink>
      </nav>
      <hr />
      <UseStateBlock />
      <hr />
      <CodeBlock
        code="
📌 Один кадр браузера

JS task start
   ↓
React render (строим виртуальный DOM)
   ↓
React commit (обновляем реальный DOM + ref)
   ↓
useLayoutEffect  ← можно менять DOM ДО показа
   ↓
Browser layout (браузер считает размеры)
   ↓
Browser paint (показывает картинку пользователю)
   ↓
--------------------------- КАДР ПОКАЗАН ---------------------------
   ↓
useEffect        ← выполняется уже ПОСЛЕ того как пользователь увидел кадр

"
      />
      <UseEffectBlock />
      <hr />
      <UseLayoutEffectBlock />
      <hr />
      <h2 id="useContext">4. Хук useContext</h2>
      <p>доступ к контексту</p>
      <hr />

      <h2 id="useRef">5. Хук useRef</h2>
      <p>
        Позволяет <b>хранить mutable значение между рендерами, не вызывая повторный рендер</b>.
      </p>
      <hr />
      <UseMemoBlock />
      <h2 id="useCallback">7. Хук useCallback</h2>
      <p>
        Это про <b>мемоизацию функций</b>, чтобы React не создавал их заново на каждом рендере.
        Часто идёт в паре с <code>useMemo</code> и <code>React.memo</code>.
      </p>
      <hr />
      <UseReducerBlock />
      <hr />
      <UseTransitionBlock />
      <hr />
      <UseDeferredBlock />
      <hr />
      <h2 id="useId">11. Хук useId</h2>
      <p>Генерирует стабильные уникальные id.</p>

      <hr />
      <h2 id="useImperativeHandle">12. Хук useImperativeHandle</h2>
      <p>Позволяет явно управлять API ref’ а, передаваемого родителю.</p>
    </>
  );
}
