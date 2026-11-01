import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import MessageList from '../components/dashboard/MessageList';
import FeaturedSelector from '../components/dashboard/FeaturedSelector';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { session, logout } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();
    // Não deixa as mensagens guardadas em cache depois que o dono sai
    queryClient.removeQueries({ queryKey: ['messages'] });
  };

  return (
    <section>
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p>Logado como {session?.user.email}</p>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Sair
        </Button>
      </div>

      <div className={styles.section}>
        <h2>Mensagens recebidas</h2>
        <MessageList />
      </div>

      <div className={styles.section}>
        <h2>Projetos em destaque na home</h2>
        <p>Marque os projetos que devem aparecer em destaque na página inicial.</p>
        <FeaturedSelector />
      </div>
    </section>
  );
}
