import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/shared/constants';
import { ScrollableContainer } from '@/shared/ui';
import { VStack } from '@/shared/ui/v-stack/VStack';

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="pageWithScroll">
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        О проекте
      </Typography.Title>
      <Typography.Paragraph>
        Это портал для изучения React/TypeScript/Go, который объединяет в себе несколько
        инструментов: живой чат для общения, электронную книгу по React и удобный TODO-трекер. Всё
        создано для того, чтобы обучение было комфортным, структурированным и живым.
      </Typography.Paragraph>

      <ScrollableContainer>
        <VStack>
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
            <p>
              Собранный в одном месте материал, практические главы, примеры и справочные разделы.
            </p>
            <Button
              type="primary"
              onClick={() => {
                navigate(ROUTE.BOOK);
              }}
            >
              Читать книгу
            </Button>
          </Card>

          <Card title="💬 Чат">
            <p>
              Живой чат для общения с другими учениками. Можно задавать вопросы, обсуждать задачи и
              просто общаться.
            </p>
            <Button
              type="primary"
              onClick={() => {
                navigate(ROUTE.CHAT);
              }}
            >
              Перейти в чат
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

          <Card title="🎹 Тренажёр по баяну">
            <p>
              Интерактивный тренажёр для работы с MIDI: визуализация нот, таймлайн, воспроизведение
              и практика чтения с листа.
            </p>
            <Button
              type="primary"
              onClick={() => {
                navigate(ROUTE.BAYAN);
              }}
            >
              Открыть тренажёр
            </Button>
          </Card>
        </VStack>
      </ScrollableContainer>
    </div>
  );
}
