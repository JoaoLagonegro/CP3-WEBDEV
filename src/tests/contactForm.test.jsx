import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContactForm from '../components/contact/ContactForm';
import { contactSchema } from '../schemas/contactSchema';
import { sendMessage } from '../services/messages';

// Evita criar o cliente do Supabase e chamar o EmailJS de verdade nos testes
vi.mock('../services/messages', () => ({ sendMessage: vi.fn() }));

const validData = {
  name: 'Maria Silva',
  email: 'maria@email.com',
  message: 'Gostei muito do seu portfólio, vamos conversar?',
};

function getErrors(data) {
  const result = contactSchema.safeParse(data);
  if (result.success) return {};

  const errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}

describe('contactSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactSchema.safeParse(validData).success).toBe(true);
  });

  it('rejeita nome com menos de 2 caracteres', () => {
    expect(getErrors({ ...validData, name: 'A' }).name).toBe(
      'O nome deve ter no mínimo 2 caracteres',
    );
  });

  it('rejeita nome só com espaços', () => {
    expect(getErrors({ ...validData, name: '   ' }).name).toBe(
      'O nome deve ter no mínimo 2 caracteres',
    );
  });

  it('exige o e-mail', () => {
    expect(getErrors({ ...validData, email: '' }).email).toBe('Informe seu e-mail');
  });

  it('rejeita e-mail inválido', () => {
    expect(getErrors({ ...validData, email: 'abc' }).email).toBe('E-mail inválido');
  });

  it('rejeita mensagem com menos de 20 caracteres', () => {
    expect(getErrors({ ...validData, message: 'Oi' }).message).toBe(
      'A mensagem deve ter no mínimo 20 caracteres',
    );
  });

  it('rejeita mensagem com mais de 1000 caracteres', () => {
    expect(getErrors({ ...validData, message: 'a'.repeat(1001) }).message).toBe(
      'A mensagem deve ter no máximo 1000 caracteres',
    );
  });
});

function renderForm() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ContactForm />
    </QueryClientProvider>,
  );
}

async function fillForm(user, data) {
  await user.type(screen.getByLabelText('Nome'), data.name);
  await user.type(screen.getByLabelText('E-mail'), data.email);
  await user.type(screen.getByLabelText('Mensagem'), data.message);
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('mostra uma mensagem específica para cada campo vazio', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText('O nome deve ter no mínimo 2 caracteres'),
    ).toBeInTheDocument();
    expect(screen.getByText('Informe seu e-mail')).toBeInTheDocument();
    expect(
      screen.getByText('A mensagem deve ter no mínimo 20 caracteres'),
    ).toBeInTheDocument();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('mostra "E-mail inválido" para e-mail mal formatado', async () => {
    const user = userEvent.setup();
    renderForm();

    await fillForm(user, { ...validData, email: 'abc' });
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByText('E-mail inválido')).toBeInTheDocument();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('mostra erro quando a mensagem tem menos de 20 caracteres', async () => {
    const user = userEvent.setup();
    renderForm();

    await fillForm(user, { ...validData, message: 'Oi, tudo bem?' });
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText('A mensagem deve ter no mínimo 20 caracteres'),
    ).toBeInTheDocument();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('envia os dados e mostra sucesso quando tudo está válido', async () => {
    sendMessage.mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderForm();

    await fillForm(user, validData);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText('Mensagem enviada com sucesso! Obrigado pelo contato.'),
    ).toBeInTheDocument();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage.mock.calls[0][0]).toEqual(validData);
  });

  it('bloqueia o botão durante o envio, evitando mensagens duplicadas', async () => {
    // Promise que nunca termina: o formulário fica "enviando"
    sendMessage.mockReturnValue(new Promise(() => {}));
    const user = userEvent.setup();
    renderForm();

    await fillForm(user, validData);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    const sendingButton = await screen.findByRole('button', { name: /enviando/i });
    expect(sendingButton).toBeDisabled();

    await user.click(sendingButton);
    expect(sendMessage).toHaveBeenCalledTimes(1);
  });

  it('mostra uma mensagem de erro quando o envio falha', async () => {
    sendMessage.mockRejectedValue(
      new Error('Não foi possível enviar sua mensagem. Tente novamente.'),
    );
    const user = userEvent.setup();
    renderForm();

    await fillForm(user, validData);
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível enviar sua mensagem. Tente novamente.',
    );
  });
});
