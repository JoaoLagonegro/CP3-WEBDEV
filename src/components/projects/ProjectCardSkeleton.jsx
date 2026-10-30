import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import styles from './ProjectCard.module.css';

export default function ProjectCardSkeleton() {
  return (
    <Card className={styles.card}>
      <Skeleton height="1.4rem" width="60%" />
      <Skeleton height="3.6rem" />
      <Skeleton height="1rem" width="80%" />
    </Card>
  );
}
