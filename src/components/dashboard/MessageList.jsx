import { useMessages, useToggleReplied } from '../../hooks/useMessages';
import { formatDateTime } from '../../utils/formatDate';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import styles from './MessageList.module.css';

export default function MessageList() {
  const { data: messages, isPending, isError, refetch } = useMessages();
  const {
    mutate,
    isPending: isUpdating,
    isError: updateFailed,
    variables,
  } = useToggleReplied();

  if (isPending) {
    return (
      <div className={styles.list} aria-busy="true">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={index}>
            <Skeleton height="1.2rem" width="40%" />
            <Skeleton height="3rem" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert">
        <p>Não foi possível carregar as mensagens.</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  if (messages.length === 0) {
    return <p>Nenhuma mensagem recebida ainda.</p>;
  }

  return (
    <div className={styles.list}>
      {updateFailed && (
        <p className={styles.error} role="alert">
          Não foi possível atualizar a mensagem. Tente novamente.
        </p>
      )}
      {messages.map((message) => (
        <Card key={message.id} className={message.replied ? styles.replied : ''}>
          <div className={styles.top}>
            <strong>{message.name}</strong>
            <a href={`mailto:${message.email}`}>{message.email}</a>
            <span className={styles.date}>{formatDateTime(message.created_at)}</span>
          </div>
          <p className={styles.text}>{message.message}</p>
          <div className={styles.actions}>
            <span className={message.replied ? styles.done : styles.pending}>
              {message.replied ? 'Respondida' : 'Pendente'}
            </span>
            <Button
              variant="secondary"
              disabled={isUpdating && variables?.id === message.id}
              onClick={() => mutate({ id: message.id, replied: !message.replied })}
            >
              {message.replied ? 'Marcar como pendente' : 'Marcar como respondida'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
