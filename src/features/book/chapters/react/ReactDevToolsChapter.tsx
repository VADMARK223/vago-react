import { Typography } from 'antd';
import { CodeBlock } from '../../../../shared/ui/codeBlock/CodeBlock.tsx';

const { Title, Paragraph, Text } = Typography;

export default function ReactDevToolsChapter() {
  return (
    <Typography>
      <Paragraph>
        <Text strong>React Developer Tools</Text> — это расширение для браузера (Chrome, Firefox и
        др.), которое позволяет инспектировать иерархию компонентов React в виртуальном DOM.
      </Paragraph>

      <Title level={3}>Основные вкладки</Title>

      <Title level={4}>1. Components</Title>
      <Paragraph>
        Показывает дерево компонентов, которые отрендерились на странице. Здесь можно:
        <ul>
          <li>
            Просматривать и редактировать <Text code>props</Text> и <Text code>state</Text>{' '}
            компонентов в реальном времени.
          </li>
          <li>Видеть, какие хуки используются в компоненте.</li>
          <li>Найти соответствующий DOM-элемент для компонента.</li>
        </ul>
      </Paragraph>

      <Title level={4}>2. Profiler</Title>
      <Paragraph>
        Позволяет записывать производительность приложения. Он показывает:
        <ul>
          <li>Сколько времени занял рендер каждого компонента.</li>
          <li>Почему компонент перерендерился (например, изменились props или state).</li>
          <li>Общее количество коммитов во время записи.</li>
        </ul>
      </Paragraph>

      <Title level={3}>Интересные фишки</Title>
      <Paragraph>
        В настройках расширения можно включить опцию{' '}
        <Text italic>"Highlight updates when components render"</Text>. Это подсветит границы
        компонентов на странице, когда они перерендериваются.
      </Paragraph>

      <Title level={3}>Как открыть из кода</Title>
      <Paragraph>
        Если вы хотите программно взаимодействовать с DevTools, вы можете использовать глобальную
        переменную <Text code>__REACT_DEVTOOLS_GLOBAL_HOOK__</Text>, но обычно это нужно только для
        инструментов разработки.
      </Paragraph>

      <Paragraph>
        Для функциональных компонентов часто полезно задавать <Text code>displayName</Text>, чтобы
        их было проще искать в дереве:
      </Paragraph>
      <CodeBlock
        code={`const MyComponent = memo(() => {\n  return <div>Hello</div>;\n});\n\nMyComponent.displayName = 'CustomNameInDevTools';`}
      />
    </Typography>
  );
}
