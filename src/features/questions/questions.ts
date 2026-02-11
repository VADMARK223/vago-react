import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants/queryKeys.ts';
import { api, type KyResponse } from '../../shared/api/ky-client.ts';
import { URL } from '../../constants/urls.ts';

type TopicsAndQuestions = {
  topics: TopicWithCount[];
  questions: Question[];
};

export type Question = {
  id: number;
  topicId: number;
  text: string;
  code: string;
  explanation: string;
};

type TopicWithCount = {
  id: number;
  name: string;
  questionsCount: number;
};

type QuestionsResponse = KyResponse<TopicsAndQuestions>;

export const useQuestions = (topicId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.QUESTIONS, topicId ?? null],
    queryFn: async () => {
      const searchParams = topicId != null ? { topic_id: String(topicId) } : undefined;
      return await api.get(URL.QUESTION, { searchParams: searchParams }).json<QuestionsResponse>();
    },
  });
};
