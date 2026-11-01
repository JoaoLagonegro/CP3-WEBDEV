export function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR');
}

export function formatDateTime(date) {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}
