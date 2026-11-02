import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { formatDate } from '../../utils/formatDate';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ repo, featured = false }) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Link to={`/projetos/${repo.name}`}>{repo.name}</Link>
        </h3>
        {featured && <span className={styles.badge}>★ Destaque</span>}
      </div>
      <p className={styles.description}>{repo.description ?? 'Sem descrição.'}</p>
      <div className={styles.meta}>
        <span>{repo.language ?? 'Linguagem não informada'}</span>
        <span>Atualizado em {formatDate(repo.pushed_at)}</span>
      </div>
    </Card>
  );
}
