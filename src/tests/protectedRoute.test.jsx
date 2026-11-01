import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from '../routes/ProtectedRoute';

// Simula o estado de login, sem precisar do Supabase
vi.mock('../hooks/useAuth', () => ({ useAuth: vi.fn() }));

function renderDashboardRoute() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<p>Tela de login</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<p>Conteúdo do dashboard</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('redireciona para o login quando não há sessão', () => {
    useAuth.mockReturnValue({ session: null, loading: false });

    renderDashboardRoute();

    expect(screen.getByText('Tela de login')).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo do dashboard')).not.toBeInTheDocument();
  });

  it('não mostra o dashboard enquanto verifica o acesso', () => {
    useAuth.mockReturnValue({ session: null, loading: true });

    renderDashboardRoute();

    expect(screen.getByText(/verificando acesso/i)).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo do dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Tela de login')).not.toBeInTheDocument();
  });

  it('mostra o dashboard quando o dono está logado', () => {
    useAuth.mockReturnValue({
      session: { user: { email: 'dono@email.com' } },
      loading: false,
    });

    renderDashboardRoute();

    expect(screen.getByText('Conteúdo do dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Tela de login')).not.toBeInTheDocument();
  });
});
