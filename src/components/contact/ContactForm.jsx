import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../../schemas/contactSchema';
import { useSendMessage } from '../../hooks/useSendMessage';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode: 'onTouched',
  });

  const { mutate, isPending, isSuccess, isError, error } = useSendMessage();

  const onSubmit = (data) => {
    mutate(data, { onSuccess: () => reset() });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Nome</label>
        <input id="name" type="text" autoComplete="name" {...register('name')} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" autoComplete="email" {...register('email')} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Mensagem</label>
        <textarea id="message" rows={6} {...register('message')} />
        {errors.message && <span className={styles.error}>{errors.message.message}</span>}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner label="Enviando" /> Enviando...
          </>
        ) : (
          'Enviar mensagem'
        )}
      </Button>

      {isSuccess && (
        <p className={styles.success} role="status">
          Mensagem enviada com sucesso! Obrigado pelo contato.
        </p>
      )}
      {isError && (
        <p className={styles.error} role="alert">
          {error.message}
        </p>
      )}
    </form>
  );
}
