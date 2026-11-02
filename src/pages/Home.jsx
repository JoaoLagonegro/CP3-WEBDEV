import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProfilePhoto from '../components/home/ProfilePhoto';
import ProjectList from '../components/projects/ProjectList';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <ProfilePhoto />
        <div>
          <h1>Olá, eu sou João Pedro Lagonegro</h1>
          <p>Desenvolvedor front-end. Veja abaixo os meus projetos.</p>
          <Button as={Link} to="/contato">
            Entre em contato
          </Button>
        </div>
      </section>

      <section>
        <h2>Projetos</h2>
        <ProjectList />
      </section>
    </>
  );
}
