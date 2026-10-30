import { useMutation } from '@tanstack/react-query';
import { sendMessage } from '../services/messages';

export function useSendMessage() {
  return useMutation({ mutationFn: sendMessage });
}
