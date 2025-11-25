/**
 * Componente Dashboard
 * 
 * Página protegida que muestra la información del usuario autenticado.
 * Si no hay datos de usuario en localStorage, redirige automáticamente al login.
 * Incluye funcionalidad de logout que limpia la sesión.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  /**
   * Effect que se ejecuta al montar el componente
   * Verifica si hay datos de usuario en localStorage y los carga
   */
  useEffect(() => {
    // Obtener los datos del usuario guardados en localStorage
    const userDataString = localStorage.getItem('user');
    
    // Si no hay datos de usuario, redirigir al login
    if (!userDataString) {
      navigate('/');
      return;
    }

    try {
      // Parsear los datos del usuario desde JSON
      const userData: User = JSON.parse(userDataString);
      setUser(userData);
    } catch (error) {
      // Si hay error al parsear, limpiar y redirigir al login
      console.error('Error al parsear datos del usuario:', error);
      navigate('/');
    }
  }, [navigate]);

  /**
   * Maneja el cierre de sesión del usuario
   * Limpia el token y los datos del usuario de localStorage
   * y redirige al login
   */
  const handleLogout = () => {
    // Eliminar el token JWT y los datos del usuario
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirigir al usuario a la página de login
    navigate('/');
  };

  if (!user) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Bienvenido</h1>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            <span>{user.nombre.charAt(0)}{user.apellido.charAt(0)}</span>
          </div>

          <div className="user-details">
            <div className="user-field">
              <label>Nombre:</label>
              <span>{user.nombre}</span>
            </div>

            <div className="user-field">
              <label>Apellido:</label>
              <span>{user.apellido}</span>
            </div>

            <div className="user-field">
              <label>Edad:</label>
              <span>{user.edad} años</span>
            </div>

            <div className="user-field">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
