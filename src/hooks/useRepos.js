import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRepo, fetchRepos } from '../services/github';

export function useRepos() {
  return useQuery({
    queryKey: ['repos'],
    queryFn: fetchRepos,
  });
}

export function useRepo(name) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['repo', name],
    queryFn: () => fetchRepo(name),
    // Reaproveita a lista já carregada para não repetir a requisição ao navegar
    initialData: () =>
      queryClient.getQueryData(['repos'])?.find((repo) => repo.name === name),
    initialDataUpdatedAt: () => queryClient.getQueryState(['repos'])?.dataUpdatedAt,
  });
}
