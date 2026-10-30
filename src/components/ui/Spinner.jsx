import styles from './Spinner.module.css';

export default function Spinner({ label = 'Carregando' }) {
  return <span className={styles.spinner} role="status" aria-label={label} />;
}
