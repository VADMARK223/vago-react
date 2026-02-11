import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../shared/constants/routes.ts';

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        О проекте
      </Typography.Title>
      <Typography.Paragraph>
        Это портал для изучения React/TypeScript/Go, который объединяет в себе несколько
        инструментов: живой чат для общения, электронную книгу по React и удобный TODO-трекер. Всё
        создано для того, чтобы обучение было комфортным, структурированным и живым.
      </Typography.Paragraph>
      <div className="stack">
        <Card title="🧠 Тест по языку Go">
          <p>Собранные в одном месте вопросы на разные темы по Go.</p>
          <Button
            type="primary"
            onClick={() => {
              navigate(ROUTE.TEST);
            }}
          >
            Попробовать силы
          </Button>
        </Card>

        <Card title="📘 Книга по React/TypeScript/JavaScript">
          <p>Собранный в одном месте материал, практические главы, примеры и справочные разделы.</p>
          <Button
            type="primary"
            onClick={() => {
              navigate(ROUTE.BOOK);
            }}
          >
            Читать книгу
          </Button>
        </Card>

        <Card title="📝 TODO-трекер">
          <p>Личный список задач: сохраняй цели, разбивай обучение на шаги, отмечай прогресс.</p>
          <Button
            type="primary"
            onClick={() => {
              navigate(ROUTE.TASKS);
            }}
          >
            Открыть трекер
          </Button>
        </Card>
      </div>
    </div>
  );
}
