import styles from './TestPage.module.css';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetQuestionById } from './test.ts';
import { Button, message, Space, Spin } from 'antd';
import { CodeBlock } from '../../shared/ui/codeBlock/CodeBlock.tsx';
import { api, type KyResponse } from '../../shared/api/ky-client.ts';
import { useMutation } from '@tanstack/react-query';
import { URL } from '../../shared/constants/urls.ts';
import { StepForwardOutlined, UndoOutlined } from '@ant-design/icons';

type CheckRequest = {
  questionId: number;
  answerId: number;
};

type CheckResponseData = {
  correct: boolean;
  explanation?: string;
};

type AnswerMark = 'wrong' | 'correct';

export const TestPage = () => {
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const [marks, setMarks] = useState<Record<number, AnswerMark>>({});
  const [solved, setSolved] = useState(false);
  const [result, setResult] = useState<CheckResponseData | null>(null);

  let resulText = 'Выберите ответ 👇';
  let explanationText = 'Объяснение будет после правильного ответа 👆';

  const id = useMemo(() => {
    const n = Number(idParam);
    return Number.isFinite(n) ? n : undefined;
  }, [idParam]);

  const { data: q, isLoading, isError, refetch } = useGetQuestionById(id);

  const checkMutation = useMutation({
    mutationFn: async (payload: CheckRequest) => {
      const resp = await api
        .post(`${URL.TEST}/check`, { json: payload })
        .json<KyResponse<CheckResponseData>>();
      return resp.data;
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: async () => {
      message.error('Ошибка проверки ответа');
      setResult(null);
    },
  });

  const handleAnswerClick = async (answerId: number) => {
    if (!q) {
      return;
    }

    if (checkMutation.isPending) {
      // Идет проверка ответа
      return;
    }

    if (solved) {
      // Уже дан правильный ответ
      return;
    }

    // Если этот ответ уже помечен wrong, то на него уже нельзя кликнуть
    if (marks[answerId] === 'wrong') {
      return;
    }

    try {
      const res = await checkMutation.mutateAsync({
        questionId: q.id,
        answerId: answerId,
      });

      if (res.correct) {
        setMarks((prev) => ({ ...prev, [answerId]: 'correct' }));
        setSolved(true);
      } else {
        setMarks((prev) => ({ ...prev, [answerId]: 'wrong' }));
      }
    } catch {
      setResult(null);
    }
  };

  const handleNextRandom = () => navigate('/test', { replace: true });

  const handleResetTry = () => {
    setMarks({});
    setSolved(false);
    setResult(null);
    checkMutation.reset();
  };

  // ---------------- UI states ----------------
  if (!id) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Space orientation="vertical">
          <h3>Неверный id.</h3>
          <div>
            <Button onClick={() => navigate('/test')}>Случайный</Button>
          </div>
        </Space>
      </div>
    );
  }

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return (
      <div>
        Ошибка загрузки. <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  if (!q) {
    return <div>Не найдено</div>;
  }

  if (result != null) {
    if (result.correct) {
      resulText = '✅ Правильно';
      if (result.explanation) {
        explanationText = result.explanation;
      } else {
        explanationText = 'Вопрос без объяснения';
      }
    } else {
      resulText = '❌ Неправильно';
    }
  }

  return (
    <>
      <h3>
        {q.id}. {q.text}
      </h3>
      <p>Тема: {q.topicName}</p>
      {q.code && <CodeBlock code={q.code} />}
      <div>{resulText}</div>
      {q.answers.map((a) => {
        const mark = marks[a.id]; // "wrong" | "correct" | undefined

        const className =
          mark === 'correct'
            ? `${styles.answer} ${styles.correct}`
            : mark === 'wrong'
              ? `${styles.answer} ${styles.wrong}`
              : styles.answer;

        const disabled = checkMutation.isPending || solved || mark === 'wrong';

        return (
          <button
            key={a.id}
            className={className}
            onClick={() => handleAnswerClick(a.id)}
            disabled={disabled}
          >
            {a.id}) {a.text}
          </button>
        );
      })}

      <Space orientation="vertical">
        <hr />
        <div className={styles.explanation}>{explanationText}</div>
        <Space orientation="horizontal">
          <Button
            type="primary"
            onClick={handleNextRandom}
            icon={<StepForwardOutlined />}
            iconPlacement="end"
            disabled={!solved || checkMutation.isPending}
          >
            Следующий случайный вопрос
          </Button>
          <Button
            onClick={handleResetTry}
            icon={<UndoOutlined />}
            disabled={checkMutation.isPending || result == null}
          >
            Сбросить попытки
          </Button>
        </Space>
      </Space>
    </>
  );
};
