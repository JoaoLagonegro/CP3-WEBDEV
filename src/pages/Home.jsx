import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import FeaturedProjects from '../components/projects/FeaturedProjects';
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

      <FeaturedProjects />

      <section>
        <h2>Todos os projetos</h2>
        <ProjectList />
      </section>
    </>
  );
}
