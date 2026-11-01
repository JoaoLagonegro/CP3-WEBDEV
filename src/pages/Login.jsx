import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/dashboard/LoginForm';
import Spinner from '../components/ui/Spinner';

export default function Login() {
  const { session, loading } = useAuth();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname ?? '/dashboard';

  if (loading) {
    return (
      <p>
        <Spinner label="Carregando" /> Carregando...
      </p>
    );
  }

  if (session) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <section>
      <h1>Acesso do dono</h1>
      <p>Entre para ver as mensagens e escolher os projetos em destaque.</p>
      <LoginForm />
    </section>
  );
}
