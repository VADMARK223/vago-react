import {UseMemoBlock} from './UseMemoBlock.tsx'
import {UseEffectBlock} from './UseEffectBlock.tsx'
import {UseStateBlock} from './UseStateBlock.tsx'
import {UseReducerBlock} from './UseReducerBlock.tsx'

export default function HooksChapter() {
    return (
        <>
            <a href="#useState">useState</a><br/>
            <a href="#useEffect">useEffect</a><br/>
            <a href="#useMemo">useMemo</a><br/>
            <a href="#useReducer">useReducer</a><br/>
            <a href="#useImperativeHandle">useImperativeHandle</a>
            <hr/>
            <UseStateBlock/>
            <hr/>
            <UseEffectBlock/>
            <hr/>

            <h2>useContext</h2>
            <p>доступ к контексту</p>
            <hr/>

            <h2>useRef</h2>
            <p>Позволяет <b>хранить мутируемое значение между рендерами, не вызывая повторный рендер</b>.</p>
            <hr/>

            <UseMemoBlock/>

            <h2>useCallback</h2>
            <p>Это про <b>мемоизацию функций</b>, чтобы React не создавал их заново на каждом рендере. Часто идёт в
                паре с <code>useMemo</code> и <code>React.memo</code>.</p>

            <hr/>
            <UseReducerBlock/>
            <hr/>

            <h2>useLayoutEffect</h2>
            <p>sync-эффекты</p>

            <h2>useTransition</h2>
            <p>приоритеты UI</p>

            <h2>useDeferredValue</h2>
            <p>отложенные обновления</p>

            <h2>useId</h2>
            <p>Генерирует стабильные уникальные id.</p>

            <h2 id="useImperativeHandle">useImperativeHandle</h2>
            <p>Позволяет явно управлять API ref’а, передаваемого родителю.</p>
        </>
    )
}
