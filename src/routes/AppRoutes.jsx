import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import ProjectDetail from '../pages/ProjectDetail';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

// Estas telas só são baixadas quando o visitante as abre
const Contact = lazy(() => import('../pages/Contact'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const AuthLayout = lazy(() => import('./AuthLayout'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos/:name" element={<ProjectDetail />} />
        <Route path="/contato" element={<Contact />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
