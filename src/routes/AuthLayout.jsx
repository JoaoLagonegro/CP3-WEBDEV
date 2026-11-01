import { Outlet } from 'react-router-dom';
import AuthProvider from '../context/AuthProvider';

// O AuthProvider fica só nas rotas de login e dashboard, não no site inteiro
export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
