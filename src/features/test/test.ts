import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY, URL } from '@/shared/constants';
import { api, type ApiMessageResponse } from '@/shared/api/ky-client';
import type { Id, Question } from '@/shared/types';

type AnswerPublic = {
  id: Id;
  text: string;
};

type QuestionPublic = Question & {
  answers: AnswerPublic[];
};

type TestResponse = ApiMessageResponse<QuestionPublic>;
type QuestionIdResponse = ApiMessageResponse<number>;

export const useGetRandomQuestionId = () => {
  return useQuery({
    queryKey: [QUERY_KEY.test],
    queryFn: async () => {
      const resp = await api.get(URL.TEST).json<QuestionIdResponse>();
      return resp.data;
    },
  });
};

export const useGetQuestionById = (id: number | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.test, id],
    queryFn: async () => {
      const resp = await api.get(URL.TEST + `/${id}`).json<TestResponse>();
      return resp.data;
    },
    enabled: !!id, // Когда страница открывается, useParams() сначала может вернуть undefined. Будет: /api/test/undefined
  });
};
