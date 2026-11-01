import Spinner from './Spinner';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <p className={styles.loader}>
      <Spinner label="Carregando página" /> Carregando...
    </p>
  );
}
