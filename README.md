# Portfólio — João Pedro Lagonegro

Site de portfólio em React. Os projetos vêm da API do GitHub, há um formulário de contato com validação e envio por e-mail, e um dashboard protegido por login para o dono do site.

- **Site publicado:** https://cp-3-webdev-two.vercel.app
- **Repositório:** https://github.com/JoaoLagonegro/CP3-WEBDEV

## Funcionalidades

- Rotas com página 404, página de erro e acesso direto por link (`/projetos/nome`)
- Estados de carregamento (skeleton), erro e lista vazia
- Projetos carregados da API pública do GitHub, com cache de 5 minutos
- Formulário de contato com validação, envio por e-mail e salvamento no banco
- Dashboard protegido por login: marcar mensagens como respondidas e escolher projetos em destaque
- Tema claro e escuro, lembrado entre visitas
- Interface responsiva e identidade visual própria

## Tecnologias

| Tecnologia                       | Para que serve                                                 |
| -------------------------------- | -------------------------------------------------------------- |
| Vite + React (JavaScript)        | Build rápido e interface em componentes                        |
| React Router                     | Rotas, 404 e rota protegida                                    |
| TanStack Query                   | Cache e estados de carregamento das chamadas ao GitHub         |
| React Hook Form + Zod            | Formulário e validação por schema                              |
| EmailJS                          | Envio do e-mail de contato direto do navegador                 |
| Supabase                         | Login (Auth) e banco de dados (mensagens e destaques)          |
| CSS Modules                      | Estilos isolados por componente, com variáveis CSS para o tema |
| Vitest + Testing Library         | Testes automatizados                                           |
| sharp                            | Gera as versões otimizadas (WebP) da foto                      |
| ESLint + Prettier                | Padrão de código                                               |
| Husky + lint-staged + commitlint | Verificação automática antes de cada commit                    |
| Vercel                           | Hospedagem com deploy automático                               |

## Como rodar

1. `git clone https://github.com/JoaoLagonegro/CP3-WEBDEV.git`
2. `cd CP3-WEBDEV`
3. `npm install`
4. Copie `.env.example` para `.env` e preencha as variáveis (tabela abaixo)
5. `npm run dev`

### Scripts

| Comando              | O que faz                    |
| -------------------- | ---------------------------- |
| `npm run dev`        | Servidor de desenvolvimento  |
| `npm run build`      | Build de produção em `dist/` |
| `npm run preview`    | Serve o build localmente     |
| `npm run lint`       | Verifica o código com ESLint |
| `npm test`           | Roda os testes uma vez       |
| `npm run test:watch` | Testes em modo contínuo      |

### Variáveis de ambiente

| Variável                   | Descrição                                         |
| -------------------------- | ------------------------------------------------- |
| `VITE_GITHUB_USER`         | Usuário do GitHub cujos repositórios são listados |
| `VITE_SUPABASE_URL`        | URL do projeto Supabase                           |
| `VITE_SUPABASE_ANON_KEY`   | Chave pública (anon) do Supabase                  |
| `VITE_EMAILJS_SERVICE_ID`  | ID do serviço no EmailJS                          |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template de e-mail no EmailJS               |
| `VITE_EMAILJS_PUBLIC_KEY`  | Chave pública do EmailJS                          |

O arquivo `.env` nunca é versionado. Na Vercel, as mesmas variáveis são cadastradas nas configurações do projeto.

### Imagens

Só as versões otimizadas da foto (`foto-160.webp` e `foto-320.webp`) ficam no repositório. O original (`src/assets/foto-original.jpg`) está no `.gitignore`. Para gerar as versões otimizadas a partir dele, use `node scripts/optimize-images.mjs`.

## Arquitetura

Estrutura de `src/`:

    components/   apresentação, por área (contact, dashboard, home, layout, projects, ui)
    pages/        uma página por rota
    routes/       rotas, layout de login e rota protegida
    services/     chamadas externas (GitHub, Supabase, EmailJS)
    hooks/        lógica e estado de dados (useRepos, useFeatured, useMessages...)
    context/      tema e autenticação
    schemas/      schemas Zod
    styles/       estilos globais e variáveis do tema
    tests/        testes automatizados

Regras:

- Componentes só cuidam de apresentação. Chamadas externas ficam em `services/` e o estado de dados em `hooks/`.
- Componentes pequenos e reaproveitáveis (`Button`, `Card`, `Spinner`, `Skeleton` em `components/ui`).
- O `AuthProvider` envolve só as rotas de login e dashboard, e essas páginas são carregadas sob demanda (lazy loading).

## Padrões

### Commits

Conventional Commits, em português e no presente: `tipo: descrição`. Tipos usados: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `perf`, `chore`.

Exemplo: `feat: adiciona formulário de contato com feedback de envio`.

O commitlint recusa mensagens fora do padrão.

### Branches

GitHub Flow: a `main` está sempre estável e publica automaticamente. Cada funcionalidade nasce de uma branch própria (`feature/nome`, `fix/nome`, `chore/nome`, `style/nome`, `docs/nome`), é integrada por Pull Request e depois a `main` local é atualizada.

### Nomenclatura

- Componentes e páginas: PascalCase (`ProjectCard.jsx`)
- Hooks: começam com `use` (`useRepos.js`)
- Services, schemas e utilitários: camelCase
- Estilos: CSS Modules, `Componente.module.css`

### Qualidade automática

Antes de cada commit, o Husky executa o lint-staged (ESLint e Prettier nos arquivos alterados) e o commitlint valida a mensagem.

## Desempenho

Lighthouse mobile no site publicado, em três medições: Performance 98, 96 e 98. Na primeira medição: LCP 1,5 s, TBT 150 ms e CLS 0.

O que sustenta esses números: rotas pesadas carregadas sob demanda, Supabase importado dinamicamente, foto em WebP com `srcSet`, `width`/`height` e `loading="lazy"`, cards com altura fixa, cache de 5 minutos no TanStack Query e fonte do sistema.

## Testes

`npm test` roda 16 testes (Vitest + Testing Library): validação do formulário de contato e bloqueio do dashboard para quem não está logado.

## Instruções para IA

As regras que a IA deve seguir neste projeto estão em [CLAUDE.md](./CLAUDE.md), versionado no repositório.
