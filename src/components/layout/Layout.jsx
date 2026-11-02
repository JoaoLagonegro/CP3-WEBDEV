import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageLoader from '../ui/PageLoader';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={`container ${styles.main}`}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
