import { supabase } from './supabase';
import { sendEmail } from './email';

async function saveMessage({ name, email, message }) {
  const { error } = await supabase.from('messages').insert({ name, email, message });
  if (error) throw error;
}

export async function sendMessage(data) {
  const results = await Promise.allSettled([saveMessage(data), sendEmail(data)]);

  // Só é erro se as duas formas falharem. Se uma funcionou, o dono ainda recebe a mensagem
  if (results.every((result) => result.status === 'rejected')) {
    throw new Error('Não foi possível enviar sua mensagem. Tente novamente.');
  }
}
