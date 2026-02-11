import { useQuestions } from './questions.ts';
import { Select } from 'antd';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CODE } from '../../constants/codes.ts';
import { ScrollableContainer } from '../../shared/ui/ScrollableContainer.tsx';
import { CodeBlock } from '../book/CodeBlock.tsx';

export const QuestionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIdRaw = Number(searchParams.get(CODE.TOPIC_ID)) || 0;
  const topicId = selectedIdRaw ? Number(selectedIdRaw) : undefined;

  const { data: topicsAndQuestions, isLoading, isError } = useQuestions(topicId);

  const options = useMemo(() => {
    return (
      topicsAndQuestions?.data.topics.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? []
    );
  }, [topicsAndQuestions?.data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleChange = (value: number) => {
    const params = new URLSearchParams(searchParams);

    if (value == null) {
      params.delete(CODE.TOPIC_ID);
    } else {
      params.set(CODE.TOPIC_ID, String(value));
    }

    setSearchParams(params);
  };

  return (
    <>
      <Select
        style={{ marginBottom: '12px' }}
        options={options}
        placeholder="Выберите тему"
        value={topicId}
        onChange={handleChange}
        allowClear
      />

      <ScrollableContainer>
        {topicsAndQuestions?.data.questions.map((item) => {
          return (
            <span key={item.id}>
              <div>
                <b>
                  {item.id}. {item.text}
                </b>
                {item.code.trim() && <CodeBlock code={item.code} />}
                <p>{item.explanation}</p>
              </div>
              <hr />
            </span>
          );
        })}
      </ScrollableContainer>
    </>
  );
};
