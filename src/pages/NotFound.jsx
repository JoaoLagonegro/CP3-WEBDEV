import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <section>
      <h1>404 - Página não encontrada</h1>
      <p>O endereço que você acessou não existe.</p>
      <Button as={Link} to="/">
        Voltar para o início
      </Button>
    </section>
  );
}
