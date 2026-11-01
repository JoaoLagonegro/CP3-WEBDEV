import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function Dashboard() {
  const { session, logout } = useAuth();

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Logado como {session?.user.email}</p>
      <Button variant="secondary" onClick={logout}>
        Sair
      </Button>
      {/* Mensagens e destaques entram no próximo commit */}
    </section>
  );
}
