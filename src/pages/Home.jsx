import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProjectList from '../components/projects/ProjectList';

export default function Home() {
  return (
    <>
      <section>
        <h1>Olá, eu sou [seu nome]</h1>
        <p>Desenvolvedor(a) front-end. Veja abaixo os meus projetos.</p>
        <Button as={Link} to="/contato">
          Entre em contato
        </Button>
      </section>

      <section>
        <h2>Projetos</h2>
        <ProjectList />
      </section>
    </>
  );
}
