const BASE_URL = 'https://api.github.com';
const GITHUB_USER = import.meta.env.VITE_GITHUB_USER;

function getErrorMessage(status, isRateLimit) {
  if (isRateLimit) {
    return 'Limite de requisições da API do GitHub atingido. Tente novamente mais tarde.';
  }
  if (status === 404) {
    return 'Não encontrado no GitHub.';
  }
  return 'Não foi possível carregar os dados do GitHub.';
}

async function request(path) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
  } catch {
    const error = new Error('Sem conexão. Verifique sua internet e tente novamente.');
    error.status = 0;
    throw error;
  }

  if (!response.ok) {
    const isRateLimit =
      (response.status === 403 || response.status === 429) &&
      response.headers.get('x-ratelimit-remaining') === '0';
    const error = new Error(getErrorMessage(response.status, isRateLimit));
    error.status = response.status;
    error.isRateLimit = isRateLimit;
    throw error;
  }

  return response.json();
}

export async function fetchRepos() {
  const repos = await request(`/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
  return repos.filter((repo) => !repo.fork);
}

export function fetchRepo(name) {
  return request(`/repos/${GITHUB_USER}/${encodeURIComponent(name)}`);
}
