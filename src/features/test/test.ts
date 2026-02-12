import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/queryKeys.ts';
import { api, type KyResponse } from '@/shared/api/ky-client.ts';
import { URL } from '@/shared/constants/urls.ts';
import type { Id, Question } from '@/shared/types.ts';

type AnswerPublic = {
  id: Id;
  text: string;
};

type QuestionPublic = Question & {
  answers: AnswerPublic[];
};

type TestResponse = KyResponse<QuestionPublic>;
type QuestionIdResponse = KyResponse<number>;

export const useGetRandomQuestionId = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TEST],
    queryFn: async () => {
      const resp = await api.get(URL.TEST).json<QuestionIdResponse>();
      return resp.data;
    },
  });
};

export const useGetQuestionById = (id: number | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEY.TEST, id],
    queryFn: async () => {
      const resp = await api.get(URL.TEST + `/${id}`).json<TestResponse>();
      return resp.data;
    },
    enabled: !!id, // Когда страница открывается, useParams() сначала может вернуть undefined. Будет: /api/test/undefined
  });
};
