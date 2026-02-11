import { CodeBlock } from '../../../../shared/ui/codeBlock/CodeBlock.tsx';

export default function SpecialTypesChapter() {
  return (
    <>
      <p>
        В TypeScript существуют специальные типы, которые используются в специфических ситуациях:{' '}
        <a href="#any">
          <code>any</code>
        </a>
        ,{' '}
        <a href="#unknown">
          <code>unknown</code>
        </a>
        ,{' '}
        <a href="#void">
          <code>void</code>
        </a>{' '}
        и{' '}
        <a href="#never">
          <code>never</code>
        </a>
        .
      </p>

      <h2 id="any">
        <code>any</code>
      </h2>
      <p>
        Тип <code>any</code> позволяет переменной принимать абсолютно любое значение. Это фактически
        отключает проверку типов для данной переменной.
      </p>
      <CodeBlock
        code={`let value: any = 4;\nvalue = "hello";\nvalue = true;\n\nvalue.foo(); // Ошибки не будет при компиляции, но может упасть в рантайме`}
      />
      <p>
        <i>Использование any не рекомендуется, так как это лишает вас преимуществ TypeScript.</i>
      </p>
      <hr />

      <h2 id="unknown">
        <code>unknown</code>
      </h2>
      <p>
        Тип <code>unknown</code> — это безопасный аналог <code>any</code>. Мы можем присвоить ему
        любое значение, но не можем вызывать методы или обращаться к свойствам, пока не уточним тип
        (type narrowing).
      </p>
      <CodeBlock
        code={`let value: unknown = "hello";\n\n// value.toUpperCase(); // Ошибка!\n\nif (typeof value === "string") {\n  console.log(value.toUpperCase()); // Теперь можно!\n}`}
      />
      <hr />

      <h2 id="void">
        <code>void</code>
      </h2>
      <p>
        Используется в основном как тип возвращаемого значения функций, которые ничего не возвращают
        (или возвращают <code>undefined</code>).
      </p>
      <CodeBlock
        code={`function logMessage(message: string): void {\n  console.log(message);\n}`}
      />
      <hr />

      <h2 id="never">
        <code>never</code>
      </h2>
      <p>
        Тип <code>never</code> представляет значения, которые никогда не возникнут. Обычно
        используется для функций, которые всегда выбрасывают ошибку или имеют бесконечный цикл.
      </p>
      <CodeBlock
        code={`function throwError(message: string): never {\n  throw new Error(message);\n}\n\nfunction infiniteLoop(): never {\n  while (true) {}\n}`}
      />
      <p>
        Также <code>never</code> полезен для проверки исчерпываемости (exhaustiveness checking) в{' '}
        <code>switch</code>.
      </p>
      <CodeBlock
        code={`type Shape = 'circle' | 'square';\n\nfunction getArea(shape: Shape) {\n  switch (shape) {\n    case 'circle': return 1;\n    case 'square': return 2;\n    default:\n      const _exhaustiveCheck: never = shape;\n      return _exhaustiveCheck;\n  }\n}`}
      />
      <hr />
    </>
  );
}
