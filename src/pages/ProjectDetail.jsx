import { Link, useParams } from 'react-router-dom';
import { useRepo } from '../hooks/useRepos';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';
import { formatDate } from '../utils/formatDate';

export default function ProjectDetail() {
  const { name } = useParams();
  const { data: repo, isPending, isError, error, refetch } = useRepo(name);

  if (isPending) {
    return (
      <section aria-busy="true">
        <Skeleton height="2.2rem" width="50%" />
        <p>
          <Skeleton height="4rem" />
        </p>
        <Skeleton height="1rem" width="40%" />
      </section>
    );
  }

  if (isError) {
    if (error.status === 404) {
      return <NotFound />;
    }
    return (
      <ErrorPage
        title="Não foi possível carregar o projeto"
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  return (
    <section>
      <h1>{repo.name}</h1>
      <p>{repo.description ?? 'Sem descrição.'}</p>
      <ul>
        <li>Linguagem: {repo.language ?? 'não informada'}</li>
        <li>Estrelas: {repo.stargazers_count}</li>
        <li>Última atualização: {formatDate(repo.pushed_at)}</li>
      </ul>
      <Button as="a" href={repo.html_url} target="_blank" rel="noreferrer">
        Ver no GitHub
      </Button>{' '}
      <Link to="/">← Voltar</Link>
    </section>
  );
}
