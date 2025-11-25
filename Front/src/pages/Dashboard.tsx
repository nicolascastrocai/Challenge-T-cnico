import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del usuario del localStorage
    const userDataString = localStorage.getItem('user');
    
    if (!userDataString) {
      // Si no hay datos, redirigir al login
      navigate('/');
      return;
    }

    try {
      const userData: User = JSON.parse(userDataString);
      setUser(userData);
    } catch (error) {
      console.error('Error al parsear datos del usuario:', error);
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Eliminar el token y los datos del usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirigir al login
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
