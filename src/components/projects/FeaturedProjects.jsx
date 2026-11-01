import { useFeatured } from '../../hooks/useFeatured';
import { useRepos } from '../../hooks/useRepos';
import ProjectCard from './ProjectCard';
import styles from './ProjectList.module.css';

export default function FeaturedProjects() {
  const { data: repos } = useRepos();
  const { data: featuredNames } = useFeatured();

  // Os destaques são um extra: se não carregarem ou estiverem vazios, a seção some
  if (!repos || !featuredNames) return null;

  const featured = repos.filter((repo) => featuredNames.includes(repo.name));
  if (featured.length === 0) return null;

  return (
    <section>
      <h2>Projetos em destaque</h2>
      <div className={styles.grid}>
        {featured.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
