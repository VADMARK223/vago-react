import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY, URL } from '@/shared/constants';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import type { Id } from '@/shared/types';

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

type QuestionsResponse = ApiMessageResponse<QuestionsPageData>;

export const useQuestions = (topicId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.questions, topicId ?? null],
    queryFn: async () => {
      const searchParams = topicId != null ? { topic_id: String(topicId) } : undefined;
      return await api.get(URL.QUESTION, { searchParams: searchParams }).json<QuestionsResponse>();
    },
  });
};
