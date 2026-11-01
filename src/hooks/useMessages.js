import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMessages, setMessageReplied } from '../services/messages';

export function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    staleTime: 0,
  });
}

export function useToggleReplied() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, replied }) => setMessageReplied(id, replied),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
}
