import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFeatured, setFeatured } from '../services/featured';

export function useFeatured() {
  return useQuery({
    queryKey: ['featured'],
    queryFn: fetchFeatured,
  });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ repoName, featured }) => setFeatured(repoName, featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['featured'] }),
  });
}
