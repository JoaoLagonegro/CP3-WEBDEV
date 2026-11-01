import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import ProjectDetail from '../pages/ProjectDetail';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import AuthLayout from './AuthLayout';
import ProtectedRoute from './ProtectedRoute';

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
