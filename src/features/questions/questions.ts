import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/queryKeys.ts';
import { api, type KyResponse } from '@/shared/api/ky-client.ts';
import { URL } from '@/shared/constants/urls.ts';
import type { Id } from '@/shared/types.ts';

type QuestionsPageData = {
  chapters: QuestionsChapter[];
  topics: TopicWithCount[];
  questions: Question[];
};

type QuestionsChapter = {
  id: Id;
  name: string;
  order: number;
};

type Answer = {
  id: Id;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: Id;
  topicId: Id;
  text: string;
  code: string;
  explanation: string;
  answers: Answer[];
};

type TopicWithCount = {
  id: Id;
  name: string;
  questionsCount: number;
};

type QuestionsResponse = KyResponse<QuestionsPageData>;

export const useQuestions = (topicId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.QUESTIONS, topicId ?? null],
    queryFn: async () => {
      const searchParams = topicId != null ? { topic_id: String(topicId) } : undefined;
      return await api.get(URL.QUESTION, { searchParams: searchParams }).json<QuestionsResponse>();
    },
  });
};
