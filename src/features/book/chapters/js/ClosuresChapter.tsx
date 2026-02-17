import { CodeBlock } from '@/shared/ui/codeBlock';

export default function ClosuresChapter() {
  return (
    <>
      <p>
        <b>Замыкание (Closure)</b> — это комбинация функции и лексического окружения, в котором эта
        функция была определена.
      </p>
      <p>
        Простыми словами: замыкание позволяет функции запоминать и иметь доступ к переменным из
        своей внешней области видимости даже после того, как внешняя функция завершила своё
        выполнение.
      </p>

      <hr />

      <h2>Как это работает?</h2>
      <p>
        В JavaScript функции являются объектами «первого класса». Это означает, что их можно
        передавать как аргументы, возвращать из других функций и присваивать переменным.
      </p>
      <CodeBlock
        code={`function createCounter() {
  let count = 0; // Переменная во внешней области видимости

  return function() {
    count++; // Функция "запоминает" переменную count
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`}
      />
      <p>
        В этом примере <code>counter</code> — это замыкание. Оно состоит из внутренней функции и
        переменной <code>count</code> из области видимости <code>createCounter</code>.
      </p>
      <p>Когда ты делаешь:</p>
      <CodeBlock code="const counter = createCounter();" />
      <h3>Шаги</h3>
      <ol>
        <li>
          Вызывается <code>createCounter</code>
        </li>
        <li>
          Создаётся переменная <code>count = 0</code>
        </li>
        <li>
          Возвращается <b>внутренняя функция</b>
        </li>
        <li>
          ВАЖНО: эта функция <b>сохраняет ссылку на переменную</b> <code>count</code>
        </li>
      </ol>

      <hr />

      <h2>Зачем нужны замыкания?</h2>
      <ul>
        <li>
          <b>Инкапсуляция и приватные переменные:</b> скрыть данные от прямого доступа извне.
        </li>
        <li>
          <b>Создание фабричных функций:</b> генерация функций с предустановленным поведением.
        </li>
        <li>
          <b>Сохранение состояния:</b> например, в обработчиках событий или колбэках.
        </li>
      </ul>

      <hr />

      <h2>Практический пример: Фабрика функций</h2>
      <CodeBlock
        code={`function createMultiplier(multiplier) {
  return function(num) {
    return num * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15`}
      />

      <hr />

      <h2>Важно помнить</h2>
      <p>
        Замыкания потребляют память, так как переменные, на которые они ссылаются, не могут быть
        удалены сборщиком мусора, пока существует само замыкание.
      </p>
    </>
  );
}
