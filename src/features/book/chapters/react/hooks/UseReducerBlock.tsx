import { CodeBlock } from '@/shared/ui/codeBlock';

export function UseReducerBlock() {
  return (
    <>
      <h2 id="useReducer">useReducer</h2>
      <p>
        Хук для управления <b>более сложным состоянием</b>, когда <code>useState</code> уже начинает
        путаться и перегружен.
      </p>
      <p>
        useReducer — это альтернатива <code>useState</code>, основанная на идее редьюсера (как в
        Redux):
      </p>
      <blockquote>есть state → action → reducer → новый state</blockquote>
      <p>Он особенно полезен, когда:</p>
      <ul>
        <li>
          состояние <b>объект или вложенная структура</b>
        </li>
        <li>много действий, которые его меняют</li>
        <li>логика обновления состояния не должна быть размазана по компоненту</li>
        <li>хочется предсказуемости и читаемости</li>
      </ul>
      <hr />
      <CodeBlock code="const [state, dispatch] = useReducer(reducer, initialState)" />
      <ul>
        <li>
          <code>state</code> — текущее состояние
        </li>
        <li>
          <code>dispatch(action)</code> — отправка действия
        </li>
        <li>
          <code>reducer(state, action)</code> — чистая функция, которая возвращает новый state
        </li>
      </ul>
      <hr />
      <h3>Простой пример</h3>
      <CodeBlock
        code={`interface User {
    name: string
    surname: string
}

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_SURNAME'; payload: string }

const initialState: User = {
    name: 'Vadim',
    surname: 'Markitanov'
}

const reducer = (state: User, action: Action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload}
        case 'SET_SURNAME':
            return {...state, surname: action.payload}
        default:
            return state
    }
}

export function Page() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <Button onClick={() => {
                dispatch({type: 'SET_NAME', payload: 'Oleg'})
            }}>Change name "{state.name}"</Button>
        </>
    )
}`}
      />
    </>
  );
}
