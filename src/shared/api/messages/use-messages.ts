import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants';
import { getMessages } from '@/shared/api/messages/messages.api';

export const useMessages = () =>
  useQuery({
    queryKey: [QUERY_KEY.messages],
    queryFn: getMessages,
    select: (data) => data.messages,
    initialData: { messages: [] },
  });
