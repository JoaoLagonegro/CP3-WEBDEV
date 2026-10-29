import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <section>
      <h1>Olá, eu sou [seu nome]</h1>
      <p>Desenvolvedor(a) front-end. Veja abaixo os meus projetos.</p>
      <Button as={Link} to="/contato">
        Entre em contato
      </Button>
      {/* A lista de projetos do GitHub entra na Parte 3 */}
    </section>
  );
}
