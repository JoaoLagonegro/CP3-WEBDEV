import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">© {new Date().getFullYear()} Meu Portfólio</div>
    </footer>
  );
}
