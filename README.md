# Portfólio

Site de portfólio em React com projetos puxados da API do GitHub,
formulário de contato e dashboard protegido.

## Tecnologias

React, Vite, React Router, TanStack Query, React Hook Form, Zod,
EmailJS, Supabase, CSS Modules, Vitest, ESLint, Prettier, Husky.

## Como rodar

1. `git clone https://github.com/JoaoLagonegro/CP3-WEBDEV.git`
2. `cd CP3-WEBDEV`
3. `npm install`
4. Copie `.env.example` para `.env` e preencha as variáveis
5. `npm run dev`

## Padrões

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`...)
- **Branches:** GitHub Flow. `main` protegida; uma branch por funcionalidade
  (`feature/dashboard`), integrada por Pull Request
- **Nomenclatura:** componentes em PascalCase, hooks com prefixo `use`,
  CSS Modules `Nome.module.css`
- **Arquitetura:** `components` (apresentação), `pages`, `routes`,
  `services` (APIs), `hooks` (lógica), `context`, `schemas`
- **Qualidade:** ESLint + Prettier rodam antes de cada commit (Husky + lint-staged)

## Instruções para IA

Veja `CLAUDE.md`.
