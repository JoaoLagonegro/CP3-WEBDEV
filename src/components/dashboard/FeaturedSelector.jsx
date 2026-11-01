import { useFeatured, useToggleFeatured } from '../../hooks/useFeatured';
import { useRepos } from '../../hooks/useRepos';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';
import styles from './FeaturedSelector.module.css';

export default function FeaturedSelector() {
  const reposQuery = useRepos();
  const featuredQuery = useFeatured();
  const {
    mutate,
    isPending: isUpdating,
    isError: updateFailed,
    variables,
  } = useToggleFeatured();

  if (reposQuery.isPending || featuredQuery.isPending) {
    return (
      <div className={styles.list} aria-busy="true">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} height="1.4rem" width="50%" />
        ))}
      </div>
    );
  }

  if (reposQuery.isError || featuredQuery.isError) {
    return (
      <div role="alert">
        <p>Não foi possível carregar os projetos.</p>
        <Button
          onClick={() => {
            reposQuery.refetch();
            featuredQuery.refetch();
          }}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  const repos = reposQuery.data;
  const featured = featuredQuery.data;

  if (repos.length === 0) {
    return <p>Nenhum projeto encontrado.</p>;
  }

  return (
    <div>
      {updateFailed && (
        <p className={styles.error} role="alert">
          Não foi possível atualizar o destaque. Tente novamente.
        </p>
      )}
      <ul className={styles.list}>
        {repos.map((repo) => (
          <li key={repo.id}>
            <label className={styles.item}>
              <input
                type="checkbox"
                checked={featured.includes(repo.name)}
                disabled={isUpdating && variables?.repoName === repo.name}
                onChange={(event) =>
                  mutate({ repoName: repo.name, featured: event.target.checked })
                }
              />
              {repo.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
