import { useRepos } from '../../hooks/useRepos';
import ErrorPage from '../../pages/ErrorPage';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import styles from './ProjectList.module.css';

const SKELETON_COUNT = 6;

export default function ProjectList() {
  const { data: repos, isPending, isError, error, refetch } = useRepos();

  if (isPending) {
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

  return (
    <div className={styles.grid}>
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
