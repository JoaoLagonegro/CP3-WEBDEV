import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().trim().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  message: z
    .string()
    .trim()
    .min(20, 'A mensagem deve ter no mínimo 20 caracteres')
    .max(1000, 'A mensagem deve ter no máximo 1000 caracteres'),
});
