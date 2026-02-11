import { useQuestions } from './questions.ts';
import { Select } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CODE } from '../../constants/codes.ts';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { QuestionItem } from './QuestionItem.tsx';
import { ToTopButton } from './ToTopButton.tsx';

export const QuestionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIdRaw = Number(searchParams.get(CODE.TOPIC_ID)) || 0;
  const topicId = selectedIdRaw ? Number(selectedIdRaw) : undefined;
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [showTop, setShowTop] = useState(false);

  const { data: topicsAndQuestions, isLoading, isError } = useQuestions(topicId);

  const options = useMemo(() => {
    return (
      topicsAndQuestions?.data.topics.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? []
    );
  }, [topicsAndQuestions?.data.topics]);

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

      <Virtuoso
        ref={virtuosoRef}
        style={{ height: '100%' }}
        data={topicsAndQuestions?.data.questions}
        itemContent={(_, question) => <QuestionItem question={question} />}
        rangeChanged={(range) => {
          setShowTop(range.startIndex > 5);
        }}
      />

      <ToTopButton
        visible={showTop}
        onClick={() =>
          virtuosoRef.current?.scrollToIndex({
            index: 0,
            behavior: 'smooth',
          })
        }
      />
    </>
  );
};
