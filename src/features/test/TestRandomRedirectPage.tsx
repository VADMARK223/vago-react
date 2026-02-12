import { useGetRandomQuestionId } from './test.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { ROUTE } from '@/shared/constants';

export const TestRandomRedirectPage = () => {
  const navigate = useNavigate();
  const { data: id, isLoading, isError, refetch } = useGetRandomQuestionId();

  useEffect(() => {
    if (id) {
      navigate(`${ROUTE.TEST}/${id}`, { replace: true });
    }
  }, [id, navigate]);

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return (
      <div>
        <div>Не удалось получить случайный вопрос</div>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  // На долю секунды, пока useEffect не сработал
  return <div>Переходим…</div>;
};
