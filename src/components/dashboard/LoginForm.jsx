import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      await login(data);
    } catch {
      setSubmitError('E-mail ou senha inválidos.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', { required: 'Informe seu e-mail' })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password', { required: 'Informe sua senha' })}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner label="Entrando" /> Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>

      {submitError && (
        <p className={styles.error} role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}
