# Instruções do projeto

Portfólio em React (Vite, JavaScript). Siga SEMPRE estas regras.

## Arquitetura

- `components/` só apresentação. Sem fetch dentro de componentes.
- Chamadas externas ficam em `services/`; o estado de dados em `hooks/`.
- Componentes pequenos e reutilizáveis (Button, Card em `components/ui`).
- Rotas em `routes/`, páginas em `pages/`.

## Nomenclatura

- Componentes e páginas: PascalCase (`ProjectCard.jsx`)
- Hooks: começam com `use` (`useRepos.js`)
- Services, schemas e utils: camelCase
- CSS Modules: `Componente.module.css`

## Commits (Conventional Commits)

- Formato: `tipo: descrição em português no presente`
- Tipos: feat, fix, docs, style, refactor, test, perf, chore
- Ex.: `feat: adiciona validação do formulário de contato`

## Branches (GitHub Flow)

- `main` sempre estável e com deploy automático
- Uma branch por funcionalidade: `feature/nome`, `fix/nome`, `chore/nome`, `style/nome`, `docs/nome`
- Integrar via Pull Request

## Stack permitida

React Router, TanStack Query, React Hook Form, Zod, EmailJS, Supabase,
CSS Modules, Vitest + Testing Library, sharp (imagens), ESLint, Prettier, Husky, lint-staged e commitlint. Não adicionar outras bibliotecas sem justificar.

## Qualidade

- Rodar lint e prettier antes de commitar (já automatizado pelo Husky)
- Nunca commitar `.env`
- Imagens: só as versões otimizadas (WebP) vão ao repositório; `foto-original.*` fica no `.gitignore`. Gerar com `node scripts/optimize-images.mjs`
- Mais detalhes (scripts, variáveis, arquitetura, desempenho) estão no `README.md`
