import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProfilePhoto from '../components/home/ProfilePhoto';
import ProjectList from '../components/projects/ProjectList';
import styles from './Home.module.css';

const STACK = ['React', 'Vite', 'TanStack Query', 'Supabase', 'CSS Modules'];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <ProfilePhoto />
        <div className={styles.text}>
          <p className={styles.kicker}>Portfólio · Desenvolvimento front-end</p>
          <h1>
            Olá, eu sou <span className={styles.name}>João Pedro Lagonegro</span>
          </h1>
          <p className={styles.lead}>
            Construo interfaces com React, com foco em código organizado e boa
            performance. Os projetos abaixo são carregados direto do meu GitHub.
          </p>
          <ul className={styles.stack} aria-label="Tecnologias">
            {STACK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button as="a" href="#projetos">
              Ver projetos
            </Button>
            <Button as={Link} to="/contato" variant="secondary">
              Entre em contato
            </Button>
          </div>
        </div>
      </section>

      <section id="projetos" className={styles.projects}>
        <h2>Projetos</h2>
        <ProjectList />
      </section>
    </>
  );
}
