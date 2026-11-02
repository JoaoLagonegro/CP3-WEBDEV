import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.mark}>JP</span>
          <span>João Pedro</span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
