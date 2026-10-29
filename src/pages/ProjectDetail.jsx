import { Link, useParams } from 'react-router-dom';

export default function ProjectDetail() {
  const { name } = useParams();
  return (
    <section>
      <h1>{name}</h1>
      <p>Os detalhes deste projeto serão carregados do GitHub na Parte 3.</p>
      <Link to="/">← Voltar</Link>
    </section>
  );
}
