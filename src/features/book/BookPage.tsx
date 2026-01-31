export function BookPage() {

return (
        <div>
            <h1>Hooks</h1>

            <a href="#useImperativeHandle">useImperativeHandle</a>

            <h2>useState</h2>
            <p>Хук для хранения и обновления <b>локального состояния компонента.</b></p>

            <h2>useEffect</h2>
            <p>Это хук для побочных эффектов (side effects).</p>

            <h2>useContext</h2>
            <p>доступ к контексту</p>

            <h2>useRef</h2>
            <p>Позволяет <b>хранить мутируемое значение между рендерами, не вызывая повторный рендер</b>.</p>

            <h2>useMemo</h2>
            <p>Хук для <b>мемоизации вычислений, чтобы React не пересчитывал дорогие значения на каждом рендере.</b></p>

            <h2>useCallback</h2>
            <p>Это про <b>мемоизацию функций</b>, чтобы React не создавал их заново на каждом рендере. Часто идёт в паре с <code>useMemo</code> и <code>React.memo</code>.</p>

            <h2>useReducer</h2>
            <p>сложное состояние</p>

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
        </div>
    )
}