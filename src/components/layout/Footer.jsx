import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        © {new Date().getFullYear()} Meu Portfólio · <Link to="/login">Área do dono</Link>
      </div>
    </footer>
  );
}
