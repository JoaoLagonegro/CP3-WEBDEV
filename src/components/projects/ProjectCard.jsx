import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { formatDate } from '../../utils/formatDate';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ repo }) {
  return (
    <Card className={styles.card}>
      <h3 className={styles.title}>
        <Link to={`/projetos/${repo.name}`}>{repo.name}</Link>
      </h3>
      <p className={styles.description}>{repo.description ?? 'Sem descrição.'}</p>
      <div className={styles.meta}>
        <span>{repo.language ?? 'Linguagem não informada'}</span>
        <span>Atualizado em {formatDate(repo.pushed_at)}</span>
      </div>
    </Card>
  );
}
