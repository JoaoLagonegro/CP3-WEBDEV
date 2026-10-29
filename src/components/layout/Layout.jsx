import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={`container ${styles.main}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
