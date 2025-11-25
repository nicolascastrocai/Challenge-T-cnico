/**
 * Componente ProtectedRoute
 * 
 * Higher-Order Component (HOC) que protege rutas privadas
 * verificando la existencia de un token JWT en localStorage.
 * Si no hay token, redirige automáticamente al login.
 * 
 * Uso:
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */

import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Verificar si existe un token en localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, el usuario no está autenticado
  // Redirigir al login usando replace para no agregar al historial
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token, renderizar el componente hijo (ruta protegida)
  return <>{children}</>;
};
