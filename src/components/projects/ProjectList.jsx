import { useFeatured } from '../../hooks/useFeatured';
import { useRepos } from '../../hooks/useRepos';
import ErrorPage from '../../pages/ErrorPage';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import styles from './ProjectList.module.css';

const SKELETON_COUNT = 8;

export default function ProjectList() {
  const { data: repos, isPending: reposPending, isError, error, refetch } = useRepos();
  const { data: featuredNames = [], isPending: featuredPending } = useFeatured();

  // Espera as duas consultas para não reordenar os cards depois de aparecerem
  if (reposPending || featuredPending) {
    return (
      <div className={styles.grid} aria-busy="true">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorPage
        title="Não foi possível carregar os projetos"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  if (repos.length === 0) {
    return <p>Nenhum projeto encontrado.</p>;
  }

  const isFeatured = (repo) => featuredNames.includes(repo.name);
  const sortedRepos = [...repos].sort(
    (a, b) => Number(isFeatured(b)) - Number(isFeatured(a)),
  );

  return (
    <div className={styles.grid}>
      {sortedRepos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} featured={isFeatured(repo)} />
      ))}
    </div>
  );
}
