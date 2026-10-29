import Button from '../components/ui/Button';

export default function ErrorPage({
  title = 'Algo deu errado',
  message = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
}) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
    </section>
  );
}
