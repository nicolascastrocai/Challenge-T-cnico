/**
 * Componente Login
 * 
 * Página de inicio de sesión que permite a los usuarios autenticarse
 * mediante email y contraseña. Al autenticarse exitosamente, guarda
 * el token JWT en localStorage y redirige al dashboard.
 */

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';
import type { LoginResponse } from '../types';
import '../styles/Login.css';

export const Login = () => {
  // Estados para manejar los campos del formulario y el estado de la petición
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario de login
   * Realiza la petición al backend y guarda el token si es exitosa
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setError(''); // Limpiar errores previos
    setLoading(true); // Activar estado de carga

    try {
      // Realizar petición POST al endpoint de login
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data: LoginResponse = await response.json();

      // Guardar el token JWT y los datos del usuario en localStorage
      // Esto permite mantener la sesión activa incluso si se recarga la página
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirigir al usuario a la pantalla protegida (dashboard)
      navigate('/dashboard');
    } catch (err) {
      // Manejar errores y mostrarlos al usuario
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      // Desactivar estado de carga independientemente del resultado
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">
            <div className="logo-bar"></div>
            <div className="logo-bar"></div>
            <div className="logo-bar"></div>
            <div className="logo-bar"></div>
          </div>
        </div>

        <h1 className="login-brand">RENTMOTE</h1>
        <h2 className="login-title">Iniciar Sesión</h2>
        <p className="login-subtitle">Bienvenido Rentmote, por favor ingrese a su cuenta</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'CARGANDO...' : 'ENTRAR'}
          </button>

          <a href="#" className="forgot-password">
            Olvidaste tu contraseña
          </a>
        </form>
      </div>
    </div>
  );
};
