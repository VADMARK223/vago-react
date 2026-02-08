import {CodeBlock} from '../../CodeBlock.tsx'

export default function EventLoopChapter() {
    return (
        <>
            <p>Это механизм, который решает:</p>
            <ol>
                <li>какой код выполнить сейчас</li>
                <li>какой — позже</li>
                <li>в каком порядке выполнять “позже”</li>
            </ol>
            <p>JS в браузере и Node.js в основном <b>однопоточный</b> для твоего кода: в один момент времени выполняется
                только
                одна штука. Асинхронность достигается очередями и циклом обработки.</p>
            <hr/>
            <h2>3 главные части</h2>
            <h3>1) Call Stack (стек вызовов)</h3>
            <p>Туда попадают обычные функции. Пока стек не пуст — JS занят.</p>
            <h3>2) Web APIs / Background (в браузере) / libuv (в Node)</h3>
            <p>Это “помощники”, которые умеют ждать:</p>
            <ul>
                <li>таймеры (<code>setTimeout</code>)</li>
                <li>запросы (<code>fetch</code>)</li>
                <li>события (<code>click</code>)</li>
                <li>чтение файлов (Node)</li>
            </ul>
            <p>Они не выполняют твой JS-код, они просто ждут и потом кладут callback в очередь.</p>

            <h3>3) Очереди задач</h3>
            <h4>✅ Microtask queue (микрозадачи)</h4>
            <p>Туда попадают:</p>
            <ul>
                <li><code>Promise.then/catch/finally</code></li>
                <li><code>queueMicrotask</code></li>
                <li>(ещё: <code>MutationObserver</code> в браузере)</li>
            </ul>
            <p><code>Особенность</code>: микрозадачи выполняются <b>сразу после синхронного кода</b>, и <b>все
                подряд</b>, пока очередь не станет пустой.</p>

            <h4>✅ Macrotask queue (макрозадачи)</h4>
            <p>Туда попадают:</p>
            <ul>
                <li><code>setTimeout</code> / <code>setInterval</code></li>
                <li>обработчики событий (<code>click</code>, <code>message</code>)</li>
                <li>некоторые I/O задачи</li>
            </ul>
            <p><b>Особенность</b>: макрозадачи выполняются <code>по одной за “тик”</code> цикла.</p>

            <hr/>
            <h2>Главный порядок</h2>
            <p>Каждый “тик” event loop выглядит примерно так:</p>
            <ol>
                <li>Выполни <b>весь синхронный код</b> (пока стек не пуст)</li>
                <li>Выполни <b>ВСЕ microtasks</b> (пока очередь не пустая)</li>
                <li>Выполни <b>ОДНУ macrotask</b></li>
                <li>(браузер может сделать рендер)</li>
                <li>повторить</li>
            </ol>
            <p></p>
            <p><b>Sync → Microtasks → Macrotask → (Render) → Sync → ...</b></p>

            <hr/>
            <h2 id={'example'}>Пример</h2>
            <CodeBlock code={`console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');`}/>
            <ol>
                <li>sync: A, D</li>
                <li>microtasks: C</li>
                <li>macrotask: B</li>
            </ol>
            <p>Итог: <b>A D C B</b></p>
        </>


    )
}
