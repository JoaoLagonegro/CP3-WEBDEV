import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Alternar entre tema claro e escuro"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
